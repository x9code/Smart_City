import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Add content type header for requests with data and authentication header if available
 */
function getHeaders(contentType = false): HeadersInit {
  const headers: HeadersInit = {};
  
  if (contentType) {
    headers["Content-Type"] = "application/json";
  }
  
  // Dynamically import to avoid circular dependency
  // We use require here because this is run in a function context
  try {
    const { authService } = require('./auth-service');
    const authHeader = authService.getAuthHeader();
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }
  } catch (e) {
    console.warn("Auth service not available when setting headers");
  }
  
  return headers;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: getHeaders(!!data),
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",  // Important for cookie-based session auth
  });

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
    
    const headers: HeadersInit = {};
    
    // Add authorization header if available
    try {
      const { authService } = require('./auth-service');
      const authHeader = authService.getAuthHeader();
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
    } catch (e) {
      // Auth service might not be available
    }
    
    const res = await fetch(url, {
      headers,
      credentials: "include",  // Important for cookie-based session auth
    });

    if (res.status === 401 && unauthorizedBehavior === "returnNull") {
      return null;
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
