import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfVisor = ({ archivosUrl }) => {
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [pdfFiles, setPdfFiles] = useState([]);
    const pluginDeDiseño = defaultLayoutPlugin();

    useEffect(() => {
        const procesarArchivos = async () => {
            try {
                const archivosProcesados = await Promise.all(
                    archivosUrl.map(async (url) => {
                        // Si es una Blob URL (comienza con 'blob:') o data URL (base64)
                        if (url.startsWith('blob:') || url.startsWith('data:application/pdf')) {
                            return url; // No necesita verificación
                        }
                        
                        // Verificar solo para URLs estáticas
                        const response = await fetch(url, { method: "HEAD" });
                        if (!response.ok) {
                            throw new Error(`Error ${response.status}: No se puede cargar ${url}`);
                        }
                        return url;
                    })
                );
                
                setPdfFiles(archivosProcesados);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        procesarArchivos();
    }, [archivosUrl]);

    if (cargando) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando documentos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
                <h3>📄 Error al cargar PDFs</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div style={{
            width: "95vw",
            maxWidth: "1600px",
            height: "85vh",
            margin: "auto",
            padding: "10px",
            background: "#f4f4f4",
            border: "2px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            overflowY: "auto"
        }}>
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js">
                {pdfFiles.map((url, index) => (
                    <div key={index} style={{
                        width: "100%",
                        background: "#fff",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "10px"
                    }}>
                        <Viewer 
                            fileUrl={url} 
                            plugins={[pluginDeDiseño]} 
                            onDocumentLoad={() => console.log(`PDF ${index} cargado correctamente`)}
                            onDocumentError={() => console.error(`Error al cargar PDF ${index}`)}
                        />
                    </div>
                ))}
            </Worker>
        </div>
    );
};

export default PdfVisor;