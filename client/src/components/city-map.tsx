import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Map as MapIcon } from "lucide-react";

const mapViewOptions = [
  { id: "traffic", label: "Traffic" },
  { id: "transit", label: "Public Transit" },
  { id: "heatmap", label: "Heatmap" },
];

export function CityMap() {
  const [activeView, setActiveView] = useState("traffic");

  return (
    <Card className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-slate-800">City Map & Traffic</h2>
          <div className="flex gap-2">
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
      <CardContent className="p-4">
        <div className="relative h-96 bg-slate-100 rounded-lg overflow-hidden">
          {/* Map placeholder - to be replaced with actual map component */}
          <div className="absolute inset-0 bg-slate-900 bg-opacity-30 flex items-center justify-center">
            <div className="text-white text-center">
              <MapIcon className="h-16 w-16 mb-2 mx-auto" />
              <p className="text-lg font-medium">Map Integration</p>
              <p className="text-sm mt-2">Real-time traffic data visualization would appear here</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 text-white border-white hover:bg-white hover:text-slate-900"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full Map
              </Button>
            </div>
          </div>
        </div>
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
