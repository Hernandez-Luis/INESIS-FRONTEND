import React, { useState, useEffect } from "react";
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import "bootstrap-icons/font/bootstrap-icons.css";
import SeleccionarCombo from "../../components/ComboSeleccionar/SeleccionarCombo";
import carreraService from "../../services/CatCarreraService";
import Alumno from "../../services/AlumnoService";

const ListadoEstudioSocioeconomico = () => {
  const links = [
    { url: "/MenuRevisor", label: "Inicio" },
    { url: "/ListadoEstudioSocioeconomico", label: "Listado Estudios Socioeconómicos" },
  ];

  const [carreras, setCarreras] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 1. Cargar carreras para el combo
  useEffect(() => {
    carreraService.getAll()
      .then(setCarreras)
      .catch(err => console.error("Error al cargar carreras:", err));
  }, []);

  // 2. Cargar todos los alumnos
  useEffect(() => {
    Alumno.getAll()
      .then(data => {
        const lista = data.map(a => ({
          id: a.id,
          nombre: `${a.nombre} ${a.apellidoPaterno} ${a.apellidoMaterno}`,
          semestre: a.semestre?.nombreSemestre || "Sin definir",
          grupo: a.grupo?.nombreGrupo || "Sin definir",
          estado: a.estado || "Sin revisar",
          carrera: a.carrera?.nombreCarrera || "Sin definir",
        }));
        setAlumnos(lista);
      })
      .catch(err => console.error("Error al cargar alumnos:", err));
  }, []);

  // Opciones para el combo
  const opcionesCarreras = carreras.map(c => ({
    value: c.nombreCarrera,
    label: c.nombreCarrera
  }));

  // Filtrar alumnos
  const filtered = alumnos.filter(a =>
    a.nombre.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "" || a.estado === statusFilter) &&
    (selectedCarrera === "" || a.carrera === selectedCarrera)
  );

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

          {/* Combo de carreras */}
          <div className="mb-3" style={{ width: "50%" }}>
            <SeleccionarCombo
              name="carrera"
              options={opcionesCarreras}
              value={selectedCarrera}
              onChange={e => setSelectedCarrera(e.target.value)}
              placeholder="Selecciona una carrera"
            />
          </div>

          {/* Filtros */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <select
              className="form-select w-auto"
              style={{ width: "25%" }}
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">Mostrar todos</option>
              <option value="Sin revisar">Sin revisar</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Pendiente">Pendiente</option>
            </select>

            <input
              type="text"
              className="form-control w-auto"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Tabla de resultados */}
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
                      <a href="/Revision">
                        <i className="bi bi-file-earmark-text"></i>
                      </a>
                    </td>
                    <td className={
                      a.estado === "Finalizado" ? "text-success" :
                      a.estado === "Pendiente" ? "text-danger" :
                      "text-muted"
                    }>
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

          {/* Paginación */}
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
