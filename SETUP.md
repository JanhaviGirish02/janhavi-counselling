# Janhavi Girish Website - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root with your credentials:

```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
ADMIN_WHATSAPP_NUMBER=+1234567890
```

**Note:** Values are optional during development. The app includes demo mode fallbacks for Razorpay.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout with auth provider
│   ├── auth/              # Auth pages (login, register)
│   ├── book/              # Booking flow (5-step form)
│   ├── my-bookings/       # Client booking history
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── [legal pages]/     # Privacy, Terms, etc.
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Home page sections
│   ├── booking/           # Booking form steps
│   └── ui/                # Reusable UI components
├── context/               # Auth context
├── lib/                   # Firebase config, utilities
└── styles/                # Global CSS

```

## Key Features

✅ **Authentication** - Email & Google Sign-In via Firebase  
✅ **Booking System** - 5-step booking flow with intake form  
✅ **Payment** - Razorpay integration (Cards, UPI, Netbanking)  
✅ **Admin Dashboard** - View bookings, client info, sessions  
✅ **Notifications** - WhatsApp alerts for bookings  
✅ **Responsive Design** - Mobile-optimized UI  
✅ **SEO Ready** - Meta tags, Open Graph, structured data

## Deployment

### Deploy on Vercel

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Connect on [vercel.com](https://vercel.com)
   - Click "New Project" → Import Git repository
   - Select the repository

3. Add Environment Variables:
   - Go to Project Settings → Environment Variables
   - Add all `.env.local` values from step 2 above

4. Deploy
   - Vercel auto-detects Next.js
   - Click Deploy
   - Site goes live at `your-project.vercel.app`

## Admin Access

To enable admin features:
1. Sign up normally
2. Go to Firebase Console → Firestore → `users` collection
3. Find your user document and change `role: "admin"`
4. Refresh the site

## Troubleshooting

**Build fails with Firebase errors:**
- The app handles missing Firebase keys gracefully (demo mode)
- Add real Firebase config to `.env.local` for full functionality

**Razorpay payment not working:**
- In demo mode, click "Complete Payment" to simulate
- Add real Razorpay keys for live payments

**WhatsApp notifications not sent:**
- Configure Twilio credentials in `.env.local`
- Without them, bookings still save to database

## Support

For issues or questions, refer to the main [README.md](./README.md) for detailed documentation.
