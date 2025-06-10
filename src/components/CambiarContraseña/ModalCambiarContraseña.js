import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import '../CambiarContraseña/ModalCambiarContraseña.css';
import UsuarioService from '../../services/UsuarioService';
import Swal from 'sweetalert2';

const ModalCambiarContraseña = ({ show, handleClose, requireCurrentPassword }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const passwordInfoRef = useRef(null);
  const [error, setError] = useState({});

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    if (!show) {
      setPasswords({ current: "", new: "", confirm: "" });
      setError({});
    }
  }, [show]);

  useEffect(() => {
    if (!showPasswordInfo) return;

    function handleClickOutside(event) {
      if (
        passwordInfoRef.current &&
        !passwordInfoRef.current.contains(event.target) &&
        event.target.id !== "show-password-info-btn"
      ) {
        setShowPasswordInfo(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPasswordInfo]);

  const mostrarAlerta = (config) => {
    Swal.fire({
      ...config,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        confirmButton.style.backgroundColor = '#28a745';
        confirmButton.style.color = 'white';
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
    setError({});
  };

  const validate = () => {
    const validationErrors = {};

    if (!passwords.new.trim()) {
      validationErrors.new = true;
    } else if (passwords.new.length < 8) {
      validationErrors.new = "La nueva contraseña debe tener al menos 8 caracteres.";
    } else if (passwords.new.length > 18) {
      validationErrors.new = "La nueva contraseña no debe exceder 18 caracteres.";
    } else if (/\s/.test(passwords.new)) {
      validationErrors.new = "No se permiten espacios en blanco.";
    } else if (!/[A-Z]/.test(passwords.new)) {
      validationErrors.new = "Debe contener al menos una letra mayúscula.";
    } else if (!/[a-z]/.test(passwords.new)) {
      validationErrors.new = "Debe contener al menos una letra minúscula.";
    } else if (!/[0-9]/.test(passwords.new)) {
      validationErrors.new = "Debe contener al menos un número.";
    } else if (!/[!@#$%^&*(),.?":{}|<>$@$!%*?&#.$()\-_]/.test(passwords.new)) {
      validationErrors.new = "Debe contener al menos un carácter especial (ej. $@$!%*?&#).";
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Detectar campos vacíos
    const newErrors = {};
    if (requireCurrentPassword && !passwords.current.trim()) {
      newErrors.current = true;
    }
    if (!passwords.new.trim()) {
      newErrors.new = true;
    }
    if (!passwords.confirm.trim()) {
      newErrors.confirm = true;
    }

    // Si hay campos vacíos, mostrar alerta y marcar solo los vacíos
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      mostrarAlerta({
        icon: 'info',
        title: '¡Ups! Verifica los campos',
        text: 'Todos los campos son obligatorios'
      });
      return;
    }

    // Validar que las contraseñas coincidan
    if (passwords.new !== passwords.confirm) {
      setError({ confirm: "Las contraseñas no coinciden" });
      mostrarAlerta({
        icon: 'info',
        title: '¡Ups! Verifica los campos',
        text: 'Las contraseñas no coinciden'
      });
      return;
    }

    // Validaciones de formato de contraseña
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      const firstError = Object.values(validationErrors)[0];
      mostrarAlerta({
        icon: 'info',
        title: '¡Ups! Verifica los campos',
        text: firstError + ' Apoyate de la ayuda para crear una contraseña segura.'
      });
      return;
    }

    // Si se requiere la contraseña actual, verificarla con el backend
    if (requireCurrentPassword) {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        console.log("Usuario actual:", usuario);
        const data = await UsuarioService.verificarContrasena({
          usuario: usuario.usuario,
          contrasena: passwords.current
        });
        console.log("Verificación de contraseña:", data);
        if (!data.valida) {
          mostrarAlerta({
            icon: 'warning',
            title: 'Advertencia ⚠️',
            text: 'La contraseña actual es incorrecta.'
          });
          return;
        }
      } catch (err) {
        mostrarAlerta({
          icon: 'error',
          title: 'Error',
          text: 'Error al verificar la contraseña.'
        });
        return;
      }
    }

    // Aquí iría la lógica para cambiar la contraseña (otro fetch al backend)
    mostrarAlerta({
      icon: 'success',
      title: '¡Contraseña cambiada con éxito!',
      text: 'La contraseña ha sido cambiada correctamente.'
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="modal-cambiar-contraseña">
      <Modal.Body>
        <div className="mcambiar-container">
          <h2 className="mcambiar-heading">Cambiar<br />Contraseña</h2>
          <form className="mcambiar-form" onSubmit={handleSubmit}>

            {/* Campo de contraseña actual */}
            {requireCurrentPassword && (
              <div className="mcambiar-password-input-container">
                <FiLock className="mcambiar-input-icon" />
                <input
                  name="current"
                  type={showCurrentPassword ? "text" : "password"}
                  className={`mcambiar-input${error.current ? " mcambiar-input-error" : ""}`} placeholder="Contraseña actual"
                  value={passwords.current}
                  onChange={handleChange}
                  maxLength={18}
                  minLength={8}
                />
                <button
                  type="button"
                  className="mcambiar-password-toggle"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            )}

            {/* Campo de nueva contraseña */}
            <div className="mcambiar-password-input-container">
              <FiLock className="mcambiar-input-icon" />
              <input
                name="new"
                type={showNewPassword ? "text" : "password"}
                className={`mcambiar-input${error.new ? " mcambiar-input-error" : ""}`}
                placeholder="Nueva contraseña"
                value={passwords.new}
                onChange={handleChange}
                maxLength={18}
                minLength={8}
              />
              <button
                type="button"
                className="mcambiar-password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>

            {/* Campo de confirmación */}
            <div className="mcambiar-password-input-container">
              <FiLock className="mcambiar-input-icon" />
              <input
                name="confirm"
                type={showConfirmPassword ? "text" : "password"}
                className={`mcambiar-input${error.confirm ? " mcambiar-input-error" : ""}`}
                placeholder="Confirmar nueva contraseña"
                value={passwords.confirm}
                onChange={handleChange}
                maxLength={18}
                minLength={8}
              />
              <button
                type="button"
                className="mcambiar-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>

            <button
              type="button"
              id="show-password-info-btn"
              className="btn btn-link p-0 ms-2"
              style={{ fontSize: '0.95em', color: '#6c63ff', textDecoration: 'underline', background: 'none', border: 'none' }}
              onClick={() => setShowPasswordInfo(!showPasswordInfo)}
              tabIndex={-1}
            >
              ¿Cómo debe ser la contraseña?
            </button>
            {showPasswordInfo && (
              <div className="mcambiar-password-info" ref={passwordInfoRef}>
                <ul>
                  <li>8-18 caracteres</li>
                  <li>Al menos una mayúscula y una minúscula</li>
                  <li>Al menos un número</li>
                  <li>Al menos un carácter especial ($@$!%*?&#.$()-$_)</li>
                  <li>Sin espacios</li>
                </ul>
              </div>
            )}
            {/* Indicador de fortaleza de contraseña */}
            <div className="mcambiar-password-strength">
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
                  passwords.new.length < 8 ? "Débil" :
                    passwords.new.length < 12 ? "Medio" : "Fuerte"
                ) : "Seguridad"}
              </div>
            </div>


            <div className="buttons-container">
              <button
                type="button"
                className="mcambiar-login-button mcambiar-cancel-button"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button type="submit" className="mcambiar-login-button">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCambiarContraseña;