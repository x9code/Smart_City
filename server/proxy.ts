import { Express, Request, Response, NextFunction } from "express";
import { log } from "./vite";
import cors from "cors";

export function setupProxy(app: Express) {
  log("Setting up API middleware", "server");

  // Enable CORS for all routes
  app.use(cors({
    origin: true, // Allow all origins or specify as needed
    credentials: true // Allow cookies to be sent with requests
  }));

  // Add a route to handle the status of the services
  app.get("/api/server-status", (req: Request, res: Response) => {
    res.status(200).json({
      status: "up",
      services: {
        express: "running",
        authentication: "active"
      }
    });
  });
}