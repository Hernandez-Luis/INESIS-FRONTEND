import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../../Fechas/components/AdministrarFechas.css';
import carreraService from '../../../services/CatCarreraService';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import fechaService from '../../../services/FechasRegistradasService';

const ModalRegistrarFecha = ({ show, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    idCarrera: "", 
    fechaInicio: "",
    fechaFin: ""
  });

  const [validated, setValidated] = useState(false);
  const [carreras, setCarreras] = useState([]);

  // Resetear formulario cuando se cierra
  useEffect(() => {
    if (!show) {
      setFormData({ idCarrera: "", fechaInicio: "", fechaFin: "" });
      setValidated(false);
    }
  }, [show]);

  // Cargar carreras cuando se abre el modal
  useEffect(() => {
    if (show) {
      const fetchCarreras = async () => {
        try {
          const response = await carreraService.getAll();
          setCarreras(response);
        } catch (error) {
          console.error("Error al cargar las carreras:", error);
        }
      };
      fetchCarreras();
    }
  }, [show]);

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'idCarrera' ? Number(value) : value
    }));
  };


  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      Swal.fire({
        icon: 'info',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos obligatorios.',
        confirmButtonColor: '#6f42c1'
      });
    } else {
      // Llamada a fechaService.create para guardar los datos
      try {
        
        await fechaService.create(formData);  
        Swal.fire({
          icon: 'success',
          title: 'Fecha registrada correctamente',
          confirmButtonColor: '#6f42c1'
        });
        handleClose();
        onSubmit();
      } catch (error) {
        console.error("Error al registrar la fecha:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar la fecha',
          text: 'Hubo un problema al guardar la fecha. Intente de nuevo.',
          confirmButtonColor: '#6f42c1'
        });
      }
    }

    setValidated(true);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      dialogClassName="modal-dialog-enhanced"
      contentClassName="bg-purple text-white"
    >
      <Modal.Header closeButton className="border-bottom-0 text-center close-white">
        <Modal.Title as="h3" className="text-white fw-bold w-100">
          Registrar fecha
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="pt-0">
          <Form.Group className="mb-4">
            <Form.Label className="text-white fw-bold mb-2">Carrera:</Form.Label>
            <Form.Select
              required
              value={formData.idCarrera}
              onChange={(e) => handleChange('idCarrera', e.target.value)}
              className="rounded-3 py-2"
            >
              <option value="">Seleccione una carrera</option>
              {carreras.map((carrera) => (
                <option key={carrera.id} value={carrera.id}>
                  {carrera.nombreCarrera}
                </option>
              ))}
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              Por favor seleccione una carrera
            </Form.Control.Feedback>
          </Form.Group>

          <div className="row g-3">
            <Form.Group className="col-md-6 mb-4">
              <Form.Label className="text-white fw-bold mb-2">
                Fecha de Inicio
              </Form.Label>
              <Form.Control
                required
                type="date"
                value={formData.fechaInicio}
                onChange={(e) => handleChange('fechaInicio', e.target.value)}
                className="rounded-3 py-2"
                min={new Date().toISOString().split('T')[0]} // <-- aquí
              />
              <Form.Control.Feedback type="invalid">
                Fecha de inicio requerida
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-6 mb-4">
              <Form.Label className="text-white fw-bold mb-2">
                Fecha de Cierre
              </Form.Label>
              <Form.Control
                required
                type="date"
                value={formData.fechaFin}
                onChange={(e) => handleChange('fechaFin', e.target.value)}
                className="rounded-3 py-2"
                min={formData.fechaInicio || new Date().toISOString().split('T')[0]}
              />
              <Form.Control.Feedback type="invalid">
                Fecha de cierre válida requerida
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-top-0 justify-content-center mt-0">
          <Button type="submit" className="boton-blanco-morado">
            Aceptar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

ModalRegistrarFecha.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ModalRegistrarFecha;
