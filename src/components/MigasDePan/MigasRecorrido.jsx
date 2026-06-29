import React from 'react';
import '../../styles/StyleMigasDePan/MigasDePan.css'; // Archivo CSS para los estilos

const MigasRecorrido = ({ items }) => {
    return (
        <div className="breadcrumb-container pt-2 pb-1 px-2 px-md-3 ms-2 ms-md-4 ms-lg-5 me-2 me-md-0">
            <nav className="breadcrumb-nav">
                <ul>
                    {items.map((link, index) => (
                        <li key={index} className="breadcrumb-item">
                            <a href={link.url}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default MigasRecorrido;