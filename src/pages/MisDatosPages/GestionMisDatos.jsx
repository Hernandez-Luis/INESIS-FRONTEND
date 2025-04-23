import React from 'react'
import { MisDatos } from './MisDatos'

export default function GestionMisDatos() {

    const guardarDatosGastosIngresos = async (nuevosGastosIngresos) => {
        try {
            //Hacer llamada a la API

        // Validacion de los datos y retornar el error en caso de que exista

        // Si sale bien retornar nulo
        return []
        } catch (error) {
            console.error("Error al guardar GastosIngresos: ", error)
            return["Ocurrio un error"]
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
