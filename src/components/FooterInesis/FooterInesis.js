import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Importa tus imágenes
import suneo from '../../assets/suneo.png';
import unsij from '../../assets/escudounsij.png';
import facebookIcon from '../../assets/facebbokFooter.png';
import moodleIcon from '../../assets/moodleFooter.png';
import telefonoIcon from '../../assets/telefonoFooter.png';
import correoIcon from '../../assets/correoFooter.png';
import ubicacionIcon from '../../assets/UbicacionFooter.png';

const FooterInesis = () => {
  return (
    <footer
      className="text-center text-lg-start"
      style={{ backgroundColor: '#fff' }} // Fondo blanco
    >
      {/* Línea superior morado3 */}
      <hr style={{ borderTop: '3px solid var(--color-morado3)', margin: 0 }} />

      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          {/* Universidad */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: 'var(--color-morado3)' }}
            >
              UNIVERSIDAD DE LA SIERRA JUÁREZ
            </h6>
            <p className="text-center mt-4">
              <a href="https://www.suneo.mx/web/">
                <img
                  src={suneo}
                  alt="Suneo Logo"
                  className="img-fluid me-3"
                  width={80}
                />
              </a>
              <a href="https://www.unsij.edu.mx/">
                <img
                  src={unsij}
                  alt="Unsij Logo"
                  className="img-fluid"
                  width={80}
                />
              </a>
            </p>
          </div>

          {/* Visítanos */}
          <div className="col-md-2 col-lg-3 col-xl-1 mx-auto mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: 'var(--color-morado3)' }}
            >
              Visítanos
            </h6>
            <p>
              <a
                href="https://www.facebook.com/UNSIJ.SUNEO"
                className="text-reset text-decoration-none d-inline-flex align-items-center"
              >
                <img
                  src={facebookIcon}
                  alt="Facebook Logo"
                  style={{ width: '20px', marginRight: '8px' }}
                />
                <span  style={{color: 'var(--color-gris1)'}}>Facebook</span>
              </a>
            </p>
            <p>
              <a
                href="https://aula.unsij.edu.mx/moodle/"
                className="text-reset text-decoration-none d-inline-flex align-items-center"
              >
                <img
                  src={moodleIcon}
                  alt="Moodle Logo"
                  style={{ width: '20px', marginRight: '8px' }}
                />
                <span  style={{color: 'var(--color-gris1)'}}>Moodle</span>
              </a>
            </p>
          </div>

          {/* Contáctanos */}
          <div className="col-md-3 col-lg-2 col-xl-3 mx-auto mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: 'var(--color-morado3)' }}
            >
              Contáctanos
            </h6>
            <p  style={{color: 'var(--color-gris1)'}}>
              <img
                src={telefonoIcon}
                alt="Teléfono"
                style={{ width: '20px', marginRight: '8px' }}
              />
              Teléfono: +52 951 000 00 00
            </p>
            <p style={{color: 'var(--color-gris1)'}}>
              <img
                src={correoIcon}
                alt="Correo"
                style={{ width: '20px', marginRight: '8px' }}
              />
              Correo: info@example.com
            </p>
            <p style={{color: 'var(--color-gris1)'}}>
              <img
                src={ubicacionIcon}
                alt="Ubicación"
                style={{ width: '20px', marginRight: '8px' }}
              />
              Dirección: Avenida Universidad S/N, Ixtlán de Juárez, Oaxaca, México C.P. 68725
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center p-3" style={{ background: 'var(--color-gris2)',  color: 'var(--color-gris1)'}}>
        © 2024 Copyright:
        <a
          className="fw-bold text-reset"
          href="https://www.unsij.edu.mx/index.html"
        >
          {' '}UNSIJ
        </a>
      </div>
    </footer>
  );
};

export default FooterInesis;
