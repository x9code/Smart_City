import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  Building, 
  School, 
  ShoppingBag, 
  Car, 
  Landmark, 
  Hospital, 
  Shield, 
  Trees, 
  Compass,
  ChevronRight,
  Map
} from 'lucide-react';
import { 
  ScrollReveal, 
  StaggeredContainer, 
  StaggeredItem 
} from '@/components/animations/urban-animation-utils';
import { cn } from '@/lib/utils';

const cityAreas = [
  { 
    id: 'downtown', 
    name: 'Downtown', 
    description: 'The heart of Bhubaneswar with modern infrastructure',
    icon: <Building className="h-12 w-12" />,
    color: 'bg-blue-500',
    features: ['Smart traffic lights', 'Public WiFi', 'EV charging stations']
  },
  { 
    id: 'educational', 
    name: 'Educational Zone', 
    description: 'Home to prestigious educational institutions',
    icon: <School className="h-12 w-12" />,
    color: 'bg-green-500',
    features: ['Smart classrooms', 'Digital libraries', 'Innovation labs']
  },
  { 
    id: 'commercial', 
    name: 'Commercial District', 
    description: 'Business and shopping centers',
    icon: <ShoppingBag className="h-12 w-12" />,
    color: 'bg-amber-500',
    features: ['Smart parking', 'Digital payment systems', 'Surveillance']
  },
  { 
    id: 'transportation', 
    name: 'Transportation Hub', 
    description: 'Connected road networks and public transit',
    icon: <Car className="h-12 w-12" />,
    color: 'bg-purple-500',
    features: ['Real-time tracking', 'Integrated transport system', 'Traffic management']
  },
  { 
    id: 'cultural', 
    name: 'Cultural Heritage', 
    description: 'Historical sites and cultural venues',
    icon: <Landmark className="h-12 w-12" />,
    color: 'bg-red-500',
    features: ['Smart tourism guides', 'Digital preservation', 'AR experiences']
  },
  { 
    id: 'healthcare', 
    name: 'Healthcare District', 
    description: 'Hospitals and healthcare facilities',
    icon: <Hospital className="h-12 w-12" />,
    color: 'bg-cyan-500',
    features: ['Telemedicine services', 'Emergency response', 'Health monitoring']
  },
  { 
    id: 'safety', 
    name: 'Safety Zones', 
    description: 'Advanced security and emergency services',
    icon: <Shield className="h-12 w-12" />,
    color: 'bg-emerald-500',
    features: ['Emergency hotspots', 'CCTV surveillance', 'Quick response teams']
  },
  { 
    id: 'parks', 
    name: 'Parks & Recreation', 
    description: 'Green spaces and recreational areas',
    icon: <Trees className="h-12 w-12" />,
    color: 'bg-green-600',
    features: ['Smart irrigation', 'Air quality monitoring', 'Fitness trails']
  },
  { 
    id: 'discovery', 
    name: 'Urban Discovery', 
    description: 'Interactive experiences throughout the city',
    icon: <Compass className="h-12 w-12" />,
    color: 'bg-indigo-500',
    features: ['Interactive maps', 'Hidden treasures', 'City exploration games']
  },
];

// City layout grid
export function AnimatedCityGrid() {
  return (
    <StaggeredContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cityAreas.map((area, index) => (
        <StaggeredItem key={area.id} className="h-full">
          <CityAreaCard area={area} index={index} />
        </StaggeredItem>
      ))}
    </StaggeredContainer>
  );
}

// City area card component
function CityAreaCard({ area, index }: { area: typeof cityAreas[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getPageLink = (id: string) => {
    switch(id) {
      case 'downtown':
      case 'commercial':
      case 'transportation':
        return '/map';
      case 'educational':
        return '/education';
      case 'cultural':
        return '/tourism';
      case 'healthcare':
        return '/healthcare';
      case 'safety':
        return '/safety';
      case 'discovery':
        return '/discovery';
      default:
        return '/map';
    }
  };
  
  return (
    <motion.div
      className="relative h-full bg-background border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div 
        className={cn(
          "absolute inset-0 opacity-10", 
          area.color
        )} 
      />
      
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div 
            className={cn(
              "p-3 rounded-lg text-white", 
              area.color
            )}
          >
            {area.icon}
          </div>
          
          <motion.div
            className="text-sm font-medium py-1 px-3 rounded-full bg-gray-100 dark:bg-gray-800"
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              backgroundColor: isHovered ? 'var(--primary-50)' : 'var(--gray-100)'
            }}
            transition={{ duration: 0.2 }}
          >
            Smart Zone
          </motion.div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{area.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
        
        <div className="mt-auto">
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Smart Features:</h4>
            <ul className="space-y-1">
              {area.features.map((feature, i) => (
                <motion.li 
                  key={i}
                  className="text-xs flex items-center text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0.8, 
                    x: isHovered ? 0 : -5 
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: i * 0.1
                  }}
                >
                  <div className={cn("w-1.5 h-1.5 rounded-full mr-2", area.color)} />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
          
          <Link href={getPageLink(area.id)}>
            <motion.div
              className={cn(
                "flex items-center justify-between py-2 px-4 rounded-lg text-sm font-medium",
                area.color,
                "text-white"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore {area.name}</span>
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// City highlights section for dashboard
export function CityHighlights() {
  return (
    <div className="py-8">
      <ScrollReveal className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Smart Bhubaneswar Zones</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore different areas of Bhubaneswar, each equipped with smart technologies for a better urban experience
        </p>
      </ScrollReveal>
      
      <AnimatedCityGrid />
    </div>
  );
}

// Dashboard intro animation
export function AnimatedCityIntro() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-slate-900 dark:to-indigo-950 py-16 px-6 mb-8">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to Smart Bhubaneswar
          </motion.h1>
          
          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience the city through interactive animations and discover smart features throughout Bhubaneswar
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/discovery">
              <motion.button
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Compass className="h-5 w-5" />
                <span>Start Exploring</span>
              </motion.button>
            </Link>
            
            <Link href="/map">
              <motion.button
                className="bg-white/80 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-foreground px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Map className="h-5 w-5" />
                <span>View City Map</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </ScrollReveal>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute w-20 h-20 rounded-full opacity-20",
              [
                'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 
                'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500'
              ][i % 6]
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: 0.5 + Math.random() * 1.5
            }}
            animate={{
              y: [Math.random() * 20, Math.random() * -20, Math.random() * 20],
              x: [Math.random() * 20, Math.random() * -20, Math.random() * 20],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + Math.random() * 20,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}