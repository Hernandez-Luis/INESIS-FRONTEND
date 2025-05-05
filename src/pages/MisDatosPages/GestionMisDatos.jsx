import React from 'react'
import Swal from 'sweetalert2';

import { MisDatos } from './MisDatos'
import GastosIngresosService from '../../services/GastosIngresosService';
import Swal from 'sweetalert2';

export default function GestionMisDatos() {

  // *************  FUNCION PARA GUARDAR LOS DATOS OBTENIDOS DEL FORMULARIO ******************
    const guardarDatosGastosIngresos = async (nuevosGastosIngresos) => {
        try {
          await GastosIngresosService.create(nuevosGastosIngresos)
          return []
        } catch (error) {
            const errores = []
            if(error){
              errores.push(error)
            }
            return errores
        }
    }

  return (
    <div>
        <MisDatos
            onAdd={guardarDatosGastosIngresos}
        />
    </div>
  )
}
