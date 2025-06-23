import React, { useEffect, useState } from "react"; 
import Modal from "react-bootstrap/Modal"; 
import imagenPerfil from "../../assets/perfilIcon.png";
import UsuarioService from "../../services/UsuarioService";

export const ModalUsuario = ({ mostrar, cerrarModal }) => {
  // Estados de almacenar el nombre del usuario y el nombre del rol
  const [nombreUsuario, setNombreUsuario] = useState("Cargando...");
  const [nombreRol, setNombreRol] = useState("Cargando...");

  useEffect(() => {
    // Recuperacion de datos del localStorage
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    const idUsuario = usuarioGuardado?.id;

    if (idUsuario) {
      // Peticion a back para obtener los datos del usuario por ID
      UsuarioService.getById(idUsuario)
        .then((usuarioCompleto) => {
          // Se actualizan los estados con los datos obtenidos
          setNombreUsuario(usuarioCompleto.usuario || "Nombre no disponible");
          setNombreRol(usuarioCompleto.rol?.nombreRol || "Rol no disponible");
        })
        .catch(() => {
          setNombreUsuario("Nombre no disponible");
          setNombreRol("Rol no disponible");
        });
    }
  }, []);

  return (
    <Modal show={mostrar} onHide={cerrarModal} centered>
      <div
        style={{
          backgroundColor: "#6366F1",
          textAlign: "center",
          padding: "15px 0",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <h5 style={{ margin: 0, color: "white", fontWeight: "bold" }}>
          Rol: {nombreRol} 
        </h5>
      </div>

      <Modal.Body style={{ textAlign: "center", padding: "30px 20px" }}>
        <img
          src={imagenPerfil} 
          alt="Perfil"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%", 
            marginBottom: "15px",
          }}
        />
        <h5 style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Usuario: {nombreUsuario}
        </h5>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUsuario;
