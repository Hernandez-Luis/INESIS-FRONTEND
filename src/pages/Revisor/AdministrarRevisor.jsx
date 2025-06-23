import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import 'bootstrap-icons/font/bootstrap-icons.css';
import revisorService from '../../services/RevisorService';
import Swal from 'sweetalert2';
import '../Alumno/components/AdministrarAlumnos.css';

const AdministrarRevisor = () => {
    const [revisores, setRevisores] = useState([]);
    const navigate = useNavigate();

    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
        { url: '/AdministrarRevisor', label: 'Revisores' }
    ];

    useEffect(() => {
        const fetchRevisores = async () => {
            try {
                const data = await revisorService.getAll();
                const revisoresConNombreCompleto = data.map(r => ({
                    ...r,
                    nombreCompleto: r.nombre && r.apellidoPaterno && r.apellidoMaterno
                        ? `${r.nombre} ${r.apellidoPaterno} ${r.apellidoMaterno}`
                        : r.nombre || '' 
                }));
                setRevisores(revisoresConNombreCompleto);
            } catch (error) {
                console.error("Error al cargar revisores:", error);
            }
        };

        fetchRevisores();
    }, []);

    // Columnas para la tabla
    const columns = [
        { header: 'Matrícula', accessor: 'matricula' },
        { header: 'Nombre completo', accessor: 'nombreCompleto' },
        { header: "Departamento", accessor: "departamento" },
    ];

    const nombreData = "revisor";

    const subTitulo = "Gestión de los revisores del estudio socioeconómico";

    const rutaBoton = "/AgregarRevisor";

    // Función para editar revisor
    const editarRevisor = (revisor) => {
        navigate('/AgregarRevisor', { state: { revisor } });
    };

    // Función para eliminar revisor
    const eliminarRevisor = async (revisor) => {
        const result = await Swal.fire({
            title: `¿Eliminar a ${revisor.nombreCompleto || revisor.nombre}?`,
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await revisorService.deleteRevisor(revisor.id);
                setRevisores(prev => prev.filter(r => r.id !== revisor.id));
                Swal.fire('Eliminado', 'El revisor fue eliminado correctamente', 'success');
            } catch (error) {
                console.error("Error al eliminar:", error);
                Swal.fire('Error', 'No se pudo eliminar el revisor', 'error');
            }
        }
    };

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <TablaRegistros
                data={revisores}
                columns={columns}
                nombreData={nombreData}
                subTitulo={subTitulo}
                rutaBoton={rutaBoton}
                onEdit={editarRevisor}
                onDelete={eliminarRevisor}
            />
            <FooterInesis />
        </div>
    );
};

export default AdministrarRevisor;
