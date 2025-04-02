
import React from 'react';
import { Device } from '@/types';
import { formatRelativeTime, getStatusColor, getValueColor } from '@/utils/device-utils';
import { Progress } from '@/components/ui/progress';
import { HardDrive, Server, Settings, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeviceCardProps {
  device: Device;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  const getIcon = () => {
    switch (device.type) {
      case 'server':
        return <Server className="h-5 w-5" />;
      case 'router':
        return <Wifi className="h-5 w-5" />;
      case 'switch':
        return <Settings className="h-5 w-5" />;
      default:
        return <HardDrive className="h-5 w-5" />;
    }
  };

  const statusColor = getStatusColor(device.status);
  const cpuColor = getValueColor(device.cpuUsage);
  const memoryColor = getValueColor(device.memoryUsage);
  
  return (
    <Link to={`/devices/${device.id}`} className="block">
      <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 h-full border border-border">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-secondary">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-medium">{device.name}</h3>
              <p className="text-xs text-muted-foreground">{device.hostname}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs bg-${statusColor} text-white font-medium flex items-center`}>
            <span className={`h-2 w-2 rounded-full ${device.status === 'online' ? 'animate-pulse' : ''} bg-white mr-1`}></span>
            {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
          </div>
        </div>
        
        <div className="text-xs mb-1">
          <span className="text-muted-foreground">IP:</span> {device.ipAddress}
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>CPU</span>
              <span className={cpuColor}>{Math.round(device.cpuUsage)}%</span>
            </div>
            <Progress value={device.cpuUsage} className="h-1" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Memory</span>
              <span className={memoryColor}>{Math.round(device.memoryUsage)}%</span>
            </div>
            <Progress value={device.memoryUsage} className="h-1" />
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-3">
          Last updated: {formatRelativeTime(device.lastChecked)}
        </div>
      </div>
    </Link>
  );
};

export default DeviceCard;
