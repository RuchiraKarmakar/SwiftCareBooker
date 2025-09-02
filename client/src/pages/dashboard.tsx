import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentCard from "@/components/appointment-card";
import { CalendarCheck, CheckCircle, Users, FileText, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Appointment, Doctor } from "@shared/schema";

// Mock patient email for demo purposes
const PATIENT_EMAIL = "john.doe@email.com";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery<Appointment[]>({
    queryKey: [`/api/appointments/patient/${PATIENT_EMAIL}`],
  });

  const { data: doctors = [] } = useQuery<Doctor[]>({
    queryKey: ['/api/doctors'],
  });

  const cancelAppointmentMutation = useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await apiRequest("DELETE", `/api/appointments/${appointmentId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/appointments/patient/${PATIENT_EMAIL}`] });
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been successfully cancelled.",
      });
    },
    onError: () => {
      toast({
        title: "Cancellation Failed",
        description: "There was an error cancelling your appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const rescheduleAppointmentMutation = useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await apiRequest("PATCH", `/api/appointments/${appointmentId}/status`, {
        status: "rescheduled"
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/appointments/patient/${PATIENT_EMAIL}`] });
      toast({
        title: "Reschedule Request Sent",
        description: "Your reschedule request has been submitted. You'll be contacted soon.",
      });
    },
    onError: () => {
      toast({
        title: "Reschedule Failed",
        description: "There was an error processing your reschedule request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const upcomingAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.appointmentDate);
    return appointmentDate >= new Date() && apt.status === "confirmed";
  });

  const pastAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.appointmentDate);
    return appointmentDate < new Date() || apt.status === "completed";
  });

  const getDoctorById = (id: string) => doctors.find(doc => doc.id === id);

  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      cancelAppointmentMutation.mutate(appointmentId);
    }
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    rescheduleAppointmentMutation.mutate(appointmentId);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="h-8 bg-muted rounded w-48 mb-2"></div>
              <div className="h-4 bg-muted rounded w-64"></div>
            </div>
            <div className="h-10 bg-muted rounded w-40"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="dashboard-title">
            My Dashboard
          </h1>
          <p className="text-muted-foreground">Manage your appointments and medical records</p>
        </div>
        <Link href="/booking">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold" data-testid="button-book-new-appointment">
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Book New Appointment
          </Button>
        </Link>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold" data-testid="stat-upcoming">
                  {upcomingAppointments.length}
                </p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <CalendarCheck className="text-primary h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold" data-testid="stat-completed">
                  {pastAppointments.length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-full">
                <CheckCircle className="text-secondary h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold" data-testid="stat-doctors">
                  {new Set(appointments.map(apt => apt.doctorId)).size}
                </p>
                <p className="text-sm text-muted-foreground">Doctors Visited</p>
              </div>
              <div className="bg-accent text-accent-foreground p-3 rounded-full">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold" data-testid="stat-reports">
                  {pastAppointments.length}
                </p>
                <p className="text-sm text-muted-foreground">Medical Reports</p>
              </div>
              <div className="bg-muted p-3 rounded-full">
                <FileText className="text-muted-foreground h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Appointments Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming" data-testid="tab-upcoming">
            Upcoming Appointments
          </TabsTrigger>
          <TabsTrigger value="past" data-testid="tab-past">
            Past Appointments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming appointments</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any upcoming appointments scheduled.
                </p>
                <Link href="/booking">
                  <Button data-testid="button-book-first-appointment">
                    Book Your First Appointment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            upcomingAppointments.map((appointment) => {
              const doctor = getDoctorById(appointment.doctorId);
              return doctor ? (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  doctor={doctor}
                  onCancel={() => handleCancelAppointment(appointment.id)}
                  onReschedule={() => handleRescheduleAppointment(appointment.id)}
                  showActions={true}
                />
              ) : null;
            })
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No past appointments</h3>
                <p className="text-muted-foreground">
                  Your completed appointments will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            pastAppointments.map((appointment) => {
              const doctor = getDoctorById(appointment.doctorId);
              return doctor ? (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  doctor={doctor}
                  showActions={false}
                  isPast={true}
                />
              ) : null;
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
