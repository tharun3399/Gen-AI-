import axios from 'axios';

const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api'
  : 'https://gen-ai-1-f1mw.onrender.com/api';

const ensureApiPath = (baseUrl) => {
  if (!baseUrl) return DEFAULT_API_BASE_URL;

  const trimmed = baseUrl.replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const API_BASE_URL = ensureApiPath(import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Categories API
export const categoriesAPI = {
  getAll: () => apiClient.get('/categories'),
  getById: (id) => apiClient.get(`/categories/${id}`),
  create: (data) => apiClient.post('/categories', data),
  update: (id, data) => apiClient.put(`/categories/${id}`, data),
  delete: (id) => apiClient.delete(`/categories/${id}`)
};

// Projects API
export const projectsAPI = {
  getAll: () => apiClient.get('/projects'),
  getById: (id) => apiClient.get(`/projects/${id}`),
  getByCategory: (categoryId) => apiClient.get(`/categories/${categoryId}/projects`),
  create: (data) => apiClient.post('/projects', data),
  update: (id, data) => apiClient.put(`/projects/${id}`, data),
  delete: (id) => apiClient.delete(`/projects/${id}`)
};

export default apiClient;
