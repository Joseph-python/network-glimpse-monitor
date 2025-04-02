
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DeviceCard from '@/components/devices/DeviceCard';
import DeviceForm from '@/components/devices/DeviceForm';
import { useDevices } from '@/context/DeviceContext';
import { Device, DeviceType } from '@/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Search, Server, HardDrive, Wifi, Settings } from 'lucide-react';

const Devices = () => {
  const { devices } = useDevices();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter devices based on search term and filters
  const filteredDevices = devices.filter(device => {
    // Apply search term filter
    const matchesSearch = 
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply type filter
    const matchesType = typeFilter === 'all' || device.type === typeFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Devices</h1>
          <DeviceForm />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Filter Devices</CardTitle>
            <CardDescription>
              Filter the devices by name, type, or status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <Select onValueChange={setTypeFilter} defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="server">Server</SelectItem>
                  <SelectItem value="router">Router</SelectItem>
                  <SelectItem value="switch">Switch</SelectItem>
                </SelectContent>
              </Select>
              
              <Select onValueChange={setStatusFilter} defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {filteredDevices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDevices.map(device => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No devices found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Devices;
