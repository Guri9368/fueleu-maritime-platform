# 🚢 FuelEU Maritime Compliance Platform  
A modern and visually rich platform to manage FuelEU Maritime compliance — including routes, emissions, banking, and pooling — built using **Hexagonal Architecture** with a clean, scalable codebase.

<p align="center">
  <img src="./assets/routes-dashboard.png" alt="Routes Dashboard Preview" width="900"/>
</p>

---

## 🚀 Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

---

# 📑 Table of Contents  
- [✨ Features](#-features)  
- [🏛️ Architecture](#%EF%B8%8F-architecture)  
- [🛠️ Prerequisites](#️-prerequisites)  
- [⚙️ Installation Guide](#️-installation-guide)  
- [🗄️ Database Setup](#️-database-setup)  
- [🏃 Running the Application](#-running-the-application)  
- [📡 API Documentation](#-api-documentation)  
- [📁 Project Structure](#-project-structure)  
- [📊 Screenshots](#-screenshots)  
- [🧪 Tests](#-tests)  
- [👨‍💻 Developer](#-developer)  

---

# ✨ Features

### 🚢 **Routes Management**
✅ Create and manage maritime routes  
✅ Track GHG intensity, fuel consumption, distance  
✅ Set baseline routes  
✅ Filter by vessel type, fuel type, year  

### 📊 **Route Comparison**
✅ Compare routes against baseline  
✅ Visual compliance charts  
✅ Target intensity calculations  

### 🏦 **Banking – Article 20**
✅ Compute Compliance Balance (CB)  
✅ Bank surplus emissions  
✅ Apply banked emissions  

### 🤝 **Pooling – Article 21**
✅ Create multi-ship compliance pools  
✅ Share CB across vessels  
✅ Validate pool totals  

---

# 🏛️ Architecture  
This project follows **Hexagonal Architecture**, ensuring testability, maintainability, and clean domain separation.

backend/
├── core/ # Domain logic
│ ├── domain/ # Entities & value objects
│ ├── ports/ # Input/Output ports
│ └── application/ # Use cases
├── adapters/
│ ├── inbound/ # Controllers (HTTP)
│ └── outbound/ # PostgreSQL Repositories
└── infrastructure/ # DB, config, server

Copy code
frontend/
├── core/
│ ├── domain/ # Models
│ └── ports/ # Interfaces
├── adapters/
│ ├── api/ # API client
│ └── ui/ # Components
└── pages/ # Route pages

yaml
Copy code

📌 **Clear separation of domain, UI, and infrastructure = scalable system.**

---

# 🛠️ Prerequisites

Install the following:

- Node.js (18+)
- PostgreSQL (14+)
- Git
- npm or yarn

---

# ⚙️ Installation Guide

### ✅ 1. Clone the Repository
```bash
git clone https://github.com/Guri9368/fueleu-maritime-platform.git
cd fueleu-maritime-platform
✅ 2. Install Backend Dependencies
bash
Copy code
cd backend
npm install
✅ 3. Install Frontend Dependencies
bash
Copy code
cd ../frontend
npm install
🗄️ Database Setup
✅ 1. Create PostgreSQL Database
sql
Copy code
CREATE DATABASE fueleu;
✅ 2. Copy Environment File
bash
Copy code
cp backend/.env.example backend/.env
✅ 3. Edit .env
bash
Copy code
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/fueleu
✅ 4. Run Migrations + Seed Data
bash
Copy code
npm run db:init
✅ Tables created
✅ Seeded 5 sample routes

🏃 Running the Application
✅ Backend
bash
Copy code
cd backend
npm run dev
Runs on: http://localhost:3000

✅ Frontend
bash
Copy code
cd frontend
npm run dev
Runs on: http://localhost:5173

📡 API Documentation
✅ Routes
Method	Endpoint	Description
GET	/api/routes	Fetch routes
POST	/api/routes/:routeId/baseline	Set baseline route

✅ Comparison
Method	Endpoint
GET	/api/compare

✅ Banking
Method	Endpoint
GET	/api/banking/:shipId/:year
POST	/api/banking/bank
POST	/api/banking/apply

✅ Pooling
Method	Endpoint
POST	/api/pooling

📁 Project Structure
go
Copy code
fueleu-maritime-platform/
├── backend/
├── frontend/
├── README.md
└── package.json
📊 Screenshots
✅ Dashboard – Routes Management
<p align="center"> <img src="./assets/routes-dashboard.png" width="90%" /> </p>
✅ Comparison View (Placeholder)
<p align="center"> <img src="https://via.placeholder.com/900x400?text=Comparison+Module" width="90%" /> </p>
🧪 Tests
✅ Backend Tests
bash
Copy code
cd backend
npm test
👨‍💻 Developer
Gurmeet Singh Rathor
📧 Email: gurigurmeet1234567@gmail.com
🐙 GitHub: @Guri9368

📄 License
This project is built for interview & educational purposes.

❤️ Thank You
FuelEU Maritime Compliance — Built with precision, performance & passion.
