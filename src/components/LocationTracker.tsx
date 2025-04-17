
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Share2, User, Users, Plus, X, Send, Navigation, Clock, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  timestamp: number | null;
  speed: number | null;
  altitude: number | null;
  heading: number | null;
  address: string | null;
}

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

const LocationTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [locationData, setLocationData] = useState<LocationData>({
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null,
    speed: null,
    altitude: null,
    heading: null,
    address: null,
  });
  const [shareWithContacts, setShareWithContacts] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [shareLocationDialogOpen, setShareLocationDialogOpen] = useState(false);
  const [currentContactToShare, setCurrentContactToShare] = useState<Contact | null>(null);
  const [manualPhoneNumber, setManualPhoneNumber] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch (e) {
        console.error('Failed to parse saved contacts', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const fetchAddressFromCoordinates = useCallback(async (latitude: number, longitude: number) => {
    setIsLoadingAddress(true);
    try {
      // Use a more reliable geocoding API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        { 
          headers: { 
            'Accept-Language': 'en',
            'User-Agent': 'SafetyApp/1.0' // Adding a user agent as per Nominatim usage policy
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
      
      const data = await response.json();
      return data.display_name || 'Address not found';
    } catch (error) {
      console.error('Error fetching address:', error);
      return null;
    } finally {
      setIsLoadingAddress(false);
    }
  }, []);

  const startTracking = useCallback(() => {
    setLocationError(null);
    
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support location tracking.",
        variant: "destructive",
      });
      return;
    }

    // First get a single position to show quickly
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("Initial position:", position);
        updateLocationData(position);
      },
      (error) => handleLocationError(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    // Then set up continuous watching with high accuracy
    const id = navigator.geolocation.watchPosition(
      async (position) => {
        console.log("Watch position update:", position);
        updateLocationData(position);
      },
      (error) => handleLocationError(error),
      {
        enableHighAccuracy: true,
        maximumAge: 10000, // Accept positions that are up to 10 seconds old
        timeout: 15000,    // Wait up to 15 seconds for a position
      }
    );
    
    setWatchId(id);
    setIsTracking(true);
    
    toast({
      title: "Location tracking started",
      description: "Your location is now being tracked.",
    });
  }, [toast, fetchAddressFromCoordinates]);

  const updateLocationData = async (position: GeolocationPosition) => {
    const { latitude, longitude, accuracy, altitude, heading, speed } = position.coords;
    
    let address = null;
    try {
      address = await fetchAddressFromCoordinates(latitude, longitude);
    } catch (error) {
      console.error('Error getting address:', error);
    }
    
    setLocationData({
      latitude,
      longitude,
      accuracy,
      timestamp: position.timestamp,
      speed,
      altitude,
      heading,
      address,
    });
    
    if (shareWithContacts) {
      console.log("Location shared with trusted contacts:", position.coords);
      // Implement actual sharing logic here if needed
    }
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    const errorMessage = getLocationErrorMessage(error);
    setLocationError(errorMessage);
    console.error("Location error:", error);
    
    toast({
      title: "Location error",
      description: errorMessage,
      variant: "destructive",
    });
    
    setIsTracking(false);
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
        return "Location information is unavailable. Please check your device settings.";
      case error.TIMEOUT:
        return "The request to get your location timed out. Please try again.";
      default:
        return `An unknown error occurred (${error.message || 'No details available'}).`;
    }
  };

  const formatLocationTimestamp = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatSpeed = (speed: number | null) => {
    if (speed === null || speed === 0) return 'Not moving';
    const speedKmh = speed * 3.6; // Convert m/s to km/h
    return `${speedKmh.toFixed(1)} km/h`;
  };

  const formatHeading = (heading: number | null) => {
    if (heading === null) return 'N/A';
    
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round(heading / 45) % 8;
    return `${heading.toFixed(0)}° (${directions[index]})`;
  };

  const addContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) {
      toast({
        title: "Invalid contact details",
        description: "Please provide both name and phone number.",
        variant: "destructive",
      });
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(newContactPhone.replace(/\D/g, ''))) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: newContactName.trim(),
      phoneNumber: newContactPhone.trim(),
    };

    setContacts([...contacts, newContact]);
    setNewContactName('');
    setNewContactPhone('');
    setShowContactDialog(false);

    toast({
      title: "Contact added",
      description: `${newContactName} has been added to your emergency contacts.`,
    });
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact removed",
      description: "Contact has been removed from your emergency contacts.",
    });
  };

  const shareLocation = (contact: Contact) => {
    if (!locationData.latitude || !locationData.longitude) {
      toast({
        title: "Location not available",
        description: "Please enable location tracking first.",
        variant: "destructive",
      });
      return;
    }

    const locationUrl = `https://maps.google.com/maps?q=${locationData.latitude},${locationData.longitude}`;
    let message = `Emergency: I'm sharing my current location with you: ${locationUrl}`;
    
    if (locationData.address) {
      message += `\nAddress: ${locationData.address}`;
    }
    
    const smsLink = `sms:${contact.phoneNumber}?body=${encodeURIComponent(message)}`;

    window.open(smsLink, '_blank');

    toast({
      title: "Location shared",
      description: `Location shared with ${contact.name}.`,
    });
  };

  const openShareLocationDialog = (contact?: Contact) => {
    if (!isTracking) {
      toast({
        title: "Location tracking not active",
        description: "Please start location tracking first.",
        variant: "destructive",
      });
      return;
    }
    
    if (contact) {
      setCurrentContactToShare(contact);
    } else {
      setCurrentContactToShare(null);
    }
    
    setShareLocationDialogOpen(true);
  };

  const shareLocationViaSMS = () => {
    if (!locationData.latitude || !locationData.longitude) {
      toast({
        title: "Location not available",
        description: "Please enable location tracking first.",
        variant: "destructive",
      });
      return;
    }

    let phoneNumber = "";
    
    if (currentContactToShare) {
      phoneNumber = currentContactToShare.phoneNumber;
    } else if (manualPhoneNumber) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(manualPhoneNumber.replace(/\D/g, ''))) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid 10-digit phone number.",
          variant: "destructive",
        });
        return;
      }
      phoneNumber = manualPhoneNumber;
    } else {
      toast({
        title: "No phone number provided",
        description: "Please enter a phone number or select a contact.",
        variant: "destructive",
      });
      return;
    }

    const locationUrl = `https://maps.google.com/maps?q=${locationData.latitude},${locationData.longitude}`;
    let message = `Emergency: I'm sharing my current location with you: ${locationUrl}`;
    
    if (locationData.address) {
      message += `\nAddress: ${locationData.address}`;
    }
    
    const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    window.open(smsLink, '_blank');

    setShareLocationDialogOpen(false);
    setManualPhoneNumber('');
    
    toast({
      title: "Location shared via SMS",
      description: `Your location has been shared via SMS.`,
    });
  };

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
          Track your location and share it with trusted contacts
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
        
        {locationError && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            <p className="font-medium">Location Error:</p>
            <p>{locationError}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 text-xs h-7" 
              onClick={() => {
                setLocationError(null);
                startTracking();
              }}
            >
              Retry
            </Button>
          </div>
        )}
        
        {isTracking && locationData.latitude && locationData.longitude && (
          <div className="mt-4 p-4 rounded-lg bg-muted/50 space-y-4">
            <h4 className="text-sm font-medium mb-2">Current Location Information</h4>
            
            {locationData.address && (
              <div className="space-y-1">
                <p className="text-xs font-medium flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Address
                </p>
                <p className="text-xs bg-background/60 p-2 rounded">{locationData.address}</p>
              </div>
            )}
            
            {isLoadingAddress && (
              <p className="text-xs text-muted-foreground">Finding address...</p>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs font-medium flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Coordinates
                </p>
                <p className="text-xs">Lat: {locationData.latitude.toFixed(6)}</p>
                <p className="text-xs">Long: {locationData.longitude.toFixed(6)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-medium flex items-center gap-1">
                  <Info className="h-3 w-3" /> Accuracy
                </p>
                <p className="text-xs">{locationData.accuracy ? `±${locationData.accuracy.toFixed(0)}m` : 'N/A'}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-medium flex items-center gap-1">
                  <Navigation className="h-3 w-3" /> Movement
                </p>
                <p className="text-xs">Speed: {formatSpeed(locationData.speed)}</p>
                <p className="text-xs">Direction: {formatHeading(locationData.heading)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Timestamp
                </p>
                <p className="text-xs">{formatLocationTimestamp(locationData.timestamp)}</p>
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => openShareLocationDialog()}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Location via SMS
              </Button>
            </div>
          </div>
        )}

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium">Emergency Contacts</h4>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 px-2"
              onClick={() => setShowContactDialog(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Contact
            </Button>
          </div>

          {contacts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-3">
              No emergency contacts added yet
            </p>
          ) : (
            <div className="space-y-2">
              {contacts.map(contact => (
                <div key={contact.id} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                  <div>
                    <p className="text-sm font-medium">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.phoneNumber}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={() => shareLocation(contact)}
                      disabled={!isTracking}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Share with {contact.name}</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => removeContact(contact.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove {contact.name}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setShowContactDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Manage Contacts
        </Button>
        <Button
          variant={isTracking ? "destructive" : "default"}
          onClick={toggleTracking}
        >
          {isTracking ? "Stop Tracking" : "Start Tracking"}
        </Button>
      </CardFooter>

      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Emergency Contact</DialogTitle>
            <DialogDescription>
              Add trusted contacts who can receive your location in case of emergency
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Contact name"
                className="col-span-3"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="10-digit number"
                className="col-span-3"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowContactDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={addContact}>
              Add Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={shareLocationDialogOpen} onOpenChange={setShareLocationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Location via SMS</DialogTitle>
            <DialogDescription>
              {currentContactToShare 
                ? `Share your current location with ${currentContactToShare.name}`
                : "Enter a phone number to share your current location"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {currentContactToShare ? (
              <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                <div>
                  <p className="font-medium">{currentContactToShare.name}</p>
                  <p className="text-sm text-muted-foreground">{currentContactToShare.phoneNumber}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sms-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="sms-phone"
                  placeholder="Enter phone number"
                  className="col-span-3"
                  value={manualPhoneNumber}
                  onChange={(e) => setManualPhoneNumber(e.target.value)}
                />
              </div>
            )}
            
            <div className="p-3 rounded-md bg-muted/40">
              <p className="text-sm font-medium mb-1">Location to share:</p>
              {locationData.latitude && locationData.longitude ? (
                <div className="space-y-1">
                  {locationData.address && (
                    <p className="text-xs">{locationData.address}</p>
                  )}
                  <p className="text-xs">Latitude: {locationData.latitude.toFixed(6)}</p>
                  <p className="text-xs">Longitude: {locationData.longitude.toFixed(6)}</p>
                  <p className="text-xs">Accuracy: {locationData.accuracy ? `±${locationData.accuracy.toFixed(0)}m` : 'N/A'}</p>
                  <p className="text-xs mt-1">Maps link will be included in SMS</p>
                </div>
              ) : (
                <p className="text-xs text-destructive">Location data not available</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShareLocationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={shareLocationViaSMS}
              disabled={!locationData.latitude || !locationData.longitude}
            >
              Send SMS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default LocationTracker;
