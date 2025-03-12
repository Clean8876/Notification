import React from 'react'
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
   
    
  
      navigate('/SendNotification'); // Navigate to home page
    
  };
  return (
<div className="h-screen flex flex-col items-center justify-center bg-gray-100">
    

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 col text-primaryButton font-Poppins">Enter Your 
        Project ID</h2>
        <form className="space-y-4">
        <div>
        
        <input
          type="text"
          id="ProjectID"
          name="ProjectID"
          placeholder="Enter Project ID eg. PD4312"
          required
          className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Save
        </button>
        </form>
      </div>
    </div>
  )
}

export default Home
