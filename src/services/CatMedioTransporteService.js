import axiosInstance from '../api/axiosConfig';

const API_URL = '/cat_medios_transporte';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export default {
    getAll
}