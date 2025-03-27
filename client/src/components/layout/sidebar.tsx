import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { user, logoutMutation } = useAuth();
  const [location, setLocation] = useLocation();

  const isAdmin = user?.role === "admin";

  const navigationItems = [
    { name: "Dashboard", icon: "dashboard", path: "/" },
    { name: "Traffic Monitoring", icon: "traffic", path: "/traffic" },
    { name: "Healthcare", icon: "health_and_safety", path: "/healthcare" },
    { name: "Education", icon: "school", path: "/education" },
    { name: "Tourism", icon: "travel_explore", path: "/tourism" },
  ];

  const safetyItems = [
    { name: "Women Safety", icon: "shield", path: "/safety" },
    { name: "City Map", icon: "map", path: "/map" },
    { name: "Onboarding Wizard", icon: "open_in_new", path: "/onboarding" },
  ];

  const adminItems = [
    { name: "User Management", icon: "admin_panel_settings", path: "/admin/users" },
    { name: "System Settings", icon: "settings", path: "/admin/settings" },
  ];

  const handleNav = (path: string) => {
    setLocation(path);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-800 text-white">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold">Smart City</h1>
        <p className="text-sm text-slate-400">{user?.role === "admin" ? "Administrator" : "User"}</p>
      </div>
      
      <nav className="flex-grow py-4">
        <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Main
        </div>
        {navigationItems.map((item) => (
          <a 
            key={item.name}
            href="#" 
            className={cn(
              "flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700",
              location === item.path && "bg-slate-700"
            )}
            onClick={(e) => {
              e.preventDefault();
              handleNav(item.path);
            }}
          >
            <span className="material-icons mr-3 text-slate-400">{item.icon}</span>
            {item.name}
          </a>
        ))}
        
        <div className="px-4 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Safety & Utilities
        </div>
        {safetyItems.map((item) => (
          <a 
            key={item.name}
            href="#" 
            className={cn(
              "flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700",
              location === item.path && "bg-slate-700"
            )}
            onClick={(e) => {
              e.preventDefault();
              handleNav(item.path);
            }}
          >
            <span className="material-icons mr-3 text-slate-400">{item.icon}</span>
            {item.name}
          </a>
        ))}
        
        {isAdmin && (
          <>
            <div className="px-4 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Administration
            </div>
            {adminItems.map((item) => (
              <a 
                key={item.name}
                href="#" 
                className={cn(
                  "flex items-center px-4 py-2 text-slate-300 hover:bg-slate-700",
                  location === item.path && "bg-slate-700"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.path);
                }}
              >
                <span className="material-icons mr-3 text-slate-400">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </>
        )}
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <a 
          href="#" 
          className="flex items-center text-slate-300 hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          <span className="material-icons mr-3">logout</span>
          Logout
        </a>
      </div>
    </aside>
  );
}
