
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusLogTable from '@/components/logs/StatusLogTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDevices } from '@/context/DeviceContext';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const Logs = () => {
  const { refreshDeviceStatus } = useDevices();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshDeviceStatus();
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">System Logs</h1>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Event Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusLogTable />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Logs;
