import React, { useState } from 'react';

const RadioSelect = ({name, options, value, onChange, gris }) => {
  // Manejar la selección del usuario
  const handleOptionChange = (option) => {
    onChange(option); // Pasar la opción seleccionada al componente padre
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {options.map((option, index) => (
        <div key={index}>
          <label style={{color: gris ? 'var(--color-gris1)' : 'inherit',}}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => handleOptionChange(option)}
              style={{ marginRight: '5px'}}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioSelect;