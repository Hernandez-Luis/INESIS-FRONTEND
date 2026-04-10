import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/alumno';

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
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const update = async (id, params) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};


const updateAlumnoConUsuario = async (alumnoId, usuarioId) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/${alumnoId}/usuario`,
      { idUsuario: usuarioId }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteAlumno = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error.response.data;
  }
};

const checkIfExists = async (curp, matricula, correo) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/checkExists?curp=${curp}&matricula=${matricula}&correo=${correo}`);
    return response.data.exists;
  } catch (error) {
    throw error.response.data;
  }
};


const enviarRevisionAlumno = async (id, observaciones, estado) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/${id}/revision`, {
      observaciones,
      estado,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al enviar la revisión';
  }
};


const setEstudioSocioeconomicoCompleto = async (id) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/completarEstudio/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const importarDesdeExcel = async (formData) => {
  
  try {
    const response = await axiosInstance.post(`${API_URL}/importar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 300000
    });
    return response;
  } catch (error) {
    // Manejar diferentes tipos de errores
    if (error.response) {
      // El servidor respondió con un código de error
      throw {
        message: error.response.data.message || 'Error al importar alumnos',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      throw {
        message: 'No hay respuesta del servidor',
        status: 0
      };
    } else {
      // Error en la configuración de la petición
      throw {
        message: 'Error en la configuración de la petición',
        status: 0
      };
    }
  }
};

const cambiarPassword = async (idAlumno, nuevaPassword) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${idAlumno}/password`, {
      password: nuevaPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al cambiar la contraseña';
  }
};

const editarMatricula = async (id, nuevaMatricula) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/${id}/editarMatricula`, {
      matricula: nuevaMatricula
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al editar la matrícula';
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  updateAlumnoConUsuario,
  deleteAlumno,
  checkIfExists,
  enviarRevisionAlumno,
  setEstudioSocioeconomicoCompleto,
  importarDesdeExcel,
  cambiarPassword,
  editarMatricula
};
