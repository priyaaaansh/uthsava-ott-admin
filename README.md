# Uthsava OTT — Fullstack Admin Platform

A modern, production-grade OTT administration portal and streaming operations platform for Indian Cinema and entertainment.

---

## 📁 Repository Structure

```
uthsava-ott-admin/
├── backend/                  # Node.js + Express + TypeScript API server
│   ├── src/                  # Core modules, controllers, routes, middleware
│   ├── scripts/              # Database seeding and admin utility scripts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # React 19 + TanStack Start + Vite admin dashboard
│   ├── src/                  # Routes, components, services, and hooks
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **npm** or **bun**

### 2. Backend Setup
```bash
cd backend
npm install
npm run build
npm run dev
```
The backend server runs on `http://localhost:2601` by default.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend portal runs on `http://localhost:8080` by default.

---

## 🔑 Authentication & Dev Mode

The platform includes built-in support for offline and dev-mode exploration without needing official production credentials:
- **One-Click Demo Admin**: On the sign-in screen, click **"Continue as Demo Admin"** to access the entire dashboard immediately.
- **Auto-Bypass**: Navigating directly to protected routes in development automatically initializes a Super Admin session.
- **Interactive Fallback Data**: Key modules like **Content Approval**, **Movies**, and **Dashboard Analytics** provide interactive mock data so video previews, approvals, and reviews can be tested offline.

---

## 🛠 Tech Stack

- **Frontend**: React 19, TanStack Start, TanStack Router, TanStack Query, Tailwind CSS, Radix UI, Lucide Icons, Sonner.
- **Backend**: Express, TypeScript, Mongoose, JWT, Nodemailer, BullMQ, EJS.
