import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { insertUserSchema } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, UserPlus, Shield } from "lucide-react";

// Extended schema for login with remember me option
const loginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

// Extended schema for registration with additional validation
const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  role: z.enum(["user", "admin"]).default("user"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      role: "user",
    },
  });

  function onLoginSubmit(data: LoginFormValues) {
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  }

  function onRegisterSubmit(data: RegisterFormValues) {
    // Omit confirmPassword as it's not in our schema
    const { confirmPassword, ...userData } = data;
    
    // Since we don't have an email field in our schema, we just use the data as is
    registerMutation.mutate(userData);
  }

  function handleRoleSwitch() {
    const currentRole = registerForm.getValues("role");
    registerForm.setValue("role", currentRole === "admin" ? "user" : "admin");
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Left side (animated background) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-teal-500 to-purple-600 animate-gradient-x items-center justify-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-lg rotate-45 blur-lg"></div>
        
        <div className="relative z-10 text-white p-12 max-w-md">
          <div className="flex items-center mb-6">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold">Smart City</h1>
          </div>
          
          <h2 className="text-2xl font-medium mb-4">Building intelligent communities for a connected future</h2>
          <p className="text-lg mb-8 text-white/80">An integrated platform to manage and monitor all aspects of urban life in real-time.</p>
          
          <div className="grid grid-cols-2 gap-5 mb-8">
            <div className="bg-white/15 backdrop-blur-sm p-5 rounded-xl flex flex-col items-center shadow-lg transform transition-all hover:scale-105">
              <span className="material-icons text-3xl mb-3">traffic</span>
              <span className="text-sm font-medium">Traffic Monitoring</span>
            </div>
            <div className="bg-white/15 backdrop-blur-sm p-5 rounded-xl flex flex-col items-center shadow-lg transform transition-all hover:scale-105">
              <span className="material-icons text-3xl mb-3">health_and_safety</span>
              <span className="text-sm font-medium">Healthcare Services</span>
            </div>
            <div className="bg-white/15 backdrop-blur-sm p-5 rounded-xl flex flex-col items-center shadow-lg transform transition-all hover:scale-105">
              <span className="material-icons text-3xl mb-3">school</span>
              <span className="text-sm font-medium">Smart Education</span>
            </div>
            <div className="bg-white/15 backdrop-blur-sm p-5 rounded-xl flex flex-col items-center shadow-lg transform transition-all hover:scale-105">
              <span className="material-icons text-3xl mb-3">travel_explore</span>
              <span className="text-sm font-medium">Tourism Guidance</span>
            </div>
          </div>
          
          <div className="flex items-center mt-12">
            <div className="flex -space-x-2 mr-4">
              <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs font-bold">JD</div>
              <div className="w-8 h-8 rounded-full bg-teal-400 border-2 border-white flex items-center justify-center text-xs font-bold">AK</div>
              <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-xs font-bold">TS</div>
            </div>
            <p className="text-sm text-white/80">Join thousands of users managing smart cities worldwide</p>
          </div>
        </div>
      </div>

      {/* Right side (auth forms) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-5">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
            <p className="mt-2 text-slate-500">Access the Smart City Management System</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="data-[state=active]:bg-blue-50 data-[state=active]:shadow-sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-blue-50 data-[state=active]:shadow-sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center text-slate-700">
                          <Mail className="h-4 w-4 mr-2 text-slate-500" />
                          Email Address
                        </FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="your@email.com" 
                              {...field}
                              className="pl-10 border-slate-300 focus:border-primary"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center text-slate-700">
                          <Lock className="h-4 w-4 mr-2 text-slate-500" />
                          Password
                        </FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                          </div>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field}
                              className="pl-10 border-slate-300 focus:border-primary"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between pt-2">
                    <FormField
                      control={loginForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              id="remember-me"
                              className="text-primary focus:ring-primary"
                            />
                          </FormControl>
                          <FormLabel htmlFor="remember-me" className="text-sm cursor-pointer text-slate-600">
                            Remember me
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
                      Forgot password?
                    </a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md" 
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign in to Account"}
                  </Button>
                  
                  <div className="text-center mt-6">
                    <p className="text-sm text-slate-500">
                      Demo credentials: 
                      <span className="font-medium text-slate-700 ml-1">admin@smartcity.com / adminpassword123</span>
                    </p>
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-5">
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center text-slate-700">
                          <User className="h-4 w-4 mr-2 text-slate-500" />
                          Full Name
                        </FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="h-5 w-5 text-slate-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field}
                              className="pl-10 border-slate-300 focus:border-primary"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="flex items-center text-slate-700">
                          <Mail className="h-4 w-4 mr-2 text-slate-500" />
                          Email Address
                        </FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400" />
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="your@email.com" 
                              {...field}
                              className="pl-10 border-slate-300 focus:border-primary"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-slate-700">
                            <Lock className="h-4 w-4 mr-2 text-slate-500" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field}
                              className="border-slate-300 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-slate-700">
                            <Lock className="h-4 w-4 mr-2 text-slate-500" />
                            Confirm
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field}
                              className="border-slate-300 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg mt-2 border border-slate-200">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${registerForm.watch("role") === "admin" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"}`}>
                        <span className="material-icons">{registerForm.watch("role") === "admin" ? "admin_panel_settings" : "person"}</span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">
                          {registerForm.watch("role") === "admin" ? "Admin Account" : "User Account"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {registerForm.watch("role") === "admin" ? "Full access to all system controls" : "Access to city services and data"}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full mt-4 border-slate-300 text-slate-700"
                      onClick={handleRoleSwitch}
                    >
                      Switch to {registerForm.watch("role") === "admin" ? "User" : "Admin"} Account
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md" 
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating Account..." : "Create New Account"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
