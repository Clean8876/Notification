import { useState } from 'react'

import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import SendNotification from './Pages/SendNotification'
import {  Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
// import ProtectedRoute from './components/Protec'
import { selectIsAuthenticated, selectUser } from './slices/AuthSlice'


// Protected Route Component
const ProtectedRoute = ({ children,requireProject = false  }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
   // For routes that require a project (like SendNotification)
   if (requireProject && (!user?.user?.apps || user?.user?.apps.length === 0)) {
    console.log('No apps found, redirecting to Home');
    return <Navigate to="/HOME " replace />;
  }
  
  return children;
};

// Public Route Component (redirects to SendNotification if authenticated)
const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  
  if (isAuthenticated) {
    return <Navigate to="/SendNotification" replace />;
  }
  
  return children;
};


// const ProtectedRoute = ({ children, requireProject = false }) => {
//   // Inside your route component (e.g., ProtectedRoute.jsx)
// const userFromStorage = JSON.parse(localStorage.getItem('userInfo')) || { apps: [] };
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//    const userData = useSelector(selectUser);
//   //  const projectId = useSelector((state) => state.auth.projectId);
//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }
//     // If project is required but user has no projects
//     if (requireProject && (!userFromStorage.user.apps || userFromStorage.user.apps.length === 0)) {
//       return <Navigate to="/Home" replace />;
//     }
  
//   return children;
// };

function App() {

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
    
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Navbar/>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/SendNotification" 
            element={
              <ProtectedRoute requireProject={true}>
                <SendNotification />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/HOME" 
            element={
              <ProtectedRoute requireProject={false}>
                <Home />
              </ProtectedRoute>
            } 
          />

          {/* Default Route */}
          <Route 
            path="*" 
            element={
              <Navigate to={isAuthenticated ? "/SendNotification" : "/"} replace />
            } 
          />
        </Routes>
    </div>
     
    </>
  )
}

export default App
