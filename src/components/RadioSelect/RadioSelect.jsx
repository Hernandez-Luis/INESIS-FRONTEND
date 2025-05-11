import React from 'react';

const RadioSelect = ({ name, options, value, onChange, gris }) => {
  const handleOptionChange = (optionValue) => {
    onChange({
      target: {
        name,
        value: optionValue,
      },
    });
  };

  const normalizedOptions = options.map(option =>
    typeof option === 'string' ? { label: option, value: option } : option
  );

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {normalizedOptions.map((option, index) => (
        <div key={index}>
          <label style={{ color: gris ? 'var(--color-gris1)' : 'inherit' }}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => handleOptionChange(option.value)}
              style={{ marginRight: '5px' }}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioSelect;
