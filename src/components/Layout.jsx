// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:ml-64 ">
        <Navbar />
        <main className="flex-1 p-6 flex justify-center items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;