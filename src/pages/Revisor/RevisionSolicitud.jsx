import React, { useEffect, useState } from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import PdfVisor from '../../components/pdf/PdfVisor'; // Asegúrate de que coincida con la capitalización
import { generarPdfAlumno } from '../../services/pdfService';
import { useLocation } from 'react-router-dom';

export default function RevisionSolicitud() {

    const [comentario, setComentario] = useState("");
    const [pdfData, setPdfData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { estudiante } = location.state || {};

    console.log("Datos recibidos:", location.state);
    console.log("Estudiante recibido:", estudiante);
    const alumnoId = estudiante?.id;

    const links = [
        { url: '/MenuRevisor', label: 'Inicio' },
        { url: '/ListadoEstudioSocioeconomico', label: 'Solicitudes' },
        { url: '/Revision', label: 'Revisión' }
    ];

    const base64ToBlob = (base64) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'application/pdf' });
    };

    useEffect(() => {
        const fetchPdf = async () => {
            if (!alumnoId) {
                console.log("id del alumno", alumnoId);
                setError('No se pudo obtener el ID del alumno');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const pdfBase64 = await generarPdfAlumno(alumnoId);

                const pdfBlob = base64ToBlob(pdfBase64);
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setPdfData([pdfUrl]);
            } catch (err) {
                setError(err.message || 'Error al cargar el PDF');
            } finally {
                setLoading(false);
            }
        };

        fetchPdf();
        return () => {
            if (pdfData) {
            pdfData.forEach(url => URL.revokeObjectURL(url));
            }
        };
    }, [alumnoId]);

    const handleEnviarCorreccion = () => {
        console.log("Enviando corrección:", comentario);
    };

    const handleMarcarFinalizado = () => {
        console.log("Marcado como finalizado");
    };

    const handleRegresar = () => {
        console.log("Regresando...");
    };

    if (loading) return <div>Cargando PDF...</div>;
    if (error) return <div>Error: {error}</div>;
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
                                {pdfData && pdfData.length > 0 ?(
                                    <PdfVisor archivosUrl={pdfData} />  
                                ) : (  
                                    <div className='alert alert-info'> Documento no disponible </div>
                                )}

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
