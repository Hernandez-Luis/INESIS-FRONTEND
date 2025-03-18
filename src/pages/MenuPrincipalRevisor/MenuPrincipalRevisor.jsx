import React from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import imagenMenu from '../../assets/imagenMenu.png'

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
        <div className="row mb-5">
          <div className="col d-flex justify-content-center" >
            <img src={imagenMenu} alt="" />
          </div>
          <div className="col d-flex align-items-center justify-content-start ">
            <button onClick={mandarAFormularios} className=' w-75 p-4 text-start' style={{ background: 'var(--color-morado2)', color: 'white', borderRadius: '12px' }}>
              <span className='fs-5' style={{ fontWeight: 'bold' }}>Registros de informacion socioeconomica</span>
              <br />
              <br />
              Dentro encontraras todos los formularios que han enviado los alumnos listos para ser revisados.
            </button>
          </div>
        </div>
        <FooterInesis></FooterInesis>
      </div>
    </div>
  )
}
