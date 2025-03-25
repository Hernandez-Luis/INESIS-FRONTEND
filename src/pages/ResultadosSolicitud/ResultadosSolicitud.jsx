import React from "react";
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";

export default function ResultadosSolicitud() {
  const links = [
    { url: '/PrincipalAdmin', label: 'Inicio' },
    { url: '/PrincipalAdmin', label: 'Resultados Estudio' }
  ];

  return (
    <div>
      <NavInesis />
      <MigasRecorrido items={links} />
      <div>
        <div className="container m-2" style={{ marginTop: "0.5cm" }}>
          
        </div>
        <h1 className="titulo" style={{ textAlign: "center" }}>Mis comentarios</h1>
        <p className="estiloInputs" style={{ textAlign: "center", border: "none" }}>
          ¡Ups!, al parecer tienes detalles en tu formato
        </p>
        <p className="estiloInputs" style={{ textAlign: "center", border: "none" }}>
          Recuerda que tienes hasta el día 10 de octubre a las 23:59:59 para entregar tus correcciones.
        </p>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 rounded colorFondo m-2 p-4">
              <div style={{ textAlign: "center" }}>
                <p className="textoInputs">Observaciones</p>
                <span>
                  <p>No se adjuntó un comprobante de domicilio</p>
                  <p>Los datos del familiar están incompletos</p>
                </span>
              </div>
            </div>
          </div>
          <div className="form-check mt-3">
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-primary hBtn estiloBoton">Correguir</button>
            </div>
          </div>
        </div>
      </div>

      <FooterInesis />
    </div>
  );
}
