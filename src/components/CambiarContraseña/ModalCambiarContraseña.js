import React from "react";
import { Modal } from "react-bootstrap";
import '../CambiarContraseña/ModalCambiarContraseña.css';

const ModalCambiarContraseña = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <div className="container">
          <h2 className="heading">Cambiar<br />Contraseña</h2>
          <form className="form">
            <input
              type="password"
              className="input"
              placeholder="Confirmar contraseña actual"
            />
            <input
              type="password"
              className="input"
              placeholder="Nueva contraseña"
            />
            <input
              type="password"
              className="input"
              placeholder="Confirmar nueva contraseña"
            />
            <button type="submit" className="login-button">
              Guardar
            </button>
            <button
              type="button"
              className="login-button"
              style={{ background: "gray" }}
              onClick={handleClose}
            >
              Cancelar
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCambiarContraseña;
