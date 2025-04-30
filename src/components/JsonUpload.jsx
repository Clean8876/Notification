import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import api from '../Services/api';
import { useProject } from '../context/ProjectContext';
import { useStepper } from '../context/StepperContext';
import gif1 from '../assets/gif/gif1.gif'
import gif2 from '../assets/gif/gif2.gif'
import gif3 from '../assets/gif/gif3.gif'
import firebase from '../assets/firebase.svg'

function JsonUpload() {
    const [file, setFile] = useState(null);
    const [showGuide, setShowGuide] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const { markStepCompleted, nextStep } = useStepper();
    const { project, setServiceAccountFile } = useProject();
    
    const handleFileUpload = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type === "application/json") {
        setFile(selectedFile);
      } else {
        alert("Please upload a valid JSON file.");
      }
    };
    
    const handleSubmit = async () => {
      if (!file) return;
      
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);

          // Validate required fields
          const requiredKeys = ['project_id', 'private_key', 'client_email'];
          if (!requiredKeys.every(key => jsonData[key])) {
            throw new Error('Invalid Firebase service account file');
          }

          if (!project?.projectId) {
            throw new Error('Project ID not available from context');
          }

          setIsProcessing(true);
          // Prepare multipart form data
          const formData = new FormData();
          formData.append("projectId", project.projectId);
          formData.append("file", file); // raw file

          // Send projectId and service account JSON to the backend
          const response = await api.post("/api/firebase/validate", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 2000);
            setServiceAccountFile(file);
            markStepCompleted();
            nextStep();
          } else {
            throw new Error('Failed to validate service account on the server.');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsProcessing(false);
        }
      };

      reader.readAsText(file);
    };
    
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type === "application/json") {
        setFile(droppedFile);
      } else {
        alert("Please drop a valid JSON file.");
      }
    };
    
  return (
    <div className="flex flex-col h-full w-full bg-white p-4 ">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full flex flex-col lg:flex-row gap-6 flex-grow">
        {/* Left Section - Upload Form */}
        <div className="w-full lg:w-1/2 flex justify-center items-start">
        <div className="w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Connect Your Firebase Project</h2>
          <p className="mb-4 sm:mb-5 text-sm sm:text-base">Upload your Firebase Service Account JSON file to send notifications.</p>
          <div className="flex items-center gap-2 p-1">
            <img src={firebase} alt="Firebase Logo" className="w-8 h-8" />
            <a
              href="https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm sm:text-base"
            >
              Retrieve JSON Service Key from your Firebase Console
            </a>
          </div>
          <div className="border-2 border-dashed border-gray-300 p-3 sm:p-6 mb-4">
            <div
              className="h-28 sm:h-40 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer rounded-lg"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label className="text-gray-600 text-center p-4">
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                {file ? (
                  <div className="flex flex-col items-center">
                    <FaCloudUploadAlt className="text-green-500 text-3xl mb-2" />
                    <p className="text-green-500 text-sm sm:text-base break-all max-w-full px-2">
                      {file.name.length > 25 ? file.name.substring(0, 22) + '...' : file.name}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FaCloudUploadAlt className="text-gray-400 text-3xl mb-2" />
                    <p className="text-sm sm:text-base">Drag and drop your JSON file here or click to browse.</p>
                  </div>
                )}
              </label>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-4 text-center">Never share this file publicly. We'll encrypt it.</p>
          </div>
          
          <div className="mt-4 sm:mt-8">
            <button
              onClick={handleSubmit}
              disabled={!file || isProcessing || isSuccess}
              className={`
                w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-white
                transition-all duration-300 ease-in-out transform
                ${!file || isProcessing || isSuccess 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'}
                ${(!file || isProcessing || isSuccess) ? '' : 'hover:scale-[1.02] active:scale-[0.98]'}
                shadow-lg hover:shadow-xl
                focus:outline-none focus:ring-4 focus:ring-blue-300
                text-sm sm:text-base
              `}
            >
              <div className="flex items-center justify-center space-x-2">
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Connected Successfully!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Connect Firebase Project</span>
                  </>
                )}
              </div>
            </button>
            
            {error && (
              <div className="mt-3 p-2 sm:p-3 bg-red-50 text-red-700 rounded-lg flex items-center text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="break-words">{error}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-xs sm:text-sm text-gray-600">Don't have the file? </p>
            <button
              className="text-blue-500 text-xs sm:text-sm font-medium"
              onClick={() => setShowGuide(!showGuide)}
            >
              {showGuide ? 'Hide guide' : 'Show me how'}
            </button>
          </div>
          </div>
        </div>

        {/* Right Section - Guide Preview */}
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <div className="sticky top-4">
            {showGuide ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Step 1: Go to Project settings</h3>
                  <img
                    src={gif1}
                    alt="Guide step 1"
                    className="rounded-lg border w-full"
                  />
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Step 2: Click on Service account </h3>
                  <img
                    src={gif2}
                    alt="Guide step 2"
                    className="rounded-lg border w-full"
                  />
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Step 3: Click on Generate key</h3>
                  <img
                    src={gif3}
                    alt="Guide step 3" 
                    className="rounded-lg border w-full"
                  />
                </div>
              </div>
            ) : (
              /* Default Preview Panel */
              <div className="border rounded-lg p-3 sm:p-4 bg-gray-50">
                <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Configuration Preview</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-xs sm:text-sm font-medium">Service Account</p>
                    <p className="text-xs sm:text-sm text-gray-500">{
                      file ? "✔️ Valid service account detected" : "No file uploaded"
                    }</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium">Security Status</p>
                    <p className="text-xs sm:text-sm text-green-500">🔒 Credentials will be encrypted</p>
                  </div>
                  <div className="border-t pt-3 sm:pt-4">
                    <p className="text-xs text-gray-500">
                      Your credentials are protected using AES-256 encryption and will only be used for Firebase authentication.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JsonUpload;