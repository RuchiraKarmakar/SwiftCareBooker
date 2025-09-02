import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Appointment, InsertAppointment } from "@shared/schema";

export function useAppointments(patientEmail?: string) {
  return useQuery<Appointment[]>({
    queryKey: patientEmail ? [`/api/appointments/patient/${patientEmail}`] : ['/api/appointments'],
    enabled: !!patientEmail,
  });
}

export function useAppointment(appointmentId: string) {
  return useQuery<Appointment>({
    queryKey: [`/api/appointments/${appointmentId}`],
    enabled: !!appointmentId,
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (appointmentData: InsertAppointment) => {
      const response = await apiRequest("POST", "/api/appointments", appointmentData);
      return response.json();
    },
    onSuccess: (appointment) => {
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment has been confirmed for ${appointment.appointmentTime} on ${new Date(appointment.appointmentDate).toLocaleDateString()}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await apiRequest("DELETE", `/api/appointments/${appointmentId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
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
}

export function useRescheduleAppointment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ appointmentId, newDate, newTime }: { 
      appointmentId: string; 
      newDate?: Date; 
      newTime?: string; 
    }) => {
      const updateData: any = { status: "rescheduled" };
      if (newDate) updateData.appointmentDate = newDate;
      if (newTime) updateData.appointmentTime = newTime;
      
      const response = await apiRequest("PATCH", `/api/appointments/${appointmentId}/status`, updateData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      toast({
        title: "Reschedule Request Sent",
        description: "Your reschedule request has been submitted. You'll be contacted soon to confirm the new time.",
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
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ appointmentId, status }: { appointmentId: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/appointments/${appointmentId}/status`, { status });
      return response.json();
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      toast({
        title: "Appointment Updated",
        description: `Appointment status has been updated to ${status}.`,
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "There was an error updating your appointment. Please try again.",
        variant: "destructive",
      });
    },
  });
}
