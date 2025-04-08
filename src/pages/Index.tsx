
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import SOSButton from '@/components/SOSButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, MessageSquare, Shield, AlertTriangle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-safety-700 to-safety-500 bg-clip-text text-transparent leading-tight mb-6">
                Empowering Women Through Safety & Support
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8">
                Comprehensive tools and resources designed to enhance personal safety, 
                provide guidance, and offer support when you need it most.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/safety-guides">
                  <Button className="w-full sm:w-auto bg-safety-600 hover:bg-safety-700 text-white">
                    Safety Guides
                  </Button>
                </Link>
                <Link to="/chatbox">
                  <Button variant="outline" className="w-full sm:w-auto border-safety-600 text-safety-600 hover:bg-safety-50">
                    Chat Support
                  </Button>
                </Link>
              </div>
              
              <div className="mt-16 flex justify-center">
                <div className="relative">
                  <SOSButton />
                  <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium text-safety-700">
                    Emergency SOS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Safety Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-t-4 border-t-safety-600">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-safety-100 flex items-center justify-center mb-2">
                    <AlertTriangle className="h-6 w-6 text-safety-600" />
                  </div>
                  <CardTitle>Emergency SOS</CardTitle>
                  <CardDescription>
                    Quick access to emergency alerts sent to your contacts with your location
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to="/" className="text-safety-600 text-sm font-medium hover:underline">
                    Learn more →
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-t-4 border-t-primary">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Location Tracking</CardTitle>
                  <CardDescription>
                    Share your location with trusted contacts for added safety
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to="/tracking" className="text-primary text-sm font-medium hover:underline">
                    Learn more →
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-t-4 border-t-secondary">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center mb-2">
                    <Shield className="h-6 w-6 text-secondary/90" />
                  </div>
                  <CardTitle>Safety Guides</CardTitle>
                  <CardDescription>
                    Comprehensive guides for staying safe in various situations
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to="/safety-guides" className="text-secondary/90 text-sm font-medium hover:underline">
                    Learn more →
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-t-4 border-t-primary">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Support Chat</CardTitle>
                  <CardDescription>
                    Connect with support professionals for guidance and assistance
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to="/chatbox" className="text-primary text-sm font-medium hover:underline">
                    Learn more →
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-safety-700 to-safety-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Safety?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              EmpowerHer provides the tools and resources you need to feel safe and confident in any situation.
            </p>
            <Link to="/safety-guides">
              <Button size="lg" className="bg-white text-safety-700 hover:bg-white/90">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
