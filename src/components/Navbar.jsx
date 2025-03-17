

import React from "react";
import { IoIosPower } from "react-icons/io";
import logo from '../assets/logo.svg'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsAuthenticated, logout } from "../slices/AuthSlice";

const Navbar = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    navigate('/')
    
  };

  return (
    <nav className="absolute top-4 left-4 right-4 flex justify-between items-center">
      {/* Logo */}
      {isAuthenticated?(<Link to="/HOME">
        <div className="logo">
          <img src={logo} alt="Logo" className="h-8 md:h-12 lg:h-16" />
        </div>
      </Link>):(<Link to="/">
        <div className="logo">
          <img src={logo} alt="Logo" className="h-8 md:h-12 lg:h-16" />
        </div>
      </Link>)}
      

      {/* User Info & Logout - Only show if authenticated */}
      {isAuthenticated && (
  <div className="flex items-center gap-2">
    <span className="font-bold  text-gray-600 font-Poppins">{user?.user.name}</span>
    <button 
      onClick={handleLogout}
      className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
    >
      <IoIosPower />
    </button>
  </div>
) 
}
    </nav>
  );
};

export default Navbar;