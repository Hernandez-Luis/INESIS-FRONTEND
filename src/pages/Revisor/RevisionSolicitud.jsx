import React from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'
import FooterInesis from '../../components/FooterInesis/FooterInesis'

export default function RevisionSolicitud() {
    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Solicitudes' },
        { url: '/PrincipalAdmin', label: 'Revisión' }
    ];

  return (
    <div>
        <NavInesis></NavInesis>
        <MigasRecorrido items={links}></MigasRecorrido>
        <div className='d-flex flex-column min-vh-100'>
            <div className='flex-grow-1'>
                <h1 className='text-center' style={{color:'var(--color-morado1)',  fontWeight: 'bold'}}>Revision del documento</h1>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="mb-3 text-center">
                        {/* Primer div */}
                        <p>Contenido del primer div.</p>
                    </div>
                    <div className="text-center">
                        {/* Segundo div */}
                        <h3 style={{color:'var(--color-morado1)'}}>Comentario de observación</h3>
                        <textarea 
                            className="form-control" 
                            id="observaciones" 
                            rows="4" 
                            placeholder="Ingresa tus observaciones"
                            style={{width: '150%', height: '200px'}} 
                        />
                        
                        {/* Espacio entre el textarea y los botones */}
                        <div className="mt-4">
                            {/* Botones en la misma línea */}
                            <div className="d-flex justify-content-center gap-3">
                                <button style={{
                                    backgroundColor: 'var(--color-morado1)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}>
                                    Enviar correción
                                </button>
                                <button style={{
                                    backgroundColor: 'var(--color-morado1)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}>
                                    Marcar como finalizado
                                </button>
                            </div>
                            
                            {/* Botón Regresar en la siguiente línea y centrado */}
                            <div className="mt-3">
                                <button style={{
                                    backgroundColor: 'var(--color-morado1)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}>
                                    Regresar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterInesis></FooterInesis>
        </div>
    </div>
  )
}
