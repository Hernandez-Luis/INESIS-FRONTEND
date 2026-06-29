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
            <NavInesis />
            <MigasRecorrido items={links} />


            <div className="container-fluid px-3 px-md-4" style={{ maxWidth: "1700px" }}>
                <h2 className="mt-3 mb-3" style={{ color: "#4F46E5", fontWeight: 700 }}>
                    GASTOS E INGRESOS FAMILIARES
                </h2>

                <div
                    className="rounded-3 p-3 p-md-4 mb-4"
                    style={{
                        background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)",
                        borderLeft: "5px solid #4F46E5",
                        boxShadow: "0 2px 8px rgba(79,70,229,0.10)"
                    }}
                >
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <i className="bi bi-exclamation-circle-fill fs-5" style={{ color: "#4F46E5" }}></i>
                        <span className="fw-bold fs-6" style={{ color: "#4F46E5" }}>Instrucciones importantes — lee antes de continuar</span>
                    </div>

                    <ul className="mb-0 d-flex flex-column gap-2" style={{ color: "#374151", paddingLeft: "1.2rem" }}>
                        <li>
                            Deberás incluir{" "}
                            <strong style={{ color: "#4F46E5" }}>TODAS</strong>{" "}
                            las fuentes de ingreso familiar, acompañadas de{" "}
                            <strong>comprobantes oficiales de ingresos</strong>.
                            En caso de no depender económicamente de otras personas, presenta comprobante oficial de ingresos del alumno.
                        </li>
                        <li>
                            Se deberán reportar el{" "}
                            <strong>ingreso bruto</strong> y el{" "}
                            <strong>ingreso neto</strong>.
                        </li>
                        <li>
                            Los datos de agua y consumo de electricidad deben corresponder al{" "}
                            <strong>semestre más reciente</strong> y ser del domicilio del padre, madre o tutor.
                            En caso de no depender económicamente, del domicilio del alumno.
                        </li>
                    </ul>
                </div>
            </div>
            <FinancialForm />
            <SpinnerCarga />
            <FooterInesis className="mt-auto" />

        </div>
    );

};

export default GastosIngresos;
