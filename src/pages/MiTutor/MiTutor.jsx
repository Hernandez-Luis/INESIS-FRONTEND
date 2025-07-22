import React, { useEffect, useState } from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import RadioSelect from '../../components/RadioSelect/RadioSelect';
import SeleccionarCombo from '../../components/ComboSeleccionar/SeleccionarCombo';
import Swal from 'sweetalert2';
import CatTipoTrabajoService from '../../services/CatTipoTrabajoService';
import CatOcupacionService from '../../services/CatOcupacionService';
import CatParentescoService from '../../services/CatParentescoService';
import MisDatosService from '../../services/MisDatosService';
import DomicilioCpService from '../../services/DomicilioCpService';
import AlumnoService from '../../services/AlumnoService';
import { useNavigate } from 'react-router-dom';
import '../../styles/BordeInputsError/BordeInputsError.css'
import { soloCorreo, soloFormatoDirecciones, soloLetras, soloNumerosPositivos } from '../../utils/Validaciones/Validaciones';

export const MiTutor = ({ onAdd, update }) => {
    const alumnoId = JSON.parse(localStorage.getItem('usuario')).alumnoId;
    const navigate = useNavigate();
    const links = [
        { url: '/menuAlumno', label: 'Inicio' },
        { url: '/menuSolicitar', label: 'Estudio socioeconómico' },
        { url: '/MiTutor', label: 'Mi tutor' }
    ];

    // ********************************** DEFINICION DE VARIABLES  *****************************************
    const [catTipoTrabajo, setCatTipoTrabajo] = useState([]);
    const [catOcupacion, setCatOcupacion] = useState([]);
    const [catParentesco, setCatParentesco] = useState([]);
    const [datosAlumno, setDatosAlumno] = useState([]);
    const [disabled, setDisabled] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false);

    // --------- INFOMRACION DE MI TUTOR DESDE MIS DATOS --------------
    const [nombreTutorMisDatos, setNombreTutor] = useState();
    const [tipoTrabajoMisDatos, setTipoTrabajoMisDatos] = useState();
    const [ocupacionMisDatos, setOcupacionMisDatos] = useState();
    const [ocupacionOtroMisDatos, setOcupacionOtroMisDatos] = useState();


    // **********************************  OBTENER DATOS DE LA BD  *****************************************

    const obtenerCatTipoTrabajo = async () => {
        try {
            let catTipoTrabajo = await CatTipoTrabajoService.getAll();
            setCatTipoTrabajo(catTipoTrabajo)
            // console.log(catTipoTrabajo)
        } catch (error) {
            console.log("Error al obtener la lista de CatTipoTrabajo: ", error)
        }
    }

    const obtenerCatOcupacion = async () => {
        try {
            let ocupaciones = await CatOcupacionService.getAll();
            setCatOcupacion(ocupaciones)
        } catch (error) {
            console.log("Error al obtener la lista de CatTipoTransporte: ", error)
        }
    }

    const obtenerCatParentesco = async () => {
        try {
            let parentescoLista = await CatParentescoService.getAll();
            setCatParentesco(parentescoLista)
        } catch (error) {
            console.log("Error al obtener la lista de CatParentesco: ", error)
        }
    }

    const obtenerDatosPorAlumno = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const alumnoId = usuario?.alumnoId;
            if (!alumnoId) {
                console.error('No se encontró el alumnoId en el localStorage.');
                return;
            }
            let datos = await AlumnoService.getById(alumnoId);
            verificarFechas(datos?.fechaRegistrada) ? setBtnDisabled(false) : setBtnDisabled(true);
            console.log("Datos del alumno: ", datos);
            setDatosAlumno(datos);
            if (datos.miTutor) {
                console.log("Datos de mi tutor: ", datos.miTutor)
                setDatosMiTutorAlumno(datos.miTutor);
            } else {
                obtenerDatosTutorDeMisDatos(datos.misDatos);
            }
        } catch (error) {
            console.log("Error al obtener datos del alumno: ", error);
        }
    };

    const obtenerDatosTutorDeMisDatos = (datos) => {
        console.log("Datos de gastos e ingresos: ", datos);
        let dependeEconomicamente = datos?.gastosIngresos?.dependeEconomicamente;
        if (dependeEconomicamente === true) {
            setDatosMiTutor((prevData) => ({
                ...prevData,
                nombreTutor: datos?.gastosIngresos?.nombreQuienDependes || '',
                trabajoTipo: datos?.gastosIngresos?.catTipoTrabajo?.id || '',
                ocupacion: datos?.gastosIngresos?.ocupacion?.id || '',
                ocupacionOtro: datos?.gastosIngresos?.otro || ''
            }));
        }
    }

    const setDatosMiTutorAlumno = (data) => {
        setDatosMiTutor((prevData) => ({
            ...prevData,
            nombreTutor: data?.nombreTutor || '',
            telefono: data?.telefono || '',
            correo: data?.correo || '',
            parentesco: data?.parentesco?.id || '',
            trabajadorSuneo: data?.trabajadorSuneo,
            comparteVivienda: data?.comparteVivienda,
            trabajoTipo: data?.catTipoTrabajo?.id || '',
            ocupacion: data?.ocupacion?.id || '',
            ocupacionOtro: data?.otro || ''
        }));
        setDatosDomicilio((prevData) => ({
            ...prevData,
            estado: data?.domicilio?.estado || '',
            municipio: data?.domicilio?.municipio || '',
            colonia: data?.domicilio?.colonia || '',
            localidad: data?.domicilio?.localidad || '',
            calle: data?.domicilio?.calle || '',
            numero: data?.domicilio?.numero || '',
            cp: data?.domicilio?.cp || ''
        }));
        if (data?.comparteVivienda === true || data?.comparteVivienda === 'Si') {
            setDisabled(true);
        }
    }

    useEffect(() => {
        obtenerCatTipoTrabajo();
        obtenerCatOcupacion();
        obtenerCatParentesco();
        obtenerDatosPorAlumno();
    }, []);

    const boolToSiNo = (valor) => valor === true ? 'Si' : valor === false ? 'No' : '';
    const siNoToBool = (valor) => valor === 'Si' ? true : valor === 'No' ? false : null;

    const verificarFechas = (fechaData) => {
        if (!fechaData) return false;
        if (!fechaData.active) return false;
        const today = new Date();
        const fechaInicio = new Date(fechaData.fechaInicio);
        const fechaFin = new Date(fechaData.fechaFin);

        today.setHours(0, 0, 0, 0);
        fechaInicio.setHours(0, 0, 0, 0);
        fechaFin.setHours(0, 0, 0, 0);

        return today >= fechaInicio && today <= fechaFin;
    };

    /*     useEffect(() => {
            if (datosAlumno) {
                obtenerDatosTutorDeMisDatos();
            }
        }, [datosAlumno]);
     */
    useEffect(() => {
        setDatosMiTutor(prev => ({
            ...prev,
            nombreTutor: nombreTutorMisDatos || '',
            trabajoTipo: tipoTrabajoMisDatos || '',
            ocupacion: ocupacionMisDatos || '',
            ocupacionOtro: ocupacionOtroMisDatos || ''
        }));
    }, [nombreTutorMisDatos, tipoTrabajoMisDatos, ocupacionMisDatos, ocupacionOtroMisDatos]);



    const formularioInicialMitTutor = {
        nombreTutor: nombreTutorMisDatos ? nombreTutorMisDatos : '',
        telefono: '',
        correo: '',
        trabajadorSuneo: '',
        comparteVivienda: '',
        trabajoTipo: '',
        ocupacion: '',
        parentesco: '',
        ocupacionOtro: null
    }

    const formularioInicialDomicilio = {
        estado: "",
        municipio: "",
        colonia: "",
        localidad: "",
        calle: "",
        numero: "",
        cp: "",
    }

    const [datosMiTutor, setDatosMiTutor] = useState(formularioInicialMitTutor)
    const [datosDomicilio, setDatosDomicilio] = useState(formularioInicialDomicilio)

    const [errores, setErrores] = useState({})

    // *********************************  BUSCAR CP DE LOS DATOS DEL BACK  ***********************************
    useEffect(() => {
        if (datosDomicilio.cp && datosDomicilio.cp.length === 5) {
            handleBuscarCP(datosDomicilio.cp);
        }
    }, [datosDomicilio.cp]);

    // ********************************  OBTENIENDO DATOS DE LA API  ***************************************

    const [colonias, setColonias] = useState([]);

    const handleBuscarCP = async (value) => {
        const codigoPostal = value
        // console.log("Codigo postal: ", codigoPostal)
        // Solo buscar si tiene 5 dígitos
        if (value.length !== 5) return;
        try {
            const datos = await DomicilioCpService.getColoniasPorCP(codigoPostal);
            // console.log("Datos de la API: ", datos)
            setColonias(datos.codigo_postal.colonias);

            setDatosDomicilio((prevData) => ({
                ...prevData,
                estado: datos.codigo_postal.estado ? datos.codigo_postal.estado : '',
                municipio: datos.codigo_postal.municipio ? datos.codigo_postal.municipio : '',
                cp: codigoPostal,
            }))

            // console.log(dataDomicilio)
        } catch (err) {
            console.error('Error al buscar código postal:', err);
            setColonias([]);
        }
    };

    // **********************************  MANEJADORES DE CAMBIOS  *****************************************

    const actualizarCamposMiTutor = (e) => {
        const { name, value } = e.target;
        console.log("Nombre: ", name, " Valor: ", value)

        const camposBooleanos = [
            "trabajadorSuneo",
            "comparteVivienda",
        ];

        if (camposBooleanos.includes(name)) {
            setDatosMiTutor((prevData) => ({
                ...prevData,
                [name]: siNoToBool(value)
            }));

            if (name === "comparteVivienda" && (value === "Si" || value === true)) {
                setDisabled(true)
                console.log("Datos alumno: ", datosAlumno)
                setDatosDomicilio((prevData) => ({
                    ...prevData,
                    cp: datosAlumno?.misDatos?.domicilio?.cp,
                    numero: datosAlumno?.misDatos?.domicilio?.numero,
                    calle: datosAlumno?.misDatos?.domicilio?.calle,
                    localidad: datosAlumno?.misDatos?.domicilio?.localidad,
                    colonia: datosAlumno?.misDatos?.domicilio?.colonia,
                }))
                // console.log("ID domicilio: ", datosAlumno?.domicilio?.idDomicilio)
            } else if (name === "comparteVivienda" && (value === "No" || value === false)) {
                setDisabled(false)
                setDatosDomicilio(formularioInicialDomicilio)
            }
            return;
        }

        if (name == 'ocupacion') {
            setDatosMiTutor((prevData) => ({
                ...prevData,
                ocupacion: value,
                ocupacionOtro: ''
            }))
        } else {
            setDatosMiTutor((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }
    }

    const actualizarCamposDomicilio = (e) => {
        const { name, value } = e.target;
        //console.log("Nombre: ", name, " Valor: ", value)
        if (name === "cp")
            handleBuscarCP(value)
        setDatosDomicilio((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    // ********************  SE ENVIAN LOS DATOS DEL FORMULARIO PARA SER GUARDADOS  ************************

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrores({})
        if (validacionCampos() === 0) {
            return
        }


        let datosDomicilioEnviar = {};
        console.log("Datos del domicilio: ", datosAlumno)

        if (datosMiTutor.comparteVivienda === 'Si' || datosMiTutor.comparteVivienda === true) {
            datosDomicilioEnviar = {
                idDomicilio: datosAlumno?.misDatos?.domicilio?.id
            };
        } else datosDomicilioEnviar = datosDomicilio;

        const coleccionValores = {
            alumnoId: alumnoId,
            ...datosMiTutor,
            datosDomicilio: datosDomicilioEnviar
        }
        console.log("VALORES MI TUTOR: ", coleccionValores)

        try {
            let nuevosErrores = null;
            let mensaje = "";
            if (datosAlumno.miTutor !== null) {
                let idMiTutor = datosAlumno.miTutor.idTutor;
                mensaje = "Los datos se actualizaron correctamente";
                nuevosErrores = await update(idMiTutor, coleccionValores);
            } else {
                mensaje = "Los datos se guardaron correctamente";
                nuevosErrores = await onAdd(coleccionValores);
            }


            if (nuevosErrores && nuevosErrores.length > 0) {
                if (nuevosErrores[0] && nuevosErrores[0].includes("periodo de registro")) {
                    mostrarInformacion(nuevosErrores[0]);
                } else {
                    mostrarError(nuevosErrores);
                }
                return;
            }
            mostrarExito(mensaje);
        } catch (error) {
            console.error("Error al guardar miTutor: ", error);
        }
    };

    // ***********************************  VALIDACION DE CAMPOS  ******************************************

    const validacionCampos = () => {
        const erroresTemp = {};
        const camposOpcionalesDomicilio = ["colonia", "estado", "municipio"]
        const camposOpcionalesMiTutor = ["ocupacionOtro"]
        Object.keys(datosMiTutor).forEach((campo) => {
            if (!camposOpcionalesMiTutor.includes(campo)) {
                if (datosMiTutor[campo] === null || datosMiTutor[campo] === undefined || datosMiTutor[campo] === '') {
                    erroresTemp[campo] = 'Este campo es obligatorio';
                }
            }
        });

        Object.keys(datosDomicilio).forEach((campo) => {
            if (!camposOpcionalesDomicilio.includes(campo)) {
                if (datosDomicilio[campo] === null || datosDomicilio[campo] === undefined || datosDomicilio[campo] === '') {
                    erroresTemp[campo] = 'Este campo es obligatorio';
                }
            }
        });

        if (Object.keys(erroresTemp).length > 0) {
            setErrores(erroresTemp);
            console.log("FALTA: ", erroresTemp)
            mostrarCuidado("Tienes que llenar todos los campos requeridos")
            return 0; // No enviar el formulario si hay errores
        }

        return 1;
    }

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


    return (
        <div>
            <NavInesis></NavInesis>
            <MigasRecorrido items={links}></MigasRecorrido>
            <div className='d-flex flex-column min-vh-100'>
                <div className='flex-grow-1 px-5 m-lg-5 ' >
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <p className='fs-3 d-flex justify-content-start' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>MI TUTOR</p>
                            <p style={{ color: 'var(--color-gris1)' }}>Datos del padre, madre o tutor o familiar más cercano (preferiblemente, del que se depende económicamente)</p>
                            {/* DATOS PERSONALES */}
                            <p>Los <span style={{ color: 'red' }}>*</span> significan que el campo es obligatorio.</p>
                            <div className="col-xs-12 col-lg-6">
                                <div className="tarjeta-border h-100 w-100 p-4 p-lg-5 mb-4">
                                    <p className='fs-3' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Datos personales</p>
                                    {/* Nombre completo */}
                                    <label className='fs-5 mt-2' style={{ color: 'var(--color-morado2)' }} htmlFor="">Nombre completo <span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        onBeforeInput={soloLetras}
                                        className={`form-control ${errores.nombreTutor ? 'input-error' : ''}`}
                                        type="text"
                                        value={datosMiTutor.nombreTutor}
                                        onChange={actualizarCamposMiTutor}
                                        name='nombreTutor'
                                    />
                                    {errores.nombreTutor && <div className='text-danger'>{errores.nombreTutor}</div>}

                                    {/* Parentesco */}
                                    <div className='w-100 w-lg-50 mt-3'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado2)' }} htmlFor="">Parentesco <span style={{ color: 'red' }}>*</span></label>
                                        <SeleccionarCombo
                                            name="parentesco"
                                            options={catParentesco.map(parentesco => ({
                                                label: parentesco.nombreParentesco,
                                                value: parentesco.id
                                            }))}
                                            placeholder="Selecciona una opción"
                                            value={datosMiTutor.parentesco}
                                            onChange={actualizarCamposMiTutor}
                                        />
                                        {errores.parentesco && <div className='text-danger'>{errores.parentesco}</div>}
                                    </div>

                                    {/* Línea divisoria */}
                                    <div className="line mx-auto mt-5 mb-4"></div>

                                    {/* Teléfono y Correo */}
                                    <div className="row mt-3">
                                        <div className="col-12 col-md-6 mb-3">
                                            <label className='fs-5' style={{ color: 'var(--color-morado2)' }} htmlFor="">Teléfono <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                onBeforeInput={soloNumerosPositivos}
                                                maxLength={10}
                                                className={`form-control ${errores.telefono ? 'input-error' : ''}`}
                                                type="text"
                                                onChange={actualizarCamposMiTutor}
                                                name={"telefono"}
                                                value={datosMiTutor.telefono}
                                            />
                                            {errores.telefono && <div className='text-danger'>{errores.telefono}</div>}
                                        </div>

                                        <div className="col-12 col-md-6 mb-3">
                                            <label className='fs-5' style={{ color: 'var(--color-morado2)' }} htmlFor="">Correo <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                onBeforeInput={soloCorreo}
                                                className={`form-control ${errores.correo ? 'input-error' : ''}`}
                                                type="mail"
                                                onChange={actualizarCamposMiTutor}
                                                name={"correo"}
                                                value={datosMiTutor.correo}
                                            />
                                            {errores.correo && <div className='text-danger'>{errores.correo}</div>}
                                        </div>
                                    </div>

                                    {/* ¿Es trabajador de la UNSIJ o SUNEO? */}
                                    <label className='fs-5 mt-4 mb-3' style={{ color: 'var(--color-morado2)' }} htmlFor="">¿Es trabajador de la UNSIJ o SUNEO? <span style={{ color: 'red' }}>*</span></label>
                                    <RadioSelect
                                        gris={true}
                                        options={['Si', 'No']}
                                        onChange={actualizarCamposMiTutor}
                                        name={"trabajadorSuneo"}
                                        value={boolToSiNo(datosMiTutor.trabajadorSuneo)}
                                    />
                                    {errores.trabajadorSuneo && <div className='text-danger'>{errores.trabajadorSuneo}</div>}

                                    {/* Trabajo de quien dependes */}
                                    <div className="row mt-4">
                                        <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>El trabajo de quien dependes es: <span style={{ color: 'red' }}>*</span></p>
                                        <RadioSelect
                                            gris={true}
                                            options={catTipoTrabajo.map(t => ({
                                                label: t.nombreTipo,
                                                value: t.id
                                            }))}
                                            onChange={actualizarCamposMiTutor}
                                            name="trabajoTipo"
                                            value={datosMiTutor.trabajoTipo}
                                        />
                                        {errores.trabajoTipo && <div className="text-danger">{errores.trabajoTipo}</div>}
                                    </div>

                                    {/* Ocupación y otro */}
                                    <div className='row mt-4'>
                                        <div className="col-12 col-md-6 mb-3">
                                            <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica su ocupación: <span style={{ color: 'red' }}>*</span></p>
                                            <SeleccionarCombo
                                                name="ocupacion"
                                                options={catOcupacion.map(ocupacion => ({
                                                    label: ocupacion.nombreOcupacion,
                                                    value: ocupacion.id
                                                }))}
                                                placeholder="Selecciona una opción"
                                                value={datosMiTutor.ocupacion}
                                                onChange={actualizarCamposMiTutor}
                                            />
                                            {errores.ocupacion && <div className="text-danger">{errores.ocupacion}</div>}
                                        </div>

                                        <div className="col-12 col-md-6">
                                            {datosMiTutor?.ocupacion == 8 && (
                                                <div className="mb-3">
                                                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Otro: <span style={{ color: 'red' }}>*</span></p>
                                                    <input
                                                        onBeforeInput={soloLetras}
                                                        className='form-control'
                                                        name='ocupacionOtro'
                                                        type="text"
                                                        onChange={actualizarCamposMiTutor}
                                                        value={datosMiTutor.ocupacionOtro}
                                                    />
                                                    {errores.otro && <div className="text-danger">{errores.otro}</div>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FIN DATOS PERSONALES */}

                            {/* DOMICILIO */}
                            <div className="col-12 col-lg-6">
                                <div className="tarjeta-border h-100 p-5">
                                    <label className='fs-3' style={{ color: 'var(--color-morado1)', fontWeight: 'bold' }} htmlFor="">Domicilio</label>
                                    <p style={{ color: 'var(--color-gris1)' }}>Indica la dirección de la persona de quien se depende económicamente, si éste es el caso, o de lo contrario, a la persona que se pueda localizar para aclaraciones.</p>
                                    <label className='mb-3' style={{ color: 'var(--color-morado2)' }} htmlFor="">¿El domicilio de tu tutor coincide con el que te encuentras actualmente? <span style={{ color: 'red' }}>*</span></label>
                                    <RadioSelect
                                        gris={true}
                                        options={['Si', 'No']}
                                        onChange={actualizarCamposMiTutor}
                                        name={"comparteVivienda"}
                                        value={boolToSiNo(datosMiTutor.comparteVivienda)}
                                    />
                                    {errores.comparteVivienda && <div className='text-danger'>{errores.comparteVivienda}</div>}
                                    <div className="line mx-auto mt-5 mb-4"></div>
                                    <div className='row'>
                                        <div className="col-lg-4 mt-2">
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>C.P. <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                onBeforeInput={soloNumerosPositivos}
                                                disabled={disabled}
                                                maxLength={5}
                                                className={`form-control ${errores.cp ? 'input-error' : ''}`}
                                                type="text"
                                                onChange={actualizarCamposDomicilio}
                                                value={datosDomicilio.cp}
                                                name={"cp"}
                                            />
                                            {errores.cp && <div className='text-danger'>{errores.cp}</div>}

                                        </div>
                                        <div className='col-lg-4 mt-2'>
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Estado</label>
                                            <div>
                                                <input
                                                    className='form-control'
                                                    type="text"
                                                    onChange={actualizarCamposDomicilio}
                                                    value={datosDomicilio.estado}
                                                    name='estado'
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-4 mt-2'>
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Municipio</label>
                                            <div>
                                                <input
                                                    className='form-control'
                                                    type="text"
                                                    value={datosDomicilio.municipio}
                                                    name='municipio'
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mt-2'>
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Calle <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                onBeforeInput={soloFormatoDirecciones}
                                                disabled={disabled}
                                                className={`form-control ${errores.calle ? 'input-error' : ''}`}
                                                type="text"
                                                name={"calle"}
                                                value={datosDomicilio.calle}
                                                onChange={actualizarCamposDomicilio}
                                            />
                                            {errores.calle && <div className='text-danger'>{errores.calle}</div>}
                                        </div>
                                        <div className="col-lg-6 mt-2">
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Numero <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                onBeforeInput={soloFormatoDirecciones}
                                                disabled={disabled}
                                                className={`form-control ${errores.numero ? 'input-error' : ''}`}
                                                type="text"
                                                name={"numero"}
                                                value={datosDomicilio.numero}
                                                onChange={actualizarCamposDomicilio}
                                            />
                                            {errores.numero && <div className='text-danger'>{errores.numero}</div>}
                                        </div>
                                        <div className='col-lg-6 mt-2'>
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Colonia</label>
                                            <div>
                                                <SeleccionarCombo
                                                    options={colonias.map(c => ({
                                                        label: c,
                                                        value: c
                                                    }))}
                                                    name={"colonia"}
                                                    value={datosDomicilio.colonia}
                                                    onChange={actualizarCamposDomicilio}
                                                    placeholder="Selecciona una opción" // Placeholder
                                                    disabled={disabled}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mt-2'>
                                            <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Localidad <span style={{ color: 'red' }}>*</span></label>
                                            <div>
                                                <input
                                                    onBeforeInput={soloLetras}
                                                    disabled={disabled}
                                                    className={`form-control ${errores.localidad ? 'input-error' : ''}`}
                                                    type="text"
                                                    onChange={actualizarCamposDomicilio}
                                                    value={datosDomicilio.localidad}
                                                    name='localidad'
                                                />
                                                {errores.localidad && <div className='text-danger'>{errores.localidad}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* FIN DOMICILIO */}
                        </div>
                        <div className='d-flex justify-content-center mb-3 mt-5'>
                            <button className='btn btn-midDatos' disabled={btnDisabled}>Guardar</button>
                        </div>
                    </form>
                </div>
                <FooterInesis></FooterInesis>
            </div>
        </div>
    )
}
