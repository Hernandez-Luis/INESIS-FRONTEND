import React, { use, useState } from 'react';
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

import CatTipoViviendaService from '../../../services/CatTipoViviendaService';
import CatSituacionViviendaService from '../../../services/CatSituacionViviendaService';
import CatMediosEstudioService from '../../../services/catMediosEstudioService';
import CatServiciosOtro from '../../../services/CatServiciosOtro';


import MiFamiliaService from '../../../services/MiFamiliaService';
import MediosEstudioService from '../../../services/MediosEstudiosService';
import viviendaFamiliarService from '../../../services/viviendaFamiliarService';
import serviciosViviendaService from '../../../services/serviciosViviendaService';
import BienesHogarService from '../../../services/BienesHogarService';
import personasDependientesService from '../../../services/personasDependientesService';
import DomicilioCpService from '../../../services/DomicilioCpService';

const MiFamiliaForm = () => {
    // ********************************** DEFINICION DE VARIABLES  *****************************************
    // ****************************** CATALOGOS ************************************************
    const [bienesHogar, setBienesHogar] = useState([]);
    const [selectedBienesHogar, setSelectedBienesHogar] = useState([]);

    const [escolaridades, setEscolaridades] = useState([]);
    const [escolaridadPadre, setEscolaridadPadre] = useState('');
    const [escolaridadMadre, setEscolaridadMadre] = useState('');

    const [materialesVivienda, setMaterialesVivienda] = useState([]);
    const [materialSeleccionado, setMaterialSeleccionado] = useState('');

    const [opcionesInternet, setOpcionesInternet] = useState([]);
    const [internetSeleccionado, setInternetSeleccionado] = useState('');

    const [tiposVivienda, setTiposVivienda] = useState([]);
    const [tipoViviendaSeleccionado, setTipoViviendaSeleccionado] = useState('');

    const [situacionesVivienda, setSituacionesVivienda] = useState([]);
    const [situacionViviendaSeleccionada, setSituacionViviendaSeleccionada] = useState('');

    const [mediosEstudio, setMediosEstudio] = useState([]);
    const [mediosEstudioSeleccionados, setMediosEstudioSeleccionados] = useState([]);

    const [serviciosOtro, setServiciosOtro] = useState([]);
    const [servicioOtroSeleccionado, setServiciosOtroSelecciondo] = useState([]);

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [telefono, setTelefono] = useState('');
    const [idDomicilio, setIdDomicilio] = useState(null);
    const [viviendaFamiliarSeleccionada, setViviendaFamiliarSeleccionada] = useState(null);

    // ********************************* RELACION CON CATALOGOS *******************************************
    const [numPersonasHabitan, setNumPersonasHabitan] = useState('');
    const OTRO_ID = 5;
    const [otroServicioTexto, setOtroServicioTexto] = useState('');

    const [numDependientes, setNumDependientes] = useState(0);
    const [dependientes, setDependientes] = useState([]);

    const formularioInicialDomicilio = {
        estado: "",
        municipio: "",
        colonia: "",
        localidad: "",
        distrito: "",
        region: "",
        cp: "",
    }

    const formularioInicialMiFamilia = {
        nombre_completo: "",
        id_domicilio: null,
        telefono: "",

        num_hermanos: null,
        num_hermanos_estudiando: null,
        num_hermanos_no_estudiando: null,
        num_hermanos_licenciatura: null,

        id_cat_vivienda_familiar: null,
        id_medios_estudio: null,
        id_escolaridad_padre: null,
        id_escolaridad_madre: null,
    };


    const [dataDomicilio, setDataDomicilio] = useState(formularioInicialDomicilio)
    const [dataMiFamilia, setDataMiFamilia] = useState(formularioInicialMiFamilia)
    // **********************************  OBTENER DATOS DE LA BD  *****************************************
    const localStorageData = JSON.parse(localStorage.getItem('miFamilia'))
    const idMiFamilia = localStorageData?.id_mi_familia;

    const [colonias, setColonias] = useState([]);
    const handleBuscarCP = async (value) => {
        const codigoPostal = value
        console.log("Codigo postal: ", codigoPostal)
        // Solo buscar si tiene 5 dígitos
        try {
            const datos = await DomicilioCpService.getColoniasPorCP(codigoPostal);
            console.log("Datos de la API: ", datos)
            setColonias(datos.codigo_postal.colonias);

            setDataDomicilio((prevData) => ({
                ...prevData,
                estado: datos.codigo_postal.estado ? datos.codigo_postal.estado : '',
                municipio: datos.codigo_postal.municipio ? datos.codigo_postal.municipio : '',
                cp: codigoPostal,
            }))

            console.log(dataDomicilio)
        } catch (err) {
            console.error('Error al buscar código postal:', err);
            setColonias([]);
        }
    };

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
            const tipos = await CatTipoViviendaService.getAll();
            const situaciones = await CatSituacionViviendaService.getAll();
            const medios = await CatMediosEstudioService.getAll();
            const serviciosOtro = await CatServiciosOtro.getAll();

            setBienesHogar(bienes);
            setEscolaridades(escolaridad);
            setMaterialesVivienda(materiales);
            setOpcionesInternet(internet);

            setTiposVivienda(tipos);
            setSituacionesVivienda(situaciones);
            setMediosEstudio(medios);
            setServiciosOtro(serviciosOtro);
        } catch (error) {
            console.error('Error al obtener los catálogos', error);
            mostrarMensajeError('Hubo un error al cargar los catálogos');
        }
    };

    // **********************************  MANEJADORES DE CAMBIOS  *****************************************
    const actualizarCamposDomicilio = (e) => {
        const { name, value } = e.target;
        //console.log("Nombre: ", name, " Valor: ", value)
        if (name === "cp")
            handleBuscarCP(value)
        setDataDomicilio((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
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

    const handleChangeTipoVivienda = (e) => {
        setTipoViviendaSeleccionado(e.target.value);
    };

    const handleChangeSituacionVivienda = (e) => {
        setSituacionViviendaSeleccionada(e.target.value);
    };

    const handleCheckBienesHogar = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedBienesHogar([...selectedBienesHogar, value]);
        } else {
            setSelectedBienesHogar(selectedBienesHogar.filter((item) => item !== value));
        }
    };

    const handleCheckServiciosOtro = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setServiciosOtroSelecciondo([...servicioOtroSeleccionado, value]);
        } else {
            setServiciosOtroSelecciondo(servicioOtroSeleccionado.filter((item) => item !== value));
        }
    };

    const handleCheckMediosEstudio = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setMediosEstudioSeleccionados([...mediosEstudioSeleccionados, value]);
        } else {
            setMediosEstudioSeleccionados(mediosEstudioSeleccionados.filter((item) => item !== value));
        }
    };
    //Actualizar dinamicamente el num de personas dependientes
    const handleNumDependientesChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setNumDependientes(value);

        const nuevosDependientes = Array.from({ length: value }, (_, i) => ({
            nombrePersona: '',
            edad: '',
            parentesco: '',
            archivo: null,
        }));

        setDependientes(nuevosDependientes);
    };

    const handleChangeDependiente = (index, field, value) => {
        const nuevos = [...dependientes];
        nuevos[index][field] = value;
        setDependientes(nuevos);
    };

    const handleFileUpload = (index, file) => {
        const nuevos = [...dependientes];
        nuevos[index].archivo = file;
        setDependientes(nuevos);
    };

    const mostrarMensajeErrorAlGuardar = (mensaje) => {
        Swal.fire('Error', mensaje, 'error');
    };

    const mostrarMensajeExito = (mensaje) => {
        Swal.fire('Éxito', mensaje, 'success');
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setDataMiFamilia((prevState) => ({
            ...prevState,
            [name]: type === "number" ? (value === "" ? null : parseInt(value)) : value,
        }));
    };



    // ********************  SE ENVIAN LOS DATOS DEL FORMULARIO PARA SER GUARDADOS  ************************

    const handleSubmit = async () => {
        try {
            // 1. Guardar medios 
            const mediosEstudiosPayload = {
                id_cat_medios_estudios: parseInt(mediosEstudioSeleccionados) // clave id (no id_medios)
            };

            console.log('Payload a enviar medio de estudio:', mediosEstudiosPayload);
            await MediosEstudioService.create(mediosEstudiosPayload);

            // 2. guardar viviendas familiares
            const viviendaPayload = {
                num_personas_habitan: parseInt(numPersonasHabitan),
                id_cat_situacion_vivienda: parseInt(situacionViviendaSeleccionada),
                id_cat_tipo_vivienda: parseInt(tipoViviendaSeleccionado),
                id_cat_material_vivienda: parseInt(materialSeleccionado),
                id_servicio_otro: parseInt(servicioOtroSeleccionado),
                servicios_otro: otroServicioTexto
            };
            console.log('Payload a enviar:', viviendaPayload);
            const viviendaResponse = await viviendaFamiliarService.create(viviendaPayload);
            const viviendaId = viviendaResponse.id || viviendaResponse.data.id;
            if (!viviendaId) {
                throw new Error('No se obtuvo el id de vivienda familiar tras crearla');
            }

            // 3. Guardar servicios vivienda, ahora con id_vivienda_familiar incluido
            const serviciosPromises = servicioOtroSeleccionado.map((id) => {
                const payload = {
                    servicioViviendaId: parseInt(id),
                    id_vivienda_familiar: viviendaId
                };
                if (parseInt(id) === OTRO_ID && otroServicioTexto.trim() !== '') {
                    payload.otro = otroServicioTexto;
                }
                return serviciosViviendaService.create(payload);
            });

            // 4. Guardar Mi Familia

            const payloadMiFamilia = {
                nombre_completo: nombreCompleto,
                id_domicilio: idDomicilio,
                telefono: dataMiFamilia.telefono,
                num_hermanos: dataMiFamilia.num_hermanos,
                num_hermanos_estudiando: dataMiFamilia.num_hermanos_estudiando,
                num_hermanos_no_estudiando: dataMiFamilia.num_hermanos_no_estudiando,
                num_hermanos_licenciatura: dataMiFamilia.num_hermanos_licenciatura,
                id_cat_vivienda_familiar: viviendaId,
                id_medios_estudio: mediosEstudioSeleccionados.map(id => parseInt(id)),
                id_escolaridad_padre: parseInt(escolaridadPadre),
                id_escolaridad_madre: parseInt(escolaridadMadre),
                // Si tienes otros campos relevantes, agregarlos aquí
            };
            console.log('Payload Mi Familia:', payloadMiFamilia);
            const miFamiliaResponse = await MiFamiliaService.create(payloadMiFamilia);

            const miFamiliaId = miFamiliaResponse.id || miFamiliaResponse.params.id;
            if (!miFamiliaId) {
                throw new Error('No se obtuvo el id de mi familia tras crearla');
            }

            // 5. Guardar dependientes
            // 4. Guardar personas dependientes
            for (const dependiente of dependientes) {
                const formData = new FormData();
                formData.append('nombre_persona', dependiente.nombrePersona);
                formData.append('edad', dependiente.edad);
                formData.append('parentesco', dependiente.parentesco);
                formData.append('id_mi_familia', idMiFamilia);

                if (dependiente.archivo) {
                    formData.append('nombre_archivo', dependiente.archivo);
                }

                try {
                    await personasDependientesService.create(formData);
                } catch (error) {
                    console.error('Error al guardar dependiente:', error);
                    mostrarMensajeErrorAlGuardar('Hubo un error al guardar uno de los dependientes. Verifica los datos e inténtalo nuevamente.');
                    return; // Cancelar si uno falla
                }
            }

            // 6. Guardar bienes hogar
            const bienesHogarPayload = selectedBienesHogar.map(selectedBien => ({
                id_mi_familia: miFamiliaId,
                id_cat_bienes_hogar: parseInt(selectedBien)
            }));

            console.log('Payload bienes hogar:', bienesHogarPayload);

            for (const bien of bienesHogarPayload) {
                try {
                    await BienesHogarService.create(bien);
                } catch (error) {
                    console.error('Error al guardar bien del hogar:', bien, error);
                    mostrarMensajeErrorAlGuardar(`Error al guardar un bien del hogar con ID ${bien.id_cat_bienes_hogar}`);
                }
            }
            // Ejecutar todas las promesas en paralelo
            await Promise.all(serviciosPromises);
            mostrarMensajeExito('Datos guardados correctamente');
        } catch (error) {
            mostrarMensajeErrorAlGuardar('Ocurrió un error al guardar la información');
        }
    };

    // **************************  FUNCIONES PARA MOSTRAR MENSAJES AL USUARIO  ******************************
    const mostrarMensajeError = (mensaje) => {
        alert(mensaje);
    };

    // ******************************************************************************************************
    return (
        <div>
            <div className='d-flex flex-column min-vh-100 mt-3 mb-4 ms-4 me-4'>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <div className='tarjeta-border p-4 mb-2'>
                        <div className='row'>
                            <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>
                            <div className='mt-2'>
                                <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>
                                    ¿El domicilio de tu tutor coincide con el que te encuentras actualmente?
                                </label>
                                <div className='row'>
                                    <div className="col-2 mt-2">
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>C.P.</label>
                                        <input className='form-control' type="text" onChange={actualizarCamposDomicilio} value={dataDomicilio.cp} name={"cp"} />
                                    </div>
                                    <div className='col-4 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Estado</label>
                                        <div>
                                            <input className='form-control' type="text" onChange={actualizarCamposDomicilio} value={dataDomicilio.estado} name='estado' disabled={true} />
                                        </div>
                                    </div>
                                    <div className='col-6 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Municipio</label>
                                        <div>
                                            <input className='form-control' type="text" value={dataDomicilio.municipio} name='municipio' disabled={true} />
                                        </div>
                                    </div>

                                    <div className='col-3 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Distrito</label>
                                        <input className='form-control' type="text" name={"distrito"} value={dataDomicilio.distrito} onChange={actualizarCamposDomicilio} />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Localidad</label>
                                        <div>
                                            <input className='form-control' type="text" onChange={actualizarCamposDomicilio} value={dataDomicilio.localidad} name='localidad' />

                                        </div>
                                    </div>
                                    <div className="col-3 mt-2">
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Región</label>
                                        <input className='form-control' type="text" name={"region"} value={dataDomicilio.region} onChange={actualizarCamposDomicilio} />
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Colonia</label>
                                        <div>
                                            <SeleccionarCombo
                                                options={colonias.map(c => ({
                                                    label: c,
                                                    value: c
                                                }))}
                                                name={"colonia"}
                                                value={dataDomicilio.colonia}
                                                onChange={actualizarCamposDomicilio}
                                                placeholder="Selecciona una opción" // Placeholder
                                            />
                                        </div>
                                    </div>
                                </div>
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
                                            name="telefono"
                                            value={dataMiFamilia.telefono}
                                            onChange={handleChange}
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
                            <div className="row px-4 ">
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        La casa donde tu familia es:
                                    </label>
                                    <select className="form-select" value={situacionViviendaSeleccionada} onChange={handleChangeSituacionVivienda}>
                                        <option value="">Selecciona una opción</option>
                                        {situacionesVivienda.map((item) => (
                                            <option key={item.id} value={item.id}>{item.nombreSituacion}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Tipo de vivienda
                                    </label>
                                    <select className="form-select" value={tipoViviendaSeleccionado} onChange={handleChangeTipoVivienda}>
                                        <option value="">Selecciona una opción</option>
                                        {tiposVivienda.map((item) => (
                                            <option key={item.id} value={item.id}>{item.nombreTipo}</option>
                                        ))}
                                    </select>
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
                                        {[0, 1, 2].map((col) => (
                                            <div className="col-md-4" key={col}>
                                                {serviciosOtro
                                                    .filter((_, idx) => idx % 3 === col)
                                                    .map((otro) => (
                                                        <CheckBox
                                                            style={{ color: 'var(--color-morado3)' }}
                                                            key={otro.id}
                                                            id={otro.id}
                                                            opcion={otro.nombreServicio}
                                                            checked={servicioOtroSeleccionado.includes(String(otro.id))}
                                                            onChange={handleCheckServiciosOtro}
                                                        />
                                                    ))}
                                            </div>
                                        ))}
                                        {servicioOtroSeleccionado.includes(OTRO_ID) && (
                                            <div className="col-md-4 mb-3">
                                                <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                    Especifique otro servicio:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={otroServicioTexto}
                                                    onChange={(e) => setOtroServicioTexto(e.target.value)}
                                                />
                                            </div>
                                        )}
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
                            <div className="row gab-3 px-4">
                                <div className="col-md-4 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántas personas habitan en la vivienda?
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        value={numPersonasHabitan}
                                        onChange={(e) => setNumPersonasHabitan(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 col-md-8 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Medios para estudiar en casa (marca tantas opciones como sea necesario):
                                    </label>
                                    <div className="row">
                                        {[0, 1, 2].map((col) => (
                                            <div className="col-md-3" key={col}>
                                                {mediosEstudio
                                                    .filter((_, idx) => idx % 3 === col)
                                                    .map((item) => (
                                                        <CheckBox
                                                            style={{ color: 'var(--color-morado3)' }}
                                                            key={item.id}
                                                            id={item.id}
                                                            opcion={item.nombreMedios}
                                                            checked={mediosEstudioSeleccionados.includes(String(item.id))}
                                                            onChange={handleCheckMediosEstudio}
                                                        />
                                                    ))}
                                            </div>
                                        ))}
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
                                        type="number"
                                        className="form-control"
                                        name="num_hermanos"
                                        value={dataMiFamilia.num_hermanos ?? ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* ¿Cuántos están estudiando? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos están estudiando?
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="num_hermanos_estudiando"
                                        value={dataMiFamilia.num_hermanos_estudiando ?? ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* ¿Cuántos dejaron de estudiar? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos dejaron de estudiar?
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="num_hermanos_no_estudiando"
                                        value={dataMiFamilia.num_hermanos_no_estudiando ?? ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* ¿Cuántos tienen licenciatura? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos tienen licenciatura?
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="num_hermanos_licenciatura"
                                        value={dataMiFamilia.num_hermanos_licenciatura ?? ""}
                                        onChange={handleChange}
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
                                        type="number"
                                        className="form-control col-md-4 mt-2"
                                        placeholder="Número de personas dependientes"
                                        value={numDependientes}
                                        min="0"
                                        onChange={handleNumDependientesChange}
                                    />
                                </div>
                                {/* Renderizar dinámicamente los formularios según el número de dependienÑtes */}
                                {dependientes.map((dep, index) => (
                                    <div key={index} className="col-12 tarjeta-border p-4 mb-2">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label>Nombre completo:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={dep.nombrePersona}
                                                    onChange={(e) => handleChangeDependiente(index, 'nombrePersona', e.target.value)}
                                                    placeholder="Nombre completo"
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <label>Edad:</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={dep.edad}
                                                    onChange={(e) => handleChangeDependiente(index, 'edad', e.target.value)}
                                                />
                                            </div>

                                            <div className="col-md-2">
                                                <label>Parentesco:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={dep.parentesco}
                                                    onChange={(e) => handleChangeDependiente(index, 'parentesco', e.target.value)}
                                                />
                                            </div>

                                            <div className="col-md-5">
                                                <label>Comprobante (CURP, Acta, etc.):</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => handleFileUpload(index, 'nombreArchivo', e.target.files[0])}
                                                    accept=".jpg,.jpeg,.png,.pdf"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-4 mb-4">
                                <button
                                    className="btn btn-primary px-4 py-2"
                                    onClick={handleSubmit}
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
