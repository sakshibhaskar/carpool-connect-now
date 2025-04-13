
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import RideSearchPage from "./pages/RideSearchPage";
import RideDetailPage from "./pages/RideDetailPage";
import PublishRidePage from "./pages/PublishRidePage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ChatPage from "./pages/ChatPage";
import MessagesPage from "./pages/MessagesPage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import EmergencyContactsPage from "./pages/EmergencyContactsPage";
import BookingsPage from "./pages/BookingsPage";
import LanguagePage from "./pages/LanguagePage";
import HelpSupportPage from "./pages/HelpSupportPage";
import PrivacyDataPage from "./pages/PrivacyDataPage";
import MyRidesPage from "./pages/MyRidesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/rides" element={<RideSearchPage />} />
          <Route path="/rides/:id" element={<RideDetailPage />} />
          <Route path="/publish" element={<PublishRidePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/my-rides" element={<MyRidesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:id" element={<ChatPage />} />
          <Route path="/emergency-contacts" element={<EmergencyContactsPage />} />
          <Route path="/language" element={<LanguagePage />} />
          <Route path="/help" element={<HelpSupportPage />} />
          <Route path="/privacy" element={<PrivacyDataPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
