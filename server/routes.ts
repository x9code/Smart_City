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

  const httpServer = createServer(app);

  return httpServer;
}
