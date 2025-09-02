import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DoctorCard from "@/components/doctor-card";
import { CalendarPlus, Search, Heart, Brain, Baby, CheckCircle, Users, FileText, Calendar } from "lucide-react";
import type { Doctor } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const { data: doctors = [], isLoading } = useQuery<Doctor[]>({
    queryKey: ['/api/doctors'],
  });

  const featuredDoctors = doctors.slice(0, 3);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/booking?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 md:py-24" id="home">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your Health,<br />
              <span className="text-primary">Our Priority</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Book appointments with trusted doctors and hospitals. Easy, fast, and secure healthcare booking at your fingertips.
            </p>
            
            {/* Quick Search */}
            <Card className="p-6 shadow-sm">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-4">Find Your Doctor</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium mb-2">Specialization</label>
                    <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                      <SelectTrigger data-testid="select-specialization">
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger data-testid="select-location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-york">New York, NY</SelectItem>
                        <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
                        <SelectItem value="chicago">Chicago, IL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Link href="/booking" className="w-full">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium" data-testid="button-search-doctors">
                        <Search className="h-4 w-4 mr-2" aria-hidden="true" />
                        Search
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-lg font-semibold px-8 py-4" data-testid="button-book-appointment-hero">
                  <CalendarPlus className="h-5 w-5 mr-2" aria-hidden="true" />
                  Book Appointment
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-border text-foreground hover:bg-accent transition-colors text-lg font-semibold px-8 py-4" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-view-services"
              >
                View Services
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Healthcare professional with patient" 
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="hero-image"
            />
            <Card className="absolute -bottom-6 -left-6 p-4 shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-secondary/10 p-2 rounded-full">
                    <CheckCircle className="text-secondary h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold" data-testid="stat-doctors">1,500+ Doctors</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Healthcare Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive medical care with experienced professionals across multiple specializations
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow" data-testid="service-cardiology">
            <CardContent className="p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-primary h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cardiology</h3>
              <p className="text-muted-foreground mb-4">Heart health specialists with advanced diagnostic capabilities and treatment options.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-primary hover:text-primary/80 font-medium p-0" data-testid="button-learn-more-cardiology">
                    Learn More →
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Heart className="text-primary h-6 w-6" />
                      Cardiology Services
                    </DialogTitle>
                    <DialogDescription>
                      Comprehensive cardiovascular care for all your heart health needs
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Our Services Include:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Comprehensive cardiac evaluations</li>
                        <li>• ECG and stress testing</li>
                        <li>• Echocardiography</li>
                        <li>• Heart disease management</li>
                        <li>• Preventive cardiology consultations</li>
                        <li>• Cardiac rehabilitation programs</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Why Choose Our Cardiology Department:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Board-certified cardiologists with 15+ years experience</li>
                        <li>• State-of-the-art diagnostic equipment</li>
                        <li>• Personalized treatment plans</li>
                        <li>• 24/7 emergency cardiac care</li>
                      </ul>
                    </div>
                    <Link href="/booking?specialization=cardiology">
                      <Button className="w-full">Book Cardiology Appointment</Button>
                    </Link>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow" data-testid="service-neurology">
            <CardContent className="p-6">
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Brain className="text-secondary h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Neurology</h3>
              <p className="text-muted-foreground mb-4">Expert neurological care for brain and nervous system conditions.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-primary hover:text-primary/80 font-medium p-0" data-testid="button-learn-more-neurology">
                    Learn More →
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Brain className="text-secondary h-6 w-6" />
                      Neurology Services
                    </DialogTitle>
                    <DialogDescription>
                      Advanced neurological care for brain and nervous system disorders
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Our Services Include:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Comprehensive neurological evaluations</li>
                        <li>• Stroke care and prevention</li>
                        <li>• Epilepsy treatment and monitoring</li>
                        <li>• Memory disorders and dementia care</li>
                        <li>• Headache and migraine management</li>
                        <li>• Movement disorders treatment</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Why Choose Our Neurology Department:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Board-certified neurologists with specialized training</li>
                        <li>• Advanced diagnostic imaging and testing</li>
                        <li>• Comprehensive stroke center</li>
                        <li>• Multidisciplinary approach to care</li>
                      </ul>
                    </div>
                    <Link href="/booking?specialization=neurology">
                      <Button className="w-full">Book Neurology Appointment</Button>
                    </Link>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow" data-testid="service-pediatrics">
            <CardContent className="p-6">
              <div className="bg-accent text-accent-foreground w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Baby className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pediatrics</h3>
              <p className="text-muted-foreground mb-4">Specialized care for infants, children, and adolescents with gentle approach.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-primary hover:text-primary/80 font-medium p-0" data-testid="button-learn-more-pediatrics">
                    Learn More →
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Baby className="text-accent-foreground h-6 w-6" />
                      Pediatrics Services
                    </DialogTitle>
                    <DialogDescription>
                      Comprehensive healthcare for children from birth through adolescence
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Our Services Include:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Well-child checkups and vaccinations</li>
                        <li>• Developmental assessments</li>
                        <li>• Acute illness care</li>
                        <li>• Chronic condition management</li>
                        <li>• Adolescent medicine</li>
                        <li>• Behavioral and developmental support</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Why Choose Our Pediatrics Department:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Board-certified pediatricians with specialized training</li>
                        <li>• Child-friendly environment and approach</li>
                        <li>• Comprehensive preventive care programs</li>
                        <li>• Family-centered care philosophy</li>
                      </ul>
                    </div>
                    <Link href="/booking?specialization=pediatrics">
                      <Button className="w-full">Book Pediatrics Appointment</Button>
                    </Link>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16 bg-muted/30 -mx-4 px-4 rounded-2xl" id="doctors">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Top Doctors</h2>
          <p className="text-xl text-muted-foreground">Experienced healthcare professionals ready to serve you</p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse" data-testid={`doctor-skeleton-${i}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center" data-testid="stat-qualified-doctors">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1,500+</div>
            <div className="text-muted-foreground">Qualified Doctors</div>
          </div>
          <div className="text-center" data-testid="stat-appointments-booked">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">50,000+</div>
            <div className="text-muted-foreground">Appointments Booked</div>
          </div>
          <div className="text-center" data-testid="stat-partner-hospitals">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200+</div>
            <div className="text-muted-foreground">Partner Hospitals</div>
          </div>
          <div className="text-center" data-testid="stat-patient-satisfaction">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">98%</div>
            <div className="text-muted-foreground">Patient Satisfaction</div>
          </div>
        </div>
      </section>
    </div>
  );
}
