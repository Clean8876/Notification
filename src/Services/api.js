import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Origin': window.location.origin
  }
});

// Add request interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  

export default api;




// //AuthEnd Point
// export const authEndpoint = {
//     SIGNUP_API: BASE_URL + "/api/register",
//     SIGNIN_API:BASE_URL+"/api/login",
    
// }



