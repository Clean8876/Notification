

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
  const [apiError, setApiError] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // If no errors, form is valid
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError(''); 
    
  
  const isValid = validate();
  
  if (!isValid) {
    setLoading(false);
    return; // Stop if validation fails
  }
    try {
      const response = await api.post('/api/login', { email, password });
      
      if (response.status === 200 && response.data?.data) {
        // Extract user data from response
        const { token, name, email,apps } = response.data.data;
  
        // Store token in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userInfo', JSON.stringify(response.data.data));
        
        
        // Dispatch login action with user data
        dispatch(login({ 
          user: { 
            name, 
            email,
            apps
          },
          token
        }));
  
        // Redirect to home
        // Check if apps array exists and has valid projects
      if (!apps || apps.length === 0) {
        navigate('/Home'); // Redirect to Home if no projects
      } else {
        navigate('/SendNotification'); // Redirect to SendNotification if has projects
      }
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setApiError(errorMessage);
    }
     finally {
      setLoading(false);
      
    }
  
   
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
          Login here
        </h2>

        {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}

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
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
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

