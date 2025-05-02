import React from 'react'
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

export const MenuSolicitarBeca = () => {

  const links = [
    { url: '/menuAlumno', label: 'Inicio' },
    { url: '/menuSolicitar', label: 'Estudio socioeconómico' },
  ];

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
              />
              <CardMenu 
                title="Mi Tutor"
                imgSrc={miTutorImg}
                description="Registra los datos de tu tutor para mantenerlos actualizados en tu perfil."
                link={"/MiTutor"}
              />
              <CardMenu 
                title="Mi Familia"
                imgSrc={miFamiliaImg}
                description="Ingresa los datos de tus familiares dependientes económicos, incluyendo información relevante para la solicitud de beca."
                link={"/MiFamilia"}
              />
              <CardMenu 
                title="Gastos e ingresos familiares"
                imgSrc={gastosFamiliaresImg}
                description="Registra los ingresos y gastos mensuales de tu familia para evaluar la situación económica y el apoyo para tu beca."
                link={"/GastosIngresos"}
              />
              <CardMenu 
                title="Documentos"
                imgSrc={misDocumentosImg}
                description="Sube y registra los documentos necesarios para completar tu solicitud."
                link={"/MisDocumentos"}
              />
            </div>
          </div>
          <div className='text-center'>
            <button className='btn btn-primary btn-lg'>Enviar</button>
          </div>
          {/*fin contenido*/}
        </div>
        <FooterInesis></FooterInesis>
      </div>
    </div>
  )
}
