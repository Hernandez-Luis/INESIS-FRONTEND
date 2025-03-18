import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { MisDatos } from './pages/MisDatosPages/MisDatos';
import { NavInesis } from './components/NavInesis/NavInesis';
import 'bootstrap/dist/css/bootstrap.min.css';
import MigasRecorrido from './components/MigasDePan/MigasRecorrido';
import FooterInesis from './components/FooterInesis/FooterInesis';
import { LIneamientos } from './pages/Lineamientos/LIneamientos';
import { MenuSolicitarBeca } from './pages/MenuSolicitarBeca/MenuSolicitarBeca';
import MisDocumentos from './pages/MisDocumentos/MisDocumentos';
import AdministrarAlumnos from './pages/Alumno/AdministrarAlumnos';
import AgregarAlumno from './pages/Alumno/AgregarAlumno';
import AdministrarFechas from './pages/Fechas/AdministrarFechas';
import MiFamilia from './pages/MiFamiliaPage/MiFamilia';
import AdministrarRevisor from './pages/Revisor/AdministrarRevisor'
import AgregarRevisor from './pages/Revisor/AgregarRevisor'
const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/MisDatos" element={<MisDatos />} />
        <Route path="/NavInesis" element={<NavInesis />} />
        <Route path="/Migas" element={<MigasRecorrido />} />
        <Route path="/FooterInesis" element={<FooterInesis />} />
        <Route path="/MisDocumentos" element={<MisDocumentos />} />
        <Route path="/menuSolicitar" element={<MenuSolicitarBeca />} />
        <Route path="/Lineamientos" element={<LIneamientos />} />
        <Route path="/AdministrarAlumnos" element={<AdministrarAlumnos />} />
        <Route path="/AgregarAlumno" element={<AgregarAlumno/>} />
        <Route path="/AdministrarFechas" element={<AdministrarFechas/>} />
        <Route path="/MiFamilia" element={<MiFamilia/>} />
        <Route path="/AdministrarRevisor" element={<AdministrarRevisor/>} />
        <Route path='/AgregarRevisor' element={<AgregarRevisor></AgregarRevisor>}></Route>
    </Routes>
  )
}

export default AppRoutes;