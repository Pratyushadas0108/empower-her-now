
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { CircleAlert, ArrowUpFromLine, Phone } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

const SOSButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load trusted contacts from localStorage
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch (e) {
        console.error('Failed to parse saved contacts', e);
      }
    }
  }, []);

  const handleSOSClick = () => {
    setIsDialogOpen(true);
  };

  const handleActivateSOS = () => {
    setIsActivated(true);
    let count = 5;
    setCountdown(count);
    
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count <= 0) {
        clearInterval(interval);
        initiateEmergencyResponse();
      }
    }, 1000);
  };

  const initiateEmergencyResponse = async () => {
    // Get current location
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/maps?q=${latitude},${longitude}`;
          
          // Call police emergency number
          callPolice();
          
          // Send SMS to emergency contacts
          await sendEmergencyMessages(locationUrl);
          
          toast({
            title: "Emergency Response Initiated",
            description: "Emergency services have been contacted and your trusted contacts have been notified.",
            variant: "destructive",
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Still call police even if location fails
          callPolice();
          sendEmergencyMessages();
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } catch (error) {
      console.error('Failed to get location:', error);
      // Still call police even if location fails
      callPolice();
      sendEmergencyMessages();
    }
    
    setIsDialogOpen(false);
    setIsActivated(false);
  };

  const callPolice = () => {
    try {
      window.location.href = 'tel:100';
      toast({
        title: "Calling Police Emergency (100)",
        description: "Connecting to emergency services...",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Failed to initiate call:", error);
      toast({
        title: "Emergency Call Failed",
        description: "Please dial 100 manually for police emergency services.",
        variant: "destructive",
      });
    }
  };

  const sendEmergencyMessages = async (locationUrl?: string) => {
    if (contacts.length === 0) {
      return;
    }

    let message = "EMERGENCY: I need immediate assistance.";
    if (locationUrl) {
      message += ` My current location: ${locationUrl}`;
    }

    // Send SMS to all trusted contacts
    for (const contact of contacts) {
      try {
        const smsLink = `sms:${contact.phoneNumber}?body=${encodeURIComponent(message)}`;
        window.open(smsLink, '_blank');
      } catch (error) {
        console.error(`Failed to send SMS to ${contact.name}:`, error);
      }
    }

    // Also send to police via SMS
    try {
      const policeMessage = `EMERGENCY: Requesting immediate assistance.${locationUrl ? ` Location: ${locationUrl}` : ''}`;
      const policeSmsLink = `sms:100?body=${encodeURIComponent(policeMessage)}`;
      window.open(policeSmsLink, '_blank');
    } catch (error) {
      console.error('Failed to send SMS to police:', error);
    }
  };

  const handleCancelSOS = () => {
    setIsActivated(false);
    setIsDialogOpen(false);
    toast({
      title: "SOS Cancelled",
      description: "Emergency alert has been cancelled.",
    });
  };

  return (
    <>
      <Button 
        className="sos-button bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full w-16 h-16 md:w-20 md:h-20 shadow-lg animate-pulse-emergency"
        onClick={handleSOSClick}
      >
        <span className="sr-only">Emergency SOS</span>
        <CircleAlert className="h-8 w-8 md:h-10 md:w-10" />
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className={isActivated ? "text-destructive" : ""}>
              {isActivated 
                ? `Emergency SOS - Activating in ${countdown}s` 
                : "Activate Emergency SOS"
              }
            </DialogTitle>
            <DialogDescription>
              {isActivated 
                ? "Emergency services will be contacted and alerts will be sent to your emergency contacts."
                : "This will contact emergency services (100) and alert your emergency contacts with your location."
              }
            </DialogDescription>
          </DialogHeader>
          
          {isActivated ? (
            <div className="grid place-items-center py-6">
              <div className="text-5xl font-bold text-destructive animate-pulse">
                {countdown}
              </div>
              <p className="mt-4 text-sm text-center">
                Preparing to contact emergency services and notify your emergency contacts.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4 border rounded-lg p-4">
                <Phone className="text-destructive" />
                <div>
                  <p className="font-medium">Police Emergency (100)</p>
                  <p className="text-sm text-muted-foreground">
                    Will initiate an emergency call
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 border rounded-lg p-4">
                <ArrowUpFromLine className="text-muted-foreground" />
                <div>
                  <p className="font-medium">Location & Contacts</p>
                  <p className="text-sm text-muted-foreground">
                    Your location will be shared with emergency services and {contacts.length} trusted contact{contacts.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:space-x-0">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancelSOS}
            >
              Cancel
            </Button>
            
            {!isActivated && (
              <Button 
                type="button" 
                variant="destructive"
                onClick={handleActivateSOS}
              >
                Activate SOS
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;
