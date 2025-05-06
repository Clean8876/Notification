import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';
import api from '../../Services/api';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


function Analytics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get('/api/stats');
          
          const data = await response.data;
          setStats(data[0]);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    // Prepare chart data - empty if no stats
  const chartData = stats ? [{
    status: 'Notifications',
    Success: stats.successCount,
    Failed: stats.failedCount
  }] : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="w-full h-[400px] mt-5">
  <Card>
    <CardHeader className="pb-2">
      <h2 className="text-lg font-semibold">Notification Delivery Statistics</h2>
    </CardHeader>
    <CardContent className="h-[350px] p-6">
      <ResponsiveContainer width="100%" height="100%">
        {chartData.length > 0 ? (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis 
              dataKey="status" 
              tick={{ fill: '#666', fontSize: 12 }}
              axisLine={{ stroke: '#ddd' }}
            />
            <YAxis 
              tick={{ fill: '#666', fontSize: 12 }}
              axisLine={{ stroke: '#ddd' }}
            />
            <Tooltip 
              contentStyle={{
                borderRadius: '6px',
                border: '1px solid #eee',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px'
              }}
            />
            <Bar 
              dataKey="Success" 
              fill="#22c55e" 
              name="Successful Deliveries"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="Failed" 
              fill="#ef4444" 
              name="Failed Deliveries"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <svg
              className="w-16 h-16 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500">No delivery data available</p>
            <p className="text-sm text-gray-400">Notification statistics will appear here</p>
          </div>
        )}
      </ResponsiveContainer>
    </CardContent>
  </Card>
</div>
  )
}

export default Analytics
