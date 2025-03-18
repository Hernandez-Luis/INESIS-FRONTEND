import React from 'react';
import '../components/AdministrarAlumnos.css';

const AlumnoRegistro = () => {
    return (

        <div className="mb-5 ">
            <h2 className="size-font-title cardMenu-title m-5 text-center">Agregar alumno</h2>

            <div className="agregar-alumno-container m-5">
                {/* Sección Datos Personales */}
                <section className="formulario-seccion formulario-seccion--datos-personales mb-5">
                    <h2 className="texto-morado2 mb-4">Datos personales</h2>
                    <div className="row g-4">
                        <div >
                            <label className="formulario-etiqueta">Nombre(s)</label>
                            <input
                                type="text"
                                className="formulario-entrada"
                                placeholder="Ingrese el nombre"
                            />
                        </div>
                        <div >
                            <label className="formulario-etiqueta">Apellido(s)</label>
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
                <section className="formulario-seccion formulario-seccion--datos-academicos mb-5">
                    <h2 className="texto-morado2 mb-4">Datos académicos</h2>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="formulario-etiqueta">Carrera</label>
                            <select className="formulario-entrada formulario-seleccion">
                                <option>Elige una carrera</option>
                                <option>Lic. Informática</option>
                                <option>Ing. Forestal</option>
                                <option>Lic. Biología</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="formulario-etiqueta">Semestre</label>
                            <select className="formulario-entrada formulario-seleccion">
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
                                placeholder="Ingrese el grupo"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="formulario-etiqueta">Matrícula</label>
                            <input
                                type="text"
                                className="formulario-entrada"
                                placeholder="Ingrese la matrícula académica"
                            />
                        </div>
                    </div>
                </section>

                {/* Botón Agregar */}
                {/* <div className="d-flex justify-content-end">
                <button className="btn-agregar">
                    Agregar
                </button>
            </div>*/}
            </div>

        </div>
    );
};

export default AlumnoRegistro;
