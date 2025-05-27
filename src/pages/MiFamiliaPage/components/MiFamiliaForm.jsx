import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import MigasRecorrido from '../../../components/MigasDePan/MigasRecorrido';
import RadioSelect from '../../../components/RadioSelect/RadioSelect';
import SeleccionarCombo from '../../../components/ComboSeleccionar/SeleccionarCombo';
import { CheckBox } from '../../../components/CheckBox/CheckBox'
import ValidationError from './ValidacionFamilia';

//Servicios cat
import CatBienesHogarService from '../../../services/CatBienesHogarService';
import CatEscolaridadService from '../../../services/CatEscolaridadService';

const MiFamiliaForm = () => {
    // ---- ESTADOS DE LOS CATALOGOS
    const [catbienesHogar, setBienesHogar] = useState([]);
    const [escolaridades, setEscolaridades] = useState([]);
    const [materialesVivienda, setMaterialesVivienda] = useState([]);
    const [proveedoresInternet, setProveedoresInternet] = useState([]);

    // ---- CARGAR LOS CATALOGOS AL INICIAR EL COMPONENTE
    useEffect(() => {
        const fetchCatalogos = async () => {
            try {
                const [bienes, escolaridad, materiales, internet] = await Promise.all([
                    CatBienesHogarService.getAll(),
                    CatEscolaridadService.getAll(),
                    MaterialViviendaService.getAll(),
                    InternetService.getAll(),
                ]);

                setBienesHogar(bienes);
                setEscolaridades(escolaridad);
                setMaterialesVivienda(materiales);
                setProveedoresInternet(internet);
            } catch (error) {
                console.error('Error al cargar los catálogos', error);
            }
        };

        fetchCatalogos();
    }, []);

    // Estados para radio buttons
    const [radioValues, setRadioValues] = useState({
        coincideDomicilio: '',
        accesoInternet: '',
    });
    // Estado para contacto y validación
    const [contacto, setContacto] = useState('');
    const [contactoError, setContactoError] = useState('');

    // Estados para escolaridad
    const [escolaridadPadre, setEscolaridadPadre] = useState('');
    const [escolaridadMadre, setEscolaridadMadre] = useState('');

    // Estados para vivienda (selects y checkbox)
    const [tipoCasa, setTipoCasa] = useState('');
    const [tipoVivienda, setTipoVivienda] = useState('');
    const [materialConstruccion, setMaterialConstruccion] = useState('');
    const [serviciosVivienda, setServiciosVivienda] = useState({
        luz: false,
        agua: false,
        drenaje: false,
        gas: false,
    });

    // Estado para número de habitantes
    const [numPersonasVivienda, setNumPersonasVivienda] = useState('');

    // Estados para medios para estudiar en casa (checkboxes)
    const [mediosEstudio, setMediosEstudio] = useState({
        computadora: false,
        internet: false,
        celular: false,
        otros: false,
    });

    // Estado para hermanos licenciatura
    const [tienenLic, setTienenLic] = useState('');

    // Controladores para radio buttons
    const handleSelectionCoincideDomicilio = (value) => {
        setRadioValues((prev) => ({ ...prev, coincideDomicilio: value }));
    };

    const handleAccesoInternet = (value) => {
        setRadioValues((prev) => ({ ...prev, accesoInternet: value }));
    };

    // Controlador para checkbox servicios de vivienda
    const handleServiciosChange = (event) => {
        const { id, checked } = event.target;
        setServiciosVivienda((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    // Controlador para checkbox medios para estudiar
    const handleMediosEstudioChange = (event) => {
        const { id, checked } = event.target;
        setMediosEstudio((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    // Validación y control para teléfono (solo números y 10 dígitos)
    const handleContactoChange = (e) => {
        const valor = e.target.value;
        const regex = /^[0-9]{0,10}$/;
        if (regex.test(valor)) {
            setContacto(valor);
            setContactoError(valor.length < 10 ? 'El número debe tener al menos 10 dígitos' : '');
        }
    };

    // Controladores para selects de escolaridad y vivienda
    const handleEscolaridadPadreChange = (value) => setEscolaridadPadre(value);
    const handleEscolaridadMadreChange = (value) => setEscolaridadMadre(value);
    const handleTipoCasaChange = (value) => setTipoCasa(value);
    const handleTipoViviendaChange = (value) => setTipoVivienda(value);
    const handleMaterialConstruccionChange = (value) => setMaterialConstruccion(value);

    // Control para número de personas en vivienda (solo números hasta 2 dígitos)
    const handleNumPersonasViviendaChange = (e) => {
        const valor = e.target.value;
        const regex = /^[0-9]{0,2}$/;
        if (regex.test(valor)) setNumPersonasVivienda(valor);
    };

    // Control para hermanos licenciatura
    const handleTienenLicChange = (e) => {
        const valor = e.target.value;
        const regex = /^[0-9]{0,2}$/;
        if (regex.test(valor)) setTienenLic(valor);
    };

    // Función para submit (aquí puedes agregar validaciones antes de enviar)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (contactoError) {
            Swal.fire('Error', 'Por favor corrige los errores en el formulario', 'error');
            return;
        }
        // Aquí llamarías a tu API o lo que necesites con los datos
        Swal.fire('Éxito', 'Datos guardados correctamente', 'success');
    };


    return (
        <div>
            <div className='d-flex flex-column min-vh-100 mt-3 mb-4 ms-4 me-4'>
                <form>
                    <div className='tarjeta-border p-4 mb-2'>
                        <div className='row'>
                            <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>
                            <div className='mt-2'>
                                <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>
                                    ¿El domicilio de tu tutor coincide con el que te encuentras actualmente?
                                </label>
                                <RadioSelect
                                    name='coincideDomicilio'
                                    gris={true}
                                    options={['Si', 'No']}
                                    value={radioValues.coincideDomicilio}
                                    onChange={handleSelectionCoincideDomicilio}
                                />

                            </div>

                            {/* Contenedor para los selects */}
                            <div className='row mt-3'>

                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 mx-0">
                        {/* Tarjeta combinada para Contacto y Escolaridad */}
                        <div className="tarjeta-border p-4 mb-4">
                            <div className="row px-4">
                                {/* Columna 1: Contacto */}
                                <div className="col-md-4 d-flex flex-column">
                                    <p className="fs-2" style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Contacto
                                    </p>
                                    <div className="col-12 mb-3">
                                        <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Ingresa el número de teléfono"
                                            value={contacto}
                                            onChange={(e) => {
                                                const valor = e.target.value;
                                                const regex = /^[0-9]{0,10}$/;
                                                if (regex.test(valor)) {
                                                    setContacto(valor);
                                                    setContactoError(valor.length < 10 ? 'El número debe tener al menos 10 dígitos' : '');
                                                }
                                            }}
                                        />
                                        <ValidationError message={contactoError} />
                                    </div>
                                </div>


                                {/* Columna 2: Escolaridad */}
                                <div className="col-md-8 d-flex flex-column">
                                    <p className="fs-2" style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Escolaridad
                                    </p>
                                    <div className="row">
                                        {/* Escolaridad del padre */}
                                        <div className="col-6 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad del padre
                                            </label>
                                            <SeleccionarCombo
                                                etiqueta='¿Cuál es el nivel de escolaridad del tutor o tutora?'
                                                id='escolaridad'
                                                value={escolaridad}
                                                onChange={(e) => setEscolaridad(e.target.value)}
                                                opciones={escolaridades.map((item) => ({ id: item.id, descripcion: item.descripcion }))}
                                            />
                                        </div>

                                        {/* Escolaridad de la madre */}
                                        <div className="col-6">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad de la madre
                                            </label>
                                            <SeleccionarCombo
                                                etiqueta='¿Cuál es el nivel de escolaridad del tutor o tutora?'
                                                id='escolaridad'
                                                value={escolaridad}
                                                onChange={(e) => setEscolaridad(e.target.value)}
                                                opciones={escolaridades.map((item) => ({ id: item.id, descripcion: item.descripcion }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                            <p className='fs-2 px-4' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                Vivienda
                            </p>
                            {/* Fila para los campos de escolaridad */}
                            <div className="row px-4 ">
                                {/* Escolaridad de padre */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        La casa donde tu familia es:
                                    </label>
                                    <SeleccionarCombo

                                    />
                                </div>

                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Tipo de vivienda
                                    </label>
                                    <SeleccionarCombo

                                    />
                                </div>

                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Material de construcción
                                    </label>
                                    <SeleccionarCombo
                                        etiqueta='¿Cuál es el material de construcción predominante en tu vivienda?'
                                        id='materialVivienda'
                                        value={materialesVivienda}
                                        onChange={(e) => setMaterialesVivienda(e.target.value)}
                                        opciones={materialesVivienda.map((item) => ({ id: item.id, descripcion: item.descripcion }))}
                                    />

                                </div>

                                <div className="col-12 col-md-3 mb-3 ">
                                    <label className="fs-5 mb-2" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Con qué servicios cuenta la vivienda?
                                    </label>
                                    <div className="row">

                                        {/* Primera columna */}
                                        <div className="col-md-4">

                                        </div>
                                        {/* Segunda columna */}
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row gap-3 px-4'>
                                <div className="col-12 col-md-12">
                                    <label className="fs-5 mb-3 d-block" style={{ color: 'var(--color-morado3)' }}>
                                        ¿En la casa donde vive tu familia hay?
                                    </label>
                                    <div className="row">
                                        {/* Primera columna */}
                                        <div className="col-md-3">

                                        </div>

                                        {/* Segunda columna */}
                                        <div className="col-md-3">

                                        </div>

                                        {/* Tercera columna */}
                                        <div className="col-md-4">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4 ">
                            <p className='fs-2 px-4' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                Información complementaria
                            </p>
                            {/* Fila para los campos de escolaridad */}
                            <div className="row gab-3 px-4">
                                {/* Escolaridad de padre */}
                                <div className="col-md-4 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántas personas habitan en la vivienda?
                                    </label>
                                    <input
                                    /* type="text"
                                     className="form-control"
                                     placeholder=""
                                     value={vivienda}
                                     onChange={(e) => {
                                         const valor = e.target.value;
                                         const regex = /^[0-9]{0,2}$/; // Permite 0 a 2 dígitos numéricos

                                         if (regex.test(valor)) {
                                             setVivienda(valor);
                                         }
                                     }}*/
                                    />

                                </div>
                                <div className="col-12 col-md-8 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Medios para estudiar en casa (marca tantas opciones como sea necesario):
                                    </label>
                                    <div className='row'>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-4">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-3 px-4">
                                <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                    ¿Cuenta con acceso a internet?
                                </label>
                                <div className="ms-4">
                                    <SeleccionarCombo
                                        etiqueta='¿Qué proveedor de internet tienen en casa?'
                                        id='proveedorInternet'
                                        value={proveedorInternet}
                                        onChange={(e) => setProveedorInternet(e.target.value)}
                                        opciones={proveedoresInternet.map((item) => ({ id: item.id, descripcion: item.descripcion }))}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                            <p className='fs-2 px-4' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                Hermanos
                            </p>
                            <div className="row px-4">
                                {/* ¿Cuántos hermanos tienes? */}
                                <div className="col-10 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos hermanos tienes?
                                    </label>
                                    <input
                                    /*type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={numHermanos}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        const regex = /^[0-9]{0,2}$/;
                                        if (regex.test(valor)) setNumHermanos(valor);
                                    }}*/
                                    />
                                </div>

                                {/* ¿Cuántos están estudiando? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos están estudiando?
                                    </label>
                                    <input
                                    /*type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={hermanosEstudian}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        const regex = /^[0-9]{0,2}$/;
                                        if (regex.test(valor)) setHermanosEstudian(valor);
                                    }}*/
                                    />
                                </div>

                                {/* ¿Cuántos dejaron de estudiar? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos dejaron de estudiar?
                                    </label>
                                    <input
                                    /*type="number"
                                    className="form-control"
                                    placeholder=""
                                    value={dejanEstudio}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        const regex = /^[0-9]{0,2}$/;
                                        if (regex.test(valor)) setDejanEstudio(valor);
                                    }}*/
                                    />
                                </div>

                                {/* ¿Cuántos tienen licenciatura? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos tienen licenciatura?
                                    </label>
                                    <input
                                    /*type="number"
                                    className="form-control"
                                    placeholder=""
                                    value={tienenLic}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        const regex = /^[0-9]{0,2}$/;
                                        if (regex.test(valor)) setTienenLic(valor);
                                    }}*/
                                    />
                                </div>



                            </div>
                        </div>


                        <div className="container">
                            <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                                <p className="fs-2 px-4" style={{ color: "var(--color-morado2)", fontWeight: "bolder" }}>
                                    Personas dependientes
                                </p>
                                <div className="col-12 col-md-8 mb-3 px-4">
                                    <label className="fs-5" style={{ color: "var(--color-morado3)" }}>
                                        Además de ti y tus padres, ¿Cuántas personas dependen económicamente de tu ingreso familiar?
                                    </label>
                                    <input
                                    /*type="number"
                                    className="form-control col-md-4 mt-2"
                                    placeholder="Ingrese el numero de hermanos dependientes economicamente"
                                    value={numDependientes}
                                    onChange={handleNumDependientesChange}
                                    min="10"*/
                                    />
                                </div>
                                {/* Renderizar dinámicamente los formularios según el número de dependienÑtes */}

                            </div>
                            <div className="text-center mt-4 mb-4">
                                <button
                                    className="btn btn-primary px-4 py-2"
                                    style={{
                                        backgroundColor: 'var(--color-morado3)',
                                        border: 'none',
                                        fontSize: '1.2rem',
                                        borderRadius: '8px',
                                    }}
                                >
                                    Guardar información
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    );
};
export default MiFamiliaForm;
