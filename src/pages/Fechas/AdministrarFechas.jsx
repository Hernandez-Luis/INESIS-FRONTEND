import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import fechasRegistradasService from '../../services/FechasRegistradasService';
import ModalRegistrarFecha from './components/ModalRegistrarFechas';
import Swal from 'sweetalert2';
//import '../Fechas/components/AdministrarFechas.css';
import './components/AdministrarFechas.css';

const AdministrarFechas = () => {

    const [fechas, setFechas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [fechaEditar, setFechaEditar] = useState(null);
    const nombreData = "fechas";
    const subTitulo = "Se asignan fechas por carrera para  abrir y cerrar la encuesta";

    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
        { url: '/AdministrarFechas', label: 'Fechas' }
    ];

    const handleEditar = (fecha) => {
        setFechaEditar(fecha);
        setShowModal(true);
    };

    const handleEliminar = async (fecha) => {
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar las fechas para la carrera "${fecha.carrera.nombreCarrera}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacion.isConfirmed) {
            try {
                await fechasRegistradasService.deleteFecha(fecha.id);
                Swal.fire('Eliminado', 'La fecha ha sido eliminada correctamente.', 'success');
                recargarFechas();
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Hubo un problema al eliminar la fecha.', 'error');
            }
        }
    };

    // Configuración de columnas
    const columns = [
        { header: 'Carrera', accessor: 'carrera.nombreCarrera' },
        { header: 'Fecha inicial', accessor: 'fechaInicioFormateada' },
        { header: 'Fecha final', accessor: 'fechaFinFormateada' },
        {
            header: 'Estatus',
            accessor: 'estatusPrincipal',
            Cell: ({ row }) => (
                <div className={row.original.claseColor} style={{ display: "flex", flexDirection: "column" }}>

                    {/* Texto principal en negrita */}
                    <span style={{ fontWeight: "bold" }}>
                        {row.original.estatusPrincipal}
                    </span>

                    {/* Texto secundario fino y más pequeño */}
                    {row.original.estatusSecundario && (
                        <span style={{ fontSize: "0.85rem", fontWeight: 400 }}>
                            {row.original.estatusSecundario}
                        </span>
                    )}
                </div>
            )

        },
    ];

    useEffect(() => {
        const fetchFechas = async () => {
            try {
                const data = await fechasRegistradasService.getAll();
                setFechas(data);
            } catch (err) {
                setError(err.message || "Error al obtener fechas");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFechas();
    }, []);

    // Formatear datos + ordenar por fecha final próxima
    const formattedData = fechas
        .map(fecha => {
            const fechaInicioFormateada = dayjs(fecha.fechaInicio).format('DD/MM/YYYY');
            const fechaFinFormateada = dayjs(fecha.fechaFin).format('DD/MM/YYYY');

            let estatusTexto = '';
            let claseColor = '';
            let estatusPrincipal = "";
            let estatusSecundario = "";

            if (fecha.active) {
                estatusPrincipal = "ACTIVO";
                estatusSecundario = `(Quedan ${fecha.restante + 1} días)`;
                claseColor = fecha.restante < 3 ? "texto-naranja" : "texto-verde";
            } else {
                estatusPrincipal = "FINALIZADO";
                estatusSecundario = "";
                claseColor = "texto-rojo";
            }

            return {
                ...fecha,
                fechaInicioFormateada,
                fechaFinFormateada,
                estatusPrincipal,
                estatusSecundario,
                claseColor
            };

        })
        // 📌 Ordenar por la fecha más próxima a finalizar
        .sort((a, b) => {
            const fechaA = dayjs(a.fechaFin);
            const fechaB = dayjs(b.fechaFin);
            return fechaA - fechaB; // ascendente: primero la que está por terminar
        });

    const recargarFechas = async () => {
        try {
            const data = await fechasRegistradasService.getAll();
            setFechas(data);
        } catch (err) {
            setError(err.message || "Error al obtener fechas");
        }
    };

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />

            <TablaRegistros
                data={formattedData}
                columns={columns}
                nombreData={nombreData}
                subTitulo={subTitulo}
                onFechaAgregada={recargarFechas}
                onEdit={handleEditar}
                onDelete={handleEliminar}
            />

            <ModalRegistrarFecha
                show={showModal}
                handleClose={() => {
                    setShowModal(false);
                    setFechaEditar(null);
                }}
                onSubmit={recargarFechas}
                modoEdicion={!!fechaEditar}
                fechaEditar={fechaEditar}
            />

            <FooterInesis />
        </div>
    );
};

export default AdministrarFechas;
