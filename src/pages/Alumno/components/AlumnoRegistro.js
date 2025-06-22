import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import '../components/AdministrarAlumnos.css';
import carreraService from '../../../services/CatCarreraService';
import semestreService from '../../../services/CatSemestreService';
import sexoService from '../../../services/CatSexoService';
import grupoService from '../../../services/CatGrupoService';
import alumnoService from '../../../services/AlumnoService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../../../services/UsuarioService';
import ModalCambiarContraseña from '../../../components/CambiarContraseña/ModalCambiarContraseña';

const AlumnoRegistro = forwardRef((props, ref) => {

  const initialForm = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    curp: '',
    correo: '',
    telefono: '',
    matricula: '',
    carrera: '',
    semestre: '',
    grupo: '',
    sexo: '',
    usuario: '',
    contrasena: ''
  };

  const [formValues, setFormValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [listaCarreras, setListaCarreras] = useState([]);
  const [listaSemestres, setListaSemestres] = useState([]);
  const [listaSexo, setListaSexo] = useState([]);
  const [alumnoId, setAlumnoId] = useState(props.id || null);
  const [showModalCambiar, setShowModalCambiar] = useState(false);
  const esEdicion = !!props.alumno;
  const navigate = useNavigate();

  // Obtener datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carreras, semestres, sexos] = await Promise.all([
          carreraService.getAll(),
          semestreService.getAll(),
          sexoService.getAll()
        ]);

        setListaCarreras(carreras);
        setListaSemestres(semestres);
        setListaSexo(sexos);
      } catch (error) {
        console.error("Error cargando datos:", error);
        mostrarAlerta({
          icon: 'error',
          title: 'Error al cargar datos iniciales'
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const cargarDatosAlumno = async () => {
      if (props.alumno) {
        try {
          // Petición para obtener el usuario relacionado con el alumno
          const usuario = await UsuarioService.getByAlumnoId(props.alumno.id);

          console.log("ESTE ES EL USUARIO", props.alumno);
          // Convertimos los datos al formato esperado por el formulario
          const alumnoEditar = {
            nombre: props.alumno.nombre || '',
            apellidoPaterno: props.alumno.apellidoPaterno || '',
            apellidoMaterno: props.alumno.apellidoMaterno || '',
            curp: props.alumno.curp || '',
            correo: props.alumno.correo || '',
            telefono: props.alumno.telefono || '',
            matricula: props.alumno.matricula || '',
            carrera: props.alumno.carrera?.id || '',
            semestre: props.alumno.semestre?.id || '',
            grupo: '',
            sexo: props.alumno.sexo?.id || '',
            usuario: usuario?.usuario || '', // Aquí se carga el usuario
            contrasena: usuario?.contrasenia || '',
          };
          setFormValues(alumnoEditar);
          setAlumnoId(props.alumno.id);
        } catch (error) {
          console.error("Error al cargar usuario del alumno:", error);
        }
      }
    };

    cargarDatosAlumno();
  }, [props.alumno]);

  useEffect(() => {
    if (formValues.matricula && !props.alumno) {
      setFormValues(prevState => ({
        ...prevState,
        contrasena: prevState.matricula
      }));
    }
  }, [formValues.matricula, props.alumno]);


  useEffect(() => {
    if (
      formValues.carrera &&
      formValues.semestre &&
      listaCarreras.length > 0 &&
      listaSemestres.length > 0
    ) {
      const carreraSeleccionada = listaCarreras.find(c => c.id.toString() === formValues.carrera.toString());
      const semestreSeleccionado = listaSemestres.find(s => s.id.toString() === formValues.semestre.toString());

      if (carreraSeleccionada && semestreSeleccionado) {
        grupoService.getByCarreraAndSemestre(carreraSeleccionada.id, semestreSeleccionado.id)
          .then(grupo => {
            setFormValues(prev => ({
              ...prev,
              grupo: grupo || ''
            }));
          })
          .catch(error => {
            console.error('Error:', error);
            setFormValues(prev => ({ ...prev, grupo: '' }));
          });
      }
    }
  }, [formValues.carrera, formValues.semestre, listaCarreras, listaSemestres]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;

    // Convertir a número los campos que lo requieren
    if (name === 'carrera' || name === 'semestre') {
      processedValue = value === '' ? '' : parseInt(value, 10);
    }

    setFormValues(prev => {
      let updatedForm = { ...prev, [name]: value };

      // Generar usuario automáticamente
      if (name === 'nombre' || name === 'apellidoPaterno') {
        const primerNombre = updatedForm.nombre.split(' ')[0] || '';
        const primerApellido = updatedForm.apellidoPaterno.split(' ')[0] || '';
        if (primerNombre && primerApellido) {
          updatedForm.usuario = `${primerNombre.toLowerCase()}.${primerApellido.toLowerCase()}`;
        }
      }
      return updatedForm;
    });
    validateField(name, value);
  };


  const validateField = (name, value) => {
    let error = '';
    const requiredFields = ['nombre', 'apellidoPaterno', 'curp', 'correo', 'telefono', 'matricula', 'carrera', 'semestre', 'sexo'];

    // Validación de campos requeridos
    if (requiredFields.includes(name)) {
      if (typeof value === 'string') {
        if (!value.trim()) {
          error = 'Este campo es obligatorio';
        }
      } else if (value === null || value === undefined || value === '') {
        error = 'Este campo es obligatorio';
      }
    }

    // Validaciones específicas
    switch (name) {
      case 'nombre':
      case 'apellidoPaterno':
        if (typeof value === 'string' && value.length > 30)
          error = 'Máximo 30 caracteres';
        break;

      case 'curp': {
        const curpRegex = /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\d$/;
        if (!curpRegex.test(value?.toUpperCase()))
          error = 'Formato CURP inválido';
        break;
      }

      case 'correo':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = 'Correo electrónico inválido';
        break;

      case 'telefono':
        if (!/^\d{10}$/.test(value))
          error = 'Debe contener 10 dígitos';
        break;

      case 'matricula':
        if (!/^\d{10}$/.test(value))
          error = 'La matrícula debe contener exactamente 10 dígitos numéricos';
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };


  const validateAllFields = () => {
    const newErrors = {};
    Object.keys(formValues).forEach(key => {
      if (key !== 'grupo') { // Excluir campo no requerido
        const error = validateField(key, formValues[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Actualizar contraseña solo desde modal
    const actualizarContraseña = (nuevaContrasena) => {
        setFormValues(prev => ({
            ...prev,
            contrasena: nuevaContrasena
        }));
    };
    
  const mostrarAlerta = (config) => {
    Swal.fire({
      ...config,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        confirmButton.style.backgroundColor = '#28a745'; // Verde tipo Bootstrap
        confirmButton.style.color = 'white';
      },
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validar todos los campos
    if (!validateAllFields()) {
      mostrarAlerta({
        icon: 'info',
        title: '¡Ups! Verifica los campos',
        text: 'Por favor verifica todos los campos'
      });
      return;
    }

    // 2. Verificar si CURP, matrícula o correo ya existen (solo si es nuevo)
    if (!esEdicion) {
      try {
        const alumnoExistente = await alumnoService.checkIfExists(
          formValues.curp,
          formValues.matricula,
          formValues.correo
        );
        if (alumnoExistente) {
          mostrarAlerta({
            icon: 'info',
            title: '¡Atención!🔍',
            text: 'Ya existe un alumno con la misma CURP, matrícula o correo.'
          });
          return;
        }
      } catch (error) {
        mostrarAlerta({
          icon: 'error',
          title: 'Error al verificar duplicados',
          text: 'Hubo un problema al verificar los datos. Intente nuevamente.'
        });
        return;
      }
    }

    try {
      // 3. Preparar datos
      const carreraSeleccionada = listaCarreras.find(c => c.id.toString() === formValues.carrera.toString());
      const semestreSeleccionado = listaSemestres.find(s => s.id.toString() === formValues.semestre.toString());
      const sexoSeleccionado = listaSexo.find(s => s.id.toString() === formValues.sexo.toString());

      const alumnoPayload = {
        nombre: formValues.nombre.trim(),
        apellidoPaterno: formValues.apellidoPaterno.trim(),
        apellidoMaterno: formValues.apellidoMaterno.trim(),
        curp: formValues.curp.trim().toUpperCase(),
        correo: formValues.correo.trim(),
        telefono: formValues.telefono.trim(),
        matricula: formValues.matricula.trim(),
        semestre: semestreSeleccionado ? semestreSeleccionado.id : null,
        carrera: carreraSeleccionada ? carreraSeleccionada.id : null,
        sexo: sexoSeleccionado ? sexoSeleccionado.id : null,
        grupo: formValues.grupo.id,
        usuario: formValues.usuario,
        contrasenia: formValues.contrasena,
        estatus: 1,
        idCatRol: 1
      };

      // 4. Crear o actualizar
      let response;
      if (esEdicion) {
        response = await alumnoService.update(props.alumno.id, alumnoPayload);
      } else {
        response = await alumnoService.create(alumnoPayload);
      }

      // 5. Confirmar éxito
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        mostrarAlerta({
          icon: 'success',
          title: esEdicion ? 'Alumno actualizado correctamente' : 'Registro exitoso',
          text: esEdicion
            ? 'Los datos del alumno fueron modificados correctamente.'
            : 'Alumno registrado correctamente.'
        });

        setFormValues(initialForm);
        navigate('/AdministrarAlumnos');
      } else {
        throw new Error('Error al guardar el alumno');
      }
    } catch (err) {
      console.error(err);
      mostrarAlerta({
        icon: 'error',
        title: 'Error al guardar',
        text: err.message || 'No se pudo completar la operación.'
      });
    }
  };


  return (
    <div className="mb-5">
      <h2 className="size-font-title cardMenu-title m-5 text-center"> {props.alumno ? 'Editar Alumno' : 'Agregar Alumno'}</h2>

      <form className="agregar-alumno-container m-5" onSubmit={handleSubmit}>
        {/* Sección Datos Personales */}
        <section className="formulario-seccion formulario-seccion--datos-personales mb-5">
          <h2 className="texto-morado2 mb-4">Datos personales</h2>
          <div className="row g-4">
            <div>
              <label className="formulario-etiqueta">
                Nombre(s) <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                className={`formulario-entrada ${errors.nombre ? 'is-invalid' : ''}`}
                placeholder="Ingrese el nombre"
                value={formValues.nombre}
                onChange={handleChange}
                maxLength={30}
              />
              {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
            </div>
            <div className="col-md-6 dobleColumna">
              <div>
                <label className="formulario-etiqueta">
                  Apellido Paterno <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  className={`formulario-entrada ${errors.apellidoPaterno ? 'is-invalid' : ''} dobleColumnaInput`}
                  placeholder="Ingrese el apellido paterno"
                  value={formValues.apellidoPaterno}
                  onChange={handleChange}
                  maxLength={30}
                />
                {errors.apellidoPaterno && <div className="invalid-feedback">{errors.apellidoPaterno}</div>}
              </div>
            </div>
            <div className="col-md-6 dobleColumna">
              <div>
                <label className="formulario-etiqueta">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  name="apellidoMaterno"
                  className={`formulario-entrada ${errors.apellido ? 'is-invalid' : ''}`}
                  placeholder="Ingrese el apellido materno"
                  value={formValues.apellidoMaterno}
                  onChange={handleChange}
                  maxLength={30}
                />
                {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
              </div>
            </div>
            <div>
              <label className="formulario-etiqueta">
                CURP <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="curp"
                className={`formulario-entrada ${errors.curp ? 'is-invalid' : ''}`}
                placeholder="Ingrese la CURP"
                value={formValues.curp}
                onChange={handleChange}
                maxLength={18}
              />
              {errors.curp && <div className="invalid-feedback">{errors.curp}</div>}
            </div>

            <div>
              <label className="formulario-etiqueta">
                Correo electrónico <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="correo"
                className={`formulario-entrada ${errors.correo ? 'is-invalid' : ''}`}
                placeholder="Ingrese el correo"
                value={formValues.correo}
                onChange={handleChange}
              />
              {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
            </div>

            <div className="col-md-6 dobleColumna">
              <label className="formulario-etiqueta">
                Sexo <span className="text-danger">*</span>
              </label>
              <select
                name="sexo"
                className={`formulario-entrada formulario-seleccion ${errors.sexo ? 'is-invalid' : ''}`}
                value={formValues.sexo}
                onChange={handleChange}
              >
                <option value="">Selecciona una opción</option>
                {listaSexo.map((sexo) => (
                  <option key={sexo.id} value={sexo.id}>
                    {sexo.nombreSexo}
                  </option>
                ))}
              </select>
              {errors.sexo && <div className="invalid-feedback">{errors.sexo}</div>}
            </div>

            <div className="col-md-6 dobleColumna">
              <label className="formulario-etiqueta">
                Teléfono <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                name="telefono"
                className={`formulario-entrada ${errors.telefono ? 'is-invalid' : ''}`}
                placeholder="Ingrese el teléfono"
                value={formValues.telefono}
                onChange={handleChange}
                maxLength={10}
              />
              {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
            </div>
          </div>
        </section>

        {/* Sección Datos Académicos */}
        <section className="formulario-seccion formulario-seccion--datos-academicos">
          <h2 className="texto-morado2 mb-4">Datos académicos</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <label className="formulario-etiqueta">
                Carrera <span className="text-danger">*</span>
              </label>
              <select
                name="carrera"
                value={formValues.carrera}
                onChange={handleChange}
                className={`formulario-entrada ${errors.carrera ? 'is-invalid' : ''}`}
              >
                <option value="">Seleccione una carrera</option>
                {listaCarreras.map((carrera) => (
                  <option key={carrera.id} value={carrera.id}>
                    {carrera.nombreCarrera}
                  </option>
                ))}
              </select>
              {errors.carrera && <div className="invalid-feedback">{errors.carrera}</div>}
            </div>

            <div className="col-md-6">
              <label className="formulario-etiqueta">
                Semestre <span className="text-danger">*</span>
              </label>
              {/* Select de Semestre */}
              <select
                name="semestre"
                value={formValues.semestre}
                onChange={handleChange}
                className={`formulario-entrada formulario-seleccion ${errors.semestre ? 'is-invalid' : ''}`}
              >
                <option value="">Selecciona un semestre</option>
                {listaSemestres.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.nombreSemestre}
                  </option>
                ))}
              </select>
              {errors.semestre && <div className="invalid-feedback">{errors.semestre}</div>}
            </div>

            <div className="col-md-6">
              <label className="formulario-etiqueta">Grupo</label>
              <input
                type="text"
                className="formulario-entrada readonly-style"
                value={formValues.grupo.nombreGrupo}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label className="formulario-etiqueta">
                Matrícula <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="matricula"
                className={`formulario-entrada ${errors.matricula ? 'is-invalid' : ''}`}
                placeholder="Ingrese la matrícula"
                value={formValues.matricula}
                maxLength={10}
                onChange={handleChange}
              />
              {errors.matricula && <div className="invalid-feedback">{errors.matricula}</div>}
            </div>

            {/* Sección Datos de la Plataforma */}
            <h2 className="texto-morado2">Datos de la plataforma</h2>
            <p className="texto-pequeno">Estos datos se asignan automáticamente. </p>

            <div className="col-md-6">
              <label className="formulario-etiqueta">Usuario</label>
              <input
                type="text"
                name="usuario"
                className="formulario-entrada readonly-style2"
                value={formValues.usuario}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label className="formulario-etiqueta">Contraseña</label>
              {props.alumno ? (
                <>
                  <button
                    type="button"
                    className="btn-cambiar-pass w-100"
                    onClick={() => setShowModalCambiar(true)}
                  >
                    <span className="btn-cambiar-pass-decor" />
                    <span className="btn-cambiar-pass-content">
                      <span className="btn-cambiar-pass-icon">
                        <i className="bi bi-key"></i>
                      </span>
                      <span className="btn-cambiar-pass-text">Cambiar contraseña</span>
                    </span>
                  </button>
                  
                </>
              ) : (
                <input
                  type="text"
                  name="contrasena"
                  className="formulario-entrada readonly-style2"
                  value={formValues.contrasena}
                  readOnly
                />
              )}
            </div>

            <div className="d-flex justify-content-center gap-3">
              <button type="submit" className="btn-agregar">
                {props.alumno ? 'Editar Alumno' : 'Agregar Alumno'}
              </button>
            </div>

          </div>
        </section>
      </form>

      <ModalCambiarContraseña
        show={showModalCambiar}
        handleClose={() => setShowModalCambiar(false)}
        requireCurrentPassword={false}
        usuario={formValues.usuario}
        onContraseñaActualizada={actualizarContraseña}
      />
    </div>
  );
});

export default AlumnoRegistro;
