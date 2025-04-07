
export type DeviceType = 'router' | 'switch' | 'server';
export type ProtocolType = 'TCP' | 'UDP' | 'ICMP' | 'HTTP' | 'HTTPS' | 'DNS' | 'Other';

export interface TrafficData {
  timestamp: string;
  interfaceName: string;
  bytesReceived: number;
  bytesSent: number;
  packetsReceived: number;
  packetsSent: number;
  protocol: ProtocolType;
}

export interface NetworkInterface {
  name: string;
  macAddress: string;
  speed: string; // e.g., "1 Gbps"
  trafficStats: {
    currentRxBytes: number; // bytes
    currentTxBytes: number; // bytes
    rxBytesPerSecond: number; // bytes/sec
    txBytesPerSecond: number; // bytes/sec
  };
  protocols: {
    protocol: ProtocolType;
    percentage: number;
  }[];
}

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
  networkInterfaces?: NetworkInterface[];
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
