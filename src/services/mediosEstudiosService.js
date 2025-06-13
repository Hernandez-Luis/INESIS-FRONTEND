import axiosInstance from '../api/axiosConfig';

const API_URL = '/medios_estudios';

const getAll = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const create = async (data) => {
  try {
    const response = await axiosInstance.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const update = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const remove = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
