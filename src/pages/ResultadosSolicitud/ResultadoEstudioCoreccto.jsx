import React from "react"; 
import { useNavigate } from "react-router-dom"; 
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import MenuAlumno from "../MenuAlumno/MenuAlumno";

import '../ResultadosSolicitud/components/Resultados.css'; 

import '../../App.css';

const ResultadoEstudioSocioeconomicoCorrecto = () => {
  const navigate = useNavigate(); 

  const links = [
    { url: '/MenuAlumno', label: 'Inicio' },
    { url: '/PrincipalAdmin', label: 'Resultados de solicitud' }
  ];

  const handleClick = () => {
    navigate('/MenuAlumno');
  };

  return (
    <div>
      <NavInesis />
      <MigasRecorrido items={links} />
      <div className="container text-center mt-5">
        <h2 className="titulo-resultado">Resultado Estudio Socioeconomico</h2>
        <p className="mensaje-alerta">¡Tus resultados del Estudio Socioeconomico están listos!</p>
        <p className="mensaje-fecha">Para cualquier aclaración puedes asistir al departamento de Servicios Escolares.</p>
        
        <h4 className="subtitulo-observaciones">Felicidades</h4>
        <h1 className="fw-bold text-primary titulo-correcto">TUS DATOS ESTÁN CORRECTOS</h1>
        
        <button className="btn-correccion btn mt-4" onClick={handleClick}>Aceptar</button>
      </div>
      <FooterInesis />
    </div>
  );
};

export default ResultadoEstudioSocioeconomicoCorrecto;
