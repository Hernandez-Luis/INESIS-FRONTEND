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
import { data } from 'react-router-dom'

export const MisDatos = ({ onAdd, update }) => {
  const idAlumno = JSON.parse(localStorage.getItem('usuario')).alumnoId;
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
      let dataAlumno = await AlumnoService.getById(idAlumno);
      // console.log("ALUMNO: ", dataAlumno)
      // console.log("materno: ", dataAlumno.apellidoMaterno)
      setDatosAlumno(dataAlumno)
      // console.log(dataAlumno?.misDatos);
      //setMisDatos(dataAlumno?.misDatos)
      setDataMisDatos((prevData) => ({
        ...prevData,
        nombreCompleto: dataAlumno.nombre + " " + dataAlumno.apellidoMaterno + " " + dataAlumno.apellidoPaterno,
        carrera: dataAlumno.carrera?.id,
        semestre: dataAlumno.semestre?.id,
        sexo: dataAlumno.sexo?.id,
      }))
      if (dataAlumno?.misDatos) {
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
        setRecursos(dataAlumno?.misDatos?.gastosIngresos?.dependeEconomicamente ? 'Si' : 'No')
        setDataGastosIngresos((prevData) => ({
          ...prevData,
          gastoMensual: dataAlumno?.misDatos.gastosIngresos?.gastoMensual || '',
          dependeEconomicamente: dataAlumno?.misDatos.gastosIngresos?.dependeEconomicamente || '',
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
        setTieneAutomovil(dataAlumno?.misDatos.llevaVehiculo)
        setTieneMotocicleta(dataAlumno?.misDatos.llevamotocicleta);
        setDataTransporteAutomovil((prevData) => ({
          ...prevData,
          marca: dataAlumno?.misDatos.transporte?.marca || '',
          modelo: dataAlumno?.misDatos.transporte?.modelo || '',
          anio: dataAlumno?.misDatos.transporte?.anio || '',
          catTipoTransporte: dataAlumno?.misDatos.transporte?.catTipoTransporte?.idCatTipoTransporte || ''
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
    anio: '',
    catTipoTransporte: ''
  }

  const formularioInicialTransporteMotocicleta = {
    marca: '',
    modelo: '',
    anio: '',
    catTipoTransporte: ''
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
    llevaAutomovil: '',
    llevaMotocicleta: '',
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

    if (validacionCamposGastosIngresos() === 0) {
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
      if (datosAlumno.misDatos !== null) {
        let idMisDatos = datosAlumno.misDatos.id;
        nuevosErrores = await update(idMisDatos, coleccionValores);
      } else {
        nuevosErrores = await onAdd(coleccionValores);
      }
      console.log("Error: ", nuevosErrores)
      if (nuevosErrores && nuevosErrores.length > 0) {
        mostrarError(nuevosErrores)
        return;
      }
      mostrarExito("Los datos se guardaron correctamente")
    } catch (error) {
      console.error("Error al guardar los datos: ", error);
    }
  };

  // ***************************  VALIDACION DE CAMPOS  *****************************

  const validacionCamposGastosIngresos = () => {
    // Validación de los campos
    const erroresTemp = {};
    const camposOpcionales = ["nombreQuienDependes", "trabajoTipo", "ocupacion", "otro"];
    const camposBooleanos = ["solicitaBecaAlimenticia", "dependeEconomicamente"];

    Object.keys(dataGastosIngresos).forEach((campo) => {
      // Para campos booleanos, verificar que no sean null o undefined
      if (camposBooleanos.includes(campo)) {
        if (dataGastosIngresos[campo] === null || dataGastosIngresos[campo] === undefined) {
          erroresTemp[campo] = 'Este campo es obligatorio';
        }
      }
      // Para campos regulares, verificar que no estén vacíos
      else if (!camposOpcionales.includes(campo)) {
        if (!dataGastosIngresos[campo]) {
          erroresTemp[campo] = 'Este campo es obligatorio';
        }
      }
    });

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
                        value={dataMisDatos.semestre || ''}
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
                      value={boolToSiNo(dataMisDatos.recursosSuficientes)}
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
                      options={catSituacionVivienda.map(s => ({
                        label: s.nombreSituacion,
                        value: s.id
                      }))}
                      name={"situacionVivienda"}
                      value={dataMisDatos.situacionVivienda}
                      onChange={actualizarCamposMisDatos}
                    />
                  </div>
                  <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica tu dirección actual:</label>
                  <div className="col-3 mt-2">
                    <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>C.P.</label>
                    <input maxLength={5} className='form-control' type="text" onChange={actualizarCamposDomicilio} value={dataDomicilio.cp} name={"cp"} />
                  </div>
                  <div className="col-3 mt-2">
                    <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Numero</label>
                    <input className='form-control' type="text" name={"numero"} value={dataDomicilio.numero} onChange={actualizarCamposDomicilio} />
                  </div>
                  <div className='col-6 mt-2'>
                    <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Calle</label>
                    <input className='form-control' type="text" name={"calle"} value={dataDomicilio.calle} onChange={actualizarCamposDomicilio} />
                  </div>
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
                      value={boolToSiNo(dataGastosIngresos.dependeEconomicamente)}
                    />
                    {errores.dependeEconomicamente && <div className="text-danger">{errores.dependeEconomicamente}</div>}
                  </div>
                </div>

                {(recursos === 'Si') || recursos === true && (
                  <div className="row mt-3">
                    <div className="line mx-auto mt-5 mb-4"></div>
                    <div className="col-12">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre de la persona de la cuál dependes económicamente:</p>
                      <input className='form-control w-25' type="text" name='nombreQuienDependes' onChange={actualizarCampoGastosIngresos} value={dataGastosIngresos.nombreQuienDependes} />
                      {errores.nombreQuienDependes && <div className="text-danger">{errores.nombreQuienDependes}</div>}
                    </div>
                    <div className="col-3">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>El trabajo de quien dependes es:</p>
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
                    <div className="col-3">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica su ocupación:</p>
                      <SeleccionarCombo
                        name="ocupacion"
                        options={catOcupacion.map(ocupacion => ({
                          label: ocupacion.nombreOcupacion,
                          value: ocupacion.id
                        }))} // Opciones disponibles
                        placeholder="Selecciona una opción" // Placeholder
                        value={dataGastosIngresos.ocupacion}
                        onChange={actualizarCampoGastosIngresos}
                      />
                      {errores.ocupacion && <div className="text-danger">{errores.ocupacion}</div>}
                    </div>
                    {dataGastosIngresos.ocupacion === '8' && (
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

                    <div className="line mx-auto mt-5 mb-4"></div>
                  </div>
                )}

                {(recursos === 'No') || recursos === false && (
                  <div className="row mt-3">
                    <div className="line mx-auto mt-5 mb-4"></div>
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
                    <div className="line mx-auto mt-5 mb-4"></div>
                  </div>
                )}
                <div className="row">
                  <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>¿Solicitas beca alimentaria?</p>
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

            <div className="row mx-5 mt-4 mb-5">
              {/* MODULO TRANSPORTE */}
              <div className="col tarjeta-border me-4 p-5">
                <p className='fs-2 ' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Transporte</p>
                <label className='fs-5 mb-3' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Llevas automóvil cotidianamente a la universidad?</label>
                <RadioSelect
                  gris={true}
                  options={['Si', 'No']}
                  onChange={actualizarCamposMisDatos}
                  name={"llevaAutomovil"}
                  value={boolToSiNo(dataMisDatos.llevaAutomovil)}
                />

                {(tieneAutomovil === 'Si') || tieneAutomovil === true && (
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
                        value={dataTransporteAutomovil.catTipoTransporte}
                        onChange={actualizarCamposTransporteAutomovil}
                      />
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Marca</label>
                        <input
                          className='form-control w-75'
                          type="text"
                          name={'marca'}
                          value={dataTransporteAutomovil.marca}
                          onChange={actualizarCamposTransporteAutomovil}
                        />
                      </div>
                      <div className="col">
                        <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Modelo</label>
                        <input
                          className='form-control w-75'
                          type="text"
                          name={'modelo'}
                          value={dataTransporteAutomovil.modelo}
                          onChange={actualizarCamposTransporteAutomovil}
                        />
                      </div>
                      <div className="col">
                        <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Año</label>
                        <input
                          className='form-control w-75'
                          type="text"
                          name={'anio'}
                          value={dataTransporteAutomovil.anio}
                          onChange={actualizarCamposTransporteAutomovil}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="line mx-auto mt-3 mb-3"></div>

                <label className='fs-5 mb-3' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Llevas motocicleta cotidianamente a la universidad?</label>
                <RadioSelect
                  gris={true}
                  options={['Si', 'No']}
                  onChange={actualizarCamposMisDatos}
                  name={"llevaMotocicleta"}
                  value={boolToSiNo(dataMisDatos.llevaMotocicleta)}
                />

                {(tieneMotocicleta === 'Si') || tieneMotocicleta === true && (
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
                        value={dataTransporteMotocicleta.catTipoTransporte}
                        onChange={actualizarCamposTransporteMotocicleta}
                      />
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Marca</label>
                        <input
                          className='form-control w-75'
                          type="text"
                          name={'marca'}
                          value={dataTransporteMotocicleta.marca}
                          onChange={actualizarCamposTransporteMotocicleta}
                        />
                      </div>
                      <div className="col">
                        <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Modelo</label>
                        <input
                          className='form-control w-75'
                          type="text"
                          name={'modelo'}
                          value={dataTransporteMotocicleta.modelo}
                          onChange={actualizarCamposTransporteMotocicleta}
                        />
                      </div>
                      <div className="col">
                        <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Año</label>
                        <input
                          className='form-control w-75'
                          type="text"
                          name={'anio'}
                          value={dataTransporteMotocicleta.anio}
                          onChange={actualizarCamposTransporteMotocicleta}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="line mx-auto mt-3 mb-3"></div>
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
                  onChange={actualizarCamposMisDatos}
                  name="familiarComunero"
                  value={boolToSiNo(dataMisDatos.familiarComunero)}
                />
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Utilizas teléfono celular en la universidad?</label>
                <RadioSelect
                  gris={true}
                  options={['Si', 'No']}
                  name={"utilizaCelular"}
                  onChange={actualizarCamposMisDatos}
                  value={boolToSiNo(dataMisDatos.utilizaCelular)}
                />
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Tienes computadora personal y/o portátil?</label>
                <RadioSelect
                  gris={true}
                  options={['Si', 'No']}
                  name={"tieneComputadora"}
                  onChange={actualizarCamposMisDatos}
                  value={boolToSiNo(dataMisDatos.tieneComputadora)}
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
