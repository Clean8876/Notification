import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/AuthSlice.jsx'// Import authReducer

export const store = configureStore({
  reducer: {
    
    auth: authReducer,      // Register authReducer under the 'auth' key
  
  },
});