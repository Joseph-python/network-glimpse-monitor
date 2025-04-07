
import React from 'react';
import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Server, HardDrive, BarChart2, Wifi, MonitorCheck, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 w-0 flex flex-col">
          <header className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="text-2xl font-semibold ml-10">Network Glimpse Monitor</h1>
            </div>
          </header>
          <main className="flex-1 p-4 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="font-bold text-lg flex items-center gap-2">
          <MonitorCheck size={24} />
          <span>Network Glimpse</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn({
              "bg-accent": location.pathname === "/"
            })}>
              <Link to="/">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn({
              "bg-accent": location.pathname === "/devices"
            })}>
              <Link to="/devices">
                <HardDrive size={20} />
                <span>Devices</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn({
              "bg-accent": location.pathname.startsWith("/servers")
            })}>
              <Link to="/servers">
                <Server size={20} />
                <span>Servers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn({
              "bg-accent": location.pathname.startsWith("/network")
            })}>
              <Link to="/network">
                <Wifi size={20} />
                <span>Network</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={cn({
              "bg-accent": location.pathname === "/logs"
            })}>
              <Link to="/logs">
                <BarChart2 size={20} />
                <span>Logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-center">
        Network Glimpse Monitor v1.0
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardLayout;
