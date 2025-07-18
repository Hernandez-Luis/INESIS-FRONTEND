import React, { useEffect, useState } from 'react'
import NavInesis from '../../components/NavInesis/NavInesis';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import { CardMenu } from './components/CardMenu';

import misDatosImg from '../../assets/misDatos.jpg'
import miTutorImg from '../../assets/miTutor.jpg'
import miFamiliaImg from '../../assets/miFamilia.jpg'
import gastosFamiliaresImg from '../../assets/gastosFamiliares.jpg'
import misDocumentosImg from '../../assets/misDocumentos.jpg'

import '../../App.css';
import AlumnoService from '../../services/AlumnoService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const MenuSolicitarBeca = () => {
  const navigate = useNavigate();
  const idAlumno = JSON.parse(localStorage.getItem('usuario')).alumnoId;
  const [cardClasses, setCardClasses] = useState({
    misDatos: '',
    miTutor: 'deshabilitado',
    miFamilia: 'deshabilitado',
    gastosFamiliares: 'deshabilitado',
  });
  const [estudioCompleto, setEstudioCompleto] = useState(false);
  const [estadoRevision, setEstadoRevision] = useState(null);

  const links = [
    { url: '/menuAlumno', label: 'Inicio' },
    { url: '/menuSolicitar', label: 'Estudio socioeconómico' },
  ];

  useEffect(() => {
    getInfoAlumno();
  }, []);

  const getInfoAlumno = async () => {
    if (!idAlumno) return;
    const response = await AlumnoService.getById(idAlumno);
    setEstudioCompleto(response.estudioCompleto === true);
    setEstadoRevision(response.estadoRevision); // Puede ser null, true o false
    // ...tu lógica para setCardClasses...
    if (response.misDatos !== null && response.misDatos.moduloCompleto === true) {
      setCardClasses({
        misDatos: 'completo',
        miTutor: '',
        miFamilia: '',
        gastosFamiliares: '',
      });
    }
    if (response.miTutor !== null && response.miTutor.moduloCompleto === true) {
      setCardClasses(prev => ({
        ...prev,
        miTutor: 'completo',
      }));
    }
    if (response.miFamilia !== null && response.miFamilia.moduloCompleto === true) {
      setCardClasses(prev => ({
        ...prev,
        miFamilia: 'completo',
      }));
    }
    if (response.gastosIngresosFamiliares !== null && response.gastosIngresosFamiliares.moduloCompleto === true) {
      setCardClasses(prev => ({
        ...prev,
        gastosFamiliares: 'completo',
      }));
    }
  }

  const handleEnviar = async () => {
    try {
      await AlumnoService.setEstudioSocioeconomicoCompleto(idAlumno);
      mostrarExito('¡Estudio socioeconómico enviado correctamente!');
    } catch (error) {
      mostrarError('Error al enviar el estudio socioeconómico');
      console.error(error);
    }
  };

  const isAllComplete = () => {
    return (
      cardClasses.misDatos === 'completo' &&
      cardClasses.miTutor === 'completo' &&
      cardClasses.miFamilia === 'completo' &&
      cardClasses.gastosFamiliares === 'completo'
    );
  };

  const mostrarAlerta = (config) => {
    return Swal.fire({
      ...config,
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        confirmButton.style.backgroundColor = 'var(--color-verde)';
      },
    });
  };

  const mostrarError = (mensajeHTML) => {
    mostrarAlerta({
      title: 'Error',
      html: mensajeHTML,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  };

  const mostrarExito = (mensaje) => {
    mostrarAlerta({
      title: 'Éxito',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      navigate('/menuSolicitar');
    });
  };

  // Mensaje según estadoRevision
  const renderEstadoRevision = () => {
    if (!estudioCompleto) return null;
    if (estadoRevision === null) {
      return <div className="mt-3 text-warning fw-bold">Tu estudio socioeconómico está pendiente de revisión.</div>;
    }
    if (estadoRevision === true) {
      return <div className="mt-3 text-success fw-bold">¡Tu estudio socioeconómico fue aprobado!</div>;
    }
    if (estadoRevision === false) {
      return <div className="mt-3 text-danger fw-bold">Tu estudio socioeconómico fue rechazado, realiza las correcciones necesarias.</div>;
    }
    return null;
  };

  return (
    <div>
      <NavInesis />
      <MigasRecorrido items={links} />
      <div className='container-fluid d-flex flex-column min-vh-100'>
        <div className="flex-grow-1 p-2">
          {/*inicio contenido*/}
          <div className='container-fluid align-items-center justify-content-center text-center mb-5'>
            <div className='row d-flex justify-content-center'>
              <CardMenu
                title="Mis Datos"
                imgSrc={misDatosImg}
                description="Gestiona y actualiza tu información personal para mantener tus datos al día."
                link={"/MisDatos"}
                customClass={cardClasses.misDatos}
              />
              <CardMenu
                title="Mi Tutor"
                imgSrc={miTutorImg}
                description="Registra los datos de tu tutor para mantenerlos actualizados en tu perfil."
                link={"/MiTutor"}
                customClass={cardClasses.miTutor}
              />
              <CardMenu
                title="Mi Familia"
                imgSrc={miFamiliaImg}
                description="Ingresa los datos de tus familiares dependientes económicos, incluyendo información relevante para la solicitud de beca."
                link={"/MiFamilia"}
                customClass={cardClasses.miFamilia}
              />
              <CardMenu
                title="Gastos e ingresos familiares"
                imgSrc={gastosFamiliaresImg}
                description="Registra los ingresos y gastos mensuales de tu familia para evaluar la situación económica y el apoyo para tu beca."
                link={"/GastosIngresos"}
                customClass={cardClasses.gastosFamiliares}
              />

            </div>
          </div>
          <div className='text-center'>
            <button
              className='btn btn-primary btn-lg'
              disabled={!isAllComplete() || estudioCompleto}
              onClick={handleEnviar}
            >
              Enviar
            </button>
            {estudioCompleto && (
              <div className="mt-3 text-success fw-bold">
                Ya enviaste tu estudio socioeconómico.
              </div>
            )}
            {renderEstadoRevision()}
          </div>
          {/*fin contenido*/}
        </div>
        <FooterInesis></FooterInesis>
      </div>
    </div>
  )
}
