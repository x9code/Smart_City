import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const [location, setLocation] = useLocation();

  const navigationItems = [
    { name: "Dashboard", icon: "dashboard", path: "/" },
    { name: "Traffic", icon: "traffic", path: "/traffic" },
    { name: "Map", icon: "map", path: "/map" },
    { name: "Health", icon: "health_and_safety", path: "/healthcare" },
    { name: "Onboarding", icon: "open_in_new", path: "/onboarding" },
  ];

  const handleNav = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-2 z-10">
      {navigationItems.map((item) => (
        <a 
          key={item.name}
          href="#" 
          className={cn(
            "flex flex-col items-center px-2 py-1", 
            location === item.path ? "text-primary" : "text-slate-500"
          )}
          onClick={(e) => {
            e.preventDefault();
            handleNav(item.path);
          }}
        >
          <span className="material-icons">{item.icon}</span>
          <span className="text-xs mt-1">{item.name}</span>
        </a>
      ))}
    </div>
  );
}
