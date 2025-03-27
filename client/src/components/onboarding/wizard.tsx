import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Bell,
  Settings,
  Map,
  Lock,
  Info,
  Check,
  X,
  Home,
  User,
  Phone,
  Mail,
  Landmark,
  BookOpen,
  Car,
  Heart,
  Shield,
  Compass
} from "lucide-react";

interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

export default function OnboardingWizard() {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: user?.name || "",
      address: "",
      phone: "",
      email: user?.username || "",
      preferredLanguage: "english"
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      emergencyAlerts: true,
      trafficUpdates: true,
      communityEvents: true,
      serviceDisruptions: true,
      cityAnnouncements: true,
      educationalPrograms: false
    },
    services: {
      traffic: true,
      healthcare: true,
      safety: true,
      education: false,
      tourism: false,
      map: true
    },
    privacy: {
      shareLocationData: "anonymized",
      dataSharingConsent: false,
      marketingConsent: false,
      thirdPartyConsent: false,
      dataRetentionPeriod: "1year"
    },
    preferences: {
      darkMode: false,
      highContrast: false,
      textSize: "medium",
      defaultView: "dashboard",
      accessibilityNeeds: ""
    }
  });

  // Wizard steps
  const steps: WizardStep[] = [
    {
      id: "welcome",
      title: "Welcome to Smart City",
      description: "Let's set up your Smart City profile to get the most out of our services.",
      icon: <Home className="h-6 w-6" />
    },
    {
      id: "personal",
      title: "Personal Information",
      description: "Help us personalize your experience with some basic information.",
      icon: <User className="h-6 w-6" />
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Choose how and when you want to be notified about important updates.",
      icon: <Bell className="h-6 w-6" />
    },
    {
      id: "services",
      title: "City Services",
      description: "Select the services you're interested in using.",
      icon: <Landmark className="h-6 w-6" />
    },
    {
      id: "privacy",
      title: "Privacy Settings",
      description: "Control how your data is used within the Smart City platform.",
      icon: <Lock className="h-6 w-6" />
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Customize how the Smart City platform looks and feels for you.",
      icon: <Settings className="h-6 w-6" />
    },
    {
      id: "complete",
      title: "All Set!",
      description: "Your Smart City profile is now ready to use.",
      icon: <CheckCircle2 className="h-6 w-6" />
    }
  ];

  const currentStep = steps[currentStepIndex];
  const progress = (currentStepIndex / (steps.length - 1)) * 100;

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section as keyof typeof prevData],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    // Validate current step if needed
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSkip = () => {
    // Skip to the last step
    setCurrentStepIndex(steps.length - 1);
    window.scrollTo(0, 0);
  };

  const handleComplete = async () => {
    // Save all preferences to user profile
    console.log("Saving user preferences:", formData);
    
    try {
      const response = await fetch('/api/user-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          ...formData
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }
      
      const data = await response.json();
      
      toast({
        title: "Setup Complete!",
        description: "Your Smart City profile has been configured successfully.",
        variant: "default",
      });
      setIsCompleted(true);
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        setLocation("/");
      }, 2000);
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Render different step content based on the current step
  const renderStepContent = () => {
    switch (currentStep.id) {
      case "welcome":
        return (
          <div className="space-y-4">
            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg overflow-hidden flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center z-10">
                  <h2 className="text-3xl font-bold mb-2">Welcome to Smart City</h2>
                  <p className="text-lg">Your gateway to modern urban living</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1244&h=1244&q=80')] bg-center bg-cover"></div>
            </div>
            
            <div className="text-center px-2">
              <p className="text-xl font-medium text-primary">Hello, {user?.name || "there"}!</p>
              <div className="mt-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <p className="mb-4 text-slate-700">
                    This quick setup will help you get the most out of the Smart City platform. 
                    You'll be able to customize your notifications, select services you're interested in, 
                    and set your privacy preferences.
                  </p>
                  <p className="text-slate-600">
                    It only takes about 2 minutes to complete, but you can skip this if you prefer 
                    to use the default settings.
                  </p>
                </div>
                <div className="w-40 h-40 rounded-full shadow-lg overflow-hidden flex-shrink-0 border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
                    alt="Smart City App" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "personal":
        return (
          <div className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="bg-blue-50/50 rounded-lg p-4 mb-4 border border-blue-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  Your personal information helps us customize the Smart City experience for you. 
                  We protect your data according to our privacy policy.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-base flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary/70" />
                      Full Name
                    </Label>
                    <Input 
                      id="fullName" 
                      placeholder="Your full name" 
                      value={formData.personalInfo.fullName}
                      onChange={(e) => handleInputChange("personalInfo", "fullName", e.target.value)}
                      className="border-slate-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary/70" />
                      Email Address
                    </Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="Your email address" 
                      value={formData.personalInfo.email}
                      onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                      className="border-slate-300"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary/70" />
                      Address
                    </Label>
                    <Input 
                      id="address" 
                      placeholder="Your address" 
                      value={formData.personalInfo.address}
                      onChange={(e) => handleInputChange("personalInfo", "address", e.target.value)}
                      className="border-slate-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary/70" />
                      Phone Number
                    </Label>
                    <Input 
                      id="phone" 
                      placeholder="Your phone number" 
                      value={formData.personalInfo.phone}
                      onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                      className="border-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 border border-slate-200 rounded-lg bg-white">
              <Label className="text-base flex items-center mb-3">
                <BookOpen className="h-4 w-4 mr-2 text-primary/70" />
                Preferred Language
              </Label>
              <RadioGroup 
                value={formData.personalInfo.preferredLanguage}
                onValueChange={(value) => handleInputChange("personalInfo", "preferredLanguage", value)}
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
              >
                <div className="border border-slate-200 rounded-lg p-3 flex flex-col items-center hover:border-primary hover:bg-slate-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="english" id="english" className="sr-only" />
                  <span className="text-2xl mb-1">🇺🇸</span>
                  <Label htmlFor="english" className="cursor-pointer">English</Label>
                </div>
                <div className="border border-slate-200 rounded-lg p-3 flex flex-col items-center hover:border-primary hover:bg-slate-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="spanish" id="spanish" className="sr-only" />
                  <span className="text-2xl mb-1">🇪🇸</span>
                  <Label htmlFor="spanish" className="cursor-pointer">Spanish</Label>
                </div>
                <div className="border border-slate-200 rounded-lg p-3 flex flex-col items-center hover:border-primary hover:bg-slate-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="french" id="french" className="sr-only" />
                  <span className="text-2xl mb-1">🇫🇷</span>
                  <Label htmlFor="french" className="cursor-pointer">French</Label>
                </div>
                <div className="border border-slate-200 rounded-lg p-3 flex flex-col items-center hover:border-primary hover:bg-slate-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="chinese" id="chinese" className="sr-only" />
                  <span className="text-2xl mb-1">🇨🇳</span>
                  <Label htmlFor="chinese" className="cursor-pointer">Chinese</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Notification Methods</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="emailNotification" 
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) => 
                      handleInputChange("notifications", "email", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="emailNotification" className="font-medium">Email</Label>
                    <p className="text-sm text-slate-500">Receive notifications via email</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="pushNotification" 
                    checked={formData.notifications.push}
                    onCheckedChange={(checked) => 
                      handleInputChange("notifications", "push", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="pushNotification" className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-slate-500">Receive notifications in your browser</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="smsNotification" 
                    checked={formData.notifications.sms}
                    onCheckedChange={(checked) => 
                      handleInputChange("notifications", "sms", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="smsNotification" className="font-medium">SMS</Label>
                    <p className="text-sm text-slate-500">Receive notifications via text message</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Notification Types</Label>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="emergencyAlerts" 
                    checked={formData.notifications.emergencyAlerts}
                    onCheckedChange={(checked) => 
                      handleInputChange("notifications", "emergencyAlerts", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="emergencyAlerts" className="font-medium">Emergency Alerts</Label>
                    <p className="text-sm text-slate-500">Critical safety and emergency notifications</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="trafficUpdates" 
                    checked={formData.notifications.trafficUpdates}
                    onCheckedChange={(checked) => 
                      handleInputChange("notifications", "trafficUpdates", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="trafficUpdates" className="font-medium">Traffic Updates</Label>
                    <p className="text-sm text-slate-500">Road conditions, closures, and public transit alerts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="communityEvents" 
                    checked={formData.notifications.communityEvents}
                    onCheckedChange={(checked) => 
                      handleInputChange("notifications", "communityEvents", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="communityEvents" className="font-medium">Community Events</Label>
                    <p className="text-sm text-slate-500">Local events, festivals, and community gatherings</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="serviceDisruptions" 
                    checked={formData.notifications.serviceDisruptions}
                    onCheckedChange={(checked) => 
                      handleInputChange("notifications", "serviceDisruptions", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="serviceDisruptions" className="font-medium">Service Disruptions</Label>
                    <p className="text-sm text-slate-500">Utility outages and public service changes</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="cityAnnouncements" 
                    checked={formData.notifications.cityAnnouncements}
                    onCheckedChange={(checked) => 
                      handleInputChange("notifications", "cityAnnouncements", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="cityAnnouncements" className="font-medium">City Announcements</Label>
                    <p className="text-sm text-slate-500">Important updates from city officials</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="educationalPrograms" 
                    checked={formData.notifications.educationalPrograms}
                    onCheckedChange={(checked) => 
                      handleInputChange("notifications", "educationalPrograms", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="educationalPrograms" className="font-medium">Educational Programs</Label>
                    <p className="text-sm text-slate-500">Updates on schools, courses, and learning opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "services":
        return (
          <div className="space-y-6">
            <p className="text-slate-600">
              Select the city services you'd like to have quick access to in your dashboard:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative">
                <div className="absolute top-4 right-4">
                  <Checkbox 
                    id="trafficService" 
                    checked={formData.services.traffic}
                    onCheckedChange={(checked) => 
                      handleInputChange("services", "traffic", Boolean(checked))
                    }
                  />
                </div>
                <div className="mb-3 flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Car className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium">Traffic Monitoring</h3>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  Real-time traffic updates, congestion levels, and incident reports
                </p>
              </div>
              
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative">
                <div className="absolute top-4 right-4">
                  <Checkbox 
                    id="healthcareService" 
                    checked={formData.services.healthcare}
                    onCheckedChange={(checked) => 
                      handleInputChange("services", "healthcare", Boolean(checked))
                    }
                  />
                </div>
                <div className="mb-3 flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-medium">Healthcare Services</h3>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  Hospital wait times, healthcare facilities, and medical resources
                </p>
              </div>
              
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative">
                <div className="absolute top-4 right-4">
                  <Checkbox 
                    id="safetyService" 
                    checked={formData.services.safety}
                    onCheckedChange={(checked) => 
                      handleInputChange("services", "safety", Boolean(checked))
                    }
                  />
                </div>
                <div className="mb-3 flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium">Women's Safety</h3>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  Safety zones, emergency contacts, and resources for women's safety
                </p>
              </div>
              
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative">
                <div className="absolute top-4 right-4">
                  <Checkbox 
                    id="educationService" 
                    checked={formData.services.education}
                    onCheckedChange={(checked) => 
                      handleInputChange("services", "education", Boolean(checked))
                    }
                  />
                </div>
                <div className="mb-3 flex items-center space-x-3">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <BookOpen className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium">Education</h3>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  Schools, courses, educational resources, and learning opportunities
                </p>
              </div>
              
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative">
                <div className="absolute top-4 right-4">
                  <Checkbox 
                    id="tourismService" 
                    checked={formData.services.tourism}
                    onCheckedChange={(checked) => 
                      handleInputChange("services", "tourism", Boolean(checked))
                    }
                  />
                </div>
                <div className="mb-3 flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Compass className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium">Tourism</h3>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  Tourist attractions, events, restaurants, and travel information
                </p>
              </div>
              
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative">
                <div className="absolute top-4 right-4">
                  <Checkbox 
                    id="mapService" 
                    checked={formData.services.map}
                    onCheckedChange={(checked) => 
                      handleInputChange("services", "map", Boolean(checked))
                    }
                  />
                </div>
                <div className="mb-3 flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-full">
                    <Map className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-medium">City Map</h3>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  Interactive map with points of interest, routes, and city information
                </p>
              </div>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Location Data Sharing</Label>
                <RadioGroup 
                  value={formData.privacy.shareLocationData}
                  onValueChange={(value) => handleInputChange("privacy", "shareLocationData", value)}
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="precise" id="precise" />
                    <div className="space-y-1">
                      <Label htmlFor="precise" className="font-medium">Precise Location</Label>
                      <p className="text-sm text-slate-500">Share exact location for best service</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="anonymized" id="anonymized" />
                    <div className="space-y-1">
                      <Label htmlFor="anonymized" className="font-medium">Anonymized Location</Label>
                      <p className="text-sm text-slate-500">Share approximate location for general service</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="disabled" id="disabled" />
                    <div className="space-y-1">
                      <Label htmlFor="disabled" className="font-medium">Disabled</Label>
                      <p className="text-sm text-slate-500">Don't share location data (some features may not work)</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Data Retention Period</Label>
                <RadioGroup 
                  value={formData.privacy.dataRetentionPeriod}
                  onValueChange={(value) => handleInputChange("privacy", "dataRetentionPeriod", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30days" id="30days" />
                    <Label htmlFor="30days">30 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6months" id="6months" />
                    <Label htmlFor="6months">6 months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1year" id="1year" />
                    <Label htmlFor="1year">1 year</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="indefinite" id="indefinite" />
                    <Label htmlFor="indefinite">Until account deletion</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="dataSharingConsent" 
                  checked={formData.privacy.dataSharingConsent}
                  onCheckedChange={(checked) => 
                    handleInputChange("privacy", "dataSharingConsent", Boolean(checked))
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="dataSharingConsent" className="font-medium">Data Sharing Consent</Label>
                  <p className="text-sm text-slate-500">
                    Allow anonymous usage data to be shared for city planning and service improvements
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="marketingConsent" 
                  checked={formData.privacy.marketingConsent}
                  onCheckedChange={(checked) => 
                    handleInputChange("privacy", "marketingConsent", Boolean(checked))
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="marketingConsent" className="font-medium">Marketing Communications</Label>
                  <p className="text-sm text-slate-500">
                    Receive marketing communications about city services and events
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="thirdPartyConsent" 
                  checked={formData.privacy.thirdPartyConsent}
                  onCheckedChange={(checked) => 
                    handleInputChange("privacy", "thirdPartyConsent", Boolean(checked))
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="thirdPartyConsent" className="font-medium">Third-Party Sharing</Label>
                  <p className="text-sm text-slate-500">
                    Allow data to be shared with trusted third-party service providers
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  Your privacy is important to us. You can change these settings at any time in your account preferences.
                  For more information, please review our <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Appearance</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="darkMode" 
                    checked={formData.preferences.darkMode}
                    onCheckedChange={(checked) => 
                      handleInputChange("preferences", "darkMode", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="darkMode" className="font-medium">Dark Mode</Label>
                    <p className="text-sm text-slate-500">Use dark theme for the application</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="highContrast" 
                    checked={formData.preferences.highContrast}
                    onCheckedChange={(checked) => 
                      handleInputChange("preferences", "highContrast", Boolean(checked))
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="highContrast" className="font-medium">High Contrast</Label>
                    <p className="text-sm text-slate-500">Improve visibility with higher contrast</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Text Size</Label>
              <RadioGroup 
                value={formData.preferences.textSize}
                onValueChange={(value) => handleInputChange("preferences", "textSize", value)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small" className="text-sm">Small</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="large" />
                    <Label htmlFor="large" className="text-lg">Large</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <Label>Default View</Label>
              <RadioGroup 
                value={formData.preferences.defaultView}
                onValueChange={(value) => handleInputChange("preferences", "defaultView", value)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dashboard" id="dashboard" />
                    <Label htmlFor="dashboard">Dashboard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="map" id="mapView" />
                    <Label htmlFor="mapView">City Map</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accessibilityNeeds">Accessibility Needs</Label>
              <Textarea 
                id="accessibilityNeeds" 
                placeholder="Tell us about any specific accessibility requirements you have"
                value={formData.preferences.accessibilityNeeds}
                onChange={(e) => handleInputChange("preferences", "accessibilityNeeds", e.target.value)}
              />
            </div>
          </div>
        );

      case "complete":
        return (
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-lg"></div>
              <div className="relative pt-20 pb-8 px-4">
                <div className="mx-auto w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 border-4 border-green-500">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-bold mt-4">Your Smart City Profile is Ready!</h3>
                
                <p className="text-slate-600 max-w-lg mx-auto mt-3">
                  You've successfully set up your Smart City profile with your preferences.
                  You can now start exploring all the services and features available to you.
                </p>
                
                <div className="flex justify-center mt-6">
                  <img 
                    src="https://images.unsplash.com/photo-1498736297812-3a08021f206f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80" 
                    alt="Smart City" 
                    className="w-full max-w-lg rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg mx-auto max-w-lg shadow border">
              <h4 className="font-medium text-slate-800 mb-4 text-left flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                Profile Summary
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="text-sm font-medium text-primary mb-2">Personal Details</div>
                  <div className="font-medium">{formData.personalInfo.fullName}</div>
                  <div className="text-sm text-slate-500">{formData.personalInfo.email}</div>
                  <div className="text-sm text-slate-500 mt-1">Language: {formData.personalInfo.preferredLanguage}</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="text-sm font-medium text-primary mb-2">Selected Services</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(formData.services)
                      .filter(([_, value]) => value)
                      .map(([key]) => (
                        <span key={key} className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                      ))}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="text-sm font-medium text-primary mb-2">Notification Methods</div>
                  <div className="flex gap-2">
                    {formData.notifications.email && (
                      <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                        <Mail className="h-3 w-3 mr-1" /> Email
                      </span>
                    )}
                    {formData.notifications.push && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-700/10">
                        <Bell className="h-3 w-3 mr-1" /> Push
                      </span>
                    )}
                    {formData.notifications.sms && (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                        <Phone className="h-3 w-3 mr-1" /> SMS
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <div className="text-sm font-medium text-primary mb-2">Privacy Level</div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-slate-600" />
                    <span className="font-medium">
                      {formData.privacy.shareLocationData === "precise" 
                        ? "High Personalization" 
                        : formData.privacy.shareLocationData === "anonymized"
                        ? "Balanced" 
                        : "Maximum Privacy"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Render step indicators
  const renderStepIndicators = () => {
    return (
      <div className="flex items-center justify-center space-x-2 mb-8">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`w-2 h-2 rounded-full ${
              index <= currentStepIndex ? "bg-primary" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
    );
  };

  // Button controls based on current step
  const renderControls = () => {
    // Welcome step
    if (currentStepIndex === 0) {
      return (
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleSkip}
          >
            Skip Setup
          </Button>
          <Button onClick={handleNext}>
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    }
    
    // Completion step
    if (currentStepIndex === steps.length - 1) {
      return (
        <div className="flex justify-center">
          <Button 
            onClick={handleComplete}
            disabled={isCompleted}
          >
            {isCompleted ? 
              <span className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Completed
              </span> : 
              "Finish Setup"
            }
          </Button>
        </div>
      );
    }
    
    // Other steps
    return (
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center pb-2">
          <div className="mb-2 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {currentStep.icon}
            </div>
          </div>
          <CardTitle>{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Progress value={progress} className="mb-8" />
          {renderStepIndicators()}
          {renderStepContent()}
        </CardContent>
        
        <CardFooter className="pt-2">
          {renderControls()}
        </CardFooter>
      </Card>
    </div>
  );
}