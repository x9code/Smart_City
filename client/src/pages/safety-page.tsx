import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  Bell, 
  Phone, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Check, 
  Clock, 
  Info,
  FileText,
  ArrowRight,
  Megaphone,
  Heart,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Smartphone,
  AlertCircle,
  Calendar,
  HelpCircle as QuestionCircle
} from "lucide-react";

// Sample data for safety zones
const safetyZones = [
  {
    id: 1,
    name: "Central Police Station",
    type: "Police",
    address: "123 Main Street, Downtown",
    status: "Active",
    contact: "(555) 123-4567",
    hours: "24/7",
    features: ["Surveillance Cameras", "Emergency Phone", "Patrol Officers"],
    location: { lat: 40.7128, lng: -74.006 }
  },
  {
    id: 2,
    name: "Women's Resource Center",
    type: "Support Center",
    address: "456 Oak Avenue, Westside",
    status: "Active",
    contact: "(555) 987-6543",
    hours: "8:00 AM - 8:00 PM",
    features: ["Counseling", "Support Groups", "Shelter Services"],
    location: { lat: 40.7218, lng: -74.015 }
  },
  {
    id: 3,
    name: "University Campus Security Hub",
    type: "Campus Safety",
    address: "789 College Road, University District",
    status: "Active",
    contact: "(555) 456-7890",
    hours: "24/7",
    features: ["Security Personnel", "Emergency Buttons", "Escort Services"],
    location: { lat: 40.7148, lng: -74.023 }
  },
  {
    id: 4,
    name: "Transit Hub Safe Point",
    type: "Transit Safety",
    address: "567 Train Station Plaza, Central District",
    status: "Active",
    contact: "(555) 678-1234",
    hours: "5:00 AM - 1:00 AM",
    features: ["Security Cameras", "Emergency Phones", "Security Personnel"],
    location: { lat: 40.7098, lng: -74.009 }
  },
];

// Sample data for recent alerts
const recentAlerts = [
  {
    id: 1,
    title: "Suspicious Activity Reported",
    location: "Near Central Park, North Entrance",
    time: "20 minutes ago",
    description: "Multiple reports of suspicious individual following women in the area. Police have increased patrols.",
    severity: "Warning"
  },
  {
    id: 2,
    title: "Safe Route Advisory",
    location: "Downtown, 5th & Main Street",
    time: "2 hours ago",
    description: "Construction has closed the usual safe path. Temporary alternative route established with additional lighting and security cameras.",
    severity: "Advisory"
  },
  {
    id: 3,
    title: "Safety Workshop Announcement",
    location: "Community Center",
    time: "5 hours ago",
    description: "Free self-defense workshop this Saturday from 10 AM - 12 PM. Register online or in person.",
    severity: "Information"
  },
];

// Sample data for emergency contacts
const emergencyContacts = [
  {
    id: 1,
    name: "Emergency Police",
    phone: "911",
    description: "For immediate emergencies requiring police",
    primary: true
  },
  {
    id: 2,
    name: "Women's Safety Helpline",
    phone: "(555) 789-4321",
    description: "24/7 helpline for women in distress",
    primary: true
  },
  {
    id: 3,
    name: "Campus Security",
    phone: "(555) 234-5678",
    description: "University and college campus security service",
    primary: false
  },
  {
    id: 4,
    name: "Safe Transit Helpline",
    phone: "(555) 876-5432",
    description: "For safety concerns on public transportation",
    primary: false
  },
  {
    id: 5,
    name: "Victim Support Services",
    phone: "(555) 345-6789",
    description: "Support for victims of harassment or assault",
    primary: false
  },
];

// Sample data for safety tips
const safetyTips = [
  {
    id: 1,
    title: "Personal Safety in Public",
    tips: [
      "Stay alert and aware of your surroundings at all times",
      "Avoid isolated areas, especially at night",
      "Keep your phone charged and accessible",
      "Share your location with trusted contacts when traveling alone",
      "Trust your instincts - if something feels wrong, leave the area"
    ],
    icon: "personal_safety"
  },
  {
    id: 2,
    title: "Transportation Safety",
    tips: [
      "Use official taxi services or verified rideshare apps",
      "Check vehicle details before entering a rideshare",
      "Sit near the driver or conductor on public transportation",
      "Avoid empty train cars or buses when possible",
      "Have your keys ready when approaching your vehicle"
    ],
    icon: "directions_car"
  },
  {
    id: 3,
    title: "Digital Safety",
    tips: [
      "Be careful about sharing personal information online",
      "Review privacy settings on social media regularly",
      "Avoid posting real-time location updates publicly",
      "Be cautious with location services on apps",
      "Don't share travel plans on public platforms"
    ],
    icon: "phone_android"
  },
  {
    id: 4,
    title: "Emergency Preparedness",
    tips: [
      "Save emergency contacts under ICE (In Case of Emergency)",
      "Learn basic self-defense techniques",
      "Carry a personal safety alarm if desired",
      "Know the locations of safety zones in frequently visited areas",
      "Download and familiarize yourself with safety apps"
    ],
    icon: "emergency"
  },
];

// Sample data for safety stats
const safetyStats = [
  { name: "Safety Zones", value: "42", change: "+8", trend: "up" },
  { name: "Emergency Calls", value: "23", change: "-12%", trend: "down" },
  { name: "Response Time", value: "4.2 min", change: "-0.5 min", trend: "down" },
  { name: "Safe Escorts", value: "156", change: "+24%", trend: "up" }
];

// Sample data for safety apps
const safetyApps = [
  {
    id: 1,
    name: "SafeWalk",
    description: "GPS tracking app that allows friends or family to monitor your journey in real-time",
    features: ["Location Sharing", "SOS Button", "Safe Routes"],
    icon: "directions_walk",
    color: "blue"
  },
  {
    id: 2,
    name: "Emergency Alert",
    description: "One-touch emergency alerting system that contacts authorities and trusted contacts simultaneously",
    features: ["Quick Alerts", "Location Sharing", "Siren Activation"],
    icon: "notifications_active",
    color: "red"
  },
  {
    id: 3,
    name: "Community Watch",
    description: "Community-based safety network that shares verified alerts about incidents in your area",
    features: ["Local Alerts", "Safety Reports", "Community Verification"],
    icon: "group",
    color: "green"
  },
];

export default function SafetyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("safety-zones");
  const [reportFormData, setReportFormData] = useState({
    incidentType: "",
    location: "",
    description: "",
    contact: ""
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would connect to your backend API to submit the report
    alert("Safety report submitted successfully!");
    setReportFormData({
      incidentType: "",
      location: "",
      description: "",
      contact: ""
    });
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
        <Header onMobileMenuToggle={toggleMobileMenu} title="Women's Safety" />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          {/* Emergency Action Card */}
          <Card className="mb-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full mr-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Emergency Help</h2>
                    <p className="text-white text-opacity-90">Immediate assistance available 24/7</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-white text-purple-700 hover:bg-white hover:text-purple-800" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Call for Help
                  </Button>
                  <Button className="bg-purple-900 bg-opacity-50 text-white hover:bg-opacity-70" size="lg">
                    <Bell className="mr-2 h-5 w-5" />
                    Send Alert
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {safetyStats.map((stat, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">{stat.name}</p>
                      <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index === 0 ? "bg-purple-100 text-purple-600" : 
                      index === 1 ? "bg-amber-100 text-amber-600" : 
                      index === 2 ? "bg-green-100 text-green-600" : 
                      "bg-blue-100 text-blue-600"
                    }`}>
                      {index === 0 ? <Shield className="h-6 w-6" /> : 
                       index === 1 ? <Phone className="h-6 w-6" /> :
                       index === 2 ? <Clock className="h-6 w-6" /> :
                       <Users className="h-6 w-6" />}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    {stat.trend === "up" ? (
                      <span className={stat.name === "Emergency Calls" ? "text-red-600" : "text-green-600"}>
                        {stat.change} <ArrowRight className="h-3 w-3 ml-1 rotate-45 inline" />
                      </span>
                    ) : (
                      <span className={stat.name === "Emergency Calls" || stat.name === "Response Time" ? "text-green-600" : "text-red-600"}>
                        {stat.change} <ArrowRight className="h-3 w-3 ml-1 -rotate-45 inline" />
                      </span>
                    )}
                    <span className="text-slate-500 ml-2">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex bg-white p-1 rounded-lg shadow mb-6">
              <TabsTrigger value="safety-zones" className="flex-1 py-3">
                <Shield className="h-4 w-4 mr-2" />
                Safety Zones
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex-1 py-3">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex-1 py-3">
                <FileText className="h-4 w-4 mr-2" />
                Resources
              </TabsTrigger>
              <TabsTrigger value="report" className="flex-1 py-3">
                <Megaphone className="h-4 w-4 mr-2" />
                Report
              </TabsTrigger>
            </TabsList>
            
            {/* Safety Zones Tab */}
            <TabsContent value="safety-zones" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Nearby Safety Zones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96 bg-slate-100 rounded-lg overflow-hidden mb-6 relative">
                        {/* This would be replaced with an actual map component like Google Maps */}
                        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-700">Safety Zone Map</h3>
                            <p className="text-sm text-slate-500 mt-2">Interactive map showing all safety zones would appear here.</p>
                          </div>
                        </div>
                        
                        {/* Map controls that would work with actual map implementation */}
                        <div className="absolute top-4 right-4 bg-white rounded-lg shadow p-2 flex gap-2">
                          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                            <Users className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {safetyZones.map((zone) => (
                          <div key={zone.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-purple-200 hover:bg-purple-50 transition-colors">
                            <div className="flex items-start">
                              <div className="p-2 bg-purple-100 rounded-lg mr-4 mt-1">
                                <Shield className="h-6 w-6 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className="font-medium text-slate-800">{zone.name}</h3>
                                  <Badge className="bg-green-100 text-green-800 border-0">
                                    {zone.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-slate-600 flex items-center mt-1">
                                  <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                                  {zone.address}
                                </div>
                                <div className="text-sm text-slate-600 flex items-center mt-1">
                                  <Phone className="h-3.5 w-3.5 mr-1 text-slate-400" />
                                  {zone.contact}
                                </div>
                                <div className="text-sm text-slate-600 flex items-center mt-1 mb-3">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                                  {zone.hours}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {zone.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="ml-2">
                                <MapPin className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-white mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-purple-600" />
                        Emergency Contacts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {emergencyContacts.filter(c => c.primary).map((contact) => (
                          <div key={contact.id} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-slate-800">{contact.name}</h3>
                                <p className="text-sm text-slate-600 mt-1">{contact.description}</p>
                              </div>
                              <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                                <Phone className="h-4 w-4 mr-1" />
                                Call
                              </Button>
                            </div>
                            <div className="mt-2 text-lg font-semibold text-purple-700">{contact.phone}</div>
                          </div>
                        ))}
                        
                        <div className="border-t border-slate-200 pt-4">
                          <h3 className="text-sm font-medium text-slate-500 mb-3">Additional Contacts</h3>
                          <div className="space-y-2">
                            {emergencyContacts.filter(c => !c.primary).map((contact) => (
                              <div key={contact.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                <div>
                                  <h4 className="font-medium text-slate-700">{contact.name}</h4>
                                  <p className="text-xs text-slate-500">{contact.phone}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Phone className="h-4 w-4 text-slate-600" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Smartphone className="h-5 w-5 mr-2 text-purple-600" />
                        Safety Apps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {safetyApps.map((app) => (
                          <div key={app.id} className="flex border border-slate-200 rounded-lg overflow-hidden">
                            <div className={`p-4 flex items-center justify-center w-16 ${
                              app.color === "blue" ? "bg-blue-100" : 
                              app.color === "red" ? "bg-red-100" : 
                              "bg-green-100"
                            }`}>
                              <span className="material-icons text-2xl">{app.icon}</span>
                            </div>
                            <div className="p-4 flex-1">
                              <h3 className="font-medium text-slate-800">{app.name}</h3>
                              <p className="text-sm text-slate-600 mt-1">{app.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {app.features.map((feature, index) => (
                                  <Badge key={index} variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button className="w-full">Download Safety Apps</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Alerts Tab */}
            <TabsContent value="alerts" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-white mb-6">
                    <CardHeader>
                      <CardTitle>Recent Safety Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentAlerts.map((alert) => (
                          <div key={alert.id} className={`p-4 rounded-lg ${
                            alert.severity === "Warning" ? "bg-red-50 border border-red-200" :
                            alert.severity === "Advisory" ? "bg-amber-50 border border-amber-200" :
                            "bg-blue-50 border border-blue-200"
                          }`}>
                            <div className="flex items-start">
                              <div className={`p-2 rounded-full mr-4 mt-1 ${
                                alert.severity === "Warning" ? "bg-red-100" :
                                alert.severity === "Advisory" ? "bg-amber-100" :
                                "bg-blue-100"
                              }`}>
                                {alert.severity === "Warning" ? (
                                  <AlertTriangle className={`h-5 w-5 text-red-600`} />
                                ) : alert.severity === "Advisory" ? (
                                  <Info className={`h-5 w-5 text-amber-600`} />
                                ) : (
                                  <Bell className={`h-5 w-5 text-blue-600`} />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className={`font-medium ${
                                    alert.severity === "Warning" ? "text-red-800" :
                                    alert.severity === "Advisory" ? "text-amber-800" :
                                    "text-blue-800"
                                  }`}>{alert.title}</h3>
                                  <Badge className={
                                    alert.severity === "Warning" ? "bg-red-100 text-red-800 border-0" :
                                    alert.severity === "Advisory" ? "bg-amber-100 text-amber-800 border-0" :
                                    "bg-blue-100 text-blue-800 border-0"
                                  }>
                                    {alert.severity}
                                  </Badge>
                                </div>
                                <div className="text-sm flex items-center mt-1">
                                  <MapPin className="h-3.5 w-3.5 mr-1 text-slate-500" />
                                  <span className={`${
                                    alert.severity === "Warning" ? "text-red-700" :
                                    alert.severity === "Advisory" ? "text-amber-700" :
                                    "text-blue-700"
                                  }`}>{alert.location}</span>
                                </div>
                                <div className="text-sm flex items-center mt-1 mb-2">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-slate-500" />
                                  <span className={`${
                                    alert.severity === "Warning" ? "text-red-700" :
                                    alert.severity === "Advisory" ? "text-amber-700" :
                                    "text-blue-700"
                                  }`}>{alert.time}</span>
                                </div>
                                <p className="text-sm mt-3">{alert.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Safe Routes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 bg-slate-100 rounded-lg overflow-hidden mb-6 relative">
                        {/* This would be replaced with an actual map component with routes */}
                        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-700">Safe Routes Map</h3>
                            <p className="text-sm text-slate-500 mt-2">Map showing recommended safe routes would appear here.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="font-medium text-slate-800 mb-2">Plan Your Safe Journey</h3>
                        <p className="text-sm text-slate-600 mb-4">
                          Use our safe route planner to find the most secure path to your destination with well-lit streets, safety zones, and emergency points along the way.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            <MapPin className="mr-2 h-4 w-4" />
                            Plan Safe Route
                          </Button>
                          <Button variant="outline">
                            <Shield className="mr-2 h-4 w-4" />
                            Share Location
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-white mb-6">
                    <CardHeader>
                      <CardTitle>Alert Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-purple-100 rounded-full mr-3">
                            <Bell className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-800">Receive Safety Alerts</h3>
                            <p className="text-sm text-slate-600">
                              Get real-time notifications about safety concerns in your area
                            </p>
                          </div>
                        </div>
                        <Button className="w-full">Subscribe to Alerts</Button>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="font-medium text-slate-800 mb-3">Alert Settings</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-700">Emergency Alerts</span>
                            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-700">Safety Advisories</span>
                            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-700">Community Updates</span>
                            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-700">Program Announcements</span>
                            <Badge className="bg-slate-100 text-slate-800">Disabled</Badge>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-4">Manage Notifications</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Heart className="h-8 w-8 mr-4" />
                        <h3 className="text-xl font-bold">Need Support?</h3>
                      </div>
                      <p className="mb-4 text-white text-opacity-90">
                        If you're feeling unsafe or need emotional support, our counselors are available 24/7.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="bg-white text-purple-700 hover:bg-white hover:bg-opacity-90 hover:text-purple-800">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Support
                        </Button>
                        <Button className="bg-purple-900 bg-opacity-50 text-white hover:bg-opacity-70">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Chat Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-white mb-6">
                    <CardHeader>
                      <CardTitle>Safety Tips & Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {safetyTips.map((section) => (
                          <div key={section.id} className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                            <div className="flex items-center mb-4">
                              <div className="p-2 bg-purple-100 rounded-full mr-3">
                                <span className="material-icons text-purple-600">{section.icon}</span>
                              </div>
                              <h3 className="font-medium text-slate-800">{section.title}</h3>
                            </div>
                            <ul className="space-y-2">
                              {section.tips.map((tip, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="h-4 w-4 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-sm text-slate-700">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 bg-purple-50 p-5 rounded-lg border border-purple-200">
                        <div className="flex items-center mb-4">
                          <Info className="h-5 w-5 text-purple-600 mr-3" />
                          <h3 className="font-medium text-slate-800">Additional Resources</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <a href="#" className="flex items-center p-3 bg-white rounded-lg border border-slate-200 hover:border-purple-300 hover:shadow-sm transition-all">
                            <FileText className="h-5 w-5 text-purple-600 mr-3" />
                            <div>
                              <h4 className="font-medium text-slate-800 text-sm">Personal Safety Guide</h4>
                              <p className="text-xs text-slate-500">Comprehensive safety handbook (PDF)</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400 ml-auto" />
                          </a>
                          <a href="#" className="flex items-center p-3 bg-white rounded-lg border border-slate-200 hover:border-purple-300 hover:shadow-sm transition-all">
                            <FileText className="h-5 w-5 text-purple-600 mr-3" />
                            <div>
                              <h4 className="font-medium text-slate-800 text-sm">Legal Rights Guide</h4>
                              <p className="text-xs text-slate-500">Know your legal protections (PDF)</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400 ml-auto" />
                          </a>
                          <a href="#" className="flex items-center p-3 bg-white rounded-lg border border-slate-200 hover:border-purple-300 hover:shadow-sm transition-all">
                            <FileText className="h-5 w-5 text-purple-600 mr-3" />
                            <div>
                              <h4 className="font-medium text-slate-800 text-sm">Self-Defense Basics</h4>
                              <p className="text-xs text-slate-500">Simple techniques for protection</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400 ml-auto" />
                          </a>
                          <a href="#" className="flex items-center p-3 bg-white rounded-lg border border-slate-200 hover:border-purple-300 hover:shadow-sm transition-all">
                            <FileText className="h-5 w-5 text-purple-600 mr-3" />
                            <div>
                              <h4 className="font-medium text-slate-800 text-sm">Travel Safety Tips</h4>
                              <p className="text-xs text-slate-500">Stay safe while traveling</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400 ml-auto" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Upcoming Safety Workshops</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border border-slate-200 rounded-lg hover:border-purple-200 hover:bg-purple-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-slate-800">Self-Defense for Beginners</h3>
                            <Badge className="bg-green-100 text-green-800 border-0">
                              Available
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-slate-600 mt-2">
                            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                            Saturday, October 28, 2023 • 10:00 AM - 12:00 PM
                          </div>
                          <div className="flex items-center text-sm text-slate-600 mt-1 mb-3">
                            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                            Community Center, 123 Main Street
                          </div>
                          <p className="text-sm text-slate-700 mb-4">
                            Learn basic self-defense techniques from certified instructors. No prior experience required. All equipment provided.
                          </p>
                          <Button>Register Now</Button>
                        </div>
                        
                        <div className="p-4 border border-slate-200 rounded-lg hover:border-purple-200 hover:bg-purple-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-slate-800">Digital Safety Workshop</h3>
                            <Badge className="bg-green-100 text-green-800 border-0">
                              Available
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-slate-600 mt-2">
                            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                            Wednesday, November 8, 2023 • 6:00 PM - 7:30 PM
                          </div>
                          <div className="flex items-center text-sm text-slate-600 mt-1 mb-3">
                            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                            Virtual Workshop (Zoom)
                          </div>
                          <p className="text-sm text-slate-700 mb-4">
                            Learn how to protect your privacy online, secure your accounts, and avoid digital harassment.
                          </p>
                          <Button>Register Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-white mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <HelpCircle className="h-5 w-5 mr-2 text-purple-600" />
                        Support Services
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h3 className="font-medium text-slate-800 mb-2">Counseling Services</h3>
                          <p className="text-sm text-slate-600 mb-3">
                            Free and confidential counseling services for victims of harassment or assault.
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-blue-700">
                              <Phone className="h-4 w-4 inline mr-1" />
                              (555) 123-4567
                            </div>
                            <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                              Schedule
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <h3 className="font-medium text-slate-800 mb-2">Legal Assistance</h3>
                          <p className="text-sm text-slate-600 mb-3">
                            Pro bono legal consultation and representation for safety-related concerns.
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-purple-700">
                              <Phone className="h-4 w-4 inline mr-1" />
                              (555) 987-6543
                            </div>
                            <Button size="sm" variant="outline" className="text-purple-700 border-purple-300">
                              Consult
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                          <h3 className="font-medium text-slate-800 mb-2">Safe Housing</h3>
                          <p className="text-sm text-slate-600 mb-3">
                            Temporary safe housing options for those facing domestic violence or unsafe living conditions.
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-pink-700">
                              <Phone className="h-4 w-4 inline mr-1" />
                              (555) 789-0123
                            </div>
                            <Button size="sm" variant="outline" className="text-pink-700 border-pink-300">
                              Inquire
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>FAQ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-b border-slate-200 pb-3">
                          <h3 className="font-medium text-slate-800 mb-2 flex items-start">
                            <QuestionCircle className="h-4 w-4 mr-2 mt-1 text-purple-600" />
                            How do I report an unsafe situation?
                          </h3>
                          <p className="text-sm text-slate-600 ml-6">
                            Use the "Report" tab to submit details about unsafe situations or incidents. For emergencies, always call 911 first.
                          </p>
                        </div>
                        
                        <div className="border-b border-slate-200 pb-3">
                          <h3 className="font-medium text-slate-800 mb-2 flex items-start">
                            <QuestionCircle className="h-4 w-4 mr-2 mt-1 text-purple-600" />
                            What are Safety Zones?
                          </h3>
                          <p className="text-sm text-slate-600 ml-6">
                            Safety Zones are designated areas with security measures like surveillance cameras, emergency phones, and regular patrol presence.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-slate-800 mb-2 flex items-start">
                            <QuestionCircle className="h-4 w-4 mr-2 mt-1 text-purple-600" />
                            How can I access safety workshops?
                          </h3>
                          <p className="text-sm text-slate-600 ml-6">
                            Safety workshops are listed under the "Resources" tab. Registration is free for all residents.
                          </p>
                        </div>
                      </div>
                      <Button variant="link" className="w-full mt-4 text-purple-600">
                        View All FAQs
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Report Tab */}
            <TabsContent value="report" className="mt-0">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Submit Safety Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-slate-800 mb-1">Report Safety Concerns</h3>
                        <p className="text-sm text-slate-600">
                          Use this form to report safety concerns, suspicious activities, or incidents. For emergencies requiring immediate attention, please call 911.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleReportSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="incidentType" className="block text-sm font-medium text-slate-700 mb-1">
                            Type of Incident or Concern
                          </label>
                          <select 
                            id="incidentType" 
                            name="incidentType"
                            value={reportFormData.incidentType}
                            onChange={handleReportChange as any}
                            className="w-full rounded-md border border-slate-300 p-2 text-sm"
                            required
                          >
                            <option value="">Select incident type</option>
                            <option value="suspicious_activity">Suspicious Activity</option>
                            <option value="harassment">Harassment</option>
                            <option value="safety_hazard">Safety Hazard</option>
                            <option value="lighting_issue">Poor Lighting</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
                            Location
                          </label>
                          <Input
                            id="location"
                            name="location"
                            value={reportFormData.location}
                            onChange={handleReportChange}
                            placeholder="Enter address or description of location"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                          </label>
                          <Textarea
                            id="description"
                            name="description"
                            value={reportFormData.description}
                            onChange={handleReportChange}
                            placeholder="Please provide details about what you observed"
                            rows={4}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="contact" className="block text-sm font-medium text-slate-700 mb-1">
                            Contact Information (Optional)
                          </label>
                          <Input
                            id="contact"
                            name="contact"
                            value={reportFormData.contact}
                            onChange={handleReportChange}
                            placeholder="Email or phone number for follow-up"
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            Your contact information will remain confidential and will only be used for follow-up about this report.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                        Submit Report
                      </Button>
                      <Button type="reset" variant="outline">
                        Clear Form
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}