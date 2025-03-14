import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { MisDatos } from './pages/MisDatosPages/MisDatos';
import { NavInesis } from './components/NavInesis/NavInesis';
import 'bootstrap/dist/css/bootstrap.min.css';
import MigasRecorrido from './components/MigasDePan/MigasRecorrido';
import FooterInesis from './components/FooterInesis/FooterInesis';
import { Login } from './pages/Login';
import  GastosIngresos from './pages/Mis_Gastos_E_Ingresos/GastosIngresos';


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />


        <Route path="/MisDatos" element={<MisDatos />} />
        <Route path="/NavInesis" element={<NavInesis />} />
        <Route path="/Migas" element={<MigasRecorrido />} />
        <Route path="/FooterInesis" element={<FooterInesis />} />
        <Route path="/GastosIngresos" element={<GastosIngresos />} />

    </Routes>
  )
}

export default AppRoutes;