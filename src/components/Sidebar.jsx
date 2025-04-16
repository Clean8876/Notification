// Sidebar.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on desktop resize and cleanup
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle body scroll
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>

        <nav className="p-4 space-y-2">
        <NavLink 
            to="/dashboard/" 
            className={({ isActive }) => 
              `block px-4 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-600 font-medium text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/dashboard/sendNotification" 
            className={({ isActive }) => 
              `block px-4 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-600 font-medium text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Send Notification
          </NavLink>
          <NavLink 
            to="AddProject" 
            className={({ isActive }) => 
              `block px-4 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-600 font-medium text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Add Project
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;