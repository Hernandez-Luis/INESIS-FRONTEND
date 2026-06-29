import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../styles/StylesNav/NavUsuarios.css';
import { NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import perfilIcon from '../../assets/perfilIcon.png';
import ModalUsuario from '../MiPerfil/ModalUsuario';
import ModalCambiarContraseña from '../CambiarContraseña/ModalCambiarContraseña';
import { useNavigate } from 'react-router-dom';


export const NavInesis = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false); //ModalUsuario
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('usuario'); // Borra datos del usuario
    navigate('/'); // Redirige al login
  };

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioString = localStorage.getItem('usuario'); // Esto es un STRING
    if (usuarioString) {
      const usuarioObjeto = JSON.parse(usuarioString); // Aquí ya es un OBJETO
      setUsuario(usuarioObjeto);
    }
  }, []);


  return (
    <div style={{ background: 'var(--color-gris2)', borderRadius: '12px' }} className='mx-2 my-2 mx-md-4 my-md-3 px-1 px-md-3 sticky-top'>
      <Navbar expand="lg">
        <Container fluid>
          {usuario && usuario.rol === 1 && (
            <Navbar.Brand href="/menuAlumno" className='me-auto d-flex align-items-center'>
              <span className="inesis-brand">INESIS</span>
            </Navbar.Brand>
          )}

          {usuario && usuario.rol === 2 && (
            <Navbar.Brand href="/menuAdministrador" className='me-auto d-flex align-items-center'>
              <span className="inesis-brand">INESIS</span>
            </Navbar.Brand>
          )}

          {usuario && usuario.rol === 3 && (
            <Navbar.Brand href="/menuRevisor" className='me-auto d-flex align-items-center'>
              <span className="inesis-brand">INESIS</span>
            </Navbar.Brand>
          )}

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="nav-toggle-custom"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center nav-collapse-menu">
              {usuario && usuario.rol === 1 && (
                <NavItem className='me-0 me-lg-5 fs-5 opciones nav-item-op'>
                  <Link to="/menuSolicitar" className="text-decoration-none">
                    <p className='mb-0' style={{ color: "var(--color-morado2)" }}>Estudio socioeconómico</p>
                  </Link>
                </NavItem>
              )}

              {usuario && usuario.rol !== 2 && (
                <NavItem className='me-0 me-lg-5 fs-5 opciones nav-item-op'>
                  <Link to="/lineamientos" className="text-decoration-none">
                    <p className='mb-0' style={{ color: "var(--color-morado2)" }}>Lineamientos</p>
                  </Link>
                </NavItem>
              )}

              <NavDropdown className='me-0 me-lg-3 no-caret custom-dropdown' title={<img src={perfilIcon} style={{ width: '38px' }} alt="Perfil" />}>
                <NavDropdown.Item onClick={() => setShowProfileModal(true)}>Mi cuenta</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setModalShow(true)}>Cambiar contraseña</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal para cambiar contraseña */}
      <ModalCambiarContraseña show={modalShow} handleClose={() => setModalShow(false)} requireCurrentPassword={true} />
      {/* Modal para mostrar perfil */}
      <ModalUsuario mostrar={showProfileModal} cerrarModal={() => setShowProfileModal(false)} usuario={{ nombre: 'Luis Alberto Hernández Ramírez', rol: 'Estudiante' }} />


    </div>
  );
};

export default NavInesis;
