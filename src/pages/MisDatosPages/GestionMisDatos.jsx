import React from 'react'
import { MisDatos } from './MisDatos'
import GastosIngresosService from '../../services/GastosIngresosService';

export default function GestionMisDatos() {

    const guardarDatosGastosIngresos = async (nuevosGastosIngresos) => {
        try {
            // Hacer llamada a la API
            await GastosIngresosService.create(nuevosGastosIngresos)
            // mostrarExito("Reistrado de maner")

            // Validacion de los datos y retornar el error en caso de que exista

            // Si sale bien retornar nulo
        return []
        } catch (error) {
            console.error("Error al guardar GastosIngresos: ", error)
            return["Ocurrio un error"]
        }
    }

    const mostrarAlerta = (config) => {
        Swal.fire({
          ...config,
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.style.backgroundColor = 'var(--color-verde)';
          },
        });
      };
    
      const mostrarError = (mensajeHTML) => {
        mostrarAlerta({
          title: 'Error',
          html: mensajeHTML, // Usa HTML para mostrar los errores sin viñetas
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      };
    
      const mostrarCuidado = (mensaje) => {
        mostrarAlerta({
          title: '¡Cuidado!',
          text: mensaje,
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
      };
    
    
    
      const mostrarExito = (mensaje) => {
        mostrarAlerta({
          title: 'Éxito',
          text: mensaje,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      };

  return (
    <div>
        <MisDatos
            onAdd={guardarDatosGastosIngresos}
        />
    </div>
  )
}
