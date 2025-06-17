import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RecibosDeLuz from '../../components/ReciboLuz/RecibosDeLuz';
import axiosInstance from '../../api/axiosConfig';
import Swal from "sweetalert2";
import CatParentescoService from "../../services/CatParentescoService";
import { useEffect } from "react";





const FinancialForm = () => {
    const [numPeople, setNumPeople] = useState(1);
    const [peopleData, setPeopleData] = useState([]);
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState(""); // Para manejar el mensaje de error
    const [reciboFile, setReciboFile] = useState(null);
    const [observaciones, setObservaciones] = useState("");
    const [catParentesco, setParentesco] = useState([]);


    useEffect(() => {
        obtenerParentesco();
    }, []);

    const fieldNames = {
        lightName: "Nombre del titular del recibo de luz",
        periodoInicio: "Periodo de inicio",
        periodoFin: "Periodo de fin",
        ultimoPago: "Último pago",
        promedioPago: "Promedio de pago",

        'Alimentación': "Alimentación",
        'Renta': "Renta",
        'Servicios': "Servicios",
        'Gastos escolares': "Gastos escolares",
        'Ropa': "Ropa",
        'Transporte': "Transporte",
        'Otros': "Otros",
        'totalGastos': "Total de gastos",

        'Ingreso total:': "Ingreso total",
        '¿Cuántas personas dependen de este ingreso mensual?': "Número de personas que dependen del ingreso"
    };


    const handleNumPeopleChange = (e) => {
        const value = e.target.value;
        if (/^[1-9]$|^1[0-9]$|^20$/.test(value)) {
            setNumPeople(parseInt(value, 10));
            setPeopleData(new Array(parseInt(value, 10)).fill({
                name: "",
                relationship: "",
                company: "",
                job: "",
                gross: "",
                net: ""
            }));
        } else if (value === "") {
            setNumPeople("");
            setPeopleData([]);
        }
    };

    const handleKeyDown = (e) => {
        // Permitir solo números, el punto decimal, Backspace, y las flechas de navegación
        const validKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "."];
        if (
            !/[0-9]/.test(e.key) &&  // Permitir solo números
            !validKeys.includes(e.key)  // Permitir teclas especiales (Backspace, flechas)
        ) {
            e.preventDefault();  // Bloquear la tecla si no es válida
        }
    };

    const handleDecimalInput = (e) => {
        const value = e.target.value;
        const regex = /^\d{0,6}(\.\d{0,2})?$/;

        if (value === "" || regex.test(value)) {
            e.target.setCustomValidity("");  // Formato válido
        } else {
            e.target.setCustomValidity("Solo se permiten hasta 6 enteros y 2 decimales.");
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newEmptyFields = [];

        // Validación de campos de personas
        [...Array(numPeople)].forEach((_, index) => {
            const fields = [
                `person-${index}-nombrecompleto`,
                `person-${index}-parentesco`,
                `person-${index}-empresaolugardetrabajo`,
                `person-${index}-puestootipodetrabajo`,
                `person-${index}-imbbruto`,
                `person-${index}-imnneto`
            ];
            fields.forEach((fieldId) => {
                const value = document.getElementById(fieldId)?.value;
                if (!value || value.trim() === "") {
                    isValid = false;
                    newEmptyFields.push(fieldId);
                }
            });
        });

        // Recibo de luz
        ["lightName", "periodoInicio", "periodoFin", "ultimoPago", "promedioPago"].forEach((field) => {
            const input = document.getElementById(field);
            const value = input?.value;

            if (input?.type === "number") {
                if (value === "" || isNaN(parseFloat(value))) {
                    isValid = false;
                    newEmptyFields.push(field);
                }
            } else {
                if (!value || value.trim() === "") {
                    isValid = false;
                    newEmptyFields.push(field);
                }
            }
        });


        // Gastos
        const gastoFields = ['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros', 'totalGastos'];
        gastoFields.forEach((field) => {
            const value = document.getElementById(field)?.value;
            if (!value || value.trim() === "" || isNaN(value)) {
                isValid = false;
                newEmptyFields.push(field);
            }
        });

        // Ingresos mensuales: Validar "Ingreso total" y "¿Cuántas personas dependen?"
        const ingresosFields = ['Ingreso total:', '¿Cuántas personas dependen de este ingreso mensual?'];
        ingresosFields.forEach((field) => {
            const value = document.getElementById(field)?.value;
            if (!value || value.trim() === "") {
                isValid = false;
                newEmptyFields.push(field);
            }
        });

        setEmptyFields(newEmptyFields);

        if (!isValid) {
            const missingFields = newEmptyFields.map(field => `- ${fieldNames[field] || field}`).join('\n');
            setError(`Por favor, complete los siguientes campos obligatorios:\n${missingFields}`);
        } else {
            setError("");
        }

        return isValid;

    };

    const obtenerParentesco = async () => {
        try {
            let catParentesco = await CatParentescoService.getAll();
            setParentesco(catParentesco)
            console.log("catParentesco:", catParentesco);

        } catch (error) {
            console.log("Error al obtener la lista de CatSemestre: ", error)

        }
    }

    const convertirArchivoABase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSave = async () => {
        const isFormValid = validateForm();
        if (!isFormValid) return;

        try {
            // Obtener datos de las personas que aportan
            const personasAportan = parseInt(document.getElementById("personasAportan")?.value || "0");
            const people = [...Array(numPeople)].map((_, index) => ({
                name: document.getElementById(`person-${index}-nombrecompleto`)?.value || "",
                relationship: document.getElementById(`person-${index}-parentesco`)?.value || "",
                company: document.getElementById(`person-${index}-empresaolugardetrabajo`)?.value || "",
                job: document.getElementById(`person-${index}-puestootipodetrabajo`)?.value || "",
                gross: parseFloat(document.getElementById(`person-${index}-imbbruto`)?.value || "0"),
                net: parseFloat(document.getElementById(`person-${index}-imnneto`)?.value || "0"),
            }));

            // Ingreso total y personas que dependen
            const ingresoTotal = parseFloat(document.getElementById("Ingreso total:")?.value || "0");
            const personasDependen = parseInt(document.getElementById("¿Cuántas personas dependen de este ingreso mensual?")?.value || "0");

            if (isNaN(ingresoTotal) || isNaN(personasDependen)) {
                alert("Revisa los campos numéricos. Hay valores inválidos.");
                return;
            }

            // Obtener gastos mensuales
            // Obtener gastos mensuales con nombres originales
            const gastosOriginales = ['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros'].reduce((acc, label) => {
                acc[label] = parseFloat(document.getElementById(label)?.value || "0");
                return acc;
            }, {});
            gastosOriginales.total = parseFloat(document.getElementById("totalGastos")?.value || "0");

            // Transformar nombres para el backend
            const gastos = {
                gastoAlimentacion: gastosOriginales["Alimentación"],
                gastoRenta: gastosOriginales["Renta"],
                gastoServicios: gastosOriginales["Servicios"],
                gastoEscolares: gastosOriginales["Gastos escolares"],
                gastoRopa: gastosOriginales["Ropa"],
                gastoTransporte: gastosOriginales["Transporte"],
                gastoOtros: gastosOriginales["Otros"],
                totalGastos: gastosOriginales.total
            };

            // Recibo de luz
            const reciboLuz = {
                titular: document.getElementById("lightName")?.value || "",
                periodoInicio: document.getElementById("periodoInicio")?.value || "",
                periodoFin: document.getElementById("periodoFin")?.value || "",

                ultimoPago: parseFloat(document.getElementById("ultimoPago")?.value || "0"),
                promedioPago: parseFloat(document.getElementById("promedioPago")?.value || "0"),

                observaciones: observaciones || "",
                //contenidoBase64: "",
                nombreOriginal: reciboFile?.name || "",
                nombreArchivo: "ReciboLuzAlumno"

            };

            // Convertir archivo a base64 si existe
            if (reciboFile) {
                const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

                if (reciboFile.size > maxSizeInBytes) {
                    Swal.fire({
                        title: '¡Alto!',
                        text: 'El archivo del recibo de luz excede el tamaño máximo permitido de 10MB.',
                        icon: 'info',
                        confirmButtonText: 'Aceptar',
                        timer: 5000,
                        timerProgressBar: true,
                    });
                    return;
                }

                const base64Completo = await convertirArchivoABase64(reciboFile);
                reciboLuz.contenidoBase64 = base64Completo.split(",")[1]; // quitar metadata si aplica
            }

            console.log((document.getElementById("personasAportan")?.value));

            // Armar payload
            const payload = {
                personasAportan: personasAportan,
                personas: people,
                ingresoTotal,
                personasDependen,
                reciboLuz,
                gastos,
            };

            console.log("Payload al backend:", payload);

            const response = await axiosInstance.post('/gastosFamiliares', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert("Datos guardados correctamente");
            console.log("Respuesta del backend:", response.data);

        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al guardar datos");
        }
    };


    const cardStyle = {
        backgroundColor: "#F5F5F5",
        borderRadius: "1rem",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)"
    };

    return (
        <Container className="mt-3" style={{ maxWidth: "1400px" }}>
            {/* Ingresos Mensuales */}
            <Card className="p-4 mb-5" style={cardStyle}>
                <h3 style={{ color: "#4F46E5" }}>Ingresos mensuales</h3>
                <Form>
                    <Form.Group>
                        <Form.Label style={{ color: "#4F46E5" }}>¿Cuántas personas aportan al gasto familiar?</Form.Label>
                        <Form.Control
                            id="personasAportan"
                            style={{ maxWidth: "350px" }}
                            type="number"
                            onKeyDown={handleKeyDown} // Evitar caracteres no numéricos
                            onInput={handleDecimalInput}
                            placeholder="Número de personas"
                            value={numPeople}
                            onChange={handleNumPeopleChange}
                        />
                    </Form.Group>
                    <h4 className="mt-4" style={{ color: "#4F46E5" }}>Personas que aportan al gasto familiar:</h4>
                    {[...Array(numPeople)].map((_, index) => (
                        <Row key={index} className="mb-2 d-flex align-items-stretch" style={{ paddingTop: "4px" }}>
                            {[
                                { label: "Nombre completo", placeholder: "Nombre completo", type: "text" },
                                { label: "Empresa o lugar de trabajo", placeholder: "Empresa o lugar de trabajo", type: "text" },
                                { label: "Puesto o tipo de trabajo", placeholder: "Puesto o tipo de trabajo", type: "text" },
                                { label: "IMB (Bruto)", placeholder: "IMB (Bruto)", type: "text" },
                                { label: "IMN (Neto)", placeholder: "IMN (Neto)", type: "text" }
                            ].map((field, idx) => {
                                // Insertar el campo "Parentesco" después de "Nombre completo"
                                if (idx === 1) {
                                    return (
                                        <React.Fragment key={idx}>
                                            {/* Campo Parentesco */}
                                            <Col className="d-flex">
                                                <Form.Group className="p-3 border rounded flex-fill d-flex flex-column justify-content-between" style={{ backgroundColor: "#F5F5F5" }}>
                                                    <Form.Label style={{ fontSize: "18px", color: "#4F46E5" }}>Parentesco</Form.Label>
                                                    <Form.Select
                                                        id={`person-${index}-parentesco`}
                                                        isInvalid={emptyFields.includes(`person-${index}-parentesco`)}
                                                        defaultValue=""  // para que el option vacío sea el seleccionado inicialmente
                                                    >
                                                        <option value="" disabled>Selecciona un parentesco</option>
                                                        {catParentesco.map((item) => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.nombreParentesco}  {/* Aquí el texto visible */}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                </Form.Group>
                                            </Col>

                                            {/* Campo original (Empresa o lugar de trabajo) */}
                                            <Col className="d-flex">
                                                <div className="p-3 border rounded flex-fill d-flex flex-column justify-content-between" style={{ backgroundColor: "#F5F5F5" }}>
                                                    <label style={{ fontSize: "18px", color: "#4F46E5" }}>{field.label}</label>
                                                    <Form.Control
                                                        id={`person-${index}-${field.label.toLowerCase().replace(/ /g, '').replace(/[()]/g, '')}`}
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        isInvalid={emptyFields.includes(`person-${index}-${field.label.toLowerCase().replace(/ /g, '').replace(/[()]/g, '')}`)}
                                                    />
                                                </div>
                                            </Col>
                                        </React.Fragment>
                                    );
                                }

                                // Campos normales (Nombre completo, Puesto, IMB, IMN)
                                return (
                                    <Col key={idx} className="d-flex">
                                        <div className="p-3 border rounded flex-fill d-flex flex-column justify-content-between" style={{ backgroundColor: "#F5F5F5" }}>
                                            <label style={{ fontSize: "18px", color: "#4F46E5" }}>{field.label}</label>
                                            <Form.Control
                                                id={`person-${index}-${field.label.toLowerCase().replace(/ /g, '').replace(/[()]/g, '')}`}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                isInvalid={emptyFields.includes(`person-${index}-${field.label.toLowerCase().replace(/ /g, '').replace(/[()]/g, '')}`)}
                                            />
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    ))}




                    <Form.Group className="mt-4 d-flex justify-content-end align-items-center">
                        <Form.Label style={{ color: "#4F46E5", maxWidth: "100px", marginRight: "10px" }}>Ingreso total:</Form.Label>
                        <Form.Control
                            style={{ maxWidth: "200px" }} type="number" placeholder="$"
                            onKeyDown={handleKeyDown} // Evitar caracteres no numéricos
                            onInput={handleDecimalInput}
                            id="Ingreso total:"
                            isInvalid={emptyFields.includes("Ingreso total:")}
                        />
                    </Form.Group>

                    <Form.Group style={{ color: "#4F46E5" }} className="mt-3">
                        <Form.Label>¿Cuántas personas dependen de este ingreso mensual?</Form.Label>
                        <Form.Control
                            style={{ maxWidth: "400px" }}
                            type="number"
                            onKeyDown={handleKeyDown} // Evitar caracteres no numéricos
                            onInput={handleDecimalInput}
                            id="¿Cuántas personas dependen de este ingreso mensual?"
                            isInvalid={emptyFields.includes("¿Cuántas personas dependen de este ingreso mensual?")}
                        />
                    </Form.Group>
                </Form>
            </Card>

            <Row className="justify-content-center">
                {/* Recibo de luz */}
                <Col md={5} className="d-flex justify-content-center">
                    <Card className="p-5 mb-5 w-100" style={cardStyle}>
                        <h4 style={{ color: "#4F46E5" }}>Recibo de luz</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Nombre del titular de los recibos de luz:</Form.Label>
                                <Form.Control
                                    id="lightName"
                                    type="text"
                                    isInvalid={emptyFields.includes("lightName")}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Periodo de inicio</Form.Label>
                                <Form.Control
                                    id="periodoInicio"
                                    type="month"
                                    isInvalid={emptyFields.includes("periodoInicio")}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Periodo de fin</Form.Label>
                                <Form.Control
                                    id="periodoFin"
                                    type="month"
                                    isInvalid={emptyFields.includes("periodoFin")}
                                />
                            </Form.Group>


                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Pago del último período</Form.Label>
                                <Form.Control
                                    id="ultimoPago"
                                    type="number"
                                    onKeyDown={handleKeyDown}
                                    onInput={handleDecimalInput}
                                    isInvalid={emptyFields.includes("ultimoPago")}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Pago mensual promedio</Form.Label>
                                <Form.Control
                                    id="promedioPago"
                                    type="number"
                                    onKeyDown={handleKeyDown}
                                    onInput={handleDecimalInput}
                                    isInvalid={emptyFields.includes("promedioPago")}
                                />
                            </Form.Group>

                        </Form>
                        <RecibosDeLuz
                            onChangeFile={(e) => setReciboFile(e.target.files[0])}
                            onChangeObservaciones={(text) => setObservaciones(text)}
                        />

                    </Card>
                </Col>

                {/* Espacio entre las tarjetas */}
                <div style={{ width: "50px" }}></div>

                {/* Gastos Mensuales */}
                <Col md={5} className="d-flex justify-content-center">
                    <Card className="p-5 mb-5 w-100" style={cardStyle}>
                        <h4 style={{ color: "#4F46E5" }}>Gastos mensuales</h4>
                        <Form id="gastosForm">
                            {['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros'].map((label, index) => (
                                <Form.Group key={index}>
                                    <Form.Label style={{ color: "#4F46E5" }}>{label}:</Form.Label>
                                    <Form.Control
                                        id={label}
                                        type="number"
                                        onKeyDown={handleKeyDown} // Evitar caracteres no numéricos
                                        onInput={handleDecimalInput}
                                        isInvalid={emptyFields.includes(label)}
                                    />
                                </Form.Group>
                            ))}
                            <Form.Group className="d-flex flex-column align-items-center mt-3" style={{ maxWidth: "200px", margin: "0 auto" }}>
                                <Form.Label style={{ color: "#4F46E5" }}>Gastos mensuales</Form.Label>
                                <Form.Control
                                    id="totalGastos"
                                    type="number"
                                    onKeyDown={handleKeyDown} // Evitar caracteres no numéricos
                                    onInput={handleDecimalInput}
                                    placeholder="$"
                                    isInvalid={emptyFields.includes("totalGastos")}
                                />
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>

            {/* Botón Guardar */}
            <div className="text-center" style={{ padding: "50px" }}>
                <Button variant="primary" className="px-4" onClick={handleSave}>Guardar</Button>
                {error && (
                    <div style={{ color: "red", textAlign: "center", whiteSpace: "pre-line" }}>
                        {error}
                    </div>
                )}
            </div>

        </Container>
    );
};

export default FinancialForm;
