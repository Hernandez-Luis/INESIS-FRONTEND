import React from 'react';

const SeleccionarCombo = ({ name, options, onChange, value = '', placeholder, disabled = false }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange({
      target: {
        name,
        value: selectedValue,
      },
    });
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
      {options.map((option, index) => {
        if (typeof option === 'object' && option !== null) {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        } else {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        }
      })}

    </select>
  );
};

export default SeleccionarCombo;
