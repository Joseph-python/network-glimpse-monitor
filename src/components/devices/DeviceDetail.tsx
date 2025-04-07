
import React from 'react';
import { useDevices } from '@/context/DeviceContext';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate, getStatusColor, getValueColor } from '@/utils/device-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, RefreshCw, Trash } from 'lucide-react';
import NotFound from '@/pages/NotFound';
import DevicePerformanceChart from './DevicePerformanceChart';
import NetworkTraffic from './NetworkTraffic';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter, 
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const DeviceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getDeviceById, deleteDevice, refreshDeviceStatus } = useDevices();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const device = getDeviceById(id!);
  
  if (!device) {
    return <NotFound />;
  }

  const statusColor = getStatusColor(device.status);
  const cpuColor = getValueColor(device.cpuUsage);
  const memoryColor = getValueColor(device.memoryUsage);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshDeviceStatus();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleDelete = () => {
    deleteDevice(device.id);
    navigate('/devices');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{device.name}</h1>
          <Badge className={`bg-${statusColor}`}>{device.status}</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Device</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {device.name}? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Hostname</h3>
                <p>{device.hostname}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">IP Address</h3>
                <p>{device.ipAddress}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                <p className="capitalize">{device.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p>{device.location || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Checked</h3>
                <p>{formatDate(device.lastChecked)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">CPU Usage</h3>
                  <span className={`text-sm font-medium ${cpuColor}`}>
                    {Math.round(device.cpuUsage)}%
                  </span>
                </div>
                <Progress value={device.cpuUsage} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">Memory Usage</h3>
                  <span className={`text-sm font-medium ${memoryColor}`}>
                    {Math.round(device.memoryUsage)}%
                  </span>
                </div>
                <Progress value={device.memoryUsage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{device.notes || 'No notes available for this device.'}</p>
          </CardContent>
        </Card>
      </div>

      {device.networkInterfaces && device.networkInterfaces.length > 0 && (
        <NetworkTraffic networkInterfaces={device.networkInterfaces} />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Performance History</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <DevicePerformanceChart deviceId={device.id} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Web Interface
            </Button>
            <Button variant="outline" size="sm">
              SSH Connection
            </Button>
            <Button variant="outline" size="sm">
              View Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceDetail;
