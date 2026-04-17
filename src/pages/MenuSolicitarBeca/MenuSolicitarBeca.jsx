import React, { useEffect, useState } from 'react'
import NavInesis from '../../components/NavInesis/NavInesis';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import { CardMenu } from './components/CardMenu';

import misDatosImg from '../../assets/misDatos.jpg'
import miTutorImg from '../../assets/miTutor.jpg'
import miFamiliaImg from '../../assets/miFamilia.jpg'
import gastosFamiliaresImg from '../../assets/gastosFamiliares.jpg'


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
  const [fechaRegistrada, setFechaRegistrada] = useState(null);
  const [conCorrecciones, setConCorrecciones] = useState(false);

  const links = [
    { url: '/menuAlumno', label: 'Inicio' },
    { url: '/menuSolicitar', label: 'Estudio socioeconómico' },
  ];

  useEffect(() => {
    getInfoAlumno();
    isWithinDateRange();
  }, []);

  const getInfoAlumno = async () => {
    if (!idAlumno) return;
    const response = await AlumnoService.getById(idAlumno);
    setEstudioCompleto(response.estudioCompleto === true);
    setEstadoRevision(response.estadoRevision); // Puede ser null, true o false
    setFechaRegistrada(response.fechaRegistrada);
    if(response.estadoRevision === 2){
      setConCorrecciones(true);
    }
    // Determinar el estado de cada módulo
    const getModuloStatus = (modulo, isMisDatos = false) => {
      if (modulo === null) return isMisDatos ? '' : 'deshabilitado';
      if (modulo.moduloCompleto === true) return 'completo';
      if (modulo.moduloCompleto === false) return isMisDatos ? '' : 'deshabilitado';
      return isMisDatos ? '' : 'deshabilitado';
    };

    setCardClasses({
      misDatos: getModuloStatus(response.misDatos, true),
      miTutor: getModuloStatus(response.miTutor),
      miFamilia: getModuloStatus(response.miFamilia),
      gastosFamiliares: getModuloStatus(response.gastosIngresosFamiliares),
    });
    // Verificar fechas al cargar y mostrar modal si es necesario
    const verificarFechas = (fechaData) => {
      if (!fechaData || !fechaData.active) {
        // Mostrar modal después de un pequeño delay para asegurar que el DOM esté listo
        setTimeout(() => {
          mostrarModalFechaNoValida();
        }, 500);
        return false;
      }

      const today = new Date();
      const fechaInicio = new Date(fechaData.fechaInicio);
      const fechaFin = new Date(fechaData.fechaFin);

      today.setHours(0, 0, 0, 0);
      fechaInicio.setHours(0, 0, 0, 0);
      fechaFin.setHours(0, 0, 0, 0);

      const dentroDelRango = today >= fechaInicio && today <= fechaFin;

      if (!dentroDelRango) {
        setTimeout(() => {
          mostrarModalFechaNoValida();
        }, 500);
      }

      return dentroDelRango;
    };

    verificarFechas(response.fechaRegistrada);
  }

  // Función para verificar si estamos dentro del rango de fechas permitidas
  const isWithinDateRange = () => {
    if (!fechaRegistrada || !fechaRegistrada.active) {
      return false;
    }

    const now = new Date();
    const fechaInicio = new Date(fechaRegistrada.fechaInicio);
    const fechaFin = new Date(fechaRegistrada.fechaFin);

    // Asegurar que la comparación sea solo por fecha (sin hora)
    fechaInicio.setHours(0, 0, 0, 0);
    fechaFin.setHours(23, 59, 59, 999);

    return now >= fechaInicio && now <= fechaFin;
  };

  // Función para mostrar modal de fecha no válida
  const mostrarModalFechaNoValida = () => {
    Swal.fire({
      title: 'Período de registro cerrado',
      html: `
        <div class="text-start">
          <p><strong>No puedes actualizar tus datos en este momento.</strong></p>
          <p>El período de registro para tu carrera no está activo o no ha sido asignado.</p>
          <br>
          <p><strong>¿Qué puedes hacer?</strong></p>
          <ul>
            <li>Comunícate con Servicios Escolares para más información</li>
            <li>Espera a que se abra el período de registro</li>
            <li>Verifica las fechas oficiales publicadas</li>
          </ul>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Entendido',
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        //confirmButton.style.backgroundColor = 'var(--color-verde)';
      },
    });
  };

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
      window.location.reload();
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
            {fechaRegistrada && (
              <button
                className='btn btn-primary btn-lg'
                disabled={
                  (!isAllComplete() && !conCorrecciones) ||
                  (estudioCompleto && !conCorrecciones) ||
                  !isWithinDateRange()
                }
                onClick={handleEnviar}
              >
                Enviar
              </button>
            )}
            {estudioCompleto && conCorrecciones && (
              <div className="mt-3 text-danger fw-bold">
                Tienes correcciones pendientes en tu estudio socioeconómico. Realízalas y vuelve a enviar tu información.
                <br />
                <span className="fw-normal">
                  Puedes revisarlas en el apartado de <b>Resultados del estudio socioeconómico</b>.
                </span>
              </div>
            )}
            {estudioCompleto && !conCorrecciones && (
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
