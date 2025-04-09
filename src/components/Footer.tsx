import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CircleAlert } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-safety-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">EH</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-safety-600 to-safety-700 bg-clip-text text-transparent">
                EmpowerHer
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering women with tools and resources for personal safety and security.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/safety-guides" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Safety Guides
                  </Link>
                </li>
                <li>
                  <Link to="/tracking" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Location Tracking
                  </Link>
                </li>
                <li>
                  <Link to="/chatbox" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Chat Support
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Safety Planning
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Local Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Legal Information
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Online Safety
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Emergency</h3>
              <Button 
                variant="destructive" 
                className="w-full mb-2 flex items-center justify-center gap-2"
              >
                <CircleAlert className="h-4 w-4" />
                Emergency SOS
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                For immediate assistance, call:
              </p>
              <a 
                href="tel:100" 
                className="block text-safety-700 font-bold mt-1 hover:underline"
              >
                100 (Police Emergency)
              </a>
              <a 
                href="tel:1091" 
                className="block text-sm text-muted-foreground mt-1 hover:text-safety-600"
              >
                Women's Helpline: 1091
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EmpowerHer. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
