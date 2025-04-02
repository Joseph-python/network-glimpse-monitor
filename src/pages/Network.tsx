
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DeviceCard from '@/components/devices/DeviceCard';
import { useDevices } from '@/context/DeviceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Network = () => {
  const { devices } = useDevices();
  
  // Filter only network devices (routers and switches)
  const networkDevices = devices.filter(device => 
    device.type === 'router' || device.type === 'switch'
  );
  
  const routerDevices = devices.filter(device => device.type === 'router');
  const switchDevices = devices.filter(device => device.type === 'switch');
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Network Devices</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Network Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-card rounded-lg border shadow-sm">
                <div className="text-2xl font-bold">{networkDevices.length}</div>
                <div className="text-sm text-muted-foreground">Total Network Devices</div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border shadow-sm">
                <div className="text-2xl font-bold">{routerDevices.length}</div>
                <div className="text-sm text-muted-foreground">Routers</div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border shadow-sm">
                <div className="text-2xl font-bold">{switchDevices.length}</div>
                <div className="text-sm text-muted-foreground">Switches</div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border shadow-sm">
                <div className="text-2xl font-bold">
                  {networkDevices.filter(d => d.status !== 'online').length}
                </div>
                <div className="text-sm text-muted-foreground">Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {networkDevices.length > 0 ? (
          <>
            {routerDevices.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Routers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {routerDevices.map(device => (
                    <DeviceCard key={device.id} device={device} />
                  ))}
                </div>
              </div>
            )}
            
            {switchDevices.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Switches</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {switchDevices.map(device => (
                    <DeviceCard key={device.id} device={device} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No network devices found</h3>
            <p className="text-muted-foreground mt-2">
              Add routers and switches to start monitoring.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Network;
