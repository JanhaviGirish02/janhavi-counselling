# Environment Variables Setup Guide

Complete step-by-step instructions to get all required API keys and configure your `.env.local` file.

---

## 1. Firebase Setup

Firebase provides authentication and database for the website.

### Step 1: Create Firebase Project

1. Go to **[console.firebase.google.com](https://console.firebase.google.com)**
2. Click **"Create a project"** → Enter project name → Click **"Continue"**
3. Disable Google Analytics (optional) → Click **"Create project"**
4. Wait for setup to complete

### Step 2: Setup Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Get Started"**
3. Under "Sign-in method", enable:
   - **Email/Password** → Click enable → Click **"Save"**
   - **Google** → Click enable → Select default project → Click **"Save"**

### Step 3: Create Firestore Database

1. Go to **Firestore Database** (left sidebar)
2. Click **"Create database"**
3. Start in **Test mode** (for development)
4. Select region closest to India (e.g., `asia-south1`)
5. Click **"Create"**

### Step 4: Get Firebase Config Keys

1. Go to **Project Settings** (click gear icon)
2. Scroll down to **"Your apps"** section
3. Click the `</> ` (Web) icon to add a web app
4. Enter app name (e.g., "Janhavi Counselling")
5. Check **"Also set up Firebase Hosting"** → Click **"Register app"**
6. Copy the Firebase config object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",  // 🔑 NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "your-project.firebaseapp.com",  // 🔑 NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "your-project-id",  // 🔑 NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "your-project.appspot.com",  // 🔑 NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456789",  // 🔑 NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123:web:abc..."  // 🔑 NEXT_PUBLIC_FIREBASE_APP_ID
};
```

### Firebase Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy_your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

> **Note:** Firebase keys starting with `NEXT_PUBLIC_` are **public and safe** to expose. They're used in the browser for authentication. Real secrets are handled server-side.

---

## 2. Razorpay Setup

Razorpay handles all payment processing (Cards, UPI, Netbanking).

### Step 1: Create Razorpay Account

1. Go to **[dashboard.razorpay.com/signup](https://dashboard.razorpay.com/signup)**
2. Enter email, password, and phone
3. Verify email and phone
4. Complete KYC (if you want to go live)

### Step 2: Get API Keys

1. Log in to **[dashboard.razorpay.com](https://dashboard.razorpay.com)**
2. Go to **Settings** (bottom-left) → **API Keys**
3. You'll see two keys:
   - **Key ID** - Used in browser (public) 🔑 `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - **Key Secret** - Server-side only (secret) 🔑 `RAZORPAY_KEY_SECRET`

4. Copy both keys

### Step 3: Test vs Live Mode

- **Test Mode** (Development):
  - Use Test Key ID and Secret
  - Won't charge real money
  - Great for testing payments

- **Live Mode** (Production):
  - Requires business verification
  - Use Live Key ID and Secret
  - Will charge real money

### Razorpay Environment Variables

```env
# Test Mode Keys (for development)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_1234567890ABC
RAZORPAY_KEY_SECRET=your_test_secret_key_here

# OR Live Mode Keys (for production - after KYC)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_1234567890ABC
RAZORPAY_KEY_SECRET=your_live_secret_key_here
```

### Test Cards for Development

Use these to test payments in Test Mode:

| Card Type | Card Number | Expiry | CVV |
|---|---|---|---|
| Visa | 4111111111111111 | 12/25 | 123 |
| Mastercard | 5555555555554444 | 12/25 | 123 |
| Amex | 378282246310005 | 12/25 | 1234 |

**Test UPI:** `success@razorpay` or `failure@razorpay`

---

## 3. Twilio WhatsApp Setup

Twilio sends WhatsApp notifications to admin when bookings are made.

### Step 1: Create Twilio Account

1. Go to **[console.twilio.com](https://console.twilio.com/)**
2. Sign up with email and password
3. Verify phone and email
4. Complete signup

### Step 2: Get Twilio Credentials

1. In Twilio Console, go to **Account** (top-left menu)
2. Copy:
   - **Account SID** 🔑 `TWILIO_ACCOUNT_SID`
   - **Auth Token** 🔑 `TWILIO_AUTH_TOKEN`

### Step 3: Set Up WhatsApp Sandbox

1. Go to **Messaging** → **Services**
2. Click **Create Messaging Service** → Enter name → Click **Create**
3. Go to **Messaging** → **Try it out** → **Send a WhatsApp message**
4. Select the service you just created
5. Use the **Sandbox** number shown (e.g., `whatsapp:+14155238886`)
6. Add your number to the sandbox:
   - Send `join winter-hanger` to the Twilio number
   - Twilio will confirm

### Twilio Environment Variables

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886  # Twilio sandbox or your business number
ADMIN_WHATSAPP_NUMBER=+919876543210  # Your phone (admin gets notifications)
```

> **India Format:** Use country code +91 for Indian numbers (e.g., `+919876543210`)

---

## Complete `.env.local` Template

Create a file named `.env.local` in the project root and add all keys:

```env
# ========== FIREBASE ==========
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy_your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456

# ========== RAZORPAY ==========
# Use rzp_test_* for development, rzp_live_* for production
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_1234567890ABC
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here

# ========== TWILIO WHATSAPP ==========
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER=+919876543210
```

---

## Optional: `.env.local.example`

There's already an [.env.local.example](.env.local.example) file with all keys. You can copy and fill it:

```bash
cp .env.local.example .env.local
# Now edit .env.local with your actual keys
```

---

## Important Security Notes

⚠️ **DO NOT commit `.env.local` to GitHub**
- It's already in `.gitignore`
- Keep your secret keys safe

✅ **`NEXT_PUBLIC_*` keys are public**
- Safe to expose in browser
- Used for Firebase auth and Razorpay checkout

🔒 **Other keys are server-side only**
- Never exposed to browser
- Used in API routes only

✅ **Vercel Deployment**
- Add all env vars in Vercel Dashboard → Project Settings → Environment Variables
- Vercel will inject them at build time

---

## Troubleshooting

### Firebase Auth Not Working
- Check `NEXT_PUBLIC_FIREBASE_PROJECT_ID` matches Firebase Console
- Verify Email/Password and Google auth enabled in Firebase Console
- Clear browser cache and try again

### Payments Failing
- Using Test Mode keys? Use test card: `4111111111111111`
- Check Razorpay key format (starts with `rzp_test_` or `rzp_live_`)
- Verify admin phone number is correct

### WhatsApp Not Sending
- Admin number format: `+919876543210` (with +91 for India)
- Verify Twilio account has credits
- Check `TWILIO_WHATSAPP_NUMBER` matches sandbox setup

### Email Verification Issues
- Check Firebase auth email domain whitelist
- Verify email sending is enabled in Firebase Console

---

## Support

Refer to official docs:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Razorpay Integration Guide](https://razorpay.com/docs/)
- [Twilio WhatsApp Guide](https://www.twilio.com/docs/whatsapp)
