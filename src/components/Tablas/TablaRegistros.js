import React, { useState } from 'react';
import '../../pages/Alumno/components/AdministrarAlumnos.css';

const TablaRegistros = ({ data, titulos }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const totalItems = 20;

    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

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
                        <span className="me-4 texto-morado2">Buscar:</span>
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
            {/* Pie de tabla */}
            <div className="d-flex justify-content-between align-items-center mt-3 px-2">
                <span className="texto-morado2">
                    Mostrando {startIndex} a {endIndex} de {totalItems} solicitudes
                </span>
                
                <div className="d-flex align-items-center">
                    <button 
                        className="btn btn-sm texto-morado2 pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <span className="mx-3 texto-morado2">Página {currentPage}</span>
                    <button 
                        className="btn btn-sm texto-morado2 pagination-btn"
                        disabled={endIndex >= totalItems}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TablaRegistros;