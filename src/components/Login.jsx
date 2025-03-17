

import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../slices/AuthSlice'
import api from '../Services/api';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.post('/api/login', { email, password });
      
      if (response.status === 200 && response.data?.data) {
        // Extract user data from response
        const { token, name, email } = response.data.data;
  
        // Store token in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userInfo', JSON.stringify(response.data.data));
        
        
        // Dispatch login action with user data
        dispatch(login({ 
          user: { 
            name, 
            email 
          },
          token
        }));
  
        // Redirect to home
        navigate('/home');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
          Login here
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <GrFormView size={20} /> : <GrFormViewHide size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-primaryButton hover:underline font-Poppins">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-600 font-Poppins">
            <Link to="/signup" className="text-primaryButton hover:underline font-Poppins">
              Create new account
            </Link>
          </p>
        </form>

        {/* Social Login Options */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-primaryButton font-Poppins mb-3">Or continue with</p>
          <div className="flex space-x-4">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
              <FaGoogle className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
              <FaFacebook className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
              <FaApple className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

