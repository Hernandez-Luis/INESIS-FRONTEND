import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { MisDatos } from './pages/MisDatosPages/MisDatos';
import { NavInesis } from './components/NavInesis/NavInesis';
import 'bootstrap/dist/css/bootstrap.min.css';
import MigasRecorrido from './components/MigasDePan/MigasRecorrido';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/MisDatos" element={<MisDatos />} />
        <Route path="/NavInesis" element={<NavInesis />} />
        <Route path="/Migas" element={<MigasRecorrido />} />
    </Routes>
  )
}

export default AppRoutes;