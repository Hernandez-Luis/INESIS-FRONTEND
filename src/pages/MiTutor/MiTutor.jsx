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

export const MiTutor = () => {
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
            let datos = await MisDatosService.getByIdAlumno(alumnoId); // asegúrate de tener definido `id`
            setDatosAlumno(datos);
            // console.log("Datos del alumno: ", datos);
        } catch (error) {
            console.log("Error al obtener datos del alumno: ", error);
        }
    };

    const obtenerDatosTutorDeMisDatos = () => {
        let dependeEconomicamente = datosAlumno?.gastosIngresos?.dependeEconomicamente;
        // console.log('depende: ', dependeEconomicamente)
        if (dependeEconomicamente === 'Si') {
            setNombreTutor(datosAlumno?.gastosIngresos?.nombreQuienDependes);
            setTipoTrabajoMisDatos(datosAlumno?.gastosIngresos?.catTipoTrabajo?.id)
            setOcupacionMisDatos(datosAlumno?.gastosIngresos?.ocupacionModel?.id)
            setOcupacionOtroMisDatos(datosAlumno?.gastosIngresos?.otro)
        }
    }

    useEffect(() => {
        obtenerCatTipoTrabajo();
        obtenerCatOcupacion();
        obtenerCatParentesco();
        obtenerDatosPorAlumno();
    }, []);

    useEffect(() => {
        if (datosAlumno) {
            obtenerDatosTutorDeMisDatos();
        }
    }, [datosAlumno]);

    useEffect(() => {
        setDatosMiTutor(prev => ({
            ...prev,
            nombreTutor: nombreTutorMisDatos || '',
            tipoTrabajo: tipoTrabajoMisDatos || '',
            ocupacion: ocupacionMisDatos || '',
            ocupacionOtro: ocupacionOtroMisDatos || ''
        }));
    }, [nombreTutorMisDatos, tipoTrabajoMisDatos, ocupacionMisDatos, ocupacionOtroMisDatos]);


    // useEffect(() => {
    //     if (nombreTutorMisDatos || tipoTrabajoMisDatos || ocupacionMisDatos || ocupacionOtroMisDatos) {
    //         console.log("📌 Datos del tutor actualizados:");
    //         console.log("Tutor:", nombreTutorMisDatos);
    //         console.log("Tipo de trabajo:", tipoTrabajoMisDatos);
    //         console.log("Ocupación:", ocupacionMisDatos);
    //         console.log("Ocupación otro:", ocupacionOtroMisDatos);
    //     }
    // }, [nombreTutorMisDatos, tipoTrabajoMisDatos, ocupacionMisDatos, ocupacionOtroMisDatos]);

    // *********************************  INICIALIZANDO FORMULARIOS  ***************************************

    const formularioInicialMitTutor = {
        nombreTutor: nombreTutorMisDatos ? nombreTutorMisDatos : '',
        telefono: '',
        correo: '',
        trabajadorSuneo: '',
        comparteVivienda: '',
        tipoTrabajo: '',
        ocupacion: '',
        ocupacionOtro: null
    }

    const [datosMiTutor, setDatosMiTutor] = useState(formularioInicialMitTutor)

    const [errores, setErrores] = useState({})

    // ********************************  OBTENIENDO DATOS DE LA API  ***************************************

    // **********************************  MANEJADORES DE CAMBIOS  *****************************************

    const actualizarCamposMiTutor = (e) => {
        const { name, value } = e.target;
        // console.log("Nombre: ", name, " Valor: ", value)

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

    // ********************  SE ENVIAN LOS DATOS DEL FORMULARIO PARA SER GUARDADOS  ************************

    // ***********************************  VALIDACION DE CAMPOS  ******************************************

    // **************************  FUNCIONES PARA MOSTRAR MENSAJES AL USUARIO  ******************************
    const mostrarAlerta = (config) => {
        Swal.fire({
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
            title: '¡Cuidado!',
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
        });
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
                                <input className='form-control' type="text" value={datosMiTutor.nombreTutor} onChange={actualizarCamposMiTutor} name='nombreTutor' />
                                <div className='w-25'>
                                    <label className='fs-5 mt-3' style={{ color: 'var(--color-morado2)' }} htmlFor="">Parentesco</label>
                                    <SeleccionarCombo
                                        name="parentesco"
                                        options={catParentesco.map(parentesco => ({
                                            label: parentesco.nombreParentesco,
                                            value: parentesco.id
                                        }))} // Opciones disponibles
                                        placeholder="Selecciona una opción" // Placeholder
                                        value={datosMiTutor.parentesco}
                                        onChange={actualizarCamposMiTutor}
                                    />
                                </div>

                                <div className="line mx-auto mt-5 mb-4"></div>
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
                                <div className="row">
                                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>El trabajo de quien dependes es:</p>
                                    <RadioSelect
                                        gris={true}
                                        options={catTipoTrabajo.map(t => ({
                                            label: t.nombreTipo,
                                            value: t.id
                                        }))}
                                        onChange={actualizarCamposMiTutor}
                                        name="tipoTrabajo"
                                        value={datosMiTutor.tipoTrabajo}
                                    />
                                    {errores.trabajoTipo && <div className="text-danger">{errores.trabajoTipo}</div>}
                                </div>
                                <div className='row'>
                                    <div className="col">
                                        <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica su ocupación:</p>
                                        <SeleccionarCombo
                                            name="ocupacion"
                                            options={catOcupacion.map(ocupacion => ({
                                                label: ocupacion.nombreOcupacion,
                                                value: ocupacion.id
                                            }))} // Opciones disponibles
                                            placeholder="Selecciona una opción" // Placeholder
                                            value={datosMiTutor.ocupacion}
                                            onChange={actualizarCamposMiTutor}
                                        />
                                        {errores.ocupacion && <div className="text-danger">{errores.ocupacion}</div>}
                                    </div>
                                    <div className="col">
                                        {datosMiTutor?.ocupacion == 8 && (
                                            <div className="row-5">
                                                <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Otro:</p>
                                                <input
                                                    className='form-control w-50'
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
                                                // onChange={handleSelection} // Función para manejar la selección
                                                placeholder="Selecciona una opción" // Placeholder
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Municipio</label>
                                        <div>
                                            <SeleccionarCombo
                                                options={['Ixtlan', 'Xiacui']} // Opciones disponibles
                                                // onChange={handleSelection} // Función para manejar la selección
                                                placeholder="Selecciona una opción" // Placeholder
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Localidad</label>
                                        <div>
                                            <SeleccionarCombo
                                                options={['Capulalpam', 'Guelatao']} // Opciones disponibles
                                                // onChange={handleSelection} // Función para manejar la selección
                                                placeholder="Selecciona una opción" // Placeholder
                                                disabled={true}
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
