import React, { useState, useEffect } from "react";
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import "bootstrap-icons/font/bootstrap-icons.css";
import SeleccionarCombo from "../../components/ComboSeleccionar/SeleccionarCombo";
import carreraService from "../../services/CatCarreraService";
import Alumno from "../../services/AlumnoService";
import { Link } from "react-router-dom";

const ListadoEstudioSocioeconomico = () => {

  const links = [
    { url: "/MenuRevisor", label: "Inicio" },
    { url: "/ListadoEstudioSocioeconomico", label: "Listado Estudios Socioeconómicos" },
  ];

  const [carreras, setCarreras] = useState([]); // Lista de carreras
  const [alumnos, setAlumnos] = useState([]); // Lista de alumnos filtrados
  const [selectedCarrera, setSelectedCarrera] = useState(""); // Filtro por carrera
  const [statusFilter, setStatusFilter] = useState(""); // Filtro por estado
  const [search, setSearch] = useState(""); // Filtro por búsqueda de nombre
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Elementos por página

  useEffect(() => {
    carreraService.getAll()
      .then(setCarreras)
      .catch(err => console.error("Error al cargar carreras:", err));
  }, []);

  useEffect(() => {
    Alumno.getAll()
      .then(data => {
        console.log("Datos de alumnos:", data);
        const lista = data
          .filter(a => a.estudioCompleto === true) // Mostrar solo si 'completo' es true
          .map(a => {
            let estadoTexto = "Sin revisar";
            switch (a.estadoRevision) {
              case 0:
                estadoTexto = "Sin revisar";
                break;
              case 1:
                estadoTexto = "Pendiente";
                break;
              case 2:
                estadoTexto = "Con correcciones";
                break;
              case 3:
                estadoTexto = "Corregido";
                break;
              case 4:
                estadoTexto = "Finalizado";
                break;
              default:
                estadoTexto = "Sin revisar";
            }

            return {
              id: a.id,
              nombre: `${a.nombre} ${a.apellidoPaterno} ${a.apellidoMaterno}`,
              semestre: a.semestre?.nombreSemestre,
              grupo: a.grupo?.nombreGrupo,
              carrera: a.carrera?.nombreCarrera,
              estado: estadoTexto,
            };
          });

        setAlumnos(lista);
      })
      .catch(err => console.error("Error al cargar alumnos:", err));
  }, []);

  // Opciones del combo de carreras
  const opcionesCarreras = carreras.map(c => ({
    value: c.nombreCarrera,
    label: c.nombreCarrera
  }));

  // Filtros sobre la lista de alumnos
  const filtered = alumnos.filter(a =>
    a.nombre.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "" || a.estado === statusFilter) &&
    (selectedCarrera === "" || a.carrera === selectedCarrera)
  );

  // Paginacion
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <NavInesis />
        <MigasRecorrido items={links} />

        <div className="container text-center mt-4">
          <h1 className="fw-bold" style={{ color: "#6658d3" }}>
            Resultados Estudio Socioeconómico
          </h1>

          {/* Combo carrera */}
          <div className="mb-3" style={{ width: "50%" }}>
            <SeleccionarCombo
              name="carrera"
              options={opcionesCarreras}
              value={selectedCarrera}
              onChange={e => setSelectedCarrera(e.target.value)}
              placeholder="Selecciona una carrera"
            />
          </div>

          {/* Filtros por estado y búsqueda */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <label className="me-2 fw-bold">Filtrar por estado:</label>
              <select
                className="form-select w-auto"
                style={{ width: "25%" }}
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="">Mostrar todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Con correcciones">Con correcciones</option>
                <option value="Corregido">Corregido</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>


            <input
              type="text"
              className="form-control w-auto"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Tabla con resultados filtrados */}
          <table className="table table-striped text-center table-bordered border-2">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Semestre</th>
                <th>Grupo</th>
                <th>Revisar</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length > 0 ? (
                displayed.map((a, idx) => (
                  <tr key={idx}>
                    <td>{a.nombre}</td>
                    <td>{a.semestre}</td>
                    <td>{a.grupo}</td>
                    <td>
                      <Link 
                        to="/Revision" 
                        state={{ estudiante: a }} 
                      >
                        <i className="bi bi-file-earmark-text"></i>
                      </Link>
                    </td>
                    <td className={`fw-bold ${
                      a.estado === "Finalizado" ? "text-success" :
                      a.estado === "Corregido" ? "text-primary" :
                      a.estado === "Pendiente" ? "text-warning" :
                      a.estado === "Con correcciones" ? "text-danger" :
                      "text-muted"
                    }`}>
                      <i className={`me-2 ${
                        a.estado === "Finalizado" ? "bi bi-check-circle-fill" :
                        a.estado === "Corregido" ? "bi bi-arrow-clockwise" :
                        a.estado === "Pendiente" ? "bi bi-clock-fill" :
                        a.estado === "Con correcciones" ? "bi bi-x-circle-fill" :
                        "bi bi-clipboard"
                      }`}></i>
                      {a.estado}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>

          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i+1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <FooterInesis />
    </div>
  );
};

export default ListadoEstudioSocioeconomico;
