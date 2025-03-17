
import api from '../Services/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found');
  
      const response = await api.post( // Capture the response
        '/api/addProjectIds',
        { apps: [projectId] }
      );
  
      // Log success details
      console.info('Project ID created successfully:', {
        status: response.status,
        data: response.data,
        projectId: projectId,
        timestamp: new Date().toISOString()
      });
  
      if (response.data) {
        console.log('Server response:', {
          createdIds: response.data.createdIds,
          message: response.data.message
        });
      } else {
        console.warn('No data received in response');
      }
  
      navigate('/SendNotification');
    } catch (err) {
      // Enhanced error logging
      console.error('Project ID submission failed:', {
        error: err,
        projectId: projectId,
        status: err.response?.status,
        responseData: err.response?.data
      });
  
      setError(err.response?.data?.message || `Failed to save project ID: ${projectId}`);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 col text-primaryButton font-Poppins">
          Enter Your Project ID
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="ProjectID"
              name="ProjectID"
              placeholder="Enter Project ID eg. PD4312"
              required
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;

