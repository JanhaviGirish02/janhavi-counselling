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
3. **Database edition:** Choose **Standard Edition** (recommended for this website)
   - **Standard Edition:** Pay-per-use, scales automatically, perfect for websites
   - **Enterprise Edition:** High costs, for large-scale apps (not needed here)
4. Start in **Test mode** (for development)
5. Select region closest to India (e.g., `asia-south1`)
6. Click **"Create"**

> **💡 Tip:** Standard Edition charges per read/write/delete operation. For a therapy booking website with ~50-100 bookings/month, monthly cost is typically ₹100-500. You can change pricing mode anytime.

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

Your Firebase project keys are:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD3ao40WBxgl_M1EVJ7Dg-UsOotTHaZX-0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=therapy-with-janhavi.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=therapy-with-janhavi
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=therapy-with-janhavi.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=310683607077
NEXT_PUBLIC_FIREBASE_APP_ID=1:310683607077:web:0f6907a9fd94b3156d5fcc
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

## 3. Gmail Email Notifications (Free)

The website sends two types of emails automatically:
- **Admin** gets an email for every new booking and contact form submission
- **Clients** get a booking confirmation email after payment

This uses your own **Gmail account** with a Google App Password — completely free.

### Step 1: Enable 2-Factor Authentication on Gmail

1. Go to **[myaccount.google.com/security](https://myaccount.google.com/security)**
2. Under "How you sign in to Google", click **2-Step Verification**
3. Follow the steps to enable it (required before creating App Passwords)

### Step 2: Create a Gmail App Password

> An App Password is a 16-character code that lets apps access Gmail without your real password.

1. Go to **[myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)**
2. In the "App name" field type: `Janhavi Counselling Website`
3. Click **Create**
4. Google will show a 16-character password like: `abcd efgh ijkl mnop`
5. Copy it immediately (shown only once)

### Step 3: Set Environment Variables

```env
GMAIL_USER=your-gmail@gmail.com          # The Gmail account sending emails
GMAIL_APP_PASSWORD=abcdefghijklmnop      # 16-char App Password (no spaces)
ADMIN_EMAIL=your-gmail@gmail.com         # Where admin notifications are sent (can be same)
```

> **Tip:** You can use Janhavi's own Gmail for both `GMAIL_USER` and `ADMIN_EMAIL`, so she receives booking notifications directly in her inbox.

### Gmail Free Tier Limits

| Limit | Value |
|---|---|
| Free daily sending limit | 500 emails/day |
| Monthly cost | ₹0 (completely free) |
| Best for | Up to ~400 bookings/month |

This is more than enough for a counselling practice.

---

## Complete `.env.local` Template

Create a file named `.env.local` in the project root and paste this (fill in the blanks):

```env
# ========== FIREBASE (your keys are already set below) ==========
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD3ao40WBxgl_M1EVJ7Dg-UsOotTHaZX-0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=therapy-with-janhavi.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=therapy-with-janhavi
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=therapy-with-janhavi.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=310683607077
NEXT_PUBLIC_FIREBASE_APP_ID=1:310683607077:web:0f6907a9fd94b3156d5fcc

# ========== RAZORPAY ==========
# Use rzp_test_* for development, rzp_live_* for production
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here

# ========== GMAIL EMAIL NOTIFICATIONS (free) ==========
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your16charapppassword
ADMIN_EMAIL=your-gmail@gmail.com
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

### Emails Not Sending
- Make sure 2FA is enabled on the Gmail account first
- Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) to regenerate the App Password
- `GMAIL_APP_PASSWORD` should be 16 characters with no spaces (e.g., `abcdefghijklmnop`)
- Check your spam/junk folder for the first few test emails

### Firebase Auth Not Working
- Check Email/Password and Google sign-in are enabled in Firebase Console
- Verify the authorized domain is added under Authentication → Settings → Authorized domains

---

## Support

Refer to official docs:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Razorpay Integration Guide](https://razorpay.com/docs/)
- [Google App Passwords Help](https://support.google.com/accounts/answer/185833)
