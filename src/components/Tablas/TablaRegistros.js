import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Table } from 'react-bootstrap';
import '../../pages/Alumno/components/AdministrarAlumnos.css';
import noDatosIcon from '../../assets/sin-datos.png';
import ModalRegistrarFecha from '../../pages/Fechas/components/ModalRegistrarFechas';
import Swal from 'sweetalert2';

const TablaRegistros = ({
    data = [],
    columns = [],
    nombreData = '',
    subTitulo = '',
    rutaBoton = '',
    onEdit = () => { },
    onDelete = () => { },
    onFechaAgregada
}) => {
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina, setElementosPorPagina] = useState(8);
    const [datosFiltrados, setDatosFiltrados] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    const handleAbrirModal = () => setMostrarModal(true);
    const handleCerrarModal = () => setMostrarModal(false);

    const obtenerValorPorAccessor = (obj, accessor) => {
        return accessor.split('.').reduce((valor, clave) => valor?.[clave], obj);
    };

    const filtrarDatos = () => {
        if (!busqueda.trim()) return data;
        const busquedaLower = busqueda.toLowerCase();

        return data.filter(item =>
            columns.some(col => {
                const valor = obtenerValorPorAccessor(item, col.accessor);
                return String(valor ?? '')
                    .toLowerCase()
                    .includes(busquedaLower);
            })
        );
    };

    useEffect(() => {
        setCargando(true);
        const timeout = setTimeout(() => {
            const filtrados = filtrarDatos();
            setDatosFiltrados(filtrados);
            setPaginaActual(1);
            setCargando(false);
        }, 300);

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
                <h2 className="size-font-title cardMenu-title">Administrar {nombreData}</h2>
            </div>

            <div className="mb-5 text-center">
                <h5 className="size-font-subtitle texto-morado2Normal">{subTitulo}</h5>
            </div>

            <button
                className="btn btn-primary btn-agregar"
                onClick={nombreData === "fechas" ? handleAbrirModal : () => navigate(rutaBoton)}
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
                            value={elementosPorPagina}
                        >
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={20}>20</option>
                        </select>
                        <span className="ms-2 texto-morado2">{nombreData}</span>
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
                                <td colSpan={columns.length + 1} className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : datosPaginados.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center py-3">
                                    <span className="fs-5 texto-gris2 d-block mt-2 mb-3">No existen registros</span>
                                    <img src={noDatosIcon} alt="No hay datos" className="img-fluid" style={{ width: '80px' }} />
                                </td>
                            </tr>
                        ) : (
                            datosPaginados.map((registro, index) => (
                                <tr key={index} className="fila-tabla">
                                    <td className="celda-icono">
                                        <button className="boton-icono" title="Eliminar" onClick={() => onDelete(registro)}>
                                            <i className="bi bi-trash3 icono-basura"></i>
                                        </button>
                                        <button className="boton-icono" title="Editar" onClick={() => onEdit(registro)}>
                                            <i className="bi bi-pencil-square icono-editar"></i>
                                        </button>
                                    </td>
                                    {columns.map((col, i) => {
                                        const valor = obtenerValorPorAccessor(registro, col.accessor);

                                        return (
                                            <td key={i} className={i === 0 ? "fw-semibold matricula" : ""}>

                                                {/* Si la columna tiene un Cell personalizado, úsalo */}
                                                {col.Cell
                                                    ? col.Cell({ row: { original: registro } })
                                                    : (typeof valor === 'object' && valor !== null
                                                        ? JSON.stringify(valor)
                                                        : valor)
                                                }
                                            </td>
                                        );
                                    })}

                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            <div className="row mb-3">
                <div className="col-md-12 text-center">
                    <span className="texto-gris2">Total de registros: {datosFiltrados.length}</span>
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
                    onSubmit={(datos) => {
                        onFechaAgregada();
                        Swal.fire({
                            icon: 'success',
                            title: 'Fecha registrada',
                            text: 'La fecha fue registrada correctamente.',
                            confirmButtonColor: '#6f42c1',
                            timer: 2000,
                            timerProgressBar: true
                        }).then(() => {
                            handleCerrarModal(); // Cierra el modal después del mensaje
                        });
                    }}

                />

            )}
        </div>
    );
};

export default TablaRegistros;
