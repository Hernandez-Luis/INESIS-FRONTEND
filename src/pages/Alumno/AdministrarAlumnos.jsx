/**
 * ============================================================================
 * MÓDULO: AdministrarAlumnos.jsx
 * DESCRIPCIÓN:
 * Componente de página principal para administrar el listado de alumnos.
 * Gestiona la visualización, edición y eliminación de registros de estudiantes.
 *
 * FUNCIONALIDADES:
 * - Obtención y visualización de lista de alumnos desde el backend.
 * - Edición de datos de alumno existente.
 * - Eliminación de registros de alumno con confirmación.
 *
 * DEPENDENCIAS:
 * - React (hooks: useEffect, useState)
 * - React Router (useNavigate)
 * - Bootstrap Icons
 * - SweetAlert2
 * - AlumnoService
 * - NavInesis, MigasRecorrido, FooterInesis, TablaRegistros
 *
 * AUTOR: Nayeli Velasco López
 * PROYECTO: INESIS (Sistema de Información Socioeconómica)
 * FECHA DE CREACIÓN: 9 de marzo de 2025
 * ÚLTIMA MODIFICACIÓN: Julio 2025
 * ============================================================================
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import '../Alumno/components/AdministrarAlumnos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import alumnoService from '../../services/AlumnoService';
import Swal from 'sweetalert2';

const AdministrarAlumnos = () => {
    // Estado que almacena la lista de alumnos obtenidos del backend
    const [alumnos, setAlumnos] = useState([]);
    const navigate = useNavigate();

    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
        { url: '/AdministrarAlumnos', label: 'Alumnos' }
    ];

    // Hook de ciclo de vida: se ejecuta una sola vez al montar el componente
    // Obtiene la lista completa de alumnos del servicio
    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const data = await alumnoService.getAll();
                const alumnosConNombreCompleto = data.map(alumno => ({
                    ...alumno,
                    nombreCompleto: `${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`
                }));
                setAlumnos(alumnosConNombreCompleto);
            } catch (error) {
                console.error("Error al cargar alumnos:", error);
            }
        };

        fetchAlumnos();
    }, []);

    // Configuración de columnas
    const columns = [
        { header: 'Matrícula', accessor: 'matricula' },
        { header: 'Nombre completo', accessor: 'nombreCompleto' },
        { header: "Carrera", accessor: "carrera.nombreCarrera" },
        { header: "Semestre", accessor: "semestre.nombreSemestre" },
        { header: "Grupo", accessor: "grupo.nombreGrupo" },
    ];

    // Nombre del recurso para mensajes y títulos en la interfaz
    const nombreData = "alumnos";

    // Subtítulo descriptivo que aparece en la página
    const subTitulo = "Gestión de los alumnos inscritos en la universidad";

    // Ruta del botón para crear un nuevo alumno
    const rutaBoton = "/AgregarAlumno";

    // ========== FUNCIÓN: EDITAR ALUMNO ==========
    // Navega a la página de registro/edición con los datos del alumno seleccionado
    // Parámetros:
    //   - alumno: objeto con todos los datos del alumno a editar
    const editarAlumno = (alumno) => {
        navigate('/AgregarAlumno', { state: { alumno } });
    };

    // ========== FUNCIÓN: ELIMINAR ALUMNO ==========
    // Muestra una confirmación y elimina el alumno si el usuario lo confirma
    // Parámetros:
    //   - alumno: objeto con los datos del alumno a eliminar
    const eliminarAlumno = async (alumno) => {
        // Muestra diálogo de confirmación con SweetAlert2
        const result = await Swal.fire({
            title: `¿Eliminar a ${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}?`,
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        // Si el usuario confirma la eliminación, procede con la operación
        if (result.isConfirmed) {
            try {
                await alumnoService.deleteAlumno(alumno.id); 
                setAlumnos(prev => prev.filter(a => a.id !== alumno.id));
                Swal.fire('Eliminado', 'El alumno fue eliminado correctamente', 'success');
            } catch (error) {
                console.error("Error al eliminar:", error);
                Swal.fire('Error', 'No se pudo eliminar el alumno', 'error');
            }
        }
    };

    // ========== RENDERIZADO ==========
    // Estructura la página con componentes comunes y tabla de alumnos
    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <TablaRegistros
                data={alumnos}
                columns={columns}
                nombreData={nombreData}
                subTitulo={subTitulo}
                rutaBoton={rutaBoton}
                onEdit={editarAlumno}
                onDelete={eliminarAlumno}
            />
            <FooterInesis />
        </div>
    );
};

// Exporta el componente para que pueda ser usado en las rutas de la aplicación
export default AdministrarAlumnos;
