const axios = require('axios');

const BASE_URL = 'http://localhost:8080/api/books';

export const getAllBooks = () => axios.get(BASE_URL);
export const getBook = (id) => axios.get(`${BASE_URL}/${id}`);
export const updateBook = (id, data) => axios.put(`${BASE_URL}/update/${id}`, data);
export const deleteBook = (id) => axios.delete(`${BASE_URL}/${id}`);
export const createBook = (book) => axios.post(`${BASE_URL}/add`, book);
