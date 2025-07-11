import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getTasks = () => API.get('/tasks');
export const createTask = (data) => API.post('/tasks', data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
