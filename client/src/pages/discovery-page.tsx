import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  CompassIcon, 
  Lightbulb, 
  Route, 
  Building, 
  Trees,
  Bus,
  Coffee,
  Award
} from 'lucide-react';

import { 
  DiscoveryAnimationCollection, 
  FloatingIconsAnimation, 
  PathAnimation, 
  CityPulseAnimation 
} from '@/components/animations/discovery-animations';

export default function DiscoveryPage() {
  const { toast } = useToast();
  const [achievementCount, setAchievementCount] = useState(0);
  const [selectedTab, setSelectedTab] = useState("explore");

  const handleDiscovery = (item: string) => {
    toast({
      title: "New Discovery!",
      description: `You discovered ${item} in Bhubaneswar!`,
      duration: 3000,
    });
    setAchievementCount(prev => prev + 1);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Explore Bhubaneswar</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Discover the Smart City through interactive animations and playful explorations
        </p>
      </motion.div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CompassIcon className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Urban Discovery</h2>
        </div>
        
        <Badge variant="outline" className="flex items-center gap-1 py-2">
          <Award className="h-4 w-4 text-amber-500" />
          <span>Achievements: {achievementCount}</span>
        </Badge>
      </div>

      <Tabs 
        defaultValue="explore" 
        className="mb-8"
        onValueChange={setSelectedTab}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="explore">
            <CompassIcon className="w-4 h-4 mr-2" />
            Explore
          </TabsTrigger>
          <TabsTrigger value="landmarks">
            <Building className="w-4 h-4 mr-2" />
            Landmarks
          </TabsTrigger>
          <TabsTrigger value="nature">
            <Trees className="w-4 h-4 mr-2" />
            Nature
          </TabsTrigger>
          <TabsTrigger value="services">
            <Coffee className="w-4 h-4 mr-2" />
            Services
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="explore" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Discover Bhubaneswar</CardTitle>
              <CardDescription>
                Interact with the animations below to discover different aspects of Bhubaneswar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DiscoveryAnimationCollection />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTab("landmarks")}>
                Explore Landmarks
              </Button>
              <Button onClick={() => setSelectedTab("services")}>
                Discover Services
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="landmarks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bhubaneswar Landmarks</CardTitle>
              <CardDescription>
                Discover historical and cultural landmarks throughout the city
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    Historical Sites
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Bhubaneswar is home to over 600 temples, earning it the title of "Temple City of India"
                  </p>
                  <FloatingIconsAnimation 
                    type="landmark" 
                    onDiscovery={handleDiscovery}
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Route className="h-5 w-5 text-blue-500" />
                    Monument Trail
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Follow the path to discover key monuments around the city center
                  </p>
                  <PathAnimation />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Landmark Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: "Lingaraj Temple", description: "Ancient Shiva temple from 11th century", year: "1000 CE" },
                    { name: "Udayagiri and Khandagiri Caves", description: "Ancient Jain rock-cut shelters", year: "2nd century BCE" },
                    { name: "Mukteshwar Temple", description: "Intricately carved small temple", year: "10th century CE" },
                    { name: "Rajarani Temple", description: "Famous for sculptural excellence", year: "11th century CE" },
                    { name: "ISKCON Temple", description: "Modern temple with traditional architecture", year: "1991" },
                    { name: "Dhauli Shanti Stupa", description: "Peace pagoda on Dhauli hill", year: "1972" }
                  ].map((landmark, index) => (
                    <motion.div
                      key={index}
                      className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <h4 className="font-medium mb-1">{landmark.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        {landmark.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {landmark.year}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setSelectedTab("explore")}>
                Back to Explore
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="nature" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Green Bhubaneswar</CardTitle>
              <CardDescription>
                Explore parks, gardens and natural attractions of Bhubaneswar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <CityPulseAnimation className="h-80" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "Ekamra Kanan", description: "Botanical garden with over 800 varieties of roses", icon: <Trees className="h-8 w-8 text-green-500" /> },
                    { name: "Nandankanan Zoological Park", description: "Zoo and botanical garden known for white tigers", icon: <Trees className="h-8 w-8 text-green-600" /> },
                    { name: "Buddha Jayanti Park", description: "Landscaped park with beautiful gardens", icon: <Trees className="h-8 w-8 text-green-700" /> },
                    { name: "Dhauli Hill", description: "Historical site with natural beauty and panoramic views", icon: <Trees className="h-8 w-8 text-green-800" /> },
                    { name: "Chandaka Elephant Sanctuary", description: "Protected area for elephants and wildlife", icon: <Trees className="h-8 w-8 text-green-600" /> },
                    { name: "Bindusagar Lake", description: "Sacred lake surrounded by temples", icon: <Trees className="h-8 w-8 text-green-500" /> }
                  ].map((place, index) => (
                    <motion.div
                      key={index}
                      className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        y: -5, 
                        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="mb-3">{place.icon}</div>
                      <h4 className="text-lg font-semibold mb-2">{place.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {place.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Discover Natural Attractions</h3>
                  <p className="text-sm mb-4 text-slate-600 dark:text-slate-400">
                    Click on icons to discover parks and natural areas in Bhubaneswar
                  </p>
                  <FloatingIconsAnimation 
                    type="nature" 
                    onDiscovery={handleDiscovery}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setSelectedTab("explore")}>
                Back to Explore
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>City Services</CardTitle>
              <CardDescription>
                Discover essential services and facilities in Bhubaneswar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Bus className="h-5 w-5 text-amber-500" />
                    Transportation
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Discover different transportation options available in the city
                  </p>
                  <FloatingIconsAnimation 
                    type="transport" 
                    onDiscovery={handleDiscovery}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-amber-700" />
                    Essential Services
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Explore important services available for residents and visitors
                  </p>
                  <FloatingIconsAnimation 
                    type="service" 
                    onDiscovery={handleDiscovery}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: "Mo Bus", description: "Public bus service with GPS tracking", category: "Transport" },
                  { name: "Bhubaneswar One", description: "Integrated citizen services portal", category: "Digital" },
                  { name: "Smart Parks", description: "IT-enabled park management", category: "Recreation" },
                  { name: "Smart Healthcare", description: "Digital health services network", category: "Healthcare" },
                  { name: "Smart Education", description: "Technology-enabled educational initiatives", category: "Education" },
                  { name: "Traffic Management", description: "Intelligent traffic control system", category: "Transport" },
                  { name: "Waste Management", description: "Smart waste collection and processing", category: "Utility" },
                  { name: "Public WiFi", description: "Free WiFi hotspots across the city", category: "Digital" }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <h4 className="font-medium mb-1">{service.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      {service.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {service.category}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setSelectedTab("explore")}>
                Back to Explore
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}