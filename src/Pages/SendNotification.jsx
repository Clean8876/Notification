
import React, { useState, useEffect,useRef  } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import api from '../Services/api';
import { selectUser, selectIsAuthenticated } from '../slices/AuthSlice';
import { useSelector } from 'react-redux';
import MultiDatePicker from '../components/ScheduleNotification';// Import the MultiDatePicker component
import axios from 'axios';

import Swal from 'sweetalert2';

function SendNotification() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET; 
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME ;
  
  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    message: '',
    imageUrl: '',
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notificationType, setNotificationType] = useState('Immediate Notification');
  const [scheduledTimes, setScheduledTimes] = useState([]); // State to hold scheduled times
  const fileInputRef = useRef(null); /// this is to clear the selected file name


  useEffect(() => {
    // If only one project exists, set it automatically
    if (user.user.apps.length === 1) {
      setFormData((prev) => ({ ...prev, projectId: user.user.apps[0] }));
    }
  }, [user.user.apps]);
    // Image uploader states
    const [selectedMethod, setSelectedMethod] = useState("");
    const [fileDataUrl, setFileDataUrl] = useState(null);
    const [uploadError, setUploadError] = useState("");
    const [isUploading, setIsUploading] = useState(false);


  const handleTypeChange = (e) => {
    setNotificationType(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 // Image upload method selection handler
 const handleMethodChange = (method) => {
  setSelectedMethod(method);
  setUploadError("");
  
  // Clear the other input's state and imageUrl when switching methods
  if (method === "file") {
    setFormData({ ...formData, imageUrl: "" });
  } else {
    setFileDataUrl(null);
  }
};
 // Cloudinary Image Upload
 const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Immediately show local preview
  const reader = new FileReader();
  reader.onload = () => {
    setFileDataUrl(reader.result);
  };
  reader.readAsDataURL(file);

  setUploadError("");
  setIsUploading(true);

  const formDataCloudinary = new FormData();
  formDataCloudinary.append("file", file);
  formDataCloudinary.append("upload_preset", UPLOAD_PRESET);
  
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formDataCloudinary,
      {
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
          // You can update the state to show the progress
        },
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const imageUrl = response.data.secure_url;
    console.log("Cloudinary upload successful!"); // Success log
    console.log("Image URL:", imageUrl); // This logs the URL to console
    setFormData((prev) => ({ ...prev, imageUrl })); // Functional update
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    setUploadError(
      error.response?.data?.error?.message || "Image upload failed"
    );
    setFileDataUrl(null); // Clear failed preview
  } finally {
    setIsUploading(false);
  }
};

// URL input handler
const handleUrlChange = (e) => {
  const url = e.target.value;
  setFormData({ ...formData, imageUrl: url });
};

// URL validation function
const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/getProjectIds');
        if (response.data?.success) {
          setProjects(response.data.data);
        }
      } catch (err) {
        setError('Failed to load projects');
        console.error('Project fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

     // Initial fetch
        fetchProjects();

        // Polling every 1 minute (60,000 ms)
        const intervalId = setInterval(fetchProjects, 60000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
  }, []);
  
  const isSendDisabled = () => {

   
    if (notificationType === 'Schedule Notification') {
      // Disable if no scheduled times are added
      return scheduledTimes.length === 0;
    }
    if (isUploading) {
      return true; // Disable button when uploading
    }
    // For Immediate Notification, disable if required fields are empty
    return !formData.projectId || !formData.title || !formData.message ;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    try {
            // Validate image URL if using URL method
            if (selectedMethod === "url" && formData.imageUrl && !validateUrl(formData.imageUrl)) {
              setUploadError("Please enter a valid URL");
              setSubmitting(false);
              return;
            }
            
      let apiUrl;
      let requestBody;
      // Log the current time and date
      const currentDate = new Date();
      console.log("Current Date and Time (Local):", currentDate.toLocaleString());

      if (notificationType === 'Schedule Notification') {
        apiUrl = '/api/scheduler/schedule';
         // Convert scheduled times to UTC
  
         // Convert scheduled times to the required string format
         const scheduledTimesUTC = scheduledTimes.map((date) => {
           const utcDate = new Date(date);
           return `${utcDate.getUTCFullYear()}-${String(utcDate.getUTCMonth() + 1).padStart(2, '0')}-${String(utcDate.getUTCDate()).padStart(2, '0')} ` +
                  `${String(utcDate.getUTCHours()).padStart(2, '0')}:${String(utcDate.getUTCMinutes()).padStart(2, '0')}:00`;
         });
         
         // Include in the request body
         requestBody = {
           ...formData,
           scheduledTimes: scheduledTimesUTC,
         };
      } else {
        apiUrl = '/api/immediateSend';
        requestBody = formData;
      }

      const response = await api.post(apiUrl, requestBody);

      if (response.status === 200) {
        Swal.fire({
          html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="color: green; font-size: 2rem; margin-bottom: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="green" width="32" height="32">
                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-277.941 88.485l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.248-22.627 0L208 293.373l-57.373-57.373c-6.248-6.248-16.379-6.248-22.627 0L105.373 259.2c-6.248 6.248-6.248 16.379 0 22.627l88 88c6.248 6.249 16.379 6.249 22.627-.001z"/>
              </svg>
            </div>
            <span style="color: green; font-weight: bold;">Sent Successfully</span>
          </div>
        `,
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          customClass: {
            popup: 'swal2-popup-custom',
          }
        });
        // Clear the form data after successful submission
          // Reset all states
      

          setFormData(prev => ({
            projectId: projects.length === 1 ? projects[0] : "", // Preserve if single project
            title: "",
            message: "",
            imageUrl: "",
          }));
        setScheduledTimes([]); // Clear scheduled times
        setFileDataUrl(null); // Clear file preview
        setUploadError(""); // Clear any upload errors
        setSelectedMethod("file"); // Reset to default upload method
        
          // Reset file input field
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear file selection
        }
        
      } else {
        Swal.fire({
          html: `
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="color: red; font-size: 2rem; margin-bottom: 0.5rem;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="red" width="32" height="32">
                  <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm104.5 313.1c6.3 6.3 6.3 16.4 0 22.6l-22.6 22.6c-6.3 6.3-16.4 6.3-22.6 0L256 278.6l-59.4 59.4c-6.3 6.3-16.4 6.3-22.6 0l-22.6-22.6c-6.3-6.3-6.3-16.4 0-22.6L210.6 256l-59.4-59.4c-6.3-6.3-6.3-16.4 0-22.6l22.6-22.6c6.3-6.3 16.4-6.3 22.6 0l59.4 59.4 59.4-59.4c6.3-6.3 16.4-6.3 22.6 0l22.6 22.6c6.3 6.3 6.3 16.4 0 22.6L301.4 256l59.1 59.1z"/>
                </svg>
              </div>
              <span style="color: red; font-weight: bold;">Failed to Send Notification</span>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33',
          customClass: {
            popup: 'swal2-popup-custom',
          }
        });
        console.error("Notification response error:", response.data);
      }
    } catch (error) {
      console.error("API Error:", error.response || error.message || error);
      Swal.fire({
        html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="color: red; font-size: 2rem; margin-bottom: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="red" width="32" height="32">
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm104.5 313.1c6.3 6.3 6.3 16.4 0 22.6l-22.6 22.6c-6.3 6.3-16.4 6.3-22.6 0L256 278.6l-59.4 59.4c-6.3 6.3-16.4 6.3-22.6 0l-22.6-22.6c-6.3-6.3-6.3-16.4 0-22.6L210.6 256l-59.4-59.4c-6.3-6.3-6.3-16.4 0-22.6l22.6-22.6c6.3-6.3 16.4-6.3 22.6 0l59.4 59.4 59.4-59.4c6.3-6.3 16.4-6.3 22.6 0l22.6 22.6c6.3 6.3 6.3 16.4 0 22.6L301.4 256l59.1 59.1z"/>
              </svg>
            </div>
            <span style="color: red; font-weight: bold;">Failed to Send Notification</span>
          </div>
        `,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
        customClass: {
          popup: 'swal2-popup-custom',
        }
      });
    } finally {
              // ✅ Reset everything (runs after success or failure)
            // Reset form but preserve projectId if only one exists
            setFormData(prev => ({
                      projectId: projects.length === 1 ? projects[0] : "", // Preserve if single project
                      title: "",
                      message: "",
                      imageUrl: "",
                }));
                setScheduledTimes([]);
                setFileDataUrl(null);
                setUploadError("");
                setSelectedMethod("file");
                

                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                  setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
        {isAuthenticated && (
              <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
                Hey {user?.user.name}
              </h2>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
       

          <div>
              <label className="block text-sm font-medium text-gray-700 font-Poppins">
                Project ID
              </label>
            
            {
                  projects.length === 1 ? (
                        // If only one project, display as a disabled input but store value
                        <input
                          type="text"
                          value={formData.projectId || projects[0]} // Ensure value is set
                          readOnly
                          className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 sm:text-sm"
                        />
                          ) : (
                        // Show dropdown if multiple projects exist
                        <select
                                  value={formData.projectId || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, projectId: e.target.value })
                                  }
                                  className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  disabled={loading || !!error}
                                >
                                  <option value="">Select Project ID</option>
                                  {loading && <option disabled>Loading projects...</option>}
                                  {error && <option disabled>Error loading projects</option>}
                                  {projects.map((projectId, index) => (
                                        <option key={`${projectId}-${index}`} value={projectId}>
                                          {projectId}
                                        </option>
                                  ))}
                        </select>
                )
        }

          </div>
          <div className="mb-4">
          <label htmlFor="notificationType" className="block text-lg text-gray-800 mb-2 font-Poppins">
          Notification Type:
        </label>
        <div className="relative w-full">
          <select
            id="notificationType"
            value={notificationType}
            onChange={handleTypeChange}
            className="w-full text-base p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primaryButton focus:border-primaryButton"
          >
            <option value="Immediate Notification">Immediate Notification</option>
            <option value="Schedule Notification">Schedule Notification</option>
          </select>
        </div>
        {notificationType === 'Schedule Notification' && (
          <MultiDatePicker scheduledTimes={scheduledTimes} setScheduledTimes={setScheduledTimes} />
        )}
          </div> 
          <div>
            <label className="block text-sm font-medium text-gray-700 font-Poppins">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Write here..."
              className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-Poppins">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write here..."
              rows="4"
              className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          {/* Image Uploader Component */}
        <div>
          <label className="block text-sm font-medium text-gray-700 font-Poppins mb-2">
            Add Image
          </label>
          
          {/* Upload Method Toggle */}
          <div className="flex border border-gray-300 rounded-md overflow-hidden mb-3">
            <button
              type="button"
              onClick={() => handleMethodChange("file")}
              className={`flex-1 py-2 text-sm font-Poppins ${
                selectedMethod === "file" 
                  ? "bg-primaryButton text-white" 
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => handleMethodChange("url")}
              className={`flex-1 py-2 text-sm font-Poppins ${
                selectedMethod === "url" 
                  ? "bg-primaryButton text-white" 
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Enter URL
            </button>
          </div>
          
          {/* File Upload or URL Input based on selected method */}
          {selectedMethod === "file" ? (
            <div className="space-y-3">
              <input
                type="file"
                ref={fileInputRef} // Attach ref here this will track the browser file
                onChange={handleFileChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500 
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold file:font-Poppins
                         file:bg-blue-50 file:text-primaryButton
                         hover:file:bg-blue-100"
              />
              {isUploading && (
                <p className="text-blue-500 text-sm font-Poppins">Uploading...</p>
              )}
              {fileDataUrl && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-1 font-Poppins">Preview:</p>
                    <div className="h-40 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                        <img
                          src={fileDataUrl}
                          alt="Preview"
                          className="h-full w-full object-contain"
                        />
                    </div>
                  </div>
              )}
            </div>
          ) : (
            <div>
              <div>
                      <input
          type="url"
          value={
            formData.imageUrl.length > 30
              ? `${formData.imageUrl.substring(0, 30)}...`
              : formData.imageUrl
          }
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md font-Poppins text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          title={formData.imageUrl} // Show full URL on hover
        />
              </div>
  {formData.imageUrl && validateUrl(formData.imageUrl) && (
    <div className="mt-2">
      <p className="text-sm font-medium text-gray-700 mb-1 font-Poppins">Preview:</p>
      <div className="h-40 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
        <img
          src={formData.imageUrl}
          alt="Preview"
          className="h-full w-full object-contain"
          onError={() => setUploadError("Invalid image URL")}
        />
      </div>
      {/* Display shortened URL */}
          <p className="text-sm text-gray-600 mt-1">
                {formData.imageUrl.length > 15
                  ? `${formData.imageUrl.substring(0, 15)}...`
                  : formData.imageUrl}
          </p>
    </div>
  )}
</div>
          )}
          
          {uploadError && (
            <p className="text-red-500 text-sm mt-1 font-Poppins">{uploadError}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={submitting || isSendDisabled()}
          className={`w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 ${
            submitting || isSendDisabled() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Sending...' : 'Send'}
        </button>
        </form>
      </div>
    </div>
  );
}

export default SendNotification;