import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from 'prop-types';

const ModalRegistrarFecha = ({ show, handleClose, carreras, onSubmit }) => {
  const [formData, setFormData] = useState({
    carrera: "",
    fechaInicio: "",
    fechaFin: ""
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!show) {
      setFormData({ carrera: "", fechaInicio: "", fechaFin: "" });
      setValidated(false);
    }
  }, [show]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      onSubmit(formData);
      handleClose();
    }
    setValidated(true);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered
      backdrop="static"
      dialogClassName="modal-dialog-enhanced"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title as="h5" className="text-primary fw-bold">
          Registrar Nuevo Período Académico
        </Modal.Title>
      </Modal.Header>
      
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="pt-0">
          <Form.Group className="mb-4">
            <Form.Label className="text-secondary small mb-2">
              Carrera Universitaria
            </Form.Label>
            <Form.Select
              required
              value={formData.carrera}
              onChange={(e) => handleChange('carrera', e.target.value)}
              className="rounded-3 py-2"
            >
              <option value="">Seleccione una carrera</option>
              {carreras.map((carrera, index) => (
                <option key={`carrera-${index}`} value={carrera}>
                  {carrera}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Por favor seleccione una carrera
            </Form.Control.Feedback>
          </Form.Group>

          <div className="row g-3">
            <Form.Group className="col-md-6 mb-4">
              <Form.Label className="text-secondary small mb-2">
                Fecha de Inicio
              </Form.Label>
              <Form.Control
                required
                type="date"
                value={formData.fechaInicio}
                onChange={(e) => handleChange('fechaInicio', e.target.value)}
                className="rounded-3 py-2"
              />
              <Form.Control.Feedback type="invalid">
                Fecha de inicio requerida
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-6 mb-4">
              <Form.Label className="text-secondary small mb-2">
                Fecha de Cierre
              </Form.Label>
              <Form.Control
                required
                type="date"
                value={formData.fechaFin}
                onChange={(e) => handleChange('fechaFin', e.target.value)}
                className="rounded-3 py-2"
                min={formData.fechaInicio}
              />
              <Form.Control.Feedback type="invalid">
                Fecha de cierre válida requerida
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-top-0 justify-content-between">
          <Button 
            variant="outline-secondary" 
            onClick={handleClose}
            className="px-4 rounded-3"
          >
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            className="px-4 rounded-3"
          >
            Guardar Período
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

ModalRegistrarFecha.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  carreras: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ModalRegistrarFecha;