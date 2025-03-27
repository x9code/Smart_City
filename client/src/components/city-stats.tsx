import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Wind, Activity, Users } from "lucide-react";

export function CityStats() {
  const { data: cityStats, isLoading } = useQuery({
    queryKey: ["/api/city-stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="bg-white rounded-lg shadow">
            <CardContent className="p-6">
              <div className="h-20 flex items-center justify-center">
                <div className="animate-pulse h-4 w-3/4 bg-slate-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card className="bg-white rounded-lg shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Traffic Congestion</h3>
            <span className="material-icons text-primary">traffic</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-800">{cityStats?.congestionLevel || "N/A"}</span>
            <span className="ml-2 text-sm font-medium text-green-500 flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" />
              5%
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">Compared to last week</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-lg shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Air Quality Index</h3>
            <Wind className="h-5 w-5 text-teal-500" />
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-800">{cityStats?.airQuality || "N/A"}</span>
            <span className="ml-2 text-sm font-medium text-amber-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              3%
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">Moderate</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-lg shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Emergency Response</h3>
            <Activity className="h-5 w-5 text-orange-500" />
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-800">{cityStats?.emergencyResponseTime || "N/A"}</span>
            <span className="ml-2 text-xs text-slate-600">min</span>
            <span className="ml-2 text-sm font-medium text-green-500 flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" />
              0.5
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">Average response time</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-lg shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Active Visitors</h3>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-800">{cityStats?.activeVisitors || "N/A"}</span>
            <span className="ml-2 text-sm font-medium text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              12%
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">Tourism season peak</div>
        </CardContent>
      </Card>
    </div>
  );
}
