import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { CityStats } from "@/components/city-stats";
import { CityMap } from "@/components/city-map";
import { EmergencyAlerts } from "@/components/emergency-alerts";
import { CityServices } from "@/components/city-services";
import { ActivityTable } from "@/components/activity-table";

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row min-h-screen">
      {/* Sidebar - desktop navigation */}
      <Sidebar />
      
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Main Content */}
      <div className="flex-grow overflow-auto pb-16 md:pb-0">
        {/* Header */}
        <Header onMobileMenuToggle={toggleMobileMenu} title="Dashboard" />
        
        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Overview */}
          <CityStats />
          
          {/* City Map & Emergency Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <CityMap />
            </div>
            <div>
              <EmergencyAlerts />
            </div>
          </div>
          
          {/* Smart City Services */}
          <CityServices />
          
          {/* Recent Activity */}
          <ActivityTable />
        </main>
      </div>
    </div>
  );
}
