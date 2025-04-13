
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, Users } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-safety-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">EH</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-safety-600 to-safety-700 bg-clip-text text-transparent">
            EmpowerHer
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-primary font-medium transition-colors">
            Home
          </Link>
          <Link to="/safety-guides" className="text-foreground/80 hover:text-primary font-medium transition-colors">
            Safety Guides
          </Link>
          <Link to="/tracking" className="text-foreground/80 hover:text-primary font-medium transition-colors">
            Location Tracking
          </Link>
          <Link to="/support" className="text-foreground/80 hover:text-primary font-medium transition-colors">
            Support
          </Link>
          <Link to="/chatbox">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
              AI Chat Help
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <Link to="/community-chat">
              <Button variant="outline" className="border-safety-600 text-safety-600 hover:bg-safety-600/10 hover:text-safety-600">
                <Users className="mr-2 h-4 w-4" />
                Community Chat
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="default" className="bg-safety-600 hover:bg-safety-700">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-background border-b animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-primary py-2 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/safety-guides" 
              className="text-foreground/80 hover:text-primary py-2 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Safety Guides
            </Link>
            <Link 
              to="/tracking" 
              className="text-foreground/80 hover:text-primary py-2 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Location Tracking
            </Link>
            <Link 
              to="/support" 
              className="text-foreground/80 hover:text-primary py-2 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Support
            </Link>
            <Link 
              to="/chatbox"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary">
                AI Chat Help
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <Link 
                to="/community-chat"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full border-safety-600 text-safety-600 hover:bg-safety-600/10 hover:text-safety-600">
                  <Users className="mr-2 h-4 w-4" />
                  Community Chat
                </Button>
              </Link>
            ) : (
              <Link 
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="default" className="w-full bg-safety-600 hover:bg-safety-700">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
