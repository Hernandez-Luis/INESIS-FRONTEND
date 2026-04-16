import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavInesis from "../../components/NavInesis/NavInesis";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import { CardMenu } from "../MenuSolicitarBeca/components/CardMenu";
import ServicioAlumno from "../../services/AlumnoService";
import fechaService from "../../services/FechasRegistradasService";
import rellenarEstudio from "../../assets/rellenarEstudio.jpg";
import resultadoEstudiO from "../../assets/resultadoEstudio.jpg";

import "../../App.css";

const MenuAlumno = () => {

  const [nombreAlumno, setNombreAlumno] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [fechaAsignada, setFechaAsignada] = useState(false);
  const [estadoAlumno, setEstadoAlumno] = useState(null);
  const [observacionesAlumno, setObservacionesAlumno] = useState("");
  const [fechaExpirada, setFechaExpirada] = useState(false);

  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (!usuarioStr) return;

    const usuario = JSON.parse(usuarioStr);
    const alumnoId = usuario?.alumno?.id || usuario?.alumnoId;
    if (!alumnoId) return;

    ServicioAlumno.getById(alumnoId)
      .then((alumno) => {
        setNombreAlumno(alumno.nombre?.split(" ")[0]);
        setEstadoAlumno(alumno.estadoRevision);
        setObservacionesAlumno(alumno.observaciones || "");

        const carreraId = alumno?.carrera?.id;
        if (!carreraId) return;

        fechaService.getByCarrera(carreraId)
          .then((fechaCarrera) => {
            if (!fechaCarrera?.fechaFin) return;

            const fechaLimite = new Date(fechaCarrera.fechaFin);
            fechaLimite.setHours(23, 59, 59, 999);

            setFechaFin(
              fechaLimite.toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            );

            setFechaExpirada(new Date() > fechaLimite);
            setFechaAsignada(true);
          })
          .catch(() => setFechaAsignada(false));
      })
      .catch((error) => {
        console.error("Error al obtener datos del alumno:", error);
      });
  }, []);

  const handleResultadoClick = () => {
    const tieneObservaciones =
      observacionesAlumno && observacionesAlumno.trim() !== "";

    if (tieneObservaciones) {
      window.location.href = "/ResultadosSolicitud";
      return;
    }

    if (estadoAlumno === 4) {
      window.location.href = "/ResultadoEstudioSocioeconomicoCorrecto";
      return;
    }

    if (estadoAlumno === 1 || estadoAlumno === 2) {
      Swal.fire({
        icon: "info",
        title: "En espera de revisión",
        text: "Tu estudio está pendiente de revisión por el revisor.",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#6f42c1",
        allowOutsideClick: false,
        allowEscapeKey: false,
        width: "400px",
      });
      return;
    }

    Swal.fire({
      icon: "info",
      title: "Sin información registrada",
      text: "Aún no has llenado tu estudio socioeconómico.",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#6f42c1",
      allowOutsideClick: false,
      allowEscapeKey: false,
      width: "400px",
    });
  };

  return (
    <div>
      <NavInesis />
      <div className="container-fluid d-flex flex-column min-vh-100">
        <div className="flex-grow-1 p-2">
          <div className="text-center mt-4">
            <h1 style={{ color: "var(--color-morado2)" }}>
              Bienvenid@ {nombreAlumno}
            </h1>

            {fechaAsignada ? (
              fechaExpirada ? (
                <p className="recordatorio text-danger">
                  <b>
                    La fecha límite (<span>{fechaFin}</span> a las{" "}
                    <span>23:59:59</span>) ya ha pasado.
                  </b>
                </p>
              ) : (
                <p className="recordatorio">
                  Recuerda que tienes hasta el día <b>{fechaFin}</b> a las{" "}
                  <b>23:59:59</b>.
                </p>
              )
            ) : (
              <p className="recordatorio">
                <b>Aún no tienes una fecha asignada</b>.
              </p>
            )}
          </div>

          <div className="container-fluid text-center mb-5">
            <div className="row d-flex justify-content-center">
              <CardMenu
                title="Requisitar Estudio Socioeconómico"
                imgSrc={rellenarEstudio}
                description="Ingresa tus datos personales y socioeconómicos."
                link="/menuSolicitar"
              />

              <CardMenu
                title="Resultados del Estudio Socioeconómico"
                imgSrc={resultadoEstudiO}
                description="Consulta tus resultados y observaciones."
                onClick={handleResultadoClick}
              />
            </div>
          </div>
        </div>
        <FooterInesis />
      </div>
    </div>
  );
};

export default MenuAlumno;
