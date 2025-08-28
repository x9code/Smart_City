import { Express, Request, Response, NextFunction } from "express";
import { log } from "./vite";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';

export function setupProxy(app: Express) {
  log("Setting up API middleware", "server");

  // Enable CORS for all routes
  app.use(cors({
    origin: true, // Allow all origins or specify as needed
    credentials: true // Allow cookies to be sent with requests
  }));

  // Create proxy middleware to forward requests to Spring Boot
  const springBootUrl = 'http://localhost:8080';
  
  // Configure proxies for Spring Boot endpoints
  app.use('/auth', createProxyMiddleware({
    target: springBootUrl,
    changeOrigin: true
    // Don't rewrite paths for auth endpoints
  }));
  
  app.use('/api/spring', createProxyMiddleware({
    target: springBootUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/api/spring': '/api' // rewrite path
    }
  }));

  // Add a route to handle the status of the services
  app.get("/api/server-status", (req: Request, res: Response) => {
    res.status(200).json({
      status: "up",
      timestamp: new Date().toISOString(),
      services: {
        express: "running",
        springBoot: "connected via proxy (http://localhost:8080)"
      }
    });
  });
}