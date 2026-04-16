import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/cp';


const getByCp = async (cp) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/${cp}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export default {
    getByCp,
};
