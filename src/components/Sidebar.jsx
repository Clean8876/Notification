// Sidebar.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoIosClose } from "react-icons/io";

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
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating toggle button for mobile */}
      <button
        className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg z-30 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={24} />
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between md:block">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <IoIosClose size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard/projects/"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-600 font-medium text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            to="/dashboard/analytics/"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-600 font-medium text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Analytics
          </NavLink>
          <NavLink
            to="/dashboard"
            end
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
            to="/dashboard/AddProject"
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