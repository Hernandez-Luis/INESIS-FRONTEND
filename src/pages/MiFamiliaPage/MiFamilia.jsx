import React from 'react';
import '../../pages/Alumno/components/AdministrarAlumnos.css';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import MiFamiliaForm from './components/MiFamiliaForm';
import { SpinnerCarga } from '../../utils/spinerCarga/SpinerCarga';

const MiFamilia = () => {
    const links = [
        { url: '/MenuAlumno', label: 'Inicio' },
        { url: '/MenuSolicitar', label: 'Estudio socioeconómico' },
        { url: '/PrincipalAdmin', label: 'Mi famlia' }
    ];

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links}/>
            <MiFamiliaForm/>
            <SpinnerCarga />
            <FooterInesis />
        </div>
    );
};

export default MiFamilia;
