import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalCambiarContraseña = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña actual</Form.Label>
            <Form.Control type="password" placeholder="Ingrese su contraseña actual" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña nueva</Form.Label>
            <Form.Control type="password" placeholder="Ingrese nueva contraseña" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar contraseña nueva</Form.Label>
            <Form.Control type="password" placeholder="Confirme nueva contraseña" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary">
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCambiarContraseña;
