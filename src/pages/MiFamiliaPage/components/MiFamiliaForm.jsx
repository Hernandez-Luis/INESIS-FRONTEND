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
import CatMaterialViviendaService from '../../../services/CatMaterialViviendaService';
import CatInternetService from '../../../services/CatInternetService';

const MiFamiliaForm = () => {
    // ********************************** DEFINICION DE VARIABLES  *****************************************
    const [bienesHogar, setBienesHogar] = useState([]);
    const [selectedBienesHogar, setSelectedBienesHogar] = useState([]);

    const [escolaridades, setEscolaridades] = useState([]);
    const [escolaridadPadre, setEscolaridadPadre] = useState('');
    const [escolaridadMadre, setEscolaridadMadre] = useState('');

    const [materialesVivienda, setMaterialesVivienda] = useState([]);
    const [materialSeleccionado, setMaterialSeleccionado] = useState('');

    const [opcionesInternet, setOpcionesInternet] = useState([]);
    const [internetSeleccionado, setInternetSeleccionado] = useState('');

    // **********************************  OBTENER DATOS DE LA BD  *****************************************
    // - No aplica en frontend directo, porque se consulta desde el backend por API.

    // *********************************  INICIALIZANDO FORMULARIOS  ***************************************
    useEffect(() => {
        obtenerCatalogos();
    }, []);

    // ********************************  OBTENIENDO DATOS DE LA API  ***************************************
    const obtenerCatalogos = async () => {
        try {
            const bienes = await CatBienesHogarService.getAll();
            const escolaridad = await CatEscolaridadService.getAll();
            const materiales = await CatMaterialViviendaService.getAll();
            const internet = await CatInternetService.getAll();

            setBienesHogar(bienes);
            setEscolaridades(escolaridad);
            setMaterialesVivienda(materiales);
            setOpcionesInternet(internet);
        } catch (error) {
            console.error('Error al obtener los catálogos', error);
            mostrarMensajeError('Hubo un error al cargar los catálogos');
        }
    };

    // **********************************  MANEJADORES DE CAMBIOS  *****************************************
    const handleCheckBienesHogar = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedBienesHogar([...selectedBienesHogar, value]);
        } else {
            setSelectedBienesHogar(selectedBienesHogar.filter((item) => item !== value));
        }
    };

    const handleChangeEscolaridadPadre = (e) => {
        setEscolaridadPadre(e.target.value);
    };

    const handleChangeEscolaridadMadre = (e) => {
        setEscolaridadMadre(e.target.value);
    };

    const handleChangeMaterial = (e) => {
        setMaterialSeleccionado(e.target.value);
    };

    const handleChangeInternet = (e) => {
        setInternetSeleccionado(e.target.value);
    };

    // ********************  SE ENVIAN LOS DATOS DEL FORMULARIO PARA SER GUARDADOS  ************************
    const handleSubmit = () => {
        const payload = {
            bienesHogar: selectedBienesHogar,
            escolaridadPadre,
            escolaridadMadre,
            materialVivienda: materialSeleccionado,
            accesoInternet: internetSeleccionado,
        };

        console.log('Datos a enviar:', payload);
        // Aquí puedes hacer el POST con Axios o fetch.
    };

    // ***********************************  VALIDACION DE CAMPOS  ******************************************
    // Aquí podrías validar que los campos requeridos no estén vacíos antes de enviar

    // **************************  FUNCIONES PARA MOSTRAR MENSAJES AL USUARIO  ******************************
    const mostrarMensajeError = (mensaje) => {
        alert(mensaje);
    };

    // ******************************************************************************************************
    return (
        <div>
            <div className='d-flex flex-column min-vh-100 mt-3 mb-4 ms-4 me-4'>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className='tarjeta-border p-4 mb-2'>
                        <div className='row'>
                            <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>
                            <div className='mt-2'>
                                <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>
                                    ¿El domicilio de tu tutor coincide con el que te encuentras actualmente?
                                </label>

                            </div>

                            {/* Contenedor para los selects */}
                            <div className='row mt-3'>
                                    /*comunidades*/
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

                                        />
                                    </div>
                                </div>


                                {/* ESCOLARIDAD */}
                                <div className="col-md-8 d-flex flex-column">
                                    <p className="fs-2" style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Escolaridad
                                    </p>
                                    <div className="row">
                                        <div className="col-6 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad del padre
                                            </label>
                                            <SeleccionarCombo
                                                name="escolaridadPadre"
                                                options={escolaridades.map((e) => ({ value: e.id, label: e.nombreEscolaridad }))}
                                                value={escolaridadPadre}
                                                onChange={handleChangeEscolaridadPadre}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad de la madre
                                            </label>
                                            <SeleccionarCombo
                                                name="escolaridadMadre"
                                                options={escolaridades.map((e) => ({ value: e.id, label: e.nombreEscolaridad }))}
                                                value={escolaridadMadre}
                                                onChange={handleChangeEscolaridadMadre}
                                                placeholder="Selecciona una opción"
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

                                </div>

                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Tipo de vivienda
                                    </label>
                                </div>

                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Material de construcción
                                    </label>
                                    <SeleccionarCombo
                                        name="materialVivienda"
                                        options={materialesVivienda.map((e) => ({ value: e.id, label: e.nombreMaterial }))}
                                        value={materialSeleccionado}
                                        onChange={handleChangeMaterial}
                                        placeholder="Selecciona el material"
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
                                        {[0, 1, 2].map((col) => (
                                            <div className="col-md-3" key={col}>
                                                {bienesHogar
                                                    .filter((_, idx) => idx % 3 === col)
                                                    .map((bien) => (
                                                        <CheckBox
                                                            style={{ color: 'var(--color-morado3)' }}
                                                            key={bien.id}
                                                            id={bien.id}
                                                            opcion={bien.nombreBien}
                                                            checked={selectedBienesHogar.includes(String(bien.id))}
                                                            onChange={handleCheckBienesHogar}
                                                        />
                                                    ))}
                                            </div>
                                        ))}
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
                                <div className="col-md-6">
                                    <SeleccionarCombo
                                        name="accesoInternet"
                                        options={opcionesInternet.map((e) => ({ value: e.id, label: e.nombreInternet }))}
                                        value={internetSeleccionado}
                                        onChange={handleChangeInternet}
                                        placeholder="Seleccione una opción"
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
