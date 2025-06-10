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

    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/AdministrarAlumnos', label: 'Alumnos' },
        { url: '/AgregarAlumno', label: 'Agregar alumno' }
    ];

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <AlumnoRegistro alumno={alumno} />
            <FooterInesis />
        </div>
    );
};

export default AgregarAlumno;
