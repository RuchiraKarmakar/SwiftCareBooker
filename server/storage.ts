import { type User, type InsertUser, type Doctor, type InsertDoctor, type Appointment, type InsertAppointment, type Hospital, type InsertHospital, type TimeSlot, type InsertTimeSlot } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDoctors(): Promise<Doctor[]>;
  getDoctor(id: string): Promise<Doctor | undefined>;
  getDoctorsBySpecialization(specialization: string): Promise<Doctor[]>;
  getDoctorsByLocation(location: string): Promise<Doctor[]>;
  searchDoctors(query: string): Promise<Doctor[]>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  
  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  getAppointmentsByPatientEmail(email: string): Promise<Appointment[]>;
  getAppointmentsByDoctor(doctorId: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined>;
  deleteAppointment(id: string): Promise<boolean>;
  
  getHospitals(): Promise<Hospital[]>;
  getHospital(id: string): Promise<Hospital | undefined>;
  createHospital(hospital: InsertHospital): Promise<Hospital>;
  
  getTimeSlots(doctorId: string, date: string): Promise<TimeSlot[]>;
  createTimeSlot(timeSlot: InsertTimeSlot): Promise<TimeSlot>;
  updateTimeSlotAvailability(id: string, isAvailable: boolean): Promise<TimeSlot | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private doctors: Map<string, Doctor>;
  private appointments: Map<string, Appointment>;
  private hospitals: Map<string, Hospital>;
  private timeSlots: Map<string, TimeSlot>;

  constructor() {
    this.users = new Map();
    this.doctors = new Map();
    this.appointments = new Map();
    this.hospitals = new Map();
    this.timeSlots = new Map();
    
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock doctors
    const mockDoctors: InsertDoctor[] = [
      {
        name: "Dr. Sarah Johnson",
        specialization: "Cardiology",
        experience: 15,
        rating: "4.9",
        reviewCount: 127,
        fee: "150.00",
        gender: "Female",
        location: "New York, NY",
        hospital: "Manhattan Medical Center",
        about: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in cardiovascular medicine. She specializes in preventive cardiology, heart disease management, and cardiac rehabilitation.",
        education: "MD - Harvard Medical School, Residency - Johns Hopkins Hospital",
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isAvailable: true,
      },
      {
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
        education: "MD - Stanford Medical School, Residency - Mayo Clinic",
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isAvailable: true,
      },
      {
        name: "Dr. Emily Rodriguez",
        specialization: "Pediatrics",
        experience: 10,
        rating: "4.9",
        reviewCount: 203,
        fee: "125.00",
        gender: "Female",
        location: "Los Angeles, CA",
        hospital: "Children's Medical Center",
        about: "Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence.",
        education: "MD - UCLA Medical School, Residency - Children's Hospital LA",
        imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isAvailable: true,
      },
    ];

    mockDoctors.forEach(doctor => {
      this.createDoctor(doctor);
    });

    // Mock hospitals
    const mockHospitals: InsertHospital[] = [
      {
        name: "Manhattan Medical Center",
        location: "New York, NY",
        address: "123 Medical Plaza, New York, NY 10001",
        phone: "(555) 123-4567",
        email: "info@manhattanmedical.com",
      },
      {
        name: "Central Hospital",
        location: "New York, NY",
        address: "456 Health Street, New York, NY 10002",
        phone: "(555) 234-5678",
        email: "contact@centralhospital.com",
      },
    ];

    mockHospitals.forEach(hospital => {
      this.createHospital(hospital);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDoctors(): Promise<Doctor[]> {
    return Array.from(this.doctors.values());
  }

  async getDoctor(id: string): Promise<Doctor | undefined> {
    return this.doctors.get(id);
  }

  async getDoctorsBySpecialization(specialization: string): Promise<Doctor[]> {
    return Array.from(this.doctors.values()).filter(
      doctor => doctor.specialization.toLowerCase() === specialization.toLowerCase()
    );
  }

  async getDoctorsByLocation(location: string): Promise<Doctor[]> {
    return Array.from(this.doctors.values()).filter(
      doctor => doctor.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  async searchDoctors(query: string): Promise<Doctor[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.doctors.values()).filter(
      doctor => 
        doctor.name.toLowerCase().includes(lowerQuery) ||
        doctor.specialization.toLowerCase().includes(lowerQuery) ||
        doctor.hospital.toLowerCase().includes(lowerQuery)
    );
  }

  async createDoctor(insertDoctor: InsertDoctor): Promise<Doctor> {
    const id = randomUUID();
    const doctor: Doctor = { ...insertDoctor, id };
    this.doctors.set(id, doctor);
    return doctor;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async getAppointmentsByPatientEmail(email: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.patientEmail === email
    );
  }

  async getAppointmentsByDoctor(doctorId: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.doctorId === doctorId
    );
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const bookingId = `HC-${new Date().getFullYear()}-${String(this.appointments.size + 1).padStart(3, '0')}`;
    const appointment: Appointment = {
      ...insertAppointment,
      id,
      bookingId,
      createdAt: new Date(),
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      appointment.status = status;
      this.appointments.set(id, appointment);
      return appointment;
    }
    return undefined;
  }

  async deleteAppointment(id: string): Promise<boolean> {
    return this.appointments.delete(id);
  }

  async getHospitals(): Promise<Hospital[]> {
    return Array.from(this.hospitals.values());
  }

  async getHospital(id: string): Promise<Hospital | undefined> {
    return this.hospitals.get(id);
  }

  async createHospital(insertHospital: InsertHospital): Promise<Hospital> {
    const id = randomUUID();
    const hospital: Hospital = { ...insertHospital, id };
    this.hospitals.set(id, hospital);
    return hospital;
  }

  async getTimeSlots(doctorId: string, date: string): Promise<TimeSlot[]> {
    return Array.from(this.timeSlots.values()).filter(
      slot => slot.doctorId === doctorId && 
      slot.date.toISOString().split('T')[0] === date
    );
  }

  async createTimeSlot(insertTimeSlot: InsertTimeSlot): Promise<TimeSlot> {
    const id = randomUUID();
    const timeSlot: TimeSlot = { ...insertTimeSlot, id };
    this.timeSlots.set(id, timeSlot);
    return timeSlot;
  }

  async updateTimeSlotAvailability(id: string, isAvailable: boolean): Promise<TimeSlot | undefined> {
    const timeSlot = this.timeSlots.get(id);
    if (timeSlot) {
      timeSlot.isAvailable = isAvailable;
      this.timeSlots.set(id, timeSlot);
      return timeSlot;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
