import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import api from '../Services/api';
import { login } from '../slices/AuthSlice';
import Navbars from './Navbars';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
    
    // Email/Password Validation
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
        return Object.keys(newErrors).length === 0;
    };

    // Handle OAuth code from URL (after redirect back from Google)
    useEffect(() => {
        // Check if we have a code in the URL (after OAuth redirect)
        const authCode = new URLSearchParams(window.location.search).get('code');
        
        if (authCode) {
            handleAuthCode(authCode);
            
            // Clean up the URL to remove the code parameter
            if (window.history.replaceState) {
                const newUrl = window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
            }
        }
    }, []);

    // Email/Password Login Handler
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
                localStorage.setItem('authToken', token);
                localStorage.setItem('userInfo', JSON.stringify(response.data.data));

                dispatch(login({
                    user: { name, email, apps },
                    token
                }));

                if (!apps || apps.length === 0) {
                    navigate('/dashboard/projects');
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

    // Function to handle the authorization code
    const handleAuthCode = async (authCode) => {
        setApiError('');
        setLoading(true);
        
        try {
            console.log('Authorization code received:', authCode);
            
            // Send the code to your backend
            const backendResponse = await api.post('/api/auth/google-login', {
              authCode: authCode,
              scope: "https://www.googleapis.com/auth/firebase.readonly", 
              requestAccessToken: true ,
            }, { headers: { 'Content-Type': 'application/json' } });
            
            console.log("Backend response:", {
                status: backendResponse.status,
                data: backendResponse.data
            });
            
            if (backendResponse.status === 200) {
                // Destructure the response data
                const { name, email, firebaseProjects, token } = backendResponse.data.data;
                console.log("JWT from backend:", token);
                
                
                // Save tokens and user info to localStorage
                localStorage.setItem('authToken', token);
                
                localStorage.setItem('userInfo', JSON.stringify({ email, name, token, firebaseProjects }));
                
                // Update Redux
                navigate('/projects');
                console.log('Dispatching login to Redux...');
                
                dispatch(login({
                    user: { name, email, firebaseProjects},
                    token: token
                }));
                
                // Redirect
                
            } else {
                throw new Error(backendResponse.data?.message || 'Google authentication failed on the backend');
            }
        } catch (error) {
            console.error("Google authentication error:", {
                message: error.message,
                response: error.response?.data
            });
            setApiError(error.response?.data?.message || error.message || 'Google authentication failed');
        } finally {
            setLoading(false);
        }
    };
    
    // Initialize Google OAuth flow
    const initiateGoogleAuth = () => {
        // Configure OAuth parameters
        const params = {
            client_id: googleClientId,
            redirect_uri: window.location.origin + window.location.pathname, // Current page URL
            scope: 'email profile https://www.googleapis.com/auth/firebase.readonly',
            response_type: 'code',
            access_type: 'offline', // Get a refresh token
            prompt: 'consent'
        };
        
        // Build the authorization URL
        const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + 
            new URLSearchParams(params).toString();
        
        // Redirect to Google's OAuth page
        window.location.href = authUrl;
    };
    
    return (
        <div>
        <div className="flex justify-center items-center min-h-screen">
            
            <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
                    Login here
                </h2>

                {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}

                {/* Email/Password Form */}
                <form className="space-y-4" onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div>
                        <input
                            type="email" id="email" name="email" placeholder="Email Address"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    </div>
                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
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
                    {/* <p className="mt-6 text-center text-sm text-gray-600 font-Poppins">
                        <Link to="/signup" className="text-primaryButton hover:underline font-Poppins">
                            Create new account
                        </Link>
                    </p> */}
                </form>

                {/* Social Login Options */}
                <div className="mt-6 flex flex-col items-center">
                    <p className="text-primaryButton font-Poppins mb-3">Or continue with</p>
                    <button 
                        type="button"
                        onClick={initiateGoogleAuth}
                        disabled={loading}
                        className="flex items-center gap-3 px-5 py-2.5 rounded-xl shadow-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        <span>Sign in with Google</span>
                    </button>
                    </div>
            </div>
        </div></div>
    );
}

export default Login;