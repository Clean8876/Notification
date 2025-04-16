import {React,useState} from 'react';
import { useProject } from '../context/ProjectContext';
import { FaCheckCircle, FaCloudUploadAlt, FaExclamationTriangle } from 'react-icons/fa';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

function ConfirmProjectUpload() {
  const { project, serviceAccountFile,setServiceAccountFile } = useProject();
  const  navigate = useNavigate();
    // Local state for processing, success, and error
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    // Handle the confirmation of uploading the Firebase service account file
    const handleConfirm = async () => {
        if (!project?.projectId || !project?.projectName || !serviceAccountFile) {
          setError("Missing project info or service account file.");
          return;
        }
    
        try {
          setIsProcessing(true);
          setError(null);
    
          const formData = new FormData();
          formData.append("projectId", project.projectId);
          formData.append("projectName", project.projectName);
          formData.append("firebaseJson", serviceAccountFile);
          
    
          const response = await api.post('/api/firebase/save', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (response.status === 200) {
            setSuccess(true);
            setServiceAccountFile(null); // Optionally clear the file from context after saving
            navigate('/dashboard')
            console.log("✅ Firebase service account saved:", response.data);
          } else {
            throw new Error('Unexpected server response.');
          }
        } catch (err) {
          console.error("❌ Error uploading:", err);
          setError(err.message || 'Something went wrong.');
        } finally {
          setIsProcessing(false);
        }
      };
    
      // Handle the cancel action (close modal, reset error, etc.)
      const handleCancel = () => {
        setError(null); // Clear any previous errors
        setServiceAccountFile(null); // Optionally reset the file state
        setSuccess(false); // Reset success
        console.log('Upload canceled.');
      };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl transition-all">
        <div className="flex flex-col items-center text-center space-y-6">
          <FaCloudUploadAlt className="text-blue-500 text-5xl" />
          <h2 className="text-2xl font-bold text-gray-800">Confirm Your Firebase Connection</h2>
          <p className="text-gray-600">
            Please review the details below before finalizing your Firebase service account upload.
          </p>

          <div className="w-full bg-gray-50 rounded-xl p-4 space-y-4 text-left">
            <div>
              <p className="text-sm text-gray-500">Project Name</p>
              <p className="text-md font-medium text-gray-800">{project?.projectName || '—'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Project ID</p>
              <p className="text-md font-medium text-gray-800">{project?.projectId || '—'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Service Account File</p>
              <p className="text-md font-medium text-gray-800">
                {serviceAccountFile?.name || '—'}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleCancel}
              disabled={isProcessing}
              className="w-full sm:w-1/2 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className={`w-full sm:w-1/2 py-3 px-6 rounded-xl text-white font-semibold transition 
                ${isProcessing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              {isProcessing ? 'Saving...' : 'Confirm & Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmProjectUpload;
