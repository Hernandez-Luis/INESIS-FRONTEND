import React from 'react'
import { MisDatos } from './MisDatos'
import GastosIngresosService from '../../services/GastosIngresosService';
import Swal from 'sweetalert2';
import TransporteService from '../../services/TransporteService';
import MisDatosService from '../../services/MisDatosService';


export default function GestionMisDatos() {

  // *************  FUNCION PARA GUARDAR LOS DATOS OBTENIDOS DEL FORMULARIO ******************
  const guardarMisDatos = async (coleccionDatos) => {
    try {
      await MisDatosService.create(coleccionDatos)
      return []
    } catch (error) {
      const errores = []
      if (error) {
        errores.push(error)
      }
      return errores
    }
  }

  const updateMisDatos = async (id, coleccionDatos) => {
    try {
      await MisDatosService.update(id, coleccionDatos)
      return []
    } catch (error) {
      return error;
    }
  }

  return (
    <div>
      <MisDatos
        onAdd={guardarMisDatos}
        update={updateMisDatos}
      />
    </div>
  )
}
