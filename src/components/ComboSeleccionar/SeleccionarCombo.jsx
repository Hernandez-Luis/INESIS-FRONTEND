import React, { useState } from 'react';

const SeleccionarCombo = ({ name, options, onChange, value = '', placeholder, disabled = false }) => {
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        onChange(selectedValue); // solo devuelve el valor seleccionado
    };

    return (
        <select
            name={name}
            style={{ color: 'var(--color-gris1)' }}
            value={value}
            onChange={handleChange}
            className='form-select'
            disabled={disabled}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};


export default SeleccionarCombo;