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

import MiFamiliaService from '../../../services/miFamiliaService';
import MediosEstudioService from '../../../services/mediosEstudiosService';
import viviendaFamiliarService from '../../../services/viviendaFamiliarService';
import serviciosViviendaService from '../../../services/serviciosViviendaService';
import BienesHogarService from '../../../services/BienesHogarService';
import personasDependientesService from '../../../services/personasDependientesService';
import DomicilioCpService from '../../../services/DomicilioCpService';
import AlumnoService from '../../../services/AlumnoService';
import CatRegionDistritoService from '../../../services/CatRegionDistritoService';
import CatParentescoService from '../../../services/CatParentescoService';
import { useNavigate } from 'react-router-dom';


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

    const [datosAlumno, setDatosAlumno] = useState(null);
    const [domicilioCoincide, setDomicilioCoincide] = useState('');
    const [disabled, setDisabled] = useState(false);

    const [regiones, setRegiones] = useState([]);
    const [distritos, setDistritos] = useState([]);

    const [regionSeleccionada, setRegionSeleccionada] = useState('');
    const [distritoSeleccionado, setDistritoSeleccionado] = useState('');

    // Agregar estados para "Otro"
    const [otroRegionTexto, setOtroRegionTexto] = useState('');
    const [otroDistritoTexto, setOtroDistritoTexto] = useState('');
    const [parentescos, setParentescos] = useState([]);


    const OTRO_REGION_ID = "9"; // ID que identifica la opción "Otro" en regiones
    const OTRO_DISTRITO_ID = "26"; // ID que identifica la opción "Otro" en distritos
    const navigate = useNavigate(); // Añadir esta línea



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

    // Agregar función para cargar datos existentes de Mi Familia
    const setDatosMiFamiliaAlumno = (data) => {
        console.log("=== FUNCIÓN EJECUTÁNDOSE ===");
        console.log("Datos de mi familia del alumno: ", data);

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
            setRegionSeleccionada(data.viviendaFamiliar.region || '');
            setDistritoSeleccionado(data.viviendaFamiliar.distrito || '');

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
                distrito: data.domicilio.distrito || '',
                region: data.domicilio.region || '',
                cp: data.domicilio.cp || ''
            });

            // Establecer región y distrito seleccionados
            if (data.viviendaFamiliar?.region) {
                setRegionSeleccionada(data.viviendaFamiliar.region);
            }
            if (data.viviendaFamiliar?.distrito) {
                setDistritoSeleccionado(data.viviendaFamiliar.distrito);
            }

            // Por defecto, si ya tiene domicilio registrado, asumir que no coincide con el del alumno
            // a menos que sea exactamente el mismo ID
            if (data.domicilio.id === datosAlumno?.misDatos?.domicilio?.id) {
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
            setDatosAlumno(datos);

            // Verificar si ya tiene datos de Mi Familia
            if (datos.miFamilia) {
                console.log("Datos de mi familia existentes: ", datos.miFamilia);
                setDatosMiFamiliaAlumno(datos.miFamilia);
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
        };
        cargarDatos();
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
    };

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
                confirmButton.style.backgroundColor = 'var(--color-verde)';
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

        setDataMiFamilia((prevState) => ({
            ...prevState,
            [name]: type === "number" ? (value === "" ? null : parseInt(value)) : value,
        }));
    };



    // ********************  SE ENVIAN LOS DATOS DEL FORMULARIO PARA SER GUARDADOS  ************************

    const handleSubmit = async () => {
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
            // Verificar si es actualización o creación
            if (datosAlumno.miFamilia !== null) {
                console.log(datosAlumno);
                // Actualizar datos existentes
                const idMiFamilia = datosAlumno.miFamilia.id;
                response = await MiFamiliaService.update(idMiFamilia, payloadCompleto);
                console.log('Datos actualizados:', response);
                mostrarExito('Datos actualizados correctamente');
            } else {
                // Crear nuevos datos
                response = await MiFamiliaService.create(payloadCompleto);
                console.log('Datos creados:', response);
                mostrarExito('Datos guardados correctamente');
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            mostrarError('Ocurrió un error al guardar la información');
        }
    };


    // ******************************************************************************************************
    return (
        <div className='px-1'>
            <div className='d-flex flex-column min-vh-100 mt-3 mb-4 ms-4 me-4 px-5'>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <div className='tarjeta-border p-4 mb-2'>
                        <div className='row'>
                            <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>
                            <div className='mt-2'>
                                <div className='d-flex justify-content-start align-items-center'>
                                    <label className='fs-5 me-5' style={{ color: 'var(--color-morado3)' }}>
                                        ¿El domicilio de tu familia coincide con el que te encuentras actualmente?
                                    </label>
                                    <RadioSelect
                                        gris={true}
                                        options={['Si', 'No']}
                                        onChange={handleDomicilioCoincide}
                                        name={"domicilioCoincide"}
                                        value={domicilioCoincide}
                                    />
                                </div>
                                <div className="line mx-auto mt-4 mb-4"></div>
                                <div className='row'>
                                    <div className="col-2 mt-2">
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>C.P.</label>
                                        <input className='form-control' type="text" onChange={actualizarCamposDomicilio} value={dataDomicilio.cp} name={"cp"} disabled={disabled} />
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

                                    <div className="col-3 mt-2">
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Región</label>
                                        <SeleccionarCombo
                                            name="region"
                                            options={regiones.map((region) => ({
                                                value: region.id,
                                                label: region.nombre || region.nombreRegion
                                            }))}
                                            value={regionSeleccionada}
                                            onChange={handleChangeRegion}
                                            placeholder="Selecciona una región"
                                        />
                                        {/* Input para "Otro" en región */}
                                        {regionSeleccionada === OTRO_REGION_ID && (
                                            <div className="mt-2">
                                                <label className='fs-6' style={{ color: 'var(--color-morado3)' }}>
                                                    Especifique otra región:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={otroRegionTexto}
                                                    onChange={handleOtroRegionTexto}
                                                    placeholder="Escriba la región"
                                                    disabled={disabled}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Localidad</label>
                                        <div>
                                            <input className='form-control' type="text" onChange={actualizarCamposDomicilio} value={dataDomicilio.localidad} name='localidad' disabled={disabled} />

                                        </div>
                                    </div>
                                    <div className='col-3 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Distrito</label>
                                        <SeleccionarCombo
                                            name="distrito"
                                            options={distritos.map((distrito) => ({
                                                value: distrito.id,
                                                label: distrito.nombre || distrito.nombreDistrito
                                            }))}
                                            value={distritoSeleccionado}
                                            onChange={handleChangeDistrito}
                                            placeholder="Selecciona un distrito"
                                        />
                                        {/* Input para "Otro" en distrito */}
                                        {distritoSeleccionado === OTRO_DISTRITO_ID && (
                                            <div className="mt-2">
                                                <label className='fs-6' style={{ color: 'var(--color-morado3)' }}>
                                                    Especifique otro distrito:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={otroDistritoTexto}
                                                    onChange={handleOtroDistritoTexto}
                                                    placeholder="Escriba el distrito"
                                                    disabled={disabled}
                                                />
                                            </div>
                                        )}
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
                                                disabled={disabled}
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
                                                            prefix="servicios-"
                                                            opcion={otro.nombreServicio}
                                                            checked={servicioOtroSeleccionado.includes(String(otro.id))}
                                                            onChange={handleCheckServiciosOtro}
                                                        />
                                                    ))}
                                            </div>
                                        ))}
                                        {servicioOtroSeleccionado.includes(String(OTRO_ID)) && (
                                            <div className="col-md-12 mb-2 mt-2">
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
                                                            prefix="medios-"
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
                                <p className="fs-2" style={{ color: "var(--color-morado2)", fontWeight: "bolder" }}>
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
                                                <SeleccionarCombo
                                                    name={`parentesco-${index}`}
                                                    options={parentescos.map((parentesco) => ({
                                                        value: parentesco.id,
                                                        label: parentesco.nombre || parentesco.nombreParentesco
                                                    }))}
                                                    value={dep.parentesco}
                                                    onChange={(e) => handleChangeDependiente(index, 'parentesco', e.target.value)}
                                                    placeholder="Selecciona parentesco"
                                                />
                                            </div>

                                            <div className="col-md-5">
                                                <label>Comprobante (CURP, Acta, etc.):</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                                    accept=".jpg,.jpeg,.png,.pdf"
                                                />
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
