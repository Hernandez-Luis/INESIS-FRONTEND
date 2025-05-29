import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import fechasRegistradasService from '../../services/FechasRegistradasService';
import ModalRegistrarFecha from './components/ModalRegistrarFechas';
import Swal from 'sweetalert2';
import '../Fechas/components/AdministrarFechas.css';

const AdministrarFechas = () => {

    const [fechas, setFechas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [fechaEditar, setFechaEditar] = useState(null);
    const nombreData = "fechas";
    const subTitulo = "Se asignan fechas por carrera para  abrir y cerrar la encuesta";

    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
        //{ url: '/PrincipalAdmin', label: 'Administrar' },
        { url: '/AdministrarFechas', label: 'Fechas' }
    ];

    const handleEditar = (fecha) => {
        setFechaEditar(fecha);
        setShowModal(true);
    };

    const handleEliminar = async (fecha) => {
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar las fechas para la carrera "${fecha.carrera.nombreCarrera}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacion.isConfirmed) {
            try {
                await fechasRegistradasService.deleteFecha(fecha.id);
                Swal.fire('Eliminado', 'La fecha ha sido eliminada correctamente.', 'success');
                recargarFechas();
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Hubo un problema al eliminar la fecha.', 'error');
            }
        }
    };
    // Configuración de columnas
   const columns = [
  { header: 'Carrera', accessor: 'carrera.nombreCarrera' },
  { header: 'Fecha inicial', accessor: 'fechaInicioFormateada' },
  { header: 'Fecha final', accessor: 'fechaFinFormateada' },
  { 
    header: 'Estatus', 
    accessor: 'estatusTexto',
    Cell: ({ row }) => (
      <span className={row.original.claseColor}>
        {row.original.estatusTexto}
      </span>
    )
  },
];

    useEffect(() => {
        const fetchFechas = async () => {
            try {
                const data = await fechasRegistradasService.getAll();
                console.log("REGISTROS:", data);
                setFechas(data);
            } catch (err) {
                setError(err.message || "Error al obtener fechas");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFechas();
    }, []);

    // Dentro de TablaRegistros o aquí mismo puedes formatear las fechas
    // Solo formatear para mostrar en la tabla
 const formattedData = fechas.map(fecha => {
  const fechaInicioFormateada = dayjs(fecha.fechaInicio).format('DD/MM/YYYY');
  const fechaFinFormateada = dayjs(fecha.fechaFin).format('DD/MM/YYYY');

  let estatusTexto = '';
  let claseColor = '';
  
  if (fecha.active) {
    estatusTexto = `ACTIVO quedan ${fecha.restante} días`;
    claseColor = fecha.restante < 5 ? 'texto-naranja' : 'texto-verde';
  } else {
    estatusTexto = 'FINALIZADO';
    claseColor = 'texto-rojo';
  }

  return {
    ...fecha,
    fechaInicioFormateada,
    fechaFinFormateada,
    estatusTexto,
    claseColor  // Nueva propiedad para la clase CSS
  };
});

    const recargarFechas = async () => {
        try {
            const data = await fechasRegistradasService.getAll();
            setFechas(data);
        } catch (err) {
            setError(err.message || "Error al obtener fechas");
        }
    };

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <TablaRegistros
                data={formattedData}
                columns={columns}
                nombreData={nombreData}
                subTitulo={subTitulo}
                onFechaAgregada={recargarFechas}
                onEdit={handleEditar}
                onDelete={handleEliminar}
            />
            <ModalRegistrarFecha
                show={showModal}
                handleClose={() => {
                    setShowModal(false);
                    setFechaEditar(null);
                }}
                onSubmit={recargarFechas}
                modoEdicion={!!fechaEditar}
                fechaEditar={fechaEditar}
            />
            <FooterInesis />
        </div>
    );
};

export default AdministrarFechas;