/**
 * ============================================================================
 * MÓDULO: AgregarRevisor.jsx
 * DESCRIPCIÓN:
 * Página que encapsula el formulario de registro/edición de revisores.
 * Muestra navegación, migas y el componente `RegistroRevisor`.
 *
 * FUNCIONALIDADES:
 * - Reutiliza `RegistroRevisor` para creación y edición según `location.state`.
 * - Provee enlaces de navegación y layout centralizado.
 *
 * DEPENDENCIAS:
 * - React
 * - NavInesis, MigasRecorrido, FooterInesis
 * - RegistroRevisor
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
import RegistroRevisor from '../Revisor/components/RegistroRevisor';
import { useLocation } from 'react-router-dom';

const AgregarRevisor = () => {
    // useLocation permite recibir datos (revisor) cuando se navega desde editar
    const location = useLocation();
    const revisor = location.state?.revisor || null;

    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
        { url: '/AdministrarRevisor', label: 'Revisores' },
        { url: '/AgregarRevisor', label: 'Agregar Revisor' }
    ];

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <div className="layout-centrado">
                <RegistroRevisor revisor={revisor} />
            </div>
            <FooterInesis />
        </div>
    );
};

export default AgregarRevisor;
