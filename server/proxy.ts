import { Express, Request, Response, NextFunction } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { log } from "./vite";
import { IncomingMessage, ServerResponse } from "http";

export function setupProxy(app: Express) {
  log("Setting up proxy to Spring Boot backend on port 8080", "proxy");

  // Forward requests to /auth/* and /api/java/* to Spring Boot
  app.use(
    ["/auth", "/api/java"],
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/api/java": "/api", // rewrite path for Spring Boot endpoints
      },
      // Using on*: Function casting to avoid TypeScript errors with the middleware
      on: {
        proxyReq: (proxyReq: any, req: Request, res: Response) => {
          // Log proxy requests
          log(`Proxying ${req.method} ${req.url} to Spring Boot`, "proxy");
        },
        error: (err: Error, req: Request, res: Response) => {
          log(`Proxy error: ${err.message}`, "proxy");
          
          // Send a custom error response to the client
          res.writeHead(502, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({
            error: "Spring Boot service is currently unavailable. Please try again later."
          }));
        }
      }
    } as Options)
  );

  // Add a health check endpoint for the Spring Boot service
  app.get("/api/springboot-status", (req: Request, res: Response) => {
    // Make a request to a health check endpoint on the Spring Boot service
    fetch("http://localhost:8080/actuator/health")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Spring Boot service health check failed");
      })
      .then(data => {
        res.status(200).json({
          status: "up",
          details: data
        });
      })
      .catch(err => {
        res.status(503).json({
          status: "down",
          error: err.message
        });
      });
  });
}