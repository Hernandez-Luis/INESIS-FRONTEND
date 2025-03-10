import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../styles/StylesNav/NavUsuarios.css';

export const NavInesis = () => {
  return (
    <div style={{background: 'var(--color-gris2)', borderRadius: '12px'}} className='m-4'>
      <Navbar expand="lg" 
        style={{ backgroundColor: '', color: 'white' }}
      >
        <div className='w-100 d-flex justify-content-end'>
        <div className='d-flex align-items-center' style={{ marginRight: 'auto' }}>
            <Navbar.Brand href="/PrincipalAdmin" className='fs-1'>
              <h1 style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>
                INESIS
              </h1>
            </Navbar.Brand>
          </div>
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
        </div>
      </Navbar>
    </div>
  );
}

export default NavInesis;
