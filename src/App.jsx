import { useState } from 'react'

import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import SendNotification from './Pages/SendNotification'
import {  Routes, Route, Navigate } from 'react-router-dom';

function App() {


  return (
    <>
 
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Navbar/>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/SendNotification" element={<SendNotification/>}/>
      
      </Routes>
    </div>
     
    </>
  )
}

export default App
