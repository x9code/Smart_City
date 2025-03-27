import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { authService } from "./auth-service";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Base URLs for frontend and backend APIs
const SPRING_API_URL = '';   // Spring Boot runs on the same host

/**
 * Add authentication headers if user is authenticated
 */
function getAuthHeaders(contentType = false): HeadersInit {
  const headers: HeadersInit = {};
  
  if (contentType) {
    headers["Content-Type"] = "application/json";
  }
  
  const authHeader = authService.getAuthHeader();
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }
  
  return headers;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Determine if it's a Spring Boot endpoint
  const isSpringEndpoint = url.startsWith('/auth') || url.startsWith('/api/java');
  
  // Choose the correct base URL
  const apiUrl = isSpringEndpoint 
    ? `${SPRING_API_URL}${url}` 
    : url;
  
  const res = await fetch(apiUrl, {
    method,
    headers: getAuthHeaders(!!data),
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  // If we get a 401 from Spring, clear the auth data
  if (res.status === 401 && isSpringEndpoint) {
    authService.clearAuth();
  }

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    const isSpringEndpoint = url.startsWith('/auth') || url.startsWith('/api/java');
    
    // Choose the correct base URL
    const apiUrl = isSpringEndpoint 
      ? `${SPRING_API_URL}${url}` 
      : url;
    
    const res = await fetch(apiUrl, {
      headers: getAuthHeaders(),
      credentials: "include",
    });

    if (res.status === 401) {
      // Only clear auth for Spring endpoints
      if (isSpringEndpoint) {
        authService.clearAuth();
      }
      
      if (unauthorizedBehavior === "returnNull") {
        return null;
      }
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
