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
    const value = e.target.value;
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
            <div className="mt-1 text-secondary" style={{ fontSize: "0.9em" }}>
              Archivo enviado: {archivoExistente}
              <br />
              <small>Si subes un nuevo archivo, reemplazará al anterior</small>
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
            placeholder="Ingresa tus observaciones"
            value={observaciones}
            onChange={handleObservacionesChange}
          />
        </div>
      </div>
    </>
  );
};

export default RecibosDeLuz;
