import React from 'react';

export const CheckBox = ({ opcion, id, onChange }) => {
    return (
        <div className="d-flex align-items-center">
            <input
                style={{ width: '1.8em', height: '1.8em' }}
                className="form-check-input"
                type="checkbox"
                value=""
                id={id}
                onChange={() => onChange(id)} // Maneja el cambio
            />
            <label
                className="ms-2 form-check-label"
                style={{ color: 'var(--color-gris1)' }}
                htmlFor={id}
            >
                {opcion}
            </label>
        </div>
    );
};
