https://drive.google.com/file/d/1K-TDgqXyGo4kMBpUw8Jag3wB0-zFmM6V/view?usp=sharing

https://drive.google.com/file/d/1fcMr6tc58Xprv5MJi4ToHBaL2eL-RLNt/view?usp=sharing

https://drive.google.com/file/d/12nrVRWfv-GpE1_CC69GD_PgvDamjfPSe/view?usp=sharing

# 🏥 HealthCare+

HealthCare+ is a *full-stack healthcare appointment booking system* built with:

- ⚡ *Express + TypeScript* → REST API backend  
- ⚛ *React + Vite + Tailwind CSS* → modern frontend with hot reload  
- 🗄 *Drizzle ORM* (optional) → database management  
- 🎨 *Vite Dev Middleware* → integrates frontend & backend during development  

The app allows patients to browse doctors, schedule appointments, and manage healthcare bookings seamlessly.

---

## 📂 Project Structure

SwiftCareBooker/       
├── server/ # Backend (Express, API routes, Vite integration)
├── src/ # Frontend (React components, pages, Tailwind)
├── public/ # Static assets
├── package.json # Scripts and dependencies
├── vite.config.ts # Vite config
├── drizzle.config.ts # Drizzle ORM config
└── tsconfig.json # TypeScript config

yaml
Copy code

---

## ⚙ Features

### Backend (Express + TypeScript)
- RESTful API endpoints (/api/...)
- Middleware for logging requests/responses
- Error handling with proper HTTP codes
- Serves frontend in production mode

### Frontend (React + Vite + Tailwind)
- Appointment booking UI
- Responsive and accessible design
- Hot Module Reload (HMR) for fast development
- Tailwind CSS utility-first styling

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (>= 18.x recommended, works with v22 as well)
- [pnpm](https://pnpm.io/) or npm

### 2. Clone Repository
```bash
git clone https://github.com/your-username/healthcare-plus.git
cd healthcare-plus
3. Install Dependencies
bash
Copy code
pnpm install
4. Run in Development Mode
bash
Copy code
pnpm run dev
Backend will start on: http://localhost:5000

React frontend is served through Express with Vite middleware

5. API Example
bash
Copy code
GET http://localhost:5000/api/appointments
🏗 Build for Production
Build frontend and backend:

bash
Copy code
pnpm run build
Start production server:

bash
Copy code
pnpm start
By default, app runs on PORT=5000, but you can override:

bash
Copy code
PORT=8080 pnpm start
🌐 Deployment
Render (Recommended for Free Hosting)
Push your repo to GitHub.

Create a new Web Service on Render.

Set:

Build Command:

bash
Copy code
pnpm install && pnpm run build
Start Command:

bash
Copy code
pnpm start
Set environment variables:

PORT=10000 (Render sets this automatically, your code must use process.env.PORT).

📜 Scripts
Script	Description
pnpm run dev	Start development server (Express + Vite)
pnpm run build	Build frontend + backend for production
pnpm start	Run production server

🛠 Tech Stack
Frontend: React, Vite, Tailwind CSS

Backend: Express, TypeScript

Database (Optional): Drizzle ORM + SQL

Deployment: Render / Railway / Fly.io

📘 API Endpoints (Sample)
Endpoint	Method	Description
/api/doctors	GET	Get list of doctors
/api/doctors/:id	GET	Get doctor details by ID
/api/appointments	GET	Get all appointments
/api/appointments	POST	Create a new appointment
/api/appointments/:id	DELETE	Cancel an appointment

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📄 License
This project is licensed under the MIT License.

