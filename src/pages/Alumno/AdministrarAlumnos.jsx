import React from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import '../Alumno/components/AdministrarAlumnos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import { useNavigate } from "react-router-dom";


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

    const titulos = ["Matrícula", "Nombre Completo", "Carrera", "Semestre", "Grupo"];

    const navigate = useNavigate();

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />

            <div className="container my-1 w-75 mx-auto">
                <div className="mb-5 text-center">
                    <h2 className="size-font-title cardMenu-title">Administrar alumnos</h2>
                </div>

                <button className="btn btn-primary btn-agregar" onClick={() => navigate("/AgregarAlumno")}>
                    <i className="bi bi-person-add me-2" ></i>
                    Agregar alumno
                </button>

                <TablaRegistros data={alumnos} titulos={titulos} />
            </div>

            <FooterInesis />
        </div>
    );
};

export default AdministrarAlumnos;