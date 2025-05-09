import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import '../components/AdministrarAlumnos.css';
import carreraService from '../../../services/CatCarreraService';
import semestreService from '../../../services/CatSemestreService';
import sexoService from '../../../services/CatSexoService';
import grupoService from '../../../services/CatGrupoService';
import alumnoService from '../../../services/AlumnoService';
import usuarioService from '../../../services/UsuarioService';
import Swal from 'sweetalert2';

const AlumnoRegistro = forwardRef((props, ref) => {

  const initialForm = {
    nombre: '',
    apellido: '',
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
    if (formValues.matricula) {
      setFormValues(prevState => ({
        ...prevState,
        contrasena: prevState.matricula
      }));
    }
  }, [formValues.matricula]);

  useEffect(() => {
    if (
      formValues.carrera &&
      formValues.semestre &&
      listaCarreras.length > 0 &&
      listaSemestres.length > 0
    ) {
      const carreraSeleccionada = listaCarreras.find(c => c.id.toString() === formValues.carrera.toString());
      const semestreSeleccionado = listaSemestres.find(s => s.id.toString() === formValues.semestre.toString());
  
      console.log("Carrera seleccionada: ", carreraSeleccionada.id);
      console.log("Semestre seleccionado: ", semestreSeleccionado);
  
      if (carreraSeleccionada && semestreSeleccionado) {
        grupoService.getByCarreraAndSemestre(carreraSeleccionada.id, semestreSeleccionado.id)
          .then(grupo => {
            console.log("Respuesta del servidor (grupo):", grupo);
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
      if (name === 'nombre' || name === 'apellido') {
        const primerNombre = updatedForm.nombre.split(' ')[0] || '';
        const primerApellido = updatedForm.apellido.split(' ')[0] || '';
        if (primerNombre && primerApellido) {
          updatedForm.usuario = `${primerNombre.toLowerCase()}.${primerApellido.toLowerCase()}`;
        }
      }

      console.log("Valores actualizados en handleChange:", updatedForm);
      return updatedForm;
    });
    validateField(name, value);
  };


  const validateField = (name, value) => {
    let error = '';
    const requiredFields = ['nombre', 'apellido', 'curp', 'correo', 'telefono',
      'matricula', 'carrera', 'semestre', 'sexo'];

    // Validación de campos requeridos
    if (requiredFields.includes(name) && !value.trim()) {
      error = 'Este campo es obligatorio';
    }


    // Validaciones específicas
    switch (name) {
      case 'nombre':
      case 'apellido':
        if (value.length > 30) error = 'Máximo 30 caracteres';
        break;

      case 'curp': {
        // CURP: 18 caracteres bien formados
        const curpRegex = /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\d$/;
        if (!curpRegex.test(value.toUpperCase())) {
          error = 'Formato CURP inválido';
        }
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
        if (!/^\d+$/.test(value))
          error = 'Solo se permiten números';
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

  const mostrarAlerta = (config) => {
    Swal.fire({
      ...config,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: true, // Asegura que el botón "OK" se muestre
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
        title: 'Error de validación',
        text: 'Por favor verifica todos los campos'
      });
      return;
    }

    try {

      const carreraSeleccionada = listaCarreras.find(c => c.id.toString() === formValues.carrera.toString());
      const semestreSeleccionado = listaSemestres.find(s => s.id.toString() === formValues.semestre.toString());
      const sexoSeleccionado = listaSexo.find(s => s.nombreSexo === formValues.sexo);
    
      const alumnoPayload = {
        nombre: formValues.nombre.trim(),
        apellido: formValues.apellido.trim(),
        curp: formValues.curp.trim().toUpperCase(),
        correo: formValues.correo.trim(),
        telefono: formValues.telefono.trim(),
        matricula: formValues.matricula.trim(),
        semestre: semestreSeleccionado ? semestreSeleccionado.id : null,  
        carrera: carreraSeleccionada ? carreraSeleccionada.id : null, 
        sexo: sexoSeleccionado ?  sexoSeleccionado.id : null,
        grupo: formValues.grupo.id,
        usuario: formValues.usuario,
        contrasenia: formValues.contrasena,
        estatus: 'Activo',
        idCatRol: 1
      };

      console.log("Alumno payload antes de enviar:", alumnoPayload);

      const alumnoCreado = await alumnoService.create(alumnoPayload);

      if (!alumnoCreado?.id) {
        throw new Error('No se obtuvo el ID del alumno creado');
      }

      // 5. Éxito
      mostrarAlerta({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Alumno y usuario creados correctamente',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });

      setFormValues(initialForm); // Reset form after success
    } catch (err) {
      console.error(err);
      mostrarAlerta({
        icon: 'error',
        title: 'Error al registrar',
        text: err.message || 'No se pudo completar el registro.'
      });
    }
  };


  return (
    <div className="mb-5">
      <h2 className="size-font-title cardMenu-title m-5 text-center">Agregar alumno</h2>

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

            <div>
              <label className="formulario-etiqueta">
                Apellido(s) <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="apellido"
                className={`formulario-entrada ${errors.apellido ? 'is-invalid' : ''}`}
                placeholder="Ingrese el apellido"
                value={formValues.apellido}
                onChange={handleChange}
                maxLength={30}
              />
              {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
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

            <div className="col-md-6">
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
                {listaSexo.map(s => (
                  <option key={s.id} value={s.nombreSexo}>
                    {s.nombreSexo}
                  </option>
                ))}
              </select>
              {errors.sexo && <div className="invalid-feedback">{errors.sexo}</div>}
            </div>

            <div className="col-md-6">
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
                className="formulario-entrada"
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
                onChange={handleChange}
              />
              {errors.matricula && <div className="invalid-feedback">{errors.matricula}</div>}
            </div>

            <h2 className="texto-morado2">Datos de la plataforma</h2>

            <div className="col-md-6">
              <label className="formulario-etiqueta">Usuario</label>
              <input
                type="text"
                name="usuario"
                className="formulario-entrada"
                value={formValues.usuario}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label className="formulario-etiqueta">Contraseña</label>
              <input
                type="text"
                name="contrasena"
                className="formulario-entrada"
                value={formValues.contrasena}
                readOnly
              />
            </div>


            <div className="d-flex justify-content-center gap-3">
              <button type="submit" className="btn-agregar">
                Registrar Alumno
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>

  );
});

export default AlumnoRegistro;
