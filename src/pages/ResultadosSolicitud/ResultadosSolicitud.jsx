import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import ServicioAlumno from "../../services/AlumnoService";
import fechaService from "../../services/FechasRegistradasService";

import "./components/Resultados.css";
import "../../../src/App.css";

const ResultadosSolicitud = () => {
  const navigate = useNavigate(); // Vistas

  // Estado observaciones del alumno
  const [observaciones, setObservaciones] = useState("");

  // Estado fecha límite de correcciones 
  const [fechaFin, setFechaFin] = useState("");

  // Rutas de navegación
  const links = [
    { url: "/MenuAlumno", label: "Inicio" },
    { url: "/ResultadosSolicitud", label: "Resultados Estudio" },
  ];

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario")); // Usuario localStorage
    const alumnoId = usuario?.alumnoId; // ID del alumno

    if (alumnoId) {
      ServicioAlumno.getById(alumnoId)
        .then((data) => {
          // Observaciones o un mensaje por defecto
          setObservaciones(data.observaciones || "Sin observaciones registradas.");

          // ID de la carrera del alumno
          const carreraId = data?.carrera?.id;

          // Carrera asociada, consulta la fecha de corrección
          if (carreraId) {
            fechaService.getByCarrera(carreraId)
              .then((fechaCarrera) => {
                // Si se obtiene una fechaFin
                if (fechaCarrera && fechaCarrera.fechaFin) {
                  const fecha = new Date(fechaCarrera.fechaFin);
                  const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
                  const fechaFormateada = fecha.toLocaleDateString('es-MX', opciones);
                  setFechaFin(fechaFormateada);
                }
              })
              .catch((error) => {
                console.error("Error al obtener la fecha por carrera:", error);
              });
          }
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
            {fechaFin
              ? <>Recuerda que tienes hasta el día <b>{fechaFin}</b> a las <b>23:59:59</b> para entregar tus correcciones.</>
              : <>Aún no tienes asignada una fecha para entregar tus correcciones.</>}
          </p>

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
