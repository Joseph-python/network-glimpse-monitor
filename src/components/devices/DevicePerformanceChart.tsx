
import React from 'react';
import { useDevices } from '@/context/DeviceContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface DevicePerformanceChartProps {
  deviceId: string;
}

const DevicePerformanceChart: React.FC<DevicePerformanceChartProps> = ({ deviceId }) => {
  const { getDevicePerformance } = useDevices();
  const performanceData = getDevicePerformance(deviceId);
  
  // Format the data for the chart
  const data = performanceData.map(point => ({
    ...point,
    time: new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }));
  
  return (
    <div className="w-full h-[300px]">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }} 
              tickMargin={10} 
            />
            <YAxis 
              label={{ 
                value: 'Usage %', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' },
                offset: 0
              }} 
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(20, 20, 20, 0.8)', border: 'none', borderRadius: '4px' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="cpuUsage" 
              name="CPU Usage" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="memoryUsage" 
              name="Memory Usage" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={false} 
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground">No performance data available</p>
        </div>
      )}
    </div>
  );
};

export default DevicePerformanceChart;
