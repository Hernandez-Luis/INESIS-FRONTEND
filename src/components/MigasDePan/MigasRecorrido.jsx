import React from 'react';
import '../../styles/StyleMigasDePan/MigasDePan.css'; // Archivo CSS para los estilos

const MigasRecorrido = ({ items }) => {
    return (
        <div className="breadcrumb-container pt-2 ms-4">
            <nav className="breadcrumb">
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