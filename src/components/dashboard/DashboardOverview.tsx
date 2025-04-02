
import React from 'react';
import { useDevices } from '@/context/DeviceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, Wifi, Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardOverview: React.FC = () => {
  const { devices, refreshDeviceStatus } = useDevices();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  const totalDevices = devices.length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const offlineDevices = devices.filter(d => d.status === 'offline').length;
  const warningDevices = devices.filter(d => d.status === 'warning').length;
  
  const serverCount = devices.filter(d => d.type === 'server').length;
  const routerCount = devices.filter(d => d.type === 'router').length;
  const switchCount = devices.filter(d => d.type === 'switch').length;
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshDeviceStatus();
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Network Overview</h2>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDevices}</div>
            <p className="text-xs text-muted-foreground">
              {serverCount} servers, {routerCount} routers, {switchCount} switches
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online</CardTitle>
            <div className="w-2 h-2 rounded-full bg-network-online"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onlineDevices}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((onlineDevices / totalDevices) * 100) || 0}% of devices
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning</CardTitle>
            <div className="w-2 h-2 rounded-full bg-network-warning"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warningDevices}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((warningDevices / totalDevices) * 100) || 0}% of devices
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
            <div className="w-2 h-2 rounded-full bg-network-offline"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offlineDevices}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((offlineDevices / totalDevices) * 100) || 0}% of devices
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
