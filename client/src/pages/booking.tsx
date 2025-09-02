import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import BookingSteps from "@/components/booking-steps";
import DoctorCard from "@/components/doctor-card";
import { Filter, Search } from "lucide-react";
import type { Doctor } from "@shared/schema";

export default function Booking() {
  const { doctorId } = useParams<{ doctorId?: string }>();
  const [location] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctorId || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Parse search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  const { data: doctors = [], isLoading } = useQuery<Doctor[]>({
    queryKey: ['/api/doctors'],
  });

  const { data: selectedDoctor } = useQuery<Doctor>({
    queryKey: [`/api/doctors/${selectedDoctorId}`],
    enabled: !!selectedDoctorId,
  });

  // Filter doctors based on search criteria
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = !searchQuery || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialization = !selectedSpecialization || 
      doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase();
    
    const matchesGender = !selectedGender || 
      doctor.gender.toLowerCase() === selectedGender.toLowerCase();
    
    const matchesLocation = !selectedLocation || 
      doctor.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesSpecialization && matchesGender && matchesLocation;
  });

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctorId(doctor.id);
    setCurrentStep(2);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // If doctor is pre-selected, skip to step 2
  useEffect(() => {
    if (doctorId && selectedDoctor) {
      setCurrentStep(2);
    }
  }, [doctorId, selectedDoctor]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <BookingSteps 
        currentStep={currentStep} 
        onStepClick={setCurrentStep}
        data-testid="booking-steps"
      />

      {/* Step 1: Select Doctor */}
      {currentStep === 1 && (
        <Card className="fade-in">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6" data-testid="step-1-title">Select a Doctor</h2>
            
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search doctors, specializations, or hospitals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                    data-testid="input-search-doctors"
                  />
                </div>
                <Button variant="outline" data-testid="button-search">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-1">Specialization</label>
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger data-testid="filter-specialization">
                      <SelectValue placeholder="All Specializations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specializations</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <Select value={selectedGender} onValueChange={setSelectedGender}>
                    <SelectTrigger data-testid="filter-gender">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Availability</label>
                  <Select>
                    <SelectTrigger data-testid="filter-availability">
                      <SelectValue placeholder="Any Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="next-week">Next Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger data-testid="filter-location">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Locations</SelectItem>
                      <SelectItem value="new york">New York, NY</SelectItem>
                      <SelectItem value="los angeles">Los Angeles, CA</SelectItem>
                      <SelectItem value="chicago">Chicago, IL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Doctor List */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse" data-testid={`doctor-skeleton-${i}`}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-muted rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted rounded w-48"></div>
                            <div className="h-3 bg-muted rounded w-32"></div>
                            <div className="h-3 bg-muted rounded w-64"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredDoctors.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
                    <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredDoctors.map((doctor) => (
                  <Card 
                    key={doctor.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow" 
                    onClick={() => handleDoctorSelect(doctor)}
                    data-testid={`doctor-option-${doctor.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img 
                          src={doctor.imageUrl} 
                          alt={doctor.name} 
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{doctor.name}</h3>
                            <span className="text-lg font-bold text-primary">${doctor.fee}</span>
                          </div>
                          <p className="text-primary font-medium mb-2">{doctor.specialization}</p>
                          <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400 mr-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className="text-sm">★</span>
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {doctor.rating} ({doctor.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <span>{doctor.hospital}</span>
                            <span className="mx-2">•</span>
                            <span>{doctor.experience} years exp</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full mr-2">
                              <span className="w-2 h-2 bg-secondary rounded-full inline-block mr-1"></span>
                              Available Today
                            </span>
                            <span className="text-muted-foreground">Next: 2:30 PM</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Steps 2-4 will be handled by BookingSteps component */}
      {currentStep > 1 && selectedDoctor && (
        <BookingSteps 
          currentStep={currentStep}
          selectedDoctor={selectedDoctor}
          onStepClick={setCurrentStep}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      )}
    </div>
  );
}
