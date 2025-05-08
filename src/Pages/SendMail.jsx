import React, { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MonacoEditor from "react-monaco-editor";
import api from '../Services/api';
import { Toaster, toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FiSave, FiSmartphone, FiCode, FiMail, FiRefreshCw } from "react-icons/fi";

function SendMail() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [subject, setSubject] = useState("Welcome to Digi9!");
  const [htmlTemplate, setHtmlTemplate] = useState(`<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
  </style>
</head>
<body>
  <p>Hello User</p>
</body>
</html>`);
  const [body, setBody] = useState("Hello User");
  const [isMobileView, setIsMobileView] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoadingProjects(true);
        const response = await api.get("/api/email-config/projects");
        
        if (response.data && response.data.data && response.data.data.length > 0) {
          setProjects(response.data.data);
          setProjectId(response.data.data[0]);
        } else {
          toast.error('No projects available');
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        toast.error('Failed to load projects');
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Always keep plain text in sync with HTML content
    const plainText = htmlTemplate.replace(/<[^>]*>?/gm, '');
    setBody(plainText);
  }, [htmlTemplate]);

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      const payload = {
        projectId,
        subject,
        body,
        htmlTemplate
      };

      const response = await api.post("/api/notifications/email", payload);

      if (response.status === 200) {
        toast.success('Email sent successfully');
      } else {
        toast.error('Unexpected response from server');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to send email');
    } finally {
      setIsSaving(false);
    }
  };

  const refreshProjects = async () => {
    try {
      setIsLoadingProjects(true);
      const response = await api.get("/api/email-config/projects");
      
      if (response.data && response.data.data && response.data.data.length > 0) {
        setProjects(response.data.data);
        if (!projectId) {
          setProjectId(response.data.data[0]);
        }
      }
    } catch (error) {
      console.error("Failed to refresh projects:", error);
      toast.error('Failed to refresh projects');
    } finally {
      setIsLoadingProjects(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" richColors />
      
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <FiMail className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold">Email Designer</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshProjects}
              disabled={isLoadingProjects}
            >
              <FiRefreshCw className={`mr-2 h-4 w-4 ${isLoadingProjects ? 'animate-spin' : ''}`} />
              Refresh Projects
            </Button>
            <Select 
              value={projectId} 
              onValueChange={setProjectId}
              disabled={isLoadingProjects || projects.length === 0}
            >
              <SelectTrigger className="w-48">
                {isLoadingProjects ? (
                  <SelectValue placeholder="Loading projects..." />
                ) : projects.length > 0 ? (
                  <SelectValue placeholder="Select project" />
                ) : (
                  <SelectValue placeholder="No projects available" />
                )}
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Email Configuration</span>
                <div className="flex items-center space-x-4">
                  <label htmlFor="mobile-view">Mobile Preview</label>
                  <Switch 
                    id="mobile-view" 
                    checked={isMobileView}
                    onCheckedChange={setIsMobileView}
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="subject">Email Subject*</label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter email subject"
                  required
                />
              </div>
              <div className="space-y-2">
                <label>Plain Text Preview (auto-generated from HTML)</label>
                <textarea
                  rows={4}
                  value={body}
                  readOnly
                  className="w-full p-2 resize-none border rounded font-mono bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <label>HTML Editor*</label>
                <div className="border rounded-lg overflow-hidden">
                  <MonacoEditor
                    language="html"
                    theme="vs-light"
                    value={htmlTemplate}
                    onChange={setHtmlTemplate}
                    options={{
                      automaticLayout: true,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      lineNumbers: "off"
                    }}
                    height="400px"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FiSmartphone className="h-5 w-5" />
                <span>Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`${isMobileView ? 'max-w-sm mx-auto' : ''} bg-white p-4`}>
                <div className={`${isMobileView ? 'border rounded-lg shadow-lg' : ''}`}>
                  <iframe 
                    srcDoc={htmlTemplate}
                    className={`w-full ${isMobileView ? 'h-[600px]' : 'h-screen'} border-none`}
                    title="Email Preview"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button 
            onClick={handleSubmit} 
            disabled={isSaving || !subject || !htmlTemplate || !projectId} 
            className="bg-primaryButton hover:bg-primaryButton"
          >
            <FiSave className="mr-2 h-4 w-4" />
            {isSaving ? 'Sending...' : 'Send Email'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SendMail;