import React from 'react';
import '../../styles/StyleMigasDePan/MigasDePan.css';

const MigasRecorrido = ({ items }) => {
    return (
        <div className='ms-4'>
            <nav className="breadcrumb" style={{background: 'var(--color-gris2)'}}>
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