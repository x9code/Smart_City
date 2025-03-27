import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  ChevronDown
} from "lucide-react";

// Sample data for top attractions
const topAttractions = [
  {
    id: 1,
    name: "City Art Museum",
    type: "Museum",
    rating: 4.8,
    reviews: 1245,
    image: "https://images.unsplash.com/photo-1605375389155-926d230a0254?q=80&w=2500&auto=format&fit=crop",
    address: "123 Museum Avenue, Downtown",
    description: "The city's premier art museum featuring permanent and rotating exhibitions from around the world.",
    openHours: "10:00 AM - 6:00 PM",
    price: "$15",
    tags: ["Arts", "Family-Friendly", "Indoor"]
  },
  {
    id: 2,
    name: "Riverside Gardens",
    type: "Park",
    rating: 4.7,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2500&auto=format&fit=crop",
    address: "500 River Road, Northside",
    description: "Beautiful gardens and walking paths along the scenic river with picnic areas and boat rentals.",
    openHours: "8:00 AM - Sunset",
    price: "Free",
    tags: ["Nature", "Family-Friendly", "Outdoor"]
  },
  {
    id: 3,
    name: "Historical District",
    type: "Landmark",
    rating: 4.6,
    reviews: 1879,
    image: "https://images.unsplash.com/photo-1474874055390-459bc92357f3?q=80&w=2500&auto=format&fit=crop",
    address: "Old City Center",
    description: "Preserved historical district with architecture dating back to the 19th century, featuring boutique shops and cafes.",
    openHours: "Always Open",
    price: "Free",
    tags: ["History", "Shopping", "Architecture"]
  },
  {
    id: 4,
    name: "Science Center",
    type: "Museum",
    rating: 4.5,
    reviews: 1532,
    image: "https://images.unsplash.com/photo-1591982738324-dd4a4c1a4e68?q=80&w=2500&auto=format&fit=crop",
    address: "789 Innovation Drive, Westside",
    description: "Interactive science exhibits, planetarium, and educational programs for all ages.",
    openHours: "9:00 AM - 5:00 PM",
    price: "$18",
    tags: ["Science", "Family-Friendly", "Educational"]
  }
];

// Sample data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    name: "Summer Music Festival",
    date: "July 15-17, 2023",
    location: "City Park Amphitheater",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2500&auto=format&fit=crop",
    category: "Music",
    price: "$45-$120"
  },
  {
    id: 2,
    name: "Food & Wine Expo",
    date: "August 5-7, 2023",
    location: "Convention Center",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2500&auto=format&fit=crop",
    category: "Food",
    price: "$25"
  },
  {
    id: 3,
    name: "International Film Festival",
    date: "September 10-15, 2023",
    location: "Various Theaters",
    image: "https://images.unsplash.com/photo-1512070679279-8988d32161be?q=80&w=2500&auto=format&fit=crop",
    category: "Arts",
    price: "$12 per screening"
  }
];

// Sample data for tours
const popularTours = [
  {
    id: 1,
    name: "City Highlights Walking Tour",
    duration: "2.5 hours",
    rating: 4.9,
    reviews: 387,
    price: "$25",
    description: "Explore the city's most famous landmarks and hidden gems with a knowledgeable local guide.",
    image: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=2500&auto=format&fit=crop",
    includes: ["Professional guide", "Small group (max 10)", "Historical insights"],
    startTimes: ["9:00 AM", "1:00 PM", "4:00 PM"]
  },
  {
    id: 2,
    name: "Culinary Delights Food Tour",
    duration: "3 hours",
    rating: 4.8,
    reviews: 256,
    price: "$65",
    description: "Sample the city's best cuisine with stops at 5 beloved local eateries and specialty food shops.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2500&auto=format&fit=crop",
    includes: ["Food tastings", "Drink samplings", "Food guide", "Recipe cards"],
    startTimes: ["11:00 AM", "5:00 PM"]
  },
  {
    id: 3,
    name: "Sunset Harbor Cruise",
    duration: "1.5 hours",
    rating: 4.7,
    reviews: 312,
    price: "$45",
    description: "Cruise along the harbor as the sun sets, offering spectacular views of the city skyline.",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2500&auto=format&fit=crop",
    includes: ["Narrated tour", "Complimentary drink", "Sunset views", "Photo opportunities"],
    startTimes: ["6:30 PM (varies by season)"]
  }
];

// Sample data for hotels
const featuredHotels = [
  {
    id: 1,
    name: "Grand City Hotel",
    rating: 4.8,
    reviews: 1245,
    price: "$200",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2500&auto=format&fit=crop",
    location: "Downtown",
    amenities: ["Pool", "Spa", "Restaurant", "Fitness Center", "Free Wi-Fi"]
  },
  {
    id: 2,
    name: "Riverside Inn",
    rating: 4.6,
    reviews: 876,
    price: "$150",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2500&auto=format&fit=crop",
    location: "Riverside",
    amenities: ["River View", "Restaurant", "Free Breakfast", "Free Wi-Fi"]
  },
  {
    id: 3,
    name: "Boutique Heritage Hotel",
    rating: 4.7,
    reviews: 654,
    price: "$180",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2500&auto=format&fit=crop",
    location: "Historical District",
    amenities: ["Historic Building", "Luxury Rooms", "Restaurant", "Bar", "Free Wi-Fi"]
  }
];

// Sample data for restaurants
const topRestaurants = [
  {
    id: 1,
    name: "Riverview Bistro",
    cuisine: "French",
    rating: 4.9,
    reviews: 876,
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2500&auto=format&fit=crop",
    specialties: ["Coq au Vin", "Beef Bourguignon", "Crème Brûlée"]
  },
  {
    id: 2,
    name: "Sakura Japanese",
    cuisine: "Japanese",
    rating: 4.7,
    reviews: 654,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1569562211093-5d0d21e171a1?q=80&w=2500&auto=format&fit=crop",
    specialties: ["Sushi Platters", "Ramen", "Teriyaki"]
  },
  {
    id: 3,
    name: "Trattoria Italiana",
    cuisine: "Italian",
    rating: 4.8,
    reviews: 723,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2500&auto=format&fit=crop",
    specialties: ["Wood-fired Pizza", "Homemade Pasta", "Tiramisu"]
  }
];

// Sample travel tips
const travelTips = [
  {
    id: 1,
    title: "Best Time to Visit",
    content: "Spring (April-May) and Fall (September-October) offer pleasant weather and fewer crowds. Summer is peak tourist season with warmer temperatures."
  },
  {
    id: 2,
    title: "Public Transportation",
    content: "The city's metro system is efficient and connects all major attractions. Purchase a visitor pass for unlimited rides during your stay."
  },
  {
    id: 3,
    title: "Local Customs",
    content: "Tipping 15-20% is customary in restaurants. Always greet shop owners when entering small businesses."
  },
  {
    id: 4,
    title: "Safety Tips",
    content: "The city is generally safe, but keep valuables secure especially in crowded tourist areas. Emergency services can be reached at 911."
  }
];

export default function TourismPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [attractionView, setAttractionView] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
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
          <div className="rounded-lg mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
            <div className="p-8 md:p-12 relative">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Beautiful City</h1>
                <p className="text-lg md:text-xl mb-6 text-blue-100">Experience world-class attractions, delicious cuisine, and unforgettable adventures.</p>
                
                <form onSubmit={handleSearch} className="flex items-center max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input 
                      placeholder="Search attractions, events, restaurants..." 
                      className="pl-10 bg-white text-slate-800 border-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="ml-2 bg-indigo-800 hover:bg-indigo-900">
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-800">Attractions</h3>
                <p className="text-sm text-slate-500 mt-1">Discover top sights</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                  <Ticket className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-800">Events</h3>
                <p className="text-sm text-slate-500 mt-1">Upcoming festivals</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                  <Utensils className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-800">Dining</h3>
                <p className="text-sm text-slate-500 mt-1">Local cuisine</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
                  <Hotel className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-slate-800">Accommodation</h3>
                <p className="text-sm text-slate-500 mt-1">Places to stay</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Top Attractions Section */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Top Attractions</h2>
                <p className="text-slate-500">Must-visit places in our city</p>
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
            
            {attractionView === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topAttractions.map((attraction) => (
                  <Card key={attraction.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={attraction.image} 
                        alt={attraction.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-blue-100 text-blue-800 border-0">
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
                      <div className="flex items-center text-sm text-slate-500 mb-3">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        {attraction.address}
                      </div>
                      <div className="flex items-center text-sm text-slate-500 mb-3">
                        <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        {attraction.openHours}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{attraction.price}</span>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {topAttractions.map((attraction) => (
                  <Card key={attraction.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                        <img 
                          src={attraction.image} 
                          alt={attraction.name} 
                          className="w-full h-full object-cover"
                        />
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
                            {attraction.tags.map((tag, index) => (
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={event.image} 
                      alt={event.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={`
                        ${event.category === 'Music' ? 'bg-purple-100 text-purple-800' : 
                          event.category === 'Food' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'} border-0
                      `}>
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{event.name}</h3>
                    <div className="flex items-center text-sm text-slate-500 mb-2">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      {event.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{event.price}</span>
                      <Button size="sm">Get Tickets</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Popular Tours Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Popular Tours</h2>
                <p className="text-slate-500">Guided experiences for all interests</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {popularTours.map((tour) => (
                <Card key={tour.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={tour.image} 
                      alt={tour.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{tour.name}</h3>
                      <Badge className="bg-teal-100 text-teal-800 border-0 whitespace-nowrap">
                        {tour.price}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{tour.rating}</span>
                      </div>
                      <span className="mx-2 text-xs text-slate-400">•</span>
                      <span className="text-sm text-slate-500">{tour.reviews} reviews</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      {tour.duration}
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-3">{tour.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tour.includes.map((item, i) => (
                        <Badge key={i} variant="outline" className="bg-slate-50 text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="text-xs text-slate-500">
                        <span className="font-medium">Available:</span> {tour.startTimes.join(", ")}
                      </div>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Where to Stay Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Where to Stay</h2>
                <p className="text-slate-500">Recommended accommodations</p>
              </div>
              <Button variant="outline">
                View All Hotels
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredHotels.map((hotel) => (
                <Card key={hotel.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{hotel.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                      </div>
                      <span className="mx-2 text-xs text-slate-400">•</span>
                      <span className="text-sm text-slate-500">{hotel.reviews} reviews</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      {hotel.location}
                    </div>
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {hotel.amenities.slice(0, 3).map((amenity, i) => (
                          <Badge key={i} variant="outline" className="bg-slate-50 text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <Badge variant="outline" className="bg-slate-50 text-xs">
                            +{hotel.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{hotel.price} / night</span>
                      <Button size="sm">View Rooms</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Best Restaurants Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Best Restaurants</h2>
                <p className="text-slate-500">Local dining experiences</p>
              </div>
              <Button variant="outline">
                View All Restaurants
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topRestaurants.map((restaurant) => (
                <Card key={restaurant.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{restaurant.name}</h3>
                      <Badge className="bg-orange-100 text-orange-800 border-0">
                        {restaurant.priceRange}
                      </Badge>
                    </div>
                    <div className="flex items-center mb-2">
                      <Badge className="bg-slate-100 text-slate-800 border-0 mr-2">
                        {restaurant.cuisine}
                      </Badge>
                      <div className="flex items-center text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      <span className="font-medium">Specialties:</span> {restaurant.specialties.join(", ")}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">{restaurant.reviews} reviews</span>
                      <Button size="sm">Reserve Table</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Transportation Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Getting Around</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <Plane className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">By Air</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Our international airport is located 15 miles from downtown with direct connections to major cities worldwide.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Airport Information
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                    <Train className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">By Train</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    The central train station provides regional and national connections with departures every hour.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Train Schedules
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                    <Bus className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Public Transit</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Our extensive network of buses and metro lines makes it easy to navigate the city.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Transit Maps
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
                    <Car className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">By Car</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Major highways connect to the city, and various rental car services are available at transportation hubs.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Rental Options
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Travel Tips Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Travel Tips</h2>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {travelTips.map((tip) => (
                    <div key={tip.id} className="flex">
                      <div className="mr-4 mt-1">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                          <Info className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 mb-2">{tip.title}</h3>
                        <p className="text-sm text-slate-600">{tip.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-slate-200 mt-6 pt-6">
                  <h3 className="font-bold text-slate-800 mb-4">Need More Information?</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="sm:flex-1">
                      Download Visitor Guide
                    </Button>
                    <Button variant="outline" className="sm:flex-1">
                      Visit Tourist Information Center
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Newsletter Section */}
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white mb-10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-6 md:mb-0 md:mr-10">
                  <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
                  <p className="text-indigo-100">Subscribe to our newsletter for exclusive travel deals and city updates.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 md:w-1/2">
                  <Input placeholder="Your email address" className="bg-white/90 text-slate-800 border-0" />
                  <Button className="bg-white text-indigo-600 hover:bg-white/90">
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Footer */}
          <footer className="text-center text-sm text-slate-500 mb-6">
            <p>© 2023 City Tourism Board. All rights reserved.</p>
            <p className="mt-2">Photos courtesy of Unsplash. Information subject to change.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}