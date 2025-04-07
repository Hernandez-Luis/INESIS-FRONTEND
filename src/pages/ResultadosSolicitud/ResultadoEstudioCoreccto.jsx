import React from "react"; 
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import MenuAlumno from "../MenuAlumno/MenuAlumno";

import '../ResultadosSolicitud/components/Resultados.css'; // Importa el CSS

import '../../App.css';

const ResultadoEstudioSocioeconomicoCorrecto = () => {
  const links = [
    { url: '/MenuAlumno', label: 'Inicio' },
    { url: '/PrincipalAdmin', label: 'Resultados de solicitud' }
  ];

  return (
    <div>
      <NavInesis />
      <MigasRecorrido items={links} />
      <div className="container text-center mt-5">
        <h2 className="titulo-resultado">Resultado Estudio Socioeconomico</h2>
        <p className="mensaje-alerta">¡Tus resultados de Beca colegiatura están listos!</p>
        <p className="mensaje-fecha">Para cualquier aclaración puedes asistir al departamento de Servicios Escolares.</p>
        
        <h4 className="subtitulo-observaciones">Felicidades</h4>
        <h1 className="fw-bold text-primary" style={{ fontSize: "8rem" }}>TUS DATOS ESTÁN CORRECTOS</h1>
        
        <button className="btn-correccion btn mt-4">Aceptar</button>
      </div>
      <FooterInesis />
    </div>
  );
};

export default ResultadoEstudioSocioeconomicoCorrecto;
