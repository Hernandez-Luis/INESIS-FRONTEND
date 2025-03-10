import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../styles/StylesNav/NavUsuarios.css';

export const NavInesis = () => {
  return (
    <div className='colorNav'>
      <Navbar expand="lg" 
        style={{ backgroundColor: 'var(--color-morado1)', color: 'white' }}
      >
        <Container>
          <Navbar.Brand href="/PrincipalAdmin" className='size-font-title-nav fs-1'>
            U Z A C H I
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'white' }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

              <NavDropdown 
                className='size-font-subtitle' 
                title={<span style={{ color: 'white' }}>Catálogos</span>}
              >
                <NavDropdown.Item href="/GestionTransporte">Transportes</NavDropdown.Item>
                <NavDropdown.Item href="/AgregarComunidades">Comunidades</NavDropdown.Item>
                <NavDropdown.Item href="/ClientesFrecuentes">Clientes frecuentes</NavDropdown.Item>
                <NavDropdown.Item href="/titulares">Titulares</NavDropdown.Item>
                <NavDropdown.Item href="/remitentes">Remitentes</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown 
                className='ms-3 no-caret custom-dropdown' 
                title={<img src="/ruta-de-tu-imagen.png" style={{ width: '40px' }} />}
              >
                <NavDropdown.Item href="#">Mi cuenta</NavDropdown.Item>
                <NavDropdown.Item href="#">Cambiar contraseña</NavDropdown.Item>
                <NavDropdown.Item 
                >
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavInesis;
