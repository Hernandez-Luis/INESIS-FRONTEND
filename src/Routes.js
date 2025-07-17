import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { MisDatos } from './pages/MisDatos/MisDatos';
import { NavInesis } from './components/NavInesis/NavInesis';
import 'bootstrap/dist/css/bootstrap.min.css';
import MigasRecorrido from './components/MigasDePan/MigasRecorrido';
import FooterInesis from './components/FooterInesis/FooterInesis';
import { Login } from './pages/Login/Login';
import GastosIngresos from './pages/Mis_Gastos_E_Ingresos/GastosIngresos';
//import  GastosIngresos from './pages/Mis_Gastos_E_Ingresos/GastosIngresos';


import { LIneamientos } from './pages/Lineamientos/LIneamientos';
import { MenuSolicitar, MenuSolicitarBeca } from './pages/MenuSolicitarBeca/MenuSolicitarBeca';
import MisDocumentos from './pages/MisDocumentos/MisDocumentos';
import { MenuPrincipalRevisor } from './pages/MenuPrincipalRevisor/MenuPrincipalRevisor';
import { MenuAdministrador } from './pages/MenuAdministrador/MenuAdministrador';
import { MiTutor } from './pages/MiTutor/MiTutor';
import AdministrarAlumnos from './pages/Alumno/AdministrarAlumnos';
import AgregarAlumno from './pages/Alumno/AgregarAlumno';
import AdministrarFechas from './pages/Fechas/AdministrarFechas';
import RevisionSolicitud from './pages/Revisor/RevisionSolicitud';

import MiFamilia from './pages/MiFamiliaPage/MiFamilia';
import AdministrarRevisor from './pages/Revisor/AdministrarRevisor'
import AgregarRevisor from './pages/Revisor/AgregarRevisor'
import ResultadosSolicitud from './pages/ResultadosSolicitud/ResultadosSolicitud';
import MenuAlumno from './pages/MenuAlumno/MenuAlumno';
import ListadoEstudioSocioeconomico from './pages/ListadoEstudioSocioeconomico/ListadoEstudioSocioeconomico';
import ResultadoEstudioSocioeconomicoCorrecto from './pages/ResultadosSolicitud/ResultadoEstudioCoreccto';
import GestionMisDatos from './pages/MisDatos/GestionMisDatos';
import { GestionMiTutor } from './pages/MiTutor/GestionMiTutor';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />


        <Route path="/menuSolicitar" element={<ProtectedRoute allowedRoles={[1,2,3]}><MenuSolicitarBeca /></ProtectedRoute>}/>
        <Route path="/MisDatos" element={<ProtectedRoute allowedRoles={[1,2,3]}><GestionMisDatos /></ProtectedRoute>} />
        <Route path="/NavInesis" element={<ProtectedRoute allowedRoles={[1]}><NavInesis /></ProtectedRoute>} />

        <Route path="/Migas" element={<ProtectedRoute allowedRoles={[1]}> <MigasRecorrido /> </ProtectedRoute>} />
        <Route path="/Revision" element={<ProtectedRoute allowedRoles={[1]}> <RevisionSolicitud /></ProtectedRoute>} />
        <Route path="/MisDocumentos" element={<ProtectedRoute allowedRoles={[1]}> <MisDocumentos /> </ProtectedRoute>} />
        <Route path="/ResultadosSolicitud" element={<ProtectedRoute allowedRoles={[1]}> <ResultadosSolicitud /> </ProtectedRoute>}/>
        <Route path="/ResultadoEstudioSocioeconomicoCorrecto" element={<ProtectedRoute allowedRoles={[1]}> <ResultadoEstudioSocioeconomicoCorrecto /> </ProtectedRoute>}/>
        <Route path="/ListadoEstudioSocioeconomico" element={<ProtectedRoute allowedRoles={[1]}> <ListadoEstudioSocioeconomico /> </ProtectedRoute>}/>
        <Route path="/MenuAlumno" element={<ProtectedRoute allowedRoles={[1]}><MenuAlumno/></ProtectedRoute>} />
        <Route path="/Lineamientos" element={<ProtectedRoute allowedRoles={[1]}> <LIneamientos /> </ProtectedRoute>} />
        <Route path="/MenuRevisor" element={<ProtectedRoute allowedRoles={[1,2]}> <MenuPrincipalRevisor /> </ProtectedRoute>} />
        <Route path="/MenuAdministrador" element={<ProtectedRoute allowedRoles={[1]}> <MenuAdministrador /> </ProtectedRoute>} />   
        <Route path="/MiTutor" element={<ProtectedRoute allowedRoles={[1]}> <GestionMiTutor /> </ProtectedRoute>} />
        <Route path="/AdministrarAlumnos" element={<ProtectedRoute allowedRoles={[1]}> <AdministrarAlumnos /> </ProtectedRoute>} />
        <Route path="/AgregarAlumno" element={<ProtectedRoute allowedRoles={[1]}> <AgregarAlumno/> </ProtectedRoute>} />
        <Route path="/AdministrarFechas" element={<ProtectedRoute allowedRoles={[1]}> <AdministrarFechas/> </ProtectedRoute>} />
        <Route path="/MiFamilia" element={<ProtectedRoute allowedRoles={[1]}> <MiFamilia/> </ProtectedRoute>} />
        <Route path="/AdministrarRevisor" element={<ProtectedRoute allowedRoles={[1]}> <AdministrarRevisor/> </ProtectedRoute>} />
        <Route path='/AgregarRevisor' element={<ProtectedRoute allowedRoles={[1]}> <AgregarRevisor/> </ProtectedRoute>}></Route>        
        <Route path="/FooterInesis" element={<ProtectedRoute allowedRoles={[1]}> <FooterInesis /> </ProtectedRoute>} />
        <Route path="/GastosIngresos" element={<ProtectedRoute allowedRoles={[1,2,3]}> <GastosIngresos /> </ProtectedRoute>} />
    </Routes>
  )
}

export default AppRoutes;