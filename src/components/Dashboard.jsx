// import React, { useState } from 'react';

// const StatusBadge = ({ status }) => {
//   const statusClasses = {
//     'Completed': 'bg-green-100 text-green-800',
//     'Pending': 'bg-yellow-100 text-yellow-800'
//   };

//   return (
//     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
//       {status}
//     </span>
//   );
// };

// const ProjectRow = ({ project, onDelete }) => {
//   const [isScheduled, setIsScheduled] = useState(true);

//   const handleDelete = () => {
//     setIsScheduled(false);
//     onDelete(project.id);
//   };

//   return (
//     <tr key={project.id} className="hover:bg-gray-50">
//       <td className="px-4 py-3 md:px-6 md:py-4">
//         <div className="font-medium text-gray-900">{project.name}</div>
//         {isScheduled && (
//           <span className="text-xs text-gray-500 mt-1 block md:inline md:ml-2">
//             Notification scheduled for {project.notificationDate}
//           </span>
//         )}
//       </td>
//       <td className="px-4 py-3 md:px-6 md:py-4">
//         <StatusBadge status={project.status} />
//       </td>
//       <td className="px-4 py-3 md:px-6 md:py-4 text-gray-500">
//         {project.dueDate}
//       </td>
//       <td className="px-4 py-3 md:px-6 md:py-4 text-right text-sm font-medium">
//         <button 
//           onClick={handleDelete}
//           className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//         >
//           <span className="hidden md:inline">Remove Schedule</span>
//           <span className="md:hidden">Remove</span>
//         </button>
//       </td>
//     </tr>
//   );
// };

// const Dashboard = () => {
//   const [projects, setProjects] = useState([
//     { 
//       id: 1, 
//       name: 'Website Redesign', 
//       status: 'Pending', 
//       dueDate: 'Apr 15, 2025',
//       notificationDate: 'Apr 10, 2025'
//     },
//     { 
//       id: 2, 
//       name: 'Mobile App Development', 
//       status: 'Pending', 
//       dueDate: 'May 30, 2025',
//       notificationDate: 'May 25, 2025'
//     },
//     { 
//       id: 3, 
//       name: 'Database Migration', 
//       status: 'Completed', 
//       dueDate: 'Mar 10, 2025',
//       notificationDate: 'Mar 05, 2025'
//     },
//     { 
//       id: 4, 
//       name: 'User Research Study', 
//       status: 'Pending', 
//       dueDate: 'Apr 22, 2025',
//       notificationDate: 'Apr 17, 2025'
//     },
//     { 
//       id: 5, 
//       name: 'API Integration', 
//       status: 'Pending', 
//       dueDate: 'Jun 05, 2025',
//       notificationDate: 'May 31, 2025'
//     },
//   ]);

//   const handleDelete = (projectId) => {
//     setProjects(projects.filter(project => project.id !== projectId));
//     console.log('Notification schedule removed for project:', projectId);
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-gray-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
//       {/* Header spacer */}
//       <div className="h-16 md:h-20"></div>

//       <div className="flex-1 p-4 md:p-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto w-full">
//           {projects.length === 0 ? (
//             <div className="p-6 md:p-8 text-center text-gray-500">
//               No scheduled notifications found.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
//                     <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//                     <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {projects.map((project) => (
//                     <ProjectRow 
//                       key={project.id} 
//                       project={project} 
//                       onDelete={handleDelete}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import api from '../Services/api';
// import { formatDateTime,formatUTCDateTime } from './dateUtils';

// const Dashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [useUTC, setUseUTC] = useState(false); // Toggle between local and UTC

//   const fetchScheduledNotifications = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.get('/api/GetScheduled');
      
//       // Debugging: Log the entire response structure
//       console.log('API Response:', response);
      
//       // Check if data is already parsed (common with axios)
//       const result = response.data || response;
      
//       if (result.success) {
//         const pendingOnly = result.data.filter(item => item.status === "pending");
//         setProjects(pendingOnly);
//       } else {
//         throw new Error(result.message || 'Failed to fetch scheduled notifications');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError(error.message || 'Failed to load notifications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchScheduledNotifications();
//     const intervalId = setInterval(fetchScheduledNotifications, 60000);
//     return () => clearInterval(intervalId);
//   }, []);

//   // Format scheduled times based on UTC preference
//   const formatScheduledTimes = (times) => {
//     if (!times || !Array.isArray(times)) return 'No times scheduled';
    
//     const formatter = useUTC ? formatUTCDateTime : formatDateTime;
//     return times.map(time => formatter(time)).join(', ');
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-gray-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
//       <div className="h-16 md:h-20"></div>

//       <div className="flex-1 p-4 md:p-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto w-full">
//           {loading ? (
//             <div className="p-6 md:p-8 text-center text-gray-500">
//               Loading scheduled notifications...
//             </div>
//           ) : error ? (
//             <div className="p-6 md:p-8 text-center text-red-500">
//               Error: {error}
//             </div>
//           ) : projects.length === 0 ? (
//             <div className="p-6 md:p-8 text-center text-gray-500">
//               No scheduled notifications found.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Project ID
//                     </th>
//                     <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Scheduled Notification Times
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {projects.map((project) => (
//                     <tr key={project.notificationId} className="hover:bg-gray-50">
//                       <td className="px-4 py-3 md:px-6 md:py-4 text-gray-900">
//                         {project.projectId}
//                       </td>
//                       <td className="px-4 py-3 md:px-6 md:py-4 text-gray-500">
//                         {project.scheduledTimes?.join(', ') || 'No times scheduled'}
//                       </td>
//                       {/* <td className="px-4 py-3 md:px-6 md:py-4 text-gray-500">
//                         {project.scheduledTimes?.map(time => formatDate(time)).join(', ') || 'No times scheduled'}
//                       </td> */}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import api from '../Services/api';
// import { formatDateTime, formatUTCDateTime } from './dateUtils';

// const Dashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [useUTC, setUseUTC] = useState(false);
//   const [deletingId, setDeletingId] = useState(null); // Track which notification is being deleted

//   const fetchScheduledNotifications = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.get('/api/GetScheduled');
      
//       console.log('API Response:', response);
      
//       const result = response.data || response;
      
//       if (result.success) {
//         const pendingOnly = result.data.filter(item => item.status === "pending");
//         setProjects(pendingOnly);
//       } else {
//         throw new Error(result.message || 'Failed to fetch scheduled notifications');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError(error.message || 'Failed to load notifications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteNotification = async (notificationId) => {
//     try {
//       setDeletingId(notificationId); // Show loading state for this specific item
      
//       // Call your API to delete the notification
//       await api.delete(`/api/scheduler/delete/${notificationId}`);
      
//       // Refresh the list after successful deletion
//       await fetchScheduledNotifications();
//     } catch (error) {
//       console.error('Error deleting notification:', error);
//       setError(error.message || 'Failed to delete notification');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => {
//     fetchScheduledNotifications();
//     const intervalId = setInterval(fetchScheduledNotifications, 60000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const formatScheduledTimes = (times) => {
//     if (!times || !Array.isArray(times)) return 'No times scheduled';
    
//     const formatter = useUTC ? formatUTCDateTime : formatDateTime;
//     return times.map(time => formatter(time)).join(', ');
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-gray-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
//       <div className="h-16 md:h-20"></div>

//       <div className="flex-1 p-4 md:p-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto w-full">
//           {loading ? (
//             <div className="p-6 md:p-8 text-center text-gray-500">
//               Loading scheduled notifications...
//             </div>
//           ) : error ? (
//             <div className="p-6 md:p-8 text-center text-red-500">
//               Error: {error}
//             </div>
//           ) : projects.length === 0 ? (
//             <div className="p-6 md:p-8 text-center text-gray-500">
//               No scheduled notifications found.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Project ID
//                     </th>
//                     <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Scheduled Notification Times
//                     </th>
//                     <th scope="col" className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {projects.map((project) => (
//                     <tr key={project.notificationId} className="hover:bg-gray-50">
//                       <td className="px-4 py-3 md:px-6 md:py-4 text-gray-900">
//                         {project.projectId}
//                       </td>
//                       <td className="px-4 py-3 md:px-6 md:py-4 text-gray-500">
//                         {formatScheduledTimes(project.scheduledTimes)}
//                       </td>
//                       <td className="px-4 py-3 md:px-6 md:py-4">
//                         <button
//                           onClick={() => handleDeleteNotification(project.notificationId)}
//                           disabled={deletingId === project.notificationId}
//                           className={`px-3 py-1 rounded-md text-sm font-medium ${
//                             deletingId === project.notificationId
//                               ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                               : 'bg-red-500 text-white hover:bg-red-600'
//                           }`}
//                         >
//                           {deletingId === project.notificationId ? 'Deleting...' : 'Delete'}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import api from '../Services/api';
import { formatDateTime, formatUTCDateTime } from './dateUtils';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useUTC, setUseUTC] = useState(false); // Toggle between local and UTC
  const [deletingId, setDeletingId] = useState(null); // Track which notification is being deleted

  const fetchScheduledNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/api/GetScheduled');
      console.log('API Response:', response);
      
      const result = response.data || response;
      
      if (result.success) {
        const pendingOnly = result.data.filter(item => item.status === "pending");
        setProjects(pendingOnly);
      } else {
        throw new Error(result.message || 'Failed to fetch scheduled notifications');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledNotifications();
    const intervalId = setInterval(fetchScheduledNotifications, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDeleteNotification = async (notificationId) => {
    try {
      setDeletingId(notificationId); // Show loading state for this specific row
      
      // API call to delete the notification
      const response = await api.delete(`/api/scheduler/delete/${notificationId}`);
      console.log(`Delete response for ID ${notificationId}:`, response);
      
      // Refresh the list after deletion
      await fetchScheduledNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
      setError(error.message || 'Failed to delete notification');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="pt-16 md:pt-16 w-10/12">
    <div className="w-full min-h-screen flex flex-col " style={{ fontFamily: 'Poppins, sans-serif' }}>
    <div className="h-16 md:h-20"></div>

        <div className="flex-1 p-4 md:p-6"> 
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto w-full">
          {loading ? (
            <div className="p-6 md:p-8 text-center text-gray-500">
              Loading scheduled notifications...
            </div>
          ) : error ? (
            <div className="p-6 md:p-8 text-center text-red-500">
              Error: {error}
            </div>
          ) : projects.length === 0 ? (
            <div className="p-6 md:p-8 text-center text-gray-500">
              No scheduled notifications found.
            </div>
          ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Project ID
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Scheduled Notification Times
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.notificationId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">
                        {project.projectId}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                      {new Intl.DateTimeFormat('en-US', {
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric', 
                          hour: 'numeric', 
                          minute: '2-digit', 
                          hour12: true,
                          timeZone: 'UTC' // Ensures it stays in UTC
                        }).format(new Date(project.scheduledTimes[0]))}
                      </td>
                      <td className="px-4 py-3 text-center">
                      <button 
                          onClick={() => {
                            console.log(`Deleting notification ID: ${project.notificationId}`);
                            handleDeleteNotification(project.notificationId);
                          }}
                          className="bg-red-200 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                          disabled={deletingId === project.notificationId}
                        >
                          {deletingId === project.notificationId ? 'Deleting...' : '❌'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </main>
  );
};

export default Dashboard;