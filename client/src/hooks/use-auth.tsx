import { createContext, ReactNode, useContext } from "react";
import {
useQuery,
useMutation,
UseMutationResult,
} from "@tanstack/react-query";
import { User as SelectUser, InsertUser, LoginUser } from "@shared/schema";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Define interface for our context
interface AuthContextType {
user: SelectUser | null;
isLoading: boolean;
error: Error | null;
loginMutation: UseMutationResult<SelectUser, Error, LoginUser>;
logoutMutation: UseMutationResult<void, Error, void>;
registerMutation: UseMutationResult<SelectUser, Error, InsertUser>;
}

// Create the context with a default value of null
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
const { toast } = useToast();

// Fetch current user data
const { 
data, 
isLoading,
error,
refetch: refetchUser
} = useQuery<SelectUser | null>({
queryKey: ["/api/user"],
queryFn: async ({ queryKey }) => {
try {
const res = await fetch(queryKey[0] as string, {
credentials: "include"
});

if (res.status === 401) {
return null;
}

if (!res.ok) {
const errorData = await res.text();
throw new Error(errorData || res.statusText);
}

return await res.json();
} catch (err) {
console.error("Error fetching user:", err);
return null;
}
},
retry: false,
refetchOnWindowFocus: false
});

  // Login mutation
  const loginMutation = useMutation<SelectUser, Error, LoginUser>({
    mutationFn: async (credentials) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (userData) => {
      refetchUser();
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation<SelectUser, Error, InsertUser>({
    mutationFn: async (userData) => {
      const res = await apiRequest("POST", "/api/register", userData);
      return await res.json();
    },
    onSuccess: (userData) => {
      refetchUser();
      
      toast({
        title: "Registration Successful",
        description: `Welcome, ${userData.name}! Your account has been created.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Could not create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      refetchUser();
      queryClient.invalidateQueries();
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error) => {
      toast({
        title: "Logout Failed",
        description: error.message || "Could not log out. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Define the context value - handle the case where data might be undefined
  const user = data === undefined ? null : data;

  // Create the context value object
  const contextValue: AuthContextType = {
    user,
    isLoading,
    error: error as Error | null, // Type assertion
    loginMutation,
    logoutMutation,
    registerMutation,
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
