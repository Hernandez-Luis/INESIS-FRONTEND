import React, { useState } from 'react';
import NavInesis from "../../components/NavInesis/NavInesis";
import MigasRecorrido from "../../components/MigasDePan/MigasRecorrido";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import 'bootstrap-icons/font/bootstrap-icons.css';
import SeleccionarCarrera from "../../components/ComboSeleccionar/SeleccionarCombo";

    const ListadoEstudioSocioeconomico = () => {
    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Estudios' },
        { url: '/PrincipalAdmin', label: 'Todos los Estudios' },
    ];

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const data = [
        { nombre: "Emmanuel Graciola Tapia", semestre: "Décimo", grupo: "103", estado: "Sin revisar" },
        { nombre: "Adriana Hernández Ramírez", semestre: "Décimo", grupo: "103", estado: "Finalizado" },
        { nombre: "Luis Alberto Hernández Ramírez", semestre: "Tercero", grupo: "103", estado: "Sin revisar" },
        { nombre: "Hipólito Javier Domínguez Hernández", semestre: "Décimo", grupo: "103", estado: "Pendiente" },
        { nombre: "Arturo Sánchez Barrera", semestre: "Décimo", grupo: "103", estado: "Pendiente" },
        { nombre: "Luis Jiménez Jiménez", semestre: "Quinto", grupo: "103", estado: "Sin revisar" },
        { nombre: "José Luis Brito Gato", semestre: "Tercero", grupo: "103", estado: "Finalizado" },
        { nombre: "Elías Hernández Marcial", semestre: "Quinto", grupo: "103", estado: "Finalizado" }
    ];

    const filteredData = data.filter(item =>
        item.nombre.toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter === "" || item.estado === statusFilter)
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <select className="form-select w-auto" onChange={e => setStatusFilter(e.target.value)}>
                        <option value="">Mostrar todos</option>
                        <option value="Sin revisar">Sin revisar</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                    <input type="text" className="form-control w-auto" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <table className="table table-striped text-center">
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
                                <td><i className="bi bi-file-earmark-text"></i></td>
                                <td className={item.estado === "Finalizado" ? "text-success" : item.estado === "Pendiente" ? "text-danger" : "text-muted"}>
                                    {item.estado}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <nav>
                        <ul className="pagination">
                            {[...Array(totalPages).keys()].map(num => (
                                <li key={num} className={`page-item ${currentPage === num + 1 ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(num + 1)}>{num + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            <FooterInesis />
        </div>
    );
}

export default ListadoEstudioSocioeconomico;
