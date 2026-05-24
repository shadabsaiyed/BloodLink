# 🩸 BloodLink — Blood Donation Management System

A full-stack blood donation management web application built with **React**, **TypeScript**, **Firebase**, and **Tailwind CSS**. BloodLink connects blood donors with healthcare organizations, featuring dedicated dashboards for both donors and organizations.

## 🚀 Live Demo
👉 [https://thebloodlink.vercel.app](https://thebloodlink.vercel.app)

---

## 🌟 Features

- **Home Page** — Hero section with live statistics (Active Donors, Lives Impacted, 24/7 Support)
- **Authentication** — Firebase Auth with login/signup modal supporting two roles: Donor & Healthcare Provider
- **Donor Dashboard** — Track donation history, schedule donations, manage profile
- **User Profile** — Persistent donor profile with blood type, donation stats and personal info
- **Organization Dashboard** — Manage donation drives, view and manage donor data
- **About Pages** — Mission, How It Works, Impact sections
- **Donate Page** — Schedule a donation or find donation centers nearby
- **Donation Centers** — Google Maps view of nearby blood donation centers
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
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   │   ├── home/
│   │   ├── navigation/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── about/
│   │   ├── donate/
│   │   ├── contact/
│   │   └── ui/
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── auth.ts
│   │   ├── donations.ts
│   │   ├── donors.ts
│   │   └── profile.ts
│   └── types/
├── public/
├── .env.example
├── firestore.rules
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

**Shadab Saiyed** — [GitHub](https://github.com/shadabsaiyed)
```
