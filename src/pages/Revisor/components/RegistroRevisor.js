import React from 'react';
import '../../Alumno/components/AdministrarAlumnos.css';

const RegistroRevisor = () => {
    return (
        <div className="agregar-alumno-container">

            {/* Sección Datos Personales */}
            <section className="formulario-seccion formulario-seccion--datos-personales mb-2">
                <h2 className="texto-morado2 mb-4">Datos personales</h2>
                <div className="row g-4">
                    <div >
                        <label className="formulario-etiqueta">Nombre</label>
                        <inpuimport t
                            type="text"
                            className="formulario-entrada"
                            placeholder="Ingrese el nombre"
                        />
                    </div>
                    <div >
                        <label className="formulario-etiqueta">Apellido</label>
                        <input
                            type="text"
                            className="formulario-entrada"
                            placeholder="Ingrese el apellido"
                        />
                    </div>
                    <div >
                        <label className="formulario-etiqueta">CURP</label>
                        <input
                            type="text"
                            className="formulario-entrada"
                            placeholder="Ingrese la CURP"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="formulario-etiqueta">Correo electrónico</label>
                        <input
                            type="email"
                            className="formulario-entrada"
                            placeholder="Ingrese el correo"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="formulario-etiqueta">Número telefónico</label>
                        <input
                            type="tel"
                            className="formulario-entrada"
                            placeholder="Ingrese el teléfono"
                        />
                    </div>
                </div>
            </section>

            {/* Sección Datos Académicos */}
            <section className="formulario-seccion formulario-seccion--datos-academicos mb-2">
                <h2 className="texto-morado2 mb-4">Datos laborales</h2>
                <div className="row g-4">
                    <div className="col-md-6">
                        <label className="formulario-etiqueta">Areas</label>
                        <select className="formulario-entrada formulario-seleccion">
                            <option>Elige un area</option>
                            <option>Administrativo</option>
                            <option>Maestro investigador</option>
                            <option>Jefe de carrera</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="formulario-etiqueta">Departamento o cubo</label>
                        <select className="formulario-entrada formulario-seleccion">
                            <option>Elige una opción</option>
                            <option>Instituto de Ciencias Ambientales</option>
                            <option>Jefatura</option>
                            <option>Instituto de Idiomas</option>
                            <option>Cubo 123</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="formulario-etiqueta">NIP</label>
                        <input
                            type="text"
                            className="formulario-entrada"
                            placeholder="Ingrese su NIP"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="formulario-etiqueta">Matrícula</label>
                        <input
                            type="text"
                            className="formulario-entrada"
                            placeholder="Ingrese la matrícula "
                        />
                    </div>
                </div>
            </section>
            <div className="boton-contenedor">
                <button className="btn-agregar">
                    Agregar
                </button>
            </div>
        </div>
    );
};

export default RegistroRevisor;
