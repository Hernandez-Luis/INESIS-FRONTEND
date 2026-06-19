/**
 * ============================================================================
 * MÓDULO: AgregarAlumno.jsx
 * DESCRIPCIÓN:
 * Componente de página para agregar o editar alumnos.
 *
 * FUNCIONALIDADES:
 * - Navegación para regresar al listado de alumnos.
 * - Renderiza el formulario de registro/edición de alumno.
 * - Transfiere datos del alumno seleccionado al formulario.
 *
 * DEPENDENCIAS:
 * - React
 * - React Router
 * - NavInesis
 * - MigasRecorrido
 * - FooterInesis
 * - AlumnoRegistro
 *
 * AUTOR: Nayeli Velasco López
 * PROYECTO: INESIS (Sistema de Información Socioeconómica)
 * FECHA DE CREACIÓN: 9 de marzo de 2025
 * ÚLTIMA MODIFICACIÓN: 19 de marzo de 2026
 * ============================================================================
 */

import React from 'react';
import '../../pages/Alumno/components/AdministrarAlumnos.css';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import AlumnoRegistro from './components/AlumnoRegistro';
import { useLocation } from 'react-router-dom';

const AgregarAlumno = () => {
    
    const location = useLocation();
    const alumno = location.state?.alumno || null;

    // Enlaces para la barra de migas de navegación.
    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
        { url: '/AdministrarAlumnos', label: 'Alumnos' },
        { url: '/AgregarAlumno', label: 'Agregar alumno' }
    ];

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <div className="layout-centrado">
                <AlumnoRegistro alumno={alumno} />
            </div>
            <FooterInesis />
        </div>
    );
};

export default AgregarAlumno;
