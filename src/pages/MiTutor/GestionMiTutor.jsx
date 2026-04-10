import React from 'react'
import { MiTutor } from './MiTutor'
import MiTutorService from '../../services/MiTutorService'
import { SpinnerCarga } from '../../utils/spinerCarga/SpinerCarga'

export const GestionMiTutor = () => {

    const guardarMiTutor = async(coleccionDatos) => {
        try {
            await MiTutorService.create(coleccionDatos)
            return []
        } catch (error) {
            const errores = []
            if(error){
                errores.push(error)
            }
            return errores
        }
    }

    const updateMiTutor = async(id, coleccionDatos) => {
        try {
            await MiTutorService.update(id, coleccionDatos)
            return []
        } catch (error) {
            console.error("Error al actualizar Mi Tutor:", error);
            return error;
        }
    }
    
  return (
    <div>
        <MiTutor
            onAdd={guardarMiTutor}
            update={updateMiTutor}
        />
        <SpinnerCarga />
    </div>
  )
}
