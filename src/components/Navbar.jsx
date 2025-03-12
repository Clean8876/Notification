import React from "react";
import { IoIosPower } from "react-icons/io";
import logo from '../assets/logo.svg'
import { Link } from "react-router-dom";




const Navbar = () => (

  <nav className="absolute top-4 left-4 right-4 flex justify-between items-center">
    {/* Logo */}
    <Link 
    to="/" >
    <div className="logo">
      <img src={logo} alt="Logo" className="h-8 md:h-12 lg:h-16" /> {/* Use the image path */}
    </div></Link>
    {/* User Info & Logout */}
    <div className="flex items-center gap-2">
      <span className="text-gray-700 font-medium">Gaurav Kumar</span>
      <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
        <IoIosPower />
      </button>
    </div>
  </nav>
);

export default Navbar;
