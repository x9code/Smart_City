import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Wind, Activity, Users, Car, DropletIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedProgress } from "@/components/ui/animated-progress";

export function CityStats() {
  const { data: cityStats, isLoading } = useQuery({
    queryKey: ["/api/city-stats"],
  });
  
  // State for real-time data that changes based on time
  const [realTimeStats, setRealTimeStats] = useState({
    congestionLevel: 32,
    airQuality: 56,
    emergencyResponseTime: 4.2,
    activeVisitors: 9482,
    trend: {
      congestion: -5,
      airQuality: 3,
      emergencyResponse: -0.5,
      visitors: 12
    }
  });
  
  // Time-based data updates
  useEffect(() => {
    // Initial calculation based on current hour
    const updateDataBasedOnTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      
      // Traffic congestion varies by time of day
      let newCongestion = realTimeStats.congestionLevel;
      if (hour >= 7 && hour <= 9) {
        // Morning rush hour: 7-9 AM
        newCongestion = 45 + Math.floor(Math.random() * 15);
      } else if (hour >= 16 && hour <= 18) {
        // Evening rush hour: 4-6 PM
        newCongestion = 50 + Math.floor(Math.random() * 20);
      } else if (hour >= 11 && hour <= 13) {
        // Lunch time: 11 AM - 1 PM
        newCongestion = 30 + Math.floor(Math.random() * 15);
      } else if (hour >= 22 || hour <= 5) {
        // Night time: 10 PM - 5 AM
        newCongestion = 10 + Math.floor(Math.random() * 10);
      } else {
        // Regular daytime
        newCongestion = 20 + Math.floor(Math.random() * 15);
      }
      
      // Air quality is worse during rush hours and improves at night
      let newAirQuality = realTimeStats.airQuality;
      if (hour >= 7 && hour <= 9 || hour >= 16 && hour <= 18) {
        // Rush hours have worse air quality
        newAirQuality = 65 + Math.floor(Math.random() * 15);
      } else if (hour >= 22 || hour <= 5) {
        // Night time has better air quality
        newAirQuality = 35 + Math.floor(Math.random() * 15);
      } else {
        // Regular daytime
        newAirQuality = 45 + Math.floor(Math.random() * 15);
      }
      
      // Emergency response time varies with congestion
      const newResponseTime = 3.5 + (newCongestion / 100 * 2) + (Math.random() * 0.5);
      
      // Visitors vary by time of day and increase on weekends
      const isWeekend = now.getDay() === 0 || now.getDay() === 6;
      let baseVisitors = 7000;
      if (isWeekend) {
        baseVisitors = 9000;
      }
      
      // More visitors during day than night
      let timeMultiplier = 1.0;
      if (hour >= 10 && hour <= 16) {
        timeMultiplier = 1.3; // Peak hours
      } else if (hour >= 18 || hour <= 6) {
        timeMultiplier = 0.6; // Night hours
      }
      
      const newVisitors = Math.floor(baseVisitors * timeMultiplier * (0.9 + Math.random() * 0.2));
      
      // Calculate trends (compared to previous hour)
      const prevHourCongestion = hour === 0 ? 15 : (hour === 8 || hour === 17) ? 60 : 30;
      const congestionTrend = ((newCongestion - prevHourCongestion) / prevHourCongestion * 100).toFixed(1);
      
      const prevHourAirQuality = hour === 0 ? 40 : (hour === 8 || hour === 17) ? 70 : 50;
      const airQualityTrend = ((newAirQuality - prevHourAirQuality) / prevHourAirQuality * 100).toFixed(1);
      
      const prevHourResponseTime = 4.0 + (prevHourCongestion / 100 * 2);
      const responseTrend = ((newResponseTime - prevHourResponseTime) / prevHourResponseTime * 100).toFixed(1);
      
      const prevHourVisitors = baseVisitors * (0.9 + Math.random() * 0.2);
      const visitorsTrend = ((newVisitors - prevHourVisitors) / prevHourVisitors * 100).toFixed(1);
      
      setRealTimeStats({
        congestionLevel: newCongestion,
        airQuality: newAirQuality,
        emergencyResponseTime: parseFloat(newResponseTime.toFixed(1)),
        activeVisitors: newVisitors,
        trend: {
          congestion: parseFloat(congestionTrend),
          airQuality: parseFloat(airQualityTrend),
          emergencyResponse: parseFloat(responseTrend),
          visitors: parseFloat(visitorsTrend)
        }
      });
    };

    // Update once immediately
    updateDataBasedOnTime();
    
    // Then update every minute
    const intervalId = setInterval(updateDataBasedOnTime, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="bg-white rounded-lg shadow">
            <CardContent className="p-6">
              <div className="h-20 flex items-center justify-center">
                <div className="animate-pulse h-4 w-3/4 bg-slate-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <AnimatedSection animation="fadeIn" className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white rounded-lg shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-500 text-sm font-medium">Traffic Congestion</h3>
              <Car className="h-5 w-5 text-red-500" />
            </div>
            <div className="mb-2">
              <AnimatedProgress 
                value={realTimeStats.congestionLevel} 
                max={100}
                variant={
                  realTimeStats.congestionLevel > 60 ? "gradient" :
                  realTimeStats.congestionLevel > 30 ? "pulse" : "default"
                } 
                className="h-2" 
                barClassName={
                  realTimeStats.congestionLevel > 60 ? "bg-gradient-to-r from-red-500 to-red-700" :
                  realTimeStats.congestionLevel > 30 ? "bg-amber-500" : "bg-green-500"
                }
              />
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-slate-800">{realTimeStats.congestionLevel}%</span>
              <span className={`ml-2 text-sm font-medium flex items-center ${realTimeStats.trend.congestion > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {realTimeStats.trend.congestion > 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(realTimeStats.trend.congestion)}%
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              {realTimeStats.congestionLevel > 60 ? "Heavy traffic" :
               realTimeStats.congestionLevel > 30 ? "Moderate traffic" : "Light traffic"}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-lg shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-500 text-sm font-medium">Air Quality Index</h3>
              <Wind className="h-5 w-5 text-teal-500" />
            </div>
            <div className="mb-2">
              <AnimatedProgress 
                value={100 - realTimeStats.airQuality} 
                max={100}
                variant="default" 
                className="h-2" 
                barClassName={
                  realTimeStats.airQuality > 75 ? "bg-red-500" :
                  realTimeStats.airQuality > 50 ? "bg-amber-500" : "bg-green-500"
                }
              />
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-slate-800">{realTimeStats.airQuality}</span>
              <span className={`ml-2 text-sm font-medium flex items-center ${realTimeStats.trend.airQuality > 0 ? 'text-amber-500' : 'text-green-500'}`}>
                {realTimeStats.trend.airQuality > 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(realTimeStats.trend.airQuality)}%
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              {realTimeStats.airQuality > 75 ? "Unhealthy" :
               realTimeStats.airQuality > 50 ? "Moderate" : "Good"}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-lg shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-500 text-sm font-medium">Emergency Response</h3>
              <Activity className="h-5 w-5 text-orange-500" />
            </div>
            <div className="mb-2">
              <AnimatedProgress 
                value={Math.min(realTimeStats.emergencyResponseTime, 10)} 
                max={10}
                variant="pulse" 
                className="h-2" 
                barClassName={
                  realTimeStats.emergencyResponseTime > 6 ? "bg-red-500" :
                  realTimeStats.emergencyResponseTime > 4 ? "bg-amber-500" : "bg-green-500"
                }
              />
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-slate-800">{realTimeStats.emergencyResponseTime}</span>
              <span className="ml-2 text-xs text-slate-600">min</span>
              <span className={`ml-2 text-sm font-medium flex items-center ${realTimeStats.trend.emergencyResponse > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {realTimeStats.trend.emergencyResponse > 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(realTimeStats.trend.emergencyResponse)}
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              {realTimeStats.emergencyResponseTime > 6 ? "Above average response time" :
               realTimeStats.emergencyResponseTime > 4 ? "Average response time" : "Fast response time"}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-lg shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-500 text-sm font-medium">Active Visitors</h3>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div className="mb-2">
              <AnimatedProgress 
                value={Math.min(realTimeStats.activeVisitors, 15000)} 
                max={15000}
                variant="striped" 
                className="h-2" 
                barClassName="bg-blue-500"
              />
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-slate-800">{formatNumber(realTimeStats.activeVisitors)}</span>
              <span className={`ml-2 text-sm font-medium flex items-center ${realTimeStats.trend.visitors > 0 ? 'text-green-500' : 'text-amber-500'}`}>
                {realTimeStats.trend.visitors > 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(realTimeStats.trend.visitors)}%
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              {new Date().getDay() === 0 || new Date().getDay() === 6 ? 
                "Weekend tourism peak" : "Regular weekday activity"}
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
