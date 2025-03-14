import React from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'
import FooterInesis from '../../components/FooterInesis/FooterInesis'

export const MenuPrincipalRevisor = () => {

    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' }
    ];

    return (
        <div>
      <NavInesis></NavInesis>
      <MigasRecorrido items={links}></MigasRecorrido>
      <div className='d-flex flex-column min-vh-100'>
        <div className='flex-grow-1 mt-5 mx-5 px-5 mt-5 mx-5 px-5 d-flex justify-content-center' style={{color:'var(--color-morado2)'}}>
            <h1>Bienvenido Luis David Jimenez Santos</h1>
        </div>
        <FooterInesis></FooterInesis>
      </div>
    </div>
    )
}
