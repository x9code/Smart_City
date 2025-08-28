import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Activity, 
  Clock, 
  Calendar, 
  Phone, 
  MapPin, 
  Search,
  Info,
  PlusCircle,
  ArrowRight,
  Star,
  Users,
  Stethoscope,
  User,
  Pill,
  Thermometer,
  FileText,
  CheckCircle,
  LocateFixed
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Healthcare facilities in Bhubaneswar
const healthcareFacilities = [
  {
    id: 1,
    name: "AIIMS Bhubaneswar",
    type: "Super Specialty Hospital",
    rating: 4.8,
    reviews: 412,
    address: "Sijua, Patrapada, Bhubaneswar, Odisha 751019",
    distance: "12.5 km",
    waitTime: "35 min",
    openingHours: "24/7",
    phone: "0674-2476789",
    services: ["Emergency", "Surgery", "Neurology", "Cardiology", "Oncology", "Orthopedics"],
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Apollo Hospitals",
    type: "Multi-Specialty Hospital",
    rating: 4.7,
    reviews: 326,
    address: "Plot No. 251, Old Sainik School Rd, Unit-15, Bhubaneswar",
    distance: "5.2 km",
    waitTime: "25 min",
    openingHours: "24/7",
    phone: "0674-6661066",
    services: ["Emergency", "Cardiology", "Oncology", "Orthopedics", "Neurology", "Pulmonology"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Capital Hospital",
    type: "Government Hospital",
    rating: 4.3,
    reviews: 215,
    address: "Unit-6, Bhubaneswar, Odisha 751001",
    distance: "3.7 km",
    waitTime: "45 min",
    openingHours: "24/7",
    phone: "0674-2391983",
    services: ["Emergency", "General Medicine", "Surgery", "Obstetrics", "Pediatrics", "Orthopedics"],
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Kalinga Institute of Medical Sciences (KIMS)",
    type: "Medical College & Hospital",
    rating: 4.6,
    reviews: 278,
    address: "KIIT Road, Patia, Bhubaneswar, Odisha 751024",
    distance: "8.3 km",
    waitTime: "30 min",
    openingHours: "24/7",
    phone: "0674-2725466",
    services: ["Emergency", "Cardiology", "Neurology", "Gastroenterology", "Nephrology", "Urology"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "SUM Ultimate Medicare",
    type: "Super Specialty Hospital",
    rating: 4.5,
    reviews: 187,
    address: "Kalinga Nagar, Ghatikia, Bhubaneswar, Odisha 751003",
    distance: "7.1 km",
    waitTime: "20 min",
    openingHours: "24/7",
    phone: "0674-2970100",
    services: ["Emergency", "Cardiology", "Neuroscience", "Gastroenterology", "Orthopedics", "Oncology"],
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Kalinga Hospital",
    type: "Multi-Specialty Hospital",
    rating: 4.4,
    reviews: 163,
    address: "Chandrasekharpur, Bhubaneswar, Odisha 751023",
    distance: "6.5 km",
    waitTime: "30 min",
    openingHours: "24/7",
    phone: "0674-6665200",
    services: ["Emergency", "Cardiology", "Orthopedics", "Gastroenterology", "Nephrology", "Gynecology"],
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
];

// Bhubaneswar health programs
const healthPrograms = [
  {
    id: 1,
    title: "Bhubaneswar Pulse Polio Drive",
    description: "Free polio vaccinations for children under 5 years across Bhubaneswar, organized by the Municipal Corporation and Health Department.",
    date: "April 10-20, 2023",
    location: "All government hospitals and primary health centers in Bhubaneswar",
    icon: "local_hospital",
    color: "primary"
  },
  {
    id: 2,
    title: "Mental Health Awareness Program",
    description: "Workshops and counseling sessions at AIIMS Bhubaneswar and other hospitals to raise awareness about mental health issues and provide support.",
    date: "May 5-12, 2023",
    location: "AIIMS Bhubaneswar, KIMS, and Community Centers",
    icon: "psychology",
    color: "purple"
  },
  {
    id: 3,
    title: "Odisha Senior Citizen Health Initiative",
    description: "Free health checkups, fitness classes, and nutrition guidance for senior citizens of Bhubaneswar, organized by the Health Department.",
    date: "Year-round program",
    location: "Kalinga Hospital, Apollo Hospitals, and Home Visits",
    icon: "elderly",
    color: "teal"
  },
  {
    id: 4,
    title: "Janani Suraksha Yojana",
    description: "Comprehensive support for expectant mothers in Bhubaneswar including prenatal care, nutrition advice, and financial assistance for hospital delivery.",
    date: "Ongoing",
    location: "Capital Hospital, KIMS, and SUM Ultimate Medicare",
    icon: "pregnant_woman",
    color: "pink"
  },
  {
    id: 5,
    title: "Bhubaneswar Diabetes Prevention Program",
    description: "Free diabetes screening, counseling, and lifestyle management workshops for residents of Bhubaneswar to combat rising diabetes cases.",
    date: "July 1-30, 2023",
    location: "Apollo Hospitals, AIIMS Bhubaneswar, and Community Health Centers",
    icon: "local_hospital",
    color: "amber"
  }
];

// Bhubaneswar emergency services
const emergencyServices = [
  {
    id: 1,
    name: "Ambulance Services",
    phone: "108",
    response: "10-15 minutes",
    available: true
  },
  {
    id: 2,
    name: "Fire Department Medical Unit",
    phone: "101",
    response: "12-18 minutes",
    available: true
  },
  {
    id: 3,
    name: "Apollo Emergency Services",
    phone: "0674-6661066",
    response: "8-12 minutes",
    available: true
  },
  {
    id: 4,
    name: "AIIMS Bhubaneswar Emergency",
    phone: "0674-2476789",
    response: "15-20 minutes",
    available: true
  },
  {
    id: 5,
    name: "KIMS Emergency Services",
    phone: "0674-2725466",
    response: "10-15 minutes",
    available: true
  },
  {
    id: 6,
    name: "Odisha Poison Information Center",
    phone: "0674-2390500",
    response: "Immediate phone consultation",
    available: true
  }
];

// Sample data for health stats
const healthStats = [
  { name: "Healthcare Coverage", value: "92%", change: "+3%", trend: "up" },
  { name: "Hospital Bed Occupancy", value: "76%", change: "-4%", trend: "down" },
  { name: "Average Response Time", value: "8 min", change: "-1.5 min", trend: "down" },
  { name: "Vaccination Rate", value: "87%", change: "+5%", trend: "up" }
];

// Recent Bhubaneswar health activities
const healthActivities = [
  {
    id: 1,
    type: "Emergency Response",
    location: "Saheed Nagar, Bhubaneswar",
    time: "20 minutes ago",
    status: "Resolved",
    details: "Medical emergency responded to by 108 Ambulance Service"
  },
  {
    id: 2,
    type: "Hospital Update",
    location: "AIIMS Bhubaneswar",
    time: "45 minutes ago",
    status: "Active",
    details: "Additional 25 ICU beds made available for COVID-19 patients"
  },
  {
    id: 3,
    type: "Health Advisory",
    location: "Bhubaneswar Municipal Area",
    time: "2 hours ago",
    status: "Active",
    details: "Heatwave warning issued for Bhubaneswar for next 48 hours, residents advised to stay hydrated"
  },
  {
    id: 4,
    type: "Vaccination Drive",
    location: "Capital Hospital, Unit-6",
    time: "1 hour ago",
    status: "Active",
    details: "Special COVID-19 vaccination camp for senior citizens"
  },
  {
    id: 5,
    type: "Blood Donation Camp",
    location: "KIIT University Campus",
    time: "3 hours ago",
    status: "Active",
    details: "Ongoing blood donation drive organized by Red Cross Society"
  }
];

const specialistList = [
  {
    id: 1,
    name: "Dr. Ashok Mohapatra",
    specialty: "Neurosurgeon",
    hospital: "AIIMS Bhubaneswar",
    availability: "Next available: Tomorrow, 3:15 PM",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Dr. Pratima Kumari",
    specialty: "Cardiologist",
    hospital: "Apollo Hospitals",
    availability: "Next available: Today, 5:30 PM",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Dr. Sanjeev Mishra",
    specialty: "Orthopedic Surgeon",
    hospital: "KIMS",
    availability: "Next available: Friday, 11:00 AM",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    name: "Dr. Nandita Ray",
    specialty: "Gynecologist",
    hospital: "SUM Ultimate Medicare",
    availability: "Next available: Tomorrow, 10:30 AM",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    name: "Dr. Rajiv Dash",
    specialty: "Pulmonologist",
    hospital: "Kalinga Hospital",
    availability: "Next available: Thursday, 2:00 PM",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

export default function HealthcarePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("facilities");
  const [searchQuery, setSearchQuery] = useState("");

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
        <Header onMobileMenuToggle={toggleMobileMenu} title="Bhubaneswar Healthcare Services" />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          {/* Hero Banner */}
          <div className="relative mb-6 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1516549655724-990a13792167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80" 
              alt="Bhubaneswar Healthcare Services" 
              className="w-full h-48 object-cover"
              onError={(e) => {
                // Healthcare hero image fallback with a more reliable source
                e.currentTarget.src = "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80";
                console.log("Healthcare hero image failed to load");
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-800/70 flex items-center">
              <div className="p-8 text-white max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Bhubaneswar Healthcare</h1>
                <p className="text-lg text-white/90 mb-6">
                  Find world-class healthcare facilities and services in Bhubaneswar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-blue-700 hover:bg-white hover:text-blue-800" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    
                    <a href="https://surl.li/fyofkt">
                    Emergency Hotline

                    </a>
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700" size="lg">
                
                    <Calendar className="mr-2 h-5 w-5" />
                    <a href="https://www.apollo247.com/doctors/doctors-in-bhubaneswar-dcity">
                    Book Appointment
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Health Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {healthStats.map((stat, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">{stat.name}</p>
                      <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index === 0 ? "bg-blue-100 text-blue-600" : 
                      index === 1 ? "bg-purple-100 text-purple-600" : 
                      index === 2 ? "bg-green-100 text-green-600" : 
                      "bg-amber-100 text-amber-600"
                    }`}>
                      {index === 0 ? <Users className="h-6 w-6" /> : 
                       index === 1 ? <Thermometer className="h-6 w-6" /> :
                       index === 2 ? <Clock className="h-6 w-6" /> :
                       <Pill className="h-6 w-6" />}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    {stat.trend === "up" ? (
                      <span className={stat.name === "Healthcare Coverage" || stat.name === "Vaccination Rate" ? "text-green-600" : "text-red-600"}>
                        {stat.change} <ArrowRight className="h-3 w-3 ml-1 rotate-45 inline" />
                      </span>
                    ) : (
                      <span className={stat.name === "Hospital Bed Occupancy" || stat.name === "Average Response Time" ? "text-green-600" : "text-red-600"}>
                        {stat.change} <ArrowRight className="h-3 w-3 ml-1 -rotate-45 inline" />
                      </span>
                    )}
                    <span className="text-slate-500 ml-2">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input 
                  placeholder="Search healthcare services, facilities, or programs..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <a href="https://www.google.com/maps/search/bhubaneswar+near+best+hospital+location/@20.2792163,85.800233,14z?entry=s&sa=X">

                  Near Me
                  </a>
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Open Now
                </Button>
                <Button className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs for Different Healthcare Sections */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex bg-white p-1 rounded-lg shadow mb-6">
              <TabsTrigger value="facilities" className="flex-1 py-3">
                <Stethoscope className="h-4 w-4 mr-2" />
                Facilities
              </TabsTrigger>
              <TabsTrigger value="specialists" className="flex-1 py-3">
                <User className="h-4 w-4 mr-2" />
                Specialists
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex-1 py-3">
                <Calendar className="h-4 w-4 mr-2" />
                Programs
              </TabsTrigger>
              <TabsTrigger value="emergency" className="flex-1 py-3">
                <Activity className="h-4 w-4 mr-2" />
                Emergency
              </TabsTrigger>
            </TabsList>
            
            {/* Healthcare Facilities */}
            <TabsContent value="facilities" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {healthcareFacilities.map((facility) => (
                  <Card key={facility.id} className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={facility.image} 
                        alt={facility.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        onError={(e) => {
                          // Specialized healthcare facility fallback
                          const type = facility.type.toLowerCase();
                          let fallbackImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          
                          if (type.includes("hospital")) {
                            fallbackImage = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          } else if (type.includes("clinic")) {
                            fallbackImage = "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          } else if (type.includes("pharmacy") || type.includes("medical store")) {
                            fallbackImage = "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          }
                          
                          e.currentTarget.src = fallbackImage;
                          console.log("Facility image failed to load:", facility.name);
                        }}
                      />
                    </div>
                    <CardContent className="p-5">
                      <Badge className="mb-2">{facility.type}</Badge>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{facility.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-amber-400 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} fill={i < Math.floor(facility.rating) ? "currentColor" : "none"} className="h-4 w-4" />
                          ))}
                        </div>
                        <span className="text-sm text-slate-500">{facility.rating} ({facility.reviews} reviews)</span>
                      </div>
                      <p className="text-sm text-slate-600 flex items-center mb-1">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        {facility.address}
                      </p>
                      <p className="text-sm text-slate-600 flex items-center mb-1">
                        <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        Wait time: {facility.waitTime}
                      </p>
                      <p className="text-sm text-slate-600 flex items-center mb-3">
                        <Phone className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        {facility.phone}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {facility.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {service}
                          </Badge>
                        ))}
                        {facility.services.length > 3 && (
                          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                            +{facility.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 bg-slate-50 border-t border-slate-100">
                      <Button className="w-full">
                        <a href="https://www.apollohospitals.com/bhubaneswar">
                        Book Appointment
                        </a>
                        </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Specialists */}
            <TabsContent value="specialists" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialistList.map((specialist) => (
                  <Card key={specialist.id} className="bg-white overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          <img 
                            src={specialist.image} 
                            alt={specialist.name} 
                            className="h-16 w-16 rounded-full object-cover"
                            onError={(e) => {
                              // Specialist-specific fallback based on specialty
                              const specialty = specialist.specialty.toLowerCase();
                              let fallbackImage = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
                              
                              if (specialty.includes("cardio")) {
                                fallbackImage = "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
                              } else if (specialty.includes("neuro")) {
                                fallbackImage = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
                              } else if (specialty.includes("ortho")) {
                                fallbackImage = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
                              } else if (specialty.includes("pediatric")) {
                                fallbackImage = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
                              }
                              
                              e.currentTarget.src = fallbackImage;
                              console.log("Specialist image failed to load:", specialist.name);
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{specialist.name}</h3>
                          <p className="text-sm text-blue-600 font-medium">{specialist.specialty}</p>
                          <p className="text-sm text-slate-500">{specialist.hospital}</p>
                          <div className="flex text-amber-400 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} fill={i < Math.floor(specialist.rating) ? "currentColor" : "none"} className="h-3 w-3" />
                            ))}
                            <span className="text-xs text-slate-500 ml-1">{specialist.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 bg-blue-50 text-blue-700 p-2 rounded-md text-sm flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        {specialist.availability}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <Button variant="outline">
                          <a href="https://aiimsbhubaneswar.nic.in/Department_Profilepg.aspx">
                          View Profile
                          </a>
                          </Button>
                        <Button><a href="https://www.practo.com/bhubaneswar">Book Now</a></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="bg-white overflow-hidden border-dashed border-2 border-slate-300">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                    <PlusCircle className="h-12 w-12 text-slate-400 mb-3" />
                    <h3 className="text-lg font-semibold text-slate-700">Find More Specialists</h3>
                    <p className="text-sm text-slate-500 mt-2 mb-4">
                      Search our database of medical professionals by specialty, location, or availability
                    </p>
                    <Button>Search Directory</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Health Programs */}
            <TabsContent value="programs" className="mt-0">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1631815588090-915d438549e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80" 
                  alt="Health Programs" 
                  className="w-full h-36 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80";
                    console.log("Health Programs banner image failed to load");
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-900/70 flex items-center">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Bhubaneswar Health Programs</h2>
                    <p className="text-white/90">
                      Free and subsidized health programs to improve public wellness in Bhubaneswar
                    </p>
                  </div>
                </div>
              </div>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthPrograms.map((program) => (
                  <Card key={program.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className={`p-6 flex items-center justify-center md:w-1/4 ${
                        program.color === "primary" ? "bg-blue-100" : 
                        program.color === "purple" ? "bg-purple-100" : 
                        program.color === "teal" ? "bg-teal-100" : 
                        "bg-pink-100"
                      }`}>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          program.color === "primary" ? "bg-blue-500 text-white" : 
                          program.color === "purple" ? "bg-purple-500 text-white" : 
                          program.color === "teal" ? "bg-teal-500 text-white" : 
                          "bg-pink-500 text-white"
                        }`}>
                          {program.color === "primary" ? <Pill className="h-8 w-8" /> : 
                           program.color === "purple" ? <Heart className="h-8 w-8" /> :
                           program.color === "teal" ? <Users className="h-8 w-8" /> :
                           <Activity className="h-8 w-8" />}
                        </div>
                      </div>
                      <div className="p-6 md:w-3/4">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{program.title}</h3>
                        <p className="text-sm text-slate-600 mb-4">{program.description}</p>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <p className="text-sm flex items-center mb-2">
                              <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                              <span className="text-slate-700">{program.date}</span>
                            </p>
                            <p className="text-sm flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                              <span className="text-slate-700">{program.location}</span>
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0">
                            <Button>
                              <a href="https://health.odisha.gov.in/program-schemes/immunisation-programme">
                              Register
                              </a>
                              </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Card className="bg-white overflow-hidden border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" 
                    alt="Community Health" 
                    className="w-48 h-36 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80";
                      console.log("Community Health image failed to load");
                    }}
                  />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Your Health Matters</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Explore all health programs and events available in your community
                  </p>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View All Programs
                  </Button>
                </Card>
              </div>
            </TabsContent>
            
            {/* Emergency Services */}
            <TabsContent value="emergency" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-white overflow-hidden mb-6">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1616012480717-0166d3a1811a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=200&q=80" 
                        alt="Emergency Services" 
                        className="w-full h-28 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=200&q=80";
                          console.log("Emergency Services image failed to load");
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-800/80 to-red-900/70">
                        <div className="h-full p-6 flex flex-col justify-center">
                          <div className="flex items-center">
                            <div className="p-2 bg-white/20 rounded-full mr-3">
                              <Activity className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h2 className="text-xl font-semibold text-white">Emergency Services</h2>
                              <p className="text-white/90 mt-1 text-sm">
                                Dial 108 for immediate emergency assistance in Bhubaneswar
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg. Response</th>
                              <th className="py-3 px-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {emergencyServices.map((service) => (
                              <tr key={service.id} className="hover:bg-slate-50">
                                <td className="py-4 px-4 text-sm text-slate-800 font-medium">{service.name}</td>
                                <td className="py-4 px-4 text-sm text-slate-600">{service.phone}</td>
                                <td className="py-4 px-4 text-sm text-slate-600">{service.response}</td>
                                <td className="py-4 px-4">
                                  <Badge className="bg-green-100 text-green-800">
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                    Available
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Recent Emergency Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {healthActivities.map((activity) => (
                          <div key={activity.id} className="p-4 bg-slate-50 rounded-lg">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-slate-800">{activity.type}</h4>
                              <Badge variant="outline" className={
                                activity.status === "Resolved" 
                                  ? "bg-green-100 text-green-700 border-green-200" 
                                  : "bg-amber-100 text-amber-700 border-amber-200"
                              }>
                                {activity.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 flex items-center mt-2">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {activity.location}
                            </p>
                            <p className="text-sm text-slate-600 flex items-center mt-1">
                              <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {activity.time}
                            </p>
                            <p className="text-sm text-slate-700 mt-2">{activity.details}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-white mb-6">
                    <CardHeader className="pb-0">
                      <CardTitle>Emergency Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-medium text-slate-800 flex items-center">
                            <Info className="h-4 w-4 mr-2 text-blue-500" />
                            When to Call 108
                          </h4>
                          <ul className="mt-2 text-sm text-slate-600 space-y-1">
                            <li>• Difficulty breathing or shortness of breath</li>
                            <li>• Chest or upper abdominal pain or pressure</li>
                            <li>• Fainting, sudden dizziness, weakness</li>
                            <li>• Changes in vision</li>
                            <li>• Confusion or changes in mental status</li>
                            <li>• Any sudden or severe pain</li>
                            <li>• Uncontrolled bleeding</li>
                            <li>• Severe or persistent vomiting or diarrhea</li>
                          </ul>
                        </div>

                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                          <h4 className="font-medium text-slate-800 flex items-center">
                            <Info className="h-4 w-4 mr-2 text-red-500" />
                            While Waiting for Help
                          </h4>
                          <ul className="mt-2 text-sm text-slate-600 space-y-1">
                            <li>• Stay on the line with 108</li>
                            <li>• Stay calm and reassuring to the patient</li>
                            <li>• Don't move the person unless necessary</li>
                            <li>• If trained, provide first aid or CPR</li>
                            <li>• Clear space for emergency responders</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button className="w-full">
                          <a href="https://health.odisha.gov.in/sites/default/files/2020-02/STG-2018.pdf">
                          Download Emergency Guide
                          </a>
                          </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img 
                          src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                          alt="Emergency Services Map" 
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                            console.log("Emergency Services Map image failed to load");
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900/50 flex items-end">
                          <div className="p-4 text-white">
                            <h4 className="font-semibold">Bhubaneswar Emergency Map</h4>
                            <p className="text-xs text-white/80">Real-time emergency facility locations in Bhubaneswar</p>
                          </div>
                        </div>
                        
                        {/* Simulated Map Markers */}
                        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse"></div>
                        <div className="absolute top-1/2 left-2/3 w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse"></div>
                        <div className="absolute top-2/3 left-1/3 w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse"></div>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Find Emergency Services Near You</h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Use our interactive map to locate the nearest emergency facilities, including hospitals, urgent care, and fire stations.
                      </p>
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <MapPin className="h-4 w-4 mr-2" />
                          <a href="https://surl.li/dvvgxc">
                          Open Map
                          </a>
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <MapPin className="h-4 w-4 mr-2" />
                          <a href="https://surl.li/dvvgxc">
                          Find Nearest

                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}