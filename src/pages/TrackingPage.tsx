
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationTracker from '@/components/LocationTracker';

const TrackingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">Location Tracking</h1>
          <p className="text-center text-muted-foreground mb-8">
            Share your detailed location information with trusted contacts for added safety
          </p>
          
          <div className="max-w-md mx-auto">
            <LocationTracker />
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium mb-4">Location Tracking Privacy</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Your privacy and security are important to us. Here's how we handle your location data:
              </p>
              
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your location data is only shared with the contacts you explicitly choose</li>
                <li>Location data is encrypted in transit</li>
                <li>You can stop location sharing at any time</li>
                <li>Historical location data is not stored on our servers</li>
                <li>We never sell or share your location data with third parties</li>
              </ul>
              
              <p className="text-muted-foreground">
                For more information about our privacy practices, please review our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackingPage;
