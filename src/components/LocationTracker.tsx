
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Share2, User, Users, Plus, X, Send } from 'lucide-react';
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
  const { toast } = useToast();

  // Load contacts from localStorage on component mount
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

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

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

  const addContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) {
      toast({
        title: "Invalid contact details",
        description: "Please provide both name and phone number.",
        variant: "destructive",
      });
      return;
    }

    // Basic phone number validation
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

    // Create SMS link with location
    const locationUrl = `https://maps.google.com/maps?q=${locationData.latitude},${locationData.longitude}`;
    const message = `Emergency: I'm sharing my current location with you: ${locationUrl}`;
    const smsLink = `sms:${contact.phoneNumber}?body=${encodeURIComponent(message)}`;

    // Open SMS app on mobile or show dialog on desktop
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
      // Use the phone number from the selected contact
      phoneNumber = currentContactToShare.phoneNumber;
    } else if (manualPhoneNumber) {
      // Use the manually entered phone number
      // Basic phone validation
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

    // Create SMS link with location
    const locationUrl = `https://maps.google.com/maps?q=${locationData.latitude},${locationData.longitude}`;
    const message = `Emergency: I'm sharing my current location with you: ${locationUrl}`;
    const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    // Open SMS app
    window.open(smsLink, '_blank');

    // Close dialog and show toast
    setShareLocationDialogOpen(false);
    setManualPhoneNumber('');
    
    toast({
      title: "Location shared via SMS",
      description: `Your location has been shared via SMS.`,
    });
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

        {/* Quick share location button */}
        {isTracking && (
          <Button 
            className="w-full mt-2" 
            variant="outline"
            onClick={() => openShareLocationDialog()}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Location via SMS
          </Button>
        )}

        {/* Emergency Contacts Section */}
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

      {/* Add Contact Dialog */}
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

      {/* Share Location via SMS Dialog */}
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
                <>
                  <p className="text-xs">Latitude: {locationData.latitude.toFixed(6)}</p>
                  <p className="text-xs">Longitude: {locationData.longitude.toFixed(6)}</p>
                  <p className="text-xs mt-1">Maps link will be included in SMS</p>
                </>
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
