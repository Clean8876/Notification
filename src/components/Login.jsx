import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa"; // Keep FaGoogle for the new button

import api from '../Services/api';
import { login } from '../slices/AuthSlice';
import { GoogleAuthProvider, signInWithPopup,getAuth } from 'firebase/auth';
import { auth } from './Firebase';


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // For email/password form
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // --- Existing Email/Password Validation ---
    const validate = () => {
        // (Your existing validation logic - keeping it the same)
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
        return Object.keys(newErrors).length === 0;
    };

    // --- Existing Email/Password Login Handler ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setApiError('');
        const isValid = validate();
        if (!isValid) {
            setLoading(false);
            return;
        }
        try {
            const response = await api.post('/api/login', { email, password });
            if (response.status === 200 && response.data?.data) {
                const { token, name, email, apps } = response.data.data;
                localStorage.setItem('authToken', token); // Consider if needed alongside Redux state
                localStorage.setItem('userInfo', JSON.stringify(response.data.data)); // Consider if needed

                // Dispatch using the structure from your original code
                dispatch(login({
                    user: { name, email, apps }, // Includes apps from your API
                    token
                }));

                // Redirect based on apps (from your original logic)
                if (!apps || apps.length === 0) {
                    navigate('/Home');
                } else {
                    navigate('/SendNotification');
                }
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setApiError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // --- NEW: Google Login Success Handler ---
    const handleGoogleLoginSuccess = async () => {
        setApiError('');
        setLoading(true);
        
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/cloud-platform.read-only');
            const result = await signInWithPopup(auth, provider);
            
        
            // 1. Get Firebase ID token
            const idToken = await result.user.getIdToken();
            console.log(idToken)
              // ✅ Get Google access token
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
              // ✅ Save it to localStorage
            localStorage.setItem('googleAccessToken', accessToken);
            
            // 2. Send token to your backend
            const response = await api.post('/api/auth/google-login', { idToken });
        
            console.log("Backend response:", {
                status: response.status,
                data: response.data
            });
        
            if (response.status === 200) {
                const { token, email, name } = response.data.data;
                console.log("jwt",token)
                
                // Use uid as the token
                
        
                // 3. Save to localStorage
                localStorage.setItem('authToken', token);
                localStorage.setItem('userInfo', JSON.stringify({ email, name, token }));
        
                // 4. Update Redux
                console.log('Dispatching login to Redux...');
                dispatch(login({
                    user: { name, email, apps: [] }, // Include empty apps array if needed
                    token: token
                }));
        
                // 5. Redirect
                navigate('/Home');
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            console.error("Authentication error:", {
                message: error.message,
                response: error.response?.data
            });
        
            setApiError(
                error.response?.data?.message ||
                error.message ||
                'Firebase Google authentication failed'
            );
        } finally {
            setLoading(false);
        }
    };

    // --- NEW: Google Login Error Handler ---
    const handleGoogleLoginError = () => {
        console.error('Google Login Failed');
        setApiError('Google Sign-In failed. Please try again.');
        // setLoading(false); // Reset loading if you added it
    };


    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
                    Login here
                </h2>

                {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}

                {/* --- Email/Password Form --- */}
                <form className="space-y-4" onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div>
                        <input
                            type="email" id="email" name="email" placeholder="Email Address"
                            value={email} onChange={(e) => setEmail(e.target.value)} required
                            className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    </div>
                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)} required
                            className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
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
                        type="submit" disabled={loading}
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

                {/* --- Social Login Options --- */}
                <div className="mt-6 flex flex-col items-center">
                    <p className="text-primaryButton font-Poppins mb-3">Or continue with</p>
                    <div className="flex space-x-4">
                        {/* NEW: Google Login Button */}
                            <button 
                                onClick={handleGoogleLoginSuccess}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 16px',
                                    backgroundColor: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                                >
                                <img 
                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                                    alt="Google" 
                                    style={{ width: '20px', marginRight: '10px' }}
                                />
                                Sign in with Google
                                </button>

                        {/* Placeholder buttons for other providers */}
                        {/* <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                            <FaFacebook className="h-5 w-5" />
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
                            <FaApple className="h-5 w-5" />
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;