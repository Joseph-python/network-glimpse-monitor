
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DeviceCard from '@/components/devices/DeviceCard';
import { useDevices } from '@/context/DeviceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Servers = () => {
  const { devices } = useDevices();
  
  // Filter only server devices
  const serverDevices = devices.filter(device => device.type === 'server');
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Servers</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Server Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-card rounded-lg border shadow-sm">
                <div className="text-2xl font-bold">{serverDevices.length}</div>
                <div className="text-sm text-muted-foreground">Total Servers</div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border shadow-sm">
                <div className="text-2xl font-bold">
                  {serverDevices.filter(d => d.status === 'online').length}
                </div>
                <div className="text-sm text-muted-foreground">Online</div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border shadow-sm">
                <div className="text-2xl font-bold">
                  {serverDevices.filter(d => d.status !== 'online').length}
                </div>
                <div className="text-sm text-muted-foreground">Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {serverDevices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serverDevices.map(device => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No servers found</h3>
            <p className="text-muted-foreground mt-2">
              Add server devices to start monitoring.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Servers;
