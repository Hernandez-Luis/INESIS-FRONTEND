import axiosInstance from '../api/axiosConfig';

const API_URL = '/usuario';

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

const deleteUsuario = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error.response.data;
  }
};

const getByAlumnoId = async (idAlumno) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/byAlumno/${idAlumno}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener el usuario por alumno";
  }
};

const getByRevisorId = async (idRevisor) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/byRevisor/${idRevisor}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al obtener el usuario por revisor";
  }
};

const verificarYActualizarContrasena = async ({ usuario, contrasena, nuevaContrasena }) => {
  try {
    // Verificar contraseña actual
    const response = await axiosInstance.post(`${API_URL}/verificar-contrasena`, {
      usuario,
      contrasena
    });

    // Si la verificación es exitosa, cambiar la contraseña
    if (response.data) {
      const cambioResponse = await axiosInstance.post(`${API_URL}/cambiar-contrasena`, {
        usuario,
        nuevaContrasena
      });
      return cambioResponse.data;
    } else {
      throw "La contraseña actual es incorrecta";
    }
  } catch (error) {
    throw error.response?.data || "Error al verificar o cambiar la contraseña";
  }
};

const cambiarContrasena = async ({ usuario, nuevaContrasena }) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/cambiar-contrasena`, {
      usuario,
      nuevaContrasena
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error al cambiar la contraseña";
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteUsuario,
  getByAlumnoId,
  verificarYActualizarContrasena,
  getByRevisorId,
  cambiarContrasena
};
