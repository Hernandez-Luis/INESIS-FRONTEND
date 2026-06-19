/**
 * ============================================================================
 * MÓDULO: AdministrarRevisor.jsx
 * DESCRIPCIÓN:
 * Página para gestionar los revisores: listar, editar y eliminar.
 * Utiliza `TablaRegistros` para mostrar los datos y provee callbacks
 * para acciones sobre cada fila.
 *
 * FUNCIONALIDADES:
 * - Obtención de revisores desde el backend.
 * - Preparación del campo `nombreCompleto` para visualización.
 * - Edición y eliminación con confirmaciones.
 *
 * DEPENDENCIAS:
 * - React
 * - React Router
 * - TablaRegistros
 * - RevisorService
 * - SweetAlert2
 *
 * AUTOR: Nayeli Velasco López
 * PROYECTO: INESIS (Sistema de Información Socioeconómica)
 * FECHA DE CREACIÓN: 9 de marzo de 2025
 * ÚLTIMA MODIFICACIÓN: 15 de abril de 2026
 * ============================================================================
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import 'bootstrap-icons/font/bootstrap-icons.css';
import revisorService from '../../services/RevisorService';
import Swal from 'sweetalert2';
import '../Alumno/components/AdministrarAlumnos.css';

const AdministrarRevisor = () => {
    // Estado que contiene la lista de revisores cargada desde el backend
    const [revisores, setRevisores] = useState([]);
    const navigate = useNavigate();

    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
        { url: '/AdministrarRevisor', label: 'Revisores' }
    ];

    // Carga inicial de datos al montar el componente
    useEffect(() => {
        const fetchRevisores = async () => {
            try {
                const data = await revisorService.getAll();
                const revisoresConNombreCompleto = data.map(r => ({
                    ...r,
                    nombreCompleto: r.nombre && r.apellidoPaterno && r.apellidoMaterno
                        ? `${r.nombre} ${r.apellidoPaterno} ${r.apellidoMaterno}`
                        : r.nombre || '' 
                }));
                setRevisores(revisoresConNombreCompleto);
            } catch (error) {
                console.error("Error al cargar revisores:", error);
            }
        };

        fetchRevisores();
    }, []);

    // Columnas para la tabla: definir cabeceras y accesores al objeto
    const columns = [
        { header: 'Numero de Empleado', accessor: 'matricula' },
        { header: 'Nombre completo', accessor: 'nombreCompleto' },
        { header: "Departamento", accessor: "departamento" },
    ];

    const nombreData = "revisor";
    const subTitulo = "Gestión de los revisores del estudio socioeconómico";
    const rutaBoton = "/AgregarRevisor";

    // Navega al formulario de edición pasando el revisor como estado
    const editarRevisor = (revisor) => {
        navigate('/AgregarRevisor', { state: { revisor } });
    };

    // Elimina un revisor con confirmación mediante SweetAlert2
    const eliminarRevisor = async (revisor) => {
        const result = await Swal.fire({
            title: `¿Eliminar a ${revisor.nombreCompleto || revisor.nombre}?`,
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await revisorService.deleteRevisor(revisor.id);
                setRevisores(prev => prev.filter(r => r.id !== revisor.id));
                Swal.fire('Eliminado', 'El revisor fue eliminado correctamente', 'success');
            } catch (error) {
                console.error("Error al eliminar:", error);
                Swal.fire('Error', 'No se pudo eliminar el revisor', 'error');
            }
        }
    };

    // Renderiza la página con la tabla y pie de página
    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <TablaRegistros
                data={revisores}
                columns={columns}
                nombreData={nombreData}
                subTitulo={subTitulo}
                rutaBoton={rutaBoton}
                onEdit={editarRevisor}
                onDelete={eliminarRevisor}
            />
            <FooterInesis />
        </div>
    );
};

export default AdministrarRevisor;
