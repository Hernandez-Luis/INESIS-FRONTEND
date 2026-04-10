import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/misDatos';

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;    
    } catch (error) {
        throw error.response.data;
    }
};

const getByIdAlumno = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/alumno/${id}`);
        return response.data;    
    } catch (error) {
        throw error.response?.data || 'Error al obtener datos del alumno';
    }
};


const create = async (misDatos) => {
    try {
        const response = await axiosInstance.post(API_URL, misDatos);
        return response.data;    
    } catch (error) {
        throw error.response.data;
    }
}

const update = async (id,misDatos) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`, misDatos);
    return response.data;
    } catch (error) {
        throw error.response.data;
    }
    
}

const deleteMisDatos = async (id) => {
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
    deleteMisDatos,
    getByIdAlumno
};