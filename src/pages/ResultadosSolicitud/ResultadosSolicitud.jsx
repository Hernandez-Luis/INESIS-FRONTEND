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
      <div className="container text-center mt-4">
        <h1 className="fw-bold" style={{ color: "#6658d3" }}>Resultado Estudio Socioeconomico</h1>
        <p className="fw-semibold" style={{ color: "#6658d3" }}>
          ¡Ups!, al parecer tienes detalles en tu solicitud
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Recuerda que tienes hasta el día 10 de octubre a las 23:59:59 para entregar tus correcciones.
        </p>
        
        <div className="mt-4">
          <h5 className="fw-semibold">Observaciones</h5>
          <div className="rounded p-4" style={{ 
            backgroundColor: "#f3f2ff", 
            width: "50%", 
            margin: "0 auto", 
            minHeight: "100px",
            display: "flex", 
            alignItems: "center",
            justifyContent: "center",
            color: "#6658d3",
            fontWeight: "500"
          }}>
            Observaciones
          </div>
        </div>
        
        <button className="btn mt-4" style={{ 
          backgroundColor: "#6658d3", 
          color: "white", 
          padding: "10px 30px", 
          borderRadius: "8px",
          fontWeight: "500"
        }}>
          Corregir
        </button>
      </div>
      <FooterInesis />
    </div>
  );
}
