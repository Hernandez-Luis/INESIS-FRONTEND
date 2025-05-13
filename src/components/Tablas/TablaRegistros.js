import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../pages/Alumno/components/AdministrarAlumnos.css';
import noDatosIcon from '../../assets/sin-datos.png';
import ModalRegistrarFecha from '../../pages/Fechas/components/ModalRegistrarFechas';
import { Table } from 'react-bootstrap';

const TablaRegistros = ({ data, titulos, columns, nombreData, subTitulo, rutaBoton,onEdit,onDelete }) => {
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina, setElementosPorPagina] = useState(8);
    const [datosFiltrados, setDatosFiltrados] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    const handleAbrirModal = () => setMostrarModal(true);
    const handleCerrarModal = () => setMostrarModal(false);

    useEffect(() => {
        setCargando(true); // empieza cargando
        const timeout = setTimeout(() => {
            let filtrados = data;
            if (busqueda) {
                filtrados = data.filter(item =>
                    Object.values(item).some(valor =>
                        String(valor).toLowerCase().includes(busqueda.toLowerCase())
                    )
                );
            }
            setDatosFiltrados(filtrados);
            setPaginaActual(1);
            setCargando(false); // termina carga
        }, 500); // simula un retraso de 500ms

        return () => clearTimeout(timeout);
    }, [busqueda, data]);

    const totalPaginas = Math.ceil(datosFiltrados.length / elementosPorPagina);
    const datosPaginados = datosFiltrados.slice((paginaActual - 1) * elementosPorPagina, paginaActual * elementosPorPagina);

    const handleChangeElementos = (e) => {
        setElementosPorPagina(Number(e.target.value));
        setPaginaActual(1);
    };

    return (
        <div className="container my-1 w-75 mx-auto mb-5">
            <div className="mb-4 text-center">
                <h2 className="size-font-title cardMenu-title">{`Administrar ${nombreData}`}</h2>
            </div>

            <div className="mb-5 text-center">
                <h5 className="size-font-subtitle texto-morado2Normal">{`${subTitulo}`}</h5>
            </div>

            <button
                className="btn btn-primary btn-agregar"
                onClick={nombreData === "fechas" ? handleAbrirModal : () => navigate(`${rutaBoton}`)}
            >
                <i className="bi bi-person-add me-2"></i>
                Agregar {nombreData}
            </button>

            {/* Filtros */}
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
                <Table className="table align-middle custom-table">
                    <thead>
                        <tr className="table-header">
                            <th className="celda-icono">Acciones</th>
                            {columns.map((column, index) => (
                                <th key={index}>{column.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cargando ? (
                            <tr>
                                <td colSpan={titulos.length + 1} className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : datosPaginados.length === 0 ? (
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
                                        <button className="boton-icono" title="Eliminar"  onClick={() => onDelete(1)}>
                                            <i className="bi bi-trash3 icono-basura"></i>
                                        </button>
                                        <button className="boton-icono" title="Editar" onClick={() => onEdit(1)}>
                                            <i className="bi bi-pencil-square icono-editar"></i>
                                        </button>
                                    </td>
                                    {Object.values(registro).map((valor, i) => (
                                        <td key={i} className={i === 0 ? "fw-semibold matricula" : ""}>
                                            {typeof valor === 'object' && valor !== null
                                                ? valor.nombreCarrera || valor.nombre || JSON.stringify(valor)
                                                : valor}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            <div className="row mb-3">
                <div className="col-md-12 text-center">
                    <span className="texto-gris2">
                        Total de registros: {datosFiltrados.length}
                    </span>
                </div>
            </div>

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

            {nombreData === "fechas" && (
                <ModalRegistrarFecha
                    show={mostrarModal}
                    handleClose={handleCerrarModal}
                    carreras={["Ingeniería en Software", "Administración", "Contaduría"]}
                    onSubmit={(datos) => console.log("Datos registrados:", datos)}
                />
            )}
        </div>
    );
};

export default TablaRegistros;
