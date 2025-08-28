import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function handleLogin(password: string) {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/admin/login`, { password });
    console.log('Login OK:', res.data);
  } catch (error: any) {
    console.error('Erro no login:', error.response?.data || error.message);
  }
}
