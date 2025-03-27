import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "@shared/schema";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function ActivityTable() {
  const [page, setPage] = useState(1);
  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  const itemsPerPage = 4;
  const totalPages = activities ? Math.ceil(activities.length / itemsPerPage) : 1;
  const paginatedActivities = activities?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getIconColorClass = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-blue-100 text-blue-500';
      case 'secondary': return 'bg-teal-100 text-teal-500';
      case 'warning': return 'bg-amber-100 text-amber-500';
      case 'success': return 'bg-green-100 text-green-500';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const getStatusBadgeClass = (color: string) => {
    switch (color) {
      case 'danger': return 'bg-red-100 text-red-700 border-red-200';
      case 'warning': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'info': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'success': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[250px]">Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="max-w-[300px]">Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedActivities?.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full ${getIconColorClass(activity.color)} flex items-center justify-center`}>
                        <span className="material-icons text-sm">{activity.icon}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{activity.service}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadgeClass(activity.statusColor)}>
                      {activity.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {activity.time}
                  </TableCell>
                  <TableCell className="text-sm text-slate-500 max-w-[300px] truncate">
                    {activity.details}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="link" className="text-primary hover:text-primary-dark">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(page * itemsPerPage, activities?.length || 0)}</span> of <span className="font-medium">{activities?.length || 0}</span> results
              </p>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink 
                      href="#" 
                      isActive={page === index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage(page + 1);
                    }}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
