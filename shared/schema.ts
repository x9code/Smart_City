import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"), // "admin" or "user"
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  role: true,
});

export const loginUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;

// City Services
export const services = [
  {
    id: 1,
    name: "Healthcare Services",
    description: "Access real-time information about hospitals, clinics, and emergency services.",
    icon: "health_and_safety",
    color: "primary",
    status: "Available"
  },
  {
    id: 2,
    name: "Smart Education",
    description: "Find educational resources, schools, and learning opportunities for all ages.",
    icon: "school",
    color: "secondary",
    status: "Available"
  },
  {
    id: 3,
    name: "Tourism Guidance",
    description: "Discover attractions, events, and recommendations for tourists and locals.",
    icon: "travel_explore",
    color: "accent",
    status: "Available"
  },
  {
    id: 4,
    name: "Women Safety",
    description: "Emergency response, safe routes, and resources for women's safety.",
    icon: "shield",
    color: "danger",
    status: "Available"
  }
];

// Activity types
export type Activity = {
  id: number;
  service: string;
  icon: string;
  color: string;
  status: string;
  statusColor: string;
  time: string;
  details: string;
};

// Emergency alert types
export type EmergencyAlert = {
  id: number;
  title: string;
  time: string;
  description: string;
  type: string;
};
