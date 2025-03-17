
// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import api from '../Services/api';
// import { selectUser,selectIsAuthenticated } from '../slices/AuthSlice';
// import { useSelector } from 'react-redux';

// function SendNotification() {
//   const user = useSelector(selectUser);
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const [formData, setFormData] = useState({
//     projectId: '',
//     trigger: '',
//     title: '',
//     message: '',
//     imageUrl: '',
//   });

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   // Get user data from localStorage
//   const storedUserData = localStorage.getItem("userInfo");
//   const token = localStorage.getItem('authToken');

// //   // Fetch project IDs on component mount
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Make sure the API endpoint below matches your backend endpoint.
//       const response = await api.post('/api/immediateSend', formData);
      
//       if (response.status === 200) {
//         toast.success("Notification sent Successfully", {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           theme: "light",
//           style: {
//             background: "#f0f0f0",
//             color: "#333",
//             borderRadius: "10px",
//           },
//         });
//         // Clear the form data after successful submission
//         setFormData({ projectId: '', title: '', message: '', imageUrl: '' });
//       } else {
//         toast.error("Failed to send notification");
//         console.error("Notification response error:", response.data);
//       }
//     } catch (error) {
//       // Log additional error info if available
//       console.error("API Error:", error.response || error.message || error);
//       toast.error("Failed to send notification");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
//       {isAuthenticated && (
//   <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
//     Hey {user?.user.name}
//   </h2>
// )}
       
//        <form onSubmit={handleSubmit} className="space-y-4">
//   {/* Project ID Dropdown */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 font-Poppins">
//       Project ID
//     </label>
//     <select
//       value={formData.projectId}
//       onChange={(e) =>
//         setFormData({ ...formData, projectId: e.target.value })
//       }
//       className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//       disabled={loading || !!error}
//     >
//       <option value="">Select Project ID</option>
//       {loading && <option disabled>Loading projects...</option>}
//       {error && <option disabled>Error loading projects</option>}
//       {projects.map((projectId, index) => (
//         <option key={`${projectId}-${index}`} value={projectId}>
//           {projectId}
//         </option>
//       ))}
//     </select>
//   </div>

//   {/* Trigger Dropdown */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 font-Poppins">
//       Trigger
//     </label>
//     <select
//       value={formData.trigger}
//       onChange={(e) =>
//         setFormData({ ...formData, trigger: e.target.value })
//       }
//       className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//       disabled={!formData.projectId} // Disabled until project ID is selected
//     >
//       <option value="">Select Trigger</option>
//       <option value="schedule">Schedule Notification</option>
//       <option value="immediate">Immediate Notification</option>
//     </select>
//   </div>

//   {/* Title Input */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 font-Poppins">
//       Title
//     </label>
//     <input
//       type="text"
//       name="title"
//       value={formData.title}
//       onChange={handleChange}
//       placeholder="Write here..."
//       className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//       required
//     />
//   </div>

//   {/* Message Textarea */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 font-Poppins">
//       Message
//     </label>
//     <textarea
//       name="message"
//       value={formData.message}
//       onChange={handleChange}
//       placeholder="Write here..."
//       rows="4"
//       className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//       required
//     />
//   </div>

//   {/* Image URL Input */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 font-Poppins">
//       Add Image URL
//     </label>
//     <input
//       type="url"
//       name="imageUrl"
//       value={formData.imageUrl}
//       onChange={handleChange}
//       placeholder="Post Image URL"
//       className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//       required
//     />
//   </div>

//   {/* Submit Button */}
//   <button
//     type="submit"
//     disabled={submitting}
//     className={`w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 ${
//       submitting ? 'opacity-50 cursor-not-allowed' : ''
//     }`}
//   >
//     {submitting ? 'Sending...' : 'Send'}
//   </button>
// </form>
//       </div>
//     </div>
//   );
// }

// export default SendNotification;



///// Make Sure to Use this if Any component fails


// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import api from '../Services/api';
// import { selectUser,selectIsAuthenticated } from '../slices/AuthSlice';
// import { useSelector } from 'react-redux';




// // Utility function to generate 30-minute interval options
// const generateTimeOptions = () => {
//   const options = [];
//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute = 0; minute < 60; minute += 30) {
//       const hh = hour.toString().padStart(2, '0');
//       const mm = minute.toString().padStart(2, '0');
//       options.push(`${hh}:${mm}`);
//     }
//   }
//   return options;
// };

// const timeOptions = generateTimeOptions();

// // Utility to format date and time into "YYYY-MM-DD HH:mm:ss"
// const formatDateTime = (date, time) => {
//   // Assumes time is given in "HH:mm" format
//   return `${date} ${time}:00`;
// };
// function SendNotification() {
//   const user = useSelector(selectUser);
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//     // State for scheduling fields (date and time). Multiple schedules can be added.
//     const [schedules, setSchedules] = useState([{ date: '', time: '' }]);
//   const [formData, setFormData] = useState({
//     projectId: '',
//     title: '',
//     message: '',
//     imageUrl: '',
//   });

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [notificationType, setNotificationType] = useState('Immediate Notification');
//   // Get user data from localStorage
//   const storedUserData = localStorage.getItem("userInfo");
//   const token = localStorage.getItem('authToken');

//   const handleTypeChange = (e) => {
//     setNotificationType(e.target.value);
//   };

//   const handleScheduleChange = (index, field, value) => {
//     const newSchedules = [...schedules];
//     newSchedules[index][field] = value;
//     setSchedules(newSchedules);
//   };

//   const addSchedule = () => {
//     setSchedules([...schedules, { date: '', time: '' }]);
//   };
// //   // Fetch project IDs on component mount
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Make sure the API endpoint below matches your backend endpoint.
//       const response = await api.post('/api/immediateSend', formData);
      
//       if (response.status === 200) {
//         toast.success("Notification sent Successfully", {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           theme: "light",
//           style: {
//             background: "#f0f0f0",
//             color: "#333",
//             borderRadius: "10px",
//           },
//         });
//         let scheduledTimes = [];
//         if (notificationType === 'Schedule Notification') {
//           scheduledTimes = schedules.map(schedule =>
//             formatDateTime(schedule.date, schedule.time)
//           );
//         } else {
//           // For immediate notifications, we use the current date/time
//           const now = new Date();
//           const date = now.toISOString().slice(0,10);
//           const time = now.toTimeString().slice(0,5);
//           scheduledTimes = [`${date} ${time}:00`];
//         }
//         // Clear the form data after successful submission
//         setFormData({ projectId: '', title: '', message: '', imageUrl: '' });
//       } else {
//         toast.error("Failed to send notification");
//         console.error("Notification response error:", response.data);
//       }
//     } catch (error) {
//       // Log additional error info if available
//       console.error("API Error:", error.response || error.message || error);
//       toast.error("Failed to send notification");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full">
//       {isAuthenticated && (
//   <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
//     Hey {user?.user.name}
//   </h2>
// )}
       
//        <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Trigger Dropdown */}
//   <div className="mb-4">
//         <label htmlFor="notificationType" className="block text-lg text-gray-800 mb-2">
//           Notification Type:
//         </label>
//         <select
//           id="notificationType"
//           value={notificationType}
//           onChange={handleTypeChange}
//           className="text-base p-2 border border-gray-300 rounded-md bg-white"
//         >
//           <option value="Immediate Notification">Immediate Notification</option>
//           <option value="Schedule Notification">Schedule Notification</option>
//         </select>
//       </div>
//   {/* Project ID Dropdown */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 font-Poppins">
//       Project ID
//     </label>
//     <select
//       value={formData.projectId}
//       onChange={(e) =>
//         setFormData({ ...formData, projectId: e.target.value })
//       }
//       className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//       disabled={loading || !!error}
//     >
//       <option value="">Select Project ID</option>
//       {loading && <option disabled>Loading projects...</option>}
//       {error && <option disabled>Error loading projects</option>}
//       {projects.map((projectId, index) => (
//         <option key={`${projectId}-${index}`} value={projectId}>
//           {projectId}
//         </option>
//       ))}
//     </select>
//   </div>



//   {/* Title Input */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 font-Poppins">
//       Title
//     </label>
//     <input
//       type="text"
//       name="title"
//       value={formData.title}
//       onChange={handleChange}
//       placeholder="Write here..."
//       className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//       required
//     />
//   </div>

//   {/* Message Textarea */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 font-Poppins">
//       Message
//     </label>
//     <textarea
//       name="message"
//       value={formData.message}
//       onChange={handleChange}
//       placeholder="Write here..."
//       rows="4"
//       className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//       required
//     />
//   </div>

//   {/* Image URL Input */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 font-Poppins">
//       Add Image URL
//     </label>
//     <input
//       type="url"
//       name="imageUrl"
//       value={formData.imageUrl}
//       onChange={handleChange}
//       placeholder="Post Image URL"
//       className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//       required
//     />
//   </div>

//   {/* Submit Button */}
//   <button
//     type="submit"
//     disabled={submitting}
//     className={`w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 ${
//       submitting ? 'opacity-50 cursor-not-allowed' : ''
//     }`}
//   >
//     {submitting ? 'Sending...' : 'Send'}
//   </button>
// </form>
//       </div>
//     </div>
//   );
// }

// export default SendNotification;



// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import api from '../Services/api';
// import { selectUser, selectIsAuthenticated } from '../slices/AuthSlice';
// import { useSelector } from 'react-redux';

// // Generate 30-minute interval options from 00:00 to 23:30
// const generateTimeOptions = () => {
//   const options = [];
//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute = 0; minute < 60; minute += 30) {
//       const hh = hour.toString().padStart(2, '0');
//       const mm = minute.toString().padStart(2, '0');
//       options.push(`${hh}:${mm}`);
//     }
//   }
//   return options;
// };

// const timeOptions = generateTimeOptions();

// // Format date and time into "YYYY-MM-DD HH:mm:ss"
// const formatDateTime = (date, time) => `${date} ${time}:00`;

// function SendNotification() {
//   const user = useSelector(selectUser);
//   const isAuthenticated = useSelector(selectIsAuthenticated);

//   // Form data state
//   const [formData, setFormData] = useState({
//     projectId: '',
//     title: '',
//     message: '',
//     imageUrl: '',
//   });

//   // Notification type state (Immediate vs. Schedule)
//   const [notificationType, setNotificationType] = useState('Immediate Notification');

//   // Scheduling times state (only used for scheduled notifications)
//   const [schedules, setSchedules] = useState([{ date: '', time: '' }]);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch project IDs on component mount
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await api.get('/api/getProjectIds');
//         if (response.data?.success) {
//           setProjects(response.data.data);
//         }
//       } catch (err) {
//         console.error('Project fetch error:', err);
//         setError('Failed to load projects');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   // Handle input changes for form fields
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle change for the notification type
//   const handleTypeChange = (e) => {
//     setNotificationType(e.target.value);
//   };

//   // Handle schedule date/time changes
//   const handleScheduleChange = (index, field, value) => {
//     const newSchedules = [...schedules];
//     newSchedules[index][field] = value;
//     setSchedules(newSchedules);
//   };

//   // Add a new schedule input group
//   const addSchedule = () => {
//     setSchedules([...schedules, { date: '', time: '' }]);
//   };

//   // Submit handler: selects API endpoint based on notification type
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     // Build basic payload
//     let payload = {
//       projectId: formData.projectId,
//       title: formData.title,
//       message: formData.message,
//       imageUrl: formData.imageUrl,
//     };

//     let apiEndpoint = '';

//     if (notificationType === 'Schedule Notification') {
//       // Gather valid scheduled times
//       const scheduledTimes = schedules
//         .filter(schedule => schedule.date && schedule.time)
//         .map(schedule => formatDateTime(schedule.date, schedule.time));

//       if (scheduledTimes.length === 0) {
//         toast.error("Please provide at least one valid schedule date and time.");
//         setSubmitting(false);
//         return;
//       }
//       payload = { ...payload, scheduledTimes };
//       // Set scheduling API endpoint
//       apiEndpoint = 'https://6523-115-246-219-84.ngrok-free.app /api/scheduler/schedule';
//     } else if (notificationType === 'Immediate Notification') {
//       // Set immediate API endpoint
//       apiEndpoint = 'https://6523-115-246-219-84.ngrok-free.app /api/immediateSend';
//     } else {
//       toast.error("Please select a valid notification type.");
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const response = await api.post(apiEndpoint, payload);
//       if (response.status === 200) {
//         toast.success("Notification sent successfully", {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           theme: "light",
//           style: {
//             background: "#f0f0f0",
//             color: "#333",
//             borderRadius: "10px",
//           },
//         });
//         // Reset form and schedules on success
//         setFormData({ projectId: '', title: '', message: '', imageUrl: '' });
//         setSchedules([{ date: '', time: '' }]);
//       } else {
//         toast.error("Failed to send notification");
//         console.error("Notification response error:", response.data);
//       }
//     } catch (err) {
//       console.error("API Error:", err.response || err.message || err);
//       toast.error("Failed to send notification");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <div className="bg-white shadow-md rounded-[20px] p-8 max-w-sm w-full mx-auto">
//         {isAuthenticated && (
//           <h2 className="text-2xl font-bold text-center mb-6 text-primaryButton font-Poppins">
//             Hey {user?.user.name}
//           </h2>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Notification Type Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 font-Poppins">
//               Notification Type
//             </label>
//             <select
//               value={notificationType}
//               onChange={handleTypeChange}
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             >
//               <option value="Immediate Notification">Immediate Notification</option>
//               <option value="Schedule Notification">Schedule Notification</option>
//             </select>
//           </div>

//           {/* Project ID Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 font-Poppins">
//               Project ID
//             </label>
//             <select
//               value={formData.projectId}
//               onChange={(e) =>
//                 setFormData({ ...formData, projectId: e.target.value })
//               }
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               disabled={loading || !!error}
//             >
//               <option value="">Select Project ID</option>
//               {loading && <option disabled>Loading projects...</option>}
//               {error && <option disabled>Error loading projects</option>}
//               {projects.map((projectId, index) => (
//                 <option key={`${projectId}-${index}`} value={projectId}>
//                   {projectId}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Title Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 font-Poppins">
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Write here..."
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>

//           {/* Message Textarea */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 font-Poppins">
//               Message
//             </label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Write here..."
//               rows="4"
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>

//           {/* Image URL Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 font-Poppins">
//               Add Image URL
//             </label>
//             <input
//               type="url"
//               name="imageUrl"
//               value={formData.imageUrl}
//               onChange={handleChange}
//               placeholder="Post Image URL"
//               className="mt-1 block w-full font-Poppins px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>

//           {/* Scheduling Fields: only shown for scheduled notifications */}
//           {notificationType === 'Schedule Notification' && (
//             <div className="bg-gray-50 p-4 rounded-md shadow-sm">
//               <h3 className="text-md font-semibold text-gray-700 font-Poppins mb-2">
//                 Schedule Notification Times
//               </h3>
//               {schedules.map((schedule, index) => (
//   <div key={index} className="flex items-center space-x-4 mb-4">
//     <input
//       type="date"
//       value={schedule.date}
//       onChange={(e) =>
//         handleScheduleChange(index, 'date', e.target.value)
//       }
//       className="flex-1 text-base p-2 border border-gray-300 rounded-md bg-white"
//       required
//     />
//     <select
//       value={schedule.time}
//       onChange={(e) =>
//         handleScheduleChange(index, 'time', e.target.value)
//       }
//       className="flex-1 text-base p-2 border border-gray-300 rounded-md bg-white"
//       required
//     >
//       <option value="">Select time</option>
//       {timeOptions.map((time, idx) => (
//         <option key={idx} value={time}>
//           {time}
//         </option>
//       ))}
//     </select>
//   </div>
// ))}
//               <button
//                 type="button"
//                 onClick={addSchedule}
//                 className="text-blue-500 text-2xl focus:outline-none hover:scale-110 transform transition"
//               >
//                 +
//               </button>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={submitting}
//             className={`w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 ${
//               submitting ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             {submitting ? 'Sending...' : 'Send'}
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
import { selectUser, selectIsAuthenticated } from '../slices/AuthSlice';
import { useSelector } from 'react-redux';
import MultiDatePicker from '../components/ScheduleNotification';// Import the MultiDatePicker component

function SendNotification() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
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

  const handleTypeChange = (e) => {
    setNotificationType(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

    fetchProjects();
  }, []);
  
  const isSendDisabled = () => {
    if (notificationType === 'Schedule Notification') {
      // Disable if no scheduled times are added
      return scheduledTimes.length === 0;
    }
    // For Immediate Notification, disable if required fields are empty
    return !formData.projectId || !formData.title || !formData.message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
        toast.success("Notification sent Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
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
        setScheduledTimes([]); // Clear scheduled times
      } else {
        toast.error("Failed to send notification");
        console.error("Notification response error:", response.data);
      }
    } catch (error) {
      console.error("API Error:", error.response || error.message || error);
      toast.error("Failed to send notification");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer />
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
          <div className="mb-4">
            <label htmlFor="notificationType" className="block text-lg text-gray-800 mb-2">
              Notification Type:
            </label>
            <select
              id="notificationType"
              value={notificationType}
              onChange={handleTypeChange}
              className="text-base p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="Immediate Notification">Immediate Notification</option>
              <option value="Schedule Notification">Schedule Notification</option>
            </select>
            {notificationType === 'Schedule Notification' && (
            <MultiDatePicker setScheduledTimes={setScheduledTimes} />
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
        
          <button
            type="submit"
            disabled={submitting || isSendDisabled()} 
            className={`w-full py-2 px-4 font-Poppins bg-primaryButton text-white font-semibold rounded-[10px] shadow hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100  ${
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
