import React from 'react'
import { MiTutor } from './MiTutor'
import MiTutorService from '../../services/MiTutorService'

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
    
  return (
    <div>
        <MiTutor
            onAdd={guardarMiTutor}
        />
    </div>
  )
}
