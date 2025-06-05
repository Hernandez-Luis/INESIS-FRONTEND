import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import '../CambiarContraseña/ModalCambiarContraseña.css';

const ModalCambiarContraseña = ({ show, handleClose }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para cambiar la contraseña
    alert("Contraseña cambiada con éxito!");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="modal-cambiar-contraseña">
      <Modal.Body>
        <div className="containerCambiarContraseña">
          <h2 className="heading">Cambiar<br />Contraseña</h2>
          <form className="form" onSubmit={handleSubmit}>
            {/* Campo de contraseña actual */}
            <div className="password-input-container">
              <FiLock className="input-icon" />
              <input
                name="current"
                type={showCurrentPassword ? "text" : "password"}
                className="input"
                placeholder="Contraseña actual"
                value={passwords.current}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Campo de nueva contraseña */}
            <div className="password-input-container">
              <FiLock className="input-icon" />
              <input
                name="new"
                type={showNewPassword ? "text" : "password"}
                className="input"
                placeholder="Nueva contraseña"
                value={passwords.new}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Campo de confirmación */}
            <div className="password-input-container">
              <FiLock className="input-icon" />
              <input
                name="confirm"
                type={showConfirmPassword ? "text" : "password"}
                className="input"
                placeholder="Confirmar nueva contraseña"
                value={passwords.confirm}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Indicador de fortaleza de contraseña */}
            <div className="password-strength">
              <div className="strength-bar-container">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`strength-bar ${passwords.new.length > i * 3 ? 'active' : ''}`}
                  ></div>
                ))}
              </div>
              <div className="strength-label">
                {passwords.new.length > 0 ? (
                  passwords.new.length < 6 ? "Débil" :
                    passwords.new.length < 10 ? "Medio" : "Fuerte"
                ) : "Seguridad"}
              </div>
            </div>

            {/* Botones en disposición vertical */}
            <div className="buttons-container">
              <button type="submit" className="login-button">
                Guardar cambios
              </button>
              <button
                type="button"
                className="login-button cancel-button"
                onClick={handleClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCambiarContraseña;