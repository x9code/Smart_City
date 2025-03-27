import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { User as SelectUser, InsertUser, LoginUser } from "@shared/schema";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/auth-service";

// For Spring Boot JWT response
interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  name: string;
  roles: string[];
}

// Spring Boot login request
interface SpringLoginRequest {
  username: string;
  password: string;
}

// Spring Boot register request
interface SpringRegisterRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  roles?: string[];
}

// User type for auth context state
interface AuthUser {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
}

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<JwtResponse, Error, LoginUser>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<any, Error, InsertUser>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Initialize user from local storage
  useEffect(() => {
    try {
      const storedUser = authService.getUser();
      setUser(storedUser);
    } catch (err) {
      console.error("Error loading user from storage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login mutation using Spring Boot endpoint
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginUser) => {
      const springLoginRequest: SpringLoginRequest = {
        username: credentials.username,
        password: credentials.password
      };
      
      const res = await apiRequest("POST", "/auth/login", springLoginRequest);
      return await res.json() as JwtResponse;
    },
    onSuccess: (jwtResponse: JwtResponse) => {
      // Store JWT token in localStorage
      authService.setAuth(jwtResponse);
      
      // Update user state with user data returned from auth service
      const userData = authService.getUser();
      setUser(userData);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData?.name}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Register mutation using Spring Boot endpoint
  const registerMutation = useMutation({
    mutationFn: async (userData: InsertUser) => {
      const springRegisterRequest: SpringRegisterRequest = {
        username: userData.username,
        email: userData.username, // Using username as email
        password: userData.password,
        name: userData.name,
        roles: userData.role === "admin" ? ["admin"] : ["user"]
      };
      
      const res = await apiRequest("POST", "/auth/register", springRegisterRequest);
      return await res.json();
    },
    onSuccess: (response) => {
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please log in.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Could not create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Logout function (clears token and user data)
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // No server-side logout needed with JWT-based auth
      // Just clear local tokens and state
      authService.clearAuth();
    },
    onSuccess: () => {
      setUser(null);
      // Invalidate any cached queries that might contain user data
      queryClient.invalidateQueries();
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout Failed",
        description: error.message || "Could not log out. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
