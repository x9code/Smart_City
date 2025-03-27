import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { type ScrapbookEntry } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { PencilIcon, TrashIcon, PlusCircleIcon, CameraIcon, EyeIcon, TagIcon, StarIcon, MapPinIcon, LocateIcon, CalendarIcon, BookOpenIcon, HeartIcon, Share2Icon } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AnimatedCard } from "@/components/ui/animated-card";

// Form validation schema
const scrapbookEntrySchema = z.object({
  title: z.string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  description: z.string().optional(),
  location: z.string()
    .min(3, { message: "Location must be at least 3 characters" }),
  locationCoordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional()
  }).optional(),
  date: z.date().optional(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  rating: z.number().min(1).max(5).optional(),
  isPublic: z.boolean().default(false),
});

type FormValues = z.infer<typeof scrapbookEntrySchema>;

export default function ScrapbookPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isNewEntryDialogOpen, setIsNewEntryDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("myMemories");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [viewingEntry, setViewingEntry] = useState<ScrapbookEntry | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Query client for cache invalidation
  const queryClientInstance = useQueryClient();
  
  // Default form values
  const defaultValues: Partial<FormValues> = {
    title: "",
    description: "",
    location: "",
    locationCoordinates: { lat: 0, lng: 0 },
    tags: [],
    rating: 0,
    isPublic: false,
  };

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(scrapbookEntrySchema),
    defaultValues,
  });

  // Fetch my scrapbook entries
  const { 
    data: myEntries = [], 
    isLoading: isLoadingMyEntries,
    error: myEntriesError,
  } = useQuery<ScrapbookEntry[]>({
    queryKey: ["/api/scrapbook/my-entries"],
    enabled: !!user,
  });

  // Fetch public scrapbook entries
  const { 
    data: publicEntries = [], 
    isLoading: isLoadingPublicEntries,
    error: publicEntriesError,
  } = useQuery<ScrapbookEntry[]>({
    queryKey: ["/api/scrapbook/public"],
  });

  // Create new entry mutation
  const createEntryMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/scrapbook", data);
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClientInstance.invalidateQueries({ queryKey: ["/api/scrapbook/my-entries"] });
      queryClientInstance.invalidateQueries({ queryKey: ["/api/scrapbook/public"] });
      
      toast({
        title: "Memory Created",
        description: "Your memory has been saved to your scrapbook.",
        variant: "default",
      });
      
      // Reset form and close dialog
      form.reset(defaultValues);
      setIsNewEntryDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error Creating Memory",
        description: error.message || "There was an error saving your memory. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete entry mutation
  const deleteEntryMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/scrapbook/${id}`);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClientInstance.invalidateQueries({ queryKey: ["/api/scrapbook/my-entries"] });
      queryClientInstance.invalidateQueries({ queryKey: ["/api/scrapbook/public"] });
      
      toast({
        title: "Memory Deleted",
        description: "Your memory has been removed from your scrapbook.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Deleting Memory",
        description: error.message || "There was an error deleting your memory. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  function onSubmit(data: FormValues) {
    createEntryMutation.mutate(data);
  }

  // Handle adding a new tag
  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      const updatedTags = [...selectedTags, newTag];
      setSelectedTags(updatedTags);
      form.setValue("tags", updatedTags);
      setNewTag("");
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    const updatedTags = selectedTags.filter(t => t !== tag);
    setSelectedTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  // Handle view memory
  const handleViewMemory = (entry: ScrapbookEntry) => {
    setViewingEntry(entry);
    setIsViewDialogOpen(true);
  };

  // Handle delete memory
  const handleDeleteMemory = (id: number) => {
    if (window.confirm("Are you sure you want to delete this memory? This action cannot be undone.")) {
      deleteEntryMutation.mutate(id);
    }
  };

  // Redirect to login if not authenticated when trying to view My Memories
  useEffect(() => {
    if (currentTab === "myMemories" && !user) {
      setLocation("/auth");
    }
  }, [currentTab, user, setLocation]);

  // Add rating stars component
  const RatingStars = ({ rating }: { rating: number | null }) => {
    const stars = [];
    const ratingValue = rating || 0;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          className={`h-4 w-4 ${i <= ratingValue ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
        />
      );
    }
    
    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <AnimatedSection animation="fadeIn" className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Interactive City Memory Scrapbook</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Document and share your experiences in Bhubaneswar
        </p>
        
        {user && (
          <Button 
            onClick={() => setIsNewEntryDialogOpen(true)} 
            className="mb-4"
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Create New Memory
          </Button>
        )}
      </AnimatedSection>

      <Tabs 
        defaultValue="myMemories" 
        value={currentTab}
        onValueChange={setCurrentTab}
        className="mb-8"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="myMemories">My Memories</TabsTrigger>
          <TabsTrigger value="publicMemories">Public Memories</TabsTrigger>
        </TabsList>
        
        {/* My Memories Tab */}
        <TabsContent value="myMemories">
          {!user ? (
            <div className="text-center py-12">
              <h3 className="text-xl mb-4">Please log in to view your memories</h3>
              <Button onClick={() => setLocation("/auth")}>Log In</Button>
            </div>
          ) : isLoadingMyEntries ? (
            <div className="text-center py-12">
              <p>Loading your memories...</p>
            </div>
          ) : myEntriesError ? (
            <div className="text-center py-12 text-destructive">
              <p>Error loading your memories. Please try again.</p>
            </div>
          ) : myEntries.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl mb-4">You haven't created any memories yet</h3>
              <p className="text-muted-foreground mb-6">
                Start documenting your experiences in Bhubaneswar by creating your first memory.
              </p>
              <Button onClick={() => setIsNewEntryDialogOpen(true)}>Create Your First Memory</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {myEntries.map((entry, index) => (
                <AnimatedCard 
                  key={entry.id} 
                  animationStyle="hover"
                  delay={index * 0.1}
                  className="overflow-hidden"
                >
                  <CardHeader className="pb-3 relative">
                    {entry.imageUrl ? (
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-0">
                        <img 
                          src={entry.imageUrl} 
                          alt={entry.title} 
                          className="w-full h-full object-cover absolute inset-0 -z-10"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent z-0"></div>
                    )}
                    <CardTitle className="relative z-10 text-white">{entry.title}</CardTitle>
                    <div className="flex items-center justify-between relative z-10">
                      <p className="text-sm text-white/80 flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                      {entry.isPublic && (
                        <Badge variant="secondary" className="text-xs">Public</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center mb-3">
                      <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm">{entry.location}</p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {entry.description}
                    </p>
                    {entry.rating && (
                      <div className="mt-3">
                        <RatingStars rating={entry.rating} />
                      </div>
                    )}
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {entry.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewMemory(entry)}
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteMemory(entry.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </AnimatedCard>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Public Memories Tab */}
        <TabsContent value="publicMemories">
          {isLoadingPublicEntries ? (
            <div className="text-center py-12">
              <p>Loading public memories...</p>
            </div>
          ) : publicEntriesError ? (
            <div className="text-center py-12 text-destructive">
              <p>Error loading public memories. Please try again.</p>
            </div>
          ) : publicEntries.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl mb-4">No public memories available</h3>
              <p className="text-muted-foreground">
                Be the first to share your experiences in Bhubaneswar.
              </p>
              {user && (
                <Button onClick={() => setIsNewEntryDialogOpen(true)} className="mt-4">
                  Create and Share a Memory
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {publicEntries.map((entry, index) => (
                <AnimatedCard 
                  key={entry.id} 
                  animationStyle="hover"
                  delay={index * 0.1}
                  className="overflow-hidden"
                >
                  <CardHeader className="pb-3 relative">
                    {entry.imageUrl ? (
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-0">
                        <img 
                          src={entry.imageUrl} 
                          alt={entry.title} 
                          className="w-full h-full object-cover absolute inset-0 -z-10"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent z-0"></div>
                    )}
                    <CardTitle className="relative z-10 text-white">{entry.title}</CardTitle>
                    <div className="flex items-center justify-between relative z-10">
                      <p className="text-sm text-white/80 flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center mb-3">
                      <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm">{entry.location}</p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {entry.description}
                    </p>
                    {entry.rating && (
                      <div className="mt-3">
                        <RatingStars rating={entry.rating} />
                      </div>
                    )}
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {entry.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewMemory(entry)}
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {user && entry.userId === user.id && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteMemory(entry.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </AnimatedCard>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create New Memory Dialog */}
      <Dialog open={isNewEntryDialogOpen} onOpenChange={setIsNewEntryDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Memory</DialogTitle>
            <DialogDescription>
              Document your experience in Bhubaneswar. Share it with others or keep it private.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="My memorable experience..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Lingaraj Temple, Bhubaneswar" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                              field.onChange(e.target.value ? new Date(e.target.value) : undefined);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              onClick={() => {
                                // Placeholder for image upload feature
                                toast({
                                  title: "Image Upload",
                                  description: "This feature will be implemented soon.",
                                  variant: "default",
                                });
                              }}
                            >
                              <CameraIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Provide a URL to an image or upload one (coming soon)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (1-5)</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value?.toString() || ""}
                            onValueChange={(value) => field.onChange(parseInt(value) || undefined)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Rate your experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Fair</SelectItem>
                              <SelectItem value="3">3 - Good</SelectItem>
                              <SelectItem value="4">4 - Very Good</SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your experience..." 
                            className="min-h-[180px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Tags</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedTags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-xs rounded-full h-4 w-4 inline-flex items-center justify-center bg-muted-foreground/20 hover:bg-muted-foreground/40"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleAddTag}
                      >
                        <TagIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Share Publicly</FormLabel>
                          <FormDescription>
                            Make this memory visible to all users
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsNewEntryDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createEntryMutation.isPending}
                >
                  {createEntryMutation.isPending ? 'Saving...' : 'Save Memory'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Memory Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewingEntry && (
            <>
              <DialogHeader>
                <DialogTitle>{viewingEntry.title}</DialogTitle>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-muted-foreground flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {new Date(viewingEntry.date).toLocaleDateString()}
                  </p>
                  {viewingEntry.isPublic && (
                    <Badge variant="secondary">Public</Badge>
                  )}
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                {viewingEntry.imageUrl && (
                  <div className="relative w-full h-64 rounded-md overflow-hidden">
                    <img 
                      src={viewingEntry.imageUrl} 
                      alt={viewingEntry.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p>{viewingEntry.location}</p>
                  </div>
                </div>
                
                {viewingEntry.description && (
                  <div className="flex items-start gap-2">
                    <BookOpenIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Description</h4>
                      <p className="whitespace-pre-line">{viewingEntry.description}</p>
                    </div>
                  </div>
                )}
                
                {viewingEntry.rating && (
                  <div className="flex items-start gap-2">
                    <StarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Rating</h4>
                      <div className="mt-1">
                        <RatingStars rating={viewingEntry.rating} />
                      </div>
                    </div>
                  </div>
                )}
                
                {viewingEntry.tags && viewingEntry.tags.length > 0 && (
                  <div className="flex items-start gap-2">
                    <TagIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Tags</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {viewingEntry.tags.map(tag => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex justify-between">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
                <div className="flex gap-2">
                  {user && viewingEntry.userId === user.id && (
                    <Button 
                      variant="outline"
                      onClick={() => handleDeleteMemory(viewingEntry.id)}
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  )}
                  {viewingEntry.isPublic && (
                    <Button variant="outline">
                      <Share2Icon className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}