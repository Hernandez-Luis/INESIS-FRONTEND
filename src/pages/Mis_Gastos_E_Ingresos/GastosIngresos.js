import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavInesis from "../../components/NavInesis/NavInesis";
import FinancialForm from "./FinancialForm";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import { SpinnerCarga } from "../../utils/spinerCarga/SpinerCarga";

const GastosIngresos = () => {

    const links = [
        { url: '/MenuAlumno', label: 'Inicio' },
        { url: '/MenuSolicitar', label: 'Estudio Socioeconómico' },
        { url: '/GastosIngresos', label: 'Mis gastos e ingresos' }
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Contenedor relativo para ubicar migas detrás del Nav */}
            <div className="position-relative">
                <NavInesis />

                <MigasRecorrido
                    items={links}
                    className="position-absolute top-0 start-0 mt-3 ms-3 z-index-0"
                />
            </div>


            <div className="container d-flex justify-content-center text-center " style={{maxWidth: "1900px"}} >
                <div className=" p-1" style={{ color: "#4F46E5" }} >
                <h1 className="text-start">GASTOS E INGRESOS FAMILIARES</h1>
                    <div className="text-secondary text-start">
                        <h6>
                            Deberás incluir <strong>TODAS</strong> las fuentes de ingreso familiar, y deberá acompañarse de comprobantes oficiales de ingresos.
                            En caso de no depender económicamente de otras personas, deberá presentarse comprobante oficial de ingresos del alumno.<br />
                            Se deberán reportar el ingreso bruto así como el ingreso neto.<br />
                            Los datos de agua y consumo de electricidad deberán corresponder al semestre más reciente y deberán ser del domicilio del padre, madre o tutor.
                            En el caso de no depender económicamente, deberán ser del domicilio del alumno.
                        </h6>
                    </div>
                </div>
            </div>
            <FinancialForm />
            <SpinnerCarga />
            <FooterInesis className="mt-auto" />

        </div>
    );

};

export default GastosIngresos;
