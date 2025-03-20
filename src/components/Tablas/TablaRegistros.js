import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../pages/Alumno/components/AdministrarAlumnos.css';
import noDatosIcon from '../../assets/sin-datos.png';

const TablaRegistros = ({ data, titulos, nombreData }) => {
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina, setElementosPorPagina] = useState(8);
    const [datosFiltrados, setDatosFiltrados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let filtrados = data;
        if (busqueda) {
            filtrados = data.filter(item => {
                // Convertimos cada valor del item a string para hacer la comparación
                return Object.values(item).some(valor =>
                    String(valor).toLowerCase().includes(busqueda.toLowerCase())
                );
            });
        }
        setDatosFiltrados(filtrados);
        setPaginaActual(1); // Reiniciar a la primera página al filtrar
    }, [busqueda, data]);

    const totalPaginas = Math.ceil(datosFiltrados.length / elementosPorPagina);
    const datosPaginados = datosFiltrados.slice((paginaActual - 1) * elementosPorPagina, paginaActual * elementosPorPagina);

    const handleChangeElementos = (e) => {
        setElementosPorPagina(Number(e.target.value));
        setPaginaActual(1); // Reiniciar a la primera página cuando se cambie la cantidad de registros
    };

    return (
        <div className="container my-1 w-75 mx-auto">
            <div className="mb-5 text-center">
                <h2 className="size-font-title cardMenu-title">{`Administrar ${nombreData}`}</h2>
            </div>

            <button className="btn btn-primary btn-agregar" onClick={() => navigate("/AgregarRevisor")}>
                <i className="bi bi-person-add me-2"></i>
                Agregar {nombreData}
            </button>

            {/* Filtros y búsqueda */}
            <div className="row mb-5 align-items-center">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="d-flex align-items-center filtro-container">
                        <span className="me-2 texto-morado2">Mostrar</span>
                        <select
                            className="form-select form-select-sm select-mostrar texto-morado2"
                            onChange={handleChangeElementos}
                            value={elementosPorPagina}>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={20}>20</option>
                        </select>
                        <span className="ms-2 texto-morado2">{`${nombreData}`}</span>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="input-group buscador-container">
                        <span className="me-4 texto-morado2">Buscar:</span>
                        <input
                            type="text"
                            className="form-control form-control-sm input-buscar"
                            placeholder="Buscar..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                </div>
            </div>

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
                        {datosPaginados.length === 0 ? (
                            <tr>
                                <td colSpan={titulos.length + 1} className="text-center py-3">
                                    <span className="fs-5 texto-gris2 d-block mt-2 mb-3">No existen registros</span>
                                    <img src={noDatosIcon} alt="No hay datos" className="img-fluid" style={{ width: '80px' }} />
                                </td>
                            </tr>
                        ) : (
                            datosPaginados.map((registro, index) => (
                                <tr key={index} className="fila-tabla">
                                    <td className="celda-icono">
                                        <button className="boton-icono me-5" title="Eliminar">
                                            <i className="bi bi-trash3 icono-basura"></i>
                                        </button>
                                        <button className="boton-icono" title="Editar">
                                            <i className="bi bi-pencil-square icono-editar"></i>
                                        </button>
                                    </td>
                                    {Object.values(registro).map((valor, i) => (
                                        <td key={i} className={i === 0 ? "fw-semibold matricula" : ""}>{valor}</td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mostrar el total de registros debajo de la tabla */}
            <div className="row mb-3">
                <div className="col-md-12 text-center">
                    <span className="texto-gris2">
                        Total de registros: {datosFiltrados.length}
                    </span>
                </div>
            </div>

            {/* Paginación (se muestra solo si hay más de 8 registros) */}
            {datosFiltrados.length > elementosPorPagina && (
                <div className="pagination-container mb-4">
                    <button
                        className="pagination-btn"
                        onClick={() => setPaginaActual(p => Math.max(p - 1, 1))}
                        disabled={paginaActual === 1}
                    >
                        &#60;
                    </button>
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                            key={index}
                            className={`pagination-button ${paginaActual === index + 1 ? 'active' : ''}`}
                            onClick={() => setPaginaActual(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="pagination-btn"
                        onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))}
                        disabled={paginaActual === totalPaginas}
                    >
                        &#62;
                    </button>
                </div>
            )}
        </div>
    );
};

export default TablaRegistros;
