import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
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
  Library,
  Atom,
  Palette
} from "lucide-react";

// Bhubaneswar schools data
const schools = [
  {
    id: 1,
    name: "DAV Public School, Chandrasekharpur",
    type: "CBSE",
    level: "K-12",
    address: "Chandrasekharpur, Bhubaneswar, Odisha 751016",
    rating: 4.7,
    students: 3500,
    teachers: 165,
    programs: ["Science Stream", "Commerce Stream", "STEM Education", "Sports Excellence"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    contact: {
      phone: "0674-2741416",
      email: "info@davbhubaneswar.org",
      website: "www.davbhubaneswar.org"
    }
  },
  {
    id: 2,
    name: "DPS Kalinga",
    type: "CBSE",
    level: "K-12",
    address: "Pitapalli, Bhubaneswar, Odisha 752055",
    rating: 4.8,
    students: 2800,
    teachers: 140,
    programs: ["Digital Learning", "STEM Labs", "International Exchange", "Arts Program"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    contact: {
      phone: "0674-2725136",
      email: "info@dpskalinga.com",
      website: "www.dpskalinga.com"
    }
  },
  {
    id: 3,
    name: "SAI International School",
    type: "CBSE & ICSE",
    level: "K-12",
    address: "Patia, Bhubaneswar, Odisha 751024",
    rating: 4.9,
    students: 4200,
    teachers: 210,
    programs: ["International Curriculum", "Leadership Program", "Digital Learning", "Sports Academy"],
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    contact: {
      phone: "0674-7101900",
      email: "info@saiinternational.edu.in",
      website: "www.saiinternational.edu.in"
    }
  },
  {
    id: 4,
    name: "Mothers Public School",
    type: "CBSE",
    level: "K-12",
    address: "Unit-1, Bhubaneswar, Odisha 751009",
    rating: 4.6,
    students: 2500,
    teachers: 125,
    programs: ["Science Education", "Math Olympiad Training", "Cultural Programs", "Sports Development"],
    image: "https://images.unsplash.com/photo-1613896527026-f195d5c818ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    contact: {
      phone: "0674-2531355",
      email: "info@motherspublicschool.org",
      website: "www.motherspublicschool.org"
    }
  }
];

// Bhubaneswar colleges and universities data
const colleges = [
  {
    id: 1,
    name: "KIIT University",
    type: "Deemed University",
    address: "KIIT Road, Patia, Bhubaneswar, Odisha 751024",
    students: 30000,
    faculty: 1800,
    programs: ["Engineering", "Medicine", "Management", "Law", "Computer Applications", "Science"],
    tuition: "₹3,50,000 - ₹12,00,000/year",
    acceptanceRate: "30%",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    contact: {
      phone: "0674-2725113",
      email: "admission@kiit.ac.in",
      website: "www.kiit.ac.in"
    }
  },
  {
    id: 2,
    name: "AIIMS Bhubaneswar",
    type: "Central Government Institute",
    address: "Sijua, Patrapada, Bhubaneswar, Odisha 751019",
    students: 2500,
    faculty: 320,
    programs: ["MBBS", "MD/MS", "Super-Specialty Medical Courses", "Nursing", "Paramedical"],
    tuition: "₹1,350/year (subsidized)",
    acceptanceRate: "0.1%",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    contact: {
      phone: "0674-2476789",
      email: "info@aiimsbhubaneswar.edu.in",
      website: "www.aiimsbhubaneswar.edu.in"
    }
  },
  {
    id: 3,
    name: "IIT Bhubaneswar",
    type: "Central Government Institute",
    address: "Argul, Jatni, Khurda, Odisha 752050",
    students: 3000,
    faculty: 250,
    programs: ["B.Tech", "M.Tech", "M.Sc", "PhD", "Research Programs"],
    tuition: "₹2,20,000/year",
    acceptanceRate: "1%",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    contact: {
      phone: "0674-7135001",
      email: "admission@iitbbs.ac.in",
      website: "www.iitbbs.ac.in"
    }
  },
  {
    id: 4,
    name: "Xavier University (XIMB)",
    type: "Private University",
    address: "Xavier Square, Nijigada, Kurki, Harirajpur, Bhubaneswar, Odisha 752050",
    students: 4500,
    faculty: 180,
    programs: ["MBA", "Executive MBA", "PhD", "Rural Management", "HR Management"],
    tuition: "₹9,50,000 - ₹12,00,000/year",
    acceptanceRate: "12%",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    contact: {
      phone: "0674-6647777",
      email: "admission@xub.edu.in",
      website: "www.xub.edu.in"
    }
  },
  {
    id: 5,
    name: "Utkal University",
    type: "State University",
    address: "Vani Vihar, Bhubaneswar, Odisha 751004",
    students: 20000,
    faculty: 450,
    programs: ["Arts", "Science", "Commerce", "Law", "Social Science", "Education"],
    tuition: "₹20,000 - ₹80,000/year",
    acceptanceRate: "45%",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    contact: {
      phone: "0674-2567635",
      email: "registrar@utkaluniversity.ac.in",
      website: "www.utkaluniversity.ac.in"
    }
  }
];

// Bhubaneswar educational courses data
const courses = [
  {
    id: 1,
    title: "AI & Machine Learning Certification",
    provider: "KIIT University",
    format: "Hybrid",
    duration: "12 weeks",
    price: "₹45,000",
    rating: 4.8,
    enrolled: 1250,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive AI & ML program covering deep learning, neural networks, computer vision and NLP with hands-on projects guided by industry experts.",
    startDates: ["April 15, 2023", "July 10, 2023", "October 5, 2023"]
  },
  {
    id: 2,
    title: "Odissi Dance Foundation Course",
    provider: "Odisha Dance Academy",
    format: "In-person",
    duration: "16 weeks",
    price: "₹12,000",
    rating: 4.9,
    enrolled: 85,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Learn the ancient classical dance form of Odisha with expert practitioners. Course covers basic postures, rhythms, expressions and a complete dance piece.",
    startDates: ["May 1, 2023", "August 15, 2023", "November 10, 2023"]
  },
  {
    id: 3,
    title: "Medical Entrance Exam Preparation",
    provider: "AIIMS Bhubaneswar",
    format: "Hybrid",
    duration: "24 weeks",
    price: "₹35,000",
    rating: 4.7,
    enrolled: 750,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Intensive preparation for NEET and other medical entrance exams with specialized coaching from AIIMS faculty, practice tests, and personalized guidance.",
    startDates: ["June 1, 2023", "December 15, 2023"]
  },
  {
    id: 4,
    title: "Smart City Technology & Management",
    provider: "IIT Bhubaneswar",
    format: "Online",
    duration: "8 weeks",
    price: "₹25,000",
    rating: 4.6,
    enrolled: 430,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1544830281-1d7cc1a06e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Learn about smart urban planning, IoT implementation, data analytics for city management and sustainable urban development practices.",
    startDates: ["April 10, 2023", "July 5, 2023", "October 20, 2023"]
  },
  {
    id: 5,
    title: "Entrepreneurship & Startup Incubation",
    provider: "Xavier University (XIMB)",
    format: "Hybrid",
    duration: "10 weeks",
    price: "₹30,000",
    rating: 4.5,
    enrolled: 320,
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive program for aspiring entrepreneurs covering business planning, funding strategies, marketing, legal aspects, and mentorship with successful startup founders.",
    startDates: ["May 15, 2023", "September 5, 2023"]
  },
  {
    id: 6,
    title: "Odia Language & Cultural Studies",
    provider: "Utkal University",
    format: "In-person",
    duration: "14 weeks",
    price: "₹8,000",
    rating: 4.8,
    enrolled: 210,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Immersive program in Odia language, literature, history and cultural traditions of Odisha, designed for newcomers to Bhubaneswar and cultural enthusiasts.",
    startDates: ["April 5, 2023", "August 10, 2023", "December 1, 2023"]
  }
];

// Bhubaneswar educational resources data
const resources = [
  {
    id: 1,
    title: "Odisha State Library",
    type: "Public Library",
    address: "Sachivalaya Marg, Unit 4, Bhubaneswar, 751001",
    access: "Free with Library Card (₹50/year)",
    resources: ["Books Collection", "Digital Archives", "Odisha Heritage Records", "Research Journals"],
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive library with over 200,000 books, including rare manuscripts on Odisha history and culture. Offers quiet reading spaces and digital access terminals."
  },
  {
    id: 2,
    title: "Pathani Samanta Planetarium",
    type: "Science Center",
    address: "BDA Colony, Acharya Vihar, Bhubaneswar, 751013",
    access: "₹30 for Students, ₹50 for Adults",
    resources: ["Astronomy Shows", "Science Exhibits", "Educational Tours", "Workshops"],
    image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Educational planetarium named after famous Odia astronomer Pathani Samanta, featuring regular sky shows, astronomy workshops, and scientific exhibitions for students."
  },
  {
    id: 3,
    title: "Regional Science Centre",
    type: "Science & Technology Center",
    address: "Acharya Vihar, Bhubaneswar, 751013",
    access: "₹40 for Students, ₹60 for Adults",
    resources: ["Interactive Exhibits", "Science Park", "Workshops", "3D Theatre"],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Hands-on science center with exhibits in physics, chemistry, biology, and technology. Regular science demonstrations and student activities to promote scientific thinking."
  },
  {
    id: 4,
    title: "Bhubaneswar e-Learning Hub",
    type: "Digital Learning Center",
    address: "BMC Bhawani Mall, Saheed Nagar, Bhubaneswar, 751007",
    access: "Free for Students, ₹500/month for Professionals",
    resources: ["Computer Labs", "Online Courses", "Digital Library", "Mentorship"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Modern digital learning center providing access to online courses, high-speed internet, and digital resources. Special programs for coding, data science, and digital skills."
  },
  {
    id: 5,
    title: "Odisha Traditional Knowledge Centre",
    type: "Cultural Learning Center",
    address: "Utkal University Campus, Vani Vihar, Bhubaneswar, 751004",
    access: "Free (Registration Required)",
    resources: ["Cultural Workshops", "Handicraft Training", "Traditional Arts", "Folk Knowledge"],
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Center dedicated to preserving and teaching traditional Odia arts, crafts, and knowledge systems including Pattachitra painting, Odissi dance, and traditional medicinal practices."
  }
];

// Bhubaneswar educational achievements and metrics
const educationalMetrics = [
  { name: "Literacy Rate", value: "93.2%", change: "+2.1%", trend: "up" },
  { name: "Higher Education", value: "78%", change: "+4.5%", trend: "up" },
  { name: "Technical Training", value: "65.8%", change: "+5.3%", trend: "up" },
  { name: "Education Centers", value: "182", change: "+21", trend: "up" }
];

// Bhubaneswar scholarships data
const scholarships = [
  {
    id: 1,
    name: "Odisha Chief Minister's Scholarship",
    amount: "₹15,000 - ₹60,000/year",
    eligibility: "Odisha resident students with 75%+ in Class XII",
    deadline: "July 31, 2023",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Odisha Higher Education Department"
  },
  {
    id: 2,
    name: "KIIT Merit Scholarship",
    amount: "₹50,000 - ₹2,00,000/year",
    eligibility: "JEE/NEET top rankers and economically disadvantaged students",
    deadline: "May 30, 2023",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "KIIT University"
  },
  {
    id: 3,
    name: "Bhubaneswar Municipal Tech Scholarship",
    amount: "₹25,000/year",
    eligibility: "Bhubaneswar residents pursuing technology, engineering, or computer science",
    deadline: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Bhubaneswar Smart City Initiative"
  },
  {
    id: 4,
    name: "Utkal Arts & Cultural Fellowship",
    amount: "₹10,000/year + Materials",
    eligibility: "Students pursuing traditional Odisha arts, crafts, dance, or music",
    deadline: "August 10, 2023",
    image: "https://images.unsplash.com/photo-1598386651573-9232cc0c2d6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "Utkal University of Culture"
  },
  {
    id: 5,
    name: "IIT Bhubaneswar Research Scholarship",
    amount: "₹31,000/month (Junior) - ₹35,000/month (Senior)",
    eligibility: "M.Tech/PhD students with research focus in priority technology areas",
    deadline: "May 5, 2023",
    image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    provider: "IIT Bhubaneswar"
  }
];

// Bhubaneswar educational events
const educationalEvents = [
  {
    id: 1,
    title: "Bhubaneswar Education Expo 2023",
    date: "April 22-24, 2023",
    location: "Janata Maidan, Bhubaneswar",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive education fair featuring universities, colleges, vocational institutes, and international education opportunities for Odisha students."
  },
  {
    id: 2,
    title: "Smart City Innovation Challenge",
    date: "May 12-14, 2023",
    location: "KIIT Convention Centre, Bhubaneswar",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Technology competition for students to present innovative solutions to urban challenges faced by Bhubaneswar, with cash prizes and incubation opportunities."
  },
  {
    id: 3,
    title: "Odisha Academic Conference",
    date: "June 8-10, 2023",
    location: "Utkal University Campus, Bhubaneswar",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Annual academic conference bringing together educators, researchers, and policymakers to discuss the future of education in Odisha."
  },
  {
    id: 4,
    title: "Kalinga Literary Festival - Student Edition",
    date: "July 15-17, 2023",
    location: "Rabindra Mandap, Bhubaneswar",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Special edition of the renowned literary festival focused on student writers, with workshops, competitions, and interactions with established authors."
  },
  {
    id: 5,
    title: "NEET/JEE Guidance Workshop",
    date: "May 28, 2023",
    location: "AIIMS Bhubaneswar Auditorium",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Free guidance workshop for medical and engineering aspirants, featuring expert panels, test-taking strategies, and interactive Q&A sessions with successful candidates."
  }
];

export default function EducationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("schools");
  const [searchQuery, setSearchQuery] = useState("");

  // Define interface for education data
  interface EducationData {
    schools: typeof schools;
    colleges: typeof colleges;
    courses: typeof courses;
    resources: typeof resources;
    metrics: typeof educationalMetrics;
    scholarships: typeof scholarships;
    events: typeof educationalEvents;
  }

  // Fetch education data from the backend
  const { data: educationData, isLoading, error } = useQuery<EducationData>({
    queryKey: ['/api/education'],
    refetchOnWindowFocus: false,
  });

  // Use backend data if available, otherwise use local data
  const schoolsData = educationData?.schools || schools;
  const collegesData = educationData?.colleges || colleges;
  const coursesData = educationData?.courses || courses;
  const resourcesData = educationData?.resources || resources;
  const metricsData = educationData?.metrics || educationalMetrics;
  const scholarshipsData = educationData?.scholarships || scholarships;
  const eventsData = educationData?.events || educationalEvents;

  // Filter schools based on search query
  const filteredSchools = schoolsData.filter((school: any) => 
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter colleges based on search query
  const filteredColleges = collegesData.filter((college: any) => 
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter courses based on search query
  const filteredCourses = coursesData.filter((course: any) => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter resources based on search query
  const filteredResources = resourcesData.filter((resource: any) => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="rounded-lg mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80')] bg-cover bg-center"></div>
            <div className="p-8 md:p-12 relative">
              <div className="lg:flex items-center justify-between">
                <div className="max-w-2xl mb-6 lg:mb-0">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">Smart Education Platform</h1>
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
                
                <div className="hidden lg:block">
                  <img 
                    src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                    alt="Education" 
                    className="rounded-lg shadow-lg border-4 border-white rotate-3 w-80 h-60 object-cover"
                    onError={(e) => {
                      // Fallback image for education hero
                      e.currentTarget.src = "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Education Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {metricsData.map((metric: {
              name: string;
              value: string;
              trend: string;
              change: string;
            }, index: number) => (
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
                {filteredSchools.map((school: any) => (
                  <Card key={school.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                    {school.image && (
                      <div className="h-48 w-full overflow-hidden">
                        <img 
                          src={school.image} 
                          alt={school.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                          onError={(e) => {
                            // Fallback image for schools
                            e.currentTarget.src = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className={`mb-2 ${
                            school.type.includes("CBSE") ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
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
                          {school.programs.map((program: string, index: number) => (
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
                {filteredColleges.map((college: any) => (
                  <Card key={college.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      {college.image && (
                        <div className="md:w-1/3 h-auto overflow-hidden">
                          <img 
                            src={college.image} 
                            alt={college.name} 
                            className="w-full h-full object-cover md:h-64"
                            onError={(e) => {
                              // Fallback image for colleges
                              e.currentTarget.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                        </div>
                      )}
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
                            {college.programs.map((program: string, index: number) => (
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
              <div className="bg-white p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Featured Courses</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="relative rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225&q=80" 
                      alt="Data Science" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium">
                      Bestseller
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-slate-800 mb-1">Data Science Masterclass</h4>
                      <p className="text-sm text-slate-600 mb-3">Learn Python, SQL, ML, and more</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">$349</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="ml-1 text-sm">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1601077513836-53dd424a8220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225&q=80" 
                      alt="Web Development" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-green-600 text-white px-3 py-1 text-sm font-medium">
                      New
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-slate-800 mb-1">Full-Stack Developer Course</h4>
                      <p className="text-sm text-slate-600 mb-3">React, Node.js, MongoDB</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">$499</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="ml-1 text-sm">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1573167506956-4060312be78e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225&q=80" 
                      alt="UX Design" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-slate-800 mb-1">UX/UI Design Bootcamp</h4>
                      <p className="text-sm text-slate-600 mb-3">Learn design principles and tools</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">$399</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="ml-1 text-sm">4.7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course: any) => (
                  <Card key={course.id} className="bg-white overflow-hidden hover:shadow-md transition-shadow">
                    {course.image && (
                      <div className="h-48 w-full overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
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
                          {course.startDates.map((date: string, index: number) => (
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
              <div className="relative mb-8 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80" 
                  alt="Library interior" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
                  <div className="p-8 text-white max-w-xl">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Educational Resources</h2>
                    <p className="text-blue-100">
                      Discover libraries, learning centers, and digital resources to support your educational journey.
                    </p>
                  </div>
                </div>
              </div>
            
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Educational Resources */}
                <div>
                  <div className="bg-white p-6 rounded-lg mb-6">
                    <div className="flex items-center mb-4">
                      <Library className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-slate-800">Learning Resources</h3>
                    </div>
                  
                    <div className="space-y-5">
                      {filteredResources.map((resource: any) => (
                        <div key={resource.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          {resource.image && (
                            <div className="h-48 w-full overflow-hidden">
                              <img 
                                src={resource.image} 
                                alt={resource.title} 
                                className="w-full h-full object-cover transition-transform hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="p-5">
                            <div className="flex items-start">
                              <div className={`p-3 rounded-lg mr-4 ${
                                resource.type.includes("Library") ? "bg-blue-100 text-blue-600" : 
                                resource.type.includes("Science") ? "bg-green-100 text-green-600" :
                                resource.type.includes("Digital") ? "bg-purple-100 text-purple-600" :
                                "bg-amber-100 text-amber-600"
                              }`}>
                                {resource.type.includes("Library") ? 
                                  <Library className="h-6 w-6" /> : 
                                  resource.type.includes("Science") ?
                                  <Atom className="h-6 w-6" /> :
                                  resource.type.includes("Digital") ?
                                  <Laptop className="h-6 w-6" /> :
                                  <Palette className="h-6 w-6" />
                                }
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-slate-800">{resource.title}</h4>
                                <p className="text-sm text-slate-500 mb-1">
                                  <MapPin className="h-3.5 w-3.5 mr-1 inline text-slate-400" />
                                  {resource.address}
                                </p>
                                <p className="text-sm text-slate-500 mb-3">
                                  Access: {resource.access}
                                </p>
                                <p className="text-sm text-slate-600 mb-3">{resource.description}</p>
                              </div>
                            </div>
                            
                            <div className="border-t border-slate-100 pt-4 mt-4">
                              <p className="text-sm font-medium text-slate-700 mb-2">Available Resources:</p>
                              <div className="flex flex-wrap gap-2">
                                {resource.resources.map((item: string, index: number) => (
                                  <Badge key={index} variant="outline" className="bg-slate-50">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                              <div className="mt-4 flex justify-between">
                                <Button size="sm" variant="outline">Learn More</Button>
                                <Button size="sm">Access Resource</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Scholarships and Events */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Trophy className="h-6 w-6 text-amber-600 mr-3" />
                      <h3 className="text-xl font-bold text-slate-800">Scholarships</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {scholarshipsData.map((scholarship: any) => (
                        <div key={scholarship.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          {scholarship.image && (
                            <div className="h-32 w-full overflow-hidden">
                              <img 
                                src={scholarship.image} 
                                alt={scholarship.name} 
                                className="w-full h-full object-cover transition-transform hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="p-4">
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <CalendarDays className="h-6 w-6 text-indigo-600 mr-3" />
                      <h3 className="text-xl font-bold text-slate-800">Upcoming Events</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {eventsData.map((event: any) => (
                        <div key={event.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="relative h-28 overflow-hidden bg-slate-200">
                            <img 
                              src={`https://images.unsplash.com/photo-156${event.id}2954031-54121a5e48f94?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=112&q=80`} 
                              alt={event.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1">
                              {event.date.split(',')[0]}
                            </div>
                          </div>
                          <div className="p-4">
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
                          </div>
                        </div>
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