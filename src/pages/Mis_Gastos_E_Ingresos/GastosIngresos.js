import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavInesis from "../../components/NavInesis/NavInesis";

const GastosIngresos = () => {

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavInesis></NavInesis>
            <div style={{ padding: "40px", color: "#4F46E5" }}>
                <h1 >MIS GASTOS E INGRESOS</h1>

                <div style={{ color: "#6C757D" }}>
                    <h4>Deberás incluir TODAS las fuentes de ingreso familiar, y deberá acompañarse de comprobantes oficiales de Ingresos. En caso de no depender económicamente de otras personas, deberá presentarse comprobante oficial de Ingresos del alumno.
                        Se deberán reportar el ingreso bruto así como el ingreso neto.
                        Los datos de agua y consumo de electricidad deberán corresponder al semestre más reciente y deberán ser del domicilio del padre, madre o tutor.
                        En el caso de no depender económicamente, deberán ser del domicilio del alumno.</h4>
                </div>
                <div style={{ backgroundColor: "#6C757D" }}>
                    <div className="container-fluid d-flex align-items-center justify-content-center bg-light flex-grow-1">
                        <div className="col-md-5 d-flex align-items-left justify-content-center">
                            <h4 style={{color : "4F46E5"}}>Ingresos mensuales</h4>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );

};

export default GastosIngresos;
