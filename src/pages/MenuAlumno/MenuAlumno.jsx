import React, { useEffect, useState } from 'react';
import NavInesis from "../../components/NavInesis/NavInesis";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import { CardMenu } from '../MenuSolicitarBeca/components/CardMenu';
import ServicioAlumno from '../../services/AlumnoService';

import rellenarEstudio from '../../assets/rellenarEstudio.jpg';
import resultadoEstudiO from '../../assets/resultadoEstudio.jpg';

import '../../App.css';

const MenuAlumno = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [linkResultado, setLinkResultado] = useState('/ResultadoEstudioSocioeconomicoCorrecto');

  useEffect(() => {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      setNombreUsuario(usuario.usuario || 'Alumno');

      const alumnoId = usuario?.alumno?.id || usuario?.alumnoId;

      if (alumnoId) {
        ServicioAlumno.getById(alumnoId)
          .then((alumno) => {
            // Si Alumno tiene observaciones : ResultadoSolicitud, o no : ResultadoEstudioSocioeconomicoCorrecto
            if (alumno.observaciones && alumno.observaciones.trim() !== '') {
              setLinkResultado('/ResultadosSolicitud');
            } else if (alumno.estado === true) {
              setLinkResultado('/ResultadoEstudioSocioeconomicoCorrecto');
            } else {
              // Si aún no está finalizado y no hay observaciones
              setLinkResultado('/MenuAlumno'); 
            }
          })
          .catch((error) => {
            console.error("Error al obtener datos del alumno:", error);
          });
      }
    }
  }, []);

  return (
    <div>
      <NavInesis />
      <div className='container-fluid d-flex flex-column min-vh-100'>
        <div className="flex-grow-1 p-2">
          <div className="text-center mt-4">
            <h1 style={{ color: "var(--color-morado2)" }}>
              Bienvenido {nombreUsuario}
            </h1>
            <p className="recordatorio">
              ¡Recuerda que tienes hasta el día <b>10 de octubre</b> a las <b>23:59:59</b> para realizar tu estudio socioeconómico!
            </p>
          </div>
          <div className='container-fluid align-items-center justify-content-center text-center mb-5'>
            <div className='row d-flex justify-content-center'>
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
