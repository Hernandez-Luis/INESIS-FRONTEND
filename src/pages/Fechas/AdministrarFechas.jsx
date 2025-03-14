import React from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import TablaRegistros from '../../components/Tablas/TablaRegistros';

const AdministrarFechas = () => {
    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Administrar' },
        { url: '/PrincipalAdmin', label: 'Alumnos' }
    ];

    const data = [
        { carrera: "Lic.Biologia", fechaInicio: "01/04/2025", fechaFinal: "01/08/2025" },
        { carrera: "Lic.Informatica", fechaInicio: "01/04/2025", fechaFinal: "01/08/2025" },
        { carrera: "Ing.Forestal", fechaInicio: "01/04/2025", fechaFinal: "01/08/2025" },
    ];

    const titulos = ["Carrera", "Fecha inicial", "Fecha final"];

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />

            <div className="container my-1 w-75 mx-auto">
                <div className="mb-5 text-center">
                    <h2 className="size-font-title cardMenu-title">Administrar fechas</h2>
                </div>

                
                <TablaRegistros data={data} titulos={titulos} />
            </div>

            <FooterInesis />
        </div>
    );
};

export default AdministrarFechas;