
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Device, StatusLog, PerformanceData, NetworkInterface, ProtocolType } from '@/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// Generate sample network interfaces for devices
const generateNetworkInterfaces = (deviceType: string): NetworkInterface[] => {
  const interfaces: NetworkInterface[] = [];
  
  // Number of interfaces based on device type
  const interfaceCount = deviceType === 'router' ? 4 : 
                          deviceType === 'switch' ? 8 : 
                          deviceType === 'server' ? 2 : 1;
  
  // Create interfaces
  for (let i = 1; i <= interfaceCount; i++) {
    // Generate random MAC address
    const mac = Array(6).fill(0).map(() => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join(':');
    
    // Random traffic stats based on device type
    const multiplier = deviceType === 'router' ? 1024 * 1024 : // 1MB base for routers
                       deviceType === 'switch' ? 512 * 1024 : // 512KB base for switches
                       128 * 1024; // 128KB base for servers
    
    const rxBytes = Math.floor(Math.random() * multiplier * 100);
    const txBytes = Math.floor(Math.random() * multiplier * 80);
    const rxRate = Math.floor(Math.random() * multiplier / 8);
    const txRate = Math.floor(Math.random() * multiplier / 10);
    
    // Generate protocol distribution
    const protocols: { protocol: ProtocolType; percentage: number }[] = [];
    const protocolTypes: ProtocolType[] = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS', 'Other'];
    
    let remainingPercentage = 100;
    for (let j = 0; j < protocolTypes.length - 1; j++) {
      const percentage = j === 0 ? Math.floor(Math.random() * 40) + 30 : // TCP is usually dominant
                        Math.floor(Math.random() * Math.min(remainingPercentage, 20));
      
      if (percentage > 0) {
        protocols.push({
          protocol: protocolTypes[j],
          percentage
        });
        remainingPercentage -= percentage;
      }
    }
    
    // Add remaining percentage to "Other"
    if (remainingPercentage > 0) {
      protocols.push({
        protocol: 'Other',
        percentage: remainingPercentage
      });
    }
    
    // Interface name based on device type
    const name = deviceType === 'router' ? `GigabitEthernet${i}/0` :
                 deviceType === 'switch' ? `FastEthernet${i}/0` :
                 `eth${i-1}`;
    
    interfaces.push({
      name,
      macAddress: mac,
      speed: deviceType === 'router' ? '1 Gbps' : 
             deviceType === 'switch' ? '100 Mbps' : 
             '10 Gbps',
      trafficStats: {
        currentRxBytes: rxBytes,
        currentTxBytes: txBytes,
        rxBytesPerSecond: rxRate,
        txBytesPerSecond: txRate
      },
      protocols
    });
  }
  
  return interfaces;
};

// Sample data for initial rendering
const sampleDevices: Device[] = [
  {
    id: '1',
    name: 'Core Router',
    hostname: 'router1.network.local',
    ipAddress: '192.168.1.1',
    type: 'router',
    status: 'online',
    cpuUsage: 32,
    memoryUsage: 45,
    location: 'Main Office',
    notes: 'Primary router for the main network',
    lastChecked: new Date().toISOString(),
    networkInterfaces: generateNetworkInterfaces('router')
  },
  {
    id: '2',
    name: 'Edge Switch',
    hostname: 'switch1.network.local',
    ipAddress: '192.168.1.2',
    type: 'switch',
    status: 'online',
    cpuUsage: 18,
    memoryUsage: 22,
    location: 'Main Office',
    notes: 'Edge switch connecting to floor 1',
    lastChecked: new Date().toISOString(),
    networkInterfaces: generateNetworkInterfaces('switch')
  },
  {
    id: '3',
    name: 'Application Server',
    hostname: 'appserver.network.local',
    ipAddress: '192.168.1.10',
    type: 'server',
    status: 'warning',
    cpuUsage: 78,
    memoryUsage: 85,
    location: 'Server Room',
    notes: 'Hosts critical applications',
    lastChecked: new Date().toISOString(),
    networkInterfaces: generateNetworkInterfaces('server')
  },
  {
    id: '4',
    name: 'Backup Server',
    hostname: 'backup.network.local',
    ipAddress: '192.168.1.11',
    type: 'server',
    status: 'offline',
    cpuUsage: 0,
    memoryUsage: 0,
    location: 'Server Room',
    notes: 'Scheduled maintenance',
    lastChecked: new Date().toISOString(),
    networkInterfaces: generateNetworkInterfaces('server')
  }
];

const sampleLogs: StatusLog[] = [
  {
    id: '1',
    deviceId: '3',
    deviceName: 'Application Server',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    status: 'warning',
    message: 'High CPU usage detected: 78%'
  },
  {
    id: '2',
    deviceId: '4',
    deviceName: 'Backup Server',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    status: 'offline',
    message: 'Device not responding to ping'
  }
];

interface PerformanceHistory {
  [deviceId: string]: PerformanceData[];
}

const initialPerformanceHistory: PerformanceHistory = {
  '1': Array(12).fill(0).map((_, i) => ({
    timestamp: new Date(Date.now() - i * 300000).toISOString(),
    cpuUsage: Math.floor(20 + Math.random() * 30),
    memoryUsage: Math.floor(30 + Math.random() * 30)
  })).reverse(),
  '2': Array(12).fill(0).map((_, i) => ({
    timestamp: new Date(Date.now() - i * 300000).toISOString(),
    cpuUsage: Math.floor(10 + Math.random() * 20),
    memoryUsage: Math.floor(15 + Math.random() * 20)
  })).reverse(),
  '3': Array(12).fill(0).map((_, i) => ({
    timestamp: new Date(Date.now() - i * 300000).toISOString(),
    cpuUsage: Math.floor(60 + Math.random() * 30),
    memoryUsage: Math.floor(70 + Math.random() * 25)
  })).reverse(),
  '4': Array(12).fill(0).map((_, i) => ({
    timestamp: new Date(Date.now() - i * 300000).toISOString(),
    cpuUsage: i < 3 ? 0 : Math.floor(10 + Math.random() * 15),
    memoryUsage: i < 3 ? 0 : Math.floor(10 + Math.random() * 15)
  })).reverse()
};

interface DeviceContextType {
  devices: Device[];
  logs: StatusLog[];
  performanceHistory: PerformanceHistory;
  addDevice: (device: Omit<Device, 'id' | 'status' | 'cpuUsage' | 'memoryUsage' | 'lastChecked' | 'networkInterfaces'>) => void;
  updateDevice: (device: Device) => void;
  deleteDevice: (id: string) => void;
  getDeviceById: (id: string) => Device | undefined;
  getDevicePerformance: (id: string) => PerformanceData[];
  refreshDeviceStatus: () => void;
  simulatePing: (ipAddress: string) => Promise<boolean>;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>(sampleDevices);
  const [logs, setLogs] = useState<StatusLog[]>(sampleLogs);
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceHistory>(initialPerformanceHistory);

  // Simulated ping function
  const simulatePing = async (ipAddress: string): Promise<boolean> => {
    // Simulating ping with 90% success rate for demo
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    return Math.random() > 0.1;
  };

  // Add a new device
  const addDevice = (newDevice: Omit<Device, 'id' | 'status' | 'cpuUsage' | 'memoryUsage' | 'lastChecked' | 'networkInterfaces'>) => {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    const device: Device = {
      ...newDevice,
      id,
      status: 'offline', // Initial status until first check
      cpuUsage: 0,
      memoryUsage: 0,
      lastChecked: now,
      networkInterfaces: generateNetworkInterfaces(newDevice.type)
    };
    
    setDevices(prev => [...prev, device]);
    
    // Initialize performance history
    setPerformanceHistory(prev => ({
      ...prev,
      [id]: []
    }));
    
    // Add an initial log
    const log: StatusLog = {
      id: uuidv4(),
      deviceId: id,
      deviceName: newDevice.name,
      timestamp: now,
      status: 'offline',
      message: `Device ${newDevice.name} added to monitoring`
    };
    
    setLogs(prev => [log, ...prev]);
    
    toast.success(`Device ${newDevice.name} added`);
    
    // Start monitoring the new device
    setTimeout(() => refreshDeviceStatus(), 1000);
  };

  // Update an existing device
  const updateDevice = (updatedDevice: Device) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === updatedDevice.id ? updatedDevice : device
      )
    );
    toast.success(`Device ${updatedDevice.name} updated`);
  };

  // Delete a device
  const deleteDevice = (id: string) => {
    const device = devices.find(d => d.id === id);
    if (device) {
      setDevices(prev => prev.filter(device => device.id !== id));
      
      // Remove from performance history
      setPerformanceHistory(prev => {
        const newHistory = { ...prev };
        delete newHistory[id];
        return newHistory;
      });
      
      toast.success(`Device ${device.name} removed`);
    }
  };

  // Get a device by ID
  const getDeviceById = (id: string) => {
    return devices.find(device => device.id === id);
  };

  // Get performance data for a device
  const getDevicePerformance = (id: string) => {
    return performanceHistory[id] || [];
  };

  // Update network traffic data for a device
  const updateNetworkTraffic = (device: Device) => {
    if (!device.networkInterfaces) return;
    
    device.networkInterfaces.forEach(nic => {
      // Update traffic stats with randomized data
      const rxIncrease = Math.floor(Math.random() * nic.trafficStats.rxBytesPerSecond * 1.5);
      const txIncrease = Math.floor(Math.random() * nic.trafficStats.txBytesPerSecond * 1.5);
      
      nic.trafficStats.currentRxBytes += rxIncrease;
      nic.trafficStats.currentTxBytes += txIncrease;
      
      // Fluctuate rates slightly
      nic.trafficStats.rxBytesPerSecond = Math.max(100, 
        Math.floor(nic.trafficStats.rxBytesPerSecond * (0.8 + Math.random() * 0.4))
      );
      nic.trafficStats.txBytesPerSecond = Math.max(100, 
        Math.floor(nic.trafficStats.txBytesPerSecond * (0.8 + Math.random() * 0.4))
      );
      
      // Occasionally update protocol distribution
      if (Math.random() > 0.7) {
        nic.protocols.forEach(proto => {
          const change = Math.floor(Math.random() * 5) - 2;
          proto.percentage = Math.max(1, Math.min(90, proto.percentage + change));
        });
        
        // Normalize percentages to ensure they sum to 100
        const totalPercentage = nic.protocols.reduce((sum, p) => sum + p.percentage, 0);
        nic.protocols.forEach(proto => {
          proto.percentage = Math.floor((proto.percentage / totalPercentage) * 100);
        });
        
        // Ensure total is exactly 100 by adjusting the largest protocol
        const sum = nic.protocols.reduce((sum, p) => sum + p.percentage, 0);
        if (sum !== 100) {
          const largestProto = nic.protocols.reduce((prev, curr) => 
            prev.percentage > curr.percentage ? prev : curr);
          largestProto.percentage += (100 - sum);
        }
      }
    });
  };

  // Update device status and performance data
  const refreshDeviceStatus = () => {
    // Create copies to work with
    const devicesCopy = [...devices];
    const newLogs: StatusLog[] = [];
    const now = new Date().toISOString();
    
    // Update each device
    devicesCopy.forEach(async (device) => {
      // Generate random performance data (in a real app, this would come from actual measurements)
      let newCpuUsage: number;
      let newMemoryUsage: number;
      let newStatus: 'online' | 'offline' | 'warning';
      
      // Ping simulation
      const isReachable = await simulatePing(device.ipAddress);
      
      if (!isReachable) {
        newStatus = 'offline';
        newCpuUsage = 0;
        newMemoryUsage = 0;
        
        // Only create a log if status changed
        if (device.status !== 'offline') {
          newLogs.push({
            id: uuidv4(),
            deviceId: device.id,
            deviceName: device.name,
            timestamp: now,
            status: 'offline',
            message: `Device ${device.name} is not responding to ping`
          });
        }
      } else {
        // For online devices, generate performance data based on device type
        switch (device.type) {
          case 'router':
            newCpuUsage = Math.min(Math.max(device.cpuUsage + (Math.random() * 10 - 5), 10), 90);
            newMemoryUsage = Math.min(Math.max(device.memoryUsage + (Math.random() * 8 - 4), 15), 85);
            break;
          case 'switch': 
            newCpuUsage = Math.min(Math.max(device.cpuUsage + (Math.random() * 6 - 3), 5), 60);
            newMemoryUsage = Math.min(Math.max(device.memoryUsage + (Math.random() * 5 - 2.5), 10), 50);
            break;
          case 'server':
            newCpuUsage = Math.min(Math.max(device.cpuUsage + (Math.random() * 15 - 7), 10), 98);
            newMemoryUsage = Math.min(Math.max(device.memoryUsage + (Math.random() * 10 - 5), 20), 95);
            break;
          default:
            newCpuUsage = Math.min(Math.max(device.cpuUsage + (Math.random() * 10 - 5), 5), 90);
            newMemoryUsage = Math.min(Math.max(device.memoryUsage + (Math.random() * 10 - 5), 10), 90);
        }
        
        // Update network traffic data for online devices
        updateNetworkTraffic(device);
        
        // Determine status based on resource usage
        if (newCpuUsage > 75 || newMemoryUsage > 80) {
          newStatus = 'warning';
          
          // Add log for high resource usage if status changed
          if (device.status !== 'warning') {
            newLogs.push({
              id: uuidv4(),
              deviceId: device.id,
              deviceName: device.name,
              timestamp: now,
              status: 'warning',
              message: `High resource usage on ${device.name}: CPU ${Math.round(newCpuUsage)}%, Memory ${Math.round(newMemoryUsage)}%`
            });
          }
        } else {
          newStatus = 'online';
          
          // Log recovery from warning or offline
          if (device.status === 'warning' || device.status === 'offline') {
            newLogs.push({
              id: uuidv4(),
              deviceId: device.id,
              deviceName: device.name,
              timestamp: now,
              status: 'online',
              message: `Device ${device.name} has recovered to normal operation`
            });
          }
        }
      }
      
      // Update the device with new data
      device.cpuUsage = newCpuUsage;
      device.memoryUsage = newMemoryUsage;
      device.status = newStatus;
      device.lastChecked = now;
      
      // Add the new performance data point
      setPerformanceHistory(prev => {
        const deviceHistory = prev[device.id] || [];
        const newPoint: PerformanceData = {
          timestamp: now,
          cpuUsage: newCpuUsage,
          memoryUsage: newMemoryUsage
        };
        
        // Keep only the last 24 data points (2 hours with 5-minute intervals)
        const updatedHistory = [...deviceHistory, newPoint].slice(-24);
        
        return {
          ...prev,
          [device.id]: updatedHistory
        };
      });
    });
    
    // Update the devices state
    setDevices(devicesCopy);
    
    // Add new logs if any
    if (newLogs.length > 0) {
      setLogs(prev => [...newLogs, ...prev].slice(0, 100)); // Keep only the last 100 logs
    }
  };

  // Refresh device status periodically
  useEffect(() => {
    refreshDeviceStatus();
    
    const interval = setInterval(() => {
      refreshDeviceStatus();
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        devices,
        logs,
        performanceHistory,
        addDevice,
        updateDevice,
        deleteDevice,
        getDeviceById,
        getDevicePerformance,
        refreshDeviceStatus,
        simulatePing
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
};
