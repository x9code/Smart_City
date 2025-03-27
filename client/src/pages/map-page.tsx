import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Navigation, 
  Layers, 
  Plus, 
  Minus, 
  Car, 
  Bus, 
  Train, 
  PersonStanding as Walking, 
  Bike, 
  Star,
  Filter,
  Info,
  AlertTriangle,
  Building,
  TreePine,
  Coffee,
  ShoppingBag,
  Utensils,
  Home,
  Mail,
  Phone,
  MenuSquare,
  Landmark,
  Clock,
  Calendar,
  Image,
  Eye,
  CircleHelp,
  Map,
  LocateFixed,
  ParkingCircle,
  Loader2
} from "lucide-react";

const mapMarkersData = [
  {
    id: 1,
    name: "City Hall",
    category: "government",
    address: "123 Main Street, Downtown",
    coordinates: { lat: 40.7128, lng: -74.006 },
    amenities: ["Public Restrooms", "Visitor Information", "Parking"],
    phone: "(555) 123-4567",
    website: "www.cityhall.gov",
    description: "The central administrative building of the city government."
  },
  {
    id: 2,
    name: "Central Park",
    category: "parks",
    address: "Park Avenue & 5th Street",
    coordinates: { lat: 40.7821, lng: -73.9654 },
    amenities: ["Picnic Areas", "Playgrounds", "Trails", "Sports Fields"],
    phone: "(555) 789-0123",
    website: "www.centralpark.org",
    description: "A large urban park offering recreational activities and natural beauty."
  },
  {
    id: 3,
    name: "Metro Station",
    category: "transit",
    address: "Union Square",
    coordinates: { lat: 40.7359, lng: -73.9911 },
    amenities: ["Ticketing", "Restrooms", "Food Court"],
    phone: "(555) 456-7890",
    website: "www.metrotransit.org",
    description: "Major transit hub connecting various subway and bus lines."
  },
  {
    id: 4,
    name: "Central Hospital",
    category: "healthcare",
    address: "789 Medical Drive",
    coordinates: { lat: 40.7489, lng: -73.9680 },
    amenities: ["Emergency Room", "Pharmacy", "Cafeteria", "Parking"],
    phone: "(555) 911-0000",
    website: "www.centralhospital.org",
    description: "Full-service medical facility providing comprehensive healthcare services."
  },
  {
    id: 5,
    name: "Downtown Shopping Mall",
    category: "shopping",
    address: "500 Retail Avenue",
    coordinates: { lat: 40.7529, lng: -73.9942 },
    amenities: ["Food Court", "Restrooms", "ATMs", "Parking"],
    phone: "(555) 222-3333",
    website: "www.downtownmall.com",
    description: "Major shopping center with numerous retail stores and restaurants."
  },
];

const pointsOfInterest = [
  {
    id: 1,
    name: "Art Museum",
    category: "culture",
    rating: 4.7,
    description: "World-class art collections spanning multiple eras and styles.",
    imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Riverside Park",
    category: "parks",
    rating: 4.8,
    description: "Beautiful park along the river with walking paths and recreational areas.",
    imageUrl: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Historical District",
    category: "landmarks",
    rating: 4.6,
    description: "Well-preserved historic neighborhood with architecture from the 19th century.",
    imageUrl: "https://images.unsplash.com/photo-1501180895265-c00ef6655ed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Central Library",
    category: "culture",
    rating: 4.5,
    description: "Modern city library with extensive collection and community spaces.",
    imageUrl: "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Waterfront Plaza",
    category: "landmarks",
    rating: 4.9,
    description: "Modern architectural marvel with panoramic views of the city skyline.",
    imageUrl: "https://images.unsplash.com/photo-1600454803722-aad5a107f111?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
];

const trafficIncidents = [
  {
    id: 1,
    type: "Accident",
    location: "Interstate 95, Mile Marker 23",
    status: "Clearing",
    impact: "Moderate",
    reported: "10 minutes ago"
  },
  {
    id: 2,
    type: "Construction",
    location: "Main Street between 5th and 7th Ave",
    status: "Active",
    impact: "Minor",
    reported: "3 hours ago"
  },
  {
    id: 3,
    type: "Road Closure",
    location: "Bridge Street",
    status: "Active",
    impact: "Major",
    reported: "1 hour ago"
  },
];

const routes = [
  {
    id: 1,
    name: "Home to Office",
    start: "123 Residential Lane",
    end: "456 Business Park",
    distance: "7.2 miles",
    time: "15 min",
    travelMode: "car"
  },
  {
    id: 2,
    name: "Home to Shopping Center",
    start: "123 Residential Lane",
    end: "500 Retail Avenue",
    distance: "3.5 miles",
    time: "12 min",
    travelMode: "car"
  },
  {
    id: 3,
    name: "Office to Gym",
    start: "456 Business Park",
    end: "789 Fitness Boulevard",
    distance: "2.1 miles",
    time: "8 min",
    travelMode: "car"
  },
];

const categoryColors = {
  government: "bg-blue-100 text-blue-800 border-blue-200",
  parks: "bg-green-100 text-green-800 border-green-200",
  transit: "bg-purple-100 text-purple-800 border-purple-200",
  healthcare: "bg-red-100 text-red-800 border-red-200",
  shopping: "bg-amber-100 text-amber-800 border-amber-200",
  restaurants: "bg-orange-100 text-orange-800 border-orange-200",
  culture: "bg-indigo-100 text-indigo-800 border-indigo-200",
  landmarks: "bg-teal-100 text-teal-800 border-teal-200",
};

const categoryIcons = {
  government: <Landmark />,
  parks: <TreePine />,
  transit: <Bus />,
  healthcare: <Building />,
  shopping: <ShoppingBag />,
  restaurants: <Utensils />,
  culture: <Landmark />,
  landmarks: <Landmark />,
};

export default function MapPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("explore");
  const [mapZoom, setMapZoom] = useState(14);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [preferredTravelMode, setPreferredTravelMode] = useState("car");
  
  // Fetch map data from Spring Boot backend
  const { data: mapData, isLoading: isMapDataLoading, error: mapDataError } = useQuery({
    queryKey: ['/api/map'],
    refetchOnWindowFocus: false,
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMarkerSelect = (id: number) => {
    setSelectedMarker(id);
  };

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 1, 1));
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleTravelModeChange = (mode: string) => {
    setPreferredTravelMode(mode);
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
        <Header onMobileMenuToggle={toggleMobileMenu} title="City Map" />
        
        {/* Page Content */}
        <main className="flex-1 overflow-hidden flex">
          {/* Map Sidebar */}
          <div className="w-80 border-r border-slate-200 bg-white flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input 
                  placeholder="Search locations..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="p-1 mx-4 mt-4 mb-2">
                <TabsTrigger value="explore" className="flex-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  Explore
                </TabsTrigger>
                <TabsTrigger value="directions" className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Directions
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">
                  <Star className="h-4 w-4 mr-2" />
                  Saved
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-auto">
                <TabsContent value="explore" className="p-0 m-0 h-full">
                  <div className="p-4 border-b border-slate-200">
                    <h3 className="text-sm font-medium text-slate-800 mb-2">Filter by Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(categoryColors).map(category => (
                        <Button
                          key={category}
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          size="sm"
                          className={`text-xs ${selectedCategories.includes(category) ? "bg-slate-800" : "border-slate-200 text-slate-700"}`}
                          onClick={() => handleCategoryToggle(category)}
                        >
                          {categoryIcons[category as keyof typeof categoryIcons] && (
                            <span className="mr-1">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                          )}
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-slate-800 mb-2">Map Markers</h3>
                    <div className="space-y-3">
                      {mapMarkersData.map(marker => (
                        <div 
                          key={marker.id} 
                          className={`p-3 rounded-lg border ${
                            selectedMarker === marker.id 
                              ? "border-blue-500 bg-blue-50" 
                              : "border-slate-200 hover:border-blue-200 hover:bg-blue-50"
                          } cursor-pointer transition-colors`}
                          onClick={() => handleMarkerSelect(marker.id)}
                        >
                          <div className="flex items-start">
                            <div className={`p-2 rounded-lg mr-3 ${categoryColors[marker.category as keyof typeof categoryColors].split(" ")[0]}`}>
                              {categoryIcons[marker.category as keyof typeof categoryIcons]}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-800">{marker.name}</h4>
                              <p className="text-xs text-slate-500 mt-1">{marker.address}</p>
                              <Badge 
                                className={`mt-2 ${categoryColors[marker.category as keyof typeof categoryColors]}`}
                              >
                                {marker.category.charAt(0).toUpperCase() + marker.category.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="directions" className="p-0 m-0 h-full">
                  <div className="p-4 border-b border-slate-200">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">Starting Point</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                          <Input placeholder="Your current location" className="pl-10" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 block mb-1">Destination</label>
                        <div className="relative">
                          <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                          <Input placeholder="Enter destination" className="pl-10" />
                        </div>
                      </div>
                      <Button className="w-full">Get Directions</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border-b border-slate-200">
                    <h3 className="text-sm font-medium text-slate-800 mb-2">Travel Mode</h3>
                    <div className="flex gap-2">
                      {[
                        { id: "car", icon: <Car className="h-4 w-4" />, label: "Car" },
                        { id: "transit", icon: <Bus className="h-4 w-4" />, label: "Transit" },
                        { id: "walking", icon: <Walking className="h-4 w-4" />, label: "Walking" },
                        { id: "biking", icon: <Bike className="h-4 w-4" />, label: "Biking" }
                      ].map(mode => (
                        <Button
                          key={mode.id}
                          variant={preferredTravelMode === mode.id ? "default" : "outline"}
                          size="sm"
                          className={preferredTravelMode === mode.id ? "bg-slate-800" : "border-slate-200 text-slate-700"}
                          onClick={() => handleTravelModeChange(mode.id)}
                        >
                          {mode.icon}
                          <span className="sr-only">{mode.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-slate-800 mb-2">Traffic Incidents</h3>
                    <div className="space-y-3">
                      {trafficIncidents.map(incident => (
                        <div key={incident.id} className="p-3 rounded-lg border border-slate-200">
                          <div className="flex items-start">
                            <div className={`p-2 rounded-lg mr-3 ${
                              incident.impact === "Major" 
                                ? "bg-red-100" 
                                : incident.impact === "Moderate" 
                                ? "bg-amber-100" 
                                : "bg-blue-100"
                            }`}>
                              <AlertTriangle className={`h-4 w-4 ${
                                incident.impact === "Major" 
                                  ? "text-red-600" 
                                  : incident.impact === "Moderate" 
                                  ? "text-amber-600" 
                                  : "text-blue-600"
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-800">{incident.type}</h4>
                              <p className="text-xs text-slate-500 mt-1">{incident.location}</p>
                              <div className="flex items-center mt-2">
                                <Badge className={
                                  incident.impact === "Major" 
                                    ? "bg-red-100 text-red-800 border-red-200" 
                                    : incident.impact === "Moderate" 
                                    ? "bg-amber-100 text-amber-800 border-amber-200" 
                                    : "bg-blue-100 text-blue-800 border-blue-200"
                                }>
                                  {incident.status}
                                </Badge>
                                <span className="text-xs text-slate-500 ml-2">{incident.reported}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="saved" className="p-0 m-0 h-full">
                  <div className="p-4 border-b border-slate-200">
                    <h3 className="text-sm font-medium text-slate-800 mb-2">Saved Places</h3>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50 cursor-pointer">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg mr-3">
                            <Home className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-800">Home</h4>
                            <p className="text-xs text-slate-500">123 Residential Lane</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50 cursor-pointer">
                        <div className="flex items-center">
                          <div className="p-2 bg-purple-100 rounded-lg mr-3">
                            <Building className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-800">Office</h4>
                            <p className="text-xs text-slate-500">456 Business Park</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50 cursor-pointer">
                        <div className="flex items-center">
                          <div className="p-2 bg-amber-100 rounded-lg mr-3">
                            <ShoppingBag className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-800">Shopping Center</h4>
                            <p className="text-xs text-slate-500">500 Retail Avenue</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-slate-800 mb-2">Saved Routes</h3>
                    <div className="space-y-3">
                      {routes.map(route => (
                        <div key={route.id} className="p-3 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50 cursor-pointer">
                          <h4 className="font-medium text-slate-800">{route.name}</h4>
                          <div className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 text-slate-400 mr-1" />
                            <p className="text-xs text-slate-500">{route.start}</p>
                          </div>
                          <div className="flex items-center mt-1">
                            <Navigation className="h-3 w-3 text-slate-400 mr-1" />
                            <p className="text-xs text-slate-500">{route.end}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="flex items-center">
                              {route.travelMode === "car" && <Car className="h-3 w-3 text-slate-600 mr-1" />}
                              {route.travelMode === "transit" && <Bus className="h-3 w-3 text-slate-600 mr-1" />}
                              {route.travelMode === "walking" && <Walking className="h-3 w-3 text-slate-600 mr-1" />}
                              {route.travelMode === "biking" && <Bike className="h-3 w-3 text-slate-600 mr-1" />}
                              <span className="text-xs text-slate-600">{route.distance}</span>
                            </div>
                            <span className="text-xs font-medium text-slate-700">{route.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Map Area */}
          <div className="flex-1 relative bg-slate-100">
            {/* Map Loading State */}
            {isMapDataLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 z-10">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
                  <span className="text-slate-700">Loading map data...</span>
                </div>
              </div>
            )}
            
            {/* Map Error State */}
            {mapDataError && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50/90 z-10">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                  <div className="flex items-center text-red-600 mb-4">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    <h3 className="font-semibold text-lg">Error Loading Map Data</h3>
                  </div>
                  <p className="text-slate-700 mb-4">
                    There was a problem connecting to the map service. This could be due to network issues or the service might be temporarily unavailable.
                  </p>
                  <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
              </div>
            )}
            
            {/* Map Visualization with Actual Map Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="City Map Aerial View" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/10"></div>
              
              {/* Map Markers (simulated) */}
              <div className="absolute left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center ${selectedMarker === 1 ? 'ring-4 ring-blue-300 scale-125' : ''} cursor-pointer transition-all`} onClick={() => handleMarkerSelect(1)}>
                  <Landmark className="h-3 w-3 text-white" />
                </div>
              </div>
              
              <div className="absolute left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center ${selectedMarker === 2 ? 'ring-4 ring-green-300 scale-125' : ''} cursor-pointer transition-all`} onClick={() => handleMarkerSelect(2)}>
                  <TreePine className="h-3 w-3 text-white" />
                </div>
              </div>
              
              <div className="absolute left-3/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-6 h-6 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center ${selectedMarker === 3 ? 'ring-4 ring-purple-300 scale-125' : ''} cursor-pointer transition-all`} onClick={() => handleMarkerSelect(3)}>
                  <Bus className="h-3 w-3 text-white" />
                </div>
              </div>
              
              <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center ${selectedMarker === 4 ? 'ring-4 ring-red-300 scale-125' : ''} cursor-pointer transition-all`} onClick={() => handleMarkerSelect(4)}>
                  <Building className="h-3 w-3 text-white" />
                </div>
              </div>
              
              <div className="absolute left-2/3 top-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-6 h-6 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center ${selectedMarker === 5 ? 'ring-4 ring-amber-300 scale-125' : ''} cursor-pointer transition-all`} onClick={() => handleMarkerSelect(5)}>
                  <ShoppingBag className="h-3 w-3 text-white" />
                </div>
              </div>
              
              {/* Simulated Traffic Routes */}
              {preferredTravelMode === "car" && (
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <path d="M25%,33% L50%,66%" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeDasharray="10,5" fill="none" />
                    <path d="M33%,50% L75%,50%" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M66%,25% L25%,33%" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeDasharray="1,5" fill="none" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button variant="outline" size="icon" className="bg-white" onClick={handleZoomIn}>
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-white" onClick={handleZoomOut}>
                <Minus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-white">
                <Layers className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Selected Marker Info Panel */}
            {selectedMarker !== null && (
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-slate-800">
                    {mapMarkersData.find(m => m.id === selectedMarker)?.name}
                  </h3>
                  <Badge 
                    className={categoryColors[
                      (mapMarkersData.find(m => m.id === selectedMarker)?.category || "government") as keyof typeof categoryColors
                    ]}
                  >
                    {mapMarkersData.find(m => m.id === selectedMarker)?.category.charAt(0).toUpperCase() + 
                     (mapMarkersData.find(m => m.id === selectedMarker)?.category.slice(1) || "")}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 flex items-center mt-2">
                  <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                  {mapMarkersData.find(m => m.id === selectedMarker)?.address}
                </p>
                <p className="text-sm text-slate-600 mt-3">
                  {mapMarkersData.find(m => m.id === selectedMarker)?.description}
                </p>
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-slate-700 mb-1">Amenities</h4>
                  <div className="flex flex-wrap gap-1">
                    {mapMarkersData.find(m => m.id === selectedMarker)?.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <p className="text-xs text-slate-600 flex items-center">
                    <Phone className="h-3 w-3 mr-1 text-slate-400" />
                    {mapMarkersData.find(m => m.id === selectedMarker)?.phone}
                  </p>
                  <p className="text-xs text-slate-600 flex items-center">
                    <Mail className="h-3 w-3 mr-1 text-slate-400" />
                    {mapMarkersData.find(m => m.id === selectedMarker)?.website}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1">
                    <Navigation className="h-4 w-4 mr-2" />
                    Directions
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Star className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            )}
            
            {/* Map Legend and Layer Controls */}
            <div className="absolute top-16 left-4">
              <Card className="bg-white shadow-lg w-60">
                <CardHeader className="p-3 pb-1">
                  <CardTitle className="text-sm">Map Layers</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-1">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-xs text-slate-700">Government</span>
                      </div>
                      <div className="w-4 h-4 p-0.5">
                        <Eye className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-xs text-slate-700">Parks & Recreation</span>
                      </div>
                      <div className="w-4 h-4 p-0.5">
                        <Eye className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-xs text-slate-700">Transit</span>
                      </div>
                      <div className="w-4 h-4 p-0.5">
                        <Eye className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-xs text-slate-700">Healthcare</span>
                      </div>
                      <div className="w-4 h-4 p-0.5">
                        <Eye className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                        <span className="text-xs text-slate-700">Shopping</span>
                      </div>
                      <div className="w-4 h-4 p-0.5">
                        <Eye className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <h4 className="text-xs font-medium text-slate-700 mb-2">Map Style</h4>
                    <Select defaultValue="satellite">
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select Map Style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="satellite">Satellite</SelectItem>
                        <SelectItem value="terrain">Terrain</SelectItem>
                        <SelectItem value="night">Night Mode</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <h4 className="text-xs font-medium text-slate-700 mb-2">Traffic View</h4>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs h-8 flex-1">
                        <Clock className="h-3 w-3 mr-1" />
                        Live
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-8 flex-1">
                        <ParkingCircle className="h-3 w-3 mr-1" />
                        Parking
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Points of Interest Carousel */}
            <div className="absolute top-4 left-4 right-4 mx-auto max-w-2xl">
              <Card className="bg-white shadow-lg">
                <CardHeader className="p-3">
                  <CardTitle className="text-base">Points of Interest</CardTitle>
                  <div className="flex gap-2 justify-end -mt-2">
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                      <Filter className="h-3 w-3 mr-1" />
                      Filter
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                      <Map className="h-3 w-3 mr-1" />
                      Show All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {pointsOfInterest.map(poi => (
                      <div key={poi.id} className="flex-none w-60 rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-32 bg-slate-200 relative">
                          <img 
                            src={poi.imageUrl} 
                            alt={poi.name} 
                            className="h-full w-full object-cover"
                          />
                          <Badge 
                            className={`absolute top-2 right-2 ${categoryColors[poi.category as keyof typeof categoryColors]}`}
                          >
                            {poi.category.charAt(0).toUpperCase() + poi.category.slice(1)}
                          </Badge>
                          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2 flex items-center">
                            <div className="flex items-center text-white">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs ml-1">{poi.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-slate-800">{poi.name}</h4>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{poi.description}</p>
                          <div className="flex gap-1 mt-2">
                            <Button size="sm" className="flex-1 text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              Details
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs">
                              <Navigation className="h-3 w-3 mr-1" />
                              Go
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}