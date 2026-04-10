import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/miTutor';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;    
    } catch (error) {
        throw error.response.data;
    }
};

const create = async (miTutor) => {
    try {
        const response = await axiosInstance.post(API_URL, miTutor);
        return response.data;    
    } catch (error) {
        throw error.response.data;
    }
}

const update = async (id,miTutor) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`, miTutor);
    return response.data;
    } catch (error) {
        throw error.response.data;
    }
    
}

const deleteMiTutor = async (id) => {
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
    deleteMiTutor,
};