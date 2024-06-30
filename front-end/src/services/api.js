import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Replace with your backend URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const login = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, userData);
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
};
  
export const createPost = async (userData) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${API_URL}/post`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error Creating Blog Post:', error);
      throw error;
    }
};

export const getPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/post`);
      return response.data;
    } catch (error) {
      console.error('Error Creating Blog Post:', error);
      throw error;
    }
};

export const getPost = async (_id) => {
    try {
      const response = await axios.get(`${API_URL}/post/${_id}`);
      return response.data;
    } catch (error) {
      console.error('Error Creating Blog Post:', error);
      throw error;
    }
};