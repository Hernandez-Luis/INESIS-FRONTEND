import React, { useState } from 'react';

const SeleccionarCombo = ({ options, onChange, placeholder, disabled = false }) => {
    const [selectedValue, setSelectedValue] = useState('');

    // Manejar la selección del usuario
    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value); // Actualizar el estado
        onChange(value); // Pasar la opción seleccionada al componente padre
    };

    return (
        <select
            style={{ color: 'var(--color-gris1)' }}
            value={selectedValue}
            onChange={handleChange}
            className='form-select'
            disabled = {disabled}
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