// import React, { useState } from 'react';
// import { FaGoogle, FaFacebook } from "react-icons/fa6";
// import { FaApple } from "react-icons/fa";
// import { GrFormView, GrFormViewHide } from "react-icons/gr";
// import { Link, useNavigate } from 'react-router-dom';
// import { signin } from '../operations/Auth';

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const navigate = useNavigate(); // Hook for navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     // Call the signin function with necessary callbacks
//     await signin(email, password, navigate, setError, setSuccess);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
//         <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
//           Login here
//         </h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         {success && <p className="text-green-500 text-center mb-4">Login successful!</p>}
//         <form className="space-y-4" onSubmit={handleLogin}>
//           {/* Email Input */}
//           <div>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Password Input */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//             {/* Toggle Icon */}
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? <GrFormView size={20} /> : <GrFormViewHide size={20} />}
//             </button>
//           </div>

//           {/* Additional Links */}
//           <div className="mt-4 text-right">
//             <Link to="/forgot-password" className="text-sm text-primaryButton hover:underline font-Poppins">
//               Forgot your password?
//             </Link>
//           </div>

//           {/* Keep Me Logged In */}
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="rememberMe"
//               name="rememberMe"
//               className="h-4 w-4 accent-primaryButton focus:ring-primaryButton border-gray-300 rounded"
//             />
//             <label htmlFor="rememberMe" className="ml-2 block text-sm text-blue-500 font-Poppins">
//               Keep me logged in
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
//           >
//             {loading ? "Signing in..." : "Sign in"}
//           </button>
//           <p className="mt-6 text-center text-sm text-gray-600 font-Poppins">
//             <Link to="/signup" className="text-primaryButton hover:underline font-Poppins">
//               Create new account
//             </Link>
//           </p>
//         </form>

    //     {/* Social Login Options */}
    //     <div className="mt-6 flex flex-col items-center">
    //       <p className="text-primaryButton font-Poppins mb-3">Or continue with</p>
    //       <div className="flex space-x-4">
    //         <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
    //           <FaGoogle className="h-5 w-5" />
    //         </button>
    //         <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
    //           <FaFacebook className="h-5 w-5" />
    //         </button>
    //         <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">
    //           <FaApple className="h-5 w-5" />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
//   );
// }

// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { authEndpoint } from '../Services/api';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const {SIGNIN_API}=authEndpoint

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//           const response = await axios.post(
//             SIGNIN_API,
//               { email, password },
//               {
//                 headers: {
//                   'ngrok-skip-browser-warning': 'true', // Bypass ngrok warning
//                   'Content-Type': 'application/json',
//                   'Origin': window.location.origin // Explicit origin header
//                 }
//               }
//           );
  
//           if (response.status === 200) {
//               window.location.href = '/home'; // Direct redirect
//           }
//       } catch (error) {
//           alert(error.response?.data?.message || 'Login failed');
//       }
//     };

//     return (
//         <div className="login-container">
//             <form onSubmit={handleSubmit}>
//                 <h2>Login</h2>
                
//                 <div className="form-group">
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://4c3c-115-246-219-84.ngrok-free.app/api/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Origin': window.location.origin
          }
        }
      );

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/home'); // Redirect to home after login
      }
    } catch (err) {
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

