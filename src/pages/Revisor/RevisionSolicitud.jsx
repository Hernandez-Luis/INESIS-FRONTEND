import React, { useState } from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import PdfVisor from '../../components/pdf/PdfVisor'; // Asegúrate de que coincida con la capitalización

export default function RevisionSolicitud() {
    const [comentario, setComentario] = useState("");
    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Solicitudes' },
        { url: '/PrincipalAdmin', label: 'Revisión' }
    ];

    // Funciones para manejar el clic en los botones
    const handleEnviarCorreccion = () => {
        console.log("Enviando corrección:", comentario);
        // Lógica para enviar la corrección
    };

    const handleMarcarFinalizado = () => {
        console.log("Marcado como finalizado");
        // Lógica para marcar como finalizado
    };

    const handleRegresar = () => {
        // Lógica para regresar
        console.log("Regresando...");
    };

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <div className="d-flex flex-column min-vh-100">
                <div className="flex-grow-1">
                    <h1 className="text-center" style={{ color: 'var(--color-morado1)', fontWeight: 'bold' }}>
                        Revisión del documento
                    </h1>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="w-100 d-flex justify-content-center">
                        <PdfVisor archivoUrl="/BECA-COLEGIATURApdf.pdf" />
                    </div>

                        <div className="text-center">
                            {/* Segundo div */}
                            <h3 style={{ color: 'var(--color-morado1)' }}>Comentario de observación</h3>
                            <textarea
                                className="form-control"
                                id="observaciones"
                                rows="4"
                                placeholder="Ingresa tus observaciones"
                                style={{ width: '100%', height: '200px' }}
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                            />
                            
                            <div className="mt-4">
                                {/* Botones en la misma línea */}
                                <div className="d-flex justify-content-center gap-3">
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handleEnviarCorreccion}
                                    >
                                        Enviar corrección
                                    </button>
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handleMarcarFinalizado}
                                    >
                                        Marcar como finalizado
                                    </button>
                                </div>
                                
                                {/* Botón Regresar en la siguiente línea y centrado */}
                                <div className="mt-3">
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handleRegresar}
                                    >
                                        Regresar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterInesis />
            </div>
        </div>
    );
}