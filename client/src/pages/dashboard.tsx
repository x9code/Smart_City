import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { CityStats } from "@/components/city-stats";
import { CityMap } from "@/components/city-map";
import { EmergencyAlerts } from "@/components/emergency-alerts";
import { CityServices } from "@/components/city-services";
import { ActivityTable } from "@/components/activity-table";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, RefreshCw, ThermometerSun, CalendarDays, AlertCircle, InfoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedCityIntro, CityHighlights } from "@/components/dashboard/animated-city-sections";

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherInfo, setWeatherInfo] = useState({
    temp: "24°C",
    condition: "Partly Cloudy",
    humidity: "65%",
    windSpeed: "10 km/h"
  });
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate changing weather conditions based on time
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) {
        setWeatherInfo({
          temp: `${19 + Math.floor(Math.random() * 5)}°C`,
          condition: "Sunny",
          humidity: `${60 + Math.floor(Math.random() * 10)}%`,
          windSpeed: `${8 + Math.floor(Math.random() * 6)} km/h`
        });
      } else if (hour >= 12 && hour < 18) {
        setWeatherInfo({
          temp: `${24 + Math.floor(Math.random() * 6)}°C`,
          condition: "Partly Cloudy",
          humidity: `${55 + Math.floor(Math.random() * 15)}%`,
          windSpeed: `${10 + Math.floor(Math.random() * 8)} km/h`
        });
      } else {
        setWeatherInfo({
          temp: `${18 + Math.floor(Math.random() * 4)}°C`,
          condition: "Clear Night",
          humidity: `${70 + Math.floor(Math.random() * 10)}%`,
          windSpeed: `${5 + Math.floor(Math.random() * 7)} km/h`
        });
      }
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

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
        
        {/* Dashboard Banner */}
        <AnimatedSection 
          animation="fadeIn" 
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-3 md:mb-0">
              <h2 className="text-2xl font-bold">Welcome, {user?.name || 'Citizen'}</h2>
              <div className="flex items-center mt-1">
                <CalendarDays className="h-4 w-4 mr-2" />
                <span className="text-sm opacity-90">{formattedDate}</span>
                <span className="mx-2">|</span>
                <span className="text-sm opacity-90">{formattedTime}</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                <ThermometerSun className="h-5 w-5 mr-2" />
                <div>
                  <div className="font-medium">{weatherInfo.temp}</div>
                  <div className="text-xs">{weatherInfo.condition}</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-white/30 hover:bg-white/40">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  <span className="text-xs">Updated now</span>
                </Badge>
                <Badge variant="secondary" className="bg-white/30 hover:bg-white/40">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span className="text-xs">3 Alerts</span>
                </Badge>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Status Banner */}
        <AnimatedSection
          animation="slideUp"
          delay={0.1}
          className="bg-amber-50 border-l-4 border-amber-400 p-4 mx-6 my-3 rounded shadow-sm"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <InfoIcon className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                The city's annual infrastructure maintenance program is scheduled for this weekend. 
                Expect temporary service interruptions in the downtown area.
              </p>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Dashboard Content */}
        <main className="p-6">
          {/* Animated City Intro */}
          <AnimatedCityIntro />
          
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
          
          {/* Smart City Zones */}
          <CityHighlights />
          
          {/* Smart City Services */}
          <CityServices />
          
          {/* Recent Activity */}
          <ActivityTable />
        </main>
      </div>
    </div>
  );
}
