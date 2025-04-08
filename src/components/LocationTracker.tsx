
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Share2, User, Users } from 'lucide-react';

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  timestamp: number | null;
}

const LocationTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [locationData, setLocationData] = useState<LocationData>({
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null,
  });
  const [shareWithContacts, setShareWithContacts] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const { toast } = useToast();

  const startTracking = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support location tracking.",
        variant: "destructive",
      });
      return;
    }

    // Request permission and start tracking
    const id = navigator.geolocation.watchPosition(
      (position) => {
        setLocationData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
        
        setIsTracking(true);
        
        if (shareWithContacts) {
          // In a real application, this would periodically share location with trusted contacts
          console.log("Location shared with trusted contacts:", position.coords);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        toast({
          title: "Location error",
          description: getLocationErrorMessage(error),
          variant: "destructive",
        });
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
    
    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
      
      toast({
        title: "Tracking stopped",
        description: "Your location is no longer being tracked.",
      });
    }
  };

  const toggleTracking = () => {
    if (isTracking) {
      stopTracking();
    } else {
      startTracking();
    }
  };

  const getLocationErrorMessage = (error: GeolocationPositionError) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        return "Location permission denied. Please enable location services for this site.";
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable.";
      case error.TIMEOUT:
        return "The request to get your location timed out.";
      default:
        return "An unknown error occurred.";
    }
  };

  const formatLocationTimestamp = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleTimeString();
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-safety-600" />
          Location Tracking
        </CardTitle>
        <CardDescription>
          Track your location and optionally share it with trusted contacts
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="tracking-toggle" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4 text-muted-foreground" />
            Track My Location
          </Label>
          <Switch
            id="tracking-toggle"
            checked={isTracking}
            onCheckedChange={toggleTracking}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="share-toggle" className="flex items-center gap-2 cursor-pointer">
            <Users className="h-4 w-4 text-muted-foreground" />
            Share with Trusted Contacts
          </Label>
          <Switch
            id="share-toggle"
            checked={shareWithContacts}
            onCheckedChange={setShareWithContacts}
            disabled={!isTracking}
          />
        </div>
        
        {isTracking && locationData.latitude && locationData.longitude && (
          <div className="mt-4 p-4 rounded-lg bg-muted/50">
            <h4 className="text-sm font-medium mb-2">Current Location Data</h4>
            <div className="space-y-1 text-xs">
              <p>Latitude: {locationData.latitude.toFixed(6)}</p>
              <p>Longitude: {locationData.longitude.toFixed(6)}</p>
              <p>Accuracy: {locationData.accuracy ? `±${locationData.accuracy.toFixed(0)}m` : 'N/A'}</p>
              <p>Last Updated: {formatLocationTimestamp(locationData.timestamp)}</p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" disabled={!isTracking}>
          <Share2 className="h-4 w-4 mr-2" />
          Send Location
        </Button>
        <Button
          variant={isTracking ? "destructive" : "default"}
          onClick={toggleTracking}
        >
          {isTracking ? "Stop Tracking" : "Start Tracking"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocationTracker;
