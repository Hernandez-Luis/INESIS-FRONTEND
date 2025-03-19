import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavInesis from "../../components/NavInesis/NavInesis";
import FinancialForm from "./FinancialForm";
import FooterInesis from "../../components/FooterInesis/FooterInesis";

const GastosIngresos = () => {

    return (
        <div className="d-flex flex-column min-vh-100 mt-2">
            <NavInesis></NavInesis>
            <div className="container d-flex justify-content-center text-center py-2">
                <div className=" p-1" style={{ color: "#4F46E5" }}>
                <h1 className="text-start">MIS GASTOS E INGRESOS</h1>
                    <div className="text-secondary text-start">
                        <h5 className="lh-lg">
                            Deberás incluir <strong>TODAS</strong> las fuentes de ingreso familiar, y deberá acompañarse de comprobantes oficiales de ingresos.<br />
                            En caso de no depender económicamente de otras personas, deberá presentarse comprobante oficial de ingresos del alumno.<br />
                            Se deberán reportar el ingreso bruto así como el ingreso neto.<br />
                            Los datos de agua y consumo de electricidad deberán corresponder al semestre más reciente y deberán ser del domicilio del padre, madre o tutor.<br />
                            En el caso de no depender económicamente, deberán ser del domicilio del alumno.
                        </h5>
                    </div>
                </div>
            </div>
            <FinancialForm />

            <FooterInesis className="mt-auto" />

        </div>
    );

};

export default GastosIngresos;
