
import { MisDatos } from './MisDatos'
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
