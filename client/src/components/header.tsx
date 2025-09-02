import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Menu, X } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = email.split('@')[0];
    setUserName(name);
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserName("");
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" data-testid="logo-link">
            <Heart className="text-primary h-8 w-8" aria-hidden="true" />
            <span className="text-2xl font-bold text-primary">
              HealthCare<span className="text-secondary">+</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`transition-colors ${location === '/' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`} data-testid="nav-home">
              Home
            </Link>
            <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-services">
              Services
            </Link>
            <Link href="/#doctors" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-doctors">
              Find Doctors
            </Link>
            <Link href="/dashboard" className={`transition-colors ${location === '/dashboard' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`} data-testid="nav-dashboard">
              Dashboard
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
                <Button variant="ghost" onClick={handleSignOut} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-signout">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-signin">
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Sign In to HealthCare+</DialogTitle>
                    <DialogDescription>
                      Enter your credentials to access your account
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        data-testid="input-signin-email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        data-testid="input-signin-password"
                      />
                    </div>
                    <Button type="submit" className="w-full" data-testid="button-signin-submit">
                      Sign In
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            <Link href="/booking">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium" data-testid="button-book-appointment">
                Book Appointment
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-muted-foreground" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="mobile-nav-home">
                Home
              </Link>
              <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="mobile-nav-services">
                Services
              </Link>
              <Link href="/#doctors" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="mobile-nav-doctors">
                Find Doctors
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="mobile-nav-dashboard">
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
