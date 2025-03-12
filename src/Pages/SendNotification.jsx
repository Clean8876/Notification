// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import api from '../Services/api';

// function SendNotification() {
//   const [formData, setFormData] = useState({
//     projectId: '',
//     title: '',
//     message: '',
//     imageUrl: ''
//   });
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  


//     // Get data from localStorage
//     const storedUserData = localStorage.getItem("userInfo");

  

//   // Fetch project IDs on component mount
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await api.get('/api/getProjectIds');
//         if (response.data?.success) {
//           setProjects(response.data.data);
//         }
//       } catch (err) {
//         setError('Failed to load projects');
//         console.error('Project fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log(formData);
//     setFormData({ projectId: '', title: '', message: '', imageUrl: '' });
//     // Show success toast only when the button is clicked and form is submitted
//     toast.success("Notification sent Successfully", {
//       position: "top-center",
//       autoClose: 3000, // Closes after 3 seconds
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "light", // or "dark", "colored"
//       style: {
//         background: "#f0f0f0", // Custom background color
//         color: "#333", // Custom text color
//         borderRadius: "10px", // Custom border radius
//       },
//     });
//   };

//   return (
//     <div>
//       <ToastContainer /> {/* Required to render toasts */}
//       <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
//         <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
//           Hey {storedUserData}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 font-Poppins">
//               Project ID
//             </label>
//             <select
//               value={formData.projectId}
//               onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               disabled={loading || !!error}
//             >
//               <option value="">Select Project ID</option>
//               {loading && <option disabled>Loading projects...</option>}
//               {error && <option disabled>Error loading projects</option>}
//               {projects.map((projectId) => (
//                 <option key={projectId} value={projectId}>
//                   {projectId}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 font-Poppins">
//               Title
//             </label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               placeholder="Write here..."
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 font-Poppins">
//               Message
//             </label>
//             <textarea
//               value={formData.message}
//               onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//               placeholder="Write here..."
//               rows="4"
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 font-Poppins">
//               Add Image URL
//             </label>
//             <input
//               type="url"
//               value={formData.imageUrl}
//               onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
//               placeholder="Post Image URL"
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SendNotification;


import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../Services/api';

function SendNotification() {
  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    message: '',
    imageUrl: '',
    landingUrl: 'https://www.google.com/', 
  userGroup: 'ALL'
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Get user data from localStorage
  const storedUserData = localStorage.getItem("userInfo");
  const token = localStorage.getItem('authToken');

//   // Fetch project IDs on component mount
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

    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure the API endpoint below matches your backend endpoint.
      const response = await api.post('/api/immediateSend', formData);
      
      // Check if the response indicates success
      if (response.data?.success) {
        toast.success("Notification sent Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          style: {
            background: "#f0f0f0",
            color: "#333",
            borderRadius: "10px",
          },
        });
        // Clear the form data after successful submission
        setFormData({ projectId: '', title: '', message: '', imageUrl: '' });
      } else {
        toast.error("Failed to send notification");
        console.error("Notification response error:", response.data);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to send notification");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
          Hey {storedUserData}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
  {/* Project ID Dropdown */}
  <div>
    <label className="block text-sm font-medium text-gray-700 font-Poppins">
      Project ID
    </label>
    <select
      value={formData.projectId}
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
  </div>

  {/* Title Input */}
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

  {/* Message Textarea */}
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

  {/* Image URL Input */}
  <div>
    <label className="block text-sm font-medium text-gray-700 font-Poppins">
      Add Image URL
    </label>
    <input
      type="url"
      name="imageUrl"
      value={formData.imageUrl}
      onChange={handleChange}
      placeholder="Post Image URL"
      className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      required
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    disabled={submitting}
    className={`w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 ${
      submitting ? 'opacity-50 cursor-not-allowed' : ''
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
