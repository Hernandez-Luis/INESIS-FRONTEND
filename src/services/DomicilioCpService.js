// src/services/codigoPostalService.js
import axiosInstance from '../api/axiosConfig';

const API_URL = '/cp/codigo_postal';

const getColoniasPorCP = async (cp) => {
  try {
    const response = await axiosInstance.get(`${API_URL}?cp=${cp}`);
    return response.data;
  } catch (error) {
    console.error('Error en getColoniasPorCP:', error);
    throw error.response?.data || 'Error desconocido';
  }
};

export default {
  getColoniasPorCP
};
