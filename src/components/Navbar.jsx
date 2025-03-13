// import React from "react";
// import { IoIosPower } from "react-icons/io";
// import logo from '../assets/logo.svg'
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { selectUser,selectIsAuthenticated,logout } from "../slices/AuthSlice";


//     // Get data from localStorage
//     const storedUserData = localStorage.getItem("userInfo");
//     const user = useSelector(selectUser);
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//   }; 

// const Navbar = () => {(


// <nav className="absolute top-4 left-4 right-4 flex justify-between items-center">
// {/* Logo */}
// <Link 
// to="/" >
// <div className="logo">
//   <img src={logo} alt="Logo" className="h-8 md:h-12 lg:h-16" /> {/* Use the image path */}
// </div></Link>
// {/* User Info & Logout */}
// <div className="flex items-center gap-2">
//   <span className="text-gray-700 font-medium">{storedUserData}</span>
//   <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
//     <IoIosPower />
//   </button>
// </div>
// </nav>
// )};

// export default Navbar;

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
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="Logo" className="h-8 md:h-12 lg:h-16" />
        </div>
      </Link>

      {/* User Info & Logout - Only show if authenticated */}
      {isAuthenticated && (
  <div className="flex items-center gap-2">
    <span className="text-gray-700 font-medium">{user?.user.name}</span>
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