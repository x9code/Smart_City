import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { AnimatedCard } from "@/components/ui/animated-card";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF, PolylineF } from '@react-google-maps/api';
import { useQuery } from "@tanstack/react-query";
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
  Car,
  Share,
  Save,
  Volume2,
  Vibrate,
  History,
  Download,
  Home,
  HelpCircle as QuestionCircle
} from "lucide-react";

// Bhubaneswar safety zones data
const safetyZones = [
  {
    id: 1,
    name: "Bhubaneswar Mahila Police Station",
    type: "Women's Police Station",
    address: "Rupali Square, Saheed Nagar, Bhubaneswar, 751007",
    status: "Active",
    contact: "0674-2544999",
    hours: "24/7",
    features: ["All-Women Police Staff", "Emergency Response Team", "Counseling Services"],
    location: { lat: 20.2961, lng: 85.8245 }
  },
  {
    id: 2,
    name: "Sakhi One Stop Centre",
    type: "Support Center",
    address: "Capital Hospital Campus, Unit-6, Bhubaneswar, 751001",
    status: "Active",
    contact: "0674-2391983",
    hours: "24/7",
    features: ["Medical Aid", "Legal Assistance", "Psycho-social Support", "Temporary Shelter"],
    location: { lat: 20.2712, lng: 85.8431 }
  },
  {
    id: 3,
    name: "KIIT University Women's Safety Zone",
    type: "Campus Safety",
    address: "KIIT Road, Patia, Bhubaneswar, 751024",
    status: "Active",
    contact: "0674-2742103",
    hours: "24/7",
    features: ["Pink Patrol", "Emergency Call Buttons", "Dedicated Security Staff", "CCTV Surveillance"],
    location: { lat: 20.3548, lng: 85.8246 }
  },
  {
    id: 4,
    name: "Esplanade One Mall Safe Center",
    type: "Public Space Safety",
    address: "Rasulgarh Square, Bhubaneswar, 751010",
    status: "Active",
    contact: "0674-2346700",
    hours: "10:00 AM - 10:00 PM",
    features: ["Women Security Guards", "Emergency Help Desk", "CCTV Monitoring", "Direct Police Line"],
    location: { lat: 20.2956, lng: 85.8736 }
  },
  {
    id: 5,
    name: "Bhubaneswar Railway Station Safety Point",
    type: "Transit Safety",
    address: "Master Canteen Area, Bhubaneswar, 751009",
    status: "Active",
    contact: "0674-2531193",
    hours: "24/7",
    features: ["Women Help Desk", "RPF Women's Team", "Emergency Response", "CCTV Coverage"],
    location: { lat: 20.2705, lng: 85.8420 }
  },
];

// Bhubaneswar real-time alerts data
const recentAlerts = [
  {
    id: 1,
    title: "Suspicious Vehicle Reported",
    location: "Near Kalinga Stadium, Gate 3, Bhubaneswar",
    time: "15 minutes ago",
    description: "Reports of a suspicious white SUV repeatedly circling the area. Mahila Police patrol dispatched for verification.",
    severity: "Warning"
  },
  {
    id: 2,
    title: "Safe Route Advisory",
    location: "Nandankanan Road Construction Zone",
    time: "1 hour ago",
    description: "Road work between Damana Square and Nandankanan has limited visibility. Alternative route via Sailashree Vihar recommended with increased lighting and security.",
    severity: "Advisory"
  },
  {
    id: 3,
    title: "Pink Auto Service Extended Hours",
    location: "Citywide, Bhubaneswar",
    time: "3 hours ago",
    description: "Women-only Pink Auto service will now operate until 11 PM throughout the city for safe commute. Book via the Bhubaneswar City App.",
    severity: "Information"
  },
  {
    id: 4,
    title: "Self-Defense Workshop",
    location: "KIIT Convention Center, Patia",
    time: "6 hours ago",
    description: "Free women's self-defense workshop this Saturday from 10 AM - 12 PM. Led by Odisha Police trainers. Register at www.bbsrsafety.org or via City App.",
    severity: "Information"
  },
  {
    id: 5,
    title: "Safe Commute Initiative Launched",
    location: "Bhubaneswar Railway Station & Bus Stand",
    time: "1 day ago",
    description: "New 'Safe Commute' initiative launched with dedicated women's help desks at railway station and bus stands. Operating 24/7 with direct police connectivity.",
    severity: "Information"
  }
];

// Bhubaneswar emergency contacts
const emergencyContacts = [
  {
    id: 1,
    name: "Odisha Police Emergency",
    phone: "100",
    description: "For immediate police assistance in emergencies",
    primary: true
  },
  {
    id: 2,
    name: "Women's Helpline (Odisha)",
    phone: "181",
    description: "24/7 state helpline for women in distress",
    primary: true
  },
  {
    id: 3,
    name: "Bhubaneswar Mahila Police",
    phone: "0674-2544999",
    description: "Direct line to Bhubaneswar Women's Police Station",
    primary: true
  },
  {
    id: 4,
    name: "Sakhi One Stop Center",
    phone: "0674-2391983",
    description: "Integrated support for women affected by violence",
    primary: false
  },
  {
    id: 5,
    name: "Pink Auto Service",
    phone: "0674-2547888",
    description: "Women-only auto service for safe transportation",
    primary: false
  },
  {
    id: 6,
    name: "Railway Protection Force",
    phone: "0674-2531193",
    description: "Safety assistance at railway stations",
    primary: false
  },
  {
    id: 7,
    name: "Ambulance Service",
    phone: "108",
    description: "Emergency medical assistance",
    primary: false
  },
  {
    id: 8,
    name: "Odisha State Commission for Women",
    phone: "0674-2390495",
    description: "Legal aid and formal complaints for women",
    primary: false
  }
];

// Bhubaneswar-specific safety tips
const safetyTips = [
  {
    id: 1,
    title: "Safety in Bhubaneswar Public Areas",
    tips: [
      "Use the designated 'Safe Corridors' in main market areas like Market Building and Esplanade Mall",
      "Avoid isolated areas in Chandaka Forest side after dark",
      "Keep your phone charged with the Odisha Police app installed",
      "Share your auto/cab journey via Pink Auto service provided by the city",
      "Use the emergency poles located throughout Bhubaneswar parks and public spaces"
    ],
    icon: "personal_safety"
  },
  {
    id: 2,
    title: "Bhubaneswar Transportation Safety",
    tips: [
      "Use Pink Auto service available throughout the city for women-only transportation",
      "Board MO Bus from designated women's priority boarding areas",
      "Verify auto/cab details with the Smart City app before boarding",
      "Use railway help desk at Bhubaneswar Railway Station when traveling by train",
      "Prefer the women's compartment in trains arriving/departing Bhubaneswar"
    ],
    icon: "directions_car"
  },
  {
    id: 3,
    title: "Bhubaneswar Event Safety",
    tips: [
      "At Kalinga Stadium events, locate the women's safety booths at all entrances",
      "During festivals like Durga Puja and Raja, use the designated women's help points",
      "For cultural events at Rabindra Mandap, use the priority entrance for women",
      "At exhibitions in Exhibition Ground, locate the security booths marked in pink",
      "Use buddy system when attending night markets in Khandagiri and Ekamra Haat"
    ],
    icon: "calendar"
  },
  {
    id: 4,
    title: "Bhubaneswar Emergency Response",
    tips: [
      "Save Odisha Women's Helpline (181) and Bhubaneswar Mahila Police (0674-2544999)",
      "Attend free self-defense workshops held at KIIT University monthly",
      "Download and register on the Durga Shakti app by Odisha Police",
      "Note locations of Sakhi One Stop Centres at Capital Hospital and AIIMS Bhubaneswar",
      "Join local women's safety WhatsApp groups organized by Bhubaneswar Municipal Corporation"
    ],
    icon: "emergency"
  },
  {
    id: 5,
    title: "Shopping Areas & Markets Safety",
    tips: [
      "At Market Building area, stay in well-lit and crowded sections",
      "In Saheed Nagar market, use the women's assistance booth if needed",
      "At Esplanade and DN Regalia malls, locate security help desks on each floor",
      "Keep valuables secure while shopping in Unit 1 market area",
      "Use designated women's restrooms with security in all major shopping centers"
    ],
    icon: "shopping_bag"
  },
];

// Bhubaneswar safety statistics
const safetyStats = [
  { name: "Safety Zones", value: "38", change: "+6", trend: "up" },
  { name: "Emergency Calls", value: "27", change: "-9%", trend: "down" },
  { name: "Response Time", value: "3.8 min", change: "-0.7 min", trend: "down" },
  { name: "Pink Auto Trips", value: "284", change: "+32%", trend: "up" }
];

// Bhubaneswar safety apps data
const safetyApps = [
  {
    id: 1,
    name: "Odisha Police Citizen App",
    description: "Official app from Odisha Police with women's safety features, emergency assistance, and quick reporting",
    features: ["SOS Alert", "Women's Safety", "Complaint Filing", "Station Locator"],
    icon: "shield",
    color: "blue"
  },
  {
    id: 2,
    name: "Bhubaneswar Smart City App",
    description: "City-wide app with women's safety module, Pink Auto booking, and emergency services",
    features: ["Pink Auto Service", "Emergency Contacts", "Safety Zones Map", "Alert System"],
    icon: "home",
    color: "purple"
  },
  {
    id: 3,
    name: "Durga Shakti",
    description: "App designed specifically for women's safety in Odisha with panic button and location tracking",
    features: ["Panic Button", "Location Sharing", "Police Connection", "Voice Activation"],
    icon: "siren",
    color: "red"
  },
  {
    id: 4,
    name: "Abhayam",
    description: "Community safety app for Bhubaneswar residents to report and view safety concerns in neighborhoods",
    features: ["Incident Reporting", "Safety Alerts", "Community Verification", "Safe Routes"],
    icon: "group",
    color: "green"
  },
  {
    id: 5,
    name: "MO Bus Tracking",
    description: "Official Bhubaneswar transit app with women's safety features for public transportation",
    features: ["Bus Tracking", "Women's Section Status", "Emergency Help", "Trip Sharing"],
    icon: "bus",
    color: "amber"
  }
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
  const [responseStatus, setResponseStatus] = useState({
    isActive: false,
    message: "",
    type: "info" as "info" | "warning" | "success" | "error",
    location: "",
    responder: "",
    eta: ""
  });
  const [liveAlerts, setLiveAlerts] = useState<typeof recentAlerts>(recentAlerts);
  const [selectedSafetyZone, setSelectedSafetyZone] = useState<number | null>(null);
  
  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });
  
  // Center map on Bhubaneswar, India
  const mapCenter = { lat: 20.2961, lng: 85.8245 };
  
  // Map options to customize the appearance
  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };
  
  // Handle map marker click
  const handleMarkerClick = useCallback((zoneId: number) => {
    setSelectedSafetyZone(zoneId);
  }, []);
  
  // Close info window
  const handleInfoWindowClose = useCallback(() => {
    setSelectedSafetyZone(null);
  }, []);

  // Simulate real-time updates with periodic updates
  useEffect(() => {
    // Function to simulate new alerts coming in
    const simulateNewAlert = () => {
      const newAlertTypes = [
        {
          title: "Police Patrol Dispatched",
          location: "Nandankanan Road, Near Zoo",
          description: "Routine patrol vehicle dispatched for surveillance following recent reports.",
          severity: "Information"
        },
        {
          title: "Safety Escort Requested",
          location: "KIIT University Campus",
          description: "Safety escort service activated for student returning to hostel.",
          severity: "Information"
        },
        {
          title: "Suspicious Activity",
          location: "Patia Market Area",
          description: "Reports of suspicious individuals in the area. Police verifying.",
          severity: "Warning"
        }
      ];
      
      const randomType = newAlertTypes[Math.floor(Math.random() * newAlertTypes.length)];
      const newAlert = {
        id: Date.now(),
        title: randomType.title,
        location: randomType.location,
        time: "Just now",
        description: randomType.description,
        severity: randomType.severity
      };
      
      setLiveAlerts(prev => {
        const updated = [newAlert, ...prev.slice(0, 4)];
        return updated;
      });
    };
    
    // Set interval for simulated real-time updates
    const alertInterval = setInterval(() => {
      // 30% chance of new alert coming in
      if (Math.random() < 0.3) {
        simulateNewAlert();
      }
    }, 10000); // every 10 seconds
    
    return () => clearInterval(alertInterval);
  }, []);

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
    
    // Simulate a real-time response
    setResponseStatus({
      isActive: true,
      message: "Your report has been received. Emergency services have been notified.",
      type: "success",
      location: reportFormData.location,
      responder: "Bhubaneswar Mahila Police",
      eta: "5-7 minutes"
    });
    
    // Reset form
    setReportFormData({
      incidentType: "",
      location: "",
      description: "",
      contact: ""
    });
    
    // Add new alert to the system
    const newAlert = {
      id: Date.now(),
      title: `${reportFormData.incidentType} Reported`,
      location: reportFormData.location,
      time: "Just now",
      description: "Report submitted and verified. Authorities have been notified.",
      severity: "Warning"
    };
    
    setLiveAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    
    // After 15 seconds, update the response status
    setTimeout(() => {
      setResponseStatus(prev => ({
        ...prev,
        message: "Responders have been dispatched to your location.",
        eta: "3-5 minutes"
      }));
      
      // After another 10 seconds, update to arrival
      setTimeout(() => {
        setResponseStatus(prev => ({
          ...prev,
          message: "Responders have arrived at the location.",
          eta: "On site"
        }));
        
        // Clear the status after showing for a while
        setTimeout(() => {
          setResponseStatus(prev => ({
            ...prev,
            isActive: false
          }));
        }, 5000);
      }, 10000);
    }, 15000);
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
          {/* Hero Banner */}
          <div className="relative mb-6 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80" 
              alt="Women's Safety" 
              className="w-full h-48 object-cover"
              onError={(e) => {
                // Fallback image for women's safety banner
                e.currentTarget.src = "https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-800/70 flex items-center">
              <div className="p-8 text-white max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Women's Safety Network</h1>
                <p className="text-lg text-white/90 mb-6">
                  Empowering women with safety resources, emergency assistance, and community support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-purple-700 hover:bg-white hover:text-purple-800" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Emergency Helpline
                  </Button>
                  <Button className="bg-purple-600 text-white hover:bg-purple-700" size="lg">
                    <Shield className="mr-2 h-5 w-5" />
                    Safety Resources
                  </Button>
                </div>
              </div>
            </div>
          </div>
        
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
                        {isLoaded ? (
                          <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={mapCenter}
                            zoom={12}
                            options={mapOptions}
                          >
                            {/* Render markers for all safety zones */}
                            {safetyZones.map((zone) => (
                              <MarkerF
                                key={zone.id}
                                position={zone.location}
                                onClick={() => handleMarkerClick(zone.id)}
                                icon={{
                                  path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                                  fillColor: zone.type === "Women's Police Station" ? '#9c27b0' : 
                                             zone.type === "Support Center" ? '#e91e63' : 
                                             zone.type === "Campus Safety" ? '#2196f3' : 
                                             zone.type === "Public Space Safety" ? '#4caf50' : 
                                             '#ff9800',
                                  fillOpacity: 1,
                                  strokeWeight: 1,
                                  strokeColor: '#ffffff',
                                  scale: 2,
                                }}
                              />
                            ))}
                            
                            {/* Show info window for selected safety zone */}
                            {selectedSafetyZone !== null && (
                              <InfoWindowF
                                position={safetyZones.find(zone => zone.id === selectedSafetyZone)?.location!}
                                onCloseClick={handleInfoWindowClose}
                              >
                                <div className="p-2 max-w-[240px]">
                                  <h3 className="font-medium text-sm mb-1">
                                    {safetyZones.find(zone => zone.id === selectedSafetyZone)?.name}
                                  </h3>
                                  <p className="text-xs text-slate-600 mb-1">
                                    {safetyZones.find(zone => zone.id === selectedSafetyZone)?.type}
                                  </p>
                                  <p className="text-xs text-slate-600 mb-1 flex items-center">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {safetyZones.find(zone => zone.id === selectedSafetyZone)?.contact}
                                  </p>
                                  <p className="text-xs mt-1 font-semibold text-purple-700">
                                    Open 24/7 for women's assistance
                                  </p>
                                </div>
                              </InfoWindowF>
                            )}
                          </GoogleMap>
                        ) : (
                          <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                            <div className="text-center">
                              <AnimatedIcon 
                                icon={<MapPin className="h-16 w-16" />}
                                animationStyle="pulse"
                                size="xl"
                                color="text-slate-400"
                              />
                              <h3 className="text-lg font-medium text-slate-700 mt-4">Loading Map...</h3>
                              <p className="text-sm text-slate-500 mt-2">Real-time safety zones in Bhubaneswar</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Map controls */}
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
                          <AnimatedCard 
                            key={app.id} 
                            className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
                            animationStyle="hover"
                          >
                            <div className="flex">
                              <div className={`p-4 flex items-center justify-center w-16 ${
                                app.color === "blue" ? "bg-blue-100" : 
                                app.color === "purple" ? "bg-purple-100" : 
                                app.color === "red" ? "bg-red-100" : 
                                app.color === "green" ? "bg-green-100" : 
                                app.color === "amber" ? "bg-amber-100" : 
                                "bg-slate-100"
                              }`}>
                                <AnimatedIcon 
                                  icon={
                                    app.icon === "shield" ? <Shield className="h-6 w-6" /> : 
                                    app.icon === "home" ? <Home className="h-6 w-6" /> : 
                                    app.icon === "siren" ? <Bell className="h-6 w-6" /> : 
                                    app.icon === "group" ? <Users className="h-6 w-6" /> : 
                                    app.icon === "bus" ? <Car className="h-6 w-6" /> : 
                                    <Smartphone className="h-6 w-6" />
                                  }
                                  animationStyle={
                                    app.icon === "shield" ? "pulse" : 
                                    app.icon === "home" ? "bounce" : 
                                    app.icon === "siren" ? "shake" : 
                                    app.icon === "group" ? "pulse" : 
                                    app.icon === "bus" ? "pingPong" : 
                                    "rotate"
                                  }
                                  color={
                                    app.color === "blue" ? "text-blue-600" : 
                                    app.color === "purple" ? "text-purple-600" : 
                                    app.color === "red" ? "text-red-600" : 
                                    app.color === "green" ? "text-green-600" : 
                                    app.color === "amber" ? "text-amber-600" : 
                                    "text-slate-600"
                                  }
                                />
                              </div>
                              <div className="p-4 flex-1">
                                <h3 className="font-medium text-slate-800">{app.name}</h3>
                                <p className="text-sm text-slate-600 mt-1">{app.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {app.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className={`
                                      ${app.color === "blue" ? "bg-blue-50 text-blue-700 border-blue-200" : 
                                      app.color === "purple" ? "bg-purple-50 text-purple-700 border-purple-200" : 
                                      app.color === "red" ? "bg-red-50 text-red-700 border-red-200" : 
                                      app.color === "green" ? "bg-green-50 text-green-700 border-green-200" : 
                                      app.color === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" : 
                                      "bg-slate-50 text-slate-700 border-slate-200"} text-xs`}>
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="mt-3 flex justify-end">
                                  <Button variant="outline" size="sm" className="text-xs">
                                    <Download className="h-3 w-3 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </AnimatedCard>
                        ))}
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Smartphone className="h-4 w-4 mr-2" />
                          View All Safety Apps
                        </Button>
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
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 mr-2 text-purple-600" />
                          <span>Live Safety Alerts - Bhubaneswar</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-0 animate-pulse">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5 inline-block"></span>
                          Live Updates
                        </Badge>
                      </CardTitle>
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
                        {isLoaded ? (
                          <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={mapCenter}
                            zoom={12}
                            options={{
                              ...mapOptions,
                              styles: [
                                ...mapOptions.styles,
                                {
                                  featureType: "road",
                                  elementType: "geometry",
                                  stylers: [{ visibility: "on" }]
                                },
                                {
                                  featureType: "road.arterial",
                                  elementType: "geometry",
                                  stylers: [{ color: "#8e24aa" }, { weight: 2 }]
                                }
                              ]
                            }}
                          >
                            {/* Render markers for emergency phones and safe points */}
                            <MarkerF
                              position={{ lat: 20.2975, lng: 85.8236 }} // Emergency Phone near Rupali Square
                              icon={{
                                path: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z",
                                fillColor: '#e91e63',
                                fillOpacity: 1,
                                strokeWeight: 1,
                                strokeColor: '#ffffff',
                                scale: 1.5,
                              }}
                            />
                            <MarkerF
                              position={{ lat: 20.3061, lng: 85.8312 }} // Emergency Phone near Master Canteen
                              icon={{
                                path: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z",
                                fillColor: '#e91e63',
                                fillOpacity: 1,
                                strokeWeight: 1,
                                strokeColor: '#ffffff',
                                scale: 1.5,
                              }}
                            />
                            <MarkerF
                              position={{ lat: 20.2850, lng: 85.8470 }} // Emergency Phone near KIIT University
                              icon={{
                                path: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z",
                                fillColor: '#e91e63',
                                fillOpacity: 1,
                                strokeWeight: 1,
                                strokeColor: '#ffffff',
                                scale: 1.5,
                              }}
                            />
                            
                            {/* Example Safe Route Polyline - Bhubaneswar Railway Station to KIIT University */}
                            <PolylineF
                              path={[
                                { lat: 20.2705, lng: 85.8420 }, // Bhubaneswar Railway Station
                                { lat: 20.2710, lng: 85.8450 },
                                { lat: 20.2740, lng: 85.8480 },
                                { lat: 20.2790, lng: 85.8490 },
                                { lat: 20.2840, lng: 85.8500 },
                                { lat: 20.2890, lng: 85.8490 },
                                { lat: 20.2950, lng: 85.8480 },
                                { lat: 20.2980, lng: 85.8475 },
                                { lat: 20.3010, lng: 85.8465 },
                                { lat: 20.3040, lng: 85.8460 },
                                { lat: 20.3300, lng: 85.8246 }, // KIIT University
                              ]}
                              options={{
                                strokeColor: '#9c27b0',
                                strokeOpacity: 0.8,
                                strokeWeight: 5,
                                icons: [{
                                  icon: {
                                    path: "M 0,-1 0,1",
                                    strokeOpacity: 1,
                                    scale: 4
                                  },
                                  offset: '0',
                                  repeat: '20px'
                                }],
                              }}
                            />
                          </GoogleMap>
                        ) : (
                          <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                            <div className="text-center">
                              <AnimatedIcon 
                                icon={<MapPin className="h-16 w-16" />}
                                animationStyle="pulse"
                                size="xl"
                                color="text-slate-400"
                              />
                              <h3 className="text-lg font-medium text-slate-700 mt-4">Loading Map...</h3>
                              <p className="text-sm text-slate-500 mt-2">Safe routes across Bhubaneswar</p>
                            </div>
                          </div>
                        )}
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
              {responseStatus.isActive && (
                <Card className="bg-green-50 border border-green-200 mb-6">
                  <CardContent className="p-4">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                          <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-800">
                            {responseStatus.message}
                          </h3>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm text-green-700">
                                Location: {responseStatus.location}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Car className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm text-green-700">
                                Responder: {responseStatus.responder}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm text-green-700">
                                ETA: {responseStatus.eta}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Button variant="outline" size="sm" className="bg-white">
                              <Phone className="h-4 w-4 mr-2" />
                              Contact
                            </Button>
                            <Button variant="outline" size="sm" className="bg-white">
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-green-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full animate-pulse" style={{width: responseStatus.eta === "On site" ? "100%" : "70%"}}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
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
                          Use this form to report safety concerns, suspicious activities, or incidents. For emergencies requiring immediate attention, please call 181 (Women's Helpline).
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
                            <option value="Suspicious Activity">Suspicious Activity</option>
                            <option value="Harassment">Harassment</option>
                            <option value="Safety Hazard">Safety Hazard</option>
                            <option value="Poor Lighting">Poor Lighting</option>
                            <option value="Other Safety Concern">Other Safety Concern</option>
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