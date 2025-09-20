// src/services/codigoPostalService.js
import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/domicilio';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const create = async (domicilio) => {
    try {
        const response = await axiosInstance.post(API_URL, domicilio);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

const update = async (id, domicilio) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`, domicilio);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

const deleteDomicilio = async (id) => {
    try {
        await axiosInstance.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
}

const getColoniasPorCP = async (cp) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/codigo_postal?cp=${cp}`);
        return response.data;
    } catch (error) {
        console.error('Error en getColoniasPorCP:', error);
        throw error.response?.data || 'Error desconocido';
    }
};

export default {
    getColoniasPorCP,
    getAll,
    create,
    update,
    deleteDomicilio

};
