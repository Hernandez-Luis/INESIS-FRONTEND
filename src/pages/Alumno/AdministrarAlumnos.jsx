import React from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import '../Alumno/components/AdministrarAlumnos.css';

const AdministrarAlumnos = () => {

    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Administrar' },
        { url: '/PrincipalAdmin', label: 'Alumnos' }
    ];

  return (
    <div>
        <NavInesis />
        <MigasRecorrido items={links} />

        {/* Encabezado */}
        <div className="container my-5">
            <h2 className="size-font-title text-center mb-4 cardMenu-title">Administrar alumnos</h2>
            <i className="bi bi-person-add"></i>

        </div>

        {/* Botón "Agregar alumnos" */}
        <button className="btn-agregar-alumnos">
            <i className="bi bi-person-add"></i>
            Agregar alumnos
        </button>

        <FooterInesis />
    </div>
  );
};

export default AdministrarAlumnos;
