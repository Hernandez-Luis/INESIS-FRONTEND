import axiosInstance from '../api/axiosConfig';

const API_URL = '/bienes_hogar';

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

const create = async (params) => {
  try {
    const response = await axiosInstance.post(API_URL, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const update = async (id, params) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, params);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

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
