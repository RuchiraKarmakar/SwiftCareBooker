import type { Doctor, Hospital, Appointment } from "@shared/schema";

export const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    experience: 15,
    rating: "4.9",
    reviewCount: 127,
    fee: "150.00",
    gender: "Female",
    location: "New York, NY",
    hospital: "Manhattan Medical Center",
    about: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in cardiovascular medicine. She specializes in preventive cardiology, heart disease management, and cardiac rehabilitation. Dr. Johnson completed her residency at Johns Hopkins Hospital and is committed to providing personalized, compassionate care to all her patients.",
    education: "MD - Harvard Medical School, Residency - Johns Hopkins Hospital, Board Certified - American Board of Internal Medicine",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Neurology", 
    experience: 12,
    rating: "4.8",
    reviewCount: 89,
    fee: "175.00",
    gender: "Male",
    location: "New York, NY",
    hospital: "Central Hospital",
    about: "Dr. Michael Chen is a renowned neurologist specializing in brain disorders and nervous system conditions. He has extensive experience in treating stroke, epilepsy, and neurodegenerative diseases.",
    education: "MD - Stanford Medical School, Residency - Mayo Clinic, Board Certified - American Board of Psychiatry and Neurology",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrics",
    experience: 10,
    rating: "4.9",
    reviewCount: 203,
    fee: "125.00",
    gender: "Female",
    location: "Los Angeles, CA",
    hospital: "Children's Medical Center",
    about: "Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence. She has a special interest in developmental pediatrics and adolescent medicine.",
    education: "MD - UCLA Medical School, Residency - Children's Hospital LA, Board Certified - American Board of Pediatrics",
    imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    isAvailable: true,
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialization: "Dermatology",
    experience: 8,
    rating: "4.7",
    reviewCount: 156,
    fee: "140.00",
    gender: "Male",
    location: "Chicago, IL",
    hospital: "Metro Dermatology Clinic",
    about: "Dr. James Wilson specializes in medical and cosmetic dermatology with expertise in skin cancer detection, acne treatment, and anti-aging procedures.",
    education: "MD - Northwestern University, Residency - University of Chicago, Board Certified - American Board of Dermatology",
    imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    isAvailable: true,
  },
];

export const mockHospitals: Hospital[] = [
  {
    id: "1",
    name: "Manhattan Medical Center",
    location: "New York, NY",
    address: "123 Medical Plaza, New York, NY 10001",
    phone: "(555) 123-4567",
    email: "info@manhattanmedical.com",
  },
  {
    id: "2",
    name: "Central Hospital",
    location: "New York, NY", 
    address: "456 Health Street, New York, NY 10002",
    phone: "(555) 234-5678",
    email: "contact@centralhospital.com",
  },
  {
    id: "3",
    name: "Children's Medical Center",
    location: "Los Angeles, CA",
    address: "789 Pediatric Avenue, Los Angeles, CA 90210",
    phone: "(555) 345-6789",
    email: "info@childrensmedical.com",
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctorId: "1",
    patientName: "John Doe",
    patientEmail: "john.doe@email.com",
    patientPhone: "(555) 123-4567",
    patientAge: 32,
    patientGender: "male",
    appointmentDate: new Date("2024-12-17T14:30:00"),
    appointmentTime: "2:30 PM",
    reason: "Experiencing chest pain and irregular heartbeat. Would like to schedule a comprehensive cardiac evaluation.",
    medicalHistory: "Family history of heart disease",
    status: "confirmed",
    fee: "150.00",
    bookingId: "HC-2024-001",
    createdAt: new Date(),
  },
  {
    id: "2",
    doctorId: "2",
    patientName: "John Doe", 
    patientEmail: "john.doe@email.com",
    patientPhone: "(555) 123-4567",
    patientAge: 32,
    patientGender: "male",
    appointmentDate: new Date("2024-11-23T10:00:00"),
    appointmentTime: "10:00 AM",
    reason: "Follow-up consultation for migraine treatment",
    medicalHistory: "Chronic migraines, currently on medication",
    status: "completed",
    fee: "175.00",
    bookingId: "HC-2024-002",
    createdAt: new Date(),
  },
];

export const specializations = [
  "Cardiology",
  "Neurology", 
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Psychiatry",
  "Gynecology",
  "ENT",
  "Ophthalmology",
  "Urology",
];

export const locations = [
  "New York, NY",
  "Los Angeles, CA", 
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
];

export const timeSlots = {
  morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
  afternoon: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"],
  evening: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"],
};

export const generateBookingId = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `HC-${year}-${random}`;
};
