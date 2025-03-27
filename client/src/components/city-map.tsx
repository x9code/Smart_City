import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Layers, Settings, AlertCircle, Map as MapIcon } from "lucide-react";
import { GoogleMap, useJsApiLoader, TrafficLayer, TransitLayer, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedIcon } from "@/components/ui/animated-icon";

// Define types for map data
interface LatLng {
  lat: number;
  lng: number;
}

interface MapBounds {
  northeast: LatLng;
  southwest: LatLng;
}

interface MapPoint {
  id: number;
  name: string;
  category: string;
  location: LatLng;
  address: string;
}

interface TrafficIncident {
  id: number;
  type: string;
  location: string;
  severity: string;
  reportedTime: string;
  status: string;
}

interface MapData {
  cityBounds: MapBounds;
  points: MapPoint[];
  trafficLayers: {
    congestion: boolean;
    incidents: boolean;
    construction: boolean;
  };
  safetyLayers: {
    safetyZones: boolean;
    emergencyPhones: boolean;
    lightedPaths: boolean;
    policeStations: boolean;
  };
}

interface TrafficData {
  congestion: {
    downtown: string;
    uptown: string;
    suburban: string;
    highways: string;
  };
  incidents: TrafficIncident[];
  trafficFlowData: { time: string; volume: number }[];
}

// Map styles
const mapStyles = [
  { id: "standard", name: "Standard" },
  { id: "silver", name: "Silver" },
  { id: "retro", name: "Retro" },
  { id: "dark", name: "Dark" }
];

const mapViewOptions = [
  { id: "traffic", label: "Traffic" },
  { id: "transit", label: "Public Transit" },
  { id: "satellite", label: "Satellite" },
];

// Map styling based on selected style
const getMapStyling = (style: string) => {
  switch (style) {
    case "silver":
      return [
        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
      ];
    case "retro":
      return [
        { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f1e6" }] },
        { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] },
      ];
    case "dark":
      return [
        { elementType: "geometry", stylers: [{ color: "#212121" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#424242" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
      ];
    default:
      return [];
  }
};

// Map component
export function CityMap() {
  const [activeView, setActiveView] = useState("traffic");
  const [mapStyle, setMapStyle] = useState("standard");
  const [showTraffic, setShowTraffic] = useState(true);
  const [showTransit, setShowTransit] = useState(false);
  const [showPoints, setShowPoints] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<number | null>(null);

  // Load map data
  const { data: mapData } = useQuery<MapData>({
    queryKey: ["/api/map"],
  });

  // Get traffic incidents
  const { data: trafficData } = useQuery<TrafficData>({
    queryKey: ["/api/traffic"],
  });

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '', 
  });

  // Center map on city
  const mapCenter = mapData?.cityBounds 
    ? {
        lat: (mapData.cityBounds.northeast.lat + mapData.cityBounds.southwest.lat) / 2,
        lng: (mapData.cityBounds.northeast.lng + mapData.cityBounds.southwest.lng) / 2
      }
    : { lat: 40.7128, lng: -74.0060 }; // Default to NYC if no bounds

  // Map options based on active view and style
  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    styles: getMapStyling(mapStyle),
    mapTypeId: activeView === 'satellite' ? 'satellite' : 'roadmap',
  };

  // Marker icons for different categories
  const getMarkerIcon = (category: string) => {
    switch (category) {
      case 'government':
        return { url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' };
      case 'healthcare':
        return { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' };
      case 'parks':
        return { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' };
      case 'transit':
        return { url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png' };
      default:
        return { url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png' };
    }
  };

  // Get icon for incident type
  const getIncidentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'accident':
        return { url: 'https://maps.google.com/mapfiles/ms/icons/red-pushpin.png' };
      case 'construction':
        return { url: 'https://maps.google.com/mapfiles/ms/icons/orange-pushpin.png' };
      case 'road closure':
        return { url: 'https://maps.google.com/mapfiles/ms/icons/purple-pushpin.png' };
      default:
        return { url: 'https://maps.google.com/mapfiles/ms/icons/yellow-pushpin.png' };
    }
  };

  // Update view effects
  useEffect(() => {
    if (activeView === 'transit') {
      setShowTransit(true);
      setShowTraffic(false);
    } else if (activeView === 'traffic') {
      setShowTraffic(true);
      setShowTransit(false);
    }
  }, [activeView]);

  // Handle map click to close info windows
  const handleMapClick = useCallback(() => {
    setSelectedPoint(null);
    setSelectedIncident(null);
  }, []);

  // Points of interest render function
  const renderPoints = () => {
    if (!mapData?.points || !showPoints) return null;
    
    return mapData.points.map((point: MapPoint) => (
      <MarkerF
        key={`point-${point.id}`}
        position={point.location}
        icon={getMarkerIcon(point.category)}
        onClick={() => {
          setSelectedPoint(point.id);
          setSelectedIncident(null);
        }}
      />
    ));
  };

  // Traffic incidents render function
  const renderIncidents = () => {
    if (!trafficData?.incidents || !showIncidents) return null;
    
    return trafficData.incidents.map((incident: TrafficIncident) => {
      // For demo, place incidents at slightly offset positions from center
      const position = {
        lat: mapCenter.lat + (Math.random() * 0.02 - 0.01),
        lng: mapCenter.lng + (Math.random() * 0.02 - 0.01)
      };
      
      return (
        <MarkerF
          key={`incident-${incident.id}`}
          position={position}
          icon={getIncidentIcon(incident.type)}
          onClick={() => {
            setSelectedIncident(incident.id);
            setSelectedPoint(null);
          }}
        />
      );
    });
  };

  // Selected point info window
  const renderSelectedPointInfo = () => {
    if (selectedPoint === null || !mapData?.points) return null;
    
    const point = mapData.points.find((p: MapPoint) => p.id === selectedPoint);
    if (!point) return null;
    
    return (
      <InfoWindowF
        position={point.location}
        onCloseClick={() => setSelectedPoint(null)}
      >
        <div className="p-2 max-w-xs">
          <h3 className="font-medium text-slate-800">{point.name}</h3>
          <p className="text-sm text-slate-600 mt-1">{point.address}</p>
          <Badge className="mt-2" variant="outline">
            {point.category}
          </Badge>
        </div>
      </InfoWindowF>
    );
  };

  // Selected incident info window
  const renderSelectedIncidentInfo = () => {
    if (selectedIncident === null || !trafficData?.incidents) return null;
    
    const incident = trafficData.incidents.find((i: TrafficIncident) => i.id === selectedIncident);
    if (!incident) return null;
    
    // For demo, place incidents at slightly offset positions
    const position = {
      lat: mapCenter.lat + (Math.random() * 0.02 - 0.01),
      lng: mapCenter.lng + (Math.random() * 0.02 - 0.01)
    };
    
    return (
      <InfoWindowF
        position={position}
        onCloseClick={() => setSelectedIncident(null)}
      >
        <div className="p-2 max-w-xs">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
            <h3 className="font-medium text-slate-800">{incident.type}</h3>
          </div>
          <p className="text-sm text-slate-600 mt-1">Location: {incident.location}</p>
          <p className="text-sm text-slate-600">Status: {incident.status}</p>
          <div className="flex justify-between mt-2">
            <Badge variant="outline" className={
              incident.severity === "Major" ? "text-red-600 border-red-600" :
              incident.severity === "Moderate" ? "text-amber-600 border-amber-600" :
              "text-blue-600 border-blue-600"
            }>
              {incident.severity}
            </Badge>
            <span className="text-xs text-slate-500">Reported: {incident.reportedTime}</span>
          </div>
        </div>
      </InfoWindowF>
    );
  };

  // Point of Interest Info
  const pointsOfInterest = [
    { name: "City Hall", category: "Government" },
    { name: "Central Park", category: "Parks & Recreation" },
    { name: "Metro Station", category: "Transit" },
    { name: "Central Hospital", category: "Healthcare" }
  ];

  // Map layer controls popover
  const renderLayerControls = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Layers className="h-4 w-4" />
          <span>Layers</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Map Layers</h3>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm" htmlFor="traffic-layer">Traffic</label>
              <Switch 
                id="traffic-layer" 
                checked={showTraffic} 
                onCheckedChange={setShowTraffic} 
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm" htmlFor="transit-layer">Transit</label>
              <Switch 
                id="transit-layer" 
                checked={showTransit} 
                onCheckedChange={setShowTransit}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm" htmlFor="points-layer">Points of Interest</label>
              <Switch 
                id="points-layer" 
                checked={showPoints} 
                onCheckedChange={setShowPoints}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm" htmlFor="incidents-layer">Traffic Incidents</label>
              <Switch 
                id="incidents-layer" 
                checked={showIncidents} 
                onCheckedChange={setShowIncidents}
              />
            </div>
          </div>
          <Separator />
          <h3 className="font-medium text-sm">Map Style</h3>
          <div className="grid grid-cols-2 gap-2">
            {mapStyles.map(style => (
              <Button 
                key={style.id} 
                variant={mapStyle === style.id ? "secondary" : "outline"} 
                size="sm"
                className="w-full"
                onClick={() => setMapStyle(style.id)}
              >
                {style.name}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <Card className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg font-medium text-slate-800">City Map & Traffic</h2>
          <div className="flex flex-wrap gap-2">
            {renderLayerControls()}
            
            <div className="flex gap-1">
              {mapViewOptions.map(option => (
                <Button
                  key={option.id}
                  variant={activeView === option.id ? "secondary" : "ghost"}
                  size="sm"
                  className="px-3 py-1 text-sm"
                  onClick={() => setActiveView(option.id)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="relative h-96 bg-slate-100 rounded-lg overflow-hidden">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={mapCenter}
              zoom={13}
              onClick={handleMapClick}
              options={mapOptions}
            >
              {showTraffic && <TrafficLayer />}
              {showTransit && <TransitLayer />}
              {renderPoints()}
              {renderIncidents()}
              {renderSelectedPointInfo()}
              {renderSelectedIncidentInfo()}
            </GoogleMap>
          ) : (
            <div className="absolute inset-0 bg-slate-900 bg-opacity-30 flex items-center justify-center">
              <div className="text-white text-center">
                <AnimatedIcon 
                  icon={<MapIcon className="h-16 w-16" />}
                  animationStyle="pulse"
                  size="xl"
                  color="white"
                />
                <p className="text-lg font-medium mt-4">Loading Map...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Points of Interest Carousel */}
        <AnimatedSection
          animation="slideUp"
          className="mt-4"
        >
          <h3 className="text-sm font-medium text-slate-700 mb-2">Points of Interest</h3>
          <div className="flex overflow-x-auto pb-2 space-x-2 hide-scrollbar">
            {pointsOfInterest.map((poi, index) => (
              <div 
                key={index}
                className="flex-shrink-0 border rounded-lg p-3 bg-slate-50 min-w-[160px]"
              >
                <h4 className="font-medium text-sm">{poi.name}</h4>
                <p className="text-xs text-slate-500">{poi.category}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
        
        <div className="mt-4 flex flex-wrap gap-3">
          <Badge variant="outline" className="bg-red-500 bg-opacity-20 text-red-600 border-red-600">
            <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
            Heavy Traffic
          </Badge>
          <Badge variant="outline" className="bg-amber-500 bg-opacity-20 text-amber-600 border-amber-600">
            <span className="w-2 h-2 mr-1 bg-amber-500 rounded-full"></span>
            Moderate Traffic
          </Badge>
          <Badge variant="outline" className="bg-green-500 bg-opacity-20 text-green-600 border-green-600">
            <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
            Clear Roads
          </Badge>
          <Badge variant="outline" className="bg-blue-500 bg-opacity-20 text-blue-600 border-blue-600">
            <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
            Construction
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
