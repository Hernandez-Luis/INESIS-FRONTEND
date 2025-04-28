import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import '../components/AdministrarAlumnos.css';
import carreraService from '../../../services/CatCarreraService';
import semestreService from '../../../services/CatSemestreService';
import sexoService from '../../../services/CatSexoService';
import grupoService from '../../../services/CatGrupoService';
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
        contraseña: prevState.matricula
      }));
    }
  }, [formValues.matricula]);

  useEffect(() => {
    if (formValues.carrera && formValues.semestre) {
      const carreraSeleccionada = listaCarreras.find(c => c.nombreCarrera === formValues.carrera);
      const semestreSeleccionado = listaSemestres.find(s => s.nombreSemestre === formValues.semestre);

      if (carreraSeleccionada && semestreSeleccionado) {
        grupoService.getByCarreraAndSemestre(carreraSeleccionada.id, semestreSeleccionado.id)
          .then(grupos => {

            setFormValues(prev => ({
              ...prev,
              grupo: grupos // 👈 Ahora sí asignamos el valor al campo correcto
            }));


          })
          .catch(error => {
            console.error('Error al obtener los grupos:', error);
            setFormValues(prev => ({
              ...prev,
              grupo: 'Error al cargar grupos'
            }));
          });
      }
    }
  }, [formValues.carrera, formValues.semestre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

      // Generar contraseña automáticamente
      if (name === 'curp') {
        updatedForm.contrasena = value.slice(0, 10); // Puedes ajustar qué parte quieres usar de la CURP
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
      case 'curp':
        if (!/^[A-Z]{4}\d{6}[A-Z]{6}\d{2}$/.test(value))
          error = 'Formato CURP inválido';
        break;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAllFields()) {
      mostrarAlerta({
        icon: 'info',
        title: 'Error de validación',
        text: 'Por favor verifica todos los campos'
      });
      return;
    }

    mostrarAlerta({
      icon: 'success',
      title: 'Alumno registrado correctamente'
    });
    setFormValues(initialForm);
  };

  useImperativeHandle(ref, () => ({
    getValues: () => {
      if (!validateAllFields()) {
        throw new Error("Errores en el formulario");
      }
      return formValues;
    }
  }));

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
                className={`formulario-entrada formulario-seleccion ${errors.carrera ? 'is-invalid' : ''}`}
                value={formValues.carrera}
                onChange={handleChange}
              >
                <option value="">Selecciona una carrera</option>
                {listaCarreras.map(c => (
                  <option key={c.id} value={c.nombreCarrera}>
                    {c.nombreCarrera}
                  </option>
                ))}
              </select>
              {errors.carrera && <div className="invalid-feedback">{errors.carrera}</div>}
            </div>

            <div className="col-md-6">
              <label className="formulario-etiqueta">
                Semestre <span className="text-danger">*</span>
              </label>
              <select
                name="semestre"
                className={`formulario-entrada formulario-seleccion ${errors.semestre ? 'is-invalid' : ''}`}
                value={formValues.semestre}
                onChange={handleChange}
              >
                <option value="">Selecciona un semestre</option>
                {listaSemestres.map(s => (
                  <option key={s.id} value={s.nombreSemestre}>
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
                value={formValues.grupo}
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
                value={formValues.contraseña}
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
