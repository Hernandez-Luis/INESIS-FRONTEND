import React from 'react';
import NavInesis from "../../components/NavInesis/NavInesis";
import FooterInesis from "../../components/FooterInesis/FooterInesis";
import menuAlumnoImg from "../../assets/menuAlumno.png";

  const MenuAlumno = () => {
  const solicitarBeca = () => {
    console.log("Redirigir a formulario de solicitud de beca");
  };

  return (
    <div>
      <NavInesis />
      <div className="d-flex flex-column min-vh-100">
        {/* Título y recordatorio */}
        <div className="flex-grow-1 m-5 px-5 d-flex flex-column align-items-center text-center">
          <h1 style={{ color: "var(--color-morado2)" }}>Bienvenido Emmanuel</h1>
          <p className="recordatorio">
            ¡Recuerda que tienes hasta el día <b>10 de octubre</b> a las <b>23:59:59</b> para realizar tu estudio socioeconómico!
          </p>
        </div>

        {/* Contenido: Imagen a la izquierda y opciones a la derecha */}
        <div className="row mb-5 d-flex align-items-center">
          {/* Imagen */}
          <div className="col d-flex justify-content-center">
            <img src={menuAlumnoImg} alt="Formulario Ilustración" style={{ width: "350px", height: "auto" }} />
          </div>

          {/* Opciones */}
          <div className="col d-flex flex-column gap-3">
            <button
              onClick={solicitarBeca}
              className="w-75 p-4 text-start"
              style={{
                background: "var(--color-morado2)",
                color: "white",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span className="fs-5" style={{ fontWeight: "bold" }}>
                Solicitar beca colegiatura / Requisitar estudio socioeconómico
              </span>
              <br />
              <br />
              Dentro podrás llenar el formulario para tu estudio socioeconómico y solicitar una beca de colegiatura.
            </button>

            <button
              className="w-75 p-4 text-start"
              style={{
                background: "#E8E8E8",
                color: "black",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span className="fs-5" style={{ fontWeight: "bold" }}>
                Resultados del estudio socioeconómico
              </span>
              <br />
              <br />
              Aquí encontrarás los resultados de tu estudio socioeconómico y el estado de tu solicitud de beca.
            </button>
          </div>
        </div>

        <FooterInesis />
      </div>
    </div>
  );
  
};

export default MenuAlumno;
