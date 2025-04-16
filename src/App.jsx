// import { useState } from 'react'

// import './App.css'
// import Login from './components/Login'
// import Signup from './components/Signup'
// import Home from './Pages/Home'
// import Navbar from './components/Navbar'
// import SendNotification from './Pages/SendNotification'
// import {  Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux'
// // import ProtectedRoute from './components/Protec'
// import { selectIsAuthenticated, selectUser } from './slices/AuthSlice'
// import Dashboard from './components/Dashboard'
// import Sidebar from './components/Sidebar'


// // Protected Route Component
// const ProtectedRoute = ({ children,requireProject = false  }) => {
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const user = useSelector(selectUser);
//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }
//    // For routes that require a project (like SendNotification)
//    if (requireProject && (!user?.user?.apps || user?.user?.apps.length === 0)) {
//     console.log('No apps found, redirecting to Home');
//     return <Navigate to="/HOME " replace />;
//   }
  
//   return children;
// };

// // Public Route Component (redirects to SendNotification if authenticated)
// const PublicRoute = ({ children }) => {
//   const isAuthenticated = useSelector(selectIsAuthenticated);
  
  
//   if (isAuthenticated) {
//     return <Navigate to="/SendNotification" replace />;
//   }
  
//   return children;
// };


// // const ProtectedRoute = ({ children, requireProject = false }) => {
// //   // Inside your route component (e.g., ProtectedRoute.jsx)
// // const userFromStorage = JSON.parse(localStorage.getItem('userInfo')) || { apps: [] };
// //   const isAuthenticated = useSelector(selectIsAuthenticated);
// //    const userData = useSelector(selectUser);
// //   //  const projectId = useSelector((state) => state.auth.projectId);
// //   if (!isAuthenticated) {
// //     return <Navigate to="/" replace />;
// //   }
// //     // If project is required but user has no projects
// //     if (requireProject && (!userFromStorage.user.apps || userFromStorage.user.apps.length === 0)) {
// //       return <Navigate to="/Home" replace />;
// //     }
  
// //   return children;
// // };

// function App() {

//   const isAuthenticated = useSelector(selectIsAuthenticated);

//     return (
//       <>
      
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//           <Navbar/>
          
//           <Routes>
//             {/* Public Routes */}
//             <Route 
//               path="/" 
//               element={
//                 <PublicRoute>
//                   <Login />
//                 </PublicRoute>
//               } 
//             />
//             <Route 
//               path="/signup" 
//               element={
//                 <PublicRoute>
//                   <Signup />
//                 </PublicRoute>
//               } 
//             />

//             {/* Protected Routes */}
//             <Route 
//               path="/dashboard" 
//               element={
//                 <ProtectedRoute>
//                   <Sidebar/>
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/SendNotification" 
//               element={
//                 <ProtectedRoute requireProject={true}>
//                   <SendNotification />
//                 </ProtectedRoute>
//               } 
//             />
         
//             <Route 
//               path="/HOME" 
//               element={
//                 <ProtectedRoute requireProject={false}>
//                   <Home />
//                 </ProtectedRoute>
//               } 
//             />

//             {/* Default Route */}
//             <Route 
//               path="*" 
//               element={
//                 <Navigate to={isAuthenticated ? "/SendNotification" : "/"} replace />
//               } 
//             />
//           </Routes>
//       </div>
      
//       </>
//     )
// }

// export default App
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './Pages/Home';
import SendNotification from './Pages/SendNotification';
import Layout from './components/Layout';
import { selectIsAuthenticated, selectUser } from './slices/AuthSlice';
import Dashboard from './components/Dashboard';
import JsonUpload from './components/JsonUpload';
import Stepper from './components/Stepper';
import DashboardSteps from './components/DashboardSteps';

// Protected Route Component
const ProtectedRoute = ({ children, requireProject = false }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requireProject && (!user?.user?.apps || user?.user?.apps.length === 0)) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return children;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  // Add a viewport meta tag to ensure proper mobile rendering
  React.useEffect(() => {
    // Check if the viewport meta tag already exists
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    // If it doesn't exist, create it
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    
    // Set the content attribute for responsive design
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    
    // Add a CSS rule for base font size adjustment
    const style = document.createElement('style');
    style.textContent = `
      html {
        font-size: 16px;
      }
      
      @media (max-width: 768px) {
        html {
          font-size: 14px;
        }
      }
      
      @media (max-width: 480px) {
        html {
          font-size: 12px;
        }
      }
      
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        width: 100%;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="app-container w-full min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <div className="w-full max-w-md mx-auto px-4">
                <Login />
              </div>
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <div className="w-full max-w-md mx-auto px-4">
                <Signup />
              </div>
            </PublicRoute>
          } 
        />

        {/* Protected Routes with Layout */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dash" element={<Dashboard />} />
          <Route path="sendNotification" element={<SendNotification />} />
          <Route path="AddProject" element={<DashboardSteps />} />
          <Route path="dashboardSteps" element={<Stepper />} />
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;