
import { useState } from 'react';
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

const SOSButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { toast } = useToast();

  const handleSOSClick = () => {
    setIsDialogOpen(true);
  };

  const handleActivateSOS = () => {
    setIsActivated(true);
    // Start countdown
    let count = 5;
    setCountdown(count);
    
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count <= 0) {
        clearInterval(interval);
        // Simulate SOS alert being sent
        simulateSendingSOSAlert();
      }
    }, 1000);
  };

  const handleCancelSOS = () => {
    setIsActivated(false);
    setIsDialogOpen(false);
    toast({
      title: "SOS Cancelled",
      description: "Your emergency alert has been cancelled.",
    });
  };

  const callPolice = () => {
    try {
      window.location.href = 'tel:100';
      toast({
        title: "Calling Police Emergency",
        description: "Connecting you to police emergency services (100).",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Failed to initiate call:", error);
      toast({
        title: "Call Failed",
        description: "Could not connect the call. Please dial 100 manually.",
        variant: "destructive",
      });
    }
  };

  const simulateSendingSOSAlert = () => {
    // In a real application, this would send alerts to emergency contacts
    // and potentially to local authorities or a monitoring service
    toast({
      title: "Emergency Alert Sent!",
      description: "Your location has been shared with your emergency contacts.",
      variant: "destructive",
    });
    
    // Close dialog after sending alert
    setIsDialogOpen(false);
    setIsActivated(false);
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
                ? `Emergency SOS - Sending in ${countdown}s` 
                : "Activate Emergency Alert"
              }
            </DialogTitle>
            <DialogDescription>
              {isActivated 
                ? "Alert will be sent to your emergency contacts with your current location."
                : "This will alert your emergency contacts and share your location with them."
              }
            </DialogDescription>
          </DialogHeader>
          
          {isActivated ? (
            <div className="grid place-items-center py-6">
              <div className="text-5xl font-bold text-destructive animate-pulse">
                {countdown}
              </div>
              <p className="mt-4 text-sm text-center">
                Your location and situation details will be sent to your emergency contacts.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4 border rounded-lg p-4">
                <ArrowUpFromLine className="text-muted-foreground" />
                <div>
                  <p className="font-medium">Share Location</p>
                  <p className="text-sm text-muted-foreground">
                    Your current location will be shared
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 border rounded-lg p-4">
                <Phone className="text-muted-foreground" />
                <div>
                  <p className="font-medium">Emergency Contacts</p>
                  <p className="text-sm text-muted-foreground">
                    Your preset emergency contacts will be notified
                  </p>
                </div>
              </div>

              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium p-4 flex items-center justify-center gap-2"
                onClick={callPolice}
              >
                <Phone className="h-5 w-5" />
                Call Police Emergency (100)
              </Button>
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
