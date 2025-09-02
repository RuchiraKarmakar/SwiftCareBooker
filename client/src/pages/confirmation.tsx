import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, CalendarPlus, LayoutDashboard } from "lucide-react";
import type { Appointment, Doctor } from "@shared/schema";

export default function Confirmation() {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  
  const { data: appointment, isLoading } = useQuery<Appointment>({
    queryKey: [`/api/appointments/${appointmentId}`],
    enabled: !!appointmentId,
  });

  const { data: doctor } = useQuery<Doctor>({
    queryKey: [`/api/doctors/${appointment?.doctorId}`],
    enabled: !!appointment?.doctorId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-6"></div>
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto mb-8"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!appointment || !doctor) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-8">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Appointment Not Found</h2>
              <p className="text-muted-foreground mb-6">The appointment you're looking for doesn't exist.</p>
              <Link href="/">
                <Button data-testid="button-back-home">Back to Home</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const appointmentDate = new Date(appointment.appointmentDate);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-secondary h-10 w-10" aria-hidden="true" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="confirmation-title">
          Appointment Confirmed!
        </h1>
        <p className="text-xl text-muted-foreground mb-8" data-testid="confirmation-message">
          Your appointment has been successfully booked. You'll receive a confirmation email shortly.
        </p>
        
        {/* Booking Details Card */}
        <Card className="text-left mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                className="w-16 h-16 rounded-full object-cover"
                data-testid="confirmation-doctor-image"
              />
              <div>
                <h3 className="text-xl font-semibold" data-testid="confirmation-doctor-name">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium" data-testid="confirmation-doctor-specialization">
                  {doctor.specialization}
                </p>
                <p className="text-sm text-muted-foreground" data-testid="confirmation-doctor-hospital">
                  {doctor.hospital}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Appointment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking ID:</span>
                    <span className="font-mono" data-testid="confirmation-booking-id">
                      {appointment.bookingId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span data-testid="confirmation-date">
                      {appointmentDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span data-testid="confirmation-time">
                      {appointment.appointmentTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>30 minutes</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient:</span>
                    <span data-testid="confirmation-patient-name">
                      {appointment.patientName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span data-testid="confirmation-patient-phone">
                      {appointment.patientPhone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span data-testid="confirmation-patient-email">
                      {appointment.patientEmail}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee:</span>
                    <span className="font-semibold text-primary" data-testid="confirmation-fee">
                      ${appointment.fee}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" data-testid="button-download-confirmation">
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Download Confirmation
          </Button>
          <Button variant="outline" data-testid="button-add-to-calendar">
            <CalendarPlus className="h-4 w-4 mr-2" aria-hidden="true" />
            Add to Calendar
          </Button>
          <Link href="/dashboard">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold" data-testid="button-view-dashboard">
              <LayoutDashboard className="h-4 w-4 mr-2" aria-hidden="true" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
