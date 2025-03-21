import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../styles/StylesNav/NavUsuarios.css';
import { NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import perfilIcon from '../../assets/perfilIcon.png';
import ModalCambiarContraseña from '../CambiarContraseña/ModalCambiarContraseña';

export const NavInesis = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div style={{ background: 'var(--color-gris2)', borderRadius: '12px' }} className='m-4 px-5'>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="/PrincipalAdmin" className='fs-1 me-auto d-flex align-items-center'>
            <h1 style={{ color: 'var(--color-morado1)', fontWeight: 'bold' }}>
              INESIS
            </h1>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'white' }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <NavItem className='me-5 fs-5 opciones nav-item-op' style={{ color: "var(--color-morado2)" }}>
                <p className='mb-0' style={{ fontWeight: 'lighter' }}>Beca colegiatura</p>
              </NavItem>

              <NavItem className='me-5 fs-5 opciones nav-item-op'>
                <Link to="/lineamientos" className="text-decoration-none text-dark">
                  <p className='mb-0' style={{ color: "var(--color-morado2)" }}>Lineamientos</p>
                </Link>
              </NavItem>

              <NavDropdown className='me-5 no-caret custom-dropdown' title={<img src={perfilIcon} style={{ width: '40px' }} alt="Perfil" />}>
                <NavDropdown.Item href="#">Mi cuenta</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setModalShow(true)}>Cambiar contraseña</NavDropdown.Item>
                <NavDropdown.Item>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal para cambiar contraseña */}
      <ModalCambiarContraseña show={modalShow} handleClose={() => setModalShow(false)} />
    </div>
  );
};

export default NavInesis;
