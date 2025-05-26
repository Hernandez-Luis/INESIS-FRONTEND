import React, { useState, useEffect } from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';
import fechasRegistradasService from '../../services/FechasRegistradasService';

const AdministrarFechas = () => {

    const [fechas, setFechas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
        //{ url: '/PrincipalAdmin', label: 'Administrar' },
        { url: '/AdministrarFechas', label: 'Fechas' }
    ];

    const nombreData = "fechas";
    const subTitulo = "Se asignan fechas por carrera para  abrir y cerrar la encuesta";
    // Configuración de columnas
    const columns = [
        { header: 'Carrera', accessor: 'carrera.nombreCarrera' },
        { header: 'Fecha inicial', accessor: 'fechaInicio' },
        { header: 'Fecha final', accessor: 'fechaFin' },
        { header: 'Estatus', accessor: 'status' },
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
    const formattedData = fechas.map(fecha => ({
        ...fecha,
        fechaInicio: new Date(fecha.fechaInicio).toLocaleDateString(),
        fechaFin: new Date(fecha.fechaFin).toLocaleDateString()
    }));

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
            />
            <FooterInesis />
        </div>
    );
};

    export default AdministrarFechas;