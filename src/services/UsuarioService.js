import axiosInstance from '../api/axiosConfig';

const API_URL = '/usuario';

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
    const response = await axiosInstance.post(API_URL, params);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const update = async (id, params) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, params);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteUsuario = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error.response.data;
  }
};

const getByAlumnoId = async (idAlumno) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/byAlumno/${idAlumno}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener el usuario por alumno";
  }
};


export default {
  getAll,
  getById,
  create,
  update,
  deleteUsuario,
  getByAlumnoId
};
