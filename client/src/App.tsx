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
import OnboardingPage from "@/pages/onboarding-page";
import ScrapbookPage from "@/pages/scrapbook-page";
import DiscoveryPage from "@/pages/discovery-page";
import UsersPage from "@/pages/admin/users-page";
import SettingsPage from "@/pages/admin/settings-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AdminProtectedRoute } from "./lib/admin-protected-route";
import { AuthProvider } from "./hooks/use-auth";
import { ResponsiveNavbar } from "@/components/layout/responsive-navbar";
import { AnimatePresence } from "framer-motion";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/traffic">
        <ProtectedRoute component={TrafficPage} />
      </Route>
      <Route path="/healthcare">
        <ProtectedRoute component={HealthcarePage} />
      </Route>
      <Route path="/safety">
        <ProtectedRoute component={SafetyPage} />
      </Route>
      <Route path="/map">
        <ProtectedRoute component={MapPage} />
      </Route>
      <Route path="/tourism">
        <ProtectedRoute component={TourismPage} />
      </Route>
      <Route path="/education">
        <ProtectedRoute component={EducationPage} />
      </Route>
      <Route path="/onboarding">
        <ProtectedRoute component={OnboardingPage} />
      </Route>
      <Route path="/discovery">
        <ProtectedRoute component={DiscoveryPage} />
      </Route>
      <Route path="/scrapbook">
        <ProtectedRoute component={ScrapbookPage} />
      </Route>
      {/* Admin routes with special protection */}
      <Route path="/admin/users">
        <AdminProtectedRoute component={UsersPage} />
      </Route>
      <Route path="/admin/settings">
        <AdminProtectedRoute component={SettingsPage} />
      </Route>
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <ResponsiveNavbar />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Router />
            </AnimatePresence>
          </main>
          <footer className="py-4 text-center text-sm text-muted-foreground bg-background border-t">
            <div className="container mx-auto">
              <p>© {new Date().getFullYear()} Smart City Management System. All rights reserved.</p>
            </div>
          </footer>
        </div>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
