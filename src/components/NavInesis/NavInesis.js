import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../styles/StylesNav/NavUsuarios.css';
import { NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

// Importando imagenes
import perfilIcon from '../../assets/perfilIcon.png'

export const NavInesis = () => {
  return (
    <div style={{ background: 'var(--color-gris2)', borderRadius: '12px' }} className='m-4 px-5'>
      <Navbar expand="lg" style={{ backgroundColor: '', color: 'black' }}>
        <Container fluid>
          {/* INESIS completamente a la izquierda */}
          <Navbar.Brand
            href="/PrincipalAdmin"
            className='fs-1 me-auto d-flex align-items-center'
          >
            <h1 style={{ color: 'var(--color-morado1)', fontWeight: 'bold' }}>
              INESIS
            </h1>
          </Navbar.Brand>

          {/* Toggle para dispositivos móviles */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'white' }} />

          {/* Menú completamente a la derecha y centrado verticalmente */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">

              <NavItem className='me-5 fs-5 opciones nav-item-op' style={{ color: "var(--color-morado2)" }}>
                <p className='mb-0'>Beca colegiatura</p>
              </NavItem>

              {/* Opción 2: Lineamientos */}
              <NavItem className='me-5 fs-5 opciones nav-item-op'>
                <Link to="/lineamientos" className="text-decoration-none text-dark">
                  <p className='mb-0' style={{ color: "var(--color-morado2)" }}>Lineamientos</p>
                </Link>
              </NavItem>

              {/* Dropdown del usuario */}
              <NavDropdown
                className='me-5 no-caret custom-dropdown'
                title={<img src={perfilIcon} style={{ width: '40px' }} alt="Perfil" />}
              >
                <NavDropdown.Item href="#">Mi cuenta</NavDropdown.Item>
                <NavDropdown.Item href="#">Cambiar contraseña</NavDropdown.Item>
                <NavDropdown.Item>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavInesis;
