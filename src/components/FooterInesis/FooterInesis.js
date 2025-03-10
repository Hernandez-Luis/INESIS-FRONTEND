import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import suneo from '../../assets/suneo.png';
import unsij from '../../assets/escudounsij.png';


const FooterInesis = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      <hr />
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          {/* Universidad */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">UNIVERSIDAD DE LA SIERRA JUÁREZ</h6>
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
            <h6 className="text-uppercase fw-bold mb-4">Visítanos</h6>
            <p>
              <a href="https://www.facebook.com/UNSIJ.SUNEO" className="text-reset text-decoration-none">
                <i className="bi bi-facebook me-2"></i> Facebook
              </a>
            </p>
            <p>
              <a href="https://aula.unsij.edu.mx/moodle/" className="text-reset text-decoration-none">
                <i className="bi bi-mortarboard me-2"></i> Moodle
              </a>
            </p>
          </div>

          {/* Contáctanos */}
          <div className="col-md-3 col-lg-2 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contáctanos</h6>
            <p>
              <i className="bi bi-telephone me-2"></i> Teléfono: +52 951 000 00 00
            </p>
            <p>
              <i className="bi bi-envelope me-2"></i> Correo: info@example.com
            </p>
            <p>
              <i className="bi bi-geo-alt me-2"></i> Dirección: Avenida Universidad S/N, Ixtlán de Juárez, Oaxaca, México C.P. 68725
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        © 2024 Copyright: <a className="fw-bold text-reset" href="https://www.unsij.edu.mx/index.html">UNSIJ</a>
      </div>
    </footer>
  );
};

export default FooterInesis;
