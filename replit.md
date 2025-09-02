# Healthcare Appointment Booking System

## Overview

This is a comprehensive healthcare appointment booking system built as a full-stack web application. The system enables patients to easily book appointments with doctors and hospitals through a patient-friendly interface. The application focuses on usability, accessibility, and responsive design to provide an optimal user experience across all devices.

The system features a complete appointment booking flow, doctor/hospital profiles, patient dashboard for managing appointments, and a responsive design that works seamlessly on mobile and desktop devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and better development experience
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming
- **Forms**: React Hook Form with Zod validation for robust form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful API endpoints for CRUD operations
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot module replacement and development middleware integration

### Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema**: Well-defined tables for users, doctors, appointments, hospitals, and time slots
- **Validation**: Zod schemas for runtime type checking and API validation
- **Migrations**: Drizzle Kit for database schema management and migrations

### Component Architecture
- **Design System**: Consistent component library with variants and customization options
- **Accessibility**: WCAG 2.1 AA compliant components with proper ARIA labels and keyboard navigation
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Reusability**: Modular components for doctors, appointments, and booking flows

### Key Features Implementation
- **Multi-step Booking Flow**: Progressive form with validation at each step
- **Doctor Search & Filtering**: Advanced search by name, specialization, location, and availability
- **Patient Dashboard**: Comprehensive view of upcoming and past appointments with management actions
- **Responsive Design**: Optimized layouts for mobile, tablet, and desktop devices
- **Real-time Validation**: Client-side and server-side validation with user-friendly error messages

### Authentication & Session Management
- **Session Storage**: PostgreSQL-backed session management with connect-pg-simple
- **User Management**: Secure user creation and authentication workflows
- **Authorization**: Role-based access control for different user types

## External Dependencies

### UI and Styling
- **shadcn/ui**: Complete UI component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Radix UI**: Headless UI components for accessibility and customization
- **Lucide React**: Icon library for consistent iconography

### Database and ORM
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL dialect support
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle Kit**: Database migration and introspection tools

### Development and Build Tools
- **Vite**: Fast build tool with HMR and optimized production builds
- **TypeScript**: Static type checking for both frontend and backend
- **ESBuild**: Fast JavaScript bundler for server-side code

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation library for runtime type checking
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### State Management and Data Fetching
- **TanStack Query**: Server state management with caching, background updates, and optimistic updates
- **React Router**: Client-side routing with Wouter for lightweight navigation

### Session and Security
- **Express Session**: Session middleware for Express.js
- **Connect PG Simple**: PostgreSQL session store for persistent sessions
- **CORS**: Cross-origin resource sharing configuration

### Utilities and Helpers
- **clsx & tailwind-merge**: Utility functions for conditional CSS classes
- **date-fns**: Modern JavaScript date utility library
- **nanoid**: Unique ID generation for secure identifiers