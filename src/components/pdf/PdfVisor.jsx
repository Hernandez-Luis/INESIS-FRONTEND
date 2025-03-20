import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfVisor = ({ archivosUrl }) => {
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [pdfActual, setPdfActual] = useState(0);
    const pluginDeDiseño = defaultLayoutPlugin();

    useEffect(() => {
        const verificarPdf = async () => {
            try {
                for(let url of archivosUrl){
                    const response = await fetch(url,{method:"HEAD"});
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
        <div style={{ textAlign: "center", border: "1px solid #ddd", padding: "10px", maxWidth: "80%", margin: "auto" }}>
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js">
                <Viewer fileUrl={archivosUrl[pdfActual]} plugins={[pluginDeDiseño]} />
            </Worker>
            
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
                <button
                    onClick={() => setPdfActual((prev) => (prev === 0 ? archivosUrl.length - 1 : prev - 1))}
                    disabled={archivosUrl.length <= 1}
                >
                    ⬅ Anterior
                </button>
                <span>{pdfActual + 1} / {archivosUrl.length}</span>
                <button
                    onClick={() => setPdfActual((prev) => (prev === archivosUrl.length - 1 ? 0 : prev + 1))}
                    disabled={archivosUrl.length <= 1}
                >
                    Siguiente ➡
                </button>
            </div>
        </div>
    );
};

export default PdfVisor;
