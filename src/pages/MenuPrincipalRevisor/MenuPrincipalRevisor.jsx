import React from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import imagenMenu from '../../assets/imagenMenu.png'
import { CardMenu } from '../MenuSolicitarBeca/components/CardMenu'
import ImagenRevisor from '../../assets/iconoRevisor.png'

export const MenuPrincipalRevisor = () => {
  const mandarAFormularios = () => {
    console.log('mandar a formularios');
  }

  return (
    <div>
      <NavInesis></NavInesis>
      <div className='d-flex flex-column min-vh-100'>
        <div className='flex-grow-1 m-5 px-5 d-flex justify-content-center' style={{ color: 'var(--color-morado2)' }}>
          <h1>Bienvenido Luis David Jimenez Santos</h1>
        </div>
        <div className='container-fluid align-items-center justify-content-center text-center mb-5'>
          <div className='row d-flex justify-content-center'>
            <CardMenu
              title='ESTUDIOS'
              imgSrc={ImagenRevisor}
              description={'Dentro podras administrar todos los estudios enviados por los alumnos.'}
              link={'/'}
            />
          </div>
        </div>
        <FooterInesis></FooterInesis>
      </div>
    </div>
  )
}