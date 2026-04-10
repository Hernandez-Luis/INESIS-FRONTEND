import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/servicios_vivienda';

/**
 * Obtiene todos los registros de servicios de vivienda.
 */
const getAll = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Obtiene un servicio de vivienda por su ID.
 * @param {number} id 
 */
const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Crea un nuevo servicio de vivienda.
 * @param {Object} params - Debe incluir `id_vivienda_familiar` como obligatorio.
 */
const create = async (params) => {
  try {
    const response = await axiosInstance.post(API_URL, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Actualiza un servicio de vivienda existente.
 * @param {number} id 
 * @param {Object} params 
 */
const update = async (id, params) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Elimina un servicio de vivienda por su ID.
 * @param {number} id 
 */
const deleteById = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteById
};
