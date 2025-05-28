import React from 'react';
import '../../pages/Alumno/components/AdministrarAlumnos.css';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import RegistroRevisor from '../Revisor/components/RegistroRevisor';

const AgregarRevisor = () => {
    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
       // { url: '/MenuRevisor', label: 'Menu' },
        { url: '/AdministrarRevisor', label: 'Revisores' },
        { url: '/AgregarRevisor', label: 'Agregar Revisor' }
    ];

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links}/>
            <RegistroRevisor/>
            <FooterInesis />
        </div>
    );
};

export default AgregarRevisor;
