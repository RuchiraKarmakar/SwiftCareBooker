import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Doctor, InsertAppointment } from "@shared/schema";

interface BookingStepsProps {
  currentStep: number;
  selectedDoctor?: Doctor;
  onStepClick?: (step: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const patientDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  age: z.number().min(1, "Age is required").max(120, "Invalid age"),
  gender: z.string().min(1, "Gender is required"),
  reason: z.string().min(10, "Please provide a detailed reason for your visit"),
  medicalHistory: z.string().optional(),
  terms: z.boolean().refine(val => val === true, "You must accept the terms"),
});

type PatientDetailsForm = z.infer<typeof patientDetailsSchema>;

export default function BookingSteps({ currentStep, selectedDoctor, onNext, onPrevious }: BookingStepsProps) {
  const [, setLocation] = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [patientDetails, setPatientDetails] = useState<PatientDetailsForm | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<PatientDetailsForm>({
    resolver: zodResolver(patientDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: 0,
      gender: "",
      reason: "",
      medicalHistory: "",
      terms: false,
    },
  });

  const createAppointmentMutation = useMutation({
    mutationFn: async (appointmentData: InsertAppointment) => {
      const response = await apiRequest("POST", "/api/appointments", appointmentData);
      return response.json();
    },
    onSuccess: (appointment) => {
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment with ${selectedDoctor?.name} has been confirmed.`,
      });
      setLocation(`/confirmation/${appointment.id}`);
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const timeSlots = {
    morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"],
    afternoon: ["2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"],
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handlePatientDetailsSubmit = (data: PatientDetailsForm) => {
    setPatientDetails(data);
    onNext?.();
  };

  const handleConfirmBooking = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !patientDetails) {
      toast({
        title: "Missing Information",
        description: "Please complete all steps before confirming your appointment.",
        variant: "destructive",
      });
      return;
    }

    const appointmentData: InsertAppointment = {
      doctorId: selectedDoctor.id,
      patientName: `${patientDetails.firstName} ${patientDetails.lastName}`,
      patientEmail: patientDetails.email,
      patientPhone: patientDetails.phone,
      patientAge: patientDetails.age,
      patientGender: patientDetails.gender,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      reason: patientDetails.reason,
      medicalHistory: patientDetails.medicalHistory || "",
      fee: selectedDoctor.fee,
      status: "confirmed",
    };

    createAppointmentMutation.mutate(appointmentData);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 2: return "Choose Appointment Time";
      case 3: return "Patient Information";
      case 4: return "Review Your Appointment";
      default: return "";
    }
  };

  if (currentStep === 1 || !selectedDoctor) {
    return null;
  }

  return (
    <Card className="fade-in">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6" data-testid={`step-${currentStep}-title`}>
          {getStepTitle()}
        </h2>

        {/* Step 2: Calendar & Time Selection */}
        {currentStep === 2 && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Date</h3>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="rounded-md border"
                data-testid="appointment-calendar"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Available Times - {selectedDate?.toLocaleDateString()}
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Morning</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.morning.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        className="time-slot transition-all hover:scale-105"
                        onClick={() => handleTimeSelect(time)}
                        data-testid={`time-slot-${time.replace(/[:\s]/g, '-').toLowerCase()}`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Afternoon</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.afternoon.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        className="time-slot transition-all hover:scale-105"
                        onClick={() => handleTimeSelect(time)}
                        data-testid={`time-slot-${time.replace(/[:\s]/g, '-').toLowerCase()}`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Patient Details Form */}
        {currentStep === 3 && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePatientDetailsSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} data-testid="input-first-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} data-testid="input-last-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age*</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Age" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-age"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Visit*</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your symptoms or reason for the appointment..."
                        className="resize-none"
                        rows={4}
                        {...field}
                        data-testid="textarea-reason"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant Medical History</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any relevant medical conditions, allergies, or current medications..."
                        className="resize-none"
                        rows={3}
                        {...field}
                        data-testid="textarea-medical-history"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-terms"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I agree to the Terms of Service and Privacy Policy
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}

        {/* Step 4: Review & Confirm */}
        {currentStep === 4 && patientDetails && (
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6 bg-accent/30">
              <div className="flex items-start gap-4">
                <img 
                  src={selectedDoctor.imageUrl} 
                  alt={selectedDoctor.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold" data-testid="review-doctor-name">
                    {selectedDoctor.name}
                  </h3>
                  <p className="text-primary font-medium" data-testid="review-doctor-specialization">
                    {selectedDoctor.specialization}
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid="review-doctor-hospital">
                    {selectedDoctor.hospital}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" data-testid="review-fee">
                    ${selectedDoctor.fee}
                  </div>
                  <div className="text-sm text-muted-foreground">Consultation Fee</div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Appointment Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium" data-testid="review-date">
                      {selectedDate?.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium" data-testid="review-time">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">30 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">In-person</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Patient Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium" data-testid="review-patient-name">
                      {patientDetails.firstName} {patientDetails.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span className="font-medium" data-testid="review-patient-age">
                      {patientDetails.age}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium" data-testid="review-patient-phone">
                      {patientDetails.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium" data-testid="review-patient-email">
                      {patientDetails.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Reason for Visit</h4>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-muted-foreground" data-testid="review-reason">
                  {patientDetails.reason}
                </p>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-bold text-primary text-xl" data-testid="review-total">
                  ${selectedDoctor.fee}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Payment will be processed after confirmation</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={currentStep === 2}
            data-testid="button-previous"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Back
          </Button>
          
          {currentStep === 2 && (
            <Button 
              onClick={onNext}
              disabled={!selectedDate || !selectedTime}
              data-testid="button-next-time"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
          )}
          
          {currentStep === 3 && (
            <Button 
              onClick={form.handleSubmit(handlePatientDetailsSubmit)}
              data-testid="button-next-details"
            >
              Review Booking
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Button>
          )}
          
          {currentStep === 4 && (
            <Button 
              onClick={handleConfirmBooking}
              disabled={createAppointmentMutation.isPending}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              data-testid="button-confirm-booking"
            >
              {createAppointmentMutation.isPending ? (
                "Booking..."
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" aria-hidden="true" />
                  Confirm Booking
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
