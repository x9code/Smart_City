import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { services, EmergencyAlert, Activity } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // City services API
  app.get("/api/services", (req, res) => {
    res.json(services);
  });

  // City stats API
  app.get("/api/city-stats", (req, res) => {
    const cityStats = {
      congestionLevel: "32%",
      airQuality: "56",
      emergencyResponseTime: "4.2",
      activeVisitors: "9,482"
    };
    res.json(cityStats);
  });

  // Emergency alerts API
  app.get("/api/emergency-alerts", (req, res) => {
    const alerts: EmergencyAlert[] = [
      {
        id: 1,
        title: "Road Closure",
        time: "12m ago",
        description: "Main Street closed due to water main break. Expected to reopen by 5 PM.",
        type: "danger"
      },
      {
        id: 2,
        title: "Weather Alert",
        time: "1h ago",
        description: "Heavy rain expected tonight. Potential for localized flooding in downtown area.",
        type: "warning"
      },
      {
        id: 3,
        title: "Public Notice",
        time: "3h ago",
        description: "Planned power outage in North District for maintenance from 2AM to 4AM tomorrow.",
        type: "info"
      }
    ];
    res.json(alerts);
  });

  // Activity records API
  app.get("/api/activities", (req, res) => {
    const activities: Activity[] = [
      {
        id: 1,
        service: "Traffic Alert",
        icon: "traffic",
        color: "primary",
        status: "Critical",
        statusColor: "danger",
        time: "10 minutes ago",
        details: "Major accident on Highway 101 near exit 25"
      },
      {
        id: 2,
        service: "Healthcare",
        icon: "health_and_safety",
        color: "secondary",
        status: "Info",
        statusColor: "info",
        time: "1 hour ago",
        details: "City General Hospital availability updated"
      },
      {
        id: 3,
        service: "Safety Alert",
        icon: "shield",
        color: "warning",
        status: "Warning",
        statusColor: "warning",
        time: "3 hours ago",
        details: "Increased reports of suspicious activity in Downtown District"
      },
      {
        id: 4,
        service: "Education",
        icon: "school",
        color: "success",
        status: "Success",
        statusColor: "success",
        time: "5 hours ago",
        details: "New online course catalog published for community college"
      }
    ];
    res.json(activities);
  });

  // Traffic data API
  app.get("/api/traffic", (req, res) => {
    const trafficData = {
      congestion: {
        downtown: "75%",
        uptown: "45%",
        suburban: "30%",
        highways: "65%"
      },
      incidents: [
        {
          id: 1,
          type: "Accident",
          location: "Main St & 5th Ave",
          severity: "Major",
          reportedTime: "08:45 AM",
          status: "Emergency services on scene"
        },
        {
          id: 2,
          type: "Construction",
          location: "Highway 101, Mile 34",
          severity: "Moderate",
          reportedTime: "07:30 AM",
          status: "Lane closure"
        },
        {
          id: 3,
          type: "Road Closure",
          location: "Bridge Street",
          severity: "Major",
          reportedTime: "06:15 AM",
          status: "Closed until further notice"
        }
      ],
      trafficFlowData: [
        { time: "6 AM", volume: 1200 },
        { time: "7 AM", volume: 1800 },
        { time: "8 AM", volume: 2800 },
        { time: "9 AM", volume: 2500 },
        { time: "10 AM", volume: 2000 },
        { time: "11 AM", volume: 1800 },
        { time: "12 PM", volume: 1900 },
        { time: "1 PM", volume: 1700 },
        { time: "2 PM", volume: 1600 },
        { time: "3 PM", volume: 1800 },
        { time: "4 PM", volume: 2200 },
        { time: "5 PM", volume: 2800 },
        { time: "6 PM", volume: 2400 },
        { time: "7 PM", volume: 1800 },
        { time: "8 PM", volume: 1200 }
      ]
    };
    res.json(trafficData);
  });

  // Healthcare facilities API
  app.get("/api/healthcare", (req, res) => {
    const healthcareData = {
      facilities: [
        {
          id: 1,
          name: "City General Hospital",
          type: "Hospital",
          address: "123 Main Street, Downtown",
          phone: "(555) 123-4567",
          emergency: true,
          waitTime: "45 min",
          specialties: ["Emergency", "Surgery", "Maternity", "Pediatrics", "Oncology"],
          availability: {
            beds: "75%",
            icu: "80%",
            er: "65%"
          }
        },
        {
          id: 2,
          name: "Community Health Center",
          type: "Clinic",
          address: "456 Oak Avenue, Westside",
          phone: "(555) 987-6543",
          emergency: false,
          waitTime: "15 min",
          specialties: ["Primary Care", "Vaccinations", "Laboratory", "Mental Health"],
          availability: {
            appointments: "40%"
          }
        },
        {
          id: 3,
          name: "Riverside Medical Plaza",
          type: "Medical Center",
          address: "789 River Road, Eastside",
          phone: "(555) 456-7890",
          emergency: true,
          waitTime: "30 min",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "Radiology"],
          availability: {
            beds: "60%",
            icu: "50%",
            er: "40%"
          }
        }
      ],
      emergencyServices: {
        ambulances: {
          total: 12,
          available: 8,
          responding: 4
        },
        responseTime: {
          average: "8.5 min",
          current: "7 min"
        }
      },
      healthPrograms: [
        {
          id: 1,
          title: "Vaccination Drive",
          description: "Free and subsidized vaccinations for all residents",
          date: "October 15-30, 2023",
          location: "Multiple centers across the city"
        },
        {
          id: 2,
          title: "Mental Health Awareness Week",
          description: "Workshops, counseling sessions, and community events",
          date: "November 2-8, 2023",
          location: "Community Center & Online"
        }
      ]
    };
    res.json(healthcareData);
  });

  // Women's Safety API
  app.get("/api/safety", (req, res) => {
    const safetyData = {
      safetyZones: [
        {
          id: 1,
          name: "Central Police Station",
          type: "Police",
          address: "123 Main Street, Downtown",
          status: "Active",
          features: ["Surveillance", "Emergency Phone", "24/7 Staff"]
        },
        {
          id: 2,
          name: "Women's Resource Center",
          type: "Support",
          address: "456 Oak Avenue, Westside",
          status: "Active",
          features: ["Counseling", "Support Groups", "Shelter Services"]
        },
        {
          id: 3,
          name: "University Safety Hub",
          type: "Campus",
          address: "789 College Road, University District",
          status: "Active",
          features: ["Security Personnel", "Emergency Buttons", "Escort Services"]
        }
      ],
      emergencyContacts: [
        {
          id: 1,
          name: "Emergency Police",
          phone: "911",
          description: "For immediate emergencies requiring police"
        },
        {
          id: 2,
          name: "Women's Safety Helpline",
          phone: "(555) 789-4321",
          description: "24/7 helpline for women in distress"
        }
      ],
      alerts: [
        {
          id: 1,
          title: "Suspicious Activity",
          location: "Near Central Park, North Entrance",
          time: "20 minutes ago",
          description: "Multiple reports of suspicious person following women in the area"
        },
        {
          id: 2,
          title: "Safe Route Advisory",
          location: "Downtown, 5th & Main Street",
          time: "2 hours ago",
          description: "Construction has closed the usual safe path. Alternative route established."
        }
      ],
      safeRoutes: [
        {
          id: 1,
          name: "Downtown to University",
          startPoint: "Downtown Transit Hub",
          endPoint: "University Main Entrance",
          safetyFeatures: ["Well-lit streets", "Emergency Phones", "Regular Patrols"],
          status: "Active"
        },
        {
          id: 2,
          name: "Shopping District Loop",
          startPoint: "Main Shopping Center",
          endPoint: "Residential District",
          safetyFeatures: ["Security Cameras", "Busy Streets", "Police Checkpoints"],
          status: "Active"
        }
      ]
    };
    res.json(safetyData);
  });

  // Map API
  app.get("/api/map", (req, res) => {
    const mapData = {
      cityBounds: {
        northeast: { lat: 40.7831, lng: -73.9712 },
        southwest: { lat: 40.6932, lng: -74.0211 }
      },
      points: [
        {
          id: 1,
          name: "City Hall",
          category: "government",
          location: { lat: 40.7128, lng: -74.006 },
          address: "123 Main Street, Downtown"
        },
        {
          id: 2,
          name: "Central Park",
          category: "parks",
          location: { lat: 40.7821, lng: -73.9654 },
          address: "Park Avenue & 5th Street"
        },
        {
          id: 3,
          name: "Metro Station",
          category: "transit",
          location: { lat: 40.7359, lng: -73.9911 },
          address: "Union Square"
        },
        {
          id: 4,
          name: "Central Hospital",
          category: "healthcare",
          location: { lat: 40.7489, lng: -73.9680 },
          address: "789 Medical Drive"
        }
      ],
      trafficLayers: {
        congestion: true,
        incidents: true,
        construction: true
      },
      safetyLayers: {
        safetyZones: true,
        emergencyPhones: true,
        lightedPaths: true,
        policeStations: true
      }
    };
    res.json(mapData);
  });
  
  // Tourism API
  app.get("/api/tourism", (req, res) => {
    const tourismData = {
      attractions: [
        {
          id: 1,
          name: "City Art Museum",
          type: "Museum",
          rating: 4.8,
          reviews: 1245,
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
          address: "Old City Center",
          description: "Preserved historical district with architecture dating back to the 19th century, featuring boutique shops and cafes.",
          openHours: "Always Open",
          price: "Free",
          tags: ["History", "Shopping", "Architecture"]
        }
      ],
      events: [
        {
          id: 1,
          name: "Summer Music Festival",
          date: "July 15-17, 2023",
          location: "City Park Amphitheater",
          category: "Music",
          price: "$45-$120"
        },
        {
          id: 2,
          name: "Food & Wine Expo",
          date: "August 5-7, 2023",
          location: "Convention Center",
          category: "Food",
          price: "$25"
        },
        {
          id: 3,
          name: "International Film Festival",
          date: "September 10-15, 2023",
          location: "Various Theaters",
          category: "Arts",
          price: "$12 per screening"
        }
      ],
      restaurants: [
        {
          id: 1,
          name: "Riverview Bistro",
          cuisine: "French",
          rating: 4.9,
          reviews: 876,
          priceRange: "$$$",
          specialties: ["Coq au Vin", "Beef Bourguignon", "Crème Brûlée"]
        },
        {
          id: 2,
          name: "Sakura Japanese",
          cuisine: "Japanese",
          rating: 4.7,
          reviews: 654,
          priceRange: "$$",
          specialties: ["Sushi Platters", "Ramen", "Teriyaki"]
        },
        {
          id: 3,
          name: "Trattoria Italiana",
          cuisine: "Italian",
          rating: 4.8,
          reviews: 723,
          priceRange: "$$",
          specialties: ["Wood-fired Pizza", "Homemade Pasta", "Tiramisu"]
        }
      ],
      tours: [
        {
          id: 1,
          name: "City Highlights Walking Tour",
          duration: "2.5 hours",
          rating: 4.9,
          reviews: 387,
          price: "$25",
          description: "Explore the city's most famous landmarks and hidden gems with a knowledgeable local guide.",
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
          includes: ["Food tastings", "Drink samplings", "Food guide", "Recipe cards"],
          startTimes: ["11:00 AM", "5:00 PM"]
        }
      ]
    };
    res.json(tourismData);
  });
  
  // Education API
  app.get("/api/education", (req, res) => {
    const educationData = {
      schools: [
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
      ],
      colleges: [
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
      ],
      courses: [
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
        }
      ],
      resources: [
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
      ]
    };
    res.json(educationData);
  });

  // Admin API for user management
  app.get("/api/admin/users", (req, res) => {
    const usersData = [
      {
        id: 1,
        name: "John Doe",
        username: "john.doe",
        email: "john.doe@example.com",
        role: "admin",
        department: "IT",
        status: "active",
        lastLogin: "2023-03-15T14:30:00Z"
      },
      {
        id: 2,
        name: "Jane Smith",
        username: "jane.smith",
        email: "jane.smith@example.com",
        role: "user",
        department: "Finance",
        status: "active",
        lastLogin: "2023-03-14T09:45:00Z"
      },
      {
        id: 3,
        name: "Robert Johnson",
        username: "robert.johnson",
        email: "robert.johnson@example.com",
        role: "user",
        department: "Operations",
        status: "inactive",
        lastLogin: "2023-02-28T11:20:00Z"
      }
    ];
    res.json(usersData);
  });

  // Admin API for system settings
  app.get("/api/admin/settings", (req, res) => {
    const settingsData = {
      general: {
        siteName: "Smart City Management System",
        siteUrl: "https://smartcity.example.com",
        adminEmail: "admin@smartcity.example.com",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h",
        timezone: "UTC-5 (Eastern)"
      },
      api: {
        rateLimit: 100,
        throttling: true,
        caching: true,
        cacheLifetime: 60,
        loggingLevel: "Info"
      },
      database: {
        status: "Connected",
        host: "db.smartcity.example.com",
        name: "smartcity_production",
        version: "PostgreSQL 14.5",
        size: "1.2 GB",
        lastBackup: "2023-03-20T03:00:00Z"
      },
      system: {
        debugMode: false,
        maintenanceMode: false,
        sessionTimeout: 30
      }
    };
    res.json(settingsData);
  });

  // Spring Boot API endpoint info
  app.get("/api/springboot-endpoints", (req, res) => {
    const endpointsData = {
      status: "Ready for Integration",
      apiBase: "/api/v1",
      endpoints: [
        {
          name: "User Management API",
          path: "/users",
          methods: ["GET", "POST", "PUT", "DELETE"],
          ready: true
        },
        {
          name: "Smart City Data API",
          path: "/city",
          methods: ["GET", "POST", "PUT"],
          ready: true
        },
        {
          name: "Authentication API",
          path: "/auth",
          methods: ["POST"],
          ready: true
        },
        {
          name: "System Settings API",
          path: "/settings",
          methods: ["GET", "PUT"],
          ready: true
        }
      ],
      jpaEntities: [
        "User", "Role", "Permission", "City", "TrafficData", 
        "HealthcareData", "SafetyData", "EducationData", "TourismData"
      ],
      databaseConnection: {
        type: "PostgreSQL",
        status: "Configured"
      }
    };
    res.json(endpointsData);
  });

  const httpServer = createServer(app);

  return httpServer;
}
