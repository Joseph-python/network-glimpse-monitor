
export type DeviceType = 'router' | 'switch' | 'server';

export interface Device {
  id: string;
  name: string;
  hostname: string;
  ipAddress: string;
  type: DeviceType;
  status: 'online' | 'offline' | 'warning';
  cpuUsage: number;
  memoryUsage: number;
  location?: string;
  notes?: string;
  lastChecked: string;
}

export interface StatusLog {
  id: string;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  status: 'online' | 'offline' | 'warning';
  message: string;
}

export interface PerformanceData {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
}
