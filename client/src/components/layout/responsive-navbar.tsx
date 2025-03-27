import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Map, Car, Building, School, Shield, Landmark, Menu, X, UserCircle, BookOpen,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

export function ResponsiveNavbar() {
  const { user } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const isAdmin = user?.role === "admin";

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Map", href: "/map", icon: <Map className="h-5 w-5" /> },
    { label: "Traffic", href: "/traffic", icon: <Car className="h-5 w-5" /> },
    { label: "Healthcare", href: "/healthcare", icon: <Building className="h-5 w-5" /> },
    { label: "Education", href: "/education", icon: <School className="h-5 w-5" /> },
    { label: "Safety", href: "/safety", icon: <Shield className="h-5 w-5" /> },
    { label: "Tourism", href: "/tourism", icon: <Landmark className="h-5 w-5" /> },
    { label: "Discovery", href: "/discovery", icon: <Compass className="h-5 w-5" /> },
    { label: "Scrapbook", href: "/scrapbook", icon: <BookOpen className="h-5 w-5" /> },
    { 
      label: "Admin", 
      href: "/admin/users", 
      icon: <UserCircle className="h-5 w-5" />, 
      adminOnly: true 
    },
  ];

  // Filter out admin routes for non-admin users
  const filteredNavItems = navItems.filter(item => !item.adminOnly || isAdmin);
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && e.target instanceof Element && !e.target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className="hidden md:flex bg-background border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold flex items-center space-x-2">
              <AnimatedIcon 
                icon={<LayoutDashboard className="h-6 w-6" />}
                animationStyle="pulse"
                size="md"
              />
              <span>Smart City</span>
            </Link>
            
            <div className="flex items-center space-x-1">
              {filteredNavItems.map((item) => {
                const isActive = location === item.href;
                
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                  >
                    <motion.div
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-foreground hover:bg-muted"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center space-x-1.5">
                        {React.cloneElement(item.icon as React.ReactElement, { 
                          className: cn(
                            "h-4 w-4", 
                            isActive ? "text-primary" : "text-muted-foreground"
                          ) 
                        })}
                        <span>{item.label}</span>
                      </div>
                      
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="navbar-indicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{user.username}</span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCircle className="h-5 w-5 text-primary" />
                  </div>
                </div>
              ) : (
                <Link href="/auth" className="text-sm font-medium text-primary hover:underline">
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50 md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg flex items-center justify-center"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mobile-menu-container absolute top-0 right-0 h-full w-3/4 max-w-xs bg-background shadow-xl p-5 flex flex-col"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="text-xl font-bold flex items-center space-x-2">
                  <LayoutDashboard className="h-6 w-6" />
                  <span>Smart City</span>
                </Link>
              </div>

              <div className="space-y-1 flex-1 overflow-y-auto">
                {filteredNavItems.map((item) => {
                  const isActive = location === item.href;
                  
                  return (
                    <motion.div
                      key={item.href}
                      variants={itemVariants}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                          isActive 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted text-foreground"
                        )}
                      >
                        {React.cloneElement(item.icon as React.ReactElement, { 
                          className: cn(
                            "h-5 w-5", 
                            isActive ? "text-primary" : "text-muted-foreground"
                          ) 
                        })}
                        <span className="font-medium">{item.label}</span>
                        
                        {isActive && (
                          <motion.div
                            className="ml-auto w-1.5 h-5 bg-primary rounded-full"
                            layoutId="mobile-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="pt-4 border-t mt-auto">
                {user ? (
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{user.username}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.role === "admin" ? "Administrator" : "User"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    href="/auth"
                    className="flex items-center space-x-3 px-4 py-3 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <UserCircle className="h-5 w-5" />
                    <span className="font-medium">Login / Register</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}