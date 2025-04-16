
// import api from '../Services/api';
// import React, { useState } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../slices/AuthSlice';
// import { updateUserApps } from '../slices/AuthSlice';




// function Home() {
//   const navigate = useNavigate();
//   const [projectId, setProjectId] = useState('');
//   const [error, setError] = useState('');
//   const dispatch = useDispatch(); 
//   const [loading, setLoading] = useState(false);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       // Step 1: Validate Project ID using IAM API (POST Request)
//       const validationResponse = await api.post(
//         "/iam/check",
//         { projectId }
//       );
  
//       console.log("Validation Response:", validationResponse.data);
  
//       // Extract roles from response
//       const assignedRoles = validationResponse.data?.assignedRoles || [];
  
//       // Step 2: Check if the project has the required role
//       if (!assignedRoles.includes("roles/firebase.sdkAdminServiceAgent")) {
//         setError("Invalid Project ID: Missing required permissions.");
//         setLoading(false);
//         return;
//       }
  
//       // Step 3: Proceed to add the Project ID
//       const response = await api.post('/api/addProjectIds', { apps: [projectId] });
  
//       if (response.data && response.data.success) {
//         console.log("Full API Response:", response.data);
  
//         let projectIds = [];
  
//         if (typeof response.data.data === "string") {
//           const match = response.data.data.match(/\[([^\]]+)\]/);
//           if (match) {
//             projectIds = match[1].split(",").map(id => id.trim());
//           }
//         } else if (response.data.data?.apps && Array.isArray(response.data.data.apps)) {
//           projectIds = response.data.data.apps;
//         }
  
//         if (!Array.isArray(projectIds) || projectIds.length === 0) {
//           console.error("Invalid project IDs received:", projectIds);
//           setError("Failed to retrieve valid project IDs.");
//           setLoading(false);
//           return;
//         }
  
//         // Step 4: Update localStorage
//         let currentUserInfo = {};
//         try {
//           const storedUserInfo = localStorage.getItem("userInfo");
//           currentUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
//         } catch (error) {
//           console.error("Error parsing userInfo from localStorage:", error);
//         }
  
//         if (!currentUserInfo.user) {
//           currentUserInfo.user = {};
//         }
  
//         const updatedUserInfo = {
//           ...currentUserInfo,
//           user: {
//             ...currentUserInfo.user,
//             apps: projectIds,
//           },
//         };
  
//         localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  
//         // Step 5: Update Redux state
//         dispatch(updateUserApps(projectIds));
  
//         navigate("/SendNotification");
//       } else {
//         console.error("API call failed:", response.data);
//         setError("Failed to save Project ID. Please try again.");
//       }
  
//     } catch (err) {
//       console.error('Project ID submission failed:', {
//         error: err,
//         projectId: projectId,
//         status: err.response?.status,
//         responseData: err.response?.data
//       });
//         // Extract project ID from the error message
//     const errorMessage = err.response?.data?.message || err.message;
//     const match = errorMessage.match(/resource '\/\/cloudresourcemanager\.googleapis\.com\/projects\/([\w-]+)'/);
//     const extractedProjectId = match ? match[1] : projectId;
  
//       setError(`Permission denied for Project ID: ${extractedProjectId}. ProjectId doesnt Exist .`);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//     <div className="bg-white shadow-md rounded-[20px] p-8 max-w-full sm:max-w-sm w-full">
//       <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
//         Enter Your Project ID
//       </h2>
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="text"
//             id="ProjectID"
//             name="ProjectID"
//             placeholder="Enter Project ID eg. PD4312"
//             required
//             value={projectId}
//             onChange={(e) => setProjectId(e.target.value)}
//             className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             disabled={loading} // Disable input when loading
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading} // Disable button when loading
//           className={`w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow 
//             ${loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700"} 
//             focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100`}
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>
//       </form>
//     </div>
//   </div>
//   );
// }

// export default Home;

import api from '../Services/api';
import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserApps } from '../slices/AuthSlice';
import { useStepper } from '../context/StepperContext';


function Home() {
  const { markStepCompleted, nextStep } = useStepper();
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();
  const { saveProject, loading, error } = useProject();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setError('');

    // try {
    //   // Directly send project ID and name to backend
    //   const accessToken = localStorage.getItem("googleAccessToken");
    //   const response = await api.post('/api/addProjectIds', {
    //     accessToken, // 👈 include the token here
    //     projects: [{ projectId, projectName }]
    //   });
      
    //   // ✅ Fix this part below
    //   if (response.data && response.data.success) {
    //     const addedText = response.data.data; // e.g., "Added: [HI hello (hydooz-424cb)]"
      
    //     // Extract project ID(s) from the text using RegEx
    //     const match = addedText.match(/\((.*?)\)/); // Matches content inside parentheses
    //     const extractedProjectId = match ? match[1] : null;
      
    //     if (!extractedProjectId) {
    //       setError("Could not extract project ID from server response.");
    //       setLoading(false);
    //       return;
    //     }
      
    //     const projectIds = [extractedProjectId];
      
    //     // Update localStorage
    //     let currentUserInfo = {};
    //     try {
    //       const storedUserInfo = localStorage.getItem("userInfo");
    //       currentUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
    //     } catch (error) {
    //       console.error("Error parsing userInfo from localStorage:", error);
    //     }
      
    //     if (!currentUserInfo.user) {
    //       currentUserInfo.user = {};
    //     }
      
    //     const updatedUserInfo = {
    //       ...currentUserInfo,
    //       user: {
    //         ...currentUserInfo.user,
    //         apps: projectIds,
    //         projects: [{ projectId: extractedProjectId, projectName }],
    //       },
    //     };
      
    //     localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    //     dispatch(updateUserApps(projectIds));
      
    //     navigate("/SendNotification");
    //   } else {
    //     setError("Failed to save Project. Please try again.");
    //   }

    // } catch (err) {
    //   console.error('Submission failed:', err);
    //   setError("Something went wrong. Please check your input and try again.");
    // } finally {
    //   setLoading(false);
    // }
    await saveProject({ projectId, projectName });
    // Mark step completed and advance
    markStepCompleted();
    nextStep();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col items-center mb-8">
   
        <h2 className="text-3xl font-semibold text-gray-900 mb-2 font-Poppins">
          Connect Firebase Project
        </h2>
        <p className="text-gray-500 text-center font-Poppins">
          Enter your Firebase project details to get started
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 rounded-lg flex items-center">
          <svg 
            className="w-5 h-5 text-red-400 mr-2" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd"
            />
          </svg>
          <span className="text-red-600 text-sm">{error}</span>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-Poppins">
              Project ID
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                id="ProjectID"
                name="ProjectID"
                placeholder="my-firebase-project"
                required
                value={projectId}
                onChange={(e) => setProjectId(e.target.value.trim())}
                className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all font-Poppins placeholder-gray-400"
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-Poppins">
              Project Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                id="ProjectName"
                name="ProjectName"
                placeholder="MyApp"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all font-Poppins placeholder-gray-400"
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 flex items-center justify-center space-x-2 rounded-xl transition-all duration-200 ${
            loading 
              ? "bg-gray-100 cursor-not-allowed" 
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
          }`}
        >
          {loading ? (
            <>
              <svg 
                className="animate-spin h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-white font-medium">Processing...</span>
            </>
          ) : (
            <span className="text-white font-semibold">Connect Project</span>
          )}
        </button>
      </form>
    </div>
  </div>
  );
}

export default Home;
