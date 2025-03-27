import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronRight } from "lucide-react";
import { EmergencyAlert } from "@shared/schema";

export function EmergencyAlerts() {
  const { data: alerts, isLoading } = useQuery<EmergencyAlert[]>({
    queryKey: ["/api/emergency-alerts"],
  });

  if (isLoading) {
    return (
      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Emergency Alerts</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'danger':
        return 'bg-red-50 border-red-500 text-red-700';
      case 'warning':
        return 'bg-amber-50 border-amber-500 text-amber-700';
      case 'info':
        return 'bg-blue-50 border-blue-500 text-blue-700';
      default:
        return 'bg-slate-50 border-slate-500 text-slate-700';
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow">
      <CardHeader>
        <CardTitle>Emergency Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts?.map((alert) => (
            <div key={alert.id} className={`p-3 ${getAlertStyles(alert.type)} border-l-4 rounded-r-lg`}>
              <div className="flex justify-between">
                <h4 className="font-medium">{alert.title}</h4>
                <span className="text-xs text-slate-500">{alert.time}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <Button variant="ghost" className="w-full text-primary hover:text-primary-dark flex justify-center items-center">
            View All Alerts
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
