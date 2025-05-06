// import React from "react";
// import { IoIosPower } from "react-icons/io";
// import logo from '../assets/logo.svg';
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { selectUser, selectIsAuthenticated, logout } from "../slices/AuthSlice";

// const Navbar = () => {
//   const user = useSelector(selectUser);
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userInfo');
//     navigate('/');
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-40">
//       {/* Logo */}
//       <Link to={isAuthenticated ? "/dashboard/home" : "/"}>
//         <img src={logo} alt="Logo" className="h-10 md:h-12" />
//       </Link>

//       {/* User Info & Logout Button */}
//       {isAuthenticated && (
//         <div className="flex items-center gap-4">
//           <span className="text-gray-700 font-medium">{user?.user.name}</span>
//           <button 
//             onClick={handleLogout}
//             className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
//           >
//             <IoIosPower size={20} />
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { IoIosPower, IoIosMenu, IoIosClose } from "react-icons/io";
import logo from '../assets/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsAuthenticated, logout } from "../slices/AuthSlice";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 md:left-64 flex justify-between items-center px-4 sm:px-6 py-3 bg-white z-50 border-b border-gray-200 ">
       
        {/* Mobile toggle */}
      <button
        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoIosClose size={24} /> : <IoIosMenu size={24} />}
      </button>

        {/* Logo */}
        <Link to={isAuthenticated ? "/dashboard/home" : "/"}>
        <img src={logo} alt="Logo" className="h-8 sm:h-10 md:h-12" />
      </Link>

        {/* User Info & Logout Button */}
        {isAuthenticated && (
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm sm:text-base text-gray-700 font-medium font-Poppins truncate max-w-xs">
                {user?.user.name}
              </span>
              <span className="text-xs text-gray-500 truncate max-w-xs">
                {user?.user.role}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-1.5 sm:p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              aria-label="Logout"
              title="Logout"
            >
              <IoIosPower size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="p-4 border-b border-gray-200">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        
        {isAuthenticated && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col">
              <span className="text-base font-medium font-Poppins">
                {user?.user.name}
              </span>
              <span className="text-xs text-gray-500">
                {user?.user.role}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-4">
          {/* Mobile menu links would go here */}
          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-2 rounded-md text-red-500 hover:bg-red-50 transition-colors"
            >
              <IoIosPower size={20} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;