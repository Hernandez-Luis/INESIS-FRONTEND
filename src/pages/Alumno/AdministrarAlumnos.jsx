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

    const alumnos = [
        { matricula: 28933, nombre: "Emmanuel Graciola Tapia", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 23833, nombre: "Adriana Hernández Ramírez", carrera: "Ing.Forestal", semestre: "Decimo", grupo: 1003 },
        { matricula: 23433, nombre: "Luis Alberto Hernández Ramírez", carrera: "Lic.Informatica", semestre: "Tercero", grupo: 303 },
        { matricula: 45565, nombre: "Hipólito Javier Domínguez", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 23833, nombre: "Arturo Sánchez Barrera", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 56987, nombre: "Luis Jiménez Jiménez", carrera: "Lic.Biología", semestre: "Sexto", grupo: 103 },
        { matricula: 23433, nombre: "José Luis Brito Gato", carrera: "Ing.Forestal", semestre: "Decimo", grupo: 1003 },
        { matricula: 45456, nombre: "Elisa Hernández Marcial", carrera: "Lic.Biologia", semestre: "Octavo", grupo: 803 },
    ];

    return (
        <div >
            <NavInesis></NavInesis>
            <MigasRecorrido items={links}></MigasRecorrido>

            <div className="container my-4">
                <div className="mb-4 text-center">
                    <h2 className="size-font-title cardMenu-title">Administrar alumnos</h2>
                </div>

                <button className="btn btn-primary btn-agregar">
                    <i className="bi bi-alarm"></i>

                    Agregar alumno
                </button>

                <div className="table-responsive custom-table-container">
                    <table className="table align-middle custom-table">
                        <thead>
                            <tr className="table-header">
                                <th>Matrícula</th>
                                <th>Nombre Completo</th>
                                <th>Carrera</th>
                                <th>Semestre</th>
                                <th>Grupo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumnos.map((alumno, index) => (
                                <tr key={index}>
                                    <td className="fw-semibold">{alumno.matricula}</td>
                                    <td>{alumno.nombre}</td>
                                    <td>{alumno.carrera}</td>
                                    <td>{alumno.semestre}</td>
                                    <td>{alumno.grupo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-3 text-end text-muted table-footer">
                    Mostrando 8 de 20 solicitudes
                </div>
            </div>

            <FooterInesis />
        </div>
    );
};

export default AdministrarAlumnos;