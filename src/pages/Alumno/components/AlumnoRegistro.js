import React, { useState } from 'react';
import '../components/AdministrarAlumnos.css';

const AlumnoRegistro = () => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [curp, setCurp] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [matricula, setMatricula] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  const [grupo, setGrupo] = useState('');

  // Estados para los errores
  const [errores, setErrores] = useState({});

  // Validaciones
  const validarNombreApellido = (valor) => valor.length <= 30;
  const validarCurp = (valor) => /^[A-Z]{4}\d{6}[A-Z]{6}\d{2}$/.test(valor);
  const validarCorreo = (valor) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor);
  const validarTelefono = (valor) => /^\d{10}$/.test(valor);
  const validarMatricula = (valor) => /^\d+$/.test(valor);

  // Función para manejar el envío del formulario
  const manejarEnvio = (e) => {
    e.preventDefault();
    
    const erroresTemp = {};

    // Validar cada campo
    if (!validarNombreApellido(nombre)) erroresTemp.nombre = 'El nombre no debe exceder 30 caracteres';
    if (!validarNombreApellido(apellido)) erroresTemp.apellido = 'El apellido no debe exceder 30 caracteres';
    if (!validarCurp(curp)) erroresTemp.curp = 'CURP no válida';
    if (!validarCorreo(correo)) erroresTemp.correo = 'Correo electrónico no válido';
    if (!validarTelefono(telefono)) erroresTemp.telefono = 'Teléfono debe tener 10 dígitos';
    if (!validarMatricula(matricula)) erroresTemp.matricula = 'La matrícula debe ser solo números';

    setErrores(erroresTemp);

    if (Object.keys(erroresTemp).length === 0) {
      // Aquí se puede realizar la acción de enviar el formulario (por ejemplo, llamar a un API)
      console.log('Formulario enviado');
    }
  };

  // Actualización del grupo según la carrera y semestre
  const actualizarGrupo = () => {
    // Lógica para obtener el grupo según la carrera y semestre seleccionados (ejemplo)
    if (carrera && semestre) {
      setGrupo(`Grupo ${carrera}-${semestre}`);
    }
  };

  // Actualizar el grupo cada vez que se cambian la carrera o semestre
  React.useEffect(() => {
    actualizarGrupo();
  }, [carrera, semestre]);

  return (
    <div className="mb-5">
      <h2 className="size-font-title cardMenu-title m-5 text-center">Agregar alumno</h2>

      <div className="agregar-alumno-container m-5">
        {/* Sección Datos Personales */}
        <section className="formulario-seccion formulario-seccion--datos-personales mb-5">
          <h2 className="texto-morado2 mb-4">Datos personales</h2>
          <div className="row g-4">
            <div>
              <label className="formulario-etiqueta">Nombre(s)</label>
              <input
                type="text"
                className="formulario-entrada"
                placeholder="Ingrese el nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
            </div>
            <div>
              <label className="formulario-etiqueta">Apellido(s)</label>
              <input
                type="text"
                className="formulario-entrada"
                placeholder="Ingrese el apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
              {errores.apellido && <small className="text-danger">{errores.apellido}</small>}
            </div>
            <div>
              <label className="formulario-etiqueta">CURP</label>
              <input
                type="text"
                className="formulario-entrada"
                placeholder="Ingrese la CURP"
                value={curp}
                onChange={(e) => setCurp(e.target.value)}
              />
              {errores.curp && <small className="text-danger">{errores.curp}</small>}
            </div>
            <div className="col-md-6">
              <label className="formulario-etiqueta">Correo electrónico</label>
              <input
                type="email"
                className="formulario-entrada"
                placeholder="Ingrese el correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              {errores.correo && <small className="text-danger">{errores.correo}</small>}
            </div>
            <div className="col-md-6">
              <label className="formulario-etiqueta">Número telefónico</label>
              <input
                type="tel"
                className="formulario-entrada"
                placeholder="Ingrese el teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              {errores.telefono && <small className="text-danger">{errores.telefono}</small>}
            </div>
          </div>
        </section>

        {/* Sección Datos Académicos */}
        <section className="formulario-seccion formulario-seccion--datos-academicos">
          <h2 className="texto-morado2 mb-4">Datos académicos</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <label className="formulario-etiqueta">Carrera</label>
              <select
                className="formulario-entrada formulario-seleccion"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
              >
                <option>Elige una carrera</option>
                <option>Lic. Informática</option>
                <option>Ing. Forestal</option>
                <option>Lic. Biología</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="formulario-etiqueta">Semestre</label>
              <select
                className="formulario-entrada formulario-seleccion"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
              >
                <option>Elige un semestre</option>
                <option>Primero</option>
                <option>Segundo</option>
                <option>Tercero</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="formulario-etiqueta">Grupo</label>
              <input
                type="text"
                className="formulario-entrada"
                placeholder="Grupo asignado"
                value={grupo}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="formulario-etiqueta">Matrícula</label>
              <input
                type="text"
                className="formulario-entrada"
                placeholder="Ingrese la matrícula académica"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />
              {errores.matricula && <small className="text-danger">{errores.matricula}</small>}
            </div>
          
          </div>
          
        </section>
        <div className="col-10">
              <div className="d-flex justify-content-end gap-3">
                <button 
                  className="btn-agregar"
                  onClick={manejarEnvio}>
                  Agregar
                </button>
              </div>
            </div>
       
      </div>
       {/* Botón Agregar */}
       <div className="d-flex justify-content-end">
          <button className="btn-agregar" onClick={manejarEnvio}>
            Agregar
          </button>
        </div>
    </div>
  );
};

export default AlumnoRegistro;
