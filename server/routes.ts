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

  const httpServer = createServer(app);

  return httpServer;
}
