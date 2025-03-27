import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { AlertCircle, Car, Clock, MapPin, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";

const trafficHotspots = [
  {
    id: 1,
    location: "Downtown Main Street",
    congestion: "High",
    time: "8:00 AM - 10:00 AM",
    status: "Accident reported",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 2,
    location: "Highway 101, North Exit",
    congestion: "Medium",
    time: "5:30 PM - 7:00 PM",
    status: "Construction",
    coordinates: { lat: 40.7218, lng: -74.015 },
  },
  {
    id: 3,
    location: "Central Avenue & Oak Street",
    congestion: "Low",
    time: "1:00 PM - 3:00 PM",
    status: "Normal flow",
    coordinates: { lat: 40.7148, lng: -74.023 },
  },
  {
    id: 4,
    location: "Riverside Drive",
    congestion: "High",
    time: "5:00 PM - 6:30 PM",
    status: "Road closure",
    coordinates: { lat: 40.7098, lng: -74.009 },
  },
  {
    id: 5,
    location: "Metro Station Entrance",
    congestion: "Medium",
    time: "7:30 AM - 9:00 AM",
    status: "Event nearby",
    coordinates: { lat: 40.7208, lng: -74.001 },
  },
];

const trafficTrendData = [
  { name: "6 AM", cars: 1200, congestion: 25 },
  { name: "8 AM", cars: 2800, congestion: 78 },
  { name: "10 AM", cars: 2000, congestion: 50 },
  { name: "12 PM", cars: 1800, congestion: 45 },
  { name: "2 PM", cars: 1600, congestion: 40 },
  { name: "4 PM", cars: 2400, congestion: 65 },
  { name: "6 PM", cars: 3200, congestion: 85 },
  { name: "8 PM", cars: 1800, congestion: 48 },
  { name: "10 PM", cars: 1000, congestion: 25 },
];

const weeklyTrendData = [
  { day: "Mon", congestion: 65, incidents: 12 },
  { day: "Tue", congestion: 60, incidents: 8 },
  { day: "Wed", congestion: 70, incidents: 14 },
  { day: "Thu", congestion: 55, incidents: 6 },
  { day: "Fri", congestion: 75, incidents: 16 },
  { day: "Sat", congestion: 45, incidents: 5 },
  { day: "Sun", congestion: 35, incidents: 3 },
];

const trafficIncidents = [
  {
    id: 1,
    type: "Accident",
    location: "Main St & 5th Ave",
    time: "08:45 AM",
    severity: "Major",
    status: "Emergency services on scene",
  },
  {
    id: 2,
    type: "Construction",
    location: "Highway 101, Mile 34",
    time: "All day",
    severity: "Moderate",
    status: "Lane closure",
  },
  {
    id: 3,
    type: "Heavy Traffic",
    location: "Downtown Area",
    time: "5:30 PM - 7:00 PM",
    severity: "Minor",
    status: "Delays expected",
  },
];

const trafficCongestionColors = {
  High: "bg-red-100 text-red-800 border-red-200",
  Medium: "bg-amber-100 text-amber-800 border-amber-200",
  Low: "bg-green-100 text-green-800 border-green-200",
};

export default function TrafficPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("realtime");

  const { data: cityStats } = useQuery({
    queryKey: ["/api/city-stats"],
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - desktop navigation */}
      <Sidebar />
      
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMobileMenuToggle={toggleMobileMenu} title="Traffic Monitoring" />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Current Congestion</p>
                    <h3 className="text-2xl font-bold text-slate-800">32%</h3>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <Car className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 mr-1 text-red-500" />
                  <span className="text-red-600 font-medium">+5% </span>
                  <span className="text-slate-500 ml-1">from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Active Incidents</p>
                    <h3 className="text-2xl font-bold text-slate-800">7</h3>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-600 font-medium">-2 </span>
                  <span className="text-slate-500 ml-1">from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Average Speed</p>
                    <h3 className="text-2xl font-bold text-slate-800">28 mph</h3>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
                  <span className="text-red-600 font-medium">-12% </span>
                  <span className="text-slate-500 ml-1">from average</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle>Traffic Trends</CardTitle>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                      <TabsList>
                        <TabsTrigger value="realtime">Real-time</TabsTrigger>
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <TabsContent value="realtime" className="mt-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={trafficTrendData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="cars" stroke="#6366f1" activeDot={{ r: 8 }} name="Vehicle Count" />
                          <Line yAxisId="right" type="monotone" dataKey="congestion" stroke="#f43f5e" name="Congestion %" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="daily" className="mt-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={trafficTrendData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="congestion" fill="#f43f5e" name="Congestion %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="weekly" className="mt-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={weeklyTrendData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="congestion" fill="#6366f1" name="Congestion %" />
                          <Bar dataKey="incidents" fill="#f43f5e" name="Incidents" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-white mb-6">
                <CardHeader>
                  <CardTitle>Traffic Alerts</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {trafficIncidents.map((incident) => (
                      <div key={incident.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start">
                          <div className="mr-3 mt-0.5">
                            <AlertCircle className={`h-5 w-5 ${incident.severity === "Major" ? "text-red-500" : incident.severity === "Moderate" ? "text-amber-500" : "text-blue-500"}`} />
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <h4 className="font-medium text-slate-800">{incident.type}</h4>
                              <Badge 
                                variant="outline" 
                                className={`ml-2 ${incident.severity === "Major" ? "bg-red-100 text-red-800 border-red-200" : incident.severity === "Moderate" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-blue-100 text-blue-800 border-blue-200"}`}
                              >
                                {incident.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 flex items-center mb-1">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {incident.location}
                            </p>
                            <p className="text-sm text-slate-600 flex items-center mb-1">
                              <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {incident.time}
                            </p>
                            <p className="text-xs text-slate-500">{incident.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="w-full mt-4 text-primary">
                    View All Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Traffic Hotspots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Congestion</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Peak Time</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {trafficHotspots.map((hotspot) => (
                      <tr key={hotspot.id} className="hover:bg-slate-50">
                        <td className="py-4 px-4 text-sm text-slate-800 font-medium">{hotspot.location}</td>
                        <td className="py-4 px-4">
                          <Badge 
                            variant="outline" 
                            className={trafficCongestionColors[hotspot.congestion as keyof typeof trafficCongestionColors]}
                          >
                            {hotspot.congestion}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600">{hotspot.time}</td>
                        <td className="py-4 px-4 text-sm text-slate-600">{hotspot.status}</td>
                        <td className="py-4 px-4">
                          <Button variant="outline" size="sm">
                            View on Map
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}