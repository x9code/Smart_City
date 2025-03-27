import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  School,
  GraduationCap,
  Book,
  CalendarDays,
  Clock,
  MapPin,
  User,
  Search,
  Laptop,
  BookOpen,
  Trophy,
  UserPlus,
  Users,
  Star,
  PencilRuler,
  Calculator,
  ChevronRight,
  Globe,
  Lightbulb,
  Blocks,
  CircleUser,
  Library
} from "lucide-react";

// Sample data for schools
const schools = [
  {
    id: 1,
    name: "Central High School",
    type: "Public",
    level: "High School",
    address: "123 Education Blvd, Downtown",
    rating: 4.5,
    students: 1250,
    teachers: 78,
    programs: ["Advanced Placement", "STEM Focus", "Arts Program"],
    contact: {
      phone: "(555) 123-4567",
      email: "info@centralhigh.edu",
      website: "www.centralhigh.edu"
    }
  },
  {
    id: 2,
    name: "Westside Elementary",
    type: "Public",
    level: "Elementary",
    address: "456 Learning Lane, Westside",
    rating: 4.7,
    students: 820,
    teachers: 45,
    programs: ["Early Literacy", "Spanish Immersion", "Special Education"],
    contact: {
      phone: "(555) 234-5678",
      email: "info@westsideelem.edu",
      website: "www.westsideelem.edu"
    }
  },
  {
    id: 3,
    name: "Riverside Academy",
    type: "Private",
    level: "K-12",
    address: "789 Scholar Street, Riverside",
    rating: 4.8,
    students: 950,
    teachers: 68,
    programs: ["International Baccalaureate", "Performing Arts", "Athletics"],
    contact: {
      phone: "(555) 345-6789",
      email: "admissions@riversideacademy.edu",
      website: "www.riversideacademy.edu"
    }
  }
];

// Sample data for colleges and universities
const colleges = [
  {
    id: 1,
    name: "City University",
    type: "Public",
    address: "1000 University Ave, Downtown",
    students: 25000,
    faculty: 1200,
    programs: ["Liberal Arts", "Business", "Engineering", "Medicine", "Law"],
    tuition: "$12,000/year (in-state), $25,000/year (out-of-state)",
    acceptanceRate: "68%",
    contact: {
      phone: "(555) 987-6543",
      email: "admissions@cityuniversity.edu",
      website: "www.cityuniversity.edu"
    }
  },
  {
    id: 2,
    name: "Technical Institute",
    type: "Public",
    address: "500 Technology Parkway, Eastside",
    students: 12000,
    faculty: 550,
    programs: ["Computer Science", "Engineering", "Applied Sciences", "Mathematics"],
    tuition: "$9,500/year",
    acceptanceRate: "72%",
    contact: {
      phone: "(555) 876-5432",
      email: "info@techinstitude.edu",
      website: "www.techinstitute.edu"
    }
  },
  {
    id: 3,
    name: "Liberal Arts College",
    type: "Private",
    address: "300 Humanities Circle, Northside",
    students: 4500,
    faculty: 320,
    programs: ["Literature", "Philosophy", "Arts", "Social Sciences", "Language Studies"],
    tuition: "$32,000/year",
    acceptanceRate: "45%",
    contact: {
      phone: "(555) 765-4321",
      email: "admissions@liberalarts.edu",
      website: "www.liberalarts.edu"
    }
  }
];

// Sample data for courses
const courses = [
  {
    id: 1,
    title: "Introduction to Data Science",
    provider: "City University Online",
    format: "Online",
    duration: "8 weeks",
    price: "$300",
    rating: 4.6,
    enrolled: 1876,
    level: "Beginner",
    description: "Learn the fundamentals of data science, including data analysis, visualization, and basic machine learning concepts.",
    startDates: ["January 15, 2023", "March 1, 2023", "June 10, 2023"]
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    provider: "Tech Academy",
    format: "Hybrid",
    duration: "12 weeks",
    price: "$1,200",
    rating: 4.8,
    enrolled: 3542,
    level: "Intermediate",
    description: "Comprehensive web development course covering HTML, CSS, JavaScript, React, and Node.js with hands-on projects.",
    startDates: ["February 5, 2023", "May 15, 2023", "September 1, 2023"]
  },
  {
    id: 3,
    title: "Business Management Fundamentals",
    provider: "Business School Pro",
    format: "In-person",
    duration: "6 weeks",
    price: "$750",
    rating: 4.3,
    enrolled: 958,
    level: "Beginner",
    description: "Essential business management principles, including leadership, finance, marketing, and operations.",
    startDates: ["January 10, 2023", "April 5, 2023", "July 20, 2023"]
  },
  {
    id: 4,
    title: "Creative Writing Workshop",
    provider: "Writers Guild",
    format: "Online",
    duration: "4 weeks",
    price: "$150",
    rating: 4.7,
    enrolled: 740,
    level: "All Levels",
    description: "Develop your creative writing skills through guided exercises, peer feedback, and expert instruction.",
    startDates: ["February 15, 2023", "May 1, 2023", "August 15, 2023"]
  }
];

// Sample data for educational resources
const resources = [
  {
    id: 1,
    title: "City Digital Library",
    type: "Library",
    access: "Free with Library Card",
    resources: ["E-books", "Research Journals", "Academic Papers", "Online Courses"],
    description: "Access thousands of digital resources including books, journals, and academic papers through the city's digital library."
  },
  {
    id: 2,
    title: "STEM Learning Center",
    type: "Learning Center",
    access: "Free for Students, $10/month for Adults",
    resources: ["Hands-on Labs", "Tutoring", "Workshop Space", "Equipment Access"],
    description: "Community center focused on STEM education, providing hands-on learning experiences and resources for all ages."
  },
  {
    id: 3,
    title: "Language Learning Hub",
    type: "Learning Center",
    access: "Membership Required ($15/month)",
    resources: ["Language Software", "Conversation Groups", "Cultural Events", "Teaching Materials"],
    description: "Dedicated space for language learning with resources for multiple languages and regular conversation practice groups."
  }
];

// Sample data for educational achievements
const educationalMetrics = [
  { name: "Graduation Rate", value: "87%", change: "+3%", trend: "up" },
  { name: "College Enrollment", value: "72%", change: "+5%", trend: "up" },
  { name: "Literacy Rate", value: "96.5%", change: "+0.8%", trend: "up" },
  { name: "STEM Programs", value: "24", change: "+4", trend: "up" }
];

// Sample data for scholarships
const scholarships = [
  {
    id: 1,
    name: "City Merit Scholarship",
    amount: "$5,000",
    eligibility: "High school seniors with GPA 3.5+",
    deadline: "March 15, 2023",
    provider: "City Education Foundation"
  },
  {
    id: 2,
    name: "STEM Excellence Award",
    amount: "$3,000",
    eligibility: "Students pursuing STEM degrees",
    deadline: "April 1, 2023",
    provider: "TechFuture Initiative"
  },
  {
    id: 3,
    name: "Arts & Humanities Grant",
    amount: "$2,500",
    eligibility: "Students in arts, literature, or humanities",
    deadline: "February 28, 2023",
    provider: "Cultural Arts Society"
  }
];

// Sample data for upcoming educational events
const educationalEvents = [
  {
    id: 1,
    title: "Education Fair 2023",
    date: "March 25-26, 2023",
    location: "City Convention Center",
    description: "Annual education fair featuring colleges, universities, and educational programs from across the region."
  },
  {
    id: 2,
    title: "STEM Innovation Conference",
    date: "April 15, 2023",
    location: "Technical Institute",
    description: "Conference showcasing the latest innovations in STEM education and career opportunities."
  },
  {
    id: 3,
    title: "Parent-Teacher Education Summit",
    date: "May 5, 2023",
    location: "Central High School",
    description: "Collaborative event bringing together parents and educators to discuss best practices in supporting student success."
  }
];

export default function EducationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("schools");
  const [searchQuery, setSearchQuery] = useState("");

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
        <Header onMobileMenuToggle={toggleMobileMenu} title="Education" />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          {/* Hero Section */}
          <div className="rounded-lg mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
            <div className="p-8 md:p-12 relative">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Smart Education Platform</h1>
                <p className="text-lg md:text-xl mb-6 text-blue-100">Discover educational institutions, courses, and resources for lifelong learning.</p>
                
                <form onSubmit={handleSearch} className="flex items-center max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input 
                      placeholder="Search schools, courses, or resources..." 
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
          
          {/* Education Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {educationalMetrics.map((metric, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">{metric.name}</p>
                      <h3 className="text-2xl font-bold text-slate-800">{metric.value}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index === 0 ? "bg-green-100 text-green-600" : 
                      index === 1 ? "bg-blue-100 text-blue-600" : 
                      index === 2 ? "bg-purple-100 text-purple-600" : 
                      "bg-amber-100 text-amber-600"
                    }`}>
                      {index === 0 ? <GraduationCap className="h-6 w-6" /> : 
                       index === 1 ? <School className="h-6 w-6" /> :
                       index === 2 ? <BookOpen className="h-6 w-6" /> :
                       <Blocks className="h-6 w-6" />}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    {metric.trend === "up" ? (
                      <span className="text-green-600">
                        {metric.change} <ChevronRight className="h-3 w-3 ml-1 rotate-45 inline" />
                      </span>
                    ) : (
                      <span className="text-red-600">
                        {metric.change} <ChevronRight className="h-3 w-3 ml-1 -rotate-45 inline" />
                      </span>
                    )}
                    <span className="text-slate-500 ml-2">from last year</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex bg-white p-1 rounded-lg shadow mb-6">
              <TabsTrigger value="schools" className="flex-1 py-3">
                <School className="h-4 w-4 mr-2" />
                Schools
              </TabsTrigger>
              <TabsTrigger value="colleges" className="flex-1 py-3">
                <GraduationCap className="h-4 w-4 mr-2" />
                Colleges
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex-1 py-3">
                <Book className="h-4 w-4 mr-2" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex-1 py-3">
                <Library className="h-4 w-4 mr-2" />
                Resources
              </TabsTrigger>
            </TabsList>
            
            {/* Schools Tab */}
            <TabsContent value="schools" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {schools.map((school) => (
                  <Card key={school.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className={`mb-2 ${
                            school.type === "Public" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                          } border-0`}>
                            {school.type}
                          </Badge>
                          <CardTitle>{school.name}</CardTitle>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="ml-1 font-medium">{school.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center text-sm text-slate-500 mb-2">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        {school.address}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-slate-50 rounded-lg text-center">
                          <p className="text-sm text-slate-500">Students</p>
                          <p className="font-bold text-slate-700">{school.students}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg text-center">
                          <p className="text-sm text-slate-500">Teachers</p>
                          <p className="font-bold text-slate-700">{school.teachers}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-slate-700 mb-2">Programs Offered:</p>
                        <div className="flex flex-wrap gap-1">
                          {school.programs.map((program, index) => (
                            <Badge key={index} variant="outline" className="bg-slate-50">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-slate-200 pt-4">
                        <Button className="w-full">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Colleges Tab */}
            <TabsContent value="colleges" className="mt-0">
              <div className="grid grid-cols-1 gap-6">
                {colleges.map((college) => (
                  <Card key={college.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 bg-slate-100 p-6 flex flex-col">
                        <div>
                          <Badge className={`mb-2 ${
                            college.type === "Public" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                          } border-0`}>
                            {college.type}
                          </Badge>
                          <h3 className="text-xl font-bold text-slate-800 mb-4">{college.name}</h3>
                          <div className="flex items-center text-sm text-slate-600 mb-3">
                            <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                            {college.address}
                          </div>
                          <div className="flex items-center text-sm font-medium text-blue-600 mb-3">
                            <Globe className="h-3.5 w-3.5 mr-1" />
                            {college.contact.website}
                          </div>
                        </div>
                        <div className="mt-auto">
                          <p className="text-sm text-slate-600">
                            <span className="font-medium">Acceptance Rate:</span> {college.acceptanceRate}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            <span className="font-medium">Tuition:</span> {college.tuition}
                          </p>
                        </div>
                        <Button className="mt-4">View Details</Button>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div className="p-4 bg-slate-50 rounded-lg text-center">
                            <Users className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                            <p className="text-sm text-slate-500">Students</p>
                            <p className="font-bold text-slate-700">{college.students.toLocaleString()}</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-lg text-center">
                            <CircleUser className="h-6 w-6 mx-auto text-indigo-600 mb-2" />
                            <p className="text-sm text-slate-500">Faculty</p>
                            <p className="font-bold text-slate-700">{college.faculty.toLocaleString()}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 mb-3">Available Programs</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {college.programs.map((program, index) => (
                              <div key={index} className="flex items-center p-2 bg-slate-50 rounded-lg">
                                <PencilRuler className="h-4 w-4 text-slate-500 mr-2" />
                                <span className="text-sm">{program}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Courses Tab */}
            <TabsContent value="courses" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className={`mb-2 ${
                            course.format === "Online" ? "bg-green-100 text-green-800" : 
                            course.format === "Hybrid" ? "bg-purple-100 text-purple-800" : 
                            "bg-blue-100 text-blue-800"
                          } border-0`}>
                            {course.format}
                          </Badge>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription className="mt-1">{course.provider}</CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">{course.price}</p>
                          <div className="flex items-center mt-1 justify-end">
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                            <span className="ml-1 text-sm">{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-sm text-slate-600">
                          <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          Duration: {course.duration}
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <User className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          {course.enrolled.toLocaleString()} enrolled
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Lightbulb className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          Level: {course.level}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">{course.description}</p>
                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">Upcoming Start Dates:</p>
                        <div className="flex flex-wrap gap-2">
                          {course.startDates.map((date, index) => (
                            <Badge key={index} variant="outline" className="bg-slate-50">
                              <CalendarDays className="h-3 w-3 mr-1" />
                              {date}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between">
                        <Button variant="outline">Learn More</Button>
                        <Button>Enroll Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Educational Resources */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Educational Resources</h3>
                  <div className="space-y-4">
                    {resources.map((resource) => (
                      <Card key={resource.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className={`p-3 rounded-lg mr-4 ${
                              resource.type === "Library" ? "bg-blue-100 text-blue-600" : 
                              "bg-purple-100 text-purple-600"
                            }`}>
                              {resource.type === "Library" ? 
                                <Library className="h-6 w-6" /> : 
                                <Laptop className="h-6 w-6" />
                              }
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-800">{resource.title}</h4>
                              <p className="text-sm text-slate-500 mb-3">
                                Access: {resource.access}
                              </p>
                              <p className="text-sm text-slate-600 mb-3">{resource.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {resource.resources.map((item, index) => (
                                  <Badge key={index} variant="outline" className="bg-slate-50">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                              <Button className="w-full mt-4" variant="outline">Access Resource</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Scholarships and Events */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Available Scholarships</h3>
                    <div className="space-y-4">
                      {scholarships.map((scholarship) => (
                        <Card key={scholarship.id} className="bg-white">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-slate-800">{scholarship.name}</h4>
                              <Badge className="bg-green-100 text-green-800 border-0">
                                {scholarship.amount}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-500 mb-2">Provider: {scholarship.provider}</p>
                            <p className="text-sm text-slate-600 mb-2">
                              <span className="font-medium">Eligibility:</span> {scholarship.eligibility}
                            </p>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-slate-500">
                                <CalendarDays className="h-3.5 w-3.5 mr-1 inline text-slate-400" />
                                Deadline: {scholarship.deadline}
                              </p>
                              <Button size="sm">Apply</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Upcoming Educational Events</h3>
                    <div className="space-y-4">
                      {educationalEvents.map((event) => (
                        <Card key={event.id} className="bg-white">
                          <CardContent className="p-4">
                            <h4 className="font-bold text-slate-800 mb-2">{event.title}</h4>
                            <div className="flex items-center text-sm text-slate-500 mb-2">
                              <CalendarDays className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {event.date}
                            </div>
                            <div className="flex items-center text-sm text-slate-500 mb-3">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {event.location}
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{event.description}</p>
                            <Button size="sm" variant="outline" className="w-full">View Details</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Spring Boot Integration Alert */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <Laptop className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Ready for Spring Boot Integration</h3>
                  <p className="text-sm text-slate-600">
                    This frontend is configured to connect to a Spring Boot backend with JPA and PostgreSQL. All API endpoints are prepared for integration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Footer */}
          <footer className="text-center text-sm text-slate-500 mb-6">
            <p>© 2023 Smart City Education Platform. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}