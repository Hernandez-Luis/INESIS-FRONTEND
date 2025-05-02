import React from "react";
import { useNavigate } from "react-router-dom"; 
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import MenuAlumno from "../MenuAlumno/MenuAlumno";

import './components/Resultados.css';
import '../../../src/App.css';

const ResultadosSolicitud = () => {
  const navigate = useNavigate(); 

  const links = [
    { url: '/MenuAlumno', label: 'Inicio' },
    { url: '/ResultadosSolicitud', label: 'Resultados Estudio' }
  ];

  const handleClick = () => {
    navigate('/MenuAlumno');
  };

  return (
    <div>
      <NavInesis />
      <MigasRecorrido items={links} />
      <div className="container text-center mt-4">
        <h1 className="titulo-resultado">Resultado Estudio Socioeconomico</h1>
        <p className="mensaje-alerta">
          ¡Ups!, al parecer tienes detalles en tu Estudio
        </p>
        <p className="mensaje-fecha">
          Recuerda que tienes hasta el día 10 de octubre a las 23:59:59 para entregar tus correcciones.
        </p>
        
        <div className="mt-4">
          <h5 className="subtitulo-observaciones">Observaciones</h5>
          <div className="observacion-cuadro rounded p-4">
            <span className="observacion-texto">Observaciones</span>
          </div>
        </div>
        
        <button className="btn-correccion btn mt-4" onClick={handleClick}>Corregir</button>
      </div>
      <FooterInesis />
    </div>
  );
};

export default ResultadosSolicitud;
