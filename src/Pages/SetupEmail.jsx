import React, { useState, useMemo, useEffect } from 'react';
import { FaEnvelope, FaArrowRight, FaBell, FaChartLine, FaUsers, FaShield, FaSpinner } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import api from '../Services/api';

// Reusable input component
const Input = ({ id, label, placeholder, type = "text", value, name, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

function SetupEmail() {
  // Form state
  const [form, setForm] = useState({
    projectId: '',
    host: '',
    port: '',
    user: '',
    pass: '',
    from: '',
  });

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  // Submission feedback state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch project IDs on mount (and every 5 minutes)
  useEffect(() => {
    const fetchProjects = async () => {
      setProjectsLoading(true);
      setProjectsError(null);
      try {
        const response = await api.get('/api/getProjectIds');
        if (response.data?.success && Array.isArray(response.data.data)) {
          const projectIds = response.data.data.map(item => item.projectId || item.id || '');
          setProjects(projectIds.filter(id => id));
        } else {
          throw new Error('Invalid project data');
        }
      } catch (err) {
        console.error('Project fetch error:', err);
        setProjectsError('Failed to load projects');
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
    const intervalId = setInterval(fetchProjects, 300000); // 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    setError(null);
    setSuccess(null);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = useMemo(() => {
    return (
      form.projectId &&
      form.host &&
      form.port &&
      form.user &&
      form.pass &&
      form.from
    );
  }, [form]);

  const handleSubmit = async () => {
    if (!isFormValid) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      projectId: form.projectId,
      providerType: 'SMTP',
      configJson: JSON.stringify({
        host: form.host,
        port: Number(form.port),
        secure: true,
        auth: {
          user: form.user,
          pass: form.pass,
        },
        from: form.from,
      }),
    };

    try {
      const response = await api.post('/api/email-config/save', payload);
      if (response.status === 200) {
        setSuccess('Configuration saved and connection verified successfully!');
      } else {
        throw new Error(response.data?.message || 'Unknown server error');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setError(err.message || 'Failed to verify connection. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4 w-full">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 max-w-4xl w-full grid md:grid-cols-2 overflow-hidden">

        {/* Left Column - Setup Form */}
        <div className="p-8 md:p-10">
          <div className="mb-8 flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-blue-100 to-indigo-100 p-5 rounded-full shadow-inner">
              <FaEnvelope className="text-primaryButton w-10 h-10 mx-auto" />
            </motion.div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
            <span className="bg-primaryButton bg-clip-text text-transparent">
              Configure Your Email
            </span>
          </h1>
          <p className="text-gray-600 text-center mb-8">Configure your SMTP settings to send emails.</p>

          <div className="space-y-5">
            {/* Project Dropdown */}
            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
                Select Project
              </label>
              <select
                id="projectId"
                name="projectId"
                value={form.projectId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                disabled={projectsLoading || !!projectsError}
                required
              >
                {projectsLoading && <option>Loading projects...</option>}
                {projectsError && <option>{projectsError}</option>}
                {!projectsLoading && !projectsError && <option value="" disabled>-- Select your project --</option>}
                {!projectsLoading && !projectsError && projects.map((projectId) => (
                  <option key={projectId} value={projectId}>{projectId}</option>
                ))}
              </select>
            </div>

            <Input id="user" name="user" label="Email Address (SMTP Username)" placeholder="e.g., yourname@example.com" value={form.user} onChange={handleChange} />
            <Input id="host" name="host" label="SMTP Server Host" placeholder="e.g., smtp.gmail.com" value={form.host} onChange={handleChange} />
            <Input id="port" name="port" label="SMTP Port" placeholder="e.g., 587 (TLS) or 465 (SSL)" type="number" value={form.port} onChange={handleChange} />
            <Input id="pass" name="pass" label="App Password / SMTP Password" placeholder="Enter your password" type="password" value={form.pass} onChange={handleChange} />
            <Input id="from" name="from" label="'From' Email Address" placeholder="e.g., noreply@yourdomain.com" value={form.from} onChange={handleChange} />

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <motion.button
              whileHover={{ scale: isFormValid && !isLoading ? 1.02 : 1 }}
              className={`w-full text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200 ease-in-out ${
                !isFormValid || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primaryButton hover:from-blue-700 hover:to-indigo-700'
              }`}
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (<><FaSpinner className="animate-spin" /> Verifying...</>) : (
                <>Verify Connection <FaArrowRight /></>
              )}
            </motion.button>
          </div>
        </div>

        {/* Right Column - Benefits */}
        <div className="bg-primaryButton p-8 md:p-10 text-white flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Why Setup Email?</h2>
          <ul className="space-y-5">
            {[
              { icon: <FaBell className="text-white" />, text: "Send instant notifications and alerts" },
              { icon: <FaChartLine className="text-white" />, text: "Track engagement with open/click rates" },
              { icon: <FaUsers className="text-white" />, text: "Reach your audience directly in their inbox" },
              { icon: <FaShield className="text-white" />, text: "Secure, encrypted delivery (TLS/SSL)" }
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <p className="text-white font-medium">Use your own trusted SMTP for reliable delivery.</p>
            <p className="text-blue-100 text-sm mt-1">Ensure better deliverability and control.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetupEmail;