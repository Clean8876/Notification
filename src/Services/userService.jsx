// src/services/userService.js
import axios from 'axios';

const API_URL =  import.meta.env.VITE_API_URL;

export const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addUser = async (user) => {
    const response = await axios.post(API_URL, user);
    return response.data;
};
