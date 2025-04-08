
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SafetyGuides from '@/components/SafetyGuides';

const SafetyGuidesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">Safety Guidelines</h1>
          <p className="text-center text-muted-foreground mb-8">
            Comprehensive guides to help you stay safe in various situations
          </p>
          
          <SafetyGuides />
          
          <div className="mt-12 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-medium mb-4">Personalized Safety Planning</h2>
            <p className="text-muted-foreground mb-6">
              Need help creating a personalized safety plan? Our support team can help you
              develop strategies tailored to your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/chatbox" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                Chat with Support
              </a>
              <a href="#" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4">
                Download Safety Plan Template
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SafetyGuidesPage;
