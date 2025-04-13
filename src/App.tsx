
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import ChatboxPage from "./pages/ChatboxPage";
import TrackingPage from "./pages/TrackingPage";
import SafetyGuidesPage from "./pages/SafetyGuidesPage";
import SupportPage from "./pages/SupportPage";
import AuthPage from "./pages/AuthPage";
import CommunityChat from "./pages/CommunityChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chatbox" element={<ChatboxPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/safety-guides" element={<SafetyGuidesPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/community-chat" element={<CommunityChat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
