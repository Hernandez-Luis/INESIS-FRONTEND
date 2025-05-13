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
                const alumnosConNombreCompleto = data.map(alumno => ({
                    ...alumno,
                    nombreCompleto: `${alumno.nombre} ${alumno.apellido}`
                }));
                setAlumnos(alumnosConNombreCompleto);
            } catch (error) {
                console.error("Error al cargar alumnos:", error);
            }
        };

        fetchAlumnos();
    }, []);

    // Configuración de columnas
    const columns = [
        { header: 'Matrícula', accessor: 'matricula' },
        { header: 'Nombre completo', accessor: 'nombreCompleto' },
        { header: "Carrera", accessor: "carrera.nombreCarrera" },
        { header: "Semestre", accessor: "semestre.nombreSemestre" },
        { header: "Grupo", accessor: "grupo.nombreGrupo" },
    ];

    const nombreData = "alumnos";

    const subTitulo = "Gestión de los alumnos inscritos en la universidad";

    const rutaBoton = "/AgregarAlumno";

    const editarAlumno = (item) => {
    navigate(`/AgregarAlumno`);
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
                data={alumnos}
                columns={columns}
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
