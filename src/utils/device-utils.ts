
import { Device, DeviceType } from "@/types";

// Function to get an icon class based on device type
export const getDeviceTypeIcon = (type: DeviceType): string => {
  switch (type) {
    case 'router':
      return 'wifi';
    case 'switch':
      return 'settings';
    case 'server':
      return 'server';
    default:
      return 'hard-drive';
  }
};

// Format date to readable format
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleString();
};

// Format time (relative)
export const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const then = new Date(date);
  const diffSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`;
  return `${Math.floor(diffSeconds / 86400)} days ago`;
};

// Get color based on device status
export const getStatusColor = (status: Device['status']): string => {
  switch (status) {
    case 'online':
      return 'network-online';
    case 'offline':
      return 'network-offline';
    case 'warning':
      return 'network-warning';
    default:
      return 'muted';
  }
};

// Get human-readable status
export const getStatusText = (status: Device['status']): string => {
  switch (status) {
    case 'online':
      return 'Online';
    case 'offline':
      return 'Offline';
    case 'warning':
      return 'Warning';
    default:
      return 'Unknown';
  }
};

// Get color class for a value based on threshold
export const getValueColor = (value: number): string => {
  if (value >= 80) return 'text-network-offline';
  if (value >= 60) return 'text-network-warning';
  return 'text-network-online';
};
