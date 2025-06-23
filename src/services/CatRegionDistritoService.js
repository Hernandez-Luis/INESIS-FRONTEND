import axiosInstance from '../api/axiosConfig';

const API_REGION_URL = '/regiones';
const API_DISTRITO_URL = '/distritos';

// Obtener todas las regiones
const getAllRegions = async () => {
    try {
        const response = await axiosInstance.get(API_REGION_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error al obtener regiones';
    }
};

// Obtener todos los distritos
const getAllDistricts = async () => {
    try {
        const response = await axiosInstance.get(API_DISTRITO_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error al obtener distritos';
    }
};

// Obtener distritos filtrados por región (por id)
const getDistrictsByRegion = async (regionId) => {
    try {
        const response = await axiosInstance.get(`${API_DISTRITO_URL}/region/${regionId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error al obtener distritos por región';
    }
};

export default {
    getAllRegions,
    getAllDistricts,
    getDistrictsByRegion,
};
