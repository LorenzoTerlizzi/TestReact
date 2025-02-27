import axios from 'axios';

const API_BASE_URL = 'http://localhost:5010'//'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/persone?selezione=query+1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; 
  }
};

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/persone?selezione=query+3`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const fetchAttivita = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/persone?selezione=query+2`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};