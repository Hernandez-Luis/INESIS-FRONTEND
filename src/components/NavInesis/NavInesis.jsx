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
    <div style={{ background: 'var(--color-gris2)', borderRadius: '12px' }} className='m-4 px-5'>
      <Navbar expand="lg">
        <Container fluid>
          {usuario && usuario.rol === 1 && (
            <Navbar.Brand href="/menuAlumno" className='fs-1 me-auto d-flex align-items-center'>
              <h1 style={{ color: 'var(--color-morado1)', fontWeight: 'bold' }}>
                INESIS
              </h1>
            </Navbar.Brand>
          )}

          {usuario && usuario.rol === 2 && (
            <Navbar.Brand href="/menuAdministrador" className='fs-1 me-auto d-flex align-items-center'>
              <h1 style={{ color: 'var(--color-morado1)', fontWeight: 'bold' }}>
                INESIS
              </h1>
            </Navbar.Brand>
          )}

          {usuario && usuario.rol === 3 && (
            <Navbar.Brand href="/menuRevisor" className='fs-1 me-auto d-flex align-items-center'>
              <h1 style={{ color: 'var(--color-morado1)', fontWeight: 'bold' }}>
                INESIS
              </h1>
            </Navbar.Brand>
          )}

          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'white' }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              {usuario && usuario.rol === 1 && (<NavItem className='me-5 fs-5 opciones nav-item-op' style={{ color: "var(--color-morado2)" }}>
                <Link to="/menuSolicitar" className="text-decoration-none text-dark">
                  <p className='mb-0' style={{ color: "var(--color-morado2)" }}>Estudio socioeconómico</p>
                </Link>
              </NavItem>
              )}

              {usuario && usuario.rol !== 2 && (
                <NavItem className='me-5 fs-5 opciones nav-item-op'>
                  <Link to="/lineamientos" className="text-decoration-none text-dark">
                    <p className='mb-0' style={{ color: "var(--color-morado2)" }}>Lineamientos</p>
                  </Link>
                </NavItem>
              )}


              <NavDropdown className='me-5 no-caret custom-dropdown' title={<img src={perfilIcon} style={{ width: '40px' }} alt="Perfil" />}>
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
