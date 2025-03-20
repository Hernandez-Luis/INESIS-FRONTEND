import React, { useState } from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import RadioSelect from '../../components/RadioSelect/RadioSelect';
import SeleccionarCombo from '../../components/ComboSeleccionar/SeleccionarCombo';

export const MiTutor = () => {
    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Solicitud' },
        { url: '/PrincipalAdmin', label: 'Mi tutor' }
    ];
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelection = (option) => {
        setSelectedOption(option); // Actualizar el estado en el componente padre
        console.log('Opción seleccionada:', option); // Mostrar en consola
    };


    return (
        <div>
            <NavInesis></NavInesis>
            <MigasRecorrido items={links}></MigasRecorrido>
            <div className='d-flex flex-column min-vh-100'>
                <div className='flex-grow-1 m-5 px-5' >

                    <form action="">
                        <div className='row mx-5 mw-100'>
                            <p className='fs-3  d-flex justify-content-start' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>MI TUTOR</p>
                            <p style={{ color: 'var(--color-gris1)' }}>Datos del padre, madre o tutor o familiar más cercano (preferiblemente, del que se depende económicamente)</p>
                            {/* DATOS PERSONALES */}
                            <div className="col tarjeta-border me-4 p-5">
                                <p className='fs-3' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Datos personales</p>
                                <label className='fs-5 mt-2' style={{ color: 'var(--color-morado2)' }} htmlFor="">Nombre completo</label>
                                <input className='form-control' type="text" />

                                <label className='fs-5 mt-3' style={{ color: 'var(--color-morado2)' }} htmlFor="">Parentesco</label>
                                <input className='form-control' type="text" />
                                <div class="line mx-auto mt-5 mb-4"></div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className='fs-5' style={{ color: 'var(--color-morado2)' }} htmlFor="">Telefono</label>
                                        <input className='form-control' type="number" />
                                    </div>
                                    <div className="col">
                                        <label className='fs-5' style={{ color: 'var(--color-morado2)' }} htmlFor="">Correo</label>
                                        <input className='form-control' type="mail" />
                                    </div>
                                </div>
                                <label className='fs-5 mt-4 mb-3' style={{ color: 'var(--color-morado2)' }} htmlFor="">¿Es trabajador de la UNSIJ o SUNEO?</label>
                                <RadioSelect gris={true} options={['Si', 'No']} />
                            </div>
                            {/* FIN DATOS PERSONALES */}

                            {/* DOMICILIO */}
                            <div className="col tarjeta-border ms-4 p-5">
                                <label className='fs-3' style={{ color: 'var(--color-morado1)', fontWeight: 'bold' }} htmlFor="">Domicilio</label>
                                <p style={{ color: 'var(--color-gris1)' }}>Indica la dirección de la persona de quien se depende económicamente, si éste es el caso, o de lo contrario, a la persona que se pueda localizar para aclaraciones.</p>
                                <label className='mb-3' style={{ color: 'var(--color-morado2)' }} htmlFor="">¿El domicilio de tu tutor coincide con el que te encuentras actualmente?</label>
                                <RadioSelect gris={true} options={['Si', 'No']} />
                                <div className='row'>
                                <div className='col-6 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Calle</label>
                                        <input className='form-control' type="text" />
                                    </div>
                                    <div className="col-3 mt-2">
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Numero</label>
                                        <input className='form-control' type="text" />
                                    </div>
                                    <div className="col-3 mt-2">
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>C.P.</label>
                                        <input className='form-control' type="text" />
                                    </div>
                                    <div className='col-6 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Estado</label>
                                        <div>
                                            <SeleccionarCombo
                                                options={['Oaxaca', 'Veracruz', 'Chiapas']} // Opciones disponibles
                                                onChange={handleSelection} // Función para manejar la selección
                                                placeholder="Selecciona una opción" // Placeholder
                                                disabled = {true}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Municipio</label>
                                        <div>
                                            <SeleccionarCombo
                                                options={['Ixtlan', 'Xiacui']} // Opciones disponibles
                                                onChange={handleSelection} // Función para manejar la selección
                                                placeholder="Selecciona una opción" // Placeholder
                                                disabled = {true}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Localidad</label>
                                        <div>
                                            <SeleccionarCombo
                                                options={['Capulalpam', 'Guelatao']} // Opciones disponibles
                                                onChange={handleSelection} // Función para manejar la selección
                                                placeholder="Selecciona una opción" // Placeholder
                                                disabled = {true}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Colonia</label>
                                        <input className='form-control' type="text" />
                                    </div>
                                    
                                </div>
                            </div>
                            {/* FIN DOMICILIO */}
                        </div>
                        <div className='d-flex justify-content-center mb-3 mt-5'>
                            <button className='btn btn-midDatos'>Guardar</button>
                        </div>
                    </form>
                </div>
                <FooterInesis></FooterInesis>
            </div>
        </div>
    )
}
