import React, { useState } from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import '../../styles/TarjetaEstilo/TarjetaEstilo.css';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import RadioSelect from '../../components/RadioSelect/RadioSelect';
import SeleccionarCombo from '../../components/ComboSeleccionar/SeleccionarCombo';

export const MiFamilia = () => {
    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Solicitud' },
        { url: '/PrincipalAdmin', label: 'Inicio' }
    ];

    const [vivienda, setVivienda] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [contacto, setContacto] = useState('');


    const handleSelectionCoincideDomicilio = (option) => setVivienda(option);
    const handleSelection = (option) => setSelectedOption(option);

    // Datos de los selects organizados en un array para evitar repeticiones
    const selectData = [
        { label: "Estado", options: ["Oaxaca", "Veracruz", "Chiapas"] },
        { label: "Región", options: ["Yahuiche", "Tierra Caliente"] },
        { label: "Localidad", options: ["Capulalpam", "Guelatao"] },
        { label: "Distrito", options: ["Villa Alta", "Ixtlan de Juarez"] },
        { label: "Municipio", options: ["Ixtlan", "Xiacui", "Tamazulapam Del Espiritu Santo Mixe"] },
        { label: "Colonia o barrio", options: ["Soledad", "Asuncion"] },
    ];

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <div className='d-flex flex-column min-vh-100 mt-5 mb-4'>
                <div className='flex-grow-1'>
                    <form>
                        <div className='ms-2 me-4 row mw-100 mb-4'>
                            <div className='col tarjeta-border d-flex justify-content-start ms-3 p-4'>
                                <div className='row'>
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Mi Familia</p>
                                    <div className='mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>
                                            ¿El domicilio de tu tutor coincide con el que te encuentras actualmente?
                                        </label>
                                        <div className="ms-4">
                                            <RadioSelect gris={true} options={['Si', 'No']} onChange={handleSelectionCoincideDomicilio} />
                                        </div>
                                    </div>

                                    {/* Contenedor para los selects */}
                                    <div className='row mt-3'>
                                        {selectData.map((item, index) => (
                                            <div key={index} className='col-md-4 col-sm-6 mt-2'>
                                                <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>{item.label}</label>
                                                <SeleccionarCombo
                                                    options={item.options}
                                                    onChange={handleSelection}
                                                    placeholder="Selecciona una opción"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4 mx-0">
                                {/* Tarjeta para Contacto */}
                                <div className="col-12 col-md-4 tarjeta-border d-flex flex-column p-4 mb-4 ms-2 ">
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Domicilio
                                    </p>
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Telefono
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Ingresa el número de teléfono"
                                        value={contacto}
                                        onChange={(e) => setContacto(e.target.value)}
                                    />
                                </div>

                                {/* Tarjeta para Grados de Escolaridad */}
                                <div className="col-12 col-md-7 tarjeta-border d-flex flex-column p-4 mb-4 ms-2">
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Escolaridad
                                    </p>
                                    {/* Fila para los campos de escolaridad */}
                                    <div className="row">
                                        {/* Escolaridad de padre */}
                                        <div className="col-12 col-md-6 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad de padre
                                            </label>
                                            <SeleccionarCombo
                                                options={['Primaria', 'Secundaria', 'Bachillerato', 'Universidad']}
                                                onChange={handleSelection}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>

                                        {/* Escolaridad de madre */}
                                        <div className="col-12 col-md-6 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad de la madre
                                            </label>
                                            <SeleccionarCombo
                                                options={['Primaria', 'Secundaria', 'Bachillerato', 'Universidad']}
                                                onChange={handleSelection}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
                <FooterInesis />
            </div>

        </div>
    );
};
