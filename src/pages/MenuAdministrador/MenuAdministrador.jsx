import React from 'react'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'
import NavInesis from '../../components/NavInesis/NavInesis'
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import ImagenAlumnos from '../../assets/estudiantes.png'
import ImagenRevisor from '../../assets/revisor.png'
import ImagenFechas from '../../assets/fechas.png'
import '../../styles/StyleMenuAdministrador/StyleMenuAdministrador.css'
import { CardMenu } from '../MenuSolicitarBeca/components/CardMenu'

export const MenuAdministrador = () => {

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
                            title='ALUMNO'
                            imgSrc={ImagenAlumnos}
                            description={'Dentro podras administrar y registrar alumos a la plataforma.'}
                            link={'/'}
                        />
                        <CardMenu
                            title='REVISOR'
                            imgSrc={ImagenRevisor}
                            description={'Dentro podras administrar y registrar revisores a la plataforma.'}
                            link={'/'}
                        />

                        <CardMenu
                            title='FECHAS'
                            imgSrc={ImagenFechas}
                            description={'Dentro podras administrar y registrar las fechas disponibles para cada carrera.'}
                            link={'/'}
                        />
                    </div>
                </div>
                <FooterInesis></FooterInesis>
            </div>
        </div>
    )
}
