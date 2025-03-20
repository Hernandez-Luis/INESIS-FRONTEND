import React from 'react';

// Componente CheckboxGroup que maneja la selección de múltiples checkboxes
const CheckboxGroup = ({ options, name, selectedOptions, onChange }) => {
    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        onChange(name, id, checked);
    };

    return (
        <div className="row">
            {options.map((option, index) => (
                <div className="col-md-4" key={index}>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={option}
                            checked={selectedOptions.includes(option)}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor={option}>
                            {option}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CheckboxGroup;
