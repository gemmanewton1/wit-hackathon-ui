import axios from "axios";

// Base URL for your local backend
const api = axios.create({
baseURL: 'http://localhost:8080'})

// Customers API
export const fetchCustomers = () => api.get('/customers');
export const fetchCustomerById = (id) => api.get(`/customers/${id}`);
export const addCustomer = (payload) => api.post('customers', payload);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

// Products API
export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const addProduct = (payload) => api.post('products', payload);
export const deleteProduct = (id) => api.delete(`/products/${id}`);