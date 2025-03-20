import React from 'react'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'
import NavInesis from '../../components/NavInesis/NavInesis'
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import ImagenAdministrador from '../../assets/imgAdministradorMenu.png'
import '../../styles/StyleMenuAdministrador/StyleMenuAdministrador.css'

export const MenuAdministrador = () => {

    return (
        <div>
            <NavInesis></NavInesis>
            <div className='d-flex flex-column min-vh-100'>
                <div className='flex-grow-1 m-5 px-5 d-flex justify-content-center' style={{ color: 'var(--color-morado2)' }}>
                    <h1>Bienvenido Luis David Jimenez Santos</h1>
                </div>
                <div className="row mb-5">
                    <div className="row d-flex justify-content-center">
                        <img className='w-25' src={ImagenAdministrador} alt="" />
                    </div>
                    <div className="mt-5 mx-5 px-5 row d-flex justify-content-center">
                        <div className='text-center mx-5 p-4 fs-4 estilo-boton'>
                            ALUMNOS
                        </div>

                        <div className='text-center mx-5 p-4 fs-4 estilo-boton'>
                            REVISOR
                        </div>

                        <div className='text-center mx-5 p-4 fs-4 estilo-boton'>
                            FECHAS
                        </div>
                    </div>
                </div>
                <FooterInesis></FooterInesis>
            </div>
        </div>
    )
}
