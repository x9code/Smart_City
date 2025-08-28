import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/components/ui/animated-section";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  Compass, 
  Hotel, 
  Utensils, 
  Coffee, 
  Ticket, 
  Camera, 
  Bus, 
  GalleryHorizontal,
  CreditCard,
  Plane, 
  Train,
  Car,
  Heart,
  Info,
  Filter,
  ChevronDown,
  Building,
  ShoppingBag
} from "lucide-react";

// Bhubaneswar travel tips
const travelTips = [
  {
    id: 1,
    title: "Best Time to Visit",
    content: "October to March offers pleasant weather (15-30°C). Avoid summer (April-June) when temperatures can exceed 40°C. The monsoon season (July-September) brings heavy rainfall."
  },
  {
    id: 2,
    title: "Public Transportation",
    content: "Use the 'Mo Bus' service that connects major parts of the city. Auto-rickshaws and taxis are readily available. App-based cab services like Ola and Uber operate throughout the city."
  },
  {
    id: 3,
    title: "Local Customs",
    content: "Remove footwear before entering temples. Dress modestly when visiting religious places. The local language is Odia, but English and Hindi are widely understood."
  },
  {
    id: 4,
    title: "Safety Tips",
    content: "Bhubaneswar is relatively safe, but take standard precautions. Avoid isolated areas after dark. Always carry a copy of your identification. Emergency services can be reached at 108 for medical and 100 for police."
  },
  {
    id: 5,
    title: "Local Cuisine",
    content: "Try local Odia dishes like Dalma, Pakhala (fermented rice), Chhena Poda (cheese dessert), and various seafood specialties. Many restaurants offer authentic Odia thalis."
  }
];

// Define interfaces for type safety
interface Attraction {
  id: number;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  address: string;
  description: string;
  openHours: string;
  price: string;
  tags: string[];
  image: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

interface Tour {
  id: number;
  name: string;
  duration: string;
  rating: number;
  reviews: number;
  price: string;
  description: string;
  image: string;
  includes: string[];
  startTimes: string[];
}

interface Hotel {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  address: string;
  priceRange: string;
  amenities: string[];
  description: string;
  image: string;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  priceRange: string;
  address: string;
  specialties: string[];
  description: string;
  image: string;
}

interface Facility {
  id: number;
  name: string;
  type: string;
  address: string;
  description: string;
  amenities: string[];
  rating: number;
  reviews: number;
  image: string;
}

interface TourismData {
  attractions: Attraction[];
  events: Event[];
  tours: Tour[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  facilities: Facility[];
}

export default function TourismPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [attractionView, setAttractionView] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Fetch tourism data from API
  const { data: tourismData, isLoading, error } = useQuery<TourismData>({
    queryKey: ["/api/tourism"],
  });

  // Set initial filtered attractions to show all attractions if no search performed
  useEffect(() => {
    if (tourismData && !searchPerformed) {
      setFilteredAttractions(tourismData.attractions);
    }
  }, [tourismData, searchPerformed]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourismData) return;
    
    // Implement search functionality across all data types
    const query = searchQuery.toLowerCase();
    
    if (query.trim() === "") {
      // If search is cleared, show all attractions
      setFilteredAttractions(tourismData.attractions);
      setSearchPerformed(false);
      return;
    }
    
    // Filter attractions by search query
    const attractions = tourismData.attractions.filter((attraction) => 
      attraction.name.toLowerCase().includes(query) ||
      attraction.type.toLowerCase().includes(query) ||
      attraction.description.toLowerCase().includes(query) ||
      attraction.address.toLowerCase().includes(query) ||
      attraction.tags.some((tag) => tag.toLowerCase().includes(query))
    );
    
    setFilteredAttractions(attractions);
    setSearchPerformed(true);
    console.log("Searching for:", searchQuery);
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
        <Header onMobileMenuToggle={toggleMobileMenu} title="Tourism Guide" />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          {/* Hero Section */}
          <div className="rounded-lg mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-30">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Bhubaneswar_collage.jpg" 
                alt="Bhubaneswar Temples Collage" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/e/e5/Lingaraja_Temple.jpg";
                  console.log("Hero image failed to load");
                }}
              />
            </div>
            <div className="p-8 md:p-12 relative z-10">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-800 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">The Temple City of India</span>
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">Smart City</span>
                  <span className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">Cultural Capital of Odisha</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover Bhubaneswar's Treasures</h1>
                <p className="text-lg md:text-xl mb-6 text-blue-50">Explore ancient temples with stunning Kalinga architecture, vibrant festivals, rich cultural heritage, and modern attractions in Odisha's capital city - home to over 700 temples and countless cultural experiences.</p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <div className="bg-amber-500 p-2 rounded-full mr-3">
                      <Camera className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">700+ Temples</h3>
                      <p className="text-sm text-blue-100">Ancient Kalinga Architecture</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <div className="bg-green-500 p-2 rounded-full mr-3">
                      <Compass className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Heritage Walks</h3>
                      <p className="text-sm text-blue-100">Guided Cultural Tours</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <div className="bg-blue-500 p-2 rounded-full mr-3">
                      <Utensils className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Odia Cuisine</h3>
                      <p className="text-sm text-blue-100">Authentic Local Flavors</p>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSearch} className="flex items-center max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input 
                      placeholder="Search attractions, events, restaurants..." 
                      className="pl-10 bg-white text-slate-800 border-0 shadow-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="ml-2 bg-indigo-800 hover:bg-indigo-900 shadow-lg">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Highlights Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg overflow-hidden h-36 md:h-48 relative group">
              <img src="https://images.unsplash.com/photo-1592456966958-b8ba601a3793?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                   alt="Lingaraj Temple, Bhubaneswar" 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   onError={(e) => {
                     e.currentTarget.src = "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                     console.log("Temples gallery image failed to load");
                   }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <span className="text-white font-medium p-3">Lingaraj Temple</span>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-36 md:h-48 relative group">
              <img src="https://images.unsplash.com/photo-1608021584625-34fad842c9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                   alt="Udayagiri and Khandagiri Caves, Bhubaneswar" 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   onError={(e) => {
                     e.currentTarget.src = "https://images.unsplash.com/photo-1512036849132-48508f294900?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                     console.log("Caves gallery image failed to load");
                   }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <span className="text-white font-medium p-3">Udayagiri Caves</span>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-36 md:h-48 relative group">
              <img src="https://images.unsplash.com/photo-1590167091916-4a49f1701022?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                   alt="Nandankanan Zoological Park, Bhubaneswar" 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   onError={(e) => {
                     e.currentTarget.src = "https://images.unsplash.com/photo-1574068468668-a05a11f871da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                     console.log("Zoo gallery image failed to load");
                   }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <span className="text-white font-medium p-3">Nandankanan Zoo</span>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-36 md:h-48 relative group">
              <img src="https://images.unsplash.com/photo-1576537317591-97c92d8d58fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                   alt="Ekamra Haat, Bhubaneswar" 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   onError={(e) => {
                     e.currentTarget.src = "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                     console.log("Ekamra Haat gallery image failed to load");
                   }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <span className="text-white font-medium p-3">Ekamra Haat</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-800"><a href="https://surl.li/tmigag">Attractions</a></h3>
                <p className="text-sm text-slate-500 mt-1">Temples & Parks</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                  <Ticket className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-800"><a href="https://events.bhubaneswar.me/">Events</a></h3>
                <p className="text-sm text-slate-500 mt-1">Festivals</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                  <Utensils className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-800"><a href="https://www.zomato.com/bhubaneswar/restaurants/odia?sort=nearme">Dining</a></h3>
                <p className="text-sm text-slate-500 mt-1">Odia Cuisine</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
                  <Hotel className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-800"><a href="https://surli.cc/imvwvx">Hotels</a></h3>
                <p className="text-sm text-slate-500 mt-1">Accommodations</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                  <Bus className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-800">Tours</h3>
                <p className="text-sm text-slate-500 mt-1"><a href="https://www.goindigo.in/indian-destinations/bhubaneswar.html">Guided Visits</a></p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-3">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-800"><a href="https://www.incredibleindia.gov.in/en/odisha/bhubaneswar/bhubaneswar-a-shoppers-delight">Shopping</a></h3>
                <p className="text-sm text-slate-500 mt-1">Handicrafts</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Top Attractions Section */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Top Attractions in Bhubaneswar</h2>
                <p className="text-slate-500">Must-visit places in the Temple City</p>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0">
                <div className="flex border border-slate-200 rounded-lg overflow-hidden mr-4">
                  <button 
                    className={`p-2 ${attractionView === 'grid' ? 'bg-slate-100' : 'bg-white'}`}
                    onClick={() => setAttractionView('grid')}
                  >
                    <GalleryHorizontal className="h-5 w-5 text-slate-600" />
                  </button>
                  <button 
                    className={`p-2 ${attractionView === 'list' ? 'bg-slate-100' : 'bg-white'}`}
                    onClick={() => setAttractionView('list')}
                  >
                    <Filter className="h-5 w-5 text-slate-600" />
                  </button>
                </div>
                
                <div className="relative">
                  <Button variant="outline" className="flex items-center">
                    <span className="mr-1">All Categories</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load attractions. Please try again later.</p>
              </div>
            ) : filteredAttractions.length === 0 ? (
              <div className="text-center py-12">
                <p>No attractions matching your search criteria.</p>
              </div>
            ) : attractionView === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAttractions.map((attraction: Attraction) => (
                  <AnimatedSection key={attraction.id} animation="fadeIn" delay={0.1 * attraction.id}>
                    <Card className="bg-white overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative group">
                        {/* Primary image with fallback system */}
                        <img 
                          src={attraction.image} 
                          alt={attraction.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            // Get fallback based on attraction type or use default
                            const fallbackType = attraction.type.toLowerCase();
                            let fallbackImage = "https://images.unsplash.com/photo-1605649461784-edc761aec3a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            
                            if (fallbackType.includes("temple")) {
                              fallbackImage = "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (fallbackType.includes("park") || fallbackType.includes("garden")) {
                              fallbackImage = "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (fallbackType.includes("museum")) {
                              fallbackImage = "https://images.unsplash.com/photo-1566054757965-8c4085344c96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (fallbackType.includes("zoo")) {
                              fallbackImage = "https://images.unsplash.com/photo-1574068468668-a05a11f871da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            }
                            
                            e.currentTarget.src = fallbackImage;
                            console.log("Image failed to load:", attraction.name);
                          }}
                        />
                        {/* Overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <Badge className="mb-2 bg-blue-100 text-blue-800 border-0 self-start">
                          {attraction.type}
                        </Badge>
                        <h3 className="font-bold text-lg mb-2">{attraction.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm font-medium">{attraction.rating}</span>
                          </div>
                          <span className="mx-2 text-xs text-slate-400">•</span>
                          <span className="text-sm text-slate-500">{attraction.reviews} reviews</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-3 line-clamp-2">{attraction.description}</p>
                        <div className="flex items-center text-sm text-slate-500 mb-2">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          <span className="line-clamp-1">{attraction.address}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-500 mb-3">
                          <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          {attraction.openHours}
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="font-medium">{attraction.price}</span>
                          <Button size="sm">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAttractions.map((attraction: Attraction) => (
                  <AnimatedSection key={attraction.id} animation="slideLeft" delay={0.1 * attraction.id}>
                    <Card className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto overflow-hidden relative group">
                          <img 
                            src={attraction.image} 
                            alt={attraction.name} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              // Get fallback based on attraction type or use default
                              const fallbackType = attraction.type.toLowerCase();
                              let fallbackImage = "https://images.unsplash.com/photo-1605649461784-edc761aec3a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                              
                              if (fallbackType.includes("temple")) {
                                fallbackImage = "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                              } else if (fallbackType.includes("park") || fallbackType.includes("garden")) {
                                fallbackImage = "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                              } else if (fallbackType.includes("museum")) {
                                fallbackImage = "https://images.unsplash.com/photo-1566054757965-8c4085344c96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                              } else if (fallbackType.includes("zoo")) {
                                fallbackImage = "https://images.unsplash.com/photo-1574068468668-a05a11f871da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                              }
                              
                              e.currentTarget.src = fallbackImage;
                              console.log("Image failed to load:", attraction.name);
                            }}
                          />
                          {/* Overlay for better text readability on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex flex-wrap items-start justify-between mb-2">
                            <div>
                              <Badge className="mb-2 bg-blue-100 text-blue-800 border-0">
                                {attraction.type}
                              </Badge>
                              <h3 className="font-bold text-xl">{attraction.name}</h3>
                            </div>
                            <div className="flex items-center">
                              <div className="flex items-center text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1 text-sm font-medium">{attraction.rating}</span>
                              </div>
                              <span className="mx-2 text-xs text-slate-400">•</span>
                              <span className="text-sm text-slate-500">{attraction.reviews} reviews</span>
                            </div>
                          </div>
                          
                          <p className="text-slate-600 mb-4">{attraction.description}</p>
                          
                          <div className="flex flex-wrap gap-y-2 mb-4">
                            <div className="flex items-center text-sm text-slate-500 mr-6">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {attraction.address}
                            </div>
                            <div className="flex items-center text-sm text-slate-500 mr-6">
                              <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {attraction.openHours}
                            </div>
                            <div className="flex items-center text-sm font-medium">
                              <CreditCard className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {attraction.price}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {attraction.tags.map((tag: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-slate-50">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button>View Details</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="mx-auto">
                View All Attractions
              </Button>
            </div>
          </div>
          
          {/* Upcoming Events Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Upcoming Events</h2>
                <p className="text-slate-500">Don't miss these exciting events</p>
              </div>
              <Button variant="outline">
                View Calendar
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load events. Please try again later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tourismData?.events.map((event: Event) => (
                  <AnimatedSection key={event.id} animation="fadeIn" delay={0.1 * event.id}>
                    <Card className="bg-white overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative group">
                        <img 
                          src={event.image} 
                          alt={event.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            // Event-specific fallback based on category
                            const category = event.category.toLowerCase();
                            let fallbackImage = "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            
                            if (category.includes("cultural") || category.includes("heritage")) {
                              fallbackImage = "https://images.unsplash.com/photo-1604922824961-87cefb9dc1ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (category.includes("music") || category.includes("dance")) {
                              fallbackImage = "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (category.includes("food")) {
                              fallbackImage = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            }
                            
                            e.currentTarget.src = fallbackImage;
                            console.log("Image failed to load:", event.name);
                          }}
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className={`
                            ${event.category === 'Music' ? 'bg-purple-100 text-purple-800' : 
                              event.category === 'Food' ? 'bg-green-100 text-green-800' : 
                              event.category === 'Heritage' ? 'bg-amber-100 text-amber-800' :
                              event.category === 'Cultural' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'} border-0
                          `}>
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4 flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-2">{event.name}</h3>
                        <div className="flex items-center text-sm text-slate-500 mb-2">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-slate-500 mb-3">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          {event.location}
                        </div>
                        <p className="text-sm text-slate-500 mb-4 flex-grow">{event.description}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="font-medium">{event.price}</span>
                          <Button size="sm">Get Tickets</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
          
          {/* Popular Tours Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Popular Tours</h2>
                <p className="text-slate-500">Explore Bhubaneswar with expert guides</p>
              </div>
              <Button variant="outline">
                View All Tours
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load tours. Please try again later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tourismData?.tours.map((tour: Tour) => (
                  <AnimatedSection key={tour.id} animation="fadeIn" delay={0.1 * tour.id}>
                    <Card className="bg-white overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative group">
                        <img 
                          src={tour.image} 
                          alt={tour.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            // Tour-specific fallback
                            let fallbackImage = "https://images.unsplash.com/photo-1564689510742-4e9c7584181d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            
                            if (tour.name.toLowerCase().includes("temple") || tour.name.toLowerCase().includes("heritage")) {
                              fallbackImage = "https://images.unsplash.com/photo-1518564774896-d3f42e8e9623?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (tour.name.toLowerCase().includes("city") || tour.name.toLowerCase().includes("walking")) {
                              fallbackImage = "https://images.unsplash.com/photo-1598977054440-c4ce0e849765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (tour.name.toLowerCase().includes("nature") || tour.name.toLowerCase().includes("wildlife")) {
                              fallbackImage = "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            }
                            
                            e.currentTarget.src = fallbackImage;
                            console.log("Image failed to load:", tour.name);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold text-lg mb-2">{tour.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm font-medium">{tour.rating}</span>
                          </div>
                          <span className="mx-2 text-xs text-slate-400">•</span>
                          <span className="text-sm text-slate-500">{tour.reviews} reviews</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-500 mb-2">
                          <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          {tour.duration}
                        </div>
                        <p className="text-sm text-slate-500 mb-4 line-clamp-3">{tour.description}</p>
                        
                        <div className="mb-3 flex-grow">
                          <p className="text-xs font-medium text-slate-600 mb-1">Includes:</p>
                          <ul className="text-xs text-slate-500">
                            {tour.includes.map((item: string, i: number) => (
                              <li key={i} className="flex items-start mb-1">
                                <div className="h-3.5 w-3.5 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-2 mt-0.5">
                                  <div className="h-1.5 w-1.5 rounded-full bg-green-800"></div>
                                </div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <span className="font-medium">{tour.price}</span>
                          <Button size="sm">Book Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
          
          {/* Featured Hotels Section */}
          <div className="mb-10">
            <div className="rounded-lg mb-6 overflow-hidden relative">
              <img 
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/05/9e/60/facade.jpg?w=1400&h=-1&s=1" 
                alt="Luxury Hotel in Bhubaneswar" 
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
                <div className="p-6 text-white w-full">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Hotels</h2>
                  <p className="text-gray-200 max-w-2xl">Comfortable and luxurious accommodations for your stay in Bhubaneswar</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Top-Rated Properties</h3>
                <p className="text-slate-500">Handpicked luxury and comfort</p>
              </div>
              <Button variant="outline">
                View All Hotels
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load hotels. Please try again later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tourismData?.hotels.map((hotel: Hotel) => (
                  <AnimatedSection key={hotel.id} animation="fadeIn" delay={0.1 * hotel.id}>
                    <Card className="bg-white overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative group">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            // Hotel-specific fallback based on category
                            const category = hotel.category.toLowerCase();
                            let fallbackImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            
                            if (category.includes("luxury") || category.includes("5-star")) {
                              fallbackImage = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (category.includes("budget") || category.includes("economy")) {
                              fallbackImage = "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (category.includes("boutique")) {
                              fallbackImage = "https://images.unsplash.com/photo-1551525212-a1dc18871d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            }
                            
                            e.currentTarget.src = fallbackImage;
                            console.log("Image failed to load:", hotel.name);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <Badge className="mb-2 bg-indigo-100 text-indigo-800 border-0 self-start">
                          {hotel.category}
                        </Badge>
                        <h3 className="font-bold text-lg mb-2">{hotel.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                          </div>
                          <span className="mx-2 text-xs text-slate-400">•</span>
                          <span className="text-sm text-slate-500">{hotel.reviews} reviews</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-500 mb-2">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          <span className="line-clamp-1">{hotel.address}</span>
                        </div>
                        
                        <div className="mb-3 mt-2 flex-grow">
                          <div className="flex flex-wrap gap-1">
                            {hotel.amenities.slice(0, 4).map((amenity: string, i: number) => (
                              <Badge key={i} variant="outline" className="bg-slate-50 text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {hotel.amenities.length > 4 && (
                              <Badge variant="outline" className="bg-slate-50 text-xs">
                                +{hotel.amenities.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <span className="font-medium text-sm">{hotel.priceRange}</span>
                          <Button size="sm">View Hotel</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
          
          {/* Top Restaurants Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Top Restaurants</h2>
                <p className="text-slate-500">Taste the authentic flavors of Odisha</p>
              </div>
              <Button variant="outline">
                View All Restaurants
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load restaurants. Please try again later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tourismData?.restaurants.map((restaurant: Restaurant) => (
                  <AnimatedSection key={restaurant.id} animation="fadeIn" delay={0.1 * restaurant.id}>
                    <Card className="bg-white overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative group">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            // Restaurant-specific fallback based on cuisine
                            const cuisine = restaurant.cuisine.toLowerCase();
                            let fallbackImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            
                            if (cuisine.includes("odia") || cuisine.includes("odisha")) {
                              fallbackImage = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (cuisine.includes("indian")) {
                              fallbackImage = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            } else if (cuisine.includes("vegetarian")) {
                              fallbackImage = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            }
                            
                            e.currentTarget.src = fallbackImage;
                            console.log("Image failed to load:", restaurant.name);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <Badge className="mb-2 bg-green-100 text-green-800 border-0 self-start">
                          {restaurant.cuisine}
                        </Badge>
                        <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                          </div>
                          <span className="mx-2 text-xs text-slate-400">•</span>
                          <span className="text-sm text-slate-500">{restaurant.reviews} reviews</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-500 mb-3">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          <span className="line-clamp-1">{restaurant.address || "Not available"}</span>
                        </div>
                        
                        <div className="mb-3 flex-grow">
                          <p className="text-xs font-medium text-slate-600 mb-1">Specialties:</p>
                          <p className="text-xs text-slate-500">
                            {restaurant.specialties.join(", ")}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <span className="font-medium">{restaurant.priceRange}</span>
                          <Button size="sm">View Menu</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
          
          {/* Cultural Experience Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Cultural Experiences in Bhubaneswar</h2>
                <p className="text-slate-500">Immerse yourself in Odisha's rich cultural heritage</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedSection animation="slideLeft">
                <Card className="overflow-hidden h-full">
                  <div className="md:flex">
                    <div className="md:w-2/5 h-52 md:h-auto relative">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/0/02/Odissi_Performance_DS.jpg" 
                        alt="Odissi Dance Form" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1535359056830-d4badde79747?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          console.log("Image failed to load: Odissi Dance Form");
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-2 bg-purple-100 text-purple-800 border-0">Traditional Art</Badge>
                      <h3 className="text-xl font-bold mb-2">Odissi Dance</h3>
                      <p className="text-slate-600 mb-4">
                        Experience the mesmerizing classical dance form of Odisha with its graceful movements, intricate footwork, and expressive storytelling. Regular performances are held at Rabindra Mandap and GKCM Odissi Research Centre.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Classical Dance</Badge>
                        <Badge variant="outline">Cultural Heritage</Badge>
                        <Badge variant="outline">Live Performance</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="slideRight">
                <Card className="overflow-hidden h-full">
                  <div className="md:flex">
                    <div className="md:w-2/5 h-52 md:h-auto relative">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/6/65/Pattachitra_Painting_Raghurajpur_Odisha.jpg" 
                        alt="Pattachitra - Traditional Painting" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          console.log("Image failed to load: Pattachitra");
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-2 bg-amber-100 text-amber-800 border-0">Handicraft</Badge>
                      <h3 className="text-xl font-bold mb-2">Pattachitra Painting</h3>
                      <p className="text-slate-600 mb-4">
                        Discover the ancient art of Pattachitra, a traditional cloth-based scroll painting with intricate details and vibrant colors. Visit Raghurajpur Crafts Village near Bhubaneswar to see artisans at work and take workshops.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Traditional Art</Badge>
                        <Badge variant="outline">Workshops</Badge>
                        <Badge variant="outline">Souvenirs</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="slideLeft">
                <Card className="overflow-hidden h-full">
                  <div className="md:flex">
                    <div className="md:w-2/5 h-52 md:h-auto relative">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Applique_work_Pipili_Odisha.jpg" 
                        alt="Pipili Applique Work" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1582738411657-3d6b7a0ca1ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          console.log("Image failed to load: Pipili Applique");
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-2 bg-blue-100 text-blue-800 border-0">Craft Village</Badge>
                      <h3 className="text-xl font-bold mb-2">Pipili Applique Craft</h3>
                      <p className="text-slate-600 mb-4">
                        Visit the famous Pipili village (20 km from Bhubaneswar) known for its vibrant applique handicrafts, featuring patchwork with mirrors and colorful patterns. Shop for decorative items, lampshades, and the iconic 'Chandua' umbrellas.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Textile Art</Badge>
                        <Badge variant="outline">Shopping</Badge>
                        <Badge variant="outline">Day Trip</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
              
              <AnimatedSection animation="slideRight">
                <Card className="overflow-hidden h-full">
                  <div className="md:flex">
                    <div className="md:w-2/5 h-52 md:h-auto relative">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d4/A_cook_preparing_%22Dahibara_Aludam%22_in_Odisha.jpg" 
                        alt="Odia Cuisine" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          console.log("Image failed to load: Odia Cuisine");
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-2 bg-green-100 text-green-800 border-0">Food Experience</Badge>
                      <h3 className="text-xl font-bold mb-2">Odia Cuisine Journey</h3>
                      <p className="text-slate-600 mb-4">
                        Embark on a culinary adventure to taste authentic Odia dishes like Dalma, Pakhala (fermented rice), Chhena Poda (cheese dessert), and Dahi Bara-Aloo Dam. Join a food tour or cooking class to learn about traditional techniques and spice blends.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Food Tour</Badge>
                        <Badge variant="outline">Cooking Class</Badge>
                        <Badge variant="outline">Traditional Cuisine</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
          
          {/* Travel Tips Section */}
          <div className="mb-10">
            <div className="mb-6 relative">
              <div className="absolute right-0 top-0 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg -mt-2 -mr-2 hidden md:block">
                <img 
                  src="https://odishatourism.gov.in/sites/default/files/2020-02/Cultural%20Trail.jpg" 
                  alt="Odisha Culture" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Cultural circle fallback 
                    e.currentTarget.src = "https://images.unsplash.com/photo-1601877977232-40f26b05c281?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    console.log("Image failed to load: Cultural Trail");
                  }}
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Travel Tips for Bhubaneswar</h2>
              <p className="text-slate-500">Useful information for your visit</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3 mb-2">
                <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="mb-4 md:mb-0 md:mr-6 w-full md:w-1/3 lg:w-1/4">
                        <img 
                          src="https://www.gotoorissa.com/wp-content/uploads/2016/12/Odissi-Gotoorissa-1.jpg" 
                          alt="Odissi Dance Form" 
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                          onError={(e) => {
                            // Cultural-specific fallback
                            e.currentTarget.src = "https://images.unsplash.com/photo-1552687453-1a1dec6ddc41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            console.log("Image failed to load: Odissi Dance Form");
                          }}
                        />
                      </div>
                      <div className="md:flex-1">
                        <h3 className="text-xl font-bold text-amber-800 mb-2">Odisha's Rich Cultural Heritage</h3>
                        <p className="text-amber-900">
                          Bhubaneswar is not just about temples and monuments - it's the cultural heart of Odisha. During your visit, try to experience an Odissi dance performance, one of the oldest surviving dance forms of India. Visit the Tribal Museum to learn about the 62 different tribal communities living in Odisha. Don't miss trying the local handicrafts - the intricate silver filigree work (Tarakasi), Pattachitra paintings, and handwoven textiles make for wonderful souvenirs.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {travelTips.map((tip) => (
                <AnimatedSection key={tip.id} animation="fadeIn" delay={0.1 * tip.id}>
                  <Card className="bg-white hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                          <Info className="h-4 w-4" />
                        </div>
                        <h3 className="font-bold text-lg">{tip.title}</h3>
                      </div>
                      <p className="text-slate-600">{tip.content}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
          
          {/* Tourist Facilities Section */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Tourist Facilities</h2>
                <p className="text-slate-500">Essential services for visitors</p>
              </div>
              <div className="mt-4 md:mt-0">
                <img 
                  src="https://www.odishatourism.gov.in/sites/default/files/2020-09/Tourist%20Facility%20Centre.jpg" 
                  alt="Tourist Facility Center" 
                  className="h-16 rounded shadow"
                  onError={(e) => {
                    // Facility center fallback
                    e.currentTarget.src = "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    console.log("Image failed to load: Tourist Facility Centre");
                  }}
                />
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load facilities. Please try again later.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="mb-4 md:mb-0 md:mr-6">
                      <img 
                        src="https://odishatourism.gov.in/sites/default/files/2020-02/Helpline%20Number%20Banner.png" 
                        alt="Odisha Tourism Helpline" 
                        className="h-24 rounded-lg"
                        onError={(e) => {
                          // Helpline banner fallback
                          e.currentTarget.src = "https://images.unsplash.com/photo-1581509551069-8d45e98d478b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          console.log("Image failed to load: Helpline Number Banner");
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-800 mb-2">24x7 Tourist Helpline</h3>
                      <p className="text-blue-700">
                        Odisha Tourism offers round-the-clock assistance to tourists through the dedicated helpline number: <span className="font-bold">1800 208 1234</span>. 
                        The service provides guidance, emergency support, and information in multiple languages.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tourismData?.facilities.map((facility: Facility) => (
                    <AnimatedSection key={facility.id} animation="slideLeft" delay={0.1 * facility.id}>
                      <Card className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-36 md:h-auto overflow-hidden relative group">
                            <img 
                              src={facility.image} 
                              alt={facility.name} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                // Facility-specific fallback based on type
                                const type = facility.type.toLowerCase();
                                let fallbackImage = "https://images.unsplash.com/photo-1568849676085-51415703900f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                                
                                if (type.includes("transport") || type.includes("bus") || type.includes("railway") || type.includes("airport")) {
                                  fallbackImage = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                                } else if (type.includes("information") || type.includes("center")) {
                                  fallbackImage = "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                                } else if (type.includes("market") || type.includes("shopping")) {
                                  fallbackImage = "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                                }
                                
                                e.currentTarget.src = fallbackImage;
                                console.log("Image failed to load:", facility.name);
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="p-4 md:w-2/3">
                            <Badge className="mb-2 bg-slate-100 text-slate-800 border-0">
                              {facility.type}
                            </Badge>
                            <h3 className="font-bold text-lg mb-2">{facility.name}</h3>
                            <div className="flex items-center text-sm text-slate-500 mb-2">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {facility.address}
                            </div>
                            <p className="text-sm text-slate-500 mb-3 line-clamp-2">{facility.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {facility.amenities.slice(0, 3).map((amenity, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {facility.amenities.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{facility.amenities.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </AnimatedSection>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Newsletter Section */}
          <div className="mb-10">
            <Card className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-6">
                    <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                    <p className="text-blue-100">Subscribe to our newsletter for the latest events and attractions in Bhubaneswar.</p>
                  </div>
                  <div className="w-full md:w-auto flex flex-col sm:flex-row">
                    <Input 
                      placeholder="Your email address" 
                      className="bg-white border-0 text-slate-800 mb-2 sm:mb-0 sm:mr-2"
                    />
                    <Button className="bg-white text-blue-600 hover:bg-blue-50">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}