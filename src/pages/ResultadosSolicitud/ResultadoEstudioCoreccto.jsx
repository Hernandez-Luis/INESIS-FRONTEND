import React from "react";
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";

export default function ResultadoEstudioSocioeconomicoCorrecto() {
  const links = [
    { url: '/PrincipalAdmin', label: 'Inicio' },
    { url: '/PrincipalAdmin', label: 'Resultados de solicitud' }
  ];

  return (
    <div>
      <NavInesis />
      <MigasRecorrido items={links} />
      <div className="container text-center mt-5">
        <h2 className="fw-bold text-primary">Resultado Estudio Socioeconomico</h2>
        <p className="fw-bold text-primary">¡Tus resultados de Beca colegiatura están listos!</p>
        <p className="text-secondary">Para cualquier aclaración puedes asistir al departamento de Servicios Escolares.</p>
        
        <h4 className="fw-bold mt-4">Felicidades</h4>
        <h1 className="fw-bold text-primary" style={{ fontSize: "8rem" }}>TUS DATOS ESTÁN CORRECTOS</h1>
        
        <button className="btn mt-4" style={{ 
          backgroundColor: "#6658d3", 
          color: "white", 
          padding: "12px 40px", 
          borderRadius: "8px",
          fontWeight: "500",
          fontSize: "1.2rem"
        }}>
          Aceptar
        </button>
      </div>
      <FooterInesis />
    </div>
  );
}
