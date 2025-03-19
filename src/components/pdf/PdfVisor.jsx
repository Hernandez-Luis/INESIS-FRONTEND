import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfVisor = ({ archivoUrl }) => {
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const pluginDeDiseño = defaultLayoutPlugin();

    useEffect(() => {
        const verificarPdf = async () => {
            try {
                const response = await fetch(archivoUrl, { method: "HEAD" });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se puede cargar el PDF.`);
                }

                setError(null); // Reinicia el error si el PDF está disponible
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        verificarPdf();
    }, [archivoUrl]);

    if (cargando) {
        return <div>Cargando PDF...</div>;
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
                <h3>📄 PDF no disponible</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ height: "80vh", width: "100%", margin: "auto", border: "1px solid #ddd", padding: "10px" }}>
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js">
                <Viewer fileUrl={archivoUrl} plugins={[pluginDeDiseño]} />
            </Worker>

        </div>
    );
};

export default PdfVisor;
