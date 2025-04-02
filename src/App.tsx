
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DeviceProvider } from "@/context/DeviceContext";
import Index from "./pages/Index";
import Devices from "./pages/Devices";
import DeviceDetails from "./pages/DeviceDetails";
import Logs from "./pages/Logs";
import Servers from "./pages/Servers";
import Network from "./pages/Network";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DeviceProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/devices/:id" element={<DeviceDetails />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/servers" element={<Servers />} />
            <Route path="/network" element={<Network />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DeviceProvider>
  </QueryClientProvider>
);

export default App;
