/**
 * ============================================================================
 * MÓDULO: RevisorService.js
 * DESCRIPCIÓN:
 * Cliente HTTP para interactuar con el backend de revisores.
 * Proporciona operaciones CRUD y utilidades como exportar a Excel.
 *
 * FUNCIONALIDADES:
 * - Listar, obtener, crear, actualizar y eliminar revisores.
 * - Verificar existencia por matrícula.
 * - Exportar datos a Excel.
 *
 * DEPENDENCIAS:
 * - axiosInstance (configuración central de Axios)
 *
 * AUTOR: Nayeli Velasco López
 * PROYECTO: INESIS (Sistema de Información Socioeconómica)
 * FECHA DE CREACIÓN: 9 de marzo de 2025
 * ÚLTIMA MODIFICACIÓN: Marzo 2025
 * ============================================================================
 */

import axiosInstance from '../api/axiosConfig';

const API_URL = '/api/revisor';

// Obtiene todos los revisores
const getAll = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtiene un revisor por id
const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Crea un nuevo revisor
const create = async (params) => {
  try {
    const response = await axiosInstance.post(API_URL, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualiza un revisor por id
const update = async (id, params) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualiza la relación entre un revisor y su usuario en el sistema
const updateRevisorConUsuario = async (revisorId, usuarioId) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/${revisorId}/usuario`,
      { idUsuario: usuarioId }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Elimina un revisor
const deleteRevisor = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error.response.data;
  }
};

// Chequea existencia por matrícula para evitar duplicados
const checkIfExists = async (matricula) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/checkExists?matricula=${matricula}`);
    return response.data.exists;
  } catch (error) {
    throw error.response.data;
  }
};

// Exporta la lista de revisores a Excel (o formato proporcionado por backend)
const exportarExcel = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/exportar`, {timeout: 6000});
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al exportar a Excel';
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  updateRevisorConUsuario,
  deleteRevisor,
  checkIfExists,
  exportarExcel,
};
