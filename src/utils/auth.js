import api from './api';
import Cookies from 'js-cookie';

export const login = async (email, password, rememberMe) => {
  const response = await api.post('/Auth/login', {
    email,
    password,
    rememberMe,
  });
  const { token, user } = response.data;
  Cookies.set('authToken', token, { expires: rememberMe ? 7 : 1 });
  return { token, user };
};

export const validateToken = async (token) => {
  try {
    const response = await api.get('/Auth/ValidToken', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Token validation failed', error);
    return null;
  }
};

export const registerUser = async (userData) => {
  const response = await api.post('/Auth/register/user', userData);
  return response.data;
};

export const registerDoctor = async (doctorData) => {
  const response = await api.post('/Auth/register/doctor', doctorData);
  return response.data;
};

export const checkSession = async () => {
  const token = Cookies.get('authToken');
  if (!token) return null;
  try {
    const session = await validateToken(token);
    return session ? { session, token } : null;
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  Cookies.remove('authToken');
};
