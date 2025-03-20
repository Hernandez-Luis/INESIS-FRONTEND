import React from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import '../Alumno/components/AdministrarAlumnos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import { useNavigate } from "react-router-dom";


const AdministrarRevisor = () => {
    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Administrar' },
        { url: '/PrincipalAdmin', label: 'Revisor' }
    ];

    const revisor = [
        { matricula: 34533, nombre: "Magdiel Pascual", Departamento: "Cubo 102", NIP :"1234456"},
        { matricula: 23453, nombre: "Leobardo Santiago Paz", Departamento: "Instituto de Ciencias Ambientales", NIP :"12345678"},
        { matricula: 23433, nombre: "Juan Gabriel Ruiz", Departamento: "Jefatura", NIP :"123423478"},
        { matricula: 7665, nombre: "Alberto Barbosa", Departamento: "Cubo 167", NIP :"12237678"},
        { matricula: 24563, nombre: "Luis Alberto Hernandez", Departamento: "Cubo 103", NIP :"12345234"},
        { matricula: 45687, nombre: "Ramiro Hernandez", Departamento: "Cubo 113", NIP :"234678"},
        { matricula: 75633, nombre: "Efren David", Departamento: "Instituto de Idiomas", NIP :"1232342"},
    ];

    const titulos = ["Matrícula", "Nombre Completo", "Departamento", "Nip"];

    const navigate = useNavigate();

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />

            <div className="container my-1 w-75 mx-auto">
                <div className="mb-5 text-center">
                    <h2 className="size-font-title cardMenu-title">Administrar revisores</h2>
                </div>

                <button className="btn btn-primary btn-agregar" onClick={() => navigate("/AgregarRevisor")}>
                    <i className="bi bi-person-add me-2" ></i>
                    Agregar revisor
                </button>

                <TablaRegistros data={revisor} titulos={titulos} />
            </div>

            <FooterInesis />
        </div>
    );
};

export default AdministrarRevisor;