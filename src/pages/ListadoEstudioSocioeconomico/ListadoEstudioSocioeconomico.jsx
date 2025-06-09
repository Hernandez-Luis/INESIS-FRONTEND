import React, { useState, useEffect } from "react";
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import "bootstrap-icons/font/bootstrap-icons.css";
import SeleccionarCombo from "../../components/ComboSeleccionar/SeleccionarCombo";
import MenuAdministrador from "../MenuAdministrador/MenuAdministrador";
import carreraService from "../../services/CatCarreraService";

const ListadoEstudioSocioeconomico = () => {
  const links = [
    { url: "/MenuRevisor", label: "Inicio" },
    {
      url: "/ListadoEstudioSocioeconomico",
      label: "Listado Estudios Socioeconomicos",
    },
  ];

  const [carreras, setCarreras] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const data = await carreraService.getAll();
        console.log("Respuesta de carreras:", data);
        setCarreras(data);
      } catch (error) {
        console.error("Error al cargar carreras:", error);
      }
    };
    fetchCarreras();
  }, []);

  // Transformacion de carreras para SeleccionarCombo
  const opcionesCarreras = carreras.map((c) => ({
    value: c.nombreCarrera,
    label: c.nombreCarrera,
  }));

  const data = [
    {
      nombre: "Emmanuel Graciola Tapia",
      semestre: "Décimo",
      grupo: "103",
      estado: "Sin revisar",
      carrera: "Forestal",
    },
    {
      nombre: "Adriana Hernández Ramírez",
      semestre: "Décimo",
      grupo: "103",
      estado: "Finalizado",
      carrera: "Licenciatura en Informatica",
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.nombre.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "" || item.estado === statusFilter) &&
      (selectedCarrera === "" || item.carrera === selectedCarrera)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
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
            Resultados Estudio Socioeconomico
          </h1>
          <div className="mb-3" style={{ width: "50%" }}>
            <SeleccionarCombo
              name="carrera"
              options={opcionesCarreras}
              onChange={(e) => setSelectedCarrera(e.target.value)}
              value={selectedCarrera}
              placeholder="Selecciona una carrera"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <select
              className="form-select w-auto"
              style={{ width: "25%" }}
              onChange={(e) => setStatusFilter(e.target.value)}
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.semestre}</td>
                  <td>{item.grupo}</td>
                  <td>
                    <a href="/Revision">
                      <i className="bi bi-file-earmark-text"></i>
                    </a>
                  </td>
                  <td
                    className={
                      item.estado === "Finalizado"
                        ? "text-success"
                        : item.estado === "Pendiente"
                        ? "text-danger"
                        : "text-muted"
                    }
                  >
                    {item.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                {[...Array(totalPages).keys()].map((num) => (
                  <li
                    key={num}
                    className={`page-item ${
                      currentPage === num + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(num + 1)}
                    >
                      {num + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="mt-md-5 mt-sm-3">
        <FooterInesis />
      </div>
    </div>
  );
};

export default ListadoEstudioSocioeconomico;
