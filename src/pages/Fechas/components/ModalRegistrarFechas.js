import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../../Fechas/components/AdministrarFechas.css';
import carreraService from '../../../services/CatCarreraService';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import fechaService from '../../../services/FechasRegistradasService';

const ModalRegistrarFecha = ({  show, 
  handleClose, 
  onSubmit,
  modoEdicion = false, // Nueva prop para determinar el modo
  fechaEditar = null // Nueva prop para datos a editar
}) => {
  const [formData, setFormData] = useState({
    idCarrera: "",
    fechaInicio: "",
    fechaFin: ""
  });

  const [validated, setValidated] = useState(false);
  const [carreras, setCarreras] = useState([]);

  // Efecto para manejar cambios entre modos
  useEffect(() => {
    if (modoEdicion && fechaEditar) {
      setFormData({
        idCarrera: fechaEditar.carrera.id,
        fechaInicio: fechaEditar.fechaInicio.split('T')[0],
        fechaFin: fechaEditar.fechaFin.split('T')[0]
      });
    } else {
      setFormData({ idCarrera: "", fechaInicio: "", fechaFin: "" });
    }
  }, [show, modoEdicion, fechaEditar]);

  // Cargar carreras solo en modo registro
  useEffect(() => {
    if (show && !modoEdicion) {
      const fetchData = async () => {
        try {
          const [carrerasResponse, fechasResponse] = await Promise.all([
            carreraService.getAll(),
            fechaService.getAll()
          ]);
          
          const carrerasConFechas = fechasResponse.map(f => f.carrera.id);
          const carrerasDisponibles = carrerasResponse.filter(
            c => !carrerasConFechas.includes(c.id)
          );

          if (carrerasDisponibles.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'Todas las carreras tienen fechas',
              confirmButtonColor: '#6f42c1'
            }).then(handleClose);
          }
          
          setCarreras(carrerasDisponibles);
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      };

      fetchData();
    }
  }, [show, modoEdicion]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'idCarrera' ? Number(value) : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      Swal.fire({
        icon: 'info',
        title: 'Campos incompletos',
        confirmButtonColor: '#6f42c1'
      });
      return setValidated(true);
    }

    try {
      if (modoEdicion) {
        await fechaService.update(fechaEditar.id, formData);
      } else {
        await fechaService.create(formData);
      }

      Swal.fire({
        icon: 'success',
        title: `Fecha ${modoEdicion ? 'actualizada' : 'registrada'}!`,
        confirmButtonColor: '#6f42c1'
      });

      handleClose();
      onSubmit();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: `Error al ${modoEdicion ? 'editar' : 'registrar'}`,
        confirmButtonColor: '#6f42c1'
      });
    }
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
          {modoEdicion ? 'Editar fecha' : 'Registrar fecha'}
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="pt-0">
          <Form.Group className="mb-4">
            <Form.Label className="text-white fw-bold mb-2">
              Carrera:
            </Form.Label>
            
            {modoEdicion ? (
              <Form.Control
                plaintext
                readOnly
                value={fechaEditar?.carrera?.nombreCarrera || ''}
                className="text-white"
              />
            ) : (
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
            )}
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
                min={modoEdicion ? undefined : new Date().toISOString().split('T')[0]}
              />
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
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-top-0 justify-content-center mt-0">
          <Button type="submit" className="boton-blanco-morado">
            {modoEdicion ? 'Guardar cambios' : 'Aceptar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

ModalRegistrarFecha.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  modoEdicion: PropTypes.bool,
  fechaEditar: PropTypes.object
};
export default ModalRegistrarFecha;
