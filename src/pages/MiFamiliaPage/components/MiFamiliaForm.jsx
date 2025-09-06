import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import RadioSelect from '../../../components/RadioSelect/RadioSelect';
import SeleccionarCombo from '../../../components/ComboSeleccionar/SeleccionarCombo';
import { CheckBox } from '../../../components/CheckBox/CheckBox'

//Servicios cat
import CatBienesHogarService from '../../../services/CatBienesHogarService';
import CatEscolaridadService from '../../../services/CatEscolaridadService';
import CatMaterialViviendaService from '../../../services/CatMaterialViviendaService';
import CatInternetService from '../../../services/CatInternetService';

import CatTipoViviendaService from '../../../services/CatTipoViviendaService';
import CatSituacionViviendaService from '../../../services/CatSituacionViviendaService';
import CatMediosEstudioService from '../../../services/catMediosEstudioService';
import CatServiciosOtro from '../../../services/CatServiciosOtro';

import MiFamiliaService from '../../../services/miFamiliaService';
import DomicilioCpService from '../../../services/DomicilioCpService';
import AlumnoService from '../../../services/AlumnoService';
import CatRegionDistritoService from '../../../services/CatRegionDistritoService';
import CatParentescoService from '../../../services/CatParentescoService';
import { useNavigate } from 'react-router-dom';
import CatSituacionVivienda from '../../../services/CatSituacionVivienda';


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
    const [catSituacionVivienda, setCatSituacionVivienda] = useState([])
    const [situacionViviendaSeleccionada, setSituacionViviendaSeleccionada] = useState('');

    const [mediosEstudio, setMediosEstudio] = useState([]);
    const [mediosEstudioSeleccionados, setMediosEstudioSeleccionados] = useState([]);

    const [serviciosOtro, setServiciosOtro] = useState([]);
    const [servicioOtroSeleccionado, setServiciosOtroSelecciondo] = useState([]);

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [idDomicilio, setIdDomicilio] = useState(null);
    const [viviendaFamiliarSeleccionada, setViviendaFamiliarSeleccionada] = useState(null);

    const [datosAlumno, setDatosAlumno] = useState(null);
    const [domicilioCoincide, setDomicilioCoincide] = useState('');
    const [disabled, setDisabled] = useState(false);

    const [regiones, setRegiones] = useState([]);
    const [distritos, setDistritos] = useState([]);

    const [regionSeleccionada, setRegionSeleccionada] = useState('');
    const [distritoSeleccionado, setDistritoSeleccionado] = useState('');
    const [erroresFormulario, setErroresFormulario] = useState({});


    // Agregar estados para "Otro"
    const [otroRegionTexto, setOtroRegionTexto] = useState('');
    const [otroDistritoTexto, setOtroDistritoTexto] = useState('');
    const [parentescos, setParentescos] = useState([]);


    const OTRO_REGION_ID = "9"; // ID que identifica la opción "Otro" en regiones
    const OTRO_DISTRITO_ID = "26"; // ID que identifica la opción "Otro" en distritos
    const navigate = useNavigate(); // Añadir esta línea

    const [btnDisabled, setBtnDisabled] = useState(false);


    // ********************************* RELACION CON CATALOGOS *******************************************
    const [numPersonasHabitan, setNumPersonasHabitan] = useState('');
    const OTRO_ID = "5";
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

    const verificarFechas = (fechaData) => {
        if (!fechaData.active) return false;
        const today = new Date();
        const fechaInicio = new Date(fechaData.fechaInicio);
        const fechaFin = new Date(fechaData.fechaFin);

        today.setHours(0, 0, 0, 0);
        fechaInicio.setHours(0, 0, 0, 0);
        fechaFin.setHours(0, 0, 0, 0);

        return today >= fechaInicio && today <= fechaFin;
    };

    // Agregar función para cargar datos existentes de Mi Familia
    const setDatosMiFamiliaAlumno = (data, alumnoData) => {

        // Cargar datos básicos de Mi Familia
        setDataMiFamilia({
            telefono: data?.telefono || '',
            num_hermanos: data?.numHermanos ?? '',
            num_hermanos_estudiando: data?.numHermanosEstudiando ?? '',
            num_hermanos_no_estudiando: data?.numHermanosNoEstudiando ?? '',
            num_hermanos_licenciatura: data?.numHermanosLicenciatura ?? '',
        });

        // Cargar escolaridades de padres
        setEscolaridadPadre(data?.escolaridadPadre?.id || '');
        setEscolaridadMadre(data?.escolaridadMadre?.id || '');

        // Cargar datos de vivienda
        if (data?.viviendaFamiliar) {
            setNumPersonasHabitan(data.viviendaFamiliar.numPersonasHabitan || '');
            setSituacionViviendaSeleccionada(data.viviendaFamiliar.situacionVivienda?.id || '');
            setTipoViviendaSeleccionado(data.viviendaFamiliar.tipoVivienda?.id || '');
            setMaterialSeleccionado(data.viviendaFamiliar.materialVivienda?.id || '');

            // Cargar región y distrito
            console.log("Region y distrito de vivienda familiar: ", data.viviendaFamiliar.region, data.viviendaFamiliar.distrito)
            setRegionSeleccionada(data.viviendaFamiliar.region.id || '');
            setDistritoSeleccionado(data.viviendaFamiliar.distrito.id || '');

            // Cargar servicios de vivienda
            if (data.viviendaFamiliar.serviciosVivienda && data.viviendaFamiliar.serviciosVivienda.length > 0) {
                const serviciosIds = data.viviendaFamiliar.serviciosVivienda.map(servicio => String(servicio.catServiciosVivienda.id));
                setServiciosOtroSelecciondo(serviciosIds);

                // Si hay texto "otro" en serviciosOtro
                if (data.viviendaFamiliar.serviciosOtro) {
                    setOtroServicioTexto(data.viviendaFamiliar.serviciosOtro);
                }
            }
        }

        // Cargar información de internet
        if (data?.catInternet) {
            setInternetSeleccionado(data.catInternet.id || '');
        }

        // Cargar bienes del hogar seleccionados
        if (data?.bienesHogar && data.bienesHogar.length > 0) {
            const bienesIds = data.bienesHogar.map(bien => String(bien.catBienHogar.id));
            setSelectedBienesHogar(bienesIds);
        }

        // Cargar medios de estudio seleccionados
        if (data?.mediosEstudio && data.mediosEstudio.length > 0) {
            const mediosIds = data.mediosEstudio
                .map(medio => medio.catMediosEstudio?.id)
                .filter(id => id !== undefined && id !== null)
                .map(id => String(id));
            setMediosEstudioSeleccionados(mediosIds);
        }

        // Cargar servicios de vivienda seleccionados
        if (data?.serviciosVivienda && data.serviciosVivienda.length > 0) {
            const serviciosIds = data.serviciosVivienda.map(servicio => String(servicio.servicioViviendaId));
            setServiciosOtroSelecciondo(serviciosIds);

            // Verificar si hay servicio "Otro" y cargar su texto
            const servicioOtro = data.serviciosVivienda.find(servicio => servicio.esOtro === true);
            if (servicioOtro && servicioOtro.textoOtro) {
                setOtroServicioTexto(servicioOtro.textoOtro);
            }
        }

        // Cargar datos del domicilio
        if (data?.domicilio) {
            setDataDomicilio({
                estado: data.domicilio.estado || '',
                municipio: data.domicilio.municipio || '',
                colonia: data.domicilio.colonia || '',
                localidad: data.domicilio.localidad || '',
                distrito: data.viviendaFamiliar.distrito || '',
                region: data.viviendaFamiliar.region || '',
                cp: data.domicilio.cp || ''
            });

            // Establecer región y distrito seleccionados
            if (data.viviendaFamiliar?.region) {
                setRegionSeleccionada(data.viviendaFamiliar.region.id);
            }
            if (data.viviendaFamiliar?.distrito) {
                setDistritoSeleccionado(data.viviendaFamiliar.distrito.id);
            }

            // Por defecto, si ya tiene domicilio registrado, asumir que no coincide con el del alumno
            // a menos que sea exactamente el mismo ID
            if (data.domicilio.id === alumnoData?.misDatos?.domicilio?.id) {
                setDomicilioCoincide('Si');
                setDisabled(true);
            } else {
                setDomicilioCoincide('No');
                setDisabled(false);
            }
        }

        // Cargar personas dependientes - CORREGIDO
        if (data?.personasDependientes && data.personasDependientes.length > 0) {
            setNumDependientes(data.personasDependientes.length);
            setDependientes(data.personasDependientes.map(persona => ({
                nombrePersona: persona.nombrePersona || '',
                edad: persona.edad || '',
                parentesco: persona.parentesco?.id || '',
                archivo: null, // Los archivos no se pueden precargar por seguridad
                nombreArchivo: persona.nombreArchivo || '', // Para mostrar el nombre del archivo existente
                rutaArchivo: persona.rutaArchivo || '' // Para referencia del archivo existente
            })));
        } else if (data?.numPersonasDependen) {
            // Si no hay personas dependientes pero sí el número, establecer solo el número
            setNumDependientes(data.numPersonasDependen);
        }

    };

    // **********************************  OBTENER DATOS DEL ALUMNO  *****************************************

    const obtenerDatosPorAlumno = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const alumnoId = usuario?.alumnoId;
            if (!alumnoId) {
                console.error('No se encontró el alumnoId en el localStorage.');
                return;
            }
            let datos = await AlumnoService.getById(alumnoId);
            console.log("Datos del alumno: ", datos);
            verificarFechas(datos?.fechaRegistrada) ? setBtnDisabled(false) : setBtnDisabled(true);
            setDatosAlumno(datos);

            // Verificar si ya tiene datos de Mi Familia
            if (datos.miFamilia) {
                console.log("Datos de mi familia existentes: ", datos.miFamilia);
                setDatosMiFamiliaAlumno(datos.miFamilia, datos);
            }
        } catch (error) {
            console.log("Error al obtener datos del alumno: ", error);
        }
    };

    // Funciones de conversión booleano a Si/No y viceversa
    const boolToSiNo = (valor) => valor === true ? 'Si' : valor === false ? 'No' : '';
    const siNoToBool = (valor) => valor === 'Si' ? true : valor === 'No' ? false : null;

    const handleDomicilioCoincide = (e) => {
        const { value } = e.target;
        setDomicilioCoincide(value);

        if (value === "Si" || value === true) {
            setDisabled(true);
            if (datosAlumno?.misDatos?.domicilio) {
                setDataDomicilio({
                    cp: datosAlumno.misDatos.domicilio.cp || '',
                    estado: datosAlumno.misDatos.domicilio.estado || '',
                    municipio: datosAlumno.misDatos.domicilio.municipio || '',
                    colonia: datosAlumno.misDatos.domicilio.colonia || '',
                    localidad: datosAlumno.misDatos.domicilio.localidad || '',
                    distrito: datosAlumno.misDatos.domicilio.distrito || '',
                    region: datosAlumno.misDatos.domicilio.region || ''
                });
                setRegionSeleccionada(datosAlumno.misDatos.domicilio.region);
                setDistritoSeleccionado(datosAlumno.misDatos.domicilio.distrito);
                setIdDomicilio(datosAlumno.misDatos.domicilio.id);
            }
        } else if (value === "No" || value === false) {
            setDisabled(false);
            setDataDomicilio(formularioInicialDomicilio);

            // Limpiar también los valores de los combos
            setRegionSeleccionada('');
            setDistritoSeleccionado('');

            setIdDomicilio(null);
            setColonias([]);
        }
    };

    // - No aplica en frontend directo, porque se consulta desde el backend por API.
    // *********************************  INICIALIZANDO FORMULARIOS  ***************************************
    useEffect(() => {
        const cargarDatos = async () => {
            await obtenerCatalogos();
            await obtenerDatosPorAlumno();
            await obtenerCatSituacionVivienda();
        };
        cargarDatos();
    }, []);

    useEffect(() => {
        obtenerCatSituacionVivienda();
    }, []);


    // useEffect para buscar CP cuando se carga desde datos del alumno:
    useEffect(() => {
        if (dataDomicilio.cp && dataDomicilio.cp.length === 5) {
            handleBuscarCP(dataDomicilio.cp);
        }
    }, [dataDomicilio.cp]);


    useEffect(() => {
        if (regionSeleccionada && regionSeleccionada !== OTRO_REGION_ID) {
            filtrarDistritosPorRegion(regionSeleccionada);
        }
    }, [regionSeleccionada]);

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

            const regiones = await CatRegionDistritoService.getAllRegions();
            const distritos = await CatRegionDistritoService.getAllDistricts();
            const parentescos = await CatParentescoService.getAll();



            setBienesHogar(bienes);
            setEscolaridades(escolaridad);
            setMaterialesVivienda(materiales);
            setOpcionesInternet(internet);

            setTiposVivienda(tipos);
            setSituacionesVivienda(situaciones);
            setMediosEstudio(medios);
            setServiciosOtro(serviciosOtro);

            setRegiones(regiones);
            setDistritos(distritos);
            setParentescos(parentescos); // Establecer parentescos

        } catch (error) {
            console.error('Error al obtener los catálogos', error);
            mostrarMensajeError('Hubo un error al cargar los catálogos');
        }
    };


    // **********************************  MANEJADORES DE CAMBIOS  *****************************************
    const actualizarCamposDomicilio = (e) => {
        const { name, value } = e.target;
        //console.log("Nombre: ", name, " Valor: ", value)
        if (name === "cp" && value.length === 5) {
            handleBuscarCP(value)
        }
        setDataDomicilio((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //  manejador para cambio de región
    const handleChangeRegion = (e) => {
        const regionId = e.target.value;
        setRegionSeleccionada(regionId);

        // Actualizar el domicilio
        if (regionId === OTRO_REGION_ID) {
            setDataDomicilio((prevData) => ({
                ...prevData,
                region: otroRegionTexto // Si es "Otro", usar el texto
            }));
        } else {
            setDataDomicilio((prevData) => ({
                ...prevData,
                region: regionId
            }));
            setOtroRegionTexto(''); // Limpiar texto si no es "Otro"
        }

        // Limpiar distrito cuando cambie región
        setDistritoSeleccionado('');
        setDataDomicilio((prevData) => ({
            ...prevData,
            distrito: ''
        }));

        // Filtrar distritos por región si se necesita
        if (regionId) {
            filtrarDistritosPorRegion(regionId);
        } else {
            // Si no hay región seleccionada, mostrar todos los distritos
            obtenerTodosLosDistritos();
        }

        if (regionId === OTRO_REGION_ID) {
            setDistritoSeleccionado(OTRO_DISTRITO_ID);
            setDataDomicilio((prevData) => ({
                ...prevData,
                distrito: otroDistritoTexto // Usar el texto de otro distrito
            }));
        }
    }

    // Función para filtrar distritos por región
    const filtrarDistritosPorRegion = async (regionId) => {
        try {
            const distritosFilterados = await CatRegionDistritoService.getDistrictsByRegion(regionId);
            setDistritos(distritosFilterados);
        } catch (error) {
            console.error('Error al filtrar distritos por región:', error);
            // En caso de error, mantener todos los distritos
            obtenerTodosLosDistritos();
        }
    };

    // Función para obtener todos los distritos
    const obtenerTodosLosDistritos = async () => {
        try {
            const todosLosDistritos = await CatRegionDistritoService.getAllDistricts();
            setDistritos(todosLosDistritos);
        } catch (error) {
            console.error('Error al obtener todos los distritos:', error);
        }
    };

    const obtenerCatSituacionVivienda = async () => {
        try {
            let situacionViviendaLista = await CatSituacionViviendaService.getAll();
            // console.log("SITUACION VIVENDA: ", situacionViviendaLista)
            let opcionesPermitidas = ['Propia', 'Alquilada', 'Otro'];
            let situacionViviendaFiltrada = situacionViviendaLista.filter(item =>
                opcionesPermitidas.includes(item.nombreSituacion)
            );
            setCatSituacionVivienda(situacionViviendaFiltrada);
        } catch (error) {
            console.log("Error al obtener la lista de SituacionVivienda: ", error)
        }
    }

    // Agregar manejador para cambio de distrito
    const handleChangeDistrito = (e) => {
        const distritoId = e.target.value;
        setDistritoSeleccionado(distritoId); // Setear el valor del combo

        // Actualizar el domicilio
        if (distritoId === OTRO_DISTRITO_ID) {
            setDataDomicilio((prevData) => ({
                ...prevData,
                distrito: otroDistritoTexto // Si es "Otro", usar el texto
            }));
        } else {
            setDataDomicilio((prevData) => ({
                ...prevData,
                distrito: distritoId
            }));
            setOtroDistritoTexto(''); // Limpiar texto si no es "Otro"
        }
    };

    const handleOtroRegionTexto = (e) => {
        const texto = e.target.value;
        setOtroRegionTexto(texto);

        // Si está seleccionado "Otro", actualizar el domicilio inmediatamente
        if (regionSeleccionada === OTRO_REGION_ID) {
            setDataDomicilio((prevData) => ({
                ...prevData,
                region: texto
            }));
        }
    };

    const handleOtroDistritoTexto = (e) => {
        const texto = e.target.value;
        setOtroDistritoTexto(texto);

        // Si está seleccionado "Otro", actualizar el domicilio inmediatamente
        if (distritoSeleccionado === OTRO_DISTRITO_ID) {
            setDataDomicilio((prevData) => ({
                ...prevData,
                distrito: texto
            }));
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
        const value = parseInt(e.target.value);
        // Si está vacío o no es un número válido, solo actualiza el input y no toques el arreglo
        if (value === '' || isNaN(parseInt(value))) {
            setNumDependientes(value); // Mantiene lo que el usuario escribe (aunque sea temporal)
            return;
        }
        const parsedValue = parseInt(value, 10);

        setNumDependientes(parsedValue);

        setDependientes((prev) => {
            const copia = [...prev];

            if (parsedValue > copia.length) {
                const adicionales = Array.from({ length: parsedValue - copia.length }, () => ({
                    nombrePersona: '',
                    edad: '',
                    parentesco: '',
                    archivo: null,
                    nombreArchivo: ''
                }));
                return [...copia, ...adicionales];
            } else {
                return copia.slice(0, parsedValue);
            }
        });

        setErroresFormulario((prev) => {
            const nuevos = [...(prev.dependientes || [])];

            if (parsedValue > nuevos.length) {
                const adicionales = Array.from({ length: parsedValue - nuevos.length }, () => ({
                    nombrePersona: false,
                    edad: false,
                    parentesco: false,
                    archivo: false
                }));
                return {
                    ...prev,
                    dependientes: [...nuevos, ...adicionales]
                };
            } else {
                return {
                    ...prev,
                    dependientes: nuevos.slice(0, parsedValue)
                };
            }
        });
    };

    const handleChangeDependiente = (index, field, value) => {
        const nuevos = [...dependientes];
        nuevos[index][field] = value;
        setDependientes(nuevos);
    };

    const handleFileUpload = (index, file) => {
        const nuevos = [...dependientes];
        nuevos[index].archivo = file;
        nuevos[index].nombreArchivo = file ? file.name : ""; // <-- Guarda el nombre
        setDependientes(nuevos);
    };

    // **************************  FUNCIONES PARA MOSTRAR MENSAJES AL USUARIO  ******************************

    const mostrarAlerta = (config) => {
        return Swal.fire({
            ...config,
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                //confirmButton.style.backgroundColor = 'var(--color-verde)';
            },
        });
    };

    const mostrarError = (mensajeHTML) => {
        mostrarAlerta({
            title: 'Error',
            html: mensajeHTML, // Usa HTML para mostrar los errores sin viñetas
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
    };

    const mostrarCuidado = (mensaje) => {
        mostrarAlerta({
            title: '¡Alerta!',
            text: mensaje,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
        });
    };

    const mostrarExito = (mensaje) => {
        mostrarAlerta({
            title: 'Éxito',
            text: mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        }).then(() => {
            navigate('/menuSolicitar')
        });
    };

    const mostrarInformacion = (mensaje) => {
        mostrarAlerta({
            title: 'Periodo de registro cerrado',
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'Entendido',
        });
    };

    const mostrarMensajeErrorAlGuardar = (mensaje) => {
        mostrarError(mensaje);
    };

    const mostrarMensajeExito = (mensaje) => {
        mostrarExito(mensaje);
    };

    const mostrarMensajeError = (mensaje) => {
        mostrarError(mensaje);
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const numero = parseInt(value);

        // Clonar el objeto actual
        const nuevoData = { ...dataMiFamilia, [name]: numero };

        // Si es el campo de num_hermanos y es 0, autollenar los demás
        if (name === "num_hermanos" && numero === 0) {
            nuevoData.num_hermanos_estudiando = 0;
            nuevoData.num_hermanos_no_estudiando = 0;
            nuevoData.num_hermanos_licenciatura = 0;
        }

        setDataMiFamilia((prevState) => ({
            ...prevState,
            [name]: type === "number" ? (value === "" ? null : parseInt(value)) : value,
        }));

        setErroresFormulario((prev) => ({
            ...prev,
            [name === "num_hermanos" ? "numHermanos" :
                name === "num_hermanos_estudiando" ? "numHermanosEstudiando" :
                    name === "num_hermanos_no_estudiando" ? "numHermanosNoEstudiando" :
                        name === "num_hermanos_licenciatura" ? "numHermanosLicenciatura" : name]: false
        }));

        setErroresFormulario((prev) => {
            const nuevos = [...(prev.dependientes || [])];

            if (value > nuevos.length) {
                const adicionales = Array.from({ length: value - nuevos.length }, () => ({
                    nombrePersona: false,
                    edad: false,
                    parentesco: false,
                    archivo: false
                }));
                return {
                    ...prev,
                    dependientes: [...nuevos, ...adicionales]
                };
            } else {
                return {
                    ...prev,
                    dependientes: nuevos.slice(0, value)
                };
            }
        });

        // Limpiar error si el usuario escribe algo válido
        setErroresFormulario((prev) => ({
            ...prev,
            [name]: false,
        }));
    };

    // En el input agrega un onChange controlado para solo permitir números y máximo 10 dígitos

    const handleTelefonoChange = (e) => {
        let valor = e.target.value;

        // Solo dígitos
        valor = valor.replace(/\D/g, '');

        // Limitar a 10 dígitos máximo
        if (valor.length > 10) {
            valor = valor.slice(0, 10);
        }

        setDataMiFamilia((prev) => ({
            ...prev,
            telefono: valor
        }));

        // Limpia error si cumple la condición (exactamente 10 dígitos)
        setErroresFormulario((prev) => ({
            ...prev,
            telefono: valor.length === 10 ? false : prev.telefono
        }));
    };

    const validarFormulario = () => {
        const errores = {};
        const erroresSwal = [];

        if (domicilioCoincide === null || domicilioCoincide === undefined || domicilioCoincide === '') {
            errores.domicilioCoincide = true;
            erroresSwal.push('Debes indicar si el domicilio coincide');
        }

        // Validar distrito - manejar tanto objeto como string
        if (!dataDomicilio.distrito || 
            (typeof dataDomicilio.distrito === 'object' ? 
                !dataDomicilio.distrito.id : 
                dataDomicilio.distrito.trim() === "")) {
            errores.distrito = true;
            erroresSwal.push('El Distrito es obligatorio.');
        }

        // Validar región - manejar tanto objeto como string
        if (!dataDomicilio.region || 
            (typeof dataDomicilio.region === 'object' ? 
                !dataDomicilio.region.id : 
                dataDomicilio.region.trim() === "")) {
            errores.region = true;
            erroresSwal.push('La Región es obligatoria.');
        }

        // Validaciones de domicilio (si no coincide con el del alumno)
        if (domicilioCoincide !== 'Si' && domicilioCoincide !== true) {

            if (!dataDomicilio.cp || dataDomicilio.cp.trim() === "") {
                errores.cp = true;
                erroresSwal.push('El Código Postal es obligatorio.');
            }

            if (!dataDomicilio.localidad || dataDomicilio.localidad.trim() === "") {
                errores.localidad = true;
                erroresSwal.push('La Localidad es obligatoria.');
            }

            if (!regionSeleccionada) {
                errores.region = true;
                erroresSwal.push('La Región es obligatoria.');
            }

            if (regionSeleccionada === OTRO_REGION_ID && (!otroRegionTexto || otroRegionTexto.trim() === "")) {
                errores.otroRegionTexto = true;
                erroresSwal.push('Debes especificar la otra región.');
            }

            if (!distritoSeleccionado) {
                errores.distrito = true;
                erroresSwal.push('El Distrito es obligatorio.');
            }

            if (distritoSeleccionado === OTRO_DISTRITO_ID && (!otroDistritoTexto || otroDistritoTexto.trim() === "")) {
                errores.otroDistritoTexto = true;
                erroresSwal.push('Debes especificar el otro distrito.');
            }

            if (!dataDomicilio.colonia || dataDomicilio.colonia.trim() === "") {
                errores.colonia = true;
                erroresSwal.push('La Colonia es obligatoria.');
            }
        }

        // Teléfono
        if (!dataMiFamilia.telefono) {
            errores.telefono = true;
            erroresSwal.push('El campo Teléfono es obligatorio.');
        } else if (!/^\d{10}$/.test(dataMiFamilia.telefono)) {
            errores.telefono = true;
            erroresSwal.push('El Teléfono debe tener exactamente 10 dígitos.');
        }

        // Escolaridad
        if (!escolaridadPadre) {
            errores.escolaridadPadre = true;
            erroresSwal.push('Escolaridad del padre');
        }
        if (!escolaridadMadre) {
            errores.escolaridadMadre = true;
            erroresSwal.push('Escolaridad de la madre');
        }

        if (!situacionViviendaSeleccionada) {
            errores.situacionVivienda = true;
            erroresSwal.push('Situación de vivienda');
        }

        if (!tipoViviendaSeleccionado) {
            errores.tipoVivienda = true;
            erroresSwal.push('Tipo de vivienda');
        }

        if (!materialSeleccionado) {
            errores.materialVivienda = true;
            erroresSwal.push('Material de construcción');
        }

        if (!servicioOtroSeleccionado || servicioOtroSeleccionado.length === 0) {
            errores.serviciosVivienda = true;
            erroresSwal.push('Selecciona al menos un servicio con el que cuenta la vivienda');
        }

        if (servicioOtroSeleccionado.includes(String(OTRO_ID)) && !otroServicioTexto.trim()) {
            errores.otroServicioTexto = true;
            erroresSwal.push('Especifica el otro servicio');
        }

        if (!selectedBienesHogar || selectedBienesHogar.length === 0) {
            errores.bienesHogar = true;
            erroresSwal.push('Selecciona al menos un bien del hogar');
        }

        if (!mediosEstudioSeleccionados || mediosEstudioSeleccionados.length === 0) {
            errores.mediosEstudio = true;
            erroresSwal.push('Selecciona al menos un medio para estudiar en casa');
        }

        if (!internetSeleccionado || internetSeleccionado === '') {
            errores.accesoInternet = true;
            erroresSwal.push('Selecciona una opción sobre el acceso a internet');
        }

        // Validación de número de hermanos
        // Validación de hermanos
        const total = dataMiFamilia.num_hermanos;
        const estudiando = dataMiFamilia.num_hermanos_estudiando;
        const noEstudiando = dataMiFamilia.num_hermanos_no_estudiando;
        const licenciatura = dataMiFamilia.num_hermanos_licenciatura;

        // Si num_hermanos es null o menor que 0
        if (total === null || total < 0) {
            errores.numHermanos = true;
            erroresSwal.push('Número total de hermanos debe ser 0 o más.');
        }

        // Si hay hermanos (> 0), validar los otros campos
        if (total > 0) {
            if (estudiando === null || estudiando < 0) {
                errores.numHermanosEstudiando = true;
                erroresSwal.push('Número de hermanos estudiando no válido.');
            }

            if (noEstudiando === null || noEstudiando < 0) {
                errores.numHermanosNoEstudiando = true;
                erroresSwal.push('Número de hermanos que no estudian no válido.');
            }

            if (licenciatura === null || licenciatura < 0) {
                errores.numHermanosLicenciatura = true;
                erroresSwal.push('Número de hermanos con licenciatura no válido.');
            }

            const suma = (estudiando || 0) + (noEstudiando || 0) + (licenciatura || 0);
            if (suma > total) {
                errores.numHermanos = true;
                erroresSwal.push('La suma de hermanos no puede ser mayor al total.');
            }
        } else {
            // Si es 0, autollenar si no estaba hecho
            if (estudiando !== 0 || noEstudiando !== 0 || licenciatura !== 0) {
                dataMiFamilia.num_hermanos_estudiando = 0;
                dataMiFamilia.num_hermanos_no_estudiando = 0;
                dataMiFamilia.num_hermanos_licenciatura = 0;
            }
        }

        // Validación cruzada opcional
        const suma =
            (dataMiFamilia.num_hermanos_estudiando || 0) +
            (dataMiFamilia.num_hermanos_no_estudiando || 0) +
            (dataMiFamilia.num_hermanos_licenciatura || 0);

        if (dataMiFamilia.num_hermanos !== null && suma > dataMiFamilia.num_hermanos) {
            errores.numHermanos = true;
            erroresSwal.push('La suma de hermanos estudiando/no estudiando/licenciatura no puede superar al total');
        }

        if (!numPersonasHabitan || parseInt(numPersonasHabitan) <= 0) {
            errores.numPersonasHabitan = true;
            erroresSwal.push('Número de personas que habitan la vivienda');
        }


        if (!mediosEstudioSeleccionados || mediosEstudioSeleccionados.length === 0) {
            errores.mediosEstudio = true;
            erroresSwal.push('Medios de estudio');
        }

        dependientes.forEach((d, i) => {
            if (!d.nombrePersona || !d.edad || !d.parentesco) {
                errores[`dependiente_${i}`] = true;
                erroresSwal.push(`Datos incompletos del dependiente ${i + 1}`);
            }
        });

        errores.dependientes = [];

        // Validar dependientes SOLO si numDependientes es mayor a 0
        if (parseInt(numDependientes) > 0) {
            dependientes.forEach((dep, index) => {
                const errDep = {};

                if (!dep.nombrePersona || dep.nombrePersona.trim() === "") {
                    errDep.nombrePersona = true;
                    erroresSwal.push(`El nombre completo del dependiente #${index + 1} es obligatorio.`);
                }

                if (!dep.edad || isNaN(dep.edad) || parseInt(dep.edad) < 0) {
                    errDep.edad = true;
                    erroresSwal.push(`La edad del dependiente #${index + 1} no es válida.`);
                }

                if (!dep.parentesco || dep.parentesco === "") {
                    errDep.parentesco = true;
                    erroresSwal.push(`Selecciona el parentesco del dependiente #${index + 1}.`);
                }

                if (!dep.archivo) {
                    errDep.archivo = true;
                    erroresSwal.push(`Debes subir un archivo para el dependiente #${index + 1}.`);
                }

                if (Object.keys(errDep).length > 0) {
                    if (!errores.dependientes) errores.dependientes = [];
                    errores.dependientes[index] = errDep;
                }
            });
        }


        setErroresFormulario(errores);
        return erroresSwal;
    };

    // ********************  SE ENVIAN LOS DATOS DEL FORMULARIO PARA SER GUARDADOS  ************************

    const handleSubmit = async () => {
        const errores = validarFormulario();

        /*if (errores.length > 0) {
            // Mostrar mensaje de error con lista
            const mensajeHTML = `
            <ul style="text-align: left;">
                ${errores.map(err => `<li>${err}</li>`).join('')}
            </ul>
        `;
            mostrarError(mensajeHTML);
            return;
        }*/

        if (errores.length > 0) {
            Swal.fire({
                icon: 'warning',  // Puedes usar 'info' o 'warning'
                title: 'Faltan campos por llenar',
                text: 'Por favor revisa el formulario antes de continuar.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'var(--color-morado3)', // O el color que uses
            });
            return;
        }
        /*const result = await Swal.fire({
            title: '¿Deseas guardar el formulario?',
            text: 'Asegúrate de haber revisado todos los datos antes de continuar.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-verde)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Quiero revisar',
        });
        // Si el usuario cancela, detenemos la ejecución
        if (!result.isConfirmed) {
            return;
        }*/
        try {
            // Preparar datos de domicilio
            let datosDomicilio = {};
            if (domicilioCoincide === 'Si' || domicilioCoincide === true) {
                datosDomicilio = {
                    usarDomicilioAlumno: true,
                    idDomicilioAlumno: datosAlumno?.misDatos?.domicilio?.id,
                    region: datosAlumno?.misDatos?.domicilio?.region || regionSeleccionada,
                    distrito: datosAlumno?.misDatos?.domicilio?.distrito || distritoSeleccionado
                };
            } else {
                datosDomicilio = {
                    usarDomicilioAlumno: false,
                    ...dataDomicilio,
                    calle: dataDomicilio.calle || "N/A",
                    numero: dataDomicilio.numero || "N/A",
                };
            }

            // Función para convertir archivo a base64
            const convertirArchivoABase64 = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        // Extraer solo la parte base64 (sin el prefijo "data:tipo;base64,")
                        const base64 = reader.result.split(',')[1];
                        resolve(base64);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            };

            // Preparar dependientes con archivos convertidos a base64
            const dependientesData = await Promise.all(
                dependientes.map(async (dependiente) => {
                    let archivoBase64 = null;

                    if (dependiente.archivo) {
                        try {
                            const base64 = await convertirArchivoABase64(dependiente.archivo);
                            archivoBase64 = {
                                name: dependiente.archivo.name,
                                size: dependiente.archivo.size,
                                type: dependiente.archivo.type,
                                contenido: base64 // Aquí está el contenido del archivo en base64
                            };
                        } catch (error) {
                            console.error('Error al convertir archivo a base64:', error);
                            // Si hay error, enviar sin archivo
                            archivoBase64 = null;
                        }
                    }

                    return {
                        nombrePersona: dependiente.nombrePersona,
                        edad: parseInt(dependiente.edad),
                        parentesco: dependiente.parentesco,
                        archivo: archivoBase64
                    };
                })
            );

            const tieneInternet = () => {
                return internetSeleccionado !== "1";
            };

            // Crear el payload único con toda la información
            const payloadCompleto = {
                // Información del alumno
                alumnoId: JSON.parse(localStorage.getItem('usuario')).alumnoId,

                // Datos del domicilio
                domicilio: datosDomicilio,

                // Datos de Mi Familia
                miFamilia: {
                    telefono: dataMiFamilia.telefono,
                    num_hermanos: dataMiFamilia.num_hermanos,
                    num_hermanos_estudiando: dataMiFamilia.num_hermanos_estudiando,
                    num_hermanos_no_estudiando: dataMiFamilia.num_hermanos_no_estudiando,
                    num_hermanos_licenciatura: dataMiFamilia.num_hermanos_licenciatura,
                    id_escolaridad_padre: parseInt(escolaridadPadre),
                    id_escolaridad_madre: parseInt(escolaridadMadre),
                    num_personas_dependen: parseInt(numDependientes) || 0
                },

                // Datos de la vivienda
                vivienda: {
                    num_personas_habitan: parseInt(numPersonasHabitan),
                    id_cat_situacion_vivienda: parseInt(situacionViviendaSeleccionada),
                    id_cat_tipo_vivienda: parseInt(tipoViviendaSeleccionado),
                    id_cat_material_vivienda: parseInt(materialSeleccionado),
                    id_cat_internet: parseInt(internetSeleccionado),
                    tieneInternet: tieneInternet(), // false si ID es "1", true para otros IDs
                },

                // Servicios de la vivienda
                serviciosVivienda: servicioOtroSeleccionado.map(id => ({
                    servicioViviendaId: parseInt(id),
                    esOtro: parseInt(id) === OTRO_ID,
                    textoOtro: parseInt(id) === OTRO_ID ? otroServicioTexto : null
                })),

                // Bienes del hogar
                bienesHogar: selectedBienesHogar.map(id => ({
                    id_cat_bienes_hogar: parseInt(id)
                })),

                // Medios de estudio
                mediosEstudio: mediosEstudioSeleccionados
                    .filter(id => id && !isNaN(Number(id)))
                    .map(id => ({
                        id_cat_medios_estudios: parseInt(id)
                    })),

                // Personas dependientes
                personasDependientes: dependientesData
            };

            console.log('Payload completo a enviar:', payloadCompleto);

            let response;
            let nuevosErrores = null;
            // Verificar si es actualización o creación
            if (datosAlumno.miFamilia !== null) {
                // Actualizar datos existentes
                const idMiFamilia = datosAlumno.miFamilia.id;
                console.log(datosAlumno);
                response = await MiFamiliaService.update(idMiFamilia, payloadCompleto);
                mostrarExito('Datos actualizados correctamente');
            } else {
                // Crear nuevos datos
                response = await MiFamiliaService.create(payloadCompleto);
                console.log('Datos creados:', response);
                mostrarExito('Datos guardados correctamente');
            }
        } catch (error) {
            const mensaje = error.message || error.toString();
            if (mensaje.includes('periodo de registro')) {
                mostrarInformacion(error);
                return;
            }
            mostrarError('Ocurrió un error al guardar la información');
        }
    };


    // ******************************************************************************************************
    return (
        <div className='d-flex flex-column min-vh-100'>
            <div className='flex-grow-1 px-4 px-md-0'>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <div className='row mx-lg-5 mt-4 d-flex justify-content-center'>
                        <p>Los <span style={{ color: 'red' }}>*</span> significan que el campo es obligatorio.</p>

                        <div className='tarjeta-border p-4 mb-2'>
                            <div className='row'>
                                <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>
                                <div className='mt-2'>
                                    <div className='d-flex justify-content-start align-items-center flex-wrap'>
                                        <label className='fs-5 me-5' style={{ color: 'var(--color-morado3)' }}>
                                            ¿El domicilio de tu familia coincide con el que te encuentras actualmente?
                                            <span style={{ color: 'red' }}>*</span>

                                        </label>
                                        <RadioSelect
                                            gris={true}
                                            options={['Si', 'No']}
                                            onChange={handleDomicilioCoincide}
                                            name={"domicilioCoincide"}
                                            value={domicilioCoincide}
                                        />
                                        {erroresFormulario.domicilioCoincide && (
                                            <div className="text-danger ms-3" style={{ fontSize: '0.9rem' }}>
                                                Por favor, selecciona una opción.
                                            </div>
                                        )}
                                    </div>
                                    <div className="line mx-auto mt-4 mb-4"></div>
                                    <div className='row'>
                                        <div className="col-12 col-md-2 mt-2">
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>C.P.	<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${erroresFormulario.cp ? 'is-invalid' : ''}`}
                                                placeholder="Código Postal"
                                                onChange={actualizarCamposDomicilio}
                                                value={dataDomicilio.cp}
                                                name={"cp"}
                                                disabled={disabled}
                                            />
                                            {erroresFormulario.cp && (
                                                <div className="invalid-feedback">
                                                    El Código Postal es obligatorio.
                                                </div>
                                            )}

                                        </div>

                                        <div className='col-12 col-md-4 mt-2'>
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Estado</label>
                                            <div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={actualizarCamposDomicilio}
                                                    value={dataDomicilio.estado}
                                                    name='estado'
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6 mt-2'>
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Municipio</label>
                                            <div>
                                                <input className='form-control' type="text" value={dataDomicilio.municipio} name='municipio' disabled={true} />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-3 mt-2">
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Región
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select
                                                name="region"
                                                value={regionSeleccionada}
                                                onChange={handleChangeRegion}
                                                className={`form-select ${erroresFormulario.region ? 'is-invalid' : ''}`}
                                            >
                                                <option value="">Selecciona una región</option>
                                                {regiones.map((region) => (
                                                    <option key={region.id} value={region.id}>
                                                        {region.nombre || region.nombreRegion}
                                                    </option>
                                                ))}
                                            </select>
                                            {erroresFormulario.region && (
                                                <div className="invalid-feedback">
                                                    Selecciona una región.
                                                </div>
                                            )}

                                            {/* Input para "Otro" en región */}
                                            {regionSeleccionada === OTRO_REGION_ID && (
                                                <div className="mt-2">
                                                    <label className='fs-6' style={{ color: 'var(--color-morado3)' }}>
                                                        Especifique otra región:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${erroresFormulario.otroRegionTexto ? 'is-invalid' : ''}`}
                                                        value={otroRegionTexto}
                                                        onChange={handleOtroRegionTexto}
                                                        placeholder="Escriba la región"
                                                        disabled={disabled}
                                                    />
                                                    {erroresFormulario.otroRegionTexto && (
                                                        <div className="invalid-feedback">
                                                            Escribe el nombre de la región.
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className='col-12 col-md-3 mt-2'>
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Localidad
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input
                                                className={`form-control ${erroresFormulario.localidad ? 'is-invalid' : ''}`}
                                                type="text"
                                                name="localidad"
                                                value={dataDomicilio.localidad || ''}
                                                onChange={actualizarCamposDomicilio}
                                                disabled={disabled}
                                            />
                                            {erroresFormulario.localidad && (
                                                <div className="invalid-feedback">
                                                    La localidad es obligatoria.
                                                </div>
                                            )}
                                        </div>

                                        <div className='col-12 col-md-3 mt-2'>
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Distrito
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select
                                                name="distrito"
                                                value={distritoSeleccionado}
                                                onChange={handleChangeDistrito}
                                                className={`form-select ${erroresFormulario.distrito ? 'is-invalid' : ''}`}
                                            >
                                                <option value="">Selecciona un distrito</option>
                                                {distritos.map((distrito) => (
                                                    <option key={distrito.id} value={distrito.id}>
                                                        {distrito.nombre || distrito.nombreDistrito}
                                                    </option>
                                                ))}
                                            </select>
                                            {erroresFormulario.distrito && (
                                                <div className="invalid-feedback">Selecciona un distrito.</div>
                                            )}

                                            {/* Input para "Otro" en distrito */}
                                            {distritoSeleccionado === OTRO_DISTRITO_ID && (
                                                <div className="mt-2">
                                                    <label className='fs-6' style={{ color: 'var(--color-morado3)' }}>
                                                        Especifique otro distrito:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${erroresFormulario.otroDistritoTexto ? 'is-invalid' : ''}`}
                                                        value={otroDistritoTexto}
                                                        onChange={handleOtroDistritoTexto}
                                                        placeholder="Escriba el distrito"
                                                        disabled={disabled}
                                                    />
                                                    {erroresFormulario.otroDistritoTexto && (
                                                        <div className="invalid-feedback">
                                                            Escribe el nombre del distrito.
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>


                                        <div className='col-12 col-md-3 mt-2'>
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Colonia
                                                <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select
                                                name="colonia"
                                                value={dataDomicilio.colonia || ''}
                                                onChange={actualizarCamposDomicilio}
                                                className={`form-select ${erroresFormulario.colonia ? 'is-invalid' : ''}`}
                                                disabled={disabled}
                                            >
                                                <option value="">Selecciona una opción</option>
                                                {colonias.map((c, index) => (
                                                    <option key={index} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                            {erroresFormulario.colonia && (
                                                <div className="invalid-feedback">
                                                    Selecciona una colonia.
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-lg-5 mt-4 d-flex justify-content-center">
                        {/* Tarjeta combinada para Contacto y Escolaridad */}
                        <div className="tarjeta-border p-4 mb-4 w-100">
                            <div className="row px-4">
                                {/* Columna 1: Contacto */}
                                <div className="col-12 col-md-4 d-flex flex-column mb-4 mb-md-0">
                                    <p className="fs-2" style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Contacto
                                    </p>
                                    <div className="mb-3">
                                        <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                            Teléfono de la familia	<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${erroresFormulario.telefono ? 'is-invalid' : ''}`}
                                            placeholder="Teléfono de casa o de algún familiar"
                                            name="telefono"
                                            value={dataMiFamilia.telefono}
                                            onChange={handleTelefonoChange}
                                        />
                                        {erroresFormulario.telefono && (
                                            <div className="invalid-feedback">
                                                Ingresa un número de teléfono válido de 10 dígitos.
                                            </div>
                                        )}

                                    </div>
                                </div>
                                {/* ESCOLARIDAD */}
                                <div className="col-12 col-md-8 d-flex flex-column">
                                    <p className="fs-2" style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Escolaridad
                                    </p>
                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad del padre	<span style={{ color: 'red' }}>*</span>

                                            </label>
                                            <select
                                                name="escolaridadPadre"
                                                className={`form-select ${erroresFormulario.escolaridadPadre ? 'is-invalid' : ''}`}
                                                value={escolaridadPadre}
                                                onChange={handleChangeEscolaridadPadre}
                                            >
                                                <option value="">Selecciona una opción</option>
                                                {escolaridades.map((e) => (
                                                    <option key={e.id} value={e.id}>
                                                        {e.nombreEscolaridad}
                                                    </option>
                                                ))}
                                            </select>
                                            {erroresFormulario.escolaridadPadre && (
                                                <div className="invalid-feedback">
                                                    Selecciona la escolaridad del padre.
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad de la madre 	<span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <select
                                                name="escolaridadMadre"
                                                className={`form-select ${erroresFormulario.escolaridadMadre ? 'is-invalid' : ''}`}
                                                value={escolaridadMadre}
                                                onChange={handleChangeEscolaridadMadre}
                                            >
                                                <option value="">Selecciona una opción</option>
                                                {escolaridades.map((e) => (
                                                    <option key={e.id} value={e.id}>
                                                        {e.nombreEscolaridad}
                                                    </option>
                                                ))}
                                            </select>
                                            {erroresFormulario.escolaridadMadre && (
                                                <div className="invalid-feedback">
                                                    Selecciona la escolaridad de la madre.
                                                </div>
                                            )}
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
                                        <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <select
                                        name="situacionVivienda"
                                        className={`form-select ${erroresFormulario.situacionVivienda ? 'is-invalid' : ''}`}
                                        value={situacionViviendaSeleccionada}
                                        onChange={handleChangeSituacionVivienda}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        {catSituacionVivienda.map((item) => (
                                            <option key={item.id} value={item.id}>{item.nombreSituacion}</option>
                                        ))}
                                    </select>

                                    {erroresFormulario.situacionVivienda && (
                                        <div className="invalid-feedback">
                                            Selecciona la situación de la vivienda.
                                        </div>
                                    )}
                                </div>

                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Tipo de vivienda
                                        <span style={{ color: 'red' }}>*</span>

                                    </label>
                                    <select
                                        className={`form-select ${erroresFormulario.tipoVivienda ? 'is-invalid' : ''}`}
                                        value={tipoViviendaSeleccionado}
                                        onChange={handleChangeTipoVivienda}>
                                        <option value="">Selecciona una opción</option>
                                        {tiposVivienda.map((item) => (
                                            <option key={item.id} value={item.id}>{item.nombreTipo}</option>
                                        ))}
                                    </select>
                                    {erroresFormulario.tipoVivienda && (
                                        <div className="invalid-feedback">
                                            Selecciona un tipo de vivienda.
                                        </div>
                                    )}
                                </div>
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Material de construcción
                                        <span style={{ color: 'red' }}>*</span>

                                    </label>
                                    <select
                                        name="materialVivienda"
                                        className={`form-select ${erroresFormulario.materialVivienda ? 'is-invalid' : ''}`}
                                        value={materialSeleccionado}
                                        onChange={handleChangeMaterial}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        {materialesVivienda.map((item) => (
                                            <option key={item.id} value={item.id}>{item.nombreMaterial}</option>
                                        ))}
                                    </select>
                                    {erroresFormulario.materialVivienda && (
                                        <div className="invalid-feedback">
                                            Selecciona un material de construcción.
                                        </div>
                                    )}
                                </div>

                                <div className={`col-12 col-md-8 ${erroresFormulario.serviciosVivienda ? 'border-danger' : 'border-secondary'}`}>
                                    <label className="fs-5 mb-2 d-block" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Con qué servicios cuenta la vivienda?
                                        <span style={{ color: 'red' }}>*</span>
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
                                                            prefix="servicios-"
                                                            opcion={otro.nombreServicio}
                                                            checked={servicioOtroSeleccionado.includes(String(otro.id))}
                                                            onChange={handleCheckServiciosOtro}
                                                        />
                                                    ))}
                                            </div>
                                        ))}
                                        {erroresFormulario.serviciosVivienda && (
                                            <div className="col-12">
                                                <div className="text-danger mt-2">
                                                    Debes seleccionar al menos un servicio.
                                                </div>
                                            </div>
                                        )}
                                        {servicioOtroSeleccionado.includes(String(OTRO_ID)) && (
                                            <div className="col-md-6 mb-2 mt-2">
                                                <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                    Especifique otro servicio:
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${erroresFormulario.otroServicioTexto ? 'is-invalid' : ''}`}
                                                    value={otroServicioTexto}
                                                    onChange={(e) => setOtroServicioTexto(e.target.value)}
                                                />
                                                {erroresFormulario.otroServicioTexto && (
                                                    <div className="invalid-feedback">
                                                        Por favor especifica el otro servicio.
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    </div>


                                </div>
                            </div>
                            <div className='row gap-3 px-4'>
                                <div className={`col-12 col-md-12 ${erroresFormulario.bienesHogar ? 'border-danger' : 'border-secondary'}`}>
                                    <label className="fs-5 mb-3 d-block" style={{ color: 'var(--color-morado3)' }}>
                                        ¿En la casa donde vive tu familia hay?
                                        <span style={{ color: 'red' }}>*</span>
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
                                                            prefix="bienes-"
                                                            opcion={bien.nombreBien}
                                                            checked={selectedBienesHogar.includes(String(bien.id))}
                                                            onChange={handleCheckBienesHogar}
                                                        />
                                                    ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {erroresFormulario.bienesHogar && (
                                    <div className="text-danger mt-2">
                                        Debes seleccionar al menos un bien del hogar.
                                    </div>
                                )}
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
                                        <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className={`form-control ${erroresFormulario.numPersonasHabitan ? 'is-invalid' : ''}`}
                                        min="1"
                                        value={numPersonasHabitan}
                                        onChange={(e) => setNumPersonasHabitan(e.target.value)}
                                    />
                                    {erroresFormulario.numPersonasHabitan && (
                                        <div className="invalid-feedback">
                                            Debes ingresar un número válido de personas.
                                        </div>
                                    )}
                                </div>
                                <div className={`col-12 col-md-8 mb-3 ${erroresFormulario.mediosEstudio ? 'border-danger' : 'border-secondary'}`}>
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Medios para estudiar en casa (marca tantas opciones como sea necesario):
                                        <span style={{ color: 'red' }}>*</span>

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
                                                            prefix="medios-"
                                                            opcion={item.nombreMedios}
                                                            checked={mediosEstudioSeleccionados.includes(String(item.id))}
                                                            onChange={handleCheckMediosEstudio}
                                                        />
                                                    ))}
                                            </div>
                                        ))}
                                        {erroresFormulario.mediosEstudio && (
                                            <div className="text-danger mt-2">
                                                Debes seleccionar al menos un medio de estudio.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-3 px-4">
                                <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                    ¿Cuenta con acceso a internet?
                                    <span style={{ color: 'red' }}>*</span>
                                </label>
                                <div className="col-md-12">
                                    <select
                                        name="accesoInternet"
                                        className={`form-select ${erroresFormulario.accesoInternet ? 'is-invalid' : ''}`}
                                        options={opcionesInternet.map((e) => ({ value: e.id, label: e.nombreInternet }))}
                                        value={internetSeleccionado}
                                        onChange={handleChangeInternet}
                                        placeholder="Seleccione una opción"
                                    >
                                        <option value="">Seleccione una opción</option>
                                        {opcionesInternet.map((e) => (
                                            <option key={e.id} value={e.id}>
                                                {e.nombreInternet}
                                            </option>
                                        ))}
                                    </select>
                                    {erroresFormulario.accesoInternet && (
                                        <div className="invalid-feedback">
                                            Selecciona una opción sobre el acceso a internet.
                                        </div>
                                    )}
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
                                        ¿Cuántos hermanos tienes? 	<span style={{ color: 'red' }}>*</span>

                                    </label>
                                    <input
                                        type="number"
                                        name="num_hermanos"
                                        className={`form-control ${erroresFormulario.numHermanos ? 'is-invalid' : ''}`}
                                        placeholder="Número de hermanos"
                                        value={dataMiFamilia.num_hermanos ?? ""}
                                        onChange={handleChange}
                                    />
                                    {erroresFormulario.numHermanos && (
                                        <div className="invalid-feedback">
                                            Debes ingresar un número válido de hermanos.
                                        </div>
                                    )}
                                </div>

                                {/* ¿Cuántos están estudiando? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos están estudiando? 	<span style={{ color: 'red' }}>*</span>

                                    </label>
                                    <input
                                        type="number"
                                        className={`form-control ${erroresFormulario.numHermanosEstudiando ? 'is-invalid' : ''}`}
                                        name="num_hermanos_estudiando"
                                        value={dataMiFamilia.num_hermanos_estudiando ?? ""}
                                        onChange={handleChange}
                                    />
                                    {erroresFormulario.numHermanosEstudiando && (
                                        <div className="invalid-feedback">
                                            Debes ingresar un número válido de hermanos que están estudiando.
                                        </div>
                                    )}
                                </div>

                                {/* ¿Cuántos dejaron de estudiar? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos no estudian? 	<span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className={`form-control ${erroresFormulario.numHermanosNoEstudiando ? 'is-invalid' : ''}`}
                                        name="num_hermanos_no_estudiando"
                                        value={dataMiFamilia.num_hermanos_no_estudiando ?? ""}
                                        onChange={handleChange}
                                    />
                                    {erroresFormulario.numHermanosNoEstudiando && (
                                        <div className="invalid-feedback">
                                            Debes ingresar un número válido de hermanos que dejaron de estudiar.
                                        </div>
                                    )}
                                </div>

                                {/* ¿Cuántos tienen licenciatura? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos tienen licenciatura? 	<span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className={`form-control ${erroresFormulario.numHermanosLicenciatura ? 'is-invalid' : ''}`}
                                        name="num_hermanos_licenciatura"
                                        value={dataMiFamilia.num_hermanos_licenciatura ?? ""}
                                        onChange={handleChange}
                                    />
                                    {erroresFormulario.numHermanosLicenciatura && (
                                        <div className="invalid-feedback">
                                            Debes ingresar un número válido de hermanos que tienen licenciatura.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 tarjeta-border d-flex flex-column p-4 mb-4 w-100">
                            <p className="fs-2 ms-4" style={{ color: "var(--color-morado2)", fontWeight: "bolder" }}>
                                Personas dependientes
                            </p>
                            <div className="col-12 col-md-8 mb-3 px-3">
                                <label className="fs-5" style={{ color: "var(--color-morado3)" }}>
                                    Además de ti, ¿Cuántas personas dependen económicamente del ingreso familiar?
                                    <span style={{ color: 'red' }}>*</span>
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
                                <div key={index} className="col-12 tarjeta-border p-4 mb-3">
                                    <div className="row">
                                        <div className="fs-5 col-12 col-md-3 mb-3">
                                            <label style={{ color: 'var(--color-morado3)' }} >Nombre completo:<span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control ${erroresFormulario.dependientes?.[index]?.nombrePersona ? 'is-invalid' : ''}`}
                                                value={dep.nombrePersona}
                                                onChange={(e) =>
                                                    handleChangeDependiente(index, 'nombrePersona', e.target.value)
                                                }
                                                placeholder="Nombre completo"
                                            />
                                            {erroresFormulario.dependientes?.[index]?.nombrePersona && (
                                                <div className="invalid-feedback">Este campo es obligatorio.</div>
                                            )}
                                        </div>

                                        <div className="fs-5 col-12 col-md-2 mb-3">
                                            <label style={{ color: 'var(--color-morado3)' }} >Edad:<span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="number"
                                                className={`form-control ${erroresFormulario.dependientes?.[index]?.edad ? 'is-invalid' : ''}`}
                                                value={dep.edad}
                                                onChange={(e) => handleChangeDependiente(index, 'edad', e.target.value)}
                                            />
                                            {erroresFormulario.dependientes?.[index]?.edad && (
                                                <div className="invalid-feedback">Este campo de edad es obligatorio.</div>
                                            )}
                                        </div>

                                        <div className="fs-5 col-12 col-md-3 mb-3">
                                            <label style={{ color: 'var(--color-morado3)' }} >Parentesco:<span style={{ color: 'red' }}>*</span></label>
                                            <select
                                                className={`form-select ${erroresFormulario.dependientes?.[index]?.parentesco ? 'is-invalid' : ''}`}
                                                name={`parentesco-${index}`}
                                                value={dep.parentesco}
                                                onChange={(e) => handleChangeDependiente(index, 'parentesco', e.target.value)}
                                                placeholder="Selecciona parentesco"
                                            >
                                                <option value="">Selecciona parentesco</option>
                                                {parentescos.map((parentesco) => (
                                                    <option key={parentesco.id} value={parentesco.id}>
                                                        {parentesco.nombre || parentesco.nombreParentesco}
                                                    </option>
                                                ))}
                                            </select>
                                            {erroresFormulario.dependientes?.[index]?.parentesco && (
                                                <div className="invalid-feedback">Es obligatorio el parentesco.</div>
                                            )}
                                        </div>

                                        <div className="fs-5 col-12 col-md-4 mb-3">
                                            <label style={{ color: 'var(--color-morado3)' }}  >Comprobante (CURP, Acta, etc.):<span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="file"
                                                className={`form-control ${erroresFormulario.dependientes?.[index]?.archivo ? 'is-invalid' : ''}`}
                                                onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                                accept=".jpg,.jpeg,.png,.pdf"
                                            />
                                            {erroresFormulario.dependientes?.[index]?.archivo && (
                                                <div className="invalid-feedback">
                                                    Debes subir un archivo válido.
                                                </div>
                                            )}
                                            {dep.nombreArchivo && (
                                                <div className="mt-1 text-secondary" style={{ fontSize: "0.9em" }}>
                                                    Archivo enviado: {dep.nombreArchivo}
                                                    <br />
                                                    <small>Si subes un nuevo archivo, reemplazará al anterior</small>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4 mb-4">
                            <button
                                className="btn btn-midDatos"
                                onClick={handleSubmit}
                                disabled={btnDisabled}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>

                </form>
            </div >

        </div >
    );
};
export default MiFamiliaForm;
