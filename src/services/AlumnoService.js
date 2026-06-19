/**
 * ============================================================================
 * MÓDULO: AlumnoService.js
 * DESCRIPCIÓN:
 * Servicio cliente para interactuar con el endpoint de alumnos del backend.
 * Provee métodos para CRUD, importación y operaciones específicas del flujo.
 *
 * FUNCIONALIDADES:
 * - Obtener lista de alumnos y obtener por id.
 * - Crear, actualizar y eliminar alumnos.
 * - Importar alumnos desde Excel (multipart/form-data).
 * - Operaciones especiales: enviar revisión, completar estudio, cambiar password.
 *
 * DEPENDENCIAS:
 * - axiosInstance (configuración central de Axios)
 *
 * AUTOR: Nayeli Velasco López
 * PROYECTO: INESIS (Sistema de Información Socioeconómica)
 * FECHA DE CREACIÓN: 9 de marzo de 2025
 * ÚLTIMA MODIFICACIÓN: marzo 2025
 * ============================================================================
 */

import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/alumno';

// Obtiene todos los alumnos. Retorna un array con los datos del backend.
const getAll = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    // Re-lanza el error del servidor para que el caller lo maneje
    throw error.response.data;
  }
};

// Obtiene un alumno por su id
const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Crea un nuevo alumno. `params` debe contener los campos esperados por la API.
const create = async (params) => {
  try {
    const response = await axiosInstance.post(API_URL, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualiza un alumno por id con los parámetros enviados
const update = async (id, params) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};


// Asocia un usuario existente a un alumno (endpoint específico)
const updateAlumnoConUsuario = async (alumnoId, usuarioId) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/${alumnoId}/usuario`,
      { idUsuario: usuarioId }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Elimina un alumno por id
const deleteAlumno = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error.response.data;
  }
};

// Verifica si existen registros duplicados por curp, matricula o correo
const checkIfExists = async (curp, matricula, correo) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/checkExists?curp=${curp}&matricula=${matricula}&correo=${correo}`);
    return response.data.exists;
  } catch (error) {
    throw error.response.data;
  }
};


// Envía la revisión del alumno (observaciones y estado) al backend
const enviarRevisionAlumno = async (id, observaciones, estado) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/${id}/revision`, {
      observaciones,
      estado,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al enviar la revisión';
  }
};


// Marca el estudio socioeconómico como completo
const setEstudioSocioeconomicoCompleto = async (id) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/completarEstudio/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Importa alumnos desde un archivo Excel usando multipart/form-data
// Devuelve detalles del error en caso de fallo para facilitar el manejo en UI
const importarDesdeExcel = async (formData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/importar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 300000
    });
    return response;
  } catch (error) {
    // Manejar diferentes tipos de errores
    if (error.response) {
      // El servidor respondió con un código de error
      throw {
        message: error.response.data.message || 'Error al importar alumnos',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      throw {
        message: 'No hay respuesta del servidor',
        status: 0
      };
    } else {
      // Error en la configuración de la petición
      throw {
        message: 'Error en la configuración de la petición',
        status: 0
      };
    }
  }
};

// Cambia la contraseña del alumno identificado por id
const cambiarPassword = async (idAlumno, nuevaPassword) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${idAlumno}/password`, {
      password: nuevaPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al cambiar la contraseña';
  }
};

// Edita la matrícula de un alumno existente
const editarMatricula = async (id, nuevaMatricula) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/${id}/editarMatricula`, {
      matricula: nuevaMatricula
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al editar la matrícula';
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  updateAlumnoConUsuario,
  deleteAlumno,
  checkIfExists,
  enviarRevisionAlumno,
  setEstudioSocioeconomicoCompleto,
  importarDesdeExcel,
  cambiarPassword,
  editarMatricula
};
