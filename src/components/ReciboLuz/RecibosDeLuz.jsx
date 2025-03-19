import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const RecibosDeLuz = () => {
  const handleGuardar = () => {
    console.log("Marcado como finalizado");
};
  return (
    <>
      <div 
        className="container my-4" 
        style={{
          backgroundColor: 'var(--color-gris2)', // Fondo gris claro
          borderRadius: '10px',
          padding: '1.5rem',
          maxWidth: '600px',  // Limitar el tamaño máximo
          margin: '0 auto'    // Centrar el componente
        }}
      >
        {/* Título */}
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
          />
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
          />
        </div>
      </div>

      {/* Botón Guardar (Fuera del div con fondo gris) */}
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '50px' }}>
        <button className='btn btn-primary btn-lg' onClick={handleGuardar}>Guardar</button>
      </div>
    </>
  );
};

export default RecibosDeLuz;
