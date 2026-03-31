import axios from 'axios';

// Адрес твоего FastAPI сервера (обычно 8000 порт)
const API_BASE_URL = 'http://127.0.0.1:8000';
const studentId = "001";

export const getStudentDashboard = async (studentId: string) => {
  try {
    const response = await axios.get(`${API_URL}/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных ученика:", error);
    throw error;
  }
};