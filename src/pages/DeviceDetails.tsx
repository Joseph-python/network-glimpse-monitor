
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DeviceDetail from '@/components/devices/DeviceDetail';
import NotFound from '@/pages/NotFound';
import { useDevices } from '@/context/DeviceContext';

const DeviceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getDeviceById } = useDevices();
  
  const device = id ? getDeviceById(id) : null;
  
  // Show NotFound if the device doesn't exist
  if (!device) {
    return <NotFound />;
  }

  return (
    <DashboardLayout>
      <DeviceDetail />
    </DashboardLayout>
  );
};

export default DeviceDetails;
