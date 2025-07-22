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
import CatOcupacionService from '../../services/CatOcupacionService'
import CatSituacionVivienda from '../../services/CatSituacionVivienda'
import CatTipoTrabajoService from '../../services/CatTipoTrabajoService'
import { data, useNavigate } from 'react-router-dom'
import '../../styles/BordeInputsError/BordeInputsError.css'
import { soloFormatoDirecciones, soloLetras, soloLetrasYNumeros, soloNumerosPositivos, soloNumerosPositivosConDosDecimales } from '../../utils/Validaciones/Validaciones'

export const MisDatos = ({ onAdd, update }) => {
  const idAlumno = JSON.parse(localStorage.getItem('usuario')).alumnoId;
  const navigate = useNavigate();
  const links = [
    { url: '/menuAlumno', label: 'Inicio' },
    { url: '/menuSolicitar', label: 'Estudio socioeconómico' },
    { url: '/MisDatos', label: 'Mis datos' }
  ];


  // *************************** DEFINICION DE VARIABLES  ***************************************
  const [medios, setMedios] = useState([]);
  const [estadoCivil, setEstadoCivil] = useState([]);
  const [recursos, setRecursos] = useState(null);
  const [tieneAutomovil, setTieneAutomovil] = useState(null);
  const [tieneMotocicleta, setTieneMotocicleta] = useState(null);
  const [catTipoTransporte, setCatTipoTransporte] = useState([]);
  const [catSemestres, setCatSemestres] = useState([]); 
  const [catOcupacion, setCatOcupacion] = useState([]);
  const [catSituacionVivienda, setCatSituacionVivienda] = useState([])
  const [catTipoTrabajo, setCatTipoTrabajo] = useState([]);
  const [catSexo, setCatSexo] = useState([]);
  const [mediosSeleccionados, setMediosSeleccionados] = useState([])
  const [datosAlumno, setDatosAlumno] = useState({})
  const [btnDisabled, setBtnDisabled] = useState(false);

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

  const obtenerDatosAlumno = async () => {
    try {
      let dataAlumno = await AlumnoService.getById(idAlumno);
      setDatosAlumno(dataAlumno)
      setDataMisDatos((prevData) => ({
        ...prevData,
        nombreCompleto: dataAlumno.nombre + " " + dataAlumno.apellidoPaterno + " " + dataAlumno.apellidoMaterno,
        carrera: dataAlumno.carrera?.id,
        semestre: dataAlumno.semestre?.id,
        sexo: dataAlumno.sexo?.id,
        correo: dataAlumno.correo || '',
        telefono: dataAlumno.telefono || '',
      }))
      if (dataAlumno?.misDatos) {
        console.log("Datos del alumno: ", dataAlumno)
        verificarFechas(dataAlumno?.fechaRegistrada) ? setBtnDisabled(false) : setBtnDisabled(true);
        setDataMisDatos((prevData) => ({
          ...prevData,
          estadoCivil: dataAlumno?.misDatos.estadoCivil?.id,
          recursosSuficientes: dataAlumno?.misDatos.recursosSuficientes,
          nombreCasaHuesped: dataAlumno?.misDatos.nombreCasaHuesped || '',
          llevaAutomovil: dataAlumno?.misDatos.llevaAutomovil,
          llevaMotocicleta: dataAlumno?.misDatos.llevamotocicleta,
          familiarComunero: dataAlumno?.misDatos.familiarComunero,
          utilizaCelular: dataAlumno?.misDatos.utilizaCelular,
          tieneComputadora: dataAlumno?.misDatos.tieneComputadora,
          idioma: dataAlumno?.misDatos.idioma || '',
          situacionVivienda: dataAlumno?.misDatos.situacionVivienda.id
        }))
        setDataDomicilio((prevData) => ({
          ...prevData,
          cp: dataAlumno?.misDatos.domicilio?.cp || '',
          localidad: dataAlumno?.misDatos.domicilio?.localidad || '',
          calle: dataAlumno?.misDatos.domicilio?.calle || '',
          numero: dataAlumno?.misDatos.domicilio?.numero || '',
          colonia: dataAlumno?.misDatos.domicilio?.colonia || '',
        }))
        setRecursos(dataAlumno?.misDatos?.gastosIngresos?.dependeEconomicamente)
        setDataGastosIngresos((prevData) => ({
          ...prevData,
          gastoMensual: dataAlumno?.misDatos.gastosIngresos?.gastoMensual || '',
          dependeEconomicamente: dataAlumno?.misDatos.gastosIngresos?.dependeEconomicamente,
          nombreQuienDependes: dataAlumno?.misDatos.gastosIngresos?.nombreQuienDependes || '',
          solicitaBecaAlimenticia: dataAlumno?.misDatos.gastosIngresos?.solicitaBecaAlimenticia,
          trabajoTipo: dataAlumno?.misDatos.gastosIngresos?.catTipoTrabajo?.id || '',
          ocupacion: dataAlumno?.misDatos.gastosIngresos?.ocupacion?.id || '',
        }))
        setDataTrabajo((prevData) => ({
          ...prevData,
          nombreTrabajo: dataAlumno?.misDatos.gastosIngresos?.trabajo?.nombreTrabajo || '',
          ingresoMensual: dataAlumno?.misDatos.gastosIngresos?.trabajo?.ingresoMensual || '',
          telefonoTrabajo: dataAlumno?.misDatos.gastosIngresos?.trabajo?.telefonoTrabajo || '',
          domicilioTrabajo: dataAlumno?.misDatos.gastosIngresos?.trabajo?.domicilioTrabajo || ''
        }))
        setTieneAutomovil(dataAlumno?.misDatos.llevaAutomovil)
        setTieneMotocicleta(dataAlumno?.misDatos.llevamotocicleta);
        setDataTransporteAutomovil((prevData) => ({
          ...prevData,
          marca: dataAlumno?.misDatos.transporteAutomovil?.marca || '',
          modelo: dataAlumno?.misDatos.transporteAutomovil?.modelo || '',
          anio: dataAlumno?.misDatos.transporteAutomovil?.anio || '',
          catTipoTransporte: dataAlumno?.misDatos.transporteAutomovil?.catTipoTransporte?.idCatTipoTransporte || ''
        }))
        //todo:
        setDataTransporteMotocicleta((prevData) => ({
          ...prevData,
          marca: dataAlumno?.misDatos.transporteMotocicleta?.marca || '',
          modelo: dataAlumno?.misDatos.transporteMotocicleta?.modelo || '',
          anio: dataAlumno?.misDatos.transporteMotocicleta?.anio || '',
          catTipoTransporte: dataAlumno?.misDatos.transporteMotocicleta?.catTipoTransporte?.idCatTipoTransporte || ''
        }))
        // Extraer los IDs de los medios seleccionados
        const mediosSeleccionadosIds = dataAlumno?.misDatos?.mediosTraslado?.map(
          (medio) => medio.catMediosTransporte.id
        ) || [];
        setMediosSeleccionados(mediosSeleccionadosIds);
      }
    } catch (error) {
      console.log("Error al obtener datos del alumno: ", error)
    }
  }

  const obtenerCatOcupacion = async () => {
    try {
      let ocupaciones = await CatOcupacionService.getAll();
      setCatOcupacion(ocupaciones)
      // console.log("Ocupacion cat: ", ocupaciones)
    } catch (error) {
      console.log("Error al obtener la lista de CatTipoTransporte: ", error)
    }
  }

  const obtenerCatSituacionVivienda = async () => {
    try {
      let situacionViviendaLista = await CatSituacionVivienda.getAll();
      // console.log("SITUACION VIVENDA: ", situacionViviendaLista)
      let opcionesPermitidas = ['Rento cuarto', 'Rento casa', 'Vivo con familiares'];
      let situacionViviendaFiltrada = situacionViviendaLista.filter(item =>
        opcionesPermitidas.includes(item.nombreSituacion)
      );
      setCatSituacionVivienda(situacionViviendaFiltrada);
    } catch (error) {
      console.log("Error al obtener la lista de SituacionVivienda: ", error)
    }
  }

  const obtenerCatTipoTrabajo = async () => {
    try {
      let tipoTrabajoLista = await CatTipoTrabajoService.getAll();
      // console.log(tipoTrabajoLista)
      setCatTipoTrabajo(tipoTrabajoLista)
    } catch (error) {
      console.log("Error al obtener la lista de SituacionVivienda: ", error)
    }
  }

  useEffect(() => {
    obtenerCatTipoTrabajo();
    obtenerCatSituacionVivienda();
    obtenerDatosAlumno();
    obtenerListaMedioTransporte();
    obtenerCatTipoTransporte();
    obtenerCatSemestres();
    obtenerCatSexo();
    obtenerCatEstadoCivil();
    obtenerCatOcupacion();
  }, []);

  // *********************************  INICIALIZANDO FORMULARIOS  ***********************************

  const formularioInicialGastosIngresos = {
    gastoMensual: "",
    dependeEconomicamente: "",
    personasComparteRenta: "",
    pagoRentaMensual: "",
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

  const formularioInicialTransporteAutomovil = {
    marca: '',
    modelo: '',
    anio: ''
  }

  const formularioInicialTransporteMotocicleta = {
    marca: '',
    modelo: '',
    anio: ''
  }

  const formularioInicialMisDatos = {
    nombreCompleto: "",
    carrera: "",
    semestre: "",
    sexo: "",
    estadoCivil: "",
    recursosSuficientes: "",
    familiarComunero: "",
    utilizaCelular: "",
    tieneComputadora: "",
    idioma: "",
    transporteAutomovil: "",
    transporteMotocicleta: "",
    mediosTraslado: "",
    situacionVivienda: "",
    nombreCasaHuesped: "",
    llevaAutomovil: "",
    llevaMotocicleta: "",
    correo: "",
    telefono: "",
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
  const [dataTransporteAutomovil, setDataTransporteAutomovil] = useState(formularioInicialTransporteAutomovil)
  const [dataTransporteMotocicleta, setDataTransporteMotocicleta] = useState(formularioInicialTransporteMotocicleta)
  const [dataMisDatos, setDataMisDatos] = useState(formularioInicialMisDatos)
  const [dataDomicilio, setDataDomicilio] = useState(formularioInicialDomicilio)

  const [errores, setErrores] = useState({})

  // *********************************  BUSCAR CP DE LOS DATOS DEL BACK  ***********************************
  useEffect(() => {
    if (dataDomicilio.cp && dataDomicilio.cp.length === 5) {
      handleBuscarCP(dataDomicilio.cp);
    }
  }, [dataDomicilio.cp]);

  // ***************************  OBTENIENDO DATOS DE LA API  ********************************

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

      setDataDomicilio((prevData) => ({
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

  // ************************  MANEJADORES DE CAMBIOS  ****************************
  const actualizarCampoGastosIngresos = (e) => {
    const { name, value } = e.target;
    const camposBooleanos = [
      "solicitaBecaAlimenticia",
      "dependeEconomicamente",
    ];

    if (camposBooleanos.includes(name)) {
      setDataGastosIngresos((prevData) => ({
        ...prevData,
        [name]: siNoToBool(value)
      }));
      if (name === "dependeEconomicamente") {
        setRecursos(siNoToBool(value))
        setDataGastosIngresos((prevData) => ({
          ...prevData,
          nombreQuienDependes: "",
          trabajoTipo: "",
          ocupacion: "",
          otro: "",
        }))
        setDataTrabajo(formularioInicialTrabajo)
      }
      return;
    }
    // ******  CONDICIONES *******

    if (name === "ocupacion") {
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

  const actualizarCamposTransporteAutomovil = (e) => {
    const { name, value } = e.target;
    setDataTransporteAutomovil((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const actualizarCamposTransporteMotocicleta = (e) => {
    const { name, value } = e.target;
    // console.log("Nombre: ", name, " Valor: ", value)
    setDataTransporteMotocicleta((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }


  const boolToSiNo = (valor) => valor === true ? 'Si' : valor === false ? 'No' : '';
  const siNoToBool = (valor) => valor === 'Si' ? true : valor === 'No' ? false : null;

  const actualizarCamposMisDatos = (e) => {
    const camposBooleanos = [
      "recursosSuficientes",
      "llevaAutomovil",
      "llevaMotocicleta",
      "familiarComunero",
      "utilizaCelular",
      "tieneComputadora",
    ];
    const { name, value } = e.target;
    console.log("Nombre: ", name, " Valor: ", value)

    if (camposBooleanos.includes(name)) {
      setDataMisDatos((prevData) => ({
        ...prevData,
        [name]: siNoToBool(value)
      }));
      if (name === "llevaAutomovil") {
        setTieneAutomovil(siNoToBool(value));
        setDataTransporteAutomovil(formularioInicialTransporteAutomovil)
      }

      if (name === "llevaMotocicleta") {
        setTieneMotocicleta(siNoToBool(value));
        setDataTransporteMotocicleta(formularioInicialTransporteMotocicleta);
      }
      return;
    }
    setDataMisDatos((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const actualizarMediosTraslado = (e) => {
    const { value, checked } = e.target;
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
    if (name === "cp")
      handleBuscarCP(value)
    setDataDomicilio((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // ******************************  SE ENVIAN LOS DATOS DEL FORMULARIO PARA SER GUARDADOS  ************************************
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores({})
    if (validacionCampos() === 0) {
      return
    }

    const nuevosMedios = mediosSeleccionados.map(id => ({
      catMediosTransporte: { id }
    }));

    const coleccionValores = {
      alumnoId: JSON.parse(localStorage.getItem('usuario')).alumnoId,
      ...dataMisDatos,
      transporteAutomovil: dataTransporteAutomovil,
      transporteMotocicleta: dataTransporteMotocicleta,
      gastosIngresos: {
        ...dataGastosIngresos,
        trabajo: dataTrabajo
      },
      mediosTraslado: nuevosMedios,
      domicilio: dataDomicilio
    };

    try {
      let nuevosErrores = null;
      let mensaje = "";
      if (datosAlumno.misDatos !== null) {
        let idMisDatos = datosAlumno.misDatos.id;
        mensaje = "Los datos se actualizaron correctamente";
        nuevosErrores = await update(idMisDatos, coleccionValores);
      } else {
        mensaje = "Los datos se guardaron correctamente";
        nuevosErrores = await onAdd(coleccionValores);
      }
      if (nuevosErrores && nuevosErrores.length > 0) {
        console.log("Errores: ", nuevosErrores)
        if (nuevosErrores[0] && nuevosErrores[0].includes("periodo de registro") || nuevosErrores.includes("periodo de registro")) {
          mostrarInformacion(nuevosErrores);
        } else {
          mostrarError(nuevosErrores);
        }
        return;
      }
      mostrarExito(mensaje);

    } catch (error) {
      console.error("Error al guardar los datos: ", error);
    }
  };

  // ***************************  VALIDACION DE CAMPOS  *****************************

  const validacionCampos = () => {
    // Validación de los campos
    const erroresTemp = {};
    const camposOpcionalesMisDatos = ["transporteAutomovil", "transporteMotocicleta"]

    // Validación específica para formato de correo
    if (dataMisDatos.correo) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dataMisDatos.correo)) {
        erroresTemp.correo = 'Formato de correo electrónico inválido';
      }
    }

    let camposOpcionalesGastosIngresos = []
    if (dataGastosIngresos?.dependeEconomicamente === true) {
      camposOpcionalesGastosIngresos = ["nombreTrabajo", "ingresoMensual", "telefonoTrabajo", "domicilioTrabajo", "otro"];
    } else if (dataGastosIngresos?.dependeEconomicamente === false) {
      camposOpcionalesGastosIngresos = ["nombreQuienDependes", "trabajoTipo", "ocupacion", "otro"];
    }
    const camposOpcionalesDomicilio = ["estado", "municipio", "colonia"]

    Object.keys(dataGastosIngresos).forEach((campo) => {
      if (!camposOpcionalesGastosIngresos.includes(campo)) {
        if (dataGastosIngresos[campo] === null || dataGastosIngresos[campo] === undefined || dataGastosIngresos[campo] === '') {
          erroresTemp[campo] = 'Este campo es obligatorio';
        }
      }
    });

    Object.keys(dataTrabajo).forEach((campo) => {
      if (!camposOpcionalesGastosIngresos.includes(campo)) {
        if (dataTrabajo[campo] === null || dataTrabajo[campo] === undefined || dataTrabajo[campo] === '') {
          erroresTemp[campo] = 'Este campo es obligatorio';
        }
      }
    })

    Object.keys(dataDomicilio).forEach((campo) => {
      if (!camposOpcionalesDomicilio.includes(campo)) {
        if (dataDomicilio[campo] === null || dataDomicilio[campo] === undefined || dataDomicilio[campo] === '') {
          erroresTemp[campo] = 'Este campo es obligatorio';
        }
      }
    });

    Object.keys(dataMisDatos).forEach((campo) => {
      if (!camposOpcionalesMisDatos.includes(campo)) {
        if (campo === 'mediosTraslado') {
          if (mediosSeleccionados.length === 0) { // Medios de traslado no seleccionados
            erroresTemp[campo] = 'Debes seleccionar al menos un medio de traslado';
          }
        } else {
          if (dataMisDatos[campo] === null || dataMisDatos[campo] === undefined || dataMisDatos[campo] === '') {
            erroresTemp[campo] = 'Este campo es obligatorio';
          }
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

  // **************************  FUNCIONES PARA MOSTRAR MENSAJES AL USUARIO  *******************
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
      title: '!Alerta!',
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
        <div className='flex-grow-1 mt-5 mx-lg-5 px-5'>
          <form onSubmit={handleSubmit}>
            <div className='row mx-lg-5 mt-4 d-flex justify-content-center'>
              {/* INICIO MODULO INFORMACION GENERAL */}
              <p>Los <span style={{ color: 'red' }}>*</span> significan que el campo es obligatorio.</p>
              <div className="col-xs-12 col-lg-6 mb-4">
                <div className='tarjeta-border p-4 d-flex flex-column mb-4 h-100' style={{ background: 'var(--color-morado2)', color: 'white' }}>
                  <div className='row me-lg-5'>
                    <p className='fs-2' style={{ color: 'white', fontWeight: 'bolder' }}>Información general</p>
                    <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center p-2'>
                      <label className='fs-5 me-md-3 mb-2 mb-md-0' style={{ fontWeight: 'bold' }}>Nombre: <span style={{ color: 'red' }}>*</span></label>
                      <label>{dataMisDatos.nombreCompleto}</label>
                    </div>

                    <div className='mt-3 d-flex flex-column flex-md-row align-items-start align-items-md-center'>
                      <label className='fs-5 me-md-3 mb-2 mb-md-0' style={{ fontWeight: 'bold' }}>Carrera: <span style={{ color: 'red' }}>*</span></label>
                      <label>{datosAlumno.carrera?.nombreCarrera || ''}</label>
                    </div>

                    <div className='mt-4 d-flex flex-column flex-md-row align-items-start align-items-md-center'>
                      <label className='fs-5 me-md-3 mb-2 mb-md-0' style={{ fontWeight: 'bold' }}>Semestre: <span style={{ color: 'red' }}>*</span></label>
                      <div className='w-50'>
                        <SeleccionarCombo
                          name="semestre"
                          options={catSemestres.map(s => ({
                            label: s.nombreSemestre,
                            value: s.id
                          }))}
                          placeholder="Selecciona una opción"
                          value={dataMisDatos.semestre || ''}
                          onChange={actualizarCamposMisDatos}
                        />
                      </div>
                    </div>

                    <div className='mt-4 d-flex flex-column flex-md-row align-items-start align-items-md-center'>
                      <label className='fs-5 me-md-3 mb-2 mb-md-0' style={{ fontWeight: 'bold' }}>Sexo:  <span style={{ color: 'red' }}>*</span></label>
                      <div>
                        <RadioSelect
                          options={catSexo.map(s => ({ label: s.nombreSexo, value: s.id }))}
                          name="sexo"
                          onChange={actualizarCamposMisDatos}
                          value={datosAlumno.sexo?.id || ''}
                        />
                      </div>
                    </div>

                    <div className='mt-4 d-flex flex-column flex-md-row align-items-start align-items-md-center'>
                      <label className='fs-5 me-md-3 mb-2 mb-md-0' style={{ fontWeight: 'bold' }}>Estado civil: <span style={{ color: 'red' }}>*</span></label>
                      <RadioSelect
                        options={estadoCivil.map(s => ({ label: s.nombreEstadoCivil, value: s.id }))}
                        name="estadoCivil"
                        onChange={actualizarCamposMisDatos}
                        value={dataMisDatos.estadoCivil}
                      />
                    </div>
                    {errores.estadoCivil && <div style={{ color: 'orange' }}>{errores.estadoCivil}</div>}

                    <div className='mt-4'>
                      <label className='fs-5' style={{ fontWeight: 'bold' }}>¿Tienes los recursos económicos necesarios para tus actividades académicas? <span style={{ color: 'red' }}>*</span></label>
                      <RadioSelect
                        gris={false}
                        options={['Si', 'No']}
                        onChange={actualizarCamposMisDatos}
                        name="recursosSuficientes"
                        value={boolToSiNo(dataMisDatos.recursosSuficientes)}
                      />
                    </div>
                    {errores.recursosSuficientes && <div style={{ color: 'orange' }}>{errores.recursosSuficientes}</div>}

                    <div className='mt-4 d-flex flex-column flex-md-row align-items-start align-items-md-center'>
                      <label className='fs-5 me-md-3 mb-2 mb-md-0' style={{ fontWeight: 'bold' }}>Correo:</label>
                      <div className='w-xs-100 me-4 mb-2 mb-md-0'>
                        <input
                          type="email"
                          className={`form-control ${errores.correo ? 'input-error' : ''}`}
                          name="correo"
                          value={dataMisDatos.correo || ''}
                          onChange={actualizarCamposMisDatos}
                          placeholder="Ingrese su correo electrónico"
                        />
                        {errores.correo && <div style={{ color: 'orange' }}>{errores.correo}</div>}
                      </div>

                      <label className='fs-5 me-md-3' style={{ fontWeight: 'bold' }}>Teléfono:</label>
                      <div className='w-xs-100'>
                        <input
                          type="telefono"
                          className={`form-control ${errores.telefono ? 'input-error' : ''}`}
                          name="telefono"
                          value={dataMisDatos.telefono || ''}
                          onChange={actualizarCamposMisDatos}
                          placeholder="Ingrese su número telefónico"
                          maxLength={10}
                          onBeforeInput={soloNumerosPositivos}
                        />
                        {errores.telefono && <div style={{ color: 'orange' }}>{errores.telefono}</div>}
                      </div>

                    </div>

                  </div>
                </div>
              </div>
              {/* FIN MODULO INFORMACION GENERAl */}

              {/* INICIO MODULO DOMICILIO */}
              <div className="col-xs-12 col-lg-6 h-100 mb-4">
                <div className='tarjeta-border d-flex flex-column p-4'>
                  <div className='row'>
                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>

                    {/* Situación de vivienda */}
                    <div className='mt-2 mb-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Marque la opción que mejor describa tu situación de vivienda:  <span style={{ color: 'red' }}>*</span></label>
                      <RadioSelect
                        gris={true}
                        options={catSituacionVivienda.map(s => ({
                          label: s.nombreSituacion,
                          value: s.id
                        }))}
                        name={"situacionVivienda"}
                        value={dataMisDatos.situacionVivienda}
                        onChange={actualizarCamposMisDatos}
                      />
                      {errores.situacionVivienda && <div className='text-danger'>{errores.situacionVivienda}</div>}
                    </div>

                    {/* Dirección */}
                    <label className='fs-5 mt-4' style={{ color: 'var(--color-morado3)' }}>Indica tu dirección actual: <span style={{ color: 'red' }}>*</span></label>

                    <div className="col-12 col-md-4 mt-2 mb-2">
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>C.P. <span style={{ color: 'red' }}>*</span></label>
                      <input
                        maxLength={5}
                        onBeforeInput={soloNumerosPositivos}
                        className={`form-control ${errores.cp ? 'input-error' : ''}`}
                        type="text"
                        onChange={actualizarCamposDomicilio}
                        value={dataDomicilio.cp}
                        name={"cp"}
                      />
                      {errores.cp && <div className='text-danger'>{errores.cp}</div>}
                    </div>

                    <div className='col-12 col-md-4 mt-2 mb-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Estado</label>
                      <input
                        className='form-control'
                        type="text"
                        onChange={actualizarCamposDomicilio}
                        value={dataDomicilio.estado}
                        name='estado'
                        disabled={true}
                      />
                      {errores.estado && <div className='text-danger'>{errores.estado}</div>}
                    </div>

                    <div className='col-12 col-md-4 mt-2 mb-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Municipio</label>
                      <input
                        className='form-control'
                        type="text"
                        value={dataDomicilio.municipio}
                        name='municipio'
                        disabled={true}
                      />
                      {errores.municipio && <div className='text-danger'>{errores.municipio}</div>}
                    </div>

                    <div className='col-12 col-md-6 mt-2 mb-3'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Calle <span style={{ color: 'red' }}>*</span></label>
                      <input
                        className={`form-control ${errores.calle ? 'input-error' : ''}`}
                        type="text"
                        onBeforeInput={soloFormatoDirecciones}
                        name={"calle"}
                        value={dataDomicilio.calle}
                        onChange={actualizarCamposDomicilio}
                      />
                      {errores.calle && <div className='text-danger'>{errores.calle}</div>}
                    </div>

                    <div className="col-12 col-md-6 mt-2 mb-3">
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Número <span style={{ color: 'red' }}>*</span></label>
                      <input
                        onBeforeInput={soloLetrasYNumeros}
                        className={`form-control ${errores.numero ? 'input-error' : ''}`}
                        type="text"
                        name={"numero"}
                        value={dataDomicilio.numero}
                        onChange={actualizarCamposDomicilio}
                      />
                      {errores.numero && <div className='text-danger'>{errores.numero}</div>}
                    </div>

                    <div className='col-12 col-md-6 mt-2 mb-3'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Colonia</label>
                      <SeleccionarCombo
                        options={colonias.map(c => ({
                          label: c,
                          value: c
                        }))}
                        name={"colonia"}
                        value={dataDomicilio.colonia}
                        onChange={actualizarCamposDomicilio}
                        placeholder="Selecciona una opción"
                      />
                    </div>

                    <div className='col-12 col-md-6 mt-2 mb-3'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Localidad <span style={{ color: 'red' }}>*</span></label>
                      <input
                        onBeforeInput={soloLetras}
                        className={`form-control ${errores.localidad ? 'input-error' : ''}`}
                        type="text"
                        onChange={actualizarCamposDomicilio}
                        value={dataDomicilio.localidad}
                        name='localidad'
                      />
                      {errores.localidad && <div className='text-danger'>{errores.localidad}</div>}
                    </div>

                    <div className="col-12 mt-2">
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre de la casa de huéspedes o propietario <span style={{ color: 'red' }}>*</span></label>
                      <input
                        onBeforeInput={soloLetras}
                        className={`form-control ${errores.nombreCasaHuesped ? 'input-error' : ''}`}
                        type="text"
                        value={dataMisDatos.nombreCasaHuesped}
                        name={"nombreCasaHuesped"}
                        onChange={actualizarCamposMisDatos}
                      />
                      {errores.nombreCasaHuesped && <div className='text-danger'>{errores.nombreCasaHuesped}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* FIN MODULO DOMICILIO */}
            </div>

            {/* MODULO GASTOS E INGRESOS  */}
            <div className='row mx-lg-5 mt-4'>
              <div className='tarjeta-border p-3 p-md-5'>
                <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Gatos e ingresos</p>
                <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>¿A cuánto ascienden tus gastos mensuales de manutención? <span style={{ color: 'red' }}>*</span></p>

                <div className="row">
                  <div className="col-12 col-md-8 mb-2">
                    <p style={{ color: 'var(--color-gris1)' }}>
                      Lo que pagas de alimentación, transporte, vivienda, servicios médicos, libros y materiales escolares, entretenimiento, etc. (Por favor no incluyas los gastos en colegiatura e inscripciones de la universidad)
                    </p>
                    <input
                      onBeforeInput={soloNumerosPositivosConDosDecimales}
                      className={`form-control w-25 ${errores.gastoMensual ? 'input-error' : ''}`}
                      type="text"
                      name="gastoMensual"
                      onChange={actualizarCampoGastosIngresos}
                      value={dataGastosIngresos.gastoMensual}
                      isInvalid={!!errores.gastoMensual}
                    />
                    {errores.gastoMensual && <div className="text-danger">{errores.gastoMensual}</div>}
                  </div>

                  <div className='col-12 col-md-4 d-flex flex-column align-items-center text-center mb-4'>
                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>
                      ¿Dependes económicamente? <span style={{ color: 'red' }}>*</span>
                    </p>
                    <RadioSelect
                      gris={true}
                      options={['Si', 'No']}
                      onChange={actualizarCampoGastosIngresos}
                      name="dependeEconomicamente"
                      value={boolToSiNo(dataGastosIngresos.dependeEconomicamente)}
                    />
                    {errores.dependeEconomicamente && <div className="text-danger">{errores.dependeEconomicamente}</div>}
                  </div>

                  <div className='col-12 col-lg-6'>
                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>¿Con cuantas personas comparte el costo de la renta? <span style={{ color: 'red' }}>*</span></p>
                    <input 
                      onBeforeInput={soloNumerosPositivos}
                      type="text"
                      className={`form-control w-25 ${errores.personasComparteRenta ? 'input-error' : ''}`}
                      name="personasComparteRenta"
                      onChange={actualizarCampoGastosIngresos}
                      value={dataGastosIngresos.personasComparteRenta}
                      isInvalid={!!errores.personasComparteRenta}
                    />
                    {errores.personasComparteRenta && <div className="text-danger">{errores.personasComparteRenta}</div>}
                  </div>

                  <div className='col-12 col-lg-6'>
                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>¿Cuanto paga usted de renta mensualmente? <span style={{ color: 'red' }}>*</span></p>
                    <input 
                      onBeforeInput={soloNumerosPositivosConDosDecimales}
                      type="text"
                      className={`form-control w-25 ${errores.pagoRentaMensual ? 'input-error' : ''}`}
                      name="pagoRentaMensual"
                      onChange={actualizarCampoGastosIngresos}
                      value={dataGastosIngresos.pagoRentaMensual}
                      isInvalid={!!errores.pagoRentaMensual}
                    />
                    {errores.pagoRentaMensual && <div className="text-danger">{errores.pagoRentaMensual}</div>}
                  </div>
                </div>

                {(recursos === 'Si' || recursos === true) && (
                  <div className="row">
                    <div className="line mx-auto mt-5 mb-4"></div>
                    <div className="col-xs-12 col-lg-5 mb-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre de la persona de la cuál dependes económicamente: <span style={{ color: 'red' }}>*</span></p>
                      <input
                        onBeforeInput={soloLetras}
                        className='form-control'
                        type="text"
                        name='nombreQuienDependes'
                        onChange={actualizarCampoGastosIngresos}
                        value={dataGastosIngresos.nombreQuienDependes}
                      />
                      {errores.nombreQuienDependes && <div className="text-danger">{errores.nombreQuienDependes}</div>}
                    </div>

                    <div className="col-lg-3 col-md-4 mb-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>El trabajo de quien dependes es: <span style={{ color: 'red' }}>*</span></p>
                      <RadioSelect
                        gris={true}
                        options={catTipoTrabajo.map(t => ({
                          label: t.nombreTipo,
                          value: t.id
                        }))}
                        onChange={actualizarCampoGastosIngresos}
                        name="trabajoTipo"
                        value={dataGastosIngresos.trabajoTipo}
                      />
                      {errores.trabajoTipo && <div className="text-danger">{errores.trabajoTipo}</div>}
                    </div>

                    <div className="col-lg-3 col-md-4 mb-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica su ocupación: <span style={{ color: 'red' }}>*</span></p>
                      <SeleccionarCombo
                        name="ocupacion"
                        options={catOcupacion.map(ocupacion => ({
                          label: ocupacion.nombreOcupacion,
                          value: ocupacion.id
                        }))}
                        placeholder="Selecciona una opción"
                        value={dataGastosIngresos.ocupacion}
                        onChange={actualizarCampoGastosIngresos}
                      />
                      {errores.ocupacion && <div className="text-danger">{errores.ocupacion}</div>}
                    </div>

                    {dataGastosIngresos.ocupacion === '8' && (
                      <div className="col-12 col-md-4 mb-4">
                        <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Otro: <span style={{ color: 'red' }}>*</span></p>
                        <input
                          onBeforeInput={soloLetras}
                          className='form-control'
                          name='otro'
                          type="text"
                          onChange={actualizarCampoGastosIngresos}
                          value={dataGastosIngresos.otro}
                        />
                        {errores.otro && <div className="text-danger">{errores.otro}</div>}
                      </div>
                    )}

                    <div className="line mx-auto mt-5 mb-4"></div>
                  </div>
                )}

                {(recursos === 'No' || recursos === false) && (
                  <div className="row mt-3">
                    <div className="line mx-auto mt-5 mb-4"></div>

                    <div className="col-12 col-md-4 mb-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre del lugar donde trabajas <span style={{ color: 'red' }}>*</span></p>
                      <input
                        className={`form-control ${errores.nombreTrabajo ? 'input-error' : ''}`}
                        type="text"
                        name='nombreTrabajo'
                        value={dataTrabajo.nombreTrabajo}
                        onChange={actualizarCamposTrabajo}
                      />
                      {errores.nombreTrabajo && <div className='text-danger'>{errores.nombreTrabajo}</div>}
                    </div>

                    <div className="col-12 col-md-4 mb-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Ingreso mensual que recibes <span style={{ color: 'red' }}>*</span></p>
                      <input
                        className={`form-control ${errores.ingresoMensual ? 'input-error' : ''}`}
                        type="text"
                        name='ingresoMensual'
                        onChange={actualizarCamposTrabajo}
                        value={dataTrabajo.ingresoMensual}
                      />
                      {errores.ingresoMensual && <div className='text-danger'>{errores.ingresoMensual}</div>}
                    </div>

                    <div className="col-12 col-md-4 mb-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Teléfono del lugar donde trabajas <span style={{ color: 'red' }}>*</span></p>
                      <input
                        className={`form-control ${errores.telefonoTrabajo ? 'input-error' : ''}`}
                        type="text"
                        value={dataTrabajo.telefonoTrabajo}
                        onChange={actualizarCamposTrabajo}
                        name='telefonoTrabajo'
                      />
                      {errores.telefonoTrabajo && <div className='text-danger'>{errores.telefonoTrabajo}</div>}
                    </div>

                    <div className="col-12 mb-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Ingresa el domicilio de donde trabajas <span style={{ color: 'red' }}>*</span></p>
                      <input
                        className={`form-control ${errores.domicilioTrabajo ? 'input-error' : ''}`}
                        type="text"
                        value={dataTrabajo.domicilioTrabajo}
                        onChange={actualizarCamposTrabajo}
                        name='domicilioTrabajo'
                      />
                      {errores.domicilioTrabajo && <div className='text-danger'>{errores.domicilioTrabajo}</div>}
                    </div>

                    <div className="line mx-auto mt-5 mb-4"></div>
                  </div>
                )}

                <div className="row">
                  <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>¿Solicitas beca alimentaria? <span style={{ color: 'red' }}>*</span></p>
                  <RadioSelect
                    gris={true}
                    name="solicitaBecaAlimenticia"
                    options={['Si', 'No']}
                    onChange={actualizarCampoGastosIngresos}
                    value={boolToSiNo(dataGastosIngresos.solicitaBecaAlimenticia)}
                  />
                  {errores.solicitaBecaAlimenticia && <div className="text-danger">{errores.solicitaBecaAlimenticia}</div>}
                </div>
              </div>
            </div>

            {/* FIN MODULO GASTOS E INGRESOS  */}

            <div className="col">

            </div>
            <div className="row  mx-md-5 mt-4 mb-5 gy-4">
              {/* MODULO TRANSPORTE */}
              <div className="col-12 col-md-6 ">
                <div className="tarjeta-border p-4">
                  <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Transporte</p>

                  <label className='fs-5 mb-3' style={{ color: 'var(--color-morado3)' }}>¿Llevas automóvil cotidianamente a la universidad? <span style={{ color: 'red' }}>*</span></label>
                  <RadioSelect
                    gris={true}
                    options={['Si', 'No']}
                    onChange={actualizarCamposMisDatos}
                    name={"llevaAutomovil"}
                    value={boolToSiNo(dataMisDatos.llevaAutomovil)}
                  />
                  {errores.llevaAutomovil && <div className='text-danger'>{errores.llevaAutomovil}</div>}

                  {(tieneAutomovil === 'Si' || tieneAutomovil === true) && (
                    <div>
                      <div className="row mt-4 gy-3">
                        <div className="col-12 col-md-4">
                          <label className='fs-5 mb-2' style={{ color: 'var(--color-morado3)' }}>Marca <span style={{ color: 'red' }}>*</span></label>
                          <input
                            onBeforeInput={soloFormatoDirecciones}
                            className='form-control w-100'
                            type="text"
                            name={'marca'}
                            value={dataTransporteAutomovil.marca}
                            onChange={actualizarCamposTransporteAutomovil}
                          />
                        </div>
                        <div className="col-xs-2 col-lg-3">
                          <label className='fs-5 mb-2' style={{ color: 'var(--color-morado3)' }}>Modelo <span style={{ color: 'red' }}>*</span></label>
                          <input
                            onBeforeInput={soloFormatoDirecciones}
                            className='form-control'
                            type="text"
                            name={'modelo'}
                            value={dataTransporteAutomovil.modelo}
                            onChange={actualizarCamposTransporteAutomovil}
                          />
                        </div>
                        <div className="col-xs-2 col-lg-2">
                          <label className='fs-5 mb-2' style={{ color: 'var(--color-morado3)' }}>Año <span style={{ color: 'red' }}>*</span></label>
                          <input
                            onBeforeInput={soloNumerosPositivos}
                            maxLength={4}
                            className='form-control w-100'
                            type="text"
                            name={'anio'}
                            value={dataTransporteAutomovil.anio}
                            onChange={actualizarCamposTransporteAutomovil}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="line mx-auto mt-4 mb-4"></div>

                  <label className='fs-5 mb-3' style={{ color: 'var(--color-morado3)' }}>¿Llevas motocicleta cotidianamente a la universidad? <span style={{ color: 'red' }}>*</span></label>
                  <RadioSelect
                    gris={true}
                    options={['Si', 'No']}
                    onChange={actualizarCamposMisDatos}
                    name={"llevaMotocicleta"}
                    value={boolToSiNo(dataMisDatos.llevaMotocicleta)}
                  />
                  {errores.llevaMotocicleta && <div className='text-danger'>{errores.llevaMotocicleta}</div>}

                  {(tieneMotocicleta === 'Si' || tieneMotocicleta === true) && (
                    <div>
                      <div className="row mt-4 gy-3">
                        <div className="col-12 col-md-4">
                          <label className='fs-5 mb-2' style={{ color: 'var(--color-morado3)' }}>Marca <span style={{ color: 'red' }}>*</span></label>
                          <input
                            onBeforeInput={soloFormatoDirecciones}
                            className='form-control w-100'
                            type="text"
                            name={'marca'}
                            value={dataTransporteMotocicleta.marca}
                            onChange={actualizarCamposTransporteMotocicleta}
                          />
                        </div>
                        <div className="col-xs-2 col-lg-3">
                          <label className='fs-5 mb-2' style={{ color: 'var(--color-morado3)' }}>Modelo <span style={{ color: 'red' }}>*</span></label>
                          <input
                            onBeforeInput={soloFormatoDirecciones}
                            className='form-control w-100'
                            type="text"
                            name={'modelo'}
                            value={dataTransporteMotocicleta.modelo}
                            onChange={actualizarCamposTransporteMotocicleta}
                          />
                        </div>
                        <div className="col-xs-2 col-lg-2">
                          <label className='fs-5 mb-2' style={{ color: 'var(--color-morado3)' }}>Año <span style={{ color: 'red' }}>*</span></label>
                          <input
                            onBeforeInput={soloNumerosPositivos}
                            maxLength={4}
                            className='form-control w-100'
                            type="text"
                            name={'anio'}
                            value={dataTransporteMotocicleta.anio}
                            onChange={actualizarCamposTransporteMotocicleta}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="line mx-auto mt-4 mb-4"></div>

                  <div className="row mt-4 gy-2">
                    <label className='fs-5 mb-3' style={{ color: 'var(--color-morado3)' }}>¿Qué otros medios utilizas para trasladarte a la universidad? <span style={{ color: 'red' }}>*</span></label>
                    {errores.mediosTraslado && <div className='text-danger'>{errores.mediosTraslado}</div>}
                    {medios.map((medio) => (
                      <CheckBox
                        key={medio.id}
                        id={medio.id}
                        opcion={medio.nombreMedio}
                        onChange={actualizarMediosTraslado}
                        checked={mediosSeleccionados.includes(medio.id)}
                        name={"mediosTraslado"}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* FIN MODULO TRANSPORTE */}

              {/* INFORMACION COMPLEMENTARIA */}
              <div className="col-12 col-md-6">
                <div className="tarjeta-border p-4 h-100 w-100">
                  <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Información complementaria</p>

                  <label className='fs-5 mb-3' style={{ color: 'var(--color-morado3)' }}>¿Eres hijo o nieto de comunero de Ixtlán de Juárez? <span style={{ color: 'red' }}>*</span></label>
                  <RadioSelect
                    gris={true}
                    options={['Si', 'No']}
                    onChange={actualizarCamposMisDatos}
                    name="familiarComunero"
                    value={boolToSiNo(dataMisDatos.familiarComunero)}
                  />
                  {errores.familiarComunero && <div className='text-danger'>{errores.familiarComunero}</div>}

                  <br />
                  <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }}>¿Utilizas teléfono celular en la universidad? <span style={{ color: 'red' }}>*</span></label>
                  <RadioSelect
                    gris={true}
                    options={['Si', 'No']}
                    name={"utilizaCelular"}
                    onChange={actualizarCamposMisDatos}
                    value={boolToSiNo(dataMisDatos.utilizaCelular)}
                  />
                  {errores.utilizaCelular && <div className='text-danger'>{errores.utilizaCelular}</div>}

                  <br />
                  <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }}>¿Tienes computadora personal y/o portátil? <span style={{ color: 'red' }}>*</span></label>
                  <RadioSelect
                    gris={true}
                    options={['Si', 'No']}
                    name={"tieneComputadora"}
                    onChange={actualizarCamposMisDatos}
                    value={boolToSiNo(dataMisDatos.tieneComputadora)}
                  />
                  {errores.tieneComputadora && <div className='text-danger'>{errores.tieneComputadora}</div>}

                  <br />
                  <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }}>Además del idioma español, ¿qué otro idioma, lenguaje o dialecto hablas? <span style={{ color: 'red' }}>*</span></label>
                  <div className="col-xs-4 col-lg-4">
                    <input
                      onBeforeInput={soloLetras}
                      className={`form-control ${errores.idioma ? 'input-error' : ''}`}
                      type="text"
                      name='idioma'
                      value={dataMisDatos.idioma}
                      onChange={actualizarCamposMisDatos}
                    />
                    {errores.idioma && <div className='text-danger'>{errores.idioma}</div>}
                  </div>
                </div>
              </div>

              {/* FIN INFORMACION COMPLEMENTARIA */}
            </div>

            <div className='d-flex justify-content-center mb-5'>
              <button className='btn btn-midDatos' disabled={btnDisabled}>Guardar</button>
            </div>
          </form>
        </div>
        <FooterInesis></FooterInesis>
      </div>
    </div>
  )
}
