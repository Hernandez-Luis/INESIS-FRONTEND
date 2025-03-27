import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import '../Alumno/components/AdministrarAlumnos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdministrarAlumnos = () => {
    const [alumnos, setAlumnos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/alumnos");
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                const dataBase = await response.json();
                setAlumnos(data);



            } catch (error) {
                console.error("Error al cargar alumnos:", error);
            }
        };

        fetchAlumnos();
    }, []);


    const data = [
        { matricula: 28933, nombre: "Emmanuel Graciola Tapia", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 23833, nombre: "Adriana Hernández Ramírez", carrera: "Ing.Forestal", semestre: "Decimo", grupo: 1003 },
        { matricula: 23433, nombre: "Luis Alberto Hernández Ramírez", carrera: "Lic.Informatica", semestre: "Tercero", grupo: 303 },
        { matricula: 45565, nombre: "Hipólito Javier Domínguez", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 23833, nombre: "Arturo Sánchez Barrera", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 56987, nombre: "Luis Jiménez Jiménez", carrera: "Lic.Biología", semestre: "Sexto", grupo: 103 },
        { matricula: 23433, nombre: "José Luis Brito Gato", carrera: "Ing.Forestal", semestre: "Decimo", grupo: 1003 },
        { matricula: 45456, nombre: "Elisa Hernández Marcial", carrera: "Lic.Biologia", semestre: "Octavo", grupo: 803 },
        { matricula: 23833, nombre: "Arturo Sánchez Barrera", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 56987, nombre: "Luis Jiménez Jiménez", carrera: "Lic.Biología", semestre: "Sexto", grupo: 103 },
        { matricula: 23433, nombre: "José Luis Brito Gato", carrera: "Ing.Forestal", semestre: "Decimo", grupo: 1003 },
        { matricula: 45456, nombre: "Elisa Hernández Marcial", carrera: "Lic.Biologia", semestre: "Octavo", grupo: 803 },
        { matricula: 45565, nombre: "Hipólito Javier Domínguez", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 23833, nombre: "Arturo Sánchez Barrera", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 56987, nombre: "Luis Jiménez Jiménez", carrera: "Lic.Biología", semestre: "Sexto", grupo: 103 },
        { matricula: 23433, nombre: "José Luis Brito Gato", carrera: "Ing.Forestal", semestre: "Decimo", grupo: 1003 },
        { matricula: 45456, nombre: "Elisa Hernández Marcial", carrera: "Lic.Biologia", semestre: "Octavo", grupo: 803 },
        { matricula: 23833, nombre: "Arturo Sánchez Barrera", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 56987, nombre: "Luis Jiménez Jiménez", carrera: "Lic.Biología", semestre: "Sexto", grupo: 103 },
        { matricula: 23433, nombre: "José Luis Brito Gato", carrera: "Ing.Forestal", semestre: "Decimo", grupo: 1003 },
        { matricula: 45456, nombre: "Elisa Hernández Marcial", carrera: "Lic.Biologia", semestre: "Octavo", grupo: 803 },
        { matricula: 23433, nombre: "José Luis Brito Gato", carrera: "Ing.Forestal", semestre: "Decimo", grupo: 1003 },
        { matricula: 45456, nombre: "Elisa Hernández Marcial", carrera: "Lic.Biologia", semestre: "Octavo", grupo: 803 },
        { matricula: 23833, nombre: "Arturo Sánchez Barrera", carrera: "Lic.Informatica", semestre: "Decimo", grupo: 1003 },
        { matricula: 56987, nombre: "Luis Jiménez Jiménez", carrera: "Lic.Biología", semestre: "Sexto", grupo: 103 },
        { matricula: 23433, nombre: "José Luis Brito Gato", carrera: "Ing.Forestal", semestre: "Decimo", grupo: 1003 },
        { matricula: 45456, nombre: "Elisa Hernández Marcial", carrera: "Lic.Biologia", semestre: "Octavo", grupo: 803 },
    ];

    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Administrar' },
        { url: '/AdministrarAlumnos', label: 'Alumnos' }
    ];

    const titulos = ["Matrícula", "Nombre Completo", "Carrera", "Semestre", "Grupo"];

    const nombreData = "alumnos";

    const subTitulo = "Gestión de los alumnos inscritos en la universidad";

    const rutaBoton = "/AgregarAlumno";

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <TablaRegistros data={data} titulos={titulos} nombreData={nombreData} subTitulo={subTitulo} rutaBoton={rutaBoton}/>
            <FooterInesis />
        </div>
    );
};

export default AdministrarAlumnos;
