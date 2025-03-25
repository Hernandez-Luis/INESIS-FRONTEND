import React, { useState } from 'react';

const RadioSelect = ({ options, onChange, gris }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Manejar la selección del usuario
  const handleOptionChange = (option) => {
    setSelectedOption(option); // Actualizar el estado
    onChange(option); // Pasar la opción seleccionada al componente padre
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {options.map((option, index) => (
        <div key={index}>
          <label style={{color: gris ? 'var(--color-gris1)' : 'inherit',}}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
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