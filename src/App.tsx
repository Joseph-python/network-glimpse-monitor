
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DeviceProvider } from "@/context/DeviceContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Devices from "./pages/Devices";
import DeviceDetails from "./pages/DeviceDetails";
import Logs from "./pages/Logs";
import Servers from "./pages/Servers";
import Network from "./pages/Network";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DeviceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/devices" 
                element={
                  <ProtectedRoute>
                    <Devices />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/devices/:id" 
                element={
                  <ProtectedRoute>
                    <DeviceDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/logs" 
                element={
                  <ProtectedRoute>
                    <Logs />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/servers" 
                element={
                  <ProtectedRoute>
                    <Servers />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/network" 
                element={
                  <ProtectedRoute>
                    <Network />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DeviceProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
