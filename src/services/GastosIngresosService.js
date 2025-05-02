import axiosInstance from '../api/axiosConfig';

const API_URL = '/gastosIngresos';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;    
    } catch (error) {
        throw error.response.data;
    }
};

const create = async (gastosIngresos) => {
    try {
        const response = await axiosInstance.post(API_URL, gastosIngresos);
        return response.data;    
    } catch (error) {
        throw error.response.data;
    }
}

const update = async (id,gastosIngresos) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`, gastosIngresos);
    return response.data;
    } catch (error) {
        throw error.response.data;
    }
    
}

const deleteGastosIngresos = async (id) => {
    try {
        await axiosInstance.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error.response.data;        
    }
}

export default {
    getAll,
    create,
    update,
    deleteGastosIngresos
};