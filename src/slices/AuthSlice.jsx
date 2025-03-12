import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false, // Added 'success' state for registration
};

const authSlice = createSlice({
  name: 'auth', // Renamed from 'user' to 'auth' for clarity
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
      state.success = false; // Reset success on logout as well
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
    clearSuccess: (state) => { // Added reducer to clear success state
      state.success = false;
    },
    clearError: (state) => { // Added reducer to clear error state
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false; // Reset success on new registration attempt
      })
      .addCase(registerUser.fulfilled, (state) => { // Payload not used here as registration may not return data
        state.loading = false
        state.success = true // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
        state.success = false; // Reset success on registration failure
      })
      // login user (existing reducers - no changes needed)
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload
        state.userToken = payload.userToken
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      });
  },
})

export const { logout, setCredentials, clearSuccess, clearError } = authSlice.actions; // Export new actions
export default authSlice.reducer