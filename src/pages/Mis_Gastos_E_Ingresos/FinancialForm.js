import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FinancialForm = () => {
    const [numPeople, setNumPeople] = useState(2);

    const handleNumPeopleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setNumPeople(isNaN(value) || value < 0 ? 0 : value);
    };
    return (
        <Container className="mt-3">
            {/* Ingresos Mensuales */}
            <Card className="p-4 mb-5">
                <h3 style={{ color: "#4F46E5" }}>Ingresos mensuales</h3>
                <Form>
                    <Form.Group>
                        <Form.Label style={{ color: "#4F46E5" }}>¿Cuántas personas aportan al gasto familiar?</Form.Label>
                        <Form.Control
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
    <Row key={index} className="mb-3">
        <Col>
            <div className="p-2 border rounded" style={{ backgroundColor: "#f0f0f0" }}>
                <label>Nombre completo</label>
                <Form.Control type="text" placeholder="Nombre completo" />
            </div>
        </Col>
        <Col>
            <div className="p-2 border rounded" style={{ backgroundColor: "#f0f0f0" }}>
                <label>Parentesco</label>
                <Form.Control type="text" placeholder="Parentesco" />
            </div>
        </Col>
        <Col>
            <div className="p-2 border rounded" style={{ backgroundColor: "#f0f0f0" }}>
                <label>Empresa o lugar de trabajo</label>
                <Form.Control type="text" placeholder="Empresa o lugar de trabajo" />
            </div>
        </Col>
        <Col>
            <div className="p-2 border rounded" style={{ backgroundColor: "#f0f0f0" }}>
                <label>Puesto o tipo de trabajo</label>
                <Form.Control type="text" placeholder="Puesto o tipo de trabajo" />
            </div>
        </Col>
        <Col>
            <div className="p-2 border rounded" style={{ backgroundColor: "#f0f0f0" }}>
                <label>IMB (Bruto)</label>
                <Form.Control type="number" placeholder="IMB (Bruto)" />
            </div>
        </Col>
        <Col>
            <div className="p-2 border rounded" style={{ backgroundColor: "#f0f0f0" }}>
                <label>IMN (Neto)</label>
                <Form.Control type="number" placeholder="IMN (Neto)" />
            </div>
        </Col>
    </Row>
))}

                    <Form.Group className="mt-4">
                        <Form.Label style={{ color: "#4F46E5" }}>Ingreso total:</Form.Label>
                        <Form.Control type="number" placeholder="$" />
                    </Form.Group>
                    <Form.Group style={{ color: "#4F46E5" }} className="mt-3">
                        <Form.Label>¿Cuántas personas dependen de este ingreso mensual?</Form.Label>
                        <Form.Control type="number" placeholder="Número de personas" />
                    </Form.Group>
                </Form>
            </Card>


            <Row>
                {/* Recibo de luz */}
                <Col md={5}>
                    <Card className="p-5 mb-5">
                        <h5>Recibo de luz</h5>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nombre del titular de los recibos de luz:</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group>
                                <h5>Recibo de luz</h5>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Pago del último período (Agosto - Septiembre)</Form.Label>
                                <Form.Control type="number" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Paga mensual promedio</Form.Label>
                                <Form.Control type="number" placeholder="$" />
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>

                {/* Gastos Mensuales */}
                <Col md={5}>
                    <Card className="p-5 mb-5">
                        <h5>Gastos mensuales</h5>
                        <Form>
                            {['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros'].map((label, index) => (
                                <Form.Group key={index}>
                                    <Form.Label>{label}:</Form.Label>
                                    <Form.Control type="number" />
                                </Form.Group>
                            ))}
                            <Form.Group>
                                <Form.Label>Gastos mensuales</Form.Label>
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
