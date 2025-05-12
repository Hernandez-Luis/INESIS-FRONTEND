import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import '../Alumno/components/AdministrarAlumnos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import alumnoService from '../../services/AlumnoService';

const AdministrarAlumnos = () => {
    const [alumnos, setAlumnos] = useState([]);
    const navigate = useNavigate();

    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
        { url: '/AdministrarAlumnos', label: 'Alumnos' }
    ];

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const data = await alumnoService.getAll();
                setAlumnos(data);
            } catch (error) {
                console.error("Error al cargar alumnos:", error);
            }
        };

        fetchAlumnos();
    }, []);

    // Aquí asegúrate de que los titulos coincidan con la estructura de los datos
    const titulos = ["Matrícula", "Nombre Completo", "Carrera", "Semestre", "Grupo"];

    const nombreData = "alumnos";

    const subTitulo = "Gestión de los alumnos inscritos en la universidad";

    const rutaBoton = "/AgregarAlumno";

    // Aquí mapeamos la data de los alumnos para adaptarla a las columnas
    const datosAlumnos = alumnos.map((alumno) => ({
        matricula: alumno.matricula,
        nombreCompleto: `${alumno.nombre} ${alumno.apellido}`,
        carrera: alumno.carrera.nombreCarrera,
        semestre: alumno.semestre.nombreSemestre,
        grupo: alumno.grupo.nombreGrupo
    }));

    const editarAlumno = (matricula) => {
        navigate(`/AgregarAlumno/${matricula}`);
    };

    const eliminarAlumno = async (matricula) => {
        try {
            await alumnoService.deleteAlumno(matricula); // Eliminar el alumno por matrícula
            setAlumnos(alumnos.filter((alumno) => alumno.matricula !== matricula)); // Actualizar el estado
            alert('Alumno eliminado con éxito');
        } catch (error) {
            console.error("Error al eliminar el alumno:", error);
            alert('Hubo un error al eliminar el alumno');
        }
    };

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <TablaRegistros
                data={datosAlumnos}
                titulos={titulos}
                nombreData={nombreData}
                subTitulo={subTitulo}
                rutaBoton={rutaBoton}
                onEdit={editarAlumno}
                onDelete={eliminarAlumno}
            />
            <FooterInesis />
        </div>
    );
};

export default AdministrarAlumnos;
