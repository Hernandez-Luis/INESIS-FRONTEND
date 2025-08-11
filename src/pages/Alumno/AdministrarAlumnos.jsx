import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import '../Alumno/components/AdministrarAlumnos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import alumnoService from '../../services/AlumnoService';
import Swal from 'sweetalert2';

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
                    nombreCompleto: `${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`
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

    const editarAlumno = (alumno) => {
        //console.log("ESTE DATO ES PARA EDITA ", alumno);
        navigate('/AgregarAlumno', { state: { alumno } });
    };

    const eliminarAlumno = async (alumno) => {
        const result = await Swal.fire({
            title: `¿Eliminar a ${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}?`,
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await alumnoService.deleteAlumno(alumno.id); 
                setAlumnos(prev => prev.filter(a => a.id !== alumno.id));
                Swal.fire('Eliminado', 'El alumno fue eliminado correctamente', 'success');
            } catch (error) {
                console.error("Error al eliminar:", error);
                Swal.fire('Error', 'No se pudo eliminar el alumno', 'error');
            }
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
