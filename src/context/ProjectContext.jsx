// src/contexts/ProjectContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create a context
const ProjectContext = createContext();

// Hook to use the context easily
export const useProject = () => useContext(ProjectContext);

// Provider to wrap your app
export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serviceAccountFile, setServiceAccountFile] = useState(null);

  // Simulated "save" logic (no real API call)
  const saveProject = async ({ projectId, projectName }) => {
    setLoading(true);
    setError(null);

    try {
      // Fake delay to mimic saving process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save project locally
      const mockProject = { projectId, projectName };
      console.log("🧠 saveProject was called with:", projectId, projectName);
      setProject(mockProject);
      setLoading(false);
      return mockProject;
    } catch (err) {
      setError("Something went wrong while saving project.");
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider value={{ project, loading, error, saveProject, serviceAccountFile,
      setServiceAccountFile }}>
      {children}
    </ProjectContext.Provider>
  );
};
