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

    const handleEnviarCorreccion = () => {
        console.log("Enviando corrección:", comentario);
    };

    const handleMarcarFinalizado = () => {
        console.log("Marcado como finalizado");
    };

    const handleRegresar = () => {
        console.log("Regresando...");
    };

    return (
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <div className="d-flex flex-column min-vh-100">
                <div className="flex-grow-1">
                    <h1 className="text-center mt-4 mb-4" style={{ color: 'var(--color-morado1)', fontWeight: 'bold' }}>
                        Revisión del documento
                    </h1>
                    <div className="container-fluid py-3">
                        <div className="row d-flex justify-content-center gap-4">
                            {/* Sección del PDF */}
                            <div className="col-12 col-md-5 d-flex justify-content-center">
                                <PdfVisor archivoUrl="/BECA-COLEGIATURApdf.pdf" />
                            </div>

                            {/* Sección de Comentarios */}
                            <div className="col-12 col-md-5">
                                <h3 className="text-center" style={{ color: 'var(--color-morado1)' }}>Comentario de observación</h3>
                                <textarea
                                    className="form-control"
                                    id="observaciones"
                                    rows="4"
                                    placeholder="Ingresa tus observaciones"
                                    style={{ width: '100%', height: '200px' }}
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                />
                                
                                <div className="mt-4 text-center">
                                    <div className="d-flex justify-content-center gap-3">
                                        <button className="btn btn-primary btn-lg" onClick={handleEnviarCorreccion}>
                                            Enviar corrección
                                        </button>
                                        <button className="btn btn-primary btn-lg" onClick={handleMarcarFinalizado}>
                                            Marcar como finalizado
                                        </button>
                                    </div>

                                    <div className="mt-3">
                                        <button className="btn btn-primary btn-lg" onClick={handleRegresar}>
                                            Regresar
                                        </button>
                                    </div>
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
