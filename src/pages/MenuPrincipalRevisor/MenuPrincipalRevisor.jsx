import React, { useEffect, useState } from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import { CardMenu } from '../MenuSolicitarBeca/components/CardMenu'
import ImagenRevisor from '../../assets/iconoRevisor.png'

export const MenuPrincipalRevisor = () => {

  const [usuario, setUsuario] = useState(null);
  
      useEffect(() => {
          const usuarioString = localStorage.getItem('usuario'); // Esto es un STRING
          if (usuarioString) {
              const usuarioObjeto = JSON.parse(usuarioString); // Aquí ya es un OBJETO
              setUsuario(usuarioObjeto);
          }
      }, []);

  return (
    <div>
      <NavInesis></NavInesis>
      <div className='d-flex flex-column min-vh-100'>
        <div className='flex-grow-1 px-5 d-flex justify-content-center' style={{ color: 'var(--color-morado2)' }}>
          <h1>Bienvenido {usuario ? usuario.usuario : 'Usuario'}</h1>
        </div>
        <div className='container-fluid align-items-center justify-content-center text-center mb-5'>
          <div className='row justify-content-center'>
            <CardMenu
              title='ESTUDIOS'
              imgSrc={ImagenRevisor}
              description={'Dentro podras administrar todos los estudios enviados por los alumnos.'}
              link={'/ListadoEstudioSocioeconomico'}
            />
          </div>
        </div>
        <FooterInesis></FooterInesis>
      </div>
    </div>
  )
}