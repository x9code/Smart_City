import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { 
  Settings, 
  Database, 
  ServerCrash, 
  Shield, 
  Globe,
  Sliders, 
  Bell, 
  Mail, 
  Cog, 
  Save, 
  RefreshCw, 
  CloudUpload, 
  HardDrive, 
  Cpu, 
  Clock,
  ToggleLeft,
  ToggleRight,
  Laptop,
  Link,
  FileJson,
  Braces,
  Wrench
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("system");
  const [formData, setFormData] = useState({
    siteName: "Smart City Management System",
    siteUrl: "https://smartcity.example.com",
    adminEmail: "admin@smartcity.example.com",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    timezone: "UTC-5 (Eastern)",
    sessionTimeout: "30",
    defaultLanguage: "English",
    loggingLevel: "Info",
    systemEmail: "system@smartcity.example.com",
    emailHost: "smtp.example.com",
    emailPort: "587",
    maintenanceMode: false,
    debugMode: false,
    apiThrottling: true,
    apiRateLimit: "100",
    cacheEnabled: true,
    cacheLifetime: "60"
  });

  // Check if user is admin, if not redirect to dashboard
  if (user && user.role !== "admin") {
    setLocation("/");
    return null;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev]
    }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save settings to the backend
    console.log("Saving settings:", formData);
    // Show success message
    alert("Settings saved successfully");
  };

  // System statistics
  const systemStats = [
    { name: "CPU Usage", value: "32%", icon: <Cpu className="h-5 w-5" /> },
    { name: "Memory Usage", value: "1.8 GB / 4 GB", icon: <HardDrive className="h-5 w-5" /> },
    { name: "Disk Space", value: "75.4 GB / 100 GB", icon: <Database className="h-5 w-5" /> },
    { name: "Uptime", value: "42 days, 5 hours", icon: <Clock className="h-5 w-5" /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - desktop navigation */}
      <Sidebar />
      
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMobileMenuToggle={toggleMobileMenu} title="System Settings" />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          {/* Spring Boot Integration Alert */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <Laptop className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">Spring Boot Integration Ready</h3>
                  <p className="text-sm text-slate-600">
                    This settings module is configured to connect with Spring Boot backend services. System configuration can be managed through the PostgreSQL database.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* System Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {systemStats.map((stat, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">{stat.name}</p>
                      <h3 className="text-xl font-bold text-slate-800">{stat.value}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index === 0 ? "bg-blue-100 text-blue-600" : 
                      index === 1 ? "bg-green-100 text-green-600" : 
                      index === 2 ? "bg-amber-100 text-amber-600" : 
                      "bg-purple-100 text-purple-600"
                    }`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Settings Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="w-full flex bg-white p-1 rounded-lg shadow mb-6">
              <TabsTrigger value="system" className="flex-1 py-3">
                <Cog className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
              <TabsTrigger value="api" className="flex-1 py-3">
                <Braces className="h-4 w-4 mr-2" />
                API & Integration
              </TabsTrigger>
              <TabsTrigger value="database" className="flex-1 py-3">
                <Database className="h-4 w-4 mr-2" />
                Database
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex-1 py-3">
                <Wrench className="h-4 w-4 mr-2" />
                Maintenance
              </TabsTrigger>
            </TabsList>
            
            {/* System Settings Tab */}
            <TabsContent value="system" className="mt-0">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure core system settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveSettings}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="siteName" className="block text-sm font-medium text-slate-700 mb-1">
                            Site Name
                          </label>
                          <Input 
                            id="siteName" 
                            name="siteName" 
                            value={formData.siteName}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="siteUrl" className="block text-sm font-medium text-slate-700 mb-1">
                            Site URL
                          </label>
                          <Input 
                            id="siteUrl" 
                            name="siteUrl" 
                            value={formData.siteUrl}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="adminEmail" className="block text-sm font-medium text-slate-700 mb-1">
                            Admin Email
                          </label>
                          <Input 
                            id="adminEmail" 
                            name="adminEmail" 
                            type="email"
                            value={formData.adminEmail}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="defaultLanguage" className="block text-sm font-medium text-slate-700 mb-1">
                            Default Language
                          </label>
                          <select
                            id="defaultLanguage"
                            name="defaultLanguage"
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.defaultLanguage}
                            onChange={handleInputChange}
                          >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Chinese">Chinese</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="dateFormat" className="block text-sm font-medium text-slate-700 mb-1">
                            Date Format
                          </label>
                          <select
                            id="dateFormat"
                            name="dateFormat"
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.dateFormat}
                            onChange={handleInputChange}
                          >
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="timeFormat" className="block text-sm font-medium text-slate-700 mb-1">
                            Time Format
                          </label>
                          <select
                            id="timeFormat"
                            name="timeFormat"
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.timeFormat}
                            onChange={handleInputChange}
                          >
                            <option value="12h">12-hour (AM/PM)</option>
                            <option value="24h">24-hour</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="timezone" className="block text-sm font-medium text-slate-700 mb-1">
                            Timezone
                          </label>
                          <select
                            id="timezone"
                            name="timezone"
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.timezone}
                            onChange={handleInputChange}
                          >
                            <option value="UTC-5 (Eastern)">UTC-5 (Eastern)</option>
                            <option value="UTC-6 (Central)">UTC-6 (Central)</option>
                            <option value="UTC-7 (Mountain)">UTC-7 (Mountain)</option>
                            <option value="UTC-8 (Pacific)">UTC-8 (Pacific)</option>
                            <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="sessionTimeout" className="block text-sm font-medium text-slate-700 mb-1">
                            Session Timeout (minutes)
                          </label>
                          <Input 
                            id="sessionTimeout" 
                            name="sessionTimeout" 
                            type="number"
                            value={formData.sessionTimeout}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-slate-800">Debug Mode</h3>
                            <p className="text-sm text-slate-500">Enable detailed error messages and logging</p>
                          </div>
                          <Button 
                            type="button"
                            variant="ghost" 
                            className="h-9 px-2"
                            onClick={() => handleToggleChange('debugMode')}
                          >
                            {formData.debugMode ? (
                              <ToggleRight className="h-6 w-6 text-blue-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-slate-400" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-slate-800">Maintenance Mode</h3>
                            <p className="text-sm text-slate-500">Take the system offline for maintenance</p>
                          </div>
                          <Button 
                            type="button"
                            variant="ghost" 
                            className="h-9 px-2"
                            onClick={() => handleToggleChange('maintenanceMode')}
                          >
                            {formData.maintenanceMode ? (
                              <ToggleRight className="h-6 w-6 text-blue-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-slate-400" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" type="button" className="mr-2">
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* API & Integration Tab */}
            <TabsContent value="api" className="mt-0">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>Configure API settings and external integrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveSettings}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="apiRateLimit" className="block text-sm font-medium text-slate-700 mb-1">
                            API Rate Limit (requests per minute)
                          </label>
                          <Input 
                            id="apiRateLimit" 
                            name="apiRateLimit" 
                            type="number"
                            value={formData.apiRateLimit}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="loggingLevel" className="block text-sm font-medium text-slate-700 mb-1">
                            API Logging Level
                          </label>
                          <select
                            id="loggingLevel"
                            name="loggingLevel"
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={formData.loggingLevel}
                            onChange={handleInputChange}
                          >
                            <option value="Debug">Debug</option>
                            <option value="Info">Info</option>
                            <option value="Warning">Warning</option>
                            <option value="Error">Error</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-slate-800">API Throttling</h3>
                            <p className="text-sm text-slate-500">Limit API request rate for better performance</p>
                          </div>
                          <Button 
                            type="button"
                            variant="ghost" 
                            className="h-9 px-2"
                            onClick={() => handleToggleChange('apiThrottling')}
                          >
                            {formData.apiThrottling ? (
                              <ToggleRight className="h-6 w-6 text-blue-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-slate-400" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-slate-800">Response Caching</h3>
                            <p className="text-sm text-slate-500">Cache API responses for faster performance</p>
                          </div>
                          <Button 
                            type="button"
                            variant="ghost" 
                            className="h-9 px-2"
                            onClick={() => handleToggleChange('cacheEnabled')}
                          >
                            {formData.cacheEnabled ? (
                              <ToggleRight className="h-6 w-6 text-blue-600" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-slate-400" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-slate-800 mb-4">Spring Boot Endpoints</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center">
                              <div className="p-2 bg-green-100 rounded-lg mr-3">
                                <FileJson className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-800">User Management API</h4>
                                <p className="text-xs text-slate-500">/api/v1/users</p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 border-0">Active</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center">
                              <div className="p-2 bg-green-100 rounded-lg mr-3">
                                <FileJson className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-800">Smart City Data API</h4>
                                <p className="text-xs text-slate-500">/api/v1/city</p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 border-0">Active</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center">
                              <div className="p-2 bg-green-100 rounded-lg mr-3">
                                <FileJson className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-800">Authentication API</h4>
                                <p className="text-xs text-slate-500">/api/v1/auth</p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 border-0">Active</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" type="button" className="mr-2">
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Database Tab */}
            <TabsContent value="database" className="mt-0">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Database Configuration</CardTitle>
                  <CardDescription>Manage database settings and operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800 mb-1">PostgreSQL Database</h3>
                        <p className="text-sm text-slate-600">The system is configured to use PostgreSQL with JPA for data persistence.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-800 mb-3">Connection Status</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Status:</span>
                            <Badge className="bg-green-100 text-green-800 border-0">Connected</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Host:</span>
                            <span className="text-sm font-medium">db.smartcity.example.com</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Database:</span>
                            <span className="text-sm font-medium">smartcity_production</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Version:</span>
                            <span className="text-sm font-medium">PostgreSQL 14.5</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-800 mb-3">Database Statistics</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Size:</span>
                            <span className="text-sm font-medium">1.2 GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Tables:</span>
                            <span className="text-sm font-medium">42</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Total Records:</span>
                            <span className="text-sm font-medium">~560,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Last Backup:</span>
                            <span className="text-sm font-medium">Today, 03:00 AM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-slate-800">Database Operations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="justify-start">
                          <CloudUpload className="h-4 w-4 mr-2" />
                          Backup Database
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Optimize Tables
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <HardDrive className="h-4 w-4 mr-2" />
                          Manage Migrations
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-slate-800">Spring Boot JPA Integration</h3>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Entity Scanning:</span>
                            <Badge className="bg-green-100 text-green-800 border-0">Active</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Hibernate Dialect:</span>
                            <span className="text-sm">PostgreSQLDialect</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Connection Pool:</span>
                            <span className="text-sm">HikariCP (10 min, 50 max)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Schema Generation:</span>
                            <span className="text-sm">validate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Maintenance Tab */}
            <TabsContent value="maintenance" className="mt-0">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                  <CardDescription>Manage system maintenance tasks and view system logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-slate-800 mb-4">System Logs</h3>
                        <div className="p-4 bg-slate-800 text-slate-200 rounded-lg h-60 overflow-y-auto font-mono text-xs">
                          <p>[2023-03-20 08:12:35] INFO: System started successfully</p>
                          <p>[2023-03-20 08:12:36] INFO: Database connection established</p>
                          <p>[2023-03-20 08:15:22] INFO: User admin@smartcity.example.com logged in</p>
                          <p>[2023-03-20 09:23:45] WARN: High CPU usage detected (76%)</p>
                          <p>[2023-03-20 10:34:12] INFO: Scheduled backup completed successfully</p>
                          <p>[2023-03-20 11:42:33] INFO: User john.doe@example.com logged in</p>
                          <p>[2023-03-20 12:15:06] INFO: Cache cleared by admin</p>
                          <p>[2023-03-20 13:20:19] INFO: User emily.davis@example.com logged in</p>
                          <p>[2023-03-20 14:05:27] WARN: Database query took longer than expected (2.5s)</p>
                          <p>[2023-03-20 15:12:00] INFO: System settings updated by admin</p>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm">
                            Download Logs
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-slate-800 mb-4">Maintenance Tasks</h3>
                        <div className="space-y-3">
                          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                            <div className="p-2 bg-amber-100 rounded-lg mr-3">
                              <RefreshCw className="h-4 w-4 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-800">Clear System Cache</h4>
                              <p className="text-xs text-slate-500">Clear all cached data for fresh content</p>
                            </div>
                            <Button size="sm" variant="outline">Run</Button>
                          </div>
                          
                          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                            <div className="p-2 bg-amber-100 rounded-lg mr-3">
                              <HardDrive className="h-4 w-4 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-800">Clean Temporary Files</h4>
                              <p className="text-xs text-slate-500">Remove temporary files to free up disk space</p>
                            </div>
                            <Button size="sm" variant="outline">Run</Button>
                          </div>
                          
                          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                            <div className="p-2 bg-amber-100 rounded-lg mr-3">
                              <Database className="h-4 w-4 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-800">Database Optimize</h4>
                              <p className="text-xs text-slate-500">Optimize database tables for better performance</p>
                            </div>
                            <Button size="sm" variant="outline">Run</Button>
                          </div>
                          
                          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                            <div className="p-2 bg-amber-100 rounded-lg mr-3">
                              <ServerCrash className="h-4 w-4 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-800">Repair File Permissions</h4>
                              <p className="text-xs text-slate-500">Fix file permissions for security</p>
                            </div>
                            <Button size="sm" variant="outline">Run</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="font-medium text-slate-800 mb-4">Scheduled Maintenance</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                              <Clock className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-800">Database Backup</h4>
                              <p className="text-xs text-slate-500">Full database backup</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-800">Daily</p>
                            <p className="text-xs text-slate-500">03:00 AM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                              <HardDrive className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-800">Disk Cleanup</h4>
                              <p className="text-xs text-slate-500">Remove temporary and log files</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-800">Weekly</p>
                            <p className="text-xs text-slate-500">Sunday, 04:00 AM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                              <Database className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-800">Database Optimization</h4>
                              <p className="text-xs text-slate-500">Optimize tables and indexes</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-800">Monthly</p>
                            <p className="text-xs text-slate-500">1st day, 02:00 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Footer */}
          <footer className="text-center text-sm text-slate-500 mt-6 mb-2">
            <p>© 2023 Smart City Admin Panel. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}