import React from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';

const AdministrarFechas = () => {
    const links = [
        { url: '/MenuAdministrador', label: 'Inicio' },
        //{ url: '/PrincipalAdmin', label: 'Administrar' },
        { url: '/AdministrarFechas', label: 'Fechas' }
    ];

    const data = [];

     // Configuración de columnas
    const columns = [
        { header: 'Carrera', accessor: 'carrera.nombreCarrera' },
        { header: 'Fecha inicial', accessor: 'fecha inicial' },
        { header: "Fecha final", accessor: "fecha final" },
        { header: "Estatus", accessor: "estatus" },
    ];

    const nombreData = "fechas";

    const subTitulo = "Se asignan fechas por carrera para  abrir y cerrar la encuesta";

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <TablaRegistros data={data} columns={columns} nombreData={nombreData} subTitulo={subTitulo} />
            <FooterInesis />
        </div>
    );
};

export default AdministrarFechas;