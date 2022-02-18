const axios = require('axios');

const BASE_URL = 'http://localhost:8080/api/admin';

export const getAllAdmins = () => axios.get(BASE_URL);
export const getAdmin = (id) => axios.get(`${BASE_URL}/${id}`);
export const updateAdmin = (id, data) => axios.put(`${BASE_URL}/update/${id}`, data);
export const deleteAdmin = (id) => axios.delete(`${BASE_URL}/${id}`);
export const createAdmin = (admin) => axios.post(`${BASE_URL}/add`, admin);
