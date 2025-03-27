import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  UserPlus, 
  User, 
  Users, 
  Shield, 
  UserCog, 
  Lock, 
  Mail, 
  Phone, 
  Calendar, 
  ClipboardList,
  RefreshCw,
  Laptop,
  Upload,
  Download,
  Filter
} from "lucide-react";

// Sample user data
const userData = [
  {
    id: 1,
    name: "John Doe",
    username: "john.doe",
    email: "john.doe@example.com",
    role: "admin",
    department: "IT",
    status: "active",
    lastLogin: "2023-03-15T14:30:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "jane.smith",
    email: "jane.smith@example.com",
    role: "user",
    department: "Finance",
    status: "active",
    lastLogin: "2023-03-14T09:45:00Z"
  },
  {
    id: 3,
    name: "Robert Johnson",
    username: "robert.johnson",
    email: "robert.johnson@example.com",
    role: "user",
    department: "Operations",
    status: "inactive",
    lastLogin: "2023-02-28T11:20:00Z"
  },
  {
    id: 4,
    name: "Emily Davis",
    username: "emily.davis",
    email: "emily.davis@example.com",
    role: "user",
    department: "Marketing",
    status: "active",
    lastLogin: "2023-03-15T10:15:00Z"
  },
  {
    id: 5,
    name: "Michael Wilson",
    username: "michael.wilson",
    email: "michael.wilson@example.com",
    role: "admin",
    department: "IT",
    status: "active",
    lastLogin: "2023-03-14T16:50:00Z"
  },
  {
    id: 6,
    name: "Sarah Brown",
    username: "sarah.brown",
    email: "sarah.brown@example.com",
    role: "user",
    department: "HR",
    status: "pending",
    lastLogin: null
  }
];

// Sample roles data
const rolesData = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access with all privileges",
    users: 2,
    permissions: ["create", "read", "update", "delete", "manage_users", "manage_settings"]
  },
  {
    id: 2,
    name: "User",
    description: "Basic access to the system",
    users: 4,
    permissions: ["read", "limited_update"]
  },
  {
    id: 3,
    name: "Manager",
    description: "Department-level access with limited admin capabilities",
    users: 0,
    permissions: ["create", "read", "update", "manage_department"]
  }
];

// User activity logs
const userActivityLogs = [
  {
    id: 1,
    user: "John Doe",
    action: "User Login",
    timestamp: "2023-03-15T14:30:00Z",
    details: "Successful login from 192.168.1.105"
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Profile Update",
    timestamp: "2023-03-14T10:15:00Z",
    details: "Updated contact information"
  },
  {
    id: 3,
    user: "Michael Wilson",
    action: "User Created",
    timestamp: "2023-03-12T09:20:00Z",
    details: "Created new user: Sarah Brown"
  },
  {
    id: 4,
    user: "John Doe",
    action: "Role Update",
    timestamp: "2023-03-10T15:45:00Z",
    details: "Changed role for Emily Davis from User to Manager"
  },
  {
    id: 5,
    user: "System",
    action: "Backup Completed",
    timestamp: "2023-03-09T02:00:00Z",
    details: "Automatic system backup completed successfully"
  }
];

export default function UsersPage() {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("users");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    username: "",
    email: "",
    role: "user",
    department: "",
    status: "active"
  });

  // Check if user is admin, if not redirect to dashboard
  if (user && user.role !== "admin") {
    setLocation("/");
    return null;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleAddUser = () => {
    // Here we would normally send the data to the backend API
    console.log("Adding new user:", newUserData);
    setIsAddUserDialogOpen(false);
    
    // Reset form data
    setNewUserData({
      name: "",
      username: "",
      email: "",
      role: "user",
      department: "",
      status: "active"
    });
  };

  const handleDeleteUser = (id: number) => {
    // Here we would normally send a delete request to the backend API
    console.log("Deleting user with ID:", id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - desktop navigation */}
      <Sidebar />
      
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMobileMenuToggle={toggleMobileMenu} title="User Management" />
        
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
                  <h3 className="font-bold text-slate-800 mb-1">Spring Boot Backend Integration</h3>
                  <p className="text-sm text-slate-600">
                    This user management module is prepared to connect with Spring Boot APIs using JPA and PostgreSQL. User data operations are ready for backend integration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-10 w-[250px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <Button variant="outline" size="icon" className="ml-2">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="h-9">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="h-9">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button onClick={() => setIsAddUserDialogOpen(true)} className="h-9">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
          
          {/* Main Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="w-full flex bg-white p-1 rounded-lg shadow mb-6">
              <TabsTrigger value="users" className="flex-1 py-3">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex-1 py-3">
                <Shield className="h-4 w-4 mr-2" />
                Roles & Permissions
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-1 py-3">
                <ClipboardList className="h-4 w-4 mr-2" />
                Activity Logs
              </TabsTrigger>
            </TabsList>
            
            {/* Users Tab Content */}
            <TabsContent value="users" className="mt-0">
              <Card className="bg-white overflow-hidden">
                <CardHeader className="pb-1">
                  <CardTitle>User List</CardTitle>
                  <CardDescription>Manage all system users and their access levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Last Login</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {userData.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                                  <User className="h-5 w-5 text-slate-500" />
                                </div>
                                <div>
                                  <div className="font-medium text-slate-800">{user.name}</div>
                                  <div className="text-xs text-slate-500">@{user.username}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-slate-600">{user.email}</td>
                            <td className="py-4 px-4">
                              <Badge className={`${
                                user.role === "admin" 
                                  ? "bg-purple-100 text-purple-800 border-purple-200" 
                                  : "bg-blue-100 text-blue-800 border-blue-200"
                              }`}>
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-sm text-slate-600">{user.department}</td>
                            <td className="py-4 px-4">
                              <Badge className={`${
                                user.status === "active" 
                                  ? "bg-green-100 text-green-800 border-green-200" 
                                  : user.status === "inactive"
                                  ? "bg-slate-100 text-slate-800 border-slate-200"
                                  : "bg-amber-100 text-amber-800 border-amber-200"
                              }`}>
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-sm text-slate-600">{formatDate(user.lastLogin)}</td>
                            <td className="py-4 px-4 text-right space-x-2">
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                      Showing <span className="font-medium">{userData.length}</span> users
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>Previous</Button>
                      <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Roles Tab Content */}
            <TabsContent value="roles" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rolesData.map((role) => (
                  <Card key={role.id} className="bg-white overflow-hidden">
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div>
                        <CardTitle>{role.name}</CardTitle>
                        <CardDescription>{role.description}</CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-0">
                        {role.users} Users
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Permissions</h4>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((permission, index) => (
                              <Badge key={index} variant="outline" className="bg-slate-50 text-xs capitalize">
                                {permission.split('_').join(' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="pt-4 flex justify-end">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3.5 w-3.5 mr-1.5" />
                            Edit Role
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="bg-white overflow-hidden border-dashed border-2 border-slate-200">
                  <CardContent className="p-6 flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-6 w-6 text-slate-500" />
                      </div>
                      <h3 className="font-medium text-slate-700 mb-2">Create New Role</h3>
                      <p className="text-sm text-slate-500 mb-4">Define a new role with custom permissions</p>
                      <Button>
                        <Shield className="h-4 w-4 mr-2" />
                        Add Role
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-white mt-6">
                <CardHeader>
                  <CardTitle>Permission Matrix</CardTitle>
                  <CardDescription>Define what each role can access and modify in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Permission</th>
                          <th className="text-center py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Admin</th>
                          <th className="text-center py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Manager</th>
                          <th className="text-center py-3 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {[
                          "View Dashboard", 
                          "Manage Users", 
                          "Create Records", 
                          "Edit Records",
                          "Delete Records",
                          "View Reports",
                          "System Settings"
                        ].map((permission, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="py-3 px-4 text-sm font-medium text-slate-700">{permission}</td>
                            <td className="py-3 px-4 text-center">
                              <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              {["View Dashboard", "View Reports", "Create Records", "Edit Records"].includes(permission) ? (
                                <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                  <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                                </div>
                              ) : (
                                <div className="h-5 w-5 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                                  <div className="h-2.5 w-2.5 bg-slate-300 rounded-full"></div>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {["View Dashboard", "View Reports"].includes(permission) ? (
                                <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                  <div className="h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                                </div>
                              ) : (
                                <div className="h-5 w-5 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                                  <div className="h-2.5 w-2.5 bg-slate-300 rounded-full"></div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Activity Logs Tab Content */}
            <TabsContent value="activity" className="mt-0">
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>User Activity Logs</CardTitle>
                    <CardDescription>Monitor user actions and system activities</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    Refresh
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {userActivityLogs.map((log) => (
                      <div key={log.id} className="flex items-start pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className="mr-4 mt-0.5">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            log.action.includes("Login") 
                              ? "bg-green-100 text-green-600" 
                              : log.action.includes("Update") 
                              ? "bg-blue-100 text-blue-600" 
                              : log.action.includes("Created") 
                              ? "bg-purple-100 text-purple-600"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {log.action.includes("Login") 
                              ? <User className="h-4 w-4" /> 
                              : log.action.includes("Update") 
                              ? <Edit className="h-4 w-4" /> 
                              : log.action.includes("Created") 
                              ? <UserPlus className="h-4 w-4" />
                              : <ClipboardList className="h-4 w-4" />
                            }
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-slate-800">{log.action}</h4>
                            <span className="text-xs text-slate-500">{formatDate(log.timestamp)}</span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{log.details}</p>
                          <div className="flex items-center mt-2">
                            <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center mr-2">
                              <User className="h-3 w-3 text-slate-600" />
                            </div>
                            <span className="text-xs text-slate-600">{log.user}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  Showing the last <span className="font-medium">5</span> activities
                </div>
                <Button variant="outline" size="sm">
                  View Full History
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Add User Dialog */}
          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with role-based permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    className="col-span-3"
                    value={newUserData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="username"
                    className="col-span-3"
                    value={newUserData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    className="col-span-3"
                    value={newUserData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="role" className="text-right text-sm font-medium">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newUserData.role}
                    onChange={handleInputChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="department" className="text-right text-sm font-medium">
                    Department
                  </label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="Department"
                    className="col-span-3"
                    value={newUserData.department}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Footer */}
          <footer className="text-center text-sm text-slate-500 mt-6 mb-2">
            <p>© 2023 Smart City Admin Panel. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}