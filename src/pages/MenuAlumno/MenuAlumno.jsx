import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavInesis from "../../components/NavInesis/NavInesis";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import { CardMenu } from "../MenuSolicitarBeca/components/CardMenu"; // Componente visual reutilizable
import ServicioAlumno from "../../services/AlumnoService";
import fechaService from "../../services/FechasRegistradasService";
import rellenarEstudio from "../../assets/rellenarEstudio.jpg";
import resultadoEstudiO from "../../assets/resultadoEstudio.jpg";

import "../../App.css";

const MenuAlumno = () => {
  
  const [nombreAlumno, setNombreAlumno] = useState(""); // Primer nombre del alumno
  const [linkResultado, setLinkResultado] = useState(""); // Ruta para resultados
  const [fechaFin, setFechaFin] = useState(""); // Fecha límite formateada
  const [fechaAsignada, setFechaAsignada] = useState(false); // Existe fecha límite
  const [estadoAlumno, setEstadoAlumno] = useState(false); // Estado socioeconómico del alumno
  const [observacionesAlumno, setObservacionesAlumno] = useState(""); // Observaciones del estudio
  const [fechaExpirada, setFechaExpirada] = useState(false); // Fecha límite expirada

  
  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      const alumnoId = usuario?.alumno?.id || usuario?.alumnoId;

      if (alumnoId) {
        ServicioAlumno.getById(alumnoId)
          .then((alumno) => {
            const primerNombre = alumno.nombre?.split(" ")[0];
            setNombreAlumno(primerNombre);

            //  estado y observaciones
            setEstadoAlumno(alumno.estadoRevision);
            setObservacionesAlumno(alumno.observaciones);

            // Asignar ruta según estado del alumno
            if (alumno.observaciones && alumno.observaciones.trim() !== "") {
              setLinkResultado("/ResultadosSolicitud");
            } else if (alumno.estado === true) {
              setLinkResultado("/ResultadoEstudioSocioeconomicoCorrecto");
            } else {
              setLinkResultado(""); // Si no hay datos válidos, se bloquea el acceso
            }

            // Fecha límite según carrera
            const carreraId = alumno?.carrera?.id;
            if (carreraId) {
              fechaService
                .getByCarrera(carreraId)
                .then((fechaCarrera) => {
                  if (fechaCarrera && fechaCarrera.fechaFin) {
                    const fecha = new Date(fechaCarrera.fechaFin);
                    const opciones = {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    };
                    const fechaFormateada = fecha.toLocaleDateString(
                      "es-MX",
                      opciones
                    );
                    setFechaFin(fechaFormateada);
                    const hoy = new Date();
                    if (fecha < hoy.setHours(23,59,59,999)) {
                      setFechaExpirada(true);
                    } else {
                      setFechaExpirada(false);
                    }
                    setFechaAsignada(true);
                  } else {
                    setFechaAsignada(false);
                  }
                })
                .catch((error) => {
                  console.error("Error al obtener fecha por carrera:", error);
                  setFechaAsignada(false);
                });
            }
          })
          .catch((error) => {
            console.error("Error al obtener datos del alumno:", error);
          });
      }
    }
  }, []);

  
  const handleResultadoClick = () => {
    const sinObservaciones =
      !observacionesAlumno || observacionesAlumno.trim() === "";
    const sinEstado = !estadoAlumno;
    console.log("Estado del alumno:", estadoAlumno);


    if (sinObservaciones && sinEstado) {
      Swal.fire({
        icon: "info",
        title: "Sin información registrada",
        text: "Aún no has llenado tu estudio socioeconómico o no se han registrado comentarios.",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#6f42c1",
        allowOutsideClick: false,
        allowEscapeKey: false,
        width: "400px",
      });
    } else if (estadoAlumno === 3) {
      Swal.fire({
        icon: "info",
        title: "En espera de revisión",
        text: "Ya realizaste las correcciones. Tu estudio está pendiente de ser revisado nuevamente por el revisor.",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#6f42c1",
        allowOutsideClick: false,
        allowEscapeKey: false,
        width: "400px",
      });
    } else {
      // Redirigir si hay acceso permitido
      window.location.href = linkResultado;
    }
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
                  <b>La fecha límite para realizar tu estudio socioeconómico (<span>{fechaFin}</span> a las <span>23:59:59</span>) ya ha pasado.</b>
                </p>
              ) : (
                <p className="recordatorio">
                  ¡Recuerda que tienes hasta el día <b>{fechaFin}</b> a las{" "}
                  <b>23:59:59</b> para realizar tu estudio socioeconómico!
                </p>
              )
            ) : (
              <p className="recordatorio">
                <b>Aún no tienes una fecha asignada</b> para realizar tu estudio
                socioeconómico.
              </p>
            )}
          </div>

          <div className="container-fluid align-items-center justify-content-center text-center mb-5">
            <div className="row d-flex justify-content-center">
              <CardMenu
                title="Requisitar Estudio Socioeconómico"
                imgSrc={rellenarEstudio}
                description="En esta sección, ingresarás datos personales y de otra índole necesaria."
                link={"/menuSolicitar"}
              />
              <CardMenu
                title="Resultados del Estudio Socioeconómico"
                imgSrc={resultadoEstudiO}
                description="En esta sección, podrás ver tus resultados y observaciones."
                link={linkResultado} 
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
