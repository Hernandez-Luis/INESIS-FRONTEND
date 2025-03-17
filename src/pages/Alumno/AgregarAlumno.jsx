import React from 'react';
import '../../pages/Alumno/components/AdministrarAlumnos.css';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import AlumnoRegistro from './components/AlumnoRegistro';

const AgregarAlumno = () => {
    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Administrar' },
        { url: '/AdministrarAlumnos', label: 'Alumnos' },
        { url: '/AgregarAlumno', label: 'Agregar alumno' }
    ];

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <div className="mb-5 text-center">
                <h2 className="size-font-title cardMenu-title">Agregar alumno</h2>
            </div>
            <div className="admin-alumnos-container">
                <AlumnoRegistro />
            </div>
            <FooterInesis />
        </div>
    );
};

export default AgregarAlumno;
