import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Edit, X, FileText, CheckCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Appointment, Doctor } from "@shared/schema";

interface AppointmentCardProps {
  appointment: Appointment;
  doctor: Doctor;
  onCancel?: () => void;
  onReschedule?: () => void;
  showActions?: boolean;
  isPast?: boolean;
}

export default function AppointmentCard({ 
  appointment, 
  doctor, 
  onCancel, 
  onReschedule, 
  showActions = true,
  isPast = false 
}: AppointmentCardProps) {
  const appointmentDate = new Date(appointment.appointmentDate);
  const { toast } = useToast();
  
  const getStatusBadge = () => {
    if (isPast) {
      return (
        <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium" data-testid={`appointment-status-${appointment.id}`}>
          <CheckCircle className="w-3 h-3 mr-1 inline" aria-hidden="true" />
          Completed
        </span>
      );
    }
    
    switch (appointment.status) {
      case "confirmed":
        return (
          <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium" data-testid={`appointment-status-${appointment.id}`}>
            <span className="w-2 h-2 bg-secondary rounded-full inline-block mr-1"></span>
            Confirmed
          </span>
        );
      case "rescheduled":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium" data-testid={`appointment-status-${appointment.id}`}>
            <span className="w-2 h-2 bg-yellow-600 rounded-full inline-block mr-1"></span>
            Rescheduled
          </span>
        );
      case "cancelled":
        return (
          <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium" data-testid={`appointment-status-${appointment.id}`}>
            <X className="w-3 h-3 mr-1 inline" aria-hidden="true" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Card data-testid={`appointment-card-${appointment.id}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <img 
              src={doctor.imageUrl} 
              alt={doctor.name} 
              className="w-14 h-14 rounded-full object-cover"
              data-testid={`appointment-doctor-image-${appointment.id}`}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold" data-testid={`appointment-doctor-name-${appointment.id}`}>
                {doctor.name}
              </h3>
              <p className="text-primary font-medium" data-testid={`appointment-doctor-specialization-${appointment.id}`}>
                {doctor.specialization}
              </p>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                <span data-testid={`appointment-date-${appointment.id}`}>
                  {appointmentDate.toLocaleDateString()}
                </span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                <span data-testid={`appointment-time-${appointment.id}`}>
                  {appointment.appointmentTime}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                <span data-testid={`appointment-location-${appointment.id}`}>
                  {doctor.hospital}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {showActions && !isPast && (
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onReschedule}
                  className="text-sm font-medium"
                  data-testid={`button-reschedule-${appointment.id}`}
                >
                  <Edit className="h-3 w-3 mr-1" aria-hidden="true" />
                  Reschedule
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onCancel}
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground text-sm font-medium"
                  data-testid={`button-cancel-${appointment.id}`}
                >
                  <X className="h-3 w-3 mr-1" aria-hidden="true" />
                  Cancel
                </Button>
              </div>
            )}
            
            {isPast && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-sm font-medium"
                    data-testid={`button-view-report-${appointment.id}`}
                  >
                    <FileText className="h-3 w-3 mr-1" aria-hidden="true" />
                    View Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Medical Report</DialogTitle>
                    <DialogDescription>
                      Appointment with {doctor.name} on {appointmentDate.toLocaleDateString()}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Doctor:</span> {doctor.name}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {appointmentDate.toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {appointment.appointmentTime}
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span> 30 minutes
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Chief Complaint</h4>
                      <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                        {appointment.reason}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Diagnosis</h4>
                      <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                        Based on examination and symptoms, patient showed signs of improvement. 
                        Follow-up recommended in 4-6 weeks. No immediate concerns noted.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Recommendations</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Continue current medication as prescribed</li>
                        <li>• Follow up in 4-6 weeks</li>
                        <li>• Monitor symptoms and report any changes</li>
                        <li>• Maintain healthy lifestyle choices</li>
                      </ul>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          toast({
                            title: "Report Downloaded",
                            description: "Medical report has been downloaded successfully.",
                          });
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Report Shared",
                            description: "Medical report has been shared with your healthcare provider.",
                          });
                        }}
                      >
                        Share Report
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        
        {/* Appointment Status */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getStatusBadge()}
            </div>
            <div className="text-sm text-muted-foreground">
              Booking ID: <span className="font-mono" data-testid={`appointment-booking-id-${appointment.id}`}>
                {appointment.bookingId}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
