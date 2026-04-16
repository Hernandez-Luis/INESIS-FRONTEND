// RecibosDeLuz.jsx
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecibosDeLuz = ({ onChangeFile, onChangeObservaciones, observacionesIniciales = "", archivoExistente = null }) => {

  const [observaciones, setObservaciones] = useState(observacionesIniciales);

  // Actualizar observaciones cuando cambien las iniciales
  useEffect(() => {
    setObservaciones(observacionesIniciales);
  }, [observacionesIniciales]);

  const handleObservacionesChange = (e) => {
    let value = e.target.value;

    if (value.length > 300) {
      value = value.substring(0, 300);
    }

    setObservaciones(value);
    onChangeObservaciones(value);
  };

  return (
    <>
      <div
        className="container my-4"
        style={{
          backgroundColor: 'var(--color-gris2)',
          borderRadius: '10px',
          padding: '1.5rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}
      >
        <h5 className="mb-3" style={{ color: 'var(--color-morado2)' }}>
          Recibos de luz
        </h5>

        {/* Campo para adjuntar recibo */}
        <div className="mb-3">
          <label htmlFor="recibo" className="form-label">
            Adjunta tus recibos de luz.
          </label>
          <input
            type="file"
            className="form-control"
            id="recibo"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={onChangeFile}
          />
          {archivoExistente && (
            <div className="mt-1 text-success" style={{ fontSize: "0.9em" }}>
              Ya existe un archivo cargado: <strong>{archivoExistente}</strong>
              <br />
              <small>Solo sube uno nuevo si deseas reemplazarlo</small>
            </div>
          )}
        </div>

        {/* Campo de observaciones */}
        <div className="mb-3">
          <label htmlFor="observaciones" className="form-label">
            Observaciones
          </label>
          <textarea
            className="form-control"
            id="observaciones"
            rows="4"
            placeholder="Ingresa tus observaciones (máximo 300 caracteres)"
            value={observaciones}
            maxLength={300}
            onChange={handleObservacionesChange}
          />

          <div style={{ textAlign: "right", fontSize: "0.85rem", color: "#6B7280" }}>
            {observaciones.length}/300 caracteres
          </div>
        </div>
      </div>
    </>
  );
};

export default RecibosDeLuz;
