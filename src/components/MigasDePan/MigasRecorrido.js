import React from 'react';
import '../../styles/StyleMigasDePan/MigasDePan.css'; // Archivo CSS para los estilos

const MigasRecorrido = ({ items }) => {
    return (
        <div>
            <nav className="breadcrumb ms-5 " style={{ background: 'var(--color-gris2)' }}>
                <ul>
                    {items.map((link, index) => (
                        <li key={index} className="breadcrumb-item">
                            <a href={link.url}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>

    )
};

export default MigasRecorrido;