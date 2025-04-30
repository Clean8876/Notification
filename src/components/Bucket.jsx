import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import NameIdCard from './Card';
import { useProject } from '../context/ProjectContext';
import api from "../Services/api"



function Card() {
  const projects = useSelector((state) => state.auth?.user?.user?.firebaseProjects || []);
  const {setSelectProject} = useProject()
  const navigate = useNavigate()
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  const handleCardClick = async(project) => {
    setSelectProject(project);
    console.log("Clicked project:", project);
    const res = await api.get(`/api/projectExists/${project.projectId}`)
    const data = await  res.data;
    console.log("data od res are ",data)
    if (res.status === 200 && data.data.exists) {
      navigate("/dashboard/sendNotification");
    } else if (res.status === 200 && !data.data.exists) {
      navigate('/dashboard/AddProject');
    } else {
      console.error("Error:", data.error || "Something went wrong");
    }
    console.log("Selected project:", project);
    
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 120, 
        damping: 20 
      }
    },
  };

  return (
    <main className="pt-16 md:pt-16 w-10/12">
    <div className="min-h-screen  p-8 font-poppins">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-Poppins text-gray-1000 mb-8">Your Projects</h1>
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100"
          >
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM12 9a4 4 0 100-8 4 4 0 000 8zM21 15a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a8 8 0 0116 0v3z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found please create project in firebase</h3>
              
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {projects.map((project) => (
              <motion.div 
                key={project.projectId} 
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={()=>handleCardClick(project)}
                
              >
                <NameIdCard 
                  name={project.projectName} 
                  id={project.projectId}
                  className="hover:shadow-lg transition-shadow duration-200"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
    </main>
  );
}

export default Card;