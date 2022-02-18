const axios = require('axios');

const BASE_URL = 'http://localhost:8080/api/category';

export const getAllCategories = () => axios.get(BASE_URL);
export const getCategory = () => axios.get(BASE_URL);
export const updateCategory = (id, data) => axios.put(`${BASE_URL}/update/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${BASE_URL}/${id}`);
export const createCategory = (name) => axios.post(`${BASE_URL}/add`, name);
