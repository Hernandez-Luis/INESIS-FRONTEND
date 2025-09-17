import axiosInstance from '../api/axiosConfig';
const API_URL = '/api/pdf'; // ajusta si tu URL base es distinta


export const generarPdfAlumno = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/alumnopdf/${id}`, {timeout: 5000});
        return response.data; // esto será el string Base64
    } catch (error) {
        throw error.response?.data || 'Error al generar el PDF del alumno';
    }
};
