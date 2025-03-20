import React, { useState, useEffect } from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import '../Alumno/components/AdministrarAlumnos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import { useNavigate } from "react-router-dom";


const AdministrarRevisor = () => {
    const [revisores, setRevisor] = useState([]);
    const navigate = useNavigate();

    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Administrar' },
        { url: '/PrincipalAdmin', label: 'Revisor' }
    ];

    useEffect(() => {
        const fetchRevisor = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/revisor");
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                const dataBase = await response.json();
                setRevisor(revisor);



            } catch (error) {
                console.error("Error al cargar alumnos:", error);
            }
        };

        fetchRevisor();
    }, []);


    const revisor = [
        { matricula: 34533, nombre: "Magdiel Pascual", Departamento: "Cubo 102", NIP: "1234456" },
        { matricula: 23453, nombre: "Leobardo Santiago Paz", Departamento: "Instituto de Ciencias Ambientales", NIP: "12345678" },
        { matricula: 23433, nombre: "Juan Gabriel Ruiz", Departamento: "Jefatura", NIP: "123423478" },
        { matricula: 7665, nombre: "Alberto Barbosa", Departamento: "Cubo 167", NIP: "12237678" },
        { matricula: 24563, nombre: "Luis Alberto Hernandez", Departamento: "Cubo 103", NIP: "12345234" },
        { matricula: 45687, nombre: "Ramiro Hernandez", Departamento: "Cubo 113", NIP: "234678" },
        { matricula: 75633, nombre: "Efren David", Departamento: "Instituto de Idiomas", NIP: "1232342" },
    ];

    const titulos = ["Matrícula", "Nombre Completo", "Departamento", "Num. Empleado"];

    const nombreData = "revisor";
    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <TablaRegistros data={revisor} titulos={titulos} nombreData={nombreData} />
            <FooterInesis />
        </div>

    );
};

export default AdministrarRevisor;