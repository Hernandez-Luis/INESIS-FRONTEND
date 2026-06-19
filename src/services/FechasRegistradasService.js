/**
 * ============================================================================
 * MÓDULO: FechasRegistradasService.js
 * DESCRIPCIÓN:
 * Servicio cliente para manejar operaciones sobre las fechas registradas
 * por carrera (abrir/cerrar encuestas, etc.).
 *
 * FUNCIONALIDADES:
 * - Obtener todas las fechas registradas o por id.
 * - Crear, actualizar y eliminar fechas.
 * - Obtener fechas asociadas a una carrera.
 *
 * DEPENDENCIAS:
 * - axiosInstance (configuración central de Axios)
 *
 * AUTOR: Nayeli Velasco López
 * PROYECTO: INESIS (Sistema de Información Socioeconómica)
 * FECHA DE CREACIÓN: 9 de marzo de 2025
 * ÚLTIMA MODIFICACIÓN: Marzo 2025
 * ============================================================================
 */

import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/fechas-registradas';

// Obtiene todas las fechas registradas
const getAll = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtiene una fecha registrada por su id
const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Crea una nueva fecha registrada para una carrera
const create = async (params) => {
  try {
    const response = await axiosInstance.post(API_URL, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualiza una fecha existente por id
const update = async (id, params) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

// Elimina una fecha registrada
const deleteFecha = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error.response.data;
  }
};

// Obtiene la(s) fecha(s) asociadas a una carrera. Devuelve null si no existe.
const getByCarrera = async (idCarrera) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/carrera/${idCarrera}`);
    return response.data;
  } catch (error) {
    // Si el backend responde con 404 (no encontrada), devolvemos null
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error.response.data;
  }
};


export default {
  getAll,
  getById,
  create,
  update,
  deleteFecha,
  getByCarrera
};
