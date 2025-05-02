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
        ["lightName", "lastPayment", "avgPayment"].forEach((field) => {
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
        setError(isValid ? "" : "Por favor, complete todos los campos obligatorios.");
        return isValid;
    };

    const handleSave = () => {
        const isFormValid = validateForm();
        if (isFormValid) {
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
                                { label: "Parentesco", placeholder: "Parentesco", type: "text" },
                                { label: "Empresa o lugar de trabajo", placeholder: "Empresa o lugar de trabajo", type: "text" },
                                { label: "Puesto o tipo de trabajo", placeholder: "Puesto o tipo de trabajo", type: "text" },
                                { label: "IMB (Bruto)", placeholder: "IMB (Bruto)", type: "text" },
                                { label: "IMN (Neto)", placeholder: "IMN (Neto)", type: "text" }
                            ].map((field, idx) => (
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
                            ))}
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
                    <Card className="p-5 mb-5 w-100" style={{ backgroundColor: "#F5F5F5" }}>
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
                                <Form.Label style={{ color: "#4F46E5" }}>Pago del último período (Agosto - Septiembre)</Form.Label>
                                <Form.Control
                                    id="lastPayment"
                                    type="number"
                                    onKeyDown={handleKeyDown} // Evitar caracteres no numéricos
                                    onInput={handleDecimalInput}
                                    isInvalid={emptyFields.includes("lastPayment")}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Paga mensual promedio</Form.Label>
                                <Form.Control
                                    id="avgPayment"
                                    type="number"
                                    onKeyDown={handleKeyDown} // Evitar caracteres no numéricos
                                    onInput={handleDecimalInput}
                                    placeholder="$"
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
                {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
            </div>

        </Container>
    );
};

export default FinancialForm;
