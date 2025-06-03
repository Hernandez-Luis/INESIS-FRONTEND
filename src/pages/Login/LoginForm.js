  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import "bootstrap/dist/css/bootstrap.min.css";
  import logoUnsij from '../../assets/logo.png';
  import logoLogin from '../../assets/login1.png';
  import FooterInesis from "../../components/FooterInesis/FooterInesis";
  import Swal from 'sweetalert2';


  const LoginForm = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [usuar, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch(`${process.env.REACT_APP_API_INESIS_URL}/usuario/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario: usuar, contrasenia: password }),
        });
    
        if (!response.ok) {
          const errorJson = await response.json();
          const mensaje = errorJson.mensaje || "Error desconocido";
    
          if (mensaje.includes("Usuario no encontrado")) {
            Swal.fire({
              title: '¡Alto!',
              text: `No existe un usuario con el nombre: ${usuar}`,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              timer: 3000,
              timerProgressBar: true,
            });
          } else if (mensaje.includes("Contraseña incorrecta")) {
            Swal.fire({
              title: '¡Alto!',
              text: 'La contraseña que ingresaste es incorrecta',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              timer: 3000,
              timerProgressBar: true,
            });
          } else {
            throw new Error(mensaje);
          }
    
          return;
        }


        const data = await response.json();

        const usuarioData = {
          id: data.id,
          usuario: data.usuario,
          estatus: data.estatus,
          rol: data.rol.nombreRol,
          alumnoId: data.alumno?.id || null
        };


        localStorage.setItem('usuario', JSON.stringify(usuarioData));
    
        console.log("Login exitoso:", data);
        navigate("/menuAlumno");
    
      } catch (error) {
        Swal.fire({
          title: 'Error de autenticación',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          timer: 3000,
          timerProgressBar: true,
        });
      }
    };
    
    

    return (
      <div className="d-flex flex-column min-vh-100" >
        <div className="container-fluid d-flex align-items-center justify-content-center bg-light flex-grow-1">
          <div className="col-md-5 d-flex align-items-center justify-content-center">
            <img src={logoLogin} alt="Login" className="img-fluid" />
          </div>

          <div className="col-md-2 p-2 justify-content-center align-items-center">
            <div className="text-center mb-4">
              <img src={logoUnsij} alt="Logo" className="img-fluid" style={{ maxHeight: "190px" }} />
              <h3 className="mt-2 text-primary">Bienvenido a INESIS</h3>
              <p>Para poder acceder por favor inicia sesión</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su usuario"
                  required
                  value={usuar}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={() => setPasswordShown(!passwordShown)}
                />
                <label className="form-check-label">Mostrar contraseña</label>
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{ padding: "10px" }}>INGRESAR</button>
            </form>
          </div>
        </div>
        <FooterInesis className="mt-auto" />
      </div>
    );
  };

  export default LoginForm;
