import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/whatsapp/api`;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const sendMessage = (to, templateName, templateData) =>
  api.post('/messages/send', { to, templateName, templateData });

export const getMessageHistory = () =>
  api.get('/messages/history');

export const getMessageTemplates = () =>
  api.get('/messages/templates');

export const login = (username, password) =>
  api.post('/auth/login', { username, password });

export default api;