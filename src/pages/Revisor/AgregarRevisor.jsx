import React from 'react';
import '../../pages/Alumno/components/AdministrarAlumnos.css';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import RegistroRevisor from '../Revisor/components/RegistroRevisor';

const AgregarRevisor = () => {
    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Administrar' },
        { url: '/AdministrarRevisor', label: 'Revisor' },
        { url: '/AgregarRevisor', label: 'Agregar Revisor' }
    ];

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <div className="mb-2 text-center">
                <h2 className="size-font-title cardMenu-title">Agregar revisor</h2>
            </div>
            <div className="admin-alumnos-container">
                <RegistroRevisor/>
            </div>
            <FooterInesis />
        </div>
    );
};

export default AgregarRevisor;
