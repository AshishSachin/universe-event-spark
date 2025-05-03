
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-universe-purple to-universe-pink flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-background flex items-center justify-center">
                  <span className="text-sm font-bold text-universe-purple">U</span>
                </div>
              </div>
              <span className="text-xl font-bold text-gradient">
                UniVerse
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              SRM's Ultimate Event Management Platform. Browse, book, and manage events happening at SRM Institute of Science and Technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/events?category=hackathon" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link to="/events?category=ideathon" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  Ideathons
                </Link>
              </li>
              <li>
                <Link to="/events?category=workshop" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link to="/events?category=milan" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  Milan
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  Host Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                SRM Institute of Science and Technology
              </li>
              <li className="text-sm text-muted-foreground">
                Kattankulathur, Chennai - 603203
              </li>
              <li className="text-sm text-muted-foreground">
                Tamil Nadu, India
              </li>
              <li>
                <a href="mailto:support@universe-srm.com" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  support@universe-srm.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="text-sm text-muted-foreground hover:text-universe-purple transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 UNIVERSE | SRM Institute of Science and Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
