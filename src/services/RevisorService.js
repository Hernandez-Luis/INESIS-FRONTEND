import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/revisor';

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

// Método para actualizar solo el usuario asociado al revisor (si lo necesitas)
const updateRevisorConUsuario = async (revisorId, usuarioId) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/${revisorId}/usuario`,
      { idUsuario: usuarioId }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteRevisor = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error.response.data;
  }
};

// Método para checar si existe un revisor por matrícula
const checkIfExists = async (matricula) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/checkExists?matricula=${matricula}`);
    return response.data.exists;
  } catch (error) {
    throw error.response.data;
  }
};

const exportarExcel = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/exportar`, {timeout: 6000});
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al exportar a Excel';
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  updateRevisorConUsuario,
  deleteRevisor,
  checkIfExists,
  exportarExcel,
};
