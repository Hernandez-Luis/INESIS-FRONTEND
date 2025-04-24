import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FinancialForm = () => {
    const [numPeople, setNumPeople] = useState(1);
    const [peopleData, setPeopleData] = useState([]);
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState(""); // Para manejar el mensaje de error
    



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

    const validateForm = () => {
        let isValid = true;
        let errorMessage = "";
    
        // Validar campos de las personas que aportan al gasto familiar
        [...Array(numPeople)].forEach((_, index) => {
            const fields = [
                `person-${index}-nombrecompleto`,
                `person-${index}-parentesco`,
                `person-${index}-empresalugartrabajo`,
                `person-${index}-puestotipo`,
                `person-${index}-imb`,
                `person-${index}-imn`
            ];
    
            fields.forEach((field) => {
                const value = document.getElementById(field)?.value;
                if (!value || value.trim() === "") {
                    isValid = false;
                    setEmptyFields((prevFields) => [...prevFields, field]);
                }
            });
        });
    
        // Validar campos del recibo de luz
        const lightBillFields = ["lightName", "lastPayment", "avgPayment"];
        lightBillFields.forEach((field) => {
            const value = document.getElementById(field)?.value;
            if (!value || value.trim() === "") {
                isValid = false;
                setEmptyFields((prevFields) => [...prevFields, field]);
            }
        });
    
        // Validar campos de los gastos mensuales
        const gastoFields = ['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros', 'totalGastos'];
        gastoFields.forEach((field) => {
            const value = document.getElementById(field)?.value;
            if (!value || value.trim() === "" || isNaN(value)) {
                isValid = false;
                setEmptyFields((prevFields) => [...prevFields, field]);
            }
        });
    
        if (isValid) {
            setError("");  // Si todo es válido, limpiamos el mensaje de error
            return true;
        } else {
            setError("Por favor, complete todos los campos obligatorios.");  // Mensaje de error si hay campos vacíos
            return false;
        }
    };
    




    const handleSave = () => {
        const isFormValid = validateForm();
        if (isFormValid) {
            // Proceder con el guardado de los datos
            console.log("Formulario guardado correctamente");
        }
    };



    return (
        <Container className="mt-3" style={{ maxWidth: "1400px" }}>
            {/* Ingresos Mensuales */}
            <Card className="p-4 mb-5" style={{ backgroundColor: "#F5F5F5" }}>
                <h3 style={{ color: "#4F46E5" }}>Ingresos mensuales</h3>
                <Form>
                    <Form.Group>
                        <Form.Label style={{ color: "#4F46E5" }}>¿Cuántas personas aportan al gasto familiar?</Form.Label>
                        <Form.Control
                            style={{ maxWidth: "350px" }}
                            type="number"
                            placeholder="Número de personas"
                            value={numPeople}
                            onChange={handleNumPeopleChange}
                        />
                    </Form.Group>
                    <h4 className="mt-4" style={{ color: "#4F46E5" }}>Personas que aportan al gasto familiar:</h4>
                    <h8 className="lh-lg mb-1">Menciona el ingreso total mensual de cada persona que aporta al gasto de tu familia,
                        en caso de que sus ingresos sean semanales o quincenales, deberás realizar una suma total e indicar el ingreso mensual.</h8>
                    {[...Array(numPeople)].map((_, index) => (
                        <Row key={index} className="mb-2 d-flex align-items-stretch" style={{ paddingTop: "4px" }}>
                            {[
                                { label: "Nombre completo", placeholder: "Nombre completo", type: "text", validation: /^[A-Za-z\s]+$/, preventInvalidChars: /[^A-Za-z\s]/ },
                                { label: "Parentesco", placeholder: "Parentesco", type: "text", validation: /^[A-Za-z\s]+$/, preventInvalidChars: /[^A-Za-z\s]/ },
                                { label: "Empresa o lugar de trabajo", placeholder: "Empresa o lugar de trabajo", type: "text", validation: /^[A-Za-z\s]+$/, preventInvalidChars: /[^A-Za-z\s]/ },
                                { label: "Puesto o tipo de trabajo", placeholder: "Puesto o tipo de trabajo", type: "text", validation: /^[A-Za-z\s]+$/, preventInvalidChars: /[^A-Za-z\s]/ },
                                { label: "IMB (Bruto)", placeholder: "IMB (Bruto)", type: "text", validation: /^[0-9]+(\.[0-9]+)?$/, preventInvalidChars: /[^0-9\.]/, maxDecimals: 1 },
                                { label: "IMN (Neto)", placeholder: "IMN (Neto)", type: "text", validation: /^[0-9]+(\.[0-9]+)?$/, preventInvalidChars: /[^0-9\.]/, maxDecimals: 1 }
                            ].map((field, idx) => (
                                <Col key={idx} className="d-flex">
                                    <div className="p-3 border rounded flex-fill d-flex flex-column justify-content-between" style={{ backgroundColor: "#F5F5F5" }}>
                                        <label style={{ fontSize: "18px", color: "#4F46E5" }}>{field.label}</label>
                                        <Form.Control
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // Verificar si el campo está vacío y actualizar el estado
                                                setEmptyFields((prevFields) => {
                                                    if (value.trim() === "") {
                                                        return [...prevFields, `person-${index}-${field.label.toLowerCase().replace(/ /g, '')}`];
                                                    } else {
                                                        return prevFields.filter(item => item !== `person-${index}-${field.label.toLowerCase().replace(/ /g, '')}`);
                                                    }
                                                });

                                                // Validación de formato
                                                if (field.validation && !field.validation.test(value)) {
                                                    e.target.setCustomValidity('Valor inválido');
                                                } else {
                                                    e.target.setCustomValidity('');
                                                }
                                            }}
                                            onInput={(e) => {
                                                const value = e.target.value;
                                                // Eliminar caracteres no permitidos
                                                if (field.preventInvalidChars.test(value)) {
                                                    e.target.value = value.replace(field.preventInvalidChars, '');  // Elimina caracteres no válidos
                                                }

                                                // Verificar que no haya más de un punto decimal
                                                if (field.maxDecimals && (value.match(/\./g) || []).length > field.maxDecimals) {
                                                    e.target.value = value.slice(0, -1); // Elimina el último carácter (el punto extra)
                                                }
                                            }}
                                            isInvalid={emptyFields.includes(`person-${index}-${field.label.toLowerCase().replace(/ /g, '')}`)} // Resaltar si está vacío
                                        />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    ))}




                    <Form.Group className="mt-4 d-flex justify-content-end align-items-center">
                        <Form.Label style={{ color: "#4F46E5", maxWidth: "100px", marginRight: "10px" }}>Ingreso total:</Form.Label>
                        <Form.Control style={{ maxWidth: "200px" }} type="number" placeholder="$" />
                    </Form.Group>

                    <Form.Group style={{ color: "#4F46E5" }} className="mt-3">
                        <Form.Label>¿Cuántas personas dependen de este ingreso mensual?</Form.Label>
                        <Form.Control style={{ maxWidth: "400px" }} type="number" placeholder="Número de personas" />
                    </Form.Group>
                </Form>
            </Card>


            <Row className="justify-content-center">
                {/* Recibo de luz */}
                {/* Recibo de luz */}
                <Col md={5} className="d-flex justify-content-center">
                    <Card className="p-5 mb-5 w-100" style={{ backgroundColor: "#F5F5F5" }}>
                        <h4 style={{ color: "#4F46E5" }}>Recibo de luz</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Nombre del titular de los recibos de luz:</Form.Label>
                                <Form.Control
                                    id="lightName"
                                    type="text"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Verificar si está vacío y actualizar el estado
                                        setEmptyFields((prevFields) => {
                                            if (value.trim() === "") {
                                                return [...prevFields, "lightName"];
                                            } else {
                                                return prevFields.filter(item => item !== "lightName");
                                            }
                                        });
                                    }}
                                    isInvalid={emptyFields.includes("lightName")}
                                />
                            </Form.Group>

                            <Form.Group>
                                <h4 style={{ color: "#4F46E5" }}>Recibo de luz</h4>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Pago del último período (Agosto - Septiembre)</Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Verificar si está vacío y actualizar el estado
                                        setEmptyFields((prevFields) => {
                                            if (value.trim() === "") {
                                                return [...prevFields, "lastPayment"];
                                            } else {
                                                return prevFields.filter(item => item !== "lastPayment");
                                            }
                                        });
                                    }}
                                    isInvalid={emptyFields.includes("lastPayment")}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Paga mensual promedio</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="$"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Verificar si está vacío y actualizar el estado
                                        setEmptyFields((prevFields) => {
                                            if (value.trim() === "") {
                                                return [...prevFields, "avgPayment"];
                                            } else {
                                                return prevFields.filter(item => item !== "avgPayment");
                                            }
                                        });
                                    }}
                                    isInvalid={emptyFields.includes("avgPayment")}
                                />
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>


                {/* Espacio entre las tarjetas */}
                <div style={{ width: "70px" }}></div>

                {/* Gastos Mensuales */}
                <Col md={5} className="d-flex justify-content-center">
                    <Card className="p-5 mb-5 w-100" style={{ backgroundColor: "#F5F5F5" }}>
                        <h4 style={{ color: "#4F46E5" }}>Gastos mensuales</h4>
                        <Form id="gastosForm">
                            {['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros'].map((label, index) => (
                                <Form.Group key={index}>
                                    <Form.Label style={{ color: "#4F46E5" }}>{label}:</Form.Label>
                                    <Form.Control id={label} type="number" />
                                </Form.Group>
                            ))}
                            <Form.Group className="d-flex flex-column align-items-center mt-3" style={{ maxWidth: "200px", margin: "0 auto" }}>
                                <Form.Label style={{ color: "#4F46E5" }}>Gastos mensuales</Form.Label>
                                <Form.Control id="totalGastos" type="number" placeholder="$" />
                            </Form.Group>

                        </Form>
                    </Card>
                </Col>
            </Row>


            {/* Botón Guardar */}
            <div className="text-center" style={{ padding: "50px" }}>
                <Button variant="primary" className="px-4" onClick={handleSave}>Guardar</Button>
                {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
            </div>

        </Container>
    );
};

export default FinancialForm;
