import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { MisDatos } from './pages/MisDatosPages/MisDatos';
import { NavInesis } from './components/NavInesis/NavInesis';
import 'bootstrap/dist/css/bootstrap.min.css';
import MigasRecorrido from './components/MigasDePan/MigasRecorrido';
import FooterInesis from './components/FooterInesis/FooterInesis';
import { LIneamientos } from './pages/Lineamientos/LIneamientos';
import { MenuSolicitarBeca } from './pages/MenuSolicitarBeca/MenuSolicitarBeca';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/MisDatos" element={<MisDatos />} />
        <Route path="/NavInesis" element={<NavInesis />} />
        <Route path="/Migas" element={<MigasRecorrido />} />
        <Route path="/FooterInesis" element={<FooterInesis />} />
        <Route path="/menuSolicitar" element={<MenuSolicitarBeca />} />
        <Route path="/Lineamientos" element={<LIneamientos />} />
    </Routes>
  )
}

export default AppRoutes;