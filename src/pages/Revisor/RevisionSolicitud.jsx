import React, { useEffect, useState } from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import PdfVisor from '../../components/pdf/PdfVisor'; // Asegúrate de que coincida con la capitalización
import { generarPdfAlumno } from '../../services/pdfService';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AlumnoService from '../../services/AlumnoService';
import Swal from 'sweetalert2';


export default function RevisionSolicitud() {

  const [comentario, setComentario] = useState("");
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [estadoRevision, setEstadoRevision] = useState(null);
  const [pdfData, setPdfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { estudiante } = location.state || {};
  const navigate = useNavigate();

  const conCorrecciones = 2;
  const finalizado = 4;

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
        setError('No se pudo obtener el ID del alumno');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        let alumno = await AlumnoService.getById(alumnoId);
        setEstadoRevision(alumno.estadoRevision);
        setComentario(alumno.observaciones);
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

  const handleEnviarCorreccion = async () => {
    try {
      const comentarioAEnviar = estadoRevision === 3 ? nuevoComentario : comentario;
      if (!comentario.trim()) {
        mostrarAlerta({
          icon: 'warning',
          title: 'Por favor escribe un comentario de corrección.'
        });
        //alert("Por favor escribe un comentario de corrección.");
        return;
      }

      await AlumnoService.enviarRevisionAlumno(alumnoId, comentarioAEnviar, conCorrecciones);
      mostrarAlerta({
        icon: 'success',
        title: 'Corrección enviada correctamente'
      });
      setComentario(""); // Limpiar campo
      navigate('/ListadoEstudioSocioeconomico');
      // alert("Corrección enviada correctamente");
    } catch (error) {
      mostrarAlerta({
        icon: 'error',
        title: 'Error al enviar la corrección'
      });
      //alert("Error al enviar la corrección: " + error);
    }
  };

  const handleMarcarFinalizado = async () => {
    try {
      if (comentario.trim() !== "" && estadoRevision !== 3) {
        mostrarAlerta({
          icon: 'warning',
          title: 'No se puede finalizar si hay un comentario en observaciones'
        });
        return; // Detiene la ejecución si hay comentario
      }

      await AlumnoService.enviarRevisionAlumno(alumnoId, "", finalizado);

      mostrarAlerta({
        icon: 'success',
        title: 'Alumno marcado como finalizado correctamente'
      });

      setComentario(""); // Limpiar campo
      navigate('/ListadoEstudioSocioeconomico');

    } catch (error) {
      mostrarAlerta({
        icon: 'error',
        title: 'Error al marcar como finalizado'
      });
    }
  };


  const handleRegresar = () => {
    ;
    navigate('/ListadoEstudioSocioeconomico');
  };

  const mostrarAlerta = (config) => {
    Swal.fire({
      ...config,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        confirmButton.style.backgroundColor = '#28a745'; // Verde tipo Bootstrap
        confirmButton.style.color = 'white';
      },
    });
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'var(--color-morado1)', fontWeight: 'bold' }}>Cargando PDF...</h1>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'red', fontWeight: 'bold' }}>Error al cargar el pdf</h1>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Error</span>
        </div>
      </div>
    );
  }
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
              <div className="col-12 col-md-7 d-flex justify-content-center">
                {pdfData && pdfData.length > 0 ? (
                  <PdfVisor archivosUrl={pdfData} />
                ) : (
                  <div className='alert alert-info'> Documento no disponible </div>
                )}

              </div>

              {/* Sección de Comentarios */}
              <div className="col-12 col-md-3">
                <h3 className="text-center" style={{ color: 'var(--color-morado1)' }}>Comentario de observación</h3>

                {(estadoRevision === 3 || estadoRevision === 2) && (
                  <div className="mb-3">
                    <label className="fw-bold">Observaciones realizadas al alumno:</label>
                    <textarea
                      className="form-control"
                      value={comentario}
                      readOnly
                      style={{ background: "#f8f9fa", color: "#6c757d", marginBottom: "10px" }}
                      rows={4}
                    />
                    <hr />
                    <label className="fw-bold">Nueva observación:</label>
                    <textarea
                      className="form-control"
                      id="observaciones"
                      rows="4"
                      placeholder="Ingresa tus observaciones"
                      style={{ width: '100%', height: '100px' }}
                      value={nuevoComentario}
                      onChange={(e) => setNuevoComentario(e.target.value)}
                    />
                  </div>
                )}
                {(estadoRevision !== 3 && estadoRevision !== 2) && (
                  <textarea
                    className="form-control"
                    id="observaciones"
                    rows="4"
                    placeholder="Ingresa tus observaciones"
                    style={{ width: '100%', height: '200px' }}
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                )}

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
