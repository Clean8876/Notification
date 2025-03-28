
import api from '../Services/api';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../slices/AuthSlice';
import { updateUserApps } from '../slices/AuthSlice';




function Home() {
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch(); 



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const token = localStorage.getItem('authToken');
      // if (!token) throw new Error('No authentication token found');
  
      // const response = await api.post( // Capture the response
      //   '/api/addProjectIds',
      //   { apps: [projectId] }
      // );
  

      // if (response.data) {
      //   if (response.data.success) {
      //     const projectIds = response.data.data; // This is your array of project IDs

      //     // Update localStorage
      //     const currentUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      //     const updatedUserInfo = {
      //       ...currentUserInfo,
      //       user: {
      //         ...currentUserInfo.user,
      //         apps: projectIds // Update the apps array with project IDs
      //       }
      //     };
      //     localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

      //     // Update Redux state
      //     dispatch(updateUserApps(
            
      //       projectIds
      //     ));

      //     navigate('/SendNotification');
      //   }
      // } else {
      //   console.warn('No data received in response');
      // }
       // Make the API request
  const response = await api.post('/api/addProjectIds', { apps: [projectId] });

  // Check if response.data exists and the API call was successful
  if (response.data && response.data.success) {
    console.log("Full API Response:", response.data); // Debugging Log

    let projectIds = [];

    // Extract project IDs from the malformed response
    if (typeof response.data.data === "string") {
      // Use regex to extract array content
      const match = response.data.data.match(/\[([^\]]+)\]/);
      if (match) {
        projectIds = match[1].split(",").map(id => id.trim()); // Convert to array
      }
    } else if (response.data.data && Array.isArray(response.data.data.apps)) {
      projectIds = response.data.data.apps;
    }

    // Validate extracted projectIds
    if (!Array.isArray(projectIds) || projectIds.length === 0) {
      console.error("Received invalid or empty projectIds:", projectIds);
      return;
    }

    // Process localStorage update
    let currentUserInfo = {};
    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      currentUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
    }

    if (!currentUserInfo.user) {
      currentUserInfo.user = {};
    }

    const updatedUserInfo = {
      ...currentUserInfo,
      user: {
        ...currentUserInfo.user,
        apps: projectIds,
      },
    };

    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

    // Update Redux state
    dispatch(updateUserApps(projectIds));

    navigate("/SendNotification");
  } else {
    console.error("API call was unsuccessful:", response.data);
  }
  
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

