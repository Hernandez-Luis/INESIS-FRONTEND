import React, { useEffect, useState } from 'react'; 
import NavInesis from "../../components/NavInesis/NavInesis";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import { CardMenu } from '../MenuSolicitarBeca/components/CardMenu';
import ResultadoEstudioSocioeconomicoCorrecto from '../ResultadosSolicitud/ResultadoEstudioCoreccto';

import rellenarEstudio from '../../assets/rellenarEstudio.jpg';
import resultadoEstudiO from '../../assets/resultadoEstudio.jpg';

import '../../App.css';

const MenuAlumno = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    // Obtener el usuario guardado en localStorage
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      setNombreUsuario(usuario.usuario || 'Alumno');
    }
  }, []);

  return (
    <div>
      <NavInesis />
      <div className='container-fluid d-flex flex-column min-vh-100'>
        <div className="flex-grow-1 p-2">
          {/*inicio contenido*/}
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
                link={"/ResultadoEstudioSocioeconomicoCorrecto"}
              />
              
            </div>
          </div>
          {/*fin contenido*/}
        </div>
        <FooterInesis />
      </div>
    </div>
  );
};

export default MenuAlumno;
