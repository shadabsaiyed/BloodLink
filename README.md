## 🚀 Live Demo
👉 https://thebloodlink.vercel.app
# 🩸 BloodLink — Blood Donation Management System

A full-stack blood donation management web application built with **React**, **TypeScript**, **Firebase**, and **Tailwind CSS**. BloodLink connects blood donors with healthcare organizations, featuring dedicated dashboards for both donors and organizations.

---

## 🌟 Features

- **Home Page** — Hero section with live statistics (Active Donors, Lives Impacted, 24/7 Support)
- **Authentication** — Firebase Auth with login/signup modal supporting two roles: Donor & Healthcare Provider
- **Donor Dashboard** — Track donation history, schedule donations, manage profile
- **Organization Dashboard** — Manage donation drives, view and manage donor data
- **About Pages** — Mission, How It Works, Impact sections
- **Donate Page** — Schedule a donation or find donation centers nearby
- **Contact Page** — Get in touch form
- **Firestore Database** — Real-time data for donors and donations
- **Responsive Design** — Mobile-friendly with hamburger navigation

---

## 🛠️ Technologies Used

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — Fast build tool
- [Firebase](https://firebase.google.com/) — Authentication & Firestore database
- [React Router](https://reactrouter.com/) — Client-side routing
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) — Accessible UI components

---

## 📁 Project Structure

```
BloodLink/
├── src/
│   ├── App.tsx                       # Main app with routes
│   ├── main.tsx                      # Entry point
│   ├── components/
│   │   ├── home/                     # HeroSection, StatisticsGrid
│   │   ├── navigation/               # Navbar
│   │   ├── auth/                     # AuthModal (Donor & Healthcare Provider)
│   │   ├── dashboard/                # DonorDashboard, OrganizationDashboard
│   │   ├── about/                    # Mission, HowItWorks, Impact
│   │   ├── donate/                   # DonatePage
│   │   ├── contact/                  # ContactPage
│   │   └── ui/                       # shadcn/ui components
│   ├── contexts/
│   │   └── AuthContext.tsx           # Global auth state
│   ├── lib/
│   │   ├── firebase.ts               # Firebase config (uses .env)
│   │   ├── auth.ts                   # Auth functions
│   │   ├── donations.ts              # Donation CRUD operations
│   │   └── donors.ts                 # Donor CRUD operations
│   └── types/                        # TypeScript types
├── public/                           # Static assets
├── .env.example                      # Environment variables template
├── firestore.rules                   # Firestore security rules
└── README.md
```

---

## ▶️ Getting Started

### Prerequisites
- Node.js 18+
- A [Firebase](https://console.firebase.google.com) project with Authentication and Firestore enabled

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/shadabsaiyed/BloodLink.git
cd BloodLink
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
```
Fill in your Firebase credentials in `.env.local`.

**4. Run the development server**
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → Email/Password
4. Enable **Firestore Database**
5. Copy your config keys into `.env.local`

---

## 👨‍💻 Author 
Shadab(https://github.com/shadabsaiyed)
