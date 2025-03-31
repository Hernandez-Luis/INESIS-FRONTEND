import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FinancialForm = () => {
    const [numPeople, setNumPeople] = useState(1);
    const [peopleData, setPeopleData] = useState([]);
    

    const handleNumPeopleChange = (e) => {
        const value = e.target.value;
        if (/^[1-9]$|^1[0-9]$|^20$/.test(value)) {
            setNumPeople(parseInt(value, 10));
            setPeopleData(new Array(parseInt(value, 10)).fill({ name: "", relationship: "", company: "", job: "", gross: "", net: "" }));
        } else if (value === "") {
            setNumPeople("");
            setPeopleData([]);
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
            { label: "Nombre completo", placeholder: "Nombre completo", type: "text", validation: /^[A-Za-z\s]+$/ },
            { label: "Parentesco", placeholder: "Parentesco", type: "text", validation: /^[A-Za-z\s]+$/ },
            { label: "Empresa o lugar de trabajo", placeholder: "Empresa o lugar de trabajo", type: "text", validation: /^[A-Za-z\s]+$/ },
            { label: "Puesto o tipo de trabajo", placeholder: "Puesto o tipo de trabajo", type: "text", validation: /^[A-Za-z\s]+$/ },
            { label: "IMB (Bruto)", placeholder: "IMB (Bruto)", type: "number", validation: /^[0-9]+(\.[0-9]+)?$/ },
            { label: "IMN (Neto)", placeholder: "IMN (Neto)", type: "number", validation: /^[0-9]+(\.[0-9]+)?$/ }
        ].map((field, idx) => (
            <Col key={idx} className="d-flex">
                <div className="p-3 border rounded flex-fill d-flex flex-column justify-content-between" style={{ backgroundColor: "#F5F5F5" }}>
                    <label style={{ fontSize: "18px", color: "#4F46E5" }}>{field.label}</label>
                    <Form.Control
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (field.validation && !field.validation.test(value)) {
                                e.target.setCustomValidity('Valor inválido');
                            } else {
                                e.target.setCustomValidity('');
                            }
                        }}
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
                <Col md={5} className="d-flex justify-content-center">
                    <Card className="p-5 mb-5 w-100 " style={{ backgroundColor: "#F5F5F5" }}>
                        <h4 style={{ color: "#4F46E5" }}>Recibo de luz</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Nombre del titular de los recibos de luz:</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group>
                                <h4 style={{ color: "#4F46E5" }}>Recibo de luz</h4>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Pago del último período (Agosto - Septiembre)</Form.Label>
                                <Form.Control type="number" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Paga mensual promedio</Form.Label>
                                <Form.Control type="number" placeholder="$" />
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
                        <Form>
                            {['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros'].map((label, index) => (
                                <Form.Group key={index}>
                                    <Form.Label style={{ color: "#4F46E5" }}>{label}:</Form.Label>
                                    <Form.Control type="number" />
                                </Form.Group>
                            ))}
                            <Form.Group className="d-flex flex-column align-items-center mt-3" style={{ maxWidth: "200px", margin: "0 auto" }}>
                                <Form.Label style={{ color: "#4F46E5" }}>Gastos mensuales</Form.Label>
                                <Form.Control type="number" placeholder="$" />
                            </Form.Group>

                        </Form>
                    </Card>
                </Col>
            </Row>


            {/* Botón Guardar */}
            <div className="text-center" style={{ padding: "50px" }}>
                <Button variant="primary" className="px-4">Guardar</Button>
            </div>
        </Container>
    );
};

export default FinancialForm;
