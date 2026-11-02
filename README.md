# MarryOn — Smart Wedding Planner & Vendor Marketplace

> **"Plan less, celebrate more!"**  
> *Your Dream Wedding, Beautifully Planned.*

MarryOn is an end-to-end wedding planning and vendor discovery platform engineered for Indian weddings. It combines smart budget overrun tracking in Indian Rupee (INR ₹), an interactive AI-assisted planner, verified vendor directories, quotation and booking management, guest RSVP lists, task timelines, and an administrative compliance control room.

---

## 🌟 Key Product Capabilities

### 1. 👫 Customer & Couple Experience
- **Personalized Wedding Dashboard**: Live countdown to the big day, budget utilization gauge, upcoming tasks, and quick actions.
- **Smart Budget & Overrun Engine**:
  - Category allocations (Venue, Catering, Photography, Decor, Clothing, Makeup, Music, Invitations, Transportation).
  - Tracks estimated vs. actual expenses and unpaid balances.
  - **Overrun alerts & Cheaper Alternatives**: Intelligently identifies categories where spending exceeds target and presents pre-compared, verified marketplace alternatives with quantified savings.
- **AI Wedding Planner**: Built-in assistant synced with your wedding date, ₹25 Lakh budget, and saved vendors in Pune, offering actionable shortcuts.
- **Vendor Marketplace & Comparison**: Search, filter by price, rating, city, and verified status; side-by-side comparison matrix.
- **Task Manager & Wedding Checklist**: Grouped by urgency with starter templates and completion tracking.
- **Wedding Calendar**: Unified view of rituals, deadlines, payment dues, and custom appointments.
- **Guest List & RSVP**: Track Bride/Groom family, VIPs, and colleagues, attendance, and plus-ones.
- **Wishlist & Quotes**: Save vendors and track quotation proposals in real-time.

### 2. 🏪 Wedding Vendor Portal
- **Business Dashboard**: Pipeline tracking, upcoming bookings, and client reviews.
- **Service & Package Management**: Define customized tiers with inclusions and pricing.
- **Portfolio Gallery**: Showcase wedding photography and styling albums.
- **Availability Calendar**: Mark blackout dates and manage event dates.
- **Enquiry & Quotation Workflow**: Review incoming client specifications, propose quotes, and update booking status (`Pending` -> `Responded` -> `Confirmed`).
- **Verification Center**: Submit GST certificates or trade licenses to receive the green Verified Partner badge.

### 3. 🛡️ Administrator Operations Center
- **User Directory**: View, filter, and suspend/reactivate customer and vendor accounts.
- **Vendor Directory**: Toggle verified partner badges and feature top vendors on homepage.
- **Verification Queue**: Audit submitted business licenses and approve or request revisions.
- **Bookings Ledger**: Oversee transactions across the entire marketplace.
- **Content Moderation**: Review reported listings and inappropriate feedback.
- **Security Audit Log**: Immutable record of administrative operations.
- **Global Platform Settings**: Manage commission rates, feature toggles, and reset demo data.

---

## 🚀 How to Run the Website

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Unit Tests
```bash
npm run test
```

---

## 🎭 Role Switcher & Local Demo Mode

MarryOn includes a **Local Demo Banner** at the top of every screen allowing one-click role switching:
- **Couple Mode**: Pre-loaded with Aarav & Meera's wedding in Pune (₹25,00,000 budget, Corinthian Resort, 350 guests).
- **Vendor Mode**: Pre-loaded as *Rohan Deshpande Photography* (Verified Partner in Pune).
- **Admin Mode**: Full access to the Administrator Command Center (`/admin/dashboard`).

All actions (adding expenses, sending enquiries, booking quotes, auditing verifications) persist locally in browser storage and trigger real-time reactivity. You can reset to initial factory demo data at any time from `/admin/settings` or via the top banner.

---

## 🗄️ Optional Supabase Backend Integration

If you wish to connect MarryOn to a live PostgreSQL backend:
1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Set your project URL and public Anon key:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. If either variable is missing, MarryOn automatically falls back to Local Demo Mode without breaking.

---

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI primitives (Button, Modal, Input, Card, Badge)
├── contexts/            # React contexts (Auth, Wedding, Toast)
├── data/                # Indian wedding mock datasets & initial storage records
├── layouts/             # Public, Customer, Vendor, and Admin navigation layouts
├── pages/
│   ├── public/          # Home, Vendors, Detail, Features, How It Works, About, Contact
│   ├── auth/            # Login, Register, Forgot Password
│   ├── onboarding/      # Customer and Vendor step-by-step setup
│   ├── customer/        # Dashboard, AI Planner, Budget, Tasks, Calendar, Guests, Compare
│   ├── vendor/          # Dashboard, Services, Portfolio, Enquiries, Verification
│   ├── admin/           # Dashboard, Users, Vendors, Verifications, Reports, Audit Log
│   └── errors/          # 404 Not Found
├── services/            # Storage service with reactive events & Supabase client
├── types/               # TypeScript interfaces & types
└── utils/               # Indian Rupee formatters, countdowns, budget formulas
```
