import { Heart, Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const { toast } = useToast();
  
  const handleSocialClick = (platform: string) => {
    toast({
      title: `${platform} Coming Soon!`,
      description: `Follow us on ${platform} for health tips and updates.`,
    });
  };

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="text-primary h-6 w-6" aria-hidden="true" />
              <span className="text-xl font-bold text-primary">
                HealthCare<span className="text-secondary">+</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted partner for healthcare appointments. Making healthcare accessible to everyone.
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={() => handleSocialClick("Facebook")} 
                className="text-muted-foreground hover:text-primary transition-colors" 
                aria-label="Facebook" 
                data-testid="social-facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </button>
              <button 
                onClick={() => handleSocialClick("Twitter")} 
                className="text-muted-foreground hover:text-primary transition-colors" 
                aria-label="Twitter" 
                data-testid="social-twitter"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </button>
              <button 
                onClick={() => handleSocialClick("LinkedIn")} 
                className="text-muted-foreground hover:text-primary transition-colors" 
                aria-label="LinkedIn" 
                data-testid="social-linkedin"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </button>
              <button 
                onClick={() => handleSocialClick("Instagram")} 
                className="text-muted-foreground hover:text-primary transition-colors" 
                aria-label="Instagram" 
                data-testid="social-instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/booking" className="hover:text-foreground transition-colors" data-testid="footer-book-appointment">Book Appointment</a></li>
              <li><a href="/#doctors" className="hover:text-foreground transition-colors" data-testid="footer-find-doctors">Find Doctors</a></li>
              <li><a href="/#services" className="hover:text-foreground transition-colors" data-testid="footer-services">Services</a></li>
              <li><a href="/dashboard" className="hover:text-foreground transition-colors" data-testid="footer-dashboard">Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-help">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-contact">Contact Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-privacy">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="footer-terms">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center" data-testid="contact-phone">
                <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                (555) 123-4567
              </p>
              <p className="flex items-center" data-testid="contact-email">
                <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                support@healthcareplus.com
              </p>
              <p className="flex items-center" data-testid="contact-address">
                <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
                123 Medical Plaza, NY 10001
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 HealthCare+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
