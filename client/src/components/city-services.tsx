import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronRight } from "lucide-react";

export function CityServices() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Smart City Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="animate-pulse flex flex-col">
                  <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
                  <div className="h-4 w-3/4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 w-full bg-slate-200 rounded mb-1"></div>
                  <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getIconColorClass = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-blue-100 text-blue-500';
      case 'secondary': return 'bg-teal-100 text-teal-500';
      case 'accent': return 'bg-orange-100 text-orange-500';
      case 'danger': return 'bg-red-100 text-red-500';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Smart City Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {services?.map((service: any) => (
          <Card key={service.id} className="bg-white rounded-lg shadow overflow-hidden">
            <CardContent className="p-6">
              <div className={`${getIconColorClass(service.color)} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                <span className="material-icons">{service.icon}</span>
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">{service.name}</h3>
              <p className="text-slate-600 text-sm">{service.description}</p>
            </CardContent>
            <CardFooter className="bg-slate-50 px-6 py-3 flex justify-between items-center">
              <span className="text-xs font-medium text-green-500 flex items-center">
                <span className="block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                {service.status}
              </span>
              <Button variant="ghost" className="text-primary text-sm font-medium flex items-center">
                Explore
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
