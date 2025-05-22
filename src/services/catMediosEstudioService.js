import axiosInstance from '../api/axiosConfig';

const API_URL = '/cat_medios_estudio';

const getAll = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  getAll,
};
