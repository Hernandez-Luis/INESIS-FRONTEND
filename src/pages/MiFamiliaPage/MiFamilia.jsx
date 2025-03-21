import React, { useState } from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import '../../styles/TarjetaEstilo/TarjetaEstilo.css';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import RadioSelect from '../../components/RadioSelect/RadioSelect';
import SeleccionarCombo from '../../components/ComboSeleccionar/SeleccionarCombo';
import { CheckBox } from '../../components//CheckBox/CheckBox'


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
    const [formData, setFormData] = useState('');

    const [numDependientes, setNumDependientes] = useState('');
    const [dependientes, setDependientes] = useState([]);

    // Función para manejar el cambio en el input de personas dependientes
    const handleNumDependientesChange = (e) => {
        const cantidad = parseInt(e.target.value, 10) || 0;
        setNumDependientes(cantidad);

        // Crear un array con la cantidad de dependientes indicada
        const nuevosDependientes = Array.from({ length: cantidad }, (_, index) => ({
            id: index,
            nombre: "",
            edad: "",
            parentesco: "",
            gradoEstudios: "",
            institucion: "",
        }));

        setDependientes(nuevosDependientes);
    };
    // Función para manejar el cambio en los campos de cada dependiente
    const handleDependienteChange = (index, field, value) => {
        const nuevosDependientes = [...dependientes];
        nuevosDependientes[index][field] = value;
        setDependientes(nuevosDependientes);
    };

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
            <div className='d-flex flex-column min-vh-100 mt-5 mb-4 ms-4 me-4'>
                <div className='flex-grow-1'>
                    <form>
                        <div className='ms-2 me-4 row mw-100 mb-4'>
                            <div className='col tarjeta-border d-flex justify-content-start ms-3 p-4'>
                                <div className='row'>
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>
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
                                                    <CheckBox opcion="Agua" id='agua'></CheckBox>
                                                    <CheckBox opcion="luz" id='luz'></CheckBox>
                                                </div>
                                                {/* Segunda columna */}
                                                <div className="col-md-4">
                                                    <CheckBox opcion="Drenaje" id='drenaje'></CheckBox>
                                                    <CheckBox opcion="Telefono" id='telefono'></CheckBox>
                                                </div>
                                                <div className="col-md-4">
                                                    <CheckBox opcion="Otro" id='espacioTrabajos'></CheckBox>
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
                                                <div className="col-md-3">
                                                    <CheckBox opcion="Agua Caliente" id='aguaCaliente'></CheckBox>
                                                    <CheckBox opcion="Refrigerador" id='refrigerador'></CheckBox>
                                                    <CheckBox opcion="Estufa de gas" id='estufaDeGas'></CheckBox>
                                                    <CheckBox opcion="Lavadora de ropa" id='lavadoraDeRopa'></CheckBox>
                                                </div>

                                                {/* Segunda columna */}
                                                <div className="col-md-3">
                                                    <CheckBox opcion="Aire acondicionado" id='aireAcondicionado'></CheckBox>
                                                    <CheckBox opcion="Automóvil propio" id='automovilPropio'></CheckBox>
                                                    <CheckBox opcion="Televisor" id='televisor'></CheckBox>
                                                    <CheckBox opcion="Lavadora de ropa" id='lavadoraDeRopa'></CheckBox>
                                                </div>

                                                {/* Tercera columna */}
                                                <div className="col-md-4">
                                                    <CheckBox opcion="Equipo de sonido/Grabadora" id='equipoSonido'></CheckBox>
                                                    <CheckBox opcion="Horno de microondas" id='hornoMicroondas'></CheckBox>
                                                    <CheckBox opcion="Videocasetera o DVD" id='videocasatera'></CheckBox>
                                                    <CheckBox opcion="Espacio privado para estudiar" id='espacioTrabajos'></CheckBox>
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
                                                type="number"
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
                                                    <CheckBox opcion="Computadora" id='computadora'></CheckBox>
                                                    <CheckBox opcion="Impresora" id='impresora'></CheckBox>
                                                    <CheckBox opcion="Librero" id='librero'></CheckBox>
                                                    <CheckBox opcion="Escritorio/ mesa de trabajo" id='escritorio'></CheckBox>
                                                </div>
                                                <div className="col-md-4">
                                                    <CheckBox opcion="Libros especializados" id='librosEspecializados'></CheckBox>
                                                    <CheckBox opcion="Diccionarios" id='diccionarios'></CheckBox>
                                                    <CheckBox opcion="Enciclopedias" id='enciclopedias'></CheckBox>
                                                    <CheckBox opcion="Calculadora" id='calculadora'></CheckBox>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3 mb-3">
                                        <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                            ¿Cuenta con acceso a internet?
                                        </label>
                                        <div className="ms-4">
                                            <RadioSelect gris={true}
                                                options={['Si', 'No']}
                                                onChange={handleAccesoInternet} />
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                                        <p className="fs-2" style={{ color: "var(--color-morado2)", fontWeight: "bolder" }}>
                                            Personas dependientes
                                        </p>
                                        <div className="col-12 col-md-8 mb-3">
                                            <label className="fs-5" style={{ color: "var(--color-morado3)" }}>
                                                Además de ti y tus padres, ¿Cuántas personas dependen económicamente de tu ingreso familiar?
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control col-md-4 mt-2"
                                                placeholder="Ingrese el numero de hermanos dependientes economicamente"
                                                value={numDependientes}
                                                onChange={handleNumDependientesChange}
                                                min="0"
                                            />
                                        </div>
                                        <label className="fs-5 mb-4" style={{ color: "var(--color-morado3)" }}>
                                        Personas que dependen económicamente:                                           
                                        </label>
                                        {/* Renderizar dinámicamente los formularios según el número de dependientes */}
                                        {dependientes.map((dep, index) => (
                                            <div key={dep.id} className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                                                <div className="row">
                                                    <div className="col-12 col-md-3 mb-3">
                                                        <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Nombre completo:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={dep.nombre}
                                                            onChange={(e) => handleDependienteChange(index, "nombre", e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="col-12 col-md-2 mb-3">
                                                        <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Edad:</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={dep.edad}
                                                            onChange={(e) => handleDependienteChange(index, "edad", e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="col-12 col-md-2 mb-3">
                                                        <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Parentesco:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={dep.parentesco}
                                                            onChange={(e) => handleDependienteChange(index, "parentesco", e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="col-12 col-md-2 mb-3">
                                                        <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Grado de estudios:</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={dep.gradoEstudios}
                                                            onChange={(e) => handleDependienteChange(index, "gradoEstudios", e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="col-12 col-md-3 mb-3">
                                                        <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Nombre de su institución:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={dep.institucion}
                                                            onChange={(e) => handleDependienteChange(index, "institucion", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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


export default MiFamilia; 