/**
 * ============================================================================
 * MÓDULO: ModalRegistrarFechas.js
 * DESCRIPCIÓN:
 * Modal para registrar o editar fechas de inicio y cierre de procesos
 * de registro de alumnos por carrera.
 *
 * FUNCIONALIDADES:
 * - Registro de nuevas fechas para carreras sin fechas asignadas.
 * - Edición de fechas existentes.
 * - Opción de reiniciar proceso de registro de alumnos.
 * - Validación de formulario.
 * - Filtrado automático de carreras ya registradas.
 * - Cálculo de fecha mínima (hoy).
 *
 * DEPENDENCIAS:
 * - React (hooks: useState, useEffect)
 * - React Bootstrap (Modal, Form, Button)
 * - React Icons (FiCalendar, FiBook, FiX)
 * - PropTypes
 * - SweetAlert2
 * - FechasRegistradasService
 * - CatCarreraService
 *
 * AUTOR: Nayeli Velasco López, Luis David Pérez Cruz
 * PROYECTO: INESIS (Sistema de Información Socioeconómica)
 * FECHA DE CREACIÓN: 9 de marzo de 2025
 * ÚLTIMA MODIFICACIÓN: 21 de abril de 2026
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../../Fechas/components/AdministrarFechas.css';
import carreraService from '../../../services/CatCarreraService';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import fechaService from '../../../services/FechasRegistradasService';
import { FiCalendar, FiBook, FiX } from "react-icons/fi";

const ModalRegistrarFecha = ({  
  show, 
  handleClose, 
  onSubmit,
  modoEdicion = false, // Determina si es modo creación (false) o edición (true)
  fechaEditar = null   // Objeto con los datos de la fecha a editar
}) => {
  // ========== ESTADOS ==========
  // Estado del formulario con valores de entrada
  const [formData, setFormData] = useState({
    idCarrera: "",
    fechaInicio: "",
    fechaFin: "",
    reiniciarProceso: false // Solo disponible en modo edición
  });

  const [validated, setValidated] = useState(false);
  const [carreras, setCarreras] = useState([]);

  // ========== EFECTO: CARGAR DATOS AL ABRIR MODAL ==========
  // Carga datos de la fecha a editar o reinicia el formulario para nuevo registro
  useEffect(() => {
    if (modoEdicion && fechaEditar) {
      setFormData({
        idCarrera: fechaEditar.carrera.id,
        fechaInicio: fechaEditar.fechaInicio.split('T')[0],
        fechaFin: fechaEditar.fechaFin.split('T')[0],
        reiniciarProceso: false
      });
    } else {
      setFormData({ idCarrera: "", fechaInicio: "", fechaFin: "" });
    }
  }, [show, modoEdicion, fechaEditar]);

  // ========== EFECTO: CARGAR CARRERAS EN MODO REGISTRO ==========
  // En modo registro, obtiene lista de carreras sin fechas asignadas
  // En modo edición, no ejecuta esta lógica
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

  // ========== FUNCIÓN: MANEJAR CAMBIO DE CAMPO ==========
  // Actualiza el estado del formulario cuando cambia un campo
  // Maneja conversiones de tipo según el campo
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'idCarrera' ? Number(value) : field === 'reiniciarProceso' ? !!value : value
    }));
  };

  // ========== FUNCIÓN: ENVIAR FORMULARIO ==========
  // Valida el formulario y guarda o actualiza la fecha según el modo
  // En modo edición, permite reiniciar el proceso de registro
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

    if (modoEdicion) {
      const nombreCarrera = fechaEditar?.carrera?.nombreCarrera || "esta carrera";
      const swalHtml = formData.reiniciarProceso
        ? `Has marcado reiniciar. Si continúas, se reiniciará el periodo de registro y <b>TODOS</b> los alumnos de <b>${nombreCarrera}</b> deberán volver a realizar el proceso de registro. ¿Deseas continuar?`
        : `Vas a editar las fechas de la carrera <b>${nombreCarrera}</b>. Esto actualizará el periodo de registro pero no reiniciará los registros actuales. ¿Deseas continuar?`;

      const result = await Swal.fire({
        title: '¿Estás seguro?',
        html: swalHtml,
        icon: formData.reiniciarProceso ? 'warning' : 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: formData.reiniciarProceso ? 'Sí, reiniciar y guardar' : 'Sí, guardar cambios',
        cancelButtonText: 'Cancelar'
      });

      if (!result.isConfirmed) return;
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

  // ========== FUNCIÓN: OBTENER FECHA ACTUAL EN FORMATO LOCAL ==========
  // Devuelve la fecha de hoy en formato YYYY-MM-DD para el atributo min del input
  const obtenerFechaActualLocal = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  };

  // ========== RENDERIZADO ==========
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      className="modal-fechas"
    >
      <Modal.Header closeButton className="border-bottom-0 text-center close-white modal-header-fechas">
        <Modal.Title as="h3" className="modal-title-fechas modal-title-icon">
            <FiCalendar className="modal-title-icon" />
          {modoEdicion ? 'Editar fecha' : 'Registrar fecha'}
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="modal-body-fechas">
          <Form.Group className="mb-4">
             <Form.Label className="form-label-fechas">
              <FiBook className="label-icon" />
              Carrera:
            </Form.Label>
            
            {modoEdicion ? (
              <Form.Control
              className="readonly-field"
                plaintext
                value={fechaEditar?.carrera?.nombreCarrera || ''}
               
              />
            ) : (
              <Form.Select
                required
                value={formData.idCarrera}
                onChange={(e) => handleChange('idCarrera', e.target.value)}
                className="rounded-3 py-2"
              >
                <option value="">Seleccione una</option>
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
               <Form.Label className="form-label-fechas">
                <FiCalendar className="label-icon" />
                Fecha de Inicio
              </Form.Label>
              <Form.Control
                required
                type="date"
                value={formData.fechaInicio}
                onChange={(e) => handleChange('fechaInicio', e.target.value)}
                className="rounded-3 py-2"
                min={obtenerFechaActualLocal()}
              />
            </Form.Group>

            <Form.Group className="col-md-6 mb-4">
               <Form.Label className="form-label-fechas">
                <FiCalendar className="label-icon" />
                Fecha de Cierre
              </Form.Label>
              <Form.Control
                required
                type="date"
                value={formData.fechaFin}
                onChange={(e) => handleChange('fechaFin', e.target.value)}
                className="rounded-3 py-2"
                min={formData.fechaInicio || obtenerFechaActualLocal()}
              />
            </Form.Group>
          </div>
          {modoEdicion && (
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="reiniciarProceso"
                label="Reiniciar proceso de registro de alumnos"
                checked={!!formData.reiniciarProceso}
                onChange={(e) => handleChange('reiniciarProceso', e.target.checked)}
              />
              <Form.Text className="text-muted">Si marcas esta casilla, se reiniciará el periodo de registro y TODOS los alumnos deberán volver a realizar el proceso de registro. Usa esta opción solo si quieres reiniciar por completo los registros relacionados.</Form.Text>
            </Form.Group>
          )}
          {!modoEdicion && (
            <div className="info-card-fechas">
              <FiCalendar className="info-icon" />
              <span>Seleccione una carrera que aún no tenga fechas registradas</span>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="modal-footer-fechas">
          <Button type="submit" className="btn-fechas">
            {modoEdicion ? 'Guardar cambios' : 'Aceptar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// Validación de props con PropTypes
ModalRegistrarFecha.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  modoEdicion: PropTypes.bool,
  fechaEditar: PropTypes.object
};

// Exporta el componente para que pueda ser usado en AdministrarFechas.jsx
export default ModalRegistrarFecha;
