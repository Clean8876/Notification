import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6523-115-246-219-84.ngrok-free.app',
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