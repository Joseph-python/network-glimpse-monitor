
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NetworkInterface } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';

// Utility function to format bytes into human-readable format
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

interface NetworkTrafficProps {
  networkInterfaces: NetworkInterface[];
}

const NetworkTraffic: React.FC<NetworkTrafficProps> = ({ networkInterfaces }) => {
  if (!networkInterfaces || networkInterfaces.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Network Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No network interfaces available for this device.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {networkInterfaces.map((nic) => (
            <div key={nic.name} className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-medium">{nic.name}</h3>
                  <p className="text-xs text-muted-foreground">MAC: {nic.macAddress} | Speed: {nic.speed}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <ArrowDown className="h-3 w-3 text-network-online" />
                    {formatBytes(nic.trafficStats.rxBytesPerSecond)}/s
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <ArrowUp className="h-3 w-3 text-network-warning" />
                    {formatBytes(nic.trafficStats.txBytesPerSecond)}/s
                  </Badge>
                </div>
              </div>

              <div className="text-sm">
                <h4 className="font-medium mb-2">Protocol Distribution</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {nic.protocols.map((proto) => (
                    <div key={proto.protocol} className="bg-muted rounded-md p-2">
                      <div className="flex justify-between">
                        <span>{proto.protocol}</span>
                        <span className="font-medium">{proto.percentage}%</span>
                      </div>
                      <div className="w-full bg-secondary mt-1 rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${proto.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Direction</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Current Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Received</TableCell>
                    <TableCell>{formatBytes(nic.trafficStats.currentRxBytes)}</TableCell>
                    <TableCell>{formatBytes(nic.trafficStats.rxBytesPerSecond)}/s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Transmitted</TableCell>
                    <TableCell>{formatBytes(nic.trafficStats.currentTxBytes)}</TableCell>
                    <TableCell>{formatBytes(nic.trafficStats.txBytesPerSecond)}/s</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkTraffic;
