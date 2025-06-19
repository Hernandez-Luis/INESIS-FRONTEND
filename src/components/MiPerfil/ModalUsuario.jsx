import React from "react";
import Modal from "react-bootstrap/Modal";
import imagenPerfil from "../../assets/perfilIcon.png";

// Componente ModalUsuario
export const ModalUsuario = ({ mostrar, cerrarModal }) => {
  // Recuperar los datos del usuario desde el localStorage
  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

  // Por si no hay datos (precaución)
  const nombreUsuario = usuarioGuardado?.usuario || 'Nombre no disponible';
  const idUsuario = usuarioGuardado?.id || 'ID no disponible';
  const rolUsuario = usuarioGuardado?.rol || 'Alumno';

  return (
    <Modal show={mostrar} onHide={cerrarModal} centered>
      {/* Encabezado del modal */}
      <div
        style={{
          backgroundColor: '#6366F1',
          textAlign: 'center',
          padding: '15px 0',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
      >
        <h5 style={{ margin: 0, color: 'white', fontWeight: 'bold' }}>
          Rol: {rolUsuario}
        </h5>
      </div>

      {/* Cuerpo del modal */}
      <Modal.Body style={{ textAlign: 'center', padding: '30px 20px' }}>
        <img
          src={imagenPerfil}
          alt="Perfil"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            marginBottom: '15px',
          }}
        />
        <h5 style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          Usuario: {nombreUsuario}
        </h5>
        
      </Modal.Body>
    </Modal>
  );
};

export default ModalUsuario;
