# 🚢 FuelEU Maritime Compliance Platform

A comprehensive web application for managing maritime route compliance, emissions tracking, banking, and pooling under the FuelEU Maritime Regulation.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Features Overview](#-features-overview)

---

## ✨ Features

### 🚢 Routes Management
- Create and manage maritime routes
- Track GHG intensity, fuel consumption, and distance
- Set baseline routes for comparison
- Filter by vessel type, fuel type, and year

### 📊 Route Comparison
- Compare routes against baseline
- Visual charts showing emissions differences
- FuelEU Maritime compliance checking
- Target intensity calculations

### 🏦 Banking (Article 20)
- Calculate compliance balance (CB)
- Bank surplus emissions for future use
- Apply banked emissions to deficits
- Track banking history

### 🤝 Pooling (Article 21)
- Create compliance pools with multiple ships
- Distribute compliance balance across pool members
- Validate pool compliance
- Track pooling results

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Architecture:** Hexagonal (Ports & Adapters)
- **Testing:** Jest

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Charts:** Recharts
- **State Management:** React Context API

---

## 🏗️ Architecture

The project follows **Hexagonal Architecture (Ports & Adapters)**:

backend/
├── src/
│ ├── core/
│ │ ├── domain/ # Domain models
│ │ ├── ports/ # Interfaces
│ │ └── application/ # Business logic
│ ├── adapters/
│ │ ├── inbound/ # HTTP controllers
│ │ └── outbound/ # PostgreSQL repositories
│ └── infrastructure/ # Config, DB, Server
│
frontend/
├── src/
│ ├── core/
│ │ ├── domain/ # Domain models
│ │ └── ports/ # Interfaces
│ ├── adapters/
│ │ ├── api/ # HTTP client
│ │ └── ui/ # React components
│ └── App.tsx

text

---

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn**
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

git clone https://github.com/Guri9368/fueleu-maritime-platform.git
cd fueleu-maritime-platform

text

### 2. Install Backend Dependencies

cd backend
npm install

text

### 3. Install Frontend Dependencies

cd ../frontend
npm install

text

---

## 🗄️ Database Setup

### 1. Create PostgreSQL Database

Open psql or pgAdmin
createdb fueleu

Or in psql:
psql -U postgres
CREATE DATABASE fueleu;
\q

text

### 2. Configure Environment Variables

Create `.env` file in `backend/` folder:

cd backend
cp .env.example .env

text

Edit `backend/.env`:

NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/fueleu

text

**Replace `YOUR_PASSWORD` with your PostgreSQL password.**

### 3. Run Database Migrations

From backend folder
npm run db:init

text

This will:
- ✅ Create all tables (routes, ship_compliance, bank_entries, pools, pool_members)
- ✅ Seed 5 sample routes

**Expected Output:**
✅ Connected successfully!
✅ Tables created successfully!
✅ Data seeded successfully!
📊 Total routes in database: 5

text

---

## 🏃 Running the Application

### Backend Server

cd backend
npm run dev

text

**Server runs on:** `http://localhost:3000`

**Expected Output:**
✅ Database connection established
🚀 Server running on http://localhost:3000
📊 Environment: development

text

### Frontend Application

Open a **new terminal**:

cd frontend
npm run dev

text

**App runs on:** `http://localhost:5173`

**Expected Output:**
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:5173/

text

### Open in Browser

Navigate to: [**http://localhost:5173**](http://localhost:5173)

---

## 📡 API Documentation

### Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/routes` | Get all routes with optional filters |
| `POST` | `/api/routes/:routeId/baseline` | Set a route as baseline |

### Comparison

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/compare` | Compare all routes against baseline |

### Banking

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/banking/:shipId/:year` | Get compliance balance |
| `POST` | `/api/banking/bank` | Bank surplus emissions |
| `POST` | `/api/banking/apply` | Apply banked emissions |
| `GET` | `/api/banking/:shipId/records` | Get banking history |

### Pooling

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/pooling` | Create compliance pool |

---

## 📁 Project Structure

fueleu-maritime-platform/
├── backend/
│ ├── src/
│ │ ├── core/
│ │ │ ├── domain/
│ │ │ │ ├── models/
│ │ │ │ └── types/
│ │ │ ├── ports/
│ │ │ └── application/
│ │ │ ├── services/
│ │ │ └── useCases/
│ │ ├── adapters/
│ │ │ ├── inbound/http/
│ │ │ └── outbound/postgres/
│ │ ├── infrastructure/
│ │ └── index.ts
│ ├── database/
│ │ ├── schema.sql
│ │ └── seed.sql
│ ├── scripts/
│ │ ├── setup-db.js
│ │ └── seed-db.js
│ ├── tests/
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── core/
│ │ ├── adapters/
│ │ │ ├── api/
│ │ │ └── ui/
│ │ │ ├── components/
│ │ │ ├── pages/
│ │ │ └── context/
│ │ ├── App.tsx
│ │ └── main.tsx
│ └── package.json
│
├── .gitignore
└── README.md

text

---

## 🎯 Features Overview

### 1. Routes Tab
![Routes Management](https://via.placeholder.com/800x400?text=Routes+Management)

- View all maritime routes
- Filter by vessel type, fuel type, year
- Set baseline route for comparison
- See GHG intensity, fuel consumption, distance

### 2. Compare Tab
![Route Comparison](https://via.placeholder.com/800x400?text=Route+Comparison)

- Compare routes against baseline
- Visual bar charts
- Compliance indicators (✅/❌)
- Percentage difference calculations

### 3. Banking Tab
![Banking Management](https://via.placeholder.com/800x400?text=Banking+Management)

- Fetch compliance balance for any ship
- Bank surplus emissions
- Apply banked emissions to future deficits
- View banking history

### 4. Pooling Tab
![Pooling Management](https://via.placeholder.com/800x400?text=Pooling+Management)

- Create pools with multiple ships
- Distribute compliance balance
- Validate pool compliance
- See before/after balances

---

## 🧪 Running Tests

### Backend Tests

cd backend
npm test

text

---

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ `.env` file excluded from Git
- ✅ SQL injection prevention
- ✅ Input validation

---

## 📝 Environment Variables

### Backend `.env`

NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/fueleu

text

---

## 🤝 Contributing

This is an interview project. For any questions or improvements, please contact the developer.

---

## 👨‍💻 Developer

**GurmeetSinghRathor**
- GitHub: [@Guri9368](https://github.com/Guri9368)
- Email: [gurigurmeet1234567@gmail.com]

---

## 📄 License

This project is developed for interview purposes.

---

## 🙏 Acknowledgments

- FuelEU Maritime Regulation (EU 2023/1805)
- Hexagonal Architecture Pattern
- React + TypeScript Community

---

## 📞 Support

For any issues or questions:
1. Check the [Installation](#-installation) section
2. Verify [Prerequisites](#-prerequisites)
3. Ensure PostgreSQL is running
4. Check `.env` configuration

---

**Made with ❤️ for FuelEU Maritime Compliance**