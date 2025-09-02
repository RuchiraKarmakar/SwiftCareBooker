import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Star, GraduationCap, MapPin, Users, Calendar, CalendarPlus, Clock } from "lucide-react";
import type { Doctor } from "@shared/schema";

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  
  const { data: doctor, isLoading, error } = useQuery<Doctor>({
    queryKey: [`/api/doctors/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-32 mb-6"></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="p-8">
                <div className="flex gap-6 mb-8">
                  <div className="w-32 h-32 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-8 bg-muted rounded w-64"></div>
                    <div className="h-6 bg-muted rounded w-48"></div>
                    <div className="h-4 bg-muted rounded w-32"></div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="h-32 bg-muted rounded"></div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Doctor Not Found</h2>
          <p className="text-muted-foreground mb-6">The doctor you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button data-testid="button-back-home">Back to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const specializations = doctor.specialization.split(',').map(s => s.trim());
  const todaySlots = ["2:30 PM", "3:15 PM", "4:00 PM", "4:45 PM"];

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors p-0" 
        asChild
        data-testid="button-back"
      >
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
          Back to Search
        </Link>
      </Button>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name} 
                  className="w-32 h-32 rounded-full object-cover"
                  data-testid="doctor-profile-image"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2" data-testid="doctor-profile-name">
                    {doctor.name}
                  </h1>
                  <p className="text-xl text-primary font-semibold mb-2" data-testid="doctor-profile-specialization">
                    {doctor.specialization}
                  </p>
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 mr-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="h-4 w-4 fill-current" 
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="font-semibold" data-testid="doctor-profile-rating">
                      {doctor.rating}
                    </span>
                    <span className="text-muted-foreground ml-2" data-testid="doctor-profile-reviews">
                      ({doctor.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span data-testid="doctor-profile-experience">
                      <GraduationCap className="h-4 w-4 mr-1 inline" aria-hidden="true" />
                      {doctor.experience} years experience
                    </span>
                    <span data-testid="doctor-profile-location">
                      <MapPin className="h-4 w-4 mr-1 inline" aria-hidden="true" />
                      {doctor.location}
                    </span>
                    <span data-testid="doctor-profile-patients">
                      <Users className="h-4 w-4 mr-1 inline" aria-hidden="true" />
                      2,500+ patients
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">About</h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="doctor-profile-about">
                    {doctor.about}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        data-testid={`specialization-${index}`}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Education & Certifications</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p data-testid="doctor-education">
                      <GraduationCap className="h-4 w-4 mr-2 inline" aria-hidden="true" />
                      {doctor.education}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Appointment Booking Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Book Appointment</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Consultation Fee:</span>
                  <span className="font-semibold text-lg" data-testid="doctor-fee">${doctor.fee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Next Available:</span>
                  <span className="font-medium">Today 2:30 PM</span>
                </div>
                <Link href={`/booking/${doctor.id}`}>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold" data-testid="button-book-appointment">
                    <CalendarPlus className="h-4 w-4 mr-2" aria-hidden="true" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Available Today</h3>
              <div className="grid grid-cols-2 gap-2">
                {todaySlots.map((slot, index) => (
                  <Button 
                    key={index}
                    variant="outline"
                    size="sm"
                    className="time-slot hover:bg-primary hover:text-primary-foreground transition-colors"
                    data-testid={`time-slot-${index}`}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
