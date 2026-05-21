# Janhavi Girish — Counselling Psychologist Website

A warm, modern, and secure counselling psychology website designed for **Janhavi Girish**, a Counselling Psychologist. Built with Next.js 14, Tailwind CSS, Firebase, and Razorpay.

---

## About the Website

Janhavi Girish offers online therapy sessions for individuals, couples, and families across India. This website provides:

- A professional, welcoming online presence
- A complete 5-step booking system
- Secure Razorpay payments (UPI, Cards, Net Banking)
- Firebase-based authentication (Email + Google Sign-In)
- WhatsApp notifications to admin via Twilio
- An admin dashboard to manage bookings and clients
- Mobile-first, responsive design

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) | React framework (App Router, SSR/SSG) |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [Firebase](https://firebase.google.com) | Auth + Firestore database + Storage |
| [Razorpay](https://razorpay.com) | Payment gateway |
| [Twilio](https://twilio.com) | WhatsApp Business notifications |
| [Framer Motion](https://www.framer.com/motion) | Animations |
| [react-hook-form](https://react-hook-form.com) | Form handling |

---

## Features

- **Home Page** — Hero, About, Services, Areas of Support, Pricing, Testimonials, Contact
- **Authentication** — Email/password + Google Sign-In via Firebase
- **Booking System** — 5-step flow: Therapy Type → Date/Time → Intake Form → Payment → Confirmation
- **Payments** — Razorpay integration (demo mode available without keys)
- **Admin Dashboard** — View bookings, client directory, session stats, settings
- **Notifications** — WhatsApp alerts for every new booking via Twilio
- **Legal Pages** — Privacy Policy, Terms of Service, Cancellation Policy, Disclaimer
- **SEO** — Meta tags, Open Graph, canonical URLs, noindex where appropriate

---

## Local Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/sujaytasgaonkar/janhavi-counselling.git
cd janhavi-counselling
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER=+919876543210
```

> **Note:** All env vars are optional for development. The app runs in demo mode with fallbacks.

### 4. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout (AuthProvider, Navbar, Footer)
│   ├── auth/                 # Login & Register pages
│   ├── book/                 # 5-step booking flow
│   ├── my-bookings/          # Client booking history
│   ├── admin/                # Admin dashboard
│   ├── api/                  # API routes (bookings, payments, notifications)
│   ├── privacy-policy/
│   ├── terms/
│   ├── cancellation-policy/
│   └── disclaimer/
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── sections/             # Hero, About, Pricing, Testimonials, etc.
│   ├── booking/              # Step components for booking flow
│   └── ui/                   # Reusable UI (MobileStickyButton, etc.)
├── context/
│   └── AuthContext.tsx       # Firebase auth state
└── lib/
    └── firebase.ts           # Firebase initialization
```

---

## Deployment on Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/janhavi-counselling.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import the GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Go to **Settings → Environment Variables**, add all keys from step 3 above
5. Click **Deploy**

### 3. Set Up Admin Access

After deployment:
1. Register an account on the website
2. Go to Firebase Console → Firestore → `users` collection
3. Find your document and change `role` from `"client"` to `"admin"`
4. Refresh the site — admin dashboard is now accessible

---

## Third-Party Services Setup

### Firebase
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Email/Password** auth and **Google** provider
3. Create a **Firestore** database
4. Copy config keys to `.env.local`

### Razorpay
1. Sign up at [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Get API Key ID and Secret from Settings → API Keys
3. Use **Test Mode** keys for development, **Live Mode** for production

### Twilio WhatsApp
1. Sign up at [console.twilio.com](https://console.twilio.com)
2. Enable WhatsApp Sandbox or Business Account
3. Copy Account SID, Auth Token, and WhatsApp number to `.env.local`

---

## License

This project is private and built for Janhavi Girish's personal practice. All rights reserved.
