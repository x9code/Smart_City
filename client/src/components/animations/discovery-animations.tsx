import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Bus, Bike, Car, Train, Building, MapPin, Trees, Coffee,
  School, Hospital, ShoppingBag, Camera, Landmark, Utensils
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimationProps {
  type: 'transport' | 'landmark' | 'service' | 'nature' | 'mixed';
  className?: string;
  onDiscovery?: (item: string) => void;
}

const transportIcons = [
  { icon: <Bus className="h-8 w-8" />, label: 'Bus', color: 'text-amber-500' },
  { icon: <Bike className="h-8 w-8" />, label: 'Bike', color: 'text-green-500' },
  { icon: <Car className="h-8 w-8" />, label: 'Car', color: 'text-blue-500' },
  { icon: <Train className="h-8 w-8" />, label: 'Train', color: 'text-purple-500' }
];

const landmarkIcons = [
  { icon: <Building className="h-8 w-8" />, label: 'Building', color: 'text-slate-500' },
  { icon: <MapPin className="h-8 w-8" />, label: 'Location', color: 'text-red-500' },
  { icon: <Landmark className="h-8 w-8" />, label: 'Monument', color: 'text-amber-700' }
];

const serviceIcons = [
  { icon: <Coffee className="h-8 w-8" />, label: 'Café', color: 'text-amber-600' },
  { icon: <Hospital className="h-8 w-8" />, label: 'Hospital', color: 'text-red-500' },
  { icon: <School className="h-8 w-8" />, label: 'School', color: 'text-blue-600' },
  { icon: <ShoppingBag className="h-8 w-8" />, label: 'Shop', color: 'text-purple-500' },
  { icon: <Utensils className="h-8 w-8" />, label: 'Restaurant', color: 'text-orange-500' }
];

const natureIcons = [
  { icon: <Trees className="h-8 w-8" />, label: 'Park', color: 'text-green-600' },
  { icon: <Camera className="h-8 w-8" />, label: 'Viewpoint', color: 'text-cyan-500' }
];

const getIconsByType = (type: AnimationProps['type']) => {
  switch (type) {
    case 'transport': return transportIcons;
    case 'landmark': return landmarkIcons;
    case 'service': return serviceIcons;
    case 'nature': return natureIcons;
    case 'mixed': 
      return [
        ...transportIcons.slice(0, 2),
        ...landmarkIcons.slice(0, 2),
        ...serviceIcons.slice(0, 2),
        ...natureIcons.slice(0, 1)
      ];
    default: return transportIcons;
  }
};

export function FloatingIconsAnimation({ type, className, onDiscovery }: AnimationProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [discovered, setDiscovered] = useState<string[]>([]);
  const icons = getIconsByType(type);

  const handleIconClick = (label: string) => {
    if (!discovered.includes(label)) {
      setDiscovered([...discovered, label]);
      if (onDiscovery) {
        onDiscovery(label);
      }
    }
  };

  return (
    <div ref={ref} className={cn("relative h-64 w-full overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-950 dark:to-slate-900", className)}>
      <AnimatePresence>
        {inView && icons.map((icon, index) => (
          <motion.div
            key={index}
            className={cn(
              "absolute cursor-pointer flex flex-col items-center justify-center transform transition-all",
              discovered.includes(icon.label) ? `${icon.color} scale-110` : "text-slate-400"
            )}
            initial={{ 
              x: Math.random() * 100 - 50 + "%", 
              y: Math.random() * 100 - 50 + "%",
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              x: Math.random() * 80 - 40 + "%",
              y: Math.random() * 80 - 40 + "%",
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.5,
                delay: index * 0.15
              }
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleIconClick(icon.label)}
          >
            {icon.icon}
            <span className={cn(
              "mt-1 text-xs font-medium opacity-80",
              discovered.includes(icon.label) ? icon.color : "text-slate-500"
            )}>
              {icon.label}
            </span>
            {discovered.includes(icon.label) && (
              <motion.div
                className="absolute inset-0 rounded-full bg-current"
                initial={{ opacity: 0.2, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 1 }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      {discovered.length > 0 && (
        <div className="absolute bottom-2 right-2 text-xs font-medium text-slate-500">
          Discovered {discovered.length}/{icons.length}
        </div>
      )}
    </div>
  );
}

export function PathAnimation({ className }: { className?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref} 
      className={cn("relative h-40 w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900", className)}
    >
      <svg 
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 240" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {inView && (
          <>
            <motion.path
              d="M20,120 C100,40 200,200 300,120 S400,20 500,120 C550,180 580,120 580,120"
              fill="transparent"
              stroke="#e2e8f0"
              strokeWidth="8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="20"
              cy="120"
              r="8"
              fill="#3b82f6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.circle
              cx="580"
              cy="120"
              r="8"
              fill="#10b981"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            />
            <motion.circle
              cx="0"
              cy="0"
              r="6"
              fill="#f97316"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                cx: [20, 100, 200, 300, 400, 500, 580],
                cy: [120, 40, 200, 120, 20, 120, 120],
              }}
              transition={{
                duration: 2,
                times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
}

interface CityPulseProps {
  className?: string;
}

export function CityPulseAnimation({ className }: CityPulseProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const buildings = [
    { height: '60%', width: '40px', left: '10%', delay: 0 },
    { height: '80%', width: '60px', left: '20%', delay: 0.1 },
    { height: '40%', width: '50px', left: '32%', delay: 0.2 },
    { height: '70%', width: '40px', left: '42%', delay: 0.3 },
    { height: '90%', width: '70px', left: '55%', delay: 0.4 },
    { height: '50%', width: '45px', left: '70%', delay: 0.5 },
    { height: '75%', width: '55px', left: '82%', delay: 0.6 },
  ];

  return (
    <div 
      ref={ref}
      className={cn("relative h-64 w-full overflow-hidden rounded-xl bg-gradient-to-b from-indigo-200 to-sky-300 dark:from-slate-900 dark:to-slate-800", className)}
    >
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-green-600 to-green-500 dark:from-green-900 dark:to-green-800"></div>
      
      {inView && buildings.map((building, index) => (
        <motion.div
          key={index}
          className="absolute bottom-12 bg-slate-700 dark:bg-slate-600 rounded-t-sm shadow-md"
          style={{
            width: building.width,
            left: building.left,
          }}
          initial={{ height: 0 }}
          animate={{ height: building.height }}
          transition={{
            duration: 0.7,
            delay: building.delay,
            ease: "easeOut"
          }}
        >
          {/* Windows */}
          <div className="absolute inset-2 grid grid-cols-2 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-yellow-100 dark:bg-yellow-300 opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: Math.random() > 0.3 ? 0.7 : 0 }}
                transition={{
                  delay: building.delay + 1 + Math.random(),
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1 + Math.random() * 2,
                  repeatDelay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Sun/Moon */}
      {inView && (
        <motion.div
          className="absolute rounded-full bg-yellow-300 dark:bg-blue-200 shadow-lg"
          initial={{ top: '80%', right: '10%', width: '20px', height: '20px' }}
          animate={{ top: '10%', right: '20%', width: '40px', height: '40px' }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      )}

      {/* Cloud */}
      {inView && (
        <>
          <motion.div
            className="absolute top-[15%] rounded-full bg-white dark:bg-slate-400 w-20 h-10 opacity-80"
            initial={{ left: '-10%' }}
            animate={{ left: '110%' }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-[25%] rounded-full bg-white dark:bg-slate-400 w-24 h-8 opacity-70"
            initial={{ left: '-15%' }}
            animate={{ left: '110%' }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 5
            }}
          />
        </>
      )}

      {/* Cars */}
      {inView && (
        <>
          <motion.div
            className="absolute bottom-8 w-10 h-4 bg-red-500 dark:bg-red-600 rounded-sm"
            initial={{ left: '-5%' }}
            animate={{ left: '105%' }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-4 w-10 h-4 bg-blue-500 dark:bg-blue-600 rounded-sm"
            initial={{ right: '-5%' }}
            animate={{ right: '105%' }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
        </>
      )}
    </div>
  );
}

export function DiscoveryAnimationCollection() {
  const [discoveredItems, setDiscoveredItems] = useState<string[]>([]);
  
  const handleDiscovery = (item: string) => {
    if (!discoveredItems.includes(item)) {
      setDiscoveredItems([...discoveredItems, item]);
    }
  };
  
  useEffect(() => {
    if (discoveredItems.length > 0) {
      // Could trigger confetti or other celebration animations
      console.log('Discovered items:', discoveredItems);
    }
  }, [discoveredItems]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Discover Transport Options</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Click on icons to discover different modes of transportation in Bhubaneswar
          </p>
          <FloatingIconsAnimation 
            type="transport" 
            onDiscovery={handleDiscovery}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Find City Services</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Explore essential services available throughout the city
          </p>
          <FloatingIconsAnimation 
            type="service" 
            onDiscovery={handleDiscovery} 
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Bhubaneswar City Pulse</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Watch as the city comes alive with day and night cycles
        </p>
        <CityPulseAnimation />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Discover City Landmarks</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Find iconic landmarks and monuments throughout Bhubaneswar
          </p>
          <FloatingIconsAnimation 
            type="landmark" 
            onDiscovery={handleDiscovery}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Trace Your Journey</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Visualize your path through the city from one point to another
          </p>
          <PathAnimation />
        </div>
      </div>
      
      {discoveredItems.length > 0 && (
        <motion.div 
          className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="font-medium mb-2">Your Discoveries ({discoveredItems.length})</h4>
          <div className="flex flex-wrap gap-2">
            {discoveredItems.map((item, index) => (
              <motion.span 
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}