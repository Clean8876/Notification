import { createSlice } from '@reduxjs/toolkit';

let storedUserData = localStorage.getItem("userInfo");
let parsedUserData = null;
try {
  parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
} catch (error) {
  console.error("Error parsing userInfo from localStorage:", error);
  // Optionally clear the invalid data:
  localStorage.removeItem("userInfo");
}
const initialState = {
  user: parsedUserData,
  isAuthenticated: false,
  projectId: null, // Add projectId to state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUserApps: (state, action) => {
      if (state.user) {
        state.user.user.apps = action.payload;
        
      }
    },
  },
});

export const { login, logout , updateUserApps  } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const projectIds = (state) => state.auth.projectId;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;