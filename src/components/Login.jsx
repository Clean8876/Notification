import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import api from '../Services/api';
import { login } from '../slices/AuthSlice';

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
                console.log('Dispatching login to Redux...');
                dispatch(login({
                    user: { name, email, firebaseProjects},
                    token: token
                }));
                
                // Redirect
                navigate('/dashboard');
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
                    <p className="mt-6 text-center text-sm text-gray-600 font-Poppins">
                        <Link to="/signup" className="text-primaryButton hover:underline font-Poppins">
                            Create new account
                        </Link>
                    </p>
                </form>

                {/* Social Login Options */}
                <div className="mt-6 flex flex-col items-center">
                    <p className="text-primaryButton font-Poppins mb-3">Or continue with</p>
                    <button 
                        type="button"
                        onClick={initiateGoogleAuth}
                        disabled={loading}
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <img src="google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;