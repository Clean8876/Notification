  // import { useState } from 'react';
  // import { useNavigate } from 'react-router-dom';
  // import { FaGoogle, FaFacebook } from "react-icons/fa6";
  // import { FaApple } from "react-icons/fa";
  // import { GrFormView, GrFormViewHide } from "react-icons/gr";
  // import { signUp } from '../operations/Auth';

  // function Signup() {
  //   const navigate = useNavigate();
  //   const [showPassword, setShowPassword] = useState(false);
  //   const [showPassword1, setShowPassword1] = useState(false);
  //   const [errorMessage, setErrorMessage] = useState('');
  //   const [successMessage, setSuccessMessage] = useState('');
  //   const [formData, setFormData] = useState({
  //     fullName: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //   });

  //   // Handle input changes
  //   const handleOnChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   // Handle form submission
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (formData.password !== formData.confirmPassword) {
  //       setErrorMessage("Passwords do not match");
  //       return;
  //     }

  //     setErrorMessage('');
  //     setSuccessMessage('');

  //     try {
  //        signUp(
  //         formData.fullName,
  //         formData.email,
  //         formData.password,
  //         formData.confirmPassword,
  //         navigate
  //       );
  //       setSuccessMessage("Signup successful! Redirecting...");
  //       setTimeout(() => navigate("/"), 2000);
  //     } catch (error) {
  //       setErrorMessage("Could not create an account. Please try again.");
  //     }
  //   };

  //   return (
  //     <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
  //       <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton">Create Account</h2>

  //       {/* Error & Success Messages */}
  //       {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
  //       {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <input
  //           type="text"
  //           name="fullName"
  //           placeholder="Full Name"
  //           required
  //           value={formData.fullName}
  //           onChange={handleOnChange}
  //           className="w-full px-3 py-2 border rounded-md"
  //         />

  //         <input
  //           type="email"
  //           name="email"
  //           placeholder="Email Address"
  //           required
  //           value={formData.email}
  //           onChange={handleOnChange}
  //           className="w-full px-3 py-2 border rounded-md"
  //         />

  //         <div className="relative">
  //           <input
  //             type={showPassword ? "text" : "password"}
  //             name="password"
  //             placeholder="Password"
  //             required
  //             value={formData.password}
  //             onChange={handleOnChange}
  //             className="w-full px-3 py-2 border rounded-md"
  //           />
  //           <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5">
  //             {showPassword ? <GrFormView size={20} /> : <GrFormViewHide size={20} />}
  //           </button>
  //         </div>

  //         <div className="relative">
  //           <input
  //             type={showPassword1 ? "text" : "password"}
  //             name="confirmPassword"
  //             placeholder="Confirm Password"
  //             required
  //             value={formData.confirmPassword}
  //             onChange={handleOnChange}
  //             className="w-full px-3 py-2 border rounded-md"
  //           />
  //           <button type="button" onClick={() => setShowPassword1(!showPassword1)} className="absolute right-3 top-2.5">
  //             {showPassword1 ? <GrFormView size={20} /> : <GrFormViewHide size={20} />}
  //           </button>
  //         </div>

  //         <button type="submit" className="w-full py-2 bg-primaryButton text-white rounded-md">
  //           Register
  //         </button>
  //       </form>

  //       <p className="mt-4 text-center text-sm">
  //         <a href="#" className="text-primaryButton hover:underline">Already have an account?</a>
  //       </p>

  //       {/* Social Logins */}
  //       <div className="mt-6 text-center">
  //         <p className="mb-3 text-primaryButton">Or continue with</p>
  //         <div className="flex justify-center space-x-4">
  //           <button className="border p-2 rounded-md hover:bg-gray-100"><FaGoogle size={20} /></button>
  //           <button className="border p-2 rounded-md hover:bg-gray-100"><FaFacebook size={20} /></button>
  //           <button className="border p-2 rounded-md hover:bg-gray-100"><FaApple size={20} /></button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // export default Signup;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//         'https://081c-115-246-219-84.ngrok-free.app/api/register',
//         { name, email, password },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': 'true',
//             'Origin': window.location.origin
//           }
//         }
//       );

//       if (response.status === 200) {
//         navigate('/'); // Redirect to login after successful registration
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
//         <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
//           Create Account
//         </h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Name Input */}
//           <div>
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Email Input */}
//           <div>
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Password Input */}
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Confirm Password Input */}
//           <div>
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
//           >
//             {loading ? "Registering..." : "Create Account"}
//           </button>

//           <p className="mt-6 text-center text-sm text-gray-600 font-Poppins">
//             Already have an account?{' '}
//             <Link to="/" className="text-primaryButton hover:underline">
//               Login here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import axios from 'axios';
import api from '../Services/api';

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.post(
        '/api/register',
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Origin': window.location.origin
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Signup successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Could not create an account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">Create Account</h2>

        {/* Messages */}
        {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-Poppins"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-Poppins"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-Poppins"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <GrFormView size={20} /> : <GrFormViewHide size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword1 ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-Poppins"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword1(!showPassword1)} 
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword1 ? <GrFormView size={20} /> : <GrFormViewHide size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2 bg-primaryButton text-white rounded-[10px] font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 font-Poppins"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 font-Poppins">
          Already have an account?{' '}
          <a href="/login" className="text-primaryButton hover:underline">Login here</a>
        </p>

        {/* Social Logins */}
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

export default Signup;
