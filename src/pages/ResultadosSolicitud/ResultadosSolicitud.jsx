import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import ServicioAlumno from "../../services/AlumnoService";

import "./components/Resultados.css";
import "../../../src/App.css";

const ResultadosSolicitud = () => {
  const navigate = useNavigate();
  const [observaciones, setObservaciones] = useState("");

  const links = [
    { url: "/MenuAlumno", label: "Inicio" },
    { url: "/ResultadosSolicitud", label: "Resultados Estudio" },
  ];

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const alumnoId = usuario?.alumnoId;

    if (alumnoId) {
      ServicioAlumno.getById(alumnoId)
        .then((data) => {
          setObservaciones(data.observaciones || "Sin observaciones registradas.");
        })
        .catch((error) => {
          console.error("Error al obtener observaciones del alumno:", error);
          setObservaciones("Error al cargar las observaciones.");
        });
    } else {
      setObservaciones("No se encontró el ID del alumno.");
    }
  }, []);

  const handleClick = () => {
    navigate("/MenuAlumno");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <NavInesis />
        <MigasRecorrido items={links} />
        <div className="container text-center mt-4">
          <h1 className="titulo-resultado">Resultado Estudio Socioeconómico</h1>
          <p className="mensaje-alerta">
            ¡Ups!, al parecer tienes detalles en tu Estudio
          </p>
          <p className="mensaje-fecha">
            Recuerda que tienes hasta el día 10 de octubre a las 23:59:59 para entregar tus correcciones.
          </p>

          {/* Sección de Comentarios / Observaciones */}
          <div className="mt-4">
            <h5 className="subtitulo-observaciones">Observaciones</h5>
            <div className="observacion-cuadro rounded p-4">
              <span className="observacion-texto">{observaciones}</span>
            </div>
          </div>

          <button className="btn-correccion btn mt-4" onClick={handleClick}>
            Corregir
          </button>
        </div>
      </div>
      <div className="mt-md-5 mt-sm-3">
        <FooterInesis />
      </div>
    </div>
  );
};

export default ResultadosSolicitud;
