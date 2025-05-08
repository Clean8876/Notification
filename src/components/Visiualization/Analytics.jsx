import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import api from '../../Services/api';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const timeIntervals = [
  { value: '1d', label: 'Last 24 hours' },
  { value: '3d', label: 'Last 3 days' },
  { value: '7d', label: 'Last week' },
  { value: '30d', label: 'Last month' }
];

export default function Analytics() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedInterval, setSelectedInterval] = useState('1d');
  const [analyticsData, setAnalyticsData] = useState({ data: [], totals: { success: 0, failed: 0, total: 0 } });
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [error, setError] = useState(null);

  // Fetch list of projects
  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await api.get('/api/getProjectIds');
        if (response.status === 200 && response.data?.data) {
          const formatted = response.data.data.map(p => ({ id: p.projectId, name: p.projectName }));
          setProjects(formatted);
          if (formatted.length > 0) {
            setSelectedProject(formatted[0].id);
          }
        }
      } catch (err) {
        setError('Failed to load projects');
        console.error('Project fetch error:', err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch analytics when project or interval changes
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!selectedProject) return;
      setLoadingAnalytics(true);
      try {
        const res = await api.post('/api/analytics', {
          projectId: selectedProject,
          interval: selectedInterval
        });
        if (res.data) {
          setAnalyticsData(res.data);
        }
      } catch (err) {
        setError('Failed to load analytics');
        console.error('Analytics fetch error:', err);
      } finally {
        setLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
  }, [selectedProject, selectedInterval]);

  // Transform data for chart
  const chartData = analyticsData.data.map(item => ({
    label: new Date(item.timestamp).toLocaleString(),
    Success: item.successCount,
    Failed: item.failedCount
  }));

  return (
    <div className="w-full mt-5">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <h2 className="text-lg font-semibold">Notification Delivery Statistics</h2>
            <div className="flex gap-3">
              <Select
                value={selectedProject}
                onValueChange={setSelectedProject}
                disabled={loadingProjects}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(proj => (
                    <SelectItem key={proj.id} value={proj.id}>
                      <div className="flex flex-col">
                        <span>{proj.name}</span>
                        <span className="text-xs text-gray-500">{proj.id}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedInterval}
                onValueChange={setSelectedInterval}
                disabled={loadingAnalytics}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  {timeIntervals.map(interval => (
                    <SelectItem key={interval.value} value={interval.value}>
                      {interval.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="h-[350px] p-6">
          {(loadingProjects || loadingAnalytics) ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Success" name="Successful" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Failed" name="Failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
