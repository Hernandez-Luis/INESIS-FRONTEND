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
    const [servicioVivienda, setServicioVivienda] = useState('');
    const [casaFamilia, setCasaFamilia] = useState('');
    const [accesoInternet, setAccesoIntenet] = useState('');


    const handleSelectionCoincideDomicilio = (option) => setVivienda(option);
    const handleAccesoInternet = (option) => setAccesoIntenet(option);

    const handleSelection = (option) => setSelectedOption(option);


    const handleCasaFamilia = (option) => {
        setCasaFamilia(option); // Actualizar el estado en el componente padre
        console.log(option); // Mostrar en consola
    };

    const handleServicioVivienda = (option) => {
        setServicioVivienda(option); // Actualizar el estado en el componente padre
        console.log(option); // Mostrar en consola
    };


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
                                <div className="col-12 col-md-4 tarjeta-border d-flex flex-column p-4 mb-4">
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Contacto
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
                                <div className="col-12 col-md-8 tarjeta-border d-flex flex-column p-4 mb-4">
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
                                <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Vivienda
                                    </p>
                                    {/* Fila para los campos de escolaridad */}
                                    <div className="row">
                                        {/* Escolaridad de padre */}
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                La cada donde tu Familia es:
                                            </label>
                                            <SeleccionarCombo
                                                options={['Propia', 'Renta', 'Alquilada']}
                                                onChange={handleSelection}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>

                                        {/* Escolaridad de madre */}
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Tipo vivienda
                                            </label>
                                            <SeleccionarCombo
                                                options={['Casa sola', 'Condominio', 'Otra']}
                                                onChange={handleSelection}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Material de construción
                                            </label>
                                            <SeleccionarCombo
                                                options={['Mamposteria', 'Madera', 'Lamina', 'Concreto', 'Otros']}
                                                onChange={handleSelection}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5 mb-2" style={{ color: 'var(--color-morado3)' }}>
                                                ¿Con qué servicios cuenta la vivienda?
                                            </label>
                                            <div className="row">
                                                {/* Primera columna */}
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="servicioAgua" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="servicioAgua">Agua</label>
                                                    </div>
        
                                                </div>

                                                {/* Segunda columna */}
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="servicioLuz" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="servicioLuz">Luz</label>
                                                    </div>
                                                    
                                                </div>

                                                {/* Tercera columna */}
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="servicioDrenaje" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="servicioDrenaje">Drenaje</label>
                                                    </div>
                                                </div>
                                                {/* Cuarta columna */}
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="servicioTelefono" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="servicioTelefono">Telefono</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="equipoSonido" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="equipoSonido">Otro</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row gap-3'>
                                        <div className="col-12 col-md-12">
                                            <label className="fs-5 mb-3 d-block" style={{ color: 'var(--color-morado3)' }}>
                                                ¿En la casa donde vive tu familia hay?
                                            </label>

                                            <div className="row">
                                                {/* Primera columna */}
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="aguaCaliente" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="aguaCaliente">Agua Caliente</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="refrigerador" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="refrigerador">Refrigerador</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="estufaGas" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="estufaGas">Estufa de gas</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="tvCable" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="tvCable">TV por cable</label>
                                                    </div>

                                                </div>

                                                {/* Segunda columna */}
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="lavadora" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="lavadora">Lavadora de ropa</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="aireAcondicionado" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="aireAcondicionado">Aire acondicionado</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="automovil" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="automovil">Automóvil propio</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="televisor" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="televisor">Televisor</label>
                                                    </div>
                                                </div>

                                                {/* Tercera columna */}
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="equipoSonido" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="equipoSonido">Equipo de sonido/Grabadora</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="hornoMicroondas" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="hornoMicroondas">Horno de microondas</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="videocasetera" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="videocasetera">Videocasetera o DVD</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="espacioEstudio" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="espacioEstudio">Espacio privado para estudiar</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Información complementaria
                                    </p>
                                    {/* Fila para los campos de escolaridad */}
                                    <div className="row gab-3">
                                        {/* Escolaridad de padre */}
                                        <div className="col-md-4 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                ¿Cuántas personas habitan en la vivienda?
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                placeholder=""
                                                value={contacto}
                                                onChange={(e) => setVivienda(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-12 col-md-8 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Medios para estudiar en casa (marca tantas opciones como sea necesario):
                                            </label>
                                            <div className='row'>
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioComputadora" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioComputadora">Computadora</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioImpresora" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioImpresora">Impresora</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioFaxModem" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioFaxModem">Fax Modem</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioDvd" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioDvd">DVD- CDWR</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioLibrero" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioLibrero">Librero</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioMaquina" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioMaquina">Máquina se escribir</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioEscritorio" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioEscritorio">Escritorio/ mesa de trabajo</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioLibros" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioLibros">Libros especializados </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioDiccionarios" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioDiccionarios">Diccionarios</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioEnciclopedia" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioEnciclopedia">Enciclopedias</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="medioCalculadora" onChange={handleCasaFamilia} />
                                                        <label className="form-check-label" htmlFor="medioCalculadora">Calculadora</label>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3 mb-3">
                                        <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                            ¿Cuenta con acceso a internet?
                                        </label>
                                        <div className="ms-4">
                                            <RadioSelect gris={true} options={['Si', 'No']} onChange={handleAccesoInternet} />
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
