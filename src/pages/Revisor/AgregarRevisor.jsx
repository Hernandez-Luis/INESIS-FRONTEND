import React from 'react';
import '../../pages/Alumno/components/AdministrarAlumnos.css';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import RegistroRevisor from '../Revisor/components/RegistroRevisor';
import { useLocation } from 'react-router-dom';

const AgregarRevisor = () => {
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
            <RegistroRevisor revisor={revisor} />
            <FooterInesis />
        </div>
    );
};

export default AgregarRevisor;
