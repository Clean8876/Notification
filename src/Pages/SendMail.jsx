import React, { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MonacoEditor from "react-monaco-editor";
import api from '../Services/api';
import { Toaster, toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FiSave, FiSmartphone, FiCode } from "react-icons/fi";

function SendMail() {
  const projects = [
    { id: "ecommerce", name: "Ecommerce Notifications" },
    { id: "hydozz", name: "Hydozz Platform" }
  ];
  
  const [projectId, setProjectId] = useState(projects[0].id);
  const [htmlTemplate, setHtmlTemplate] = useState("<!DOCTYPE html><html><body><p>Hello User</p></body></html>");
  const [body, setBody] = useState("Hello User");
  const [htmlDirty, setHtmlDirty] = useState(false);
  const [isMobileView, setIsMobileView] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!htmlDirty) {
      const generatedHtml = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
  </style>
</head>
<body>
  <p>${body}</p>
</body>
</html>`;
      setHtmlTemplate(generatedHtml);
    }
  }, [body, htmlDirty]);

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleHtmlChange = (value) => {
    setHtmlDirty(true);
    setHtmlTemplate(value);
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      const response = await api.post("/api/notifications/email", {
        projectId,
        body,
        htmlTemplate
      });

      if (response.status === 200) {
        toast.success('Template saved successfully');
      }
    } catch (error) {
      toast.error('Failed to save template');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" richColors />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Control Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <FiCode className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold">Email Designer</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
           
          </div>
        </div>

        {/* Editor & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Email Editor</span>
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
                <label>Plain Text Content</label>
                <Input
                  as="textarea"
                  rows={4}
                  value={body}
                  onChange={handleBodyChange}
                  className="resize-none font-mono"
                  placeholder="Enter your email content..."
                />
              </div>
              
              <div className="space-y-2">
                <label>HTML Editor</label>
                <div className="border rounded-lg overflow-hidden">
                  <MonacoEditor
                    language="html"
                    theme="vs-light"
                    value={htmlTemplate}
                    onChange={handleHtmlChange}
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

          {/* Preview Section */}
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
        <div className='mb-6'></div>
        <Button onClick={handleSubmit} disabled={isSaving} className=" bg-primaryButton hover:bg-primaryButton" >
              <FiSave className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Send Email'}
            </Button>
      </div>
    </div>
  );
}

export default SendMail;