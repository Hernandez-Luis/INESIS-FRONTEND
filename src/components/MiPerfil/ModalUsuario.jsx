import React from "react";
import Modal from "react-bootstrap/Modal";
import imagenPerfil from "../../assets/perfilIcon.png";  // Imagen estática


// Componente ModalUsuario
export const ModalUsuario = ({ mostrar, cerrarModal, usuario }) => {
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
          Usuario: {usuario.rol || 'Alumno'}  {/* Usando el rol del usuario, por defecto 'Alumno' */}
        </h5>
      </div>

      {/* Cuerpo del modal */}
      <Modal.Body style={{ textAlign: 'center', padding: '30px 20px' }}>
        <img
          src={imagenPerfil}  // Aquí usamos la misma imagen estática de perfil
          alt="Perfil"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',  // Esto hace que la imagen sea circular
            marginBottom: '15px',  // Espaciado abajo
          }}
        />
        <h5 style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          Usuario: {usuario.nombre || 'Luis Alberto Hernández Ramírez'}  {/* Usando el nombre del usuario */}
        </h5>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUsuario;
