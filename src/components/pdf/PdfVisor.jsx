import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfVisor = ({ archivosUrl }) => {
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const pluginDeDiseño = defaultLayoutPlugin();

    useEffect(() => {
        const verificarPdf = async () => {
            try {
                for (let url of archivosUrl) {
                    const response = await fetch(url, { method: "HEAD" });
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: No se puede cargar ${url}`);
                    }
                }
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        verificarPdf();
    }, [archivosUrl]);

    if (cargando) {
        return <div>Cargando PDFs...</div>;
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
                <h3>📄 PDFs no disponibles</h3>
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
            overflowY: "auto" // Habilita el scroll vertical
        }}>
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js">
                {archivosUrl.map((url, index) => (
                    <div key={index} style={{
                        width: "100%",
                        background: "#fff",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "10px"
                    }}>
                        <Viewer fileUrl={url} plugins={[pluginDeDiseño]} />
                    </div>
                ))}
            </Worker>
        </div>
    );
};

export default PdfVisor;
