import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { services, EmergencyAlert, Activity, insertScrapbookEntrySchema, TrafficData } from "@shared/schema";
import { setupProxy } from "./proxy";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  
  // Setup Spring Boot proxy middleware
  setupProxy(app);

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

  // Traffic data API - Bhubaneswar roads
  app.get("/api/traffic", async (req, res) => {
    try {
      const trafficData = await storage.getTrafficData();
      res.json(trafficData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch traffic data" });
    }
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

  // Map API - Bhubaneswar Smart City
  app.get("/api/map", (req, res) => {
    const mapData = {
      cityBounds: {
        northeast: { lat: 20.3461, lng: 85.8745 },
        southwest: { lat: 20.2461, lng: 85.7745 }
      },
      points: [
        {
          id: 1,
          name: "Bhubaneswar Municipal Corporation",
          category: "government",
          location: { lat: 20.2961, lng: 85.8245 },
          address: "BMC Bhawani Mall, Saheed Nagar, Bhubaneswar"
        },
        {
          id: 2,
          name: "KIIT University",
          category: "education",
          location: { lat: 20.3565, lng: 85.8193 },
          address: "KIIT Road, Patia, Bhubaneswar"
        },
        {
          id: 3,
          name: "Lingaraj Temple",
          category: "tourism",
          location: { lat: 20.2359, lng: 85.8388 },
          address: "Lingaraj Temple Road, Old Town, Bhubaneswar"
        },
        {
          id: 4,
          name: "Nandankanan Zoological Park",
          category: "parks",
          location: { lat: 20.3957, lng: 85.8228 },
          address: "Nandankanan Road, Barang, Bhubaneswar"
        },
        {
          id: 5,
          name: "Biju Patnaik International Airport",
          category: "transit",
          location: { lat: 20.2489, lng: 85.8176 },
          address: "Airport Road, Bhubaneswar"
        },
        {
          id: 6,
          name: "AIIMS Bhubaneswar",
          category: "healthcare",
          location: { lat: 20.2264, lng: 85.7838 },
          address: "Sijua, Patrapada, Bhubaneswar"
        },
        {
          id: 7,
          name: "Kalinga Stadium",
          category: "sports",
          location: { lat: 20.2725, lng: 85.8128 },
          address: "Nayapalli, Bhubaneswar"
        },
        {
          id: 8,
          name: "Janpath Road",
          category: "commercial",
          location: { lat: 20.2708, lng: 85.8424 },
          address: "Janpath, Bhubaneswar"
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
  
  // Interactive City Memory Scrapbook API
  
  // Middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: "Unauthorized" });
  };

  // Get all public scrapbook entries
  app.get("/api/scrapbook/public", async (req, res) => {
    try {
      const entries = await storage.getPublicScrapbookEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch public scrapbook entries" });
    }
  });

  // Get user's scrapbook entries (authenticated)
  app.get("/api/scrapbook/my-entries", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const entries = await storage.getScrapbookEntriesByUserId(userId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch your scrapbook entries" });
    }
  });

  // Get a specific scrapbook entry
  app.get("/api/scrapbook/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const entry = await storage.getScrapbookEntryById(id);
      if (!entry) {
        return res.status(404).json({ error: "Entry not found" });
      }

      // If entry is not public, only the owner can view it
      if (!entry.isPublic && (!req.isAuthenticated() || req.user?.id !== entry.userId)) {
        return res.status(403).json({ error: "You don't have permission to view this entry" });
      }

      res.json(entry);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scrapbook entry" });
    }
  });

  // Create a new scrapbook entry (authenticated)
  app.post("/api/scrapbook", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Validate the request body
      const result = insertScrapbookEntrySchema.safeParse({
        ...req.body,
        userId
      });

      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid entry data", 
          details: result.error.format() 
        });
      }

      const entry = await storage.createScrapbookEntry(result.data);
      res.status(201).json(entry);
    } catch (error) {
      res.status(500).json({ error: "Failed to create scrapbook entry" });
    }
  });

  // Update a scrapbook entry (authenticated, owner only)
  app.put("/api/scrapbook/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const entry = await storage.getScrapbookEntryById(id);
      if (!entry) {
        return res.status(404).json({ error: "Entry not found" });
      }

      // Check if the user is the owner of the entry
      if (req.user?.id !== entry.userId) {
        return res.status(403).json({ error: "You don't have permission to update this entry" });
      }

      // Update the entry
      const updatedEntry = await storage.updateScrapbookEntry(id, req.body);
      res.json(updatedEntry);
    } catch (error) {
      res.status(500).json({ error: "Failed to update scrapbook entry" });
    }
  });

  // Delete a scrapbook entry (authenticated, owner only)
  app.delete("/api/scrapbook/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const entry = await storage.getScrapbookEntryById(id);
      if (!entry) {
        return res.status(404).json({ error: "Entry not found" });
      }

      // Check if the user is the owner of the entry
      if (req.user?.id !== entry.userId) {
        return res.status(403).json({ error: "You don't have permission to delete this entry" });
      }

      // Delete the entry
      const success = await storage.deleteScrapbookEntry(id);
      if (success) {
        res.status(204).end();
      } else {
        res.status(500).json({ error: "Failed to delete scrapbook entry" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete scrapbook entry" });
    }
  });

  // Tourism API - Bhubaneswar
  app.get("/api/tourism", (req, res) => {
    const tourismData = {
      attractions: [
        {
          id: 1,
          name: "Lingaraj Temple",
          type: "Temple",
          rating: 4.8,
          reviews: 2145,
          address: "Lingaraj Temple Road, Old Town, Bhubaneswar",
          description: "One of the oldest and largest temples in Bhubaneswar dedicated to Lord Shiva, featuring intricate Kalinga architecture dating back to the 11th century.",
          openHours: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
          price: "Free",
          tags: ["Religious", "Architecture", "Cultural"],
          image: "https://images.unsplash.com/photo-1592456966958-b8ba601a3793?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          name: "Nandankanan Zoological Park",
          type: "Zoo & Botanical Garden",
          rating: 4.6,
          reviews: 3156,
          address: "Nandankanan Road, Barang, Bhubaneswar",
          description: "A 400-hectare zoo and botanical garden featuring a diverse collection of animals including the famous white tigers, reptiles, and an extensive botanical collection.",
          openHours: "7:30 AM - 5:30 PM (Closed on Mondays)",
          price: "₹50 for adults, ₹25 for children",
          tags: ["Wildlife", "Family-Friendly", "Outdoor"],
          image: "https://images.unsplash.com/photo-1590167091916-4a49f1701022?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 3,
          name: "Udayagiri and Khandagiri Caves",
          type: "Historical Site",
          rating: 4.7,
          reviews: 1879,
          address: "Khandagiri, Bhubaneswar",
          description: "Ancient Jain rock-cut caves dating back to the 1st century BCE, featuring intricate carvings and historical inscriptions.",
          openHours: "8:00 AM - 5:00 PM",
          price: "₹25 for Indians, ₹300 for foreigners",
          tags: ["History", "Architecture", "Cultural"],
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Udayagiri_and_Khandagiri_Caves.jpg/1024px-Udayagiri_and_Khandagiri_Caves.jpg"
        },
        {
          id: 4,
          name: "Ekamra Haat",
          type: "Market",
          rating: 4.5,
          reviews: 1245,
          address: "Forest Park, Unit 6, Bhubaneswar",
          description: "Traditional handicraft market showcasing Odisha's rich artistic heritage with handloom textiles, appliqué work, stone crafts, and traditional jewelry.",
          openHours: "10:00 AM - 9:00 PM",
          price: "Free entry",
          tags: ["Shopping", "Cultural", "Handicrafts"],
          image: "https://images.unsplash.com/photo-1607874963930-b4545317b3c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 5,
          name: "ISKCON Temple",
          type: "Temple",
          rating: 4.8,
          reviews: 1656,
          address: "NH-5, IRC Village, Nayapalli, Bhubaneswar",
          description: "Modern temple dedicated to Lord Krishna with beautiful architecture, spiritual ambiance, and regular cultural programs.",
          openHours: "4:30 AM - 1:00 PM, 4:00 PM - 9:00 PM",
          price: "Free",
          tags: ["Religious", "Architecture", "Spiritual"],
          image: "https://odishatourism.gov.in/content/dam/tourism/home/activities/spiritual/iskcon-temple-bhubaneshwar/gallery/ISKCON-Temple-Bhubaneshwar-Gallery-2.jpg"
        },
        {
          id: 6,
          name: "Rajarani Temple",
          type: "Temple",
          rating: 4.7,
          reviews: 1432,
          address: "Rajarani Temple Road, Old Town, Bhubaneswar",
          description: "11th-century temple renowned for its exquisite sculptures and unique architecture without any presiding deity, also known as 'love temple'.",
          openHours: "6:00 AM - 6:00 PM",
          price: "₹25 for Indians, ₹300 for foreigners",
          tags: ["Religious", "Architecture", "Historical"],
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/The_Rajarani_Temple_at_Bhubaneswar.jpg/1024px-The_Rajarani_Temple_at_Bhubaneswar.jpg"
        },
        {
          id: 7,
          name: "Dhauli Shanti Stupa",
          type: "Historical Monument",
          rating: 4.6,
          reviews: 1245,
          address: "Dhauli Hills, Bhubaneswar",
          description: "Peace pagoda built in the 1970s atop Dhauli hills where Emperor Ashoka converted to Buddhism after the Kalinga War, with panoramic city views.",
          openHours: "7:00 AM - 7:00 PM",
          price: "Free",
          tags: ["Historical", "Buddhist", "Scenic Views"],
          image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Dhauligiri_Shanti_Stupa.jpg"
        },
        {
          id: 8,
          name: "Mukteswara Temple",
          type: "Temple",
          rating: 4.8,
          reviews: 1356,
          address: "Lewis Road, Old Town, Bhubaneswar",
          description: "10th-century temple considered a gem of Odia architecture with its intricate stone archway (Torana) and stunning carvings - often called 'gem of Odisha architecture'.",
          openHours: "6:00 AM - 7:00 PM",
          price: "Free",
          tags: ["Religious", "Architecture", "Photography"],
          image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Mukteshwar_Temple.jpg"
        },
        {
          id: 9,
          name: "Museum of Tribal Arts & Artifacts",
          type: "Museum",
          rating: 4.4,
          reviews: 864,
          address: "CRPF Square, Bhubaneswar",
          description: "Comprehensive museum showcasing the rich cultural heritage of Odisha's 62 tribal communities through artifacts, tools, jewelry, and traditional housing models.",
          openHours: "10:00 AM - 5:00 PM (Closed on Mondays)",
          price: "₹20 for Indians, ₹200 for foreigners",
          tags: ["Cultural", "Educational", "Tribal"],
          image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Tribal_Museum_Collection_at_Bhubaneswar.JPG"
        }
      ],
      events: [
        {
          id: 1,
          name: "Ekamra Walks - Old Town Heritage Walk",
          date: "Every Sunday Morning",
          location: "Mukteswar Temple, Old Town",
          category: "Heritage",
          price: "Free",
          description: "Guided walk through the temple heritage of Bhubaneswar, covering ancient temples and historic sites.",
          image: "https://images.unsplash.com/photo-1509024644558-2f56ce76c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          name: "Konark Dance Festival",
          date: "December 1-5, 2025",
          location: "Konark Sun Temple (near Bhubaneswar)",
          category: "Cultural",
          price: "₹100-₹500",
          description: "Annual classical dance festival showcasing Odissi, Bharatanatyam, Kathak and other classical Indian dance forms.",
          image: "https://images.unsplash.com/photo-1535359056830-d4badde79747?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 3,
          name: "International Craft Mela",
          date: "January 15-25, 2026",
          location: "Exhibition Ground, Unit-III, Bhubaneswar",
          category: "Arts & Crafts",
          price: "₹50 entry",
          description: "Annual handicraft exhibition featuring artisans from across India and abroad displaying crafts, textiles, and traditional art forms.",
          image: "https://images.unsplash.com/photo-1572863141204-83031c71bd7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      hotels: [
        {
          id: 1,
          name: "Mayfair Lagoon",
          category: "5-Star",
          rating: 4.9,
          reviews: 1876,
          address: "8-B, Jaydev Vihar, Bhubaneswar",
          priceRange: "₹7,500-₹25,000",
          amenities: ["Swimming Pool", "Spa", "Multiple Restaurants", "Fitness Center", "Business Center"],
          description: "Luxury resort-style hotel set amidst lush greenery with world-class amenities and Odia architectural influences.",
          image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/c8/3d/b5/mayfair-lagoon.jpg?w=1200&h=-1&s=1"
        },
        {
          id: 2,
          name: "Swosti Premium",
          category: "4-Star",
          rating: 4.7,
          reviews: 1254,
          address: "P-1, Jaydev Vihar, Bhubaneswar",
          priceRange: "₹4,500-₹12,000",
          amenities: ["Swimming Pool", "Multiple Dining Options", "Spa", "Fitness Center"],
          description: "Contemporary hotel offering modern amenities with a touch of traditional Odia hospitality and excellent service.",
          image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/39/85/75/swosti-premium.jpg?w=1200&h=-1&s=1"
        },
        {
          id: 3,
          name: "Trident Bhubaneswar",
          category: "5-Star",
          rating: 4.8,
          reviews: 1432,
          address: "CB-1, Nayapalli, Bhubaneswar",
          priceRange: "₹6,000-₹18,000",
          amenities: ["Swimming Pool", "Garden", "Restaurant", "Fitness Center", "Business Services"],
          description: "Elegant hotel with beautiful gardens, offering a blend of traditional charm and modern comfort near major business districts.",
          image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/a3/75/90/trident-bhubaneswar.jpg?w=1200&h=-1&s=1"
        },
        {
          id: 4,
          name: "Ginger Bhubaneswar",
          category: "3-Star",
          rating: 4.3,
          reviews: 887,
          address: "Plot No. GN-2/115, Gadakana, Bhubaneswar",
          priceRange: "₹2,500-₹4,500",
          amenities: ["Restaurant", "Free Wi-Fi", "Meeting Rooms", "Modern Rooms"],
          description: "Smart, budget-friendly hotel offering clean and comfortable accommodations with essential amenities for business and leisure travelers.",
          image: "https://www.gingerhotels.com/content/dam/tajhotels/ginger/New-Properties/bhubneshwar/16x9/RoomRender-king-1.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg"
        },
        {
          id: 5,
          name: "Lemon Tree Premier",
          category: "4-Star",
          rating: 4.6,
          reviews: 978,
          address: "Plot No. X-1, Near Loyola School, Bhubaneswar",
          priceRange: "₹4,000-₹8,000",
          amenities: ["Swimming Pool", "Fitness Center", "Restaurant", "Business Center", "Spa"],
          description: "Upscale hotel with contemporary design, offering a perfect blend of business and leisure facilities in a convenient location.",
          image: "https://www.lemontreehotels.com/Uploads/HotelImageGallery/Lemon-Tree-Premier-Bhubaneswar-Photos/Exterior.jpg"
        },
        {
          id: 6,
          name: "The New Marrion",
          category: "4-Star",
          rating: 4.5,
          reviews: 756,
          address: "6 Janpath, Bhubaneswar",
          priceRange: "₹3,800-₹7,200",
          amenities: ["Multiple Restaurants", "Swimming Pool", "Business Center", "Banquet Hall"],
          description: "Well-established city hotel with traditional hospitality, offering spacious rooms and excellent dining options in the heart of Bhubaneswar.",
          image: "https://r1imghtlak.mmtcdn.com/c2c7f7a6fca711eb83520242ac110002.jpeg"
        },
        {
          id: 7,
          name: "Empires Hotel",
          category: "3-Star",
          rating: 4.2,
          reviews: 625,
          address: "Plot No. 1B, Saheed Nagar, Bhubaneswar",
          priceRange: "₹2,800-₹4,000",
          amenities: ["Restaurant", "Room Service", "Conference Facility", "Free Parking"],
          description: "Business-oriented hotel offering comfortable accommodations with quality service at affordable rates in a central location.",
          image: "https://r1imghtlak.mmtcdn.com/1bd97dc4bbcd11e8a07d0a4cef95d023.jpg"
        }
      ],
      restaurants: [
        {
          id: 1,
          name: "Dalma",
          cuisine: "Odia",
          rating: 4.8,
          reviews: 1276,
          address: "Plot No. 1002, Near Ram Mandir, Nayapalli, Bhubaneswar",
          priceRange: "₹₹",
          specialties: ["Dalma", "Pakhala", "Fish Curry", "Chhena Poda"],
          description: "Authentic Odia cuisine restaurant serving traditional dishes in a warm, cultural setting.",
          image: "https://content3.jdmagicbox.com/comp/bhubaneshwar/z8/0674px674.x674.180315162748.k7z8/catalogue/dalma-nayapalli-bhubaneshwar-odiya-restaurants-1d38hfp.jpg"
        },
        {
          id: 2,
          name: "Odisha Hotel",
          cuisine: "Odia",
          rating: 4.6,
          reviews: 954,
          address: "Kharvel Nagar, Master Canteen Square, Bhubaneswar",
          priceRange: "₹",
          specialties: ["Mutton Curry", "Fish Thali", "Prawn Dishes", "Rice and Dalma"],
          description: "No-frills local favorite serving authentic Odia cuisine at reasonable prices, known for seafood specialties.",
          image: "https://content.jdmagicbox.com/comp/bhubaneshwar/g6/0674px674.x674.220331112330.w1g6/catalogue/odisha-hotel-master-canteen-bhubaneshwar-restaurants-g8xpxz01k7.jpg"
        },
        {
          id: 3,
          name: "Kanika - Mayfair Lagoon",
          cuisine: "Multi-cuisine",
          rating: 4.9,
          reviews: 823,
          priceRange: "₹₹₹",
          address: "Mayfair Lagoon, 8-B, Jaydev Vihar, Bhubaneswar",
          specialties: ["Odia Thali", "Seafood", "Traditional Desserts", "Royal Odia Cuisine"],
          description: "Fine dining restaurant offering royal Odia cuisine with contemporary presentation in luxurious settings.",
          image: "https://media-cdn.tripadvisor.com/media/photo-s/04/40/6e/a3/kanika-at-mayfair-lagoon.jpg"
        },
        {
          id: 4,
          name: "The Silver Spoon",
          cuisine: "North Indian",
          rating: 4.5,
          reviews: 683,
          priceRange: "₹₹",
          address: "Plot No. 1610, Nayapalli, Bhubaneswar",
          specialties: ["Butter Chicken", "Paneer Dishes", "Tandoori Platter", "Biryani"],
          description: "Popular North Indian restaurant known for its flavorful curries, tandoori specialties, and comfortable dining atmosphere.",
          image: "https://media-cdn.tripadvisor.com/media/photo-s/1a/50/4e/fe/silver-spoon.jpg"
        },
        {
          id: 5,
          name: "Tandoor - The Clay Oven",
          cuisine: "Multi-cuisine",
          rating: 4.7,
          reviews: 754,
          priceRange: "₹₹",
          address: "Plot No. 214, District Center, Chandrasekharpur, Bhubaneswar",
          specialties: ["Tandoori Dishes", "Kebabs", "Curries", "Naan Varieties"],
          description: "Family-friendly restaurant serving North Indian, Chinese and Continental cuisines in a relaxed setting with outdoor seating.",
          image: "https://content.jdmagicbox.com/comp/bhubaneshwar/x1/0674px674.x674.180319160317.r1x1/catalogue/tandoor-clay-oven-saheed-nagar-bhubaneshwar-continental-restaurants-1x6qekz.jpg"
        },
        {
          id: 6,
          name: "Zaika Restaurant",
          cuisine: "Bengali & Odia",
          rating: 4.6,
          reviews: 542,
          priceRange: "₹₹",
          address: "IRC Village, Bhubaneswar",
          specialties: ["Bengali Fish Curry", "Odia Thali", "Prawn Malai Curry", "Rice Dishes"],
          description: "Local favorite known for authentic Bengali and Odia cuisines, serving seafood specialties and traditional regional dishes.",
          image: "https://lh3.googleusercontent.com/p/AF1QipPJNQEPZHFcYYSGsJF9ZbJ3oBV0EHhA-vc3GyNC=s680-w680-h510"
        }
      ],
      tours: [
        {
          id: 1,
          name: "Bhubaneswar Temple Trail",
          duration: "4 hours",
          rating: 4.9,
          reviews: 487,
          price: "₹1,200 per person",
          description: "Guided tour of Bhubaneswar's famous temples including Lingaraj, Mukteswar, Rajarani, and Parsurameswar temples with historical insights.",
          includes: ["Professional guide", "Transportation", "Bottled water", "Historical insights"],
          startTimes: ["9:00 AM", "2:00 PM"],
          image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          name: "Bhubaneswar-Puri-Konark Golden Triangle Tour",
          duration: "Full day (8-10 hours)",
          rating: 4.8,
          reviews: 356,
          price: "₹3,500 per person",
          description: "Comprehensive tour covering Bhubaneswar temples, Konark Sun Temple (UNESCO site), and Jagannath Temple in Puri.",
          includes: ["Air-conditioned vehicle", "Professional guide", "Lunch", "Monument entrance fees", "Hotel pickup and drop-off"],
          startTimes: ["7:00 AM"],
          image: "https://images.unsplash.com/photo-1589813533338-27f8aa955c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 3,
          name: "Chandaka Elephant Sanctuary & Tribal Village Tour",
          duration: "6 hours",
          rating: 4.7,
          reviews: 198,
          price: "₹2,200 per person",
          description: "Nature and cultural tour combining wildlife exploration at Chandaka Sanctuary with visits to tribal villages to experience local culture.",
          includes: ["Naturalist guide", "Transportation", "Village visit", "Traditional snacks", "Bottled water"],
          startTimes: ["8:30 AM", "1:00 PM"],
          image: "https://images.unsplash.com/photo-1566593284317-76c8dd336ac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      facilities: [
        {
          id: 1,
          name: "Biju Patnaik International Airport",
          type: "Transportation",
          address: "Airport Road, Bhubaneswar",
          description: "Modern international airport connecting Bhubaneswar to major Indian cities and select international destinations.",
          amenities: ["Taxi Services", "Restaurants", "Lounges", "Shopping"],
          rating: 4.4,
          reviews: 3452,
          image: "https://www.airports-india.org.in/wp-content/uploads/2018/02/Biju-Patnaik-International-Airport-Bhubaneswar.jpg"
        },
        {
          id: 2,
          name: "Esplanade One Mall",
          type: "Shopping",
          address: "Rasulgarh Square, Bhubaneswar",
          description: "Modern shopping mall with national and international brands, food court, multiplex, and entertainment options.",
          amenities: ["Shops", "Food Court", "Cinema", "Gaming Zone"],
          rating: 4.5,
          reviews: 2876,
          image: "https://content.jdmagicbox.com/comp/bhubaneshwar/f8/0674px674.x674.171114121511.q9f8/catalogue/esplanade-one-rasulgarh-bhubaneshwar-shopping-malls-u8grhpnhil.jpg"
        },
        {
          id: 3,
          name: "Bhubaneswar Railway Station",
          type: "Transportation",
          address: "Master Canteen Area, Bhubaneswar",
          description: "Major railway station connecting Bhubaneswar to cities across India with multiple platforms and passenger amenities.",
          amenities: ["Waiting Rooms", "Food Stalls", "Booking Counters", "Taxi Stand"],
          rating: 4.0,
          reviews: 3921,
          image: "https://assets.traveltriangle.com/blog/wp-content/uploads/2019/01/Bhubaneshwar-Railway-Station.jpg"
        },
        {
          id: 4,
          name: "Tourist Information Center",
          type: "Service",
          address: "Lewis Road, Bhubaneswar",
          description: "Official tourism information center providing travel information, maps, guides, and booking assistance for tourists.",
          amenities: ["Information Desk", "Brochures", "Tour Booking", "Guide Services"],
          rating: 4.3,
          reviews: 562,
          image: "https://images.unsplash.com/photo-1625055930842-b680695e0e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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

  // User Onboarding API
  app.post("/api/user-onboarding", (req, res) => {
    // In a real app, this would save to a database
    // Here we just return success
    console.log("Saving user onboarding data:", req.body);
    res.status(200).json({ 
      success: true, 
      message: "User onboarding preferences saved successfully"
    });
  });

  app.get("/api/user-onboarding/:userId", (req, res) => {
    // Mock data - in a real app, this would be fetched from a database
    const { userId } = req.params;
    
    res.status(200).json({
      userId: parseInt(userId),
      completed: true,
      personalInfo: {
        fullName: "John Doe",
        address: "123 Main St, Smart City, SC 12345",
        phone: "+1-555-123-4567",
        email: "john.doe@example.com",
        preferredLanguage: "english"
      },
      services: {
        traffic: true,
        healthcare: true,
        safety: true,
        education: false,
        tourism: true,
        map: true
      },
      preferences: {
        darkMode: false,
        highContrast: false,
        textSize: "medium",
        defaultView: "dashboard"
      }
    });
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
        },
        {
          name: "User Onboarding API",
          path: "/onboarding",
          methods: ["GET", "POST", "PUT"],
          ready: true
        }
      ],
      jpaEntities: [
        "User", "Role", "Permission", "City", "TrafficData", 
        "HealthcareData", "SafetyData", "EducationData", "TourismData",
        "UserOnboarding", "UserPreference"
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
