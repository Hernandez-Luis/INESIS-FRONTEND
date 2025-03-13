import React from 'react';
import '../components/AdministrarAlumnos.css';

const TablaRegistros = ({ data, titulos }) => {
    return (
        <div>
            {/* Filtros y búsqueda */}
            <div className="row mb-5 align-items-center">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="d-flex align-items-center filtro-container">
                        <span className="me-2 texto-morado2">Mostrar</span>
                        <select className="form-select form-select-sm select-mostrar texto-morado2">
                            <option >8</option>
                            <option>15</option>
                            <option>30</option>
                        </select>
                        <span className="ms-2 texto-morado2">Alumnos</span>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="input-group buscador-container">
                        <span className="me-4 texto-morado2">Buscar</span>
                        <input
                            type="text"
                            className="form-control form-control-sm input-buscar"
                            placeholder="Buscar..."
                        />
                    </div>
                </div>
            </div>

            {/* Tabla */}
            <div className="table-responsive custom-table-container">
                <table className="table align-middle custom-table">
                    <thead>
                        <tr className="table-header">
                            <th className="celda-icono">Acciones</th>
                            {titulos.map((titulo, index) => (
                                <th key={index} className="titulo-columna">{titulo}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((registro, index) => (
                            <tr key={index} className="fila-tabla">
                                <td className="celda-icono">
                                <button className="boton-icono me-5"title="Eliminar">
                                        <i className="bi bi-trash3 icono-basura"></i>
                                    </button>
                                    <button className="boton-icono "  title="Editar">
                                        <i className="bi bi-pencil-square icono-editar"></i>
                                    </button>
                                    
                                </td>
                                {Object.values(registro).map((valor, i) => (
                                    <td key={i + 2} className={i === 0 ? "fw-semibold matricula" : ""}>{valor}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaRegistros;