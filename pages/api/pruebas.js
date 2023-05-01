import axios from 'axios';

// URL base de la API
const baseUrl = 'http://localhost:3000';

// Función para obtener la lista de productos
export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/api/products`);
  return response.data;
};

// Función para obtener la lista de categorías
export const getCategories = async () => {
  const response = await axios.get(`${baseUrl}/api/categories`);
  return response.data;
};