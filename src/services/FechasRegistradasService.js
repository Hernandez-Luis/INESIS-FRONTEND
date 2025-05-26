import axiosInstance from '../api/axiosConfig';

const API_URL = '/fechas-registradas';

const getAll = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const create = async (params) => {
  try {
    console.log("Datos enviados:", params);
    const response = await axiosInstance.post(API_URL, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const update = async (id, params) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteFecha = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error.response.data;
  }
};

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
