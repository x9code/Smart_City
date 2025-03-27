import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import TrafficPage from "@/pages/traffic-page";
import HealthcarePage from "@/pages/healthcare-page";
import SafetyPage from "@/pages/safety-page";
import MapPage from "@/pages/map-page";
import TourismPage from "@/pages/tourism-page";
import EducationPage from "@/pages/education-page";
import UsersPage from "@/pages/admin/users-page";
import SettingsPage from "@/pages/admin/settings-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/traffic" component={TrafficPage} />
      <ProtectedRoute path="/healthcare" component={HealthcarePage} />
      <ProtectedRoute path="/safety" component={SafetyPage} />
      <ProtectedRoute path="/map" component={MapPage} />
      <ProtectedRoute path="/tourism" component={TourismPage} />
      <ProtectedRoute path="/education" component={EducationPage} />
      <ProtectedRoute path="/admin/users" component={UsersPage} />
      <ProtectedRoute path="/admin/settings" component={SettingsPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
