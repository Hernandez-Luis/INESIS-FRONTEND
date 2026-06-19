
/**
 * ============================================================================
 * MÓDULO: AdministrarFechas.jsx
 * DESCRIPCIÓN:
 * Componente de página para administrar fechas de inicio y cierre de procesos
 * de registro de alumnos por carrera.
 *
 * FUNCIONALIDADES:
 * - Visualización de fechas registradas por carrera con formateo de datos.
 * - Cálculo automático de estados (PRÓXIMO, ACTIVO, FINALIZADO).
 * - Edición de fechas existentes con opción de reiniciar proceso.
 * - Eliminación de registros de fechas.
 * - Ordenamiento de fechas por fecha final.
 *
 * DEPENDENCIAS:
 * - React (hooks: useState, useEffect)
 * - dayjs (formateo y cálculos de fechas)
 * - SweetAlert2
 * - FechasRegistradasService
 * - NavInesis, MigasRecorrido, FooterInesis, TablaRegistros
 * - ModalRegistrarFecha
 *
 * AUTOR: Nayeli Velasco López
 * PROYECTO: INESIS (Sistema de Información Socioeconómica)
 * FECHA DE CREACIÓN: 9 de marzo de 2025
 * ÚLTIMA MODIFICACIÓN: 19 de marzo de 2026
 * ============================================================================
 */

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

    // ========== FUNCIÓN: EDITAR FECHA ==========
    // Abre el modal en modo edición con los datos de la fecha seleccionada
    const handleEditar = (fecha) => {
        setFechaEditar(fecha);
        setShowModal(true);
    };

    // ========== FUNCIÓN: ELIMINAR FECHA ==========
    // Muestra confirmación y elimina la fecha si el usuario lo confirma
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

    // ========== CONFIGURACIÓN DE COLUMNAS ==========
    // Define las columnas a mostrar en la tabla con formateo especial para estado
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

    // Hook de ciclo de vida: obtiene todas las fechas al montar el componente
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

    const hoy = dayjs();

    const formattedData = fechas
        .map(fecha => {
            // Convierte las fechas de string a objetos dayjs
            const fechaInicio = dayjs(fecha.fechaInicio);
            const fechaFin = dayjs(fecha.fechaFin);

            // Formatea las fechas al formato DD/MM/YYYY
            const fechaInicioFormateada = fechaInicio.format('DD/MM/YYYY');
            const fechaFinFormateada = fechaFin.format('DD/MM/YYYY');

            let estatusPrincipal = "";
            let estatusSecundario = "";
            let claseColor = "";

            // ========== LÓGICA DE ESTADOS ==========
            // AÚN NO INICIA: Si la fecha de hoy es anterior a la fecha de inicio
            if (hoy.isBefore(fechaInicio)) {
                const diasFaltantes = fechaInicio.diff(hoy, 'day') + 1;

                estatusPrincipal = "PRÓXIMO";
                estatusSecundario = `(Inicia en ${diasFaltantes} días)`;
                claseColor = "texto-azul";
            }
            //  ACTIVO
            else if (fecha.active) {
                estatusPrincipal = "ACTIVO";
                estatusSecundario = `(Quedan ${fecha.restante + 1} días)`;
                claseColor = fecha.restante < 3 ? "texto-naranja" : "texto-verde";
            }
            // FINALIZADO
            else {
                estatusPrincipal = "FINALIZADO";
                estatusSecundario = "";
                claseColor = "texto-rojo";
            }

            // Retorna el objeto fecha enriquecido con datos procesados
            return {
                ...fecha,
                fechaInicioFormateada,
                fechaFinFormateada,
                estatusPrincipal,
                estatusSecundario,
                claseColor
            };
        })
        .sort((a, b) => {
            const fechaA = dayjs(a.fechaFin);
            const fechaB = dayjs(b.fechaFin);
            return fechaA - fechaB;
        });

    // ========== FUNCIÓN: RECARGAR FECHAS ==========
    // Obtiene nuevamente todas las fechas del backend
    // Se ejecuta después de crear, editar o eliminar una fecha
    const recargarFechas = async () => {
        try {
            const data = await fechasRegistradasService.getAll();
            setFechas(data);
        } catch (err) {
            setError(err.message || "Error al obtener fechas");
        }
    };

    // ========== RENDERIZADO ==========
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

            {/* Modal para registrar nueva fecha o editar existente */}
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

// Exporta el componente para que pueda ser usado en las rutas de la aplicación
export default AdministrarFechas;
