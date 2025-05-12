import React from 'react'
import { MisDatos } from './MisDatos'
import GastosIngresosService from '../../services/GastosIngresosService';
import Swal from 'sweetalert2';
import TransporteService from '../../services/TransporteService';
import MisDatosService from '../../services/MisDatosService';


export default function GestionMisDatos() {

  // *************  FUNCION PARA GUARDAR LOS DATOS OBTENIDOS DEL FORMULARIO ******************
    const guardarDatosGastosIngresos = async (coleccionDatos) => {
        try {
          // await GastosIngresosService.create(nuevosGastosIngresos)
          await MisDatosService.create(coleccionDatos)
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
