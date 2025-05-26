export const CheckBox = ({ id, opcion, onChange, checked }) => {
    return (
        <div className="d-flex align-items-center">
            <input
                style={{ width: '1.8em', height: '1.8em' }}
                className="form-check-input"
                type="checkbox"
                id={id}
                value={id} 
                onChange={onChange}
                checked={checked}
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
