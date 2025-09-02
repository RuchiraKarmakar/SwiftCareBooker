import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all doctors
  app.get("/api/doctors", async (req, res) => {
    try {
      const doctors = await storage.getDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctors" });
    }
  });

  // Get doctor by ID
  app.get("/api/doctors/:id", async (req, res) => {
    try {
      const doctor = await storage.getDoctor(req.params.id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctor" });
    }
  });

  // Search doctors
  app.get("/api/doctors/search/:query", async (req, res) => {
    try {
      const doctors = await storage.searchDoctors(req.params.query);
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Failed to search doctors" });
    }
  });

  // Get doctors by specialization
  app.get("/api/doctors/specialization/:specialization", async (req, res) => {
    try {
      const doctors = await storage.getDoctorsBySpecialization(req.params.specialization);
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctors by specialization" });
    }
  });

  // Get all appointments
  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  // Get appointment by ID
  app.get("/api/appointments/:id", async (req, res) => {
    try {
      const appointment = await storage.getAppointment(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointment" });
    }
  });

  // Get appointments by patient email
  app.get("/api/appointments/patient/:email", async (req, res) => {
    try {
      const appointments = await storage.getAppointmentsByPatientEmail(req.params.email);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch patient appointments" });
    }
  });

  // Create new appointment
  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid appointment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  // Update appointment status
  app.patch("/api/appointments/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const appointment = await storage.updateAppointmentStatus(req.params.id, status);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update appointment status" });
    }
  });

  // Cancel appointment
  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      const success = await storage.deleteAppointment(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json({ message: "Appointment cancelled successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel appointment" });
    }
  });

  // Get all hospitals
  app.get("/api/hospitals", async (req, res) => {
    try {
      const hospitals = await storage.getHospitals();
      res.json(hospitals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hospitals" });
    }
  });

  // Get time slots for a doctor on a specific date
  app.get("/api/timeslots/:doctorId/:date", async (req, res) => {
    try {
      const { doctorId, date } = req.params;
      const timeSlots = await storage.getTimeSlots(doctorId, date);
      res.json(timeSlots);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch time slots" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
