import { 
  users, type User, type InsertUser,
  scrapbookEntries, type ScrapbookEntry, type InsertScrapbookEntry,
  type TrafficData, type TrafficIncident
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Scrapbook methods
  createScrapbookEntry(entry: InsertScrapbookEntry): Promise<ScrapbookEntry>;
  getScrapbookEntryById(id: number): Promise<ScrapbookEntry | undefined>;
  getScrapbookEntriesByUserId(userId: number): Promise<ScrapbookEntry[]>;
  getPublicScrapbookEntries(): Promise<ScrapbookEntry[]>;
  updateScrapbookEntry(id: number, entry: Partial<InsertScrapbookEntry>): Promise<ScrapbookEntry | undefined>;
  deleteScrapbookEntry(id: number): Promise<boolean>;
  
  // Traffic data methods
  getTrafficData(): Promise<TrafficData>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private scrapbookEntries: Map<number, ScrapbookEntry>;
  currentId: number;
  currentScrapbookId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.scrapbookEntries = new Map();
    this.currentId = 1;
    this.currentScrapbookId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    
    // Add default test users
    this.createUser({
      username: "admin@smartcity.com",
      password: "adminpassword123",
      name: "Admin User",
      role: "admin"
    });
    
    this.createUser({
      username: "user@smartcity.com",
      password: "userpassword123",
      name: "Regular User",
      role: "user"
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    // Ensure role is never undefined by providing default
    const userData = {
      ...insertUser,
      role: insertUser.role || "user",
      id
    };
    const user: User = userData;
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Scrapbook Methods
  async createScrapbookEntry(entry: InsertScrapbookEntry): Promise<ScrapbookEntry> {
    const id = this.currentScrapbookId++;
    const now = new Date();
    
    // Ensure all properties are either set properly or set to null
    const scrapbookEntry: ScrapbookEntry = {
      id,
      userId: entry.userId,
      title: entry.title,
      description: entry.description || null,
      location: entry.location,
      locationCoordinates: entry.locationCoordinates || null,
      date: entry.date || now,
      imageUrl: entry.imageUrl || null,
      tags: entry.tags || null,
      rating: entry.rating || null,
      isPublic: entry.isPublic ?? false,
      createdAt: now
    };
    
    this.scrapbookEntries.set(id, scrapbookEntry);
    return scrapbookEntry;
  }

  async getScrapbookEntryById(id: number): Promise<ScrapbookEntry | undefined> {
    return this.scrapbookEntries.get(id);
  }

  async getScrapbookEntriesByUserId(userId: number): Promise<ScrapbookEntry[]> {
    return Array.from(this.scrapbookEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getPublicScrapbookEntries(): Promise<ScrapbookEntry[]> {
    return Array.from(this.scrapbookEntries.values())
      .filter(entry => entry.isPublic)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async updateScrapbookEntry(id: number, entry: Partial<InsertScrapbookEntry>): Promise<ScrapbookEntry | undefined> {
    const existingEntry = this.scrapbookEntries.get(id);
    if (!existingEntry) {
      return undefined;
    }

    const updatedEntry: ScrapbookEntry = {
      ...existingEntry,
      ...entry,
    };
    this.scrapbookEntries.set(id, updatedEntry);
    return updatedEntry;
  }

  async deleteScrapbookEntry(id: number): Promise<boolean> {
    return this.scrapbookEntries.delete(id);
  }
  
  // Traffic data method
  async getTrafficData(): Promise<TrafficData> {
    // Simulate real-time traffic data for Bhubaneswar
    const trafficIncidents: TrafficIncident[] = [
      {
        id: 1,
        type: "Accident",
        location: "Janpath Road & Saheed Nagar",
        reportedTime: "08:45 AM",
        severity: "Major",
        status: "Emergency services on scene",
      },
      {
        id: 2,
        type: "Construction",
        location: "NH16 near Rasulgarh Square",
        reportedTime: "All day",
        severity: "Moderate",
        status: "Lane closure",
      },
      {
        id: 3,
        type: "Road Closure",
        location: "Master Canteen Road",
        reportedTime: "All day",
        severity: "Major",
        status: "Closed until further notice",
      },
      {
        id: 4,
        type: "Construction",
        location: "Patia - KIIT Road",
        reportedTime: "9:00 AM - 5:00 PM",
        severity: "Minor",
        status: "Smart city development work",
      },
      {
        id: 5,
        type: "Accident",
        location: "Nandankanan Road",
        reportedTime: "07:15 AM",
        severity: "Moderate",
        status: "Traffic regulated",
      },
    ];
    
    // Generate traffic flow data points
    const now = new Date();
    const trafficFlowData = Array.from({ length: 24 }, (_, i) => {
      const hour = i % 24;
      let volume = 0;
      
      // Simulate morning and evening rush hours
      if (hour >= 7 && hour <= 10) {
        volume = 800 + Math.floor(Math.random() * 1200); // Morning rush
      } else if (hour >= 16 && hour <= 19) {
        volume = 1000 + Math.floor(Math.random() * 1500); // Evening rush
      } else if (hour >= 11 && hour <= 15) {
        volume = 500 + Math.floor(Math.random() * 700); // Midday
      } else {
        volume = 100 + Math.floor(Math.random() * 400); // Off-peak
      }
      
      return {
        time: `${hour}:00`,
        volume
      };
    });
    
    return {
      congestion: {
        downtown: "47%",
        uptown: "32%",
        suburban: "18%",
        highways: "25%"
      },
      incidents: trafficIncidents,
      trafficFlowData
    };
  }
}

export const storage = new MemStorage();
