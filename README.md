🩸 BloodLink — Blood Donation Management System
A full-stack blood donation management web application built with React, TypeScript, Firebase, and Tailwind CSS. BloodLink connects blood donors with healthcare organizations, featuring dedicated dashboards for both donors and organizations.
🚀 Live Demo
👉 https://thebloodlink.vercel.app

🌟 Features

Home Page — Hero section with live statistics (Active Donors, Lives Impacted, 24/7 Support)
Authentication — Firebase Auth with login/signup modal supporting two roles: Donor & Healthcare Provider
Donor Dashboard — Track donation history, schedule donations, manage profile
User Profile — Persistent donor profile with blood type, donation stats and personal info
Organization Dashboard — Manage donation drives, view and manage donor data
About Pages — Mission, How It Works, Impact sections
Donate Page — Schedule a donation or find donation centers nearby
Donation Centers — Google Maps view of nearby blood donation centers
Contact Page — Get in touch form
Firestore Database — Real-time data for donors and donations
Responsive Design — Mobile-friendly with hamburger navigation


🛠️ Technologies Used

React 18 + TypeScript
Vite — Fast build tool
Firebase — Authentication & Firestore database
React Router — Client-side routing
Tailwind CSS — Utility-first styling
shadcn/ui — Accessible UI components


📁 Project Structure
BloodLink/
├── src/
│   ├── App.tsx                       # Main app with routes
│   ├── main.tsx                      # Entry point
│   ├── components/
│   │   ├── home/                     # HeroSection, StatisticsGrid
│   │   ├── navigation/               # Navbar
│   │   ├── auth/                     # AuthModal (Donor & Healthcare Provider)
│   │   ├── dashboard/                # DonorDashboard, OrganizationDashboard, UserProfile
│   │   ├── about/                    # Mission, HowItWorks, Impact
│   │   ├── donate/                   # DonatePage, DonationCentersPage
│   │   ├── contact/                  # ContactPage
│   │   └── ui/                       # shadcn/ui components
│   ├── contexts/
│   │   └── AuthContext.tsx           # Global auth state
│   ├── lib/
│   │   ├── firebase.ts               # Firebase config (uses .env)
│   │   ├── auth.ts                   # Auth functions
│   │   ├── donations.ts              # Donation CRUD operations
│   │   ├── donors.ts                 # Donor CRUD operations
│   │   └── profile.ts                # User profile CRUD operations
│   └── types/                        # TypeScript types
├── public/                           # Static assets
├── .env.example                      # Environment variables template
├── firestore.rules                   # Firestore security rules
└── README.md

▶️ Getting Started
Prerequisites

Node.js 18+
A Firebase project with Authentication and Firestore enabled

Steps
1. Clone the repository
bashgit clone https://github.com/shadabsaiyed/BloodLink.git
cd BloodLink
2. Install dependencies
bashnpm install
3. Set up environment variables
bashcp .env.example .env.local
Fill in your Firebase credentials in .env.local.
4. Run the development server
bashnpm run dev
Open http://localhost:5173 in your browser.

🔥 Firebase Setup

Go to Firebase Console
Create a new project
Enable Authentication → Email/Password
Enable Firestore Database
Copy your config keys into .env.local


👨‍💻 Author
Shadab Saiyed — GitHub
