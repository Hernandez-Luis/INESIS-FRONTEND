import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/ocupacion';

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


export default {
    getAll,
    getById,
};
