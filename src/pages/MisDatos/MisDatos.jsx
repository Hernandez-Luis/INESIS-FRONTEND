import { useEffect, useState } from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'
import "../../styles/TarjetaEstilo/TarjetaEstilo.css"
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import RadioSelect from '../../components/RadioSelect/RadioSelect'
import SeleccionarCombo from '../../components/ComboSeleccionar/SeleccionarCombo'
import { CheckBox } from '../../components/CheckBox/CheckBox'
import '../../styles/MisDatos/MisDatos.css'
import CatMedioTransporteService from '../../services/CatMedioTransporteService'
import CatSexoService from '../../services/CatSexoService'
import AlumnoService from '../../services/AlumnoService'
import Swal from 'sweetalert2'
import CatTipoTransporteService from '../../services/CatTipoTransporteService'
import CatSemestreService from '../../services/CatSemestreService'
import CatEstadoCivilService from '../../services/CatEstadoCivilService'
import DomicilioCpService from '../../services/DomicilioCpService'

export const MisDatos = ({ onAdd }) => {

  const links = [
    { url: '/menuAlumno', label: 'Inicio' },
    { url: '/menuSolicitar', label: 'Estudio socioeconómico' },
    { url: '/MisDatos', label: 'Mis datos' }
  ];


  // *************************** DEFINICION DE VARIABLES  ***************************************
  const [medios, setMedios] = useState([]);
  const [estadoCivil, setEstadoCivil] = useState([]);
  const [recursos, setRecursos] = useState(null);
  const [tieneVehiulo, setTieneVehiulo] = useState(null);
  const [catTipoTransporte, setCatTipoTransporte] = useState([]);
  const [catSemestres, setCatSemestres] = useState([]);
  const [catSexo, setCatSexo] = useState([]);
  const [mediosSeleccionados, setMediosSeleccionados] = useState([])
  const [datosAlumno, setDatosAlumno] = useState({})

  // **************************  OBTENER DATOS DE LA BD  ******************************************

  const localStorageData = JSON.parse(localStorage.getItem('usuario'))

  const obtenerListaMedioTransporte = async () => {
    try {
      let listaMedios = await CatMedioTransporteService.getAll();
      setMedios(listaMedios)
    } catch (error) {
      console.log("Error al obtener la lista de CatMediosTransporte: ", error)
    }
  }

  const obtenerCatTipoTransporte = async () => {
    try {
      let catTipoTransporte = await CatTipoTransporteService.getAll();
      setCatTipoTransporte(catTipoTransporte)
    } catch (error) {
      console.log("Error al obtener la lista de CatTipoTransporte: ", error)
    }
  }

  const obtenerCatSemestres = async () => {
    try {
      let catSemestres = await CatSemestreService.getAll();
      setCatSemestres(catSemestres)
    } catch (error) {
      console.log("Error al obtener la lista de CatSemestres: ", error)
    }
  }

  const obtenerCatSexo = async () => {
    try {
      let catSexo = await CatSexoService.getAll();
      setCatSexo(catSexo)
    } catch (error) {
      console.log("Error al obtener la lista de CatTipoTransporte: ", error)
    }
  }

  const obtenerCatEstadoCivil = async () => {
    try {
      let catEstadoCivil = await CatEstadoCivilService.getAll();
      setEstadoCivil(catEstadoCivil)
    } catch (error) {
      console.log("Error al obtener la lista de CatEstadoCivil: ", error)
    }
  }

  const obtenerDatosAlumno = async () => {
    try {
      const idAlumno = localStorageData.alumnoId;
      let dataAlumno = await AlumnoService.getById(idAlumno);
      setDatosAlumno(dataAlumno)
      setDataMisDatos((prevData) => ({
        ...prevData,
        nombreCompleto: dataAlumno.nombre + " " + dataAlumno.apellido,
        carrera: dataAlumno.carrera?.id,
        semestre: dataAlumno.semestre?.id,
        sexo: dataAlumno.sexo?.id,
      }))
    } catch (error) {
      console.log("Error al obtener datos del alumno: ", error)
    }
  }

  useEffect(() => {
    obtenerDatosAlumno();
    obtenerListaMedioTransporte();
    obtenerCatTipoTransporte();
    obtenerCatSemestres();
    obtenerCatSexo();
    obtenerCatEstadoCivil();

  }, []);

  // *********************************  INICIALIZANDO FORMULARIOS  ***********************************

  const formularioInicialGastosIngresos = {
    gastoMensual: "",
    dependeEconomicamente: "",
    nombreQuienDependes: "",
    solicitaBecaAlimenticia: "",
    trabajoTipo: "",
    ocupacion: "",
    otro: "",
  }

  const formularioInicialTrabajo = {
    nombreTrabajo: "",
    ingresoMensual: "",
    telefonoTrabajo: "",
    domicilioTrabajo: ""
  }

  const formularioInicialTransporte = {
    marca: '',
    modelo: '',
    anio: '',
    catTipoTransporte: ''
  }

  const formularioInicialMisDatos = {
    nombreCompleto: datosAlumno.nombre + " " + datosAlumno.apellido,
    carrera: "",
    semestre: "",
    sexo: "",
    estadoCivil: "",
    recursosSuficientes: "",
    familiarComunero: "",
    utilizaCelular: "",
    tieneComputadora: "",
    idioma: "",
    transporte: "",
    mediosTraslado: "",
    situacionVivienda: "",
    nombreCasaHuesped: "",
    llevaVehiculo: '',
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

  const [dataGastosIngresos, setDataGastosIngresos] = useState(formularioInicialGastosIngresos)
  const [dataTrabajo, setDataTrabajo] = useState(formularioInicialTrabajo)
  const [dataTransporte, setDataTransporte] = useState(formularioInicialTransporte)
  const [dataMisDatos, setDataMisDatos] = useState(formularioInicialMisDatos)
  const [dataDomicilio, setDataDomicilio] = useState(formularioInicialDomicilio)

  const [errores, setErrores] = useState({})

  
  // ***************************  OBTENIENDO DATOS DE LA API  ********************************

  const [colonias, setColonias] = useState([]);

  const handleBuscarCP = async (e) => {
    const codigoPostal = e.target.value;
    console.log("Codigo postal: ", codigoPostal)
    // Solo buscar si tiene 5 dígitos
    if (codigoPostal.length === 5) {
      try {
        const datos = await DomicilioCpService.getColoniasPorCP(codigoPostal);
        console.log("Datos de la API: ", datos)
        setColonias(datos.codigo_postal.colonias);

        setDataDomicilio((prevData) => ({
          ...prevData,
          estado: datos.codigo_postal.estado ? datos.codigo_postal.estado : '',
          municipio: datos.codigo_postal.municipio ? datos.codigo_postal.municipio : '',
          cp: 99999,
        }))

        console.log(dataDomicilio)
      } catch (err) {
        console.error('Error al buscar código postal:', err);
        setColonias([]);
      }
    }
  };

  // ************************  MANEJADORES DE CAMBIOS  ****************************
  const actualizarCampoGastosIngresos = (e) => {
    const { name, value } = e.target;
    // console.log("Name: ", name, " Value: ", value)   
    // ******  CONDICIONES *******

    if (name === "dependeEconomicamente") {
      setRecursos(value)
      setDataGastosIngresos((prevData) => ({
        ...prevData,
        nombreQuienDependes: "",
        trabajoTipo: "",
        ocupacion: "",
        otro: "",
      }))
      setDataTrabajo(formularioInicialTrabajo)
    }

    if (name === "ocupacion" && value !== "Otro") {
      setDataGastosIngresos((prevData) => ({
        ...prevData,
        ocupacion: value,
        otro: '', // limpia el campo 'otro'
      }));
    } else {
      // Actualiza normalmente cualquier otro campo
      setDataGastosIngresos((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const actualizarCamposTrabajo = (e) => {
    const { name, value } = e.target;
    // console.log("Nombre: ", name, " Valor: ", value)
    setDataTrabajo((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const actualizarCamposTransporte = (e) => {
    const { name, value } = e.target;
    //console.log("Nombre: ", name, " Valor: ", value)
    setDataTransporte((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const actualizarCamposMisDatos = (e) => {
    const { name, value } = e.target;
    //console.log("Nombre: ", name, " Valor: ", value)

    if (name === "llevaVehiculo") {
      setTieneVehiulo(value)
      setDataTransporte(formularioInicialTransporte)
    }

    setDataMisDatos((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const actualizarMediosTraslado = (e) => {
    const { value, checked} = e.target;
    const id = parseInt(value, 10);
    if (checked) {
      setMediosSeleccionados((prev) => [...prev, id]);
    } else {
      setMediosSeleccionados((prev) => prev.filter((medioId) => medioId !== id));
    }
  };

  const actualizarCamposDomicilio = (e) => {
    const { name, value } = e.target;
    //console.log("Nombre: ", name, " Valor: ", value)
    handleBuscarCP(e)
    setDataDomicilio((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }


  // ******************************  SE ENVIAN LOS DATOS DEL FORMULARIO PARA SER GUARDADOS  ************************************
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validacionCamposGastosIngresos() === 0) {
      return
    }

    const nuevosMedios = mediosSeleccionados.map(id => ({
      catMediosTransporte: { id }
    }));

    const coleccionValores = {
      alumnoId: JSON.parse(localStorage.getItem('usuario')).alumnoId,
      ...dataMisDatos,
      transporte: dataTransporte,
      gastosIngresos: {
        ...dataGastosIngresos,
        trabajo: dataTrabajo
      },
      mediosTraslado: nuevosMedios,
      domicilio: dataDomicilio
    };

    console.log("Mostrando coleccion: ", coleccionValores)


    try {
      const nuevosErrores = await onAdd(coleccionValores);
      console.log("Error: ", nuevosErrores)
      if (nuevosErrores && nuevosErrores.length > 0) {
        mostrarError(nuevosErrores)
        return;
      }
      // setDataGastosIngresos(formularioInicialGastosIngresos);
      // setDataTrabajo(formularioInicialTrabajo)
      mostrarExito("Los datos se guardaron correctamente")
    } catch (error) {
      console.error("Error al guardar los datos: ", error);
    }
  };

  // ***************************  VALIDACION DE CAMPOS  *****************************

  const validacionCamposGastosIngresos = () => {
    // Validación de los campos
    const erroresTemp = {};
    Object.keys(dataGastosIngresos).forEach((campo) => {
      if (!dataGastosIngresos[campo] && campo !== "nombreQuienDependes" && campo !== "trabajoTipo" && campo !== "ocupacion" && campo !== "otro") {
        erroresTemp[campo] = 'Este campo es obligatorio';
      }
    });
    //console.log("Validacion: ", erroresTemp)
    if (Object.keys(erroresTemp).length > 0) {
      setErrores(erroresTemp);
      return 0; // No enviar el formulario si hay errores
    }

    return 1;
  }

  // **************************  FUNCIONES PARA MOSTRAR MENSAJES AL USUARIO  *******************
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
        <div className='flex-grow-1 mt-5 mx-5 px-5'>
          <form onSubmit={handleSubmit}>
            <div className='row mx-5 mt-4  mw-100'>
              {/* INICIO MODULO INFORMACION GENERAL */}
              <div className='col tarjeta-border px-5 d-flex justify-content-start me-3' style={{ background: 'var(--color-morado2)', color: 'white' }}>
                <div className='row'>
                  <p className='fs-2' style={{ color: 'white', fontWeight: 'bolder' }}>Información general</p>
                  <div className='d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Nombre:</label>
                    <label>{dataMisDatos.nombreCompleto}</label>
                  </div>
                  <div className='mt-4 d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Carrera:</label>
                    <label>{datosAlumno.carrera?.nombreCarrera || ''}</label>
                  </div>
                  <div className='mt-4 d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Semestre:</label>
                    <div>
                      <SeleccionarCombo
                        name="semestre"
                        options={catSemestres.map(s => ({
                          label: s.nombreSemestre,
                          value: s.id
                        }))}
                        placeholder="Selecciona una opción"
                        value={datosAlumno.semestre?.id || ''}
                        onChange={actualizarCamposMisDatos}
                      />
                    </div>
                  </div>
                  <div className='mt-4 d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Sexo:</label>
                    <div>
                      <RadioSelect
                        options={catSexo.map(s => ({ label: s.nombreSexo, value: s.id }))}
                        name="sexo"
                        onChange={actualizarCamposMisDatos}
                        value={datosAlumno.sexo?.id || ''}  // <-- asegura que sea string
                      />
                    </div>
                  </div>
                  <div className='mt-4 d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Estado civil:</label>
                    <RadioSelect
                      options={estadoCivil.map(s => ({ label: s.nombreEstadoCivil, value: s.id }))}
                      name="estadoCivil"
                      onChange={actualizarCamposMisDatos}
                      value={dataMisDatos.estadoCivil}
                    />
                  </div>

                  <div className='mt-4'>
                    <label className='fs-5' style={{ fontWeight: 'bold' }}>¿Tienes los recursos económicos necesarios para tus actividades académicas?</label>
                    <RadioSelect
                      gris={false}
                      options={['Si', 'No']}
                      onChange={actualizarCamposMisDatos}
                      name="recursosSuficientes"
                      value={dataMisDatos.recursosSuficientes}
                    />
                  </div>
                </div>
              </div>
              {/* FIN MODULO INFORMACION GENERAl */}

              {/* INICIO MODULO DOMICILIO */}
              <div className='col tarjeta-border d-flex justify-content-start ms-3 px-5'>

                <div className='row'>
                  <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>
                  <div className='mt-2'>
                    <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Marque la opción que mejor describa tu situación de vivienda:</label>
                    <RadioSelect
                      gris={true}
                      options={['Rento cuarto', 'Rento casa', 'Vivo con familiares']}
                      name={"situacionVivienda"}
                      value={dataMisDatos.situacionVivienda}
                      onChange={actualizarCamposMisDatos}
                    />
                  </div>
                  <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica tu dirección actual:</label>
                  <div className='row'>
                    <div className='col-6 mt-2'>
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
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Localidad</label>
                      <div>
                        <input className='form-control' type="text" onChange={actualizarCamposDomicilio} value={dataDomicilio.localidad} name='localidad' />

                      </div>
                    </div>
                    <div className='col-6 mt-2'>
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
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Calle</label>
                      <input className='form-control' type="text" name={"calle"} value={dataDomicilio.calle} onChange={actualizarCamposDomicilio} />
                    </div>
                    <div className="col-3 mt-2">
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Numero</label>
                      <input className='form-control' type="text" name={"numero"} value={dataDomicilio.numero} onChange={actualizarCamposDomicilio} />
                    </div>
                    <div className="col-3 mt-2">
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>C.P.</label>
                      <input className='form-control' type="text" onChange={actualizarCamposDomicilio} value={dataDomicilio.cp} name={"cp"} />
                    </div>
                    <div className="col-12">
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre de la casa de huéspedes o propietario</label>
                      <input className='form-control' type="text" value={dataMisDatos.nombreCasaHuesped} name={"nombreCasaHuesped"} onChange={actualizarCamposMisDatos} />
                    </div>
                  </div>
                </div>
              </div>
              {/* FIN MODULO DOMICILIO */}
            </div>

            {/* MODULO GASTOS E INGRESOS  */}
            <div className='row mx-5 mt-4'>
              <div className='tarjeta-border p-5'>
                <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Gatos e ingresos</p>
                <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>¿A cuánto hacienden tus gastos mensuales de manutención?</p>
                <div className="row">
                  <div className="col">
                    <p style={{ color: 'var(--color-gris1)' }}>Lo que pagas de alimentación, transporte, vivienda, servicios médicos, libros y materiales escolares, entretenimiento, etc. (Por favor no incluyas los gastos en colegiatura e inscripciones de la universidad)</p>
                    <input className='form-control w-25' type="number" name="gastoMensual" onChange={actualizarCampoGastosIngresos} value={dataGastosIngresos.gastoMensual} />
                    {errores.gastoMensual && <div className="text-danger">{errores.gastoMensual}</div>}

                  </div>
                  <div className='col d-flex flex-column align-items-center text-center'>
                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>
                      ¿Dependes económicamente?
                    </p>
                    <RadioSelect
                      gris={true}
                      options={['Si', 'No']}
                      onChange={actualizarCampoGastosIngresos}
                      name="dependeEconomicamente"
                      value={dataGastosIngresos.dependeEconomicamente}
                    />
                    {errores.dependeEconomicamente && <div className="text-danger">{errores.dependeEconomicamente}</div>}
                  </div>
                </div>

                {recursos === 'Si' && (
                  <div className="row mt-3">
                    <div class="line mx-auto mt-5 mb-4"></div>
                    <div className="col-12">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre de la persona de la cuál dependes económicamente:</p>
                      <input className='form-control w-25' type="text" name='nombreQuienDependes' onChange={actualizarCampoGastosIngresos} value={dataGastosIngresos.nombreQuienDependes} />
                      {errores.nombreQuienDependes && <div className="text-danger">{errores.nombreQuienDependes}</div>}
                    </div>
                    <div className="col-3">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>El trabajo de quien dependes es:</p>
                      <RadioSelect
                        gris={true}
                        options={['Temporal', 'Permanente']}
                        onChange={actualizarCampoGastosIngresos}
                        name="trabajoTipo"
                        value={dataGastosIngresos.trabajoTipo}
                      />
                      {errores.trabajoTipo && <div className="text-danger">{errores.trabajoTipo}</div>}
                    </div>
                    <div className="col-3">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica su ocupación:</p>
                      <SeleccionarCombo
                        name="ocupacion"
                        options={['Jornalero', 'Chambeador', 'Otro']} // Opciones disponibles
                        placeholder="Selecciona una opción" // Placeholder
                        value={dataGastosIngresos.ocupacion}
                        onChange={actualizarCampoGastosIngresos}
                      />
                      {errores.ocupacion && <div className="text-danger">{errores.ocupacion}</div>}
                    </div>
                    {dataGastosIngresos.ocupacion === "Otro" && (
                      <div className="col-5">
                        <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Otro:</p>
                        <input
                          className='form-control w-50'
                          name='otro'
                          type="text"
                          onChange={actualizarCampoGastosIngresos}
                          value={dataGastosIngresos.otro}
                        />
                        {errores.otro && <div className="text-danger">{errores.otro}</div>}

                      </div>
                    )}

                    <div class="line mx-auto mt-5 mb-4"></div>
                  </div>
                )}

                {recursos === 'No' && (
                  <div className="row mt-3">
                    <div class="line mx-auto mt-5 mb-4"></div>
                    <div className="col-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre del lugar donde trabajas</p>
                      <input
                        className='form-control w-50'
                        type="text"
                        name='nombreTrabajo'
                        value={dataTrabajo.nombreTrabajo}
                        onChange={actualizarCamposTrabajo}
                      />
                    </div>
                    <div className="col-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Menciona el ingreso mensual que recibes</p>
                      <input
                        className='form-control w-50'
                        type="text"
                        name='ingresoMensual'
                        onChange={actualizarCamposTrabajo}
                        value={dataTrabajo.ingresoMensual} />
                    </div>
                    <div className="col-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Telefono celular del lugar donde trabajas</p>
                      <input
                        className='form-control w-50'
                        type="text"
                        value={dataTrabajo.telefonoTrabajo}
                        onChange={actualizarCamposTrabajo}
                        name='telefonoTrabajo'
                      />
                    </div>
                    <div className="col-12">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Ingresa el domicilio de donde trabajas</p>
                      <input
                        className='form-control w-50'
                        type="text"
                        value={dataTrabajo.domicilioTrabajo}
                        onChange={actualizarCamposTrabajo}
                        name='domicilioTrabajo'
                      />
                    </div>
                    <div class="line mx-auto mt-5 mb-4"></div>
                  </div>
                )}
                <div className="row">
                  <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>¿Solicitas beca alimentaria?</p>
                  <RadioSelect
                    gris={true}
                    name="solicitaBecaAlimenticia"
                    options={['Si', 'No']}
                    onChange={actualizarCampoGastosIngresos}
                    value={dataGastosIngresos.solicitaBecaAlimenticia}
                  />
                  {errores.solicitaBecaAlimenticia && <div className="text-danger">{errores.solicitaBecaAlimenticia}</div>}

                </div>
              </div>
            </div>
            {/* FIN MODULO GASTOS E INGRESOS  */}

            <div className="row mx-5 mt-4 mb-5">
              {/* MODULO TRANSPORTE */}
              <div className="col tarjeta-border me-4 p-5">
                <p className='fs-2 ' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Transporte</p>
                <label className='fs-5 mb-3' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Llevas automóvil o motocicleta cotidianamente a la universidad?</label>
                <RadioSelect
                  gris={true}
                  options={['Si', 'No']}
                  onChange={actualizarCamposMisDatos}
                  name={"llevaVehiculo"}
                  value={dataMisDatos.llevaVehiculo}
                />

                {tieneVehiulo === 'Si' && (
                  <div>
                    <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Selecciona tu tipo de vehículo:</label>
                    <div className='w-50'>
                      <SeleccionarCombo
                        options={catTipoTransporte.map(t => ({
                          label: t.nombreTipo,
                          value: t.idCatTipoTransporte
                        }))}
                        placeholder="Selecciona una opción" // Placeholder
                        name={'catTipoTransporte'}
                        value={dataTransporte.catTipoTransporte}
                        onChange={actualizarCamposTransporte}
                      />
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Marca</label>
                        <input
                          className='form-control w-75'
                          type="text"
                          name={'marca'}
                          value={dataTransporte.marca}
                          onChange={actualizarCamposTransporte}
                        />
                      </div>
                      <div className="col">
                        <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Modelo</label>
                        <input
                          className='form-control w-75'
                          type="text"
                          name={'modelo'}
                          value={dataTransporte.modelo}
                          onChange={actualizarCamposTransporte}
                        />
                      </div>
                      <div className="col">
                        <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Año</label>
                        <input
                          className='form-control w-75'
                          type="text"
                          name={'anio'}
                          value={dataTransporte.anio}
                          onChange={actualizarCamposTransporte}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="row mt-4">
                  <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Qué otros medios utilizas para trasladarte a la universidad?</label>
                  {medios.map((medio) => (
                    <CheckBox
                      key={medio.id}
                      id={medio.id}
                      opcion={medio.nombreMedio}
                      onChange={actualizarMediosTraslado}
                      checked={mediosSeleccionados.includes(medio.id)}
                      //value={dataMisDatos.mediosTraslado}
                      name={"mediosTraslado"}
                    />
                  ))}
                </div>
              </div>
              {/* FIN MODULO TRANSPORTE */}

              {/* INFORMACION COMPLEMENTARIA */}
              <div className="col tarjeta-border p-5">
                <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Información complementaria</p>
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Eres hijo o nieto de comunero de Ixtlán de Juárez?</label>
                <RadioSelect
                  gris={true}
                  options={['Si', 'No']}
                  value={dataMisDatos.familiarComunero}
                  onChange={actualizarCamposMisDatos}
                  name="familiarComunero"
                />
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Utilizas teléfono celular en la universidad?</label>
                <RadioSelect
                  gris={true}
                  options={['Si', 'No']}
                  name={"utilizaCelular"}
                  value={dataMisDatos.utilizaCelular}
                  onChange={actualizarCamposMisDatos}
                />
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Tienes computadora personal y/o portátil?</label>
                <RadioSelect
                  gris={true}
                  options={['Si', 'No']}
                  name={"tieneComputadora"}
                  value={dataMisDatos.tieneComputadora}
                  onChange={actualizarCamposMisDatos}
                />
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Además del idioma español, ¿qué otro idioma, lenguaje o dialecto hablas?</label>
                <input className='form-control w-75' type="text" name='idioma' value={dataMisDatos.idioma} onChange={actualizarCamposMisDatos} />
              </div>
              {/* FIN INFORMACION COMPLEMENTARIA */}
            </div>
            <div className='d-flex justify-content-center mb-5'>
              <button className='btn btn-midDatos'>Guardar</button>
            </div>
          </form>
        </div>
        <FooterInesis></FooterInesis>
      </div>
    </div>
  )
}
