
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DeviceCard from '@/components/devices/DeviceCard';
import StatusLogTable from '@/components/logs/StatusLogTable';
import { useDevices } from '@/context/DeviceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const { devices, logs } = useDevices();
  
  // Get devices with warning or offline status for alerts section
  const alertDevices = devices.filter(d => d.status === 'warning' || d.status === 'offline');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardOverview />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                  {devices.slice(0, 4).map(device => (
                    <DeviceCard key={device.id} device={device} />
                  ))}
                </div>
                {devices.length > 4 && (
                  <div className="mt-4 text-center">
                    <a href="/devices" className="text-sm text-primary hover:underline">
                      View all {devices.length} devices
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                {alertDevices.length > 0 ? (
                  <div className="space-y-4">
                    {alertDevices.map(device => (
                      <div key={device.id} className={`p-3 rounded-md border-l-4 border-${device.status === 'warning' ? 'network-warning' : 'network-offline'} bg-${device.status === 'warning' ? 'network-warning' : 'network-offline'}/10`}>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {device.status === 'warning' 
                            ? `High resource usage: CPU ${Math.round(device.cpuUsage)}%, Memory ${Math.round(device.memoryUsage)}%` 
                            : 'Device not responding'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <p>No alerts at this time</p>
                    <p className="text-sm">All devices are operating normally</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusLogTable />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
