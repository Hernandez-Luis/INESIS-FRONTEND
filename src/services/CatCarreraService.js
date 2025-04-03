import axiosInstance from '../api/axiosConfig';

const API_URL = '/carrera';

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
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const update = async (id, params) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`, params);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteCarrera = async (id) => {
    try {
        await axiosInstance.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteCarrera
};
