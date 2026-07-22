# 🏗️ The TaxMan's Capital — Project File Structure & Architecture Guide

## 📌 Executive Overview
**The TaxMan's Capital** is an Enterprise Full-Stack Web Platform tailored for CA, ACCA, and Finance professionals/students.
- **Framework**: Next.js 15 (App Router, SSR/SSG & Client Components)
- **Database Layer**: PostgreSQL + Prisma ORM 6
- **Styling & UI**: Tailwind CSS v4, Lucide Icons, Custom 3D Components
- **Security Stack**: JWT HttpOnly Cookie sessions, bcryptjs password hashing (12 rounds), Zod runtime validation, XSS sanitization, Rate Limiting, and Middleware RBAC.

---

## 🌳 Directory Tree Overview

```
The-TexMan-s-Capital/
├── 📁 app/                        # Next.js 15 App Router (Pages, Views & API Endpoints)
│   ├── 📁 admin/                  # Admin Dashboard & Management UI
│   ├── 📁 announcements/          # Notices & News Page
│   ├── 📁 api/                    # Server-side API Route Handlers (RESTful Endpoints)
│   │   ├── 📁 ai/                 # AI Mock Interview Simulator API
│   │   ├── 📁 announcements/      # Announcements CRUD API
│   │   ├── 📁 auth/               # Authentication APIs (login, register, logout, me, profile)
│   │   ├── 📁 community/          # Community Groups API
│   │   ├── 📁 events/             # Events & Registrations API
│   │   ├── 📁 jobs/               # Jobs Search, CRUD & Bookmark APIs
│   │   ├── 📁 messages/           # Counseling Queries & Admin Reply API
│   │   ├── 📁 podcasts/           # Podcast Videos API
│   │   └── 📁 resources/          # Study Material Download & Increment API
│   ├── 📁 community/              # Community WhatsApp/Discord Groups Page
│   ├── 📁 counseling/             # Career Counseling & Query Submission Page
│   ├── 📁 dashboard/              # Student Dashboard (Saved jobs, my queries, profile)
│   ├── 📁 events/                 # Seminars & Webinars Page
│   ├── 📁 jobs/                   # Job Portal & Search Page
│   ├── 📁 login/                  # Auth Page (3D Flip Card Login/Register)
│   ├── 📁 podcasts/               # Video Podcasts Page
│   ├── 📁 resources/              # Study Notes & Material Library Page
│   ├── 📁 tools/                  # Finance & Salary Calculators Page
│   ├── error.tsx                  # Next.js Global Error Boundary
│   ├── globals.css                # Global Design System, Tailwind v4 & Custom Keyframes
│   ├── layout.tsx                 # Root Layout Component
│   ├── not-found.tsx              # 404 Page Component
│   └── page.tsx                   # Main Landing/Home Page
├── 📁 components/                 # Reusable UI Components
│   ├── 3DLoginCard.tsx            # Interactive 3D Auth Card
│   ├── CustomCursor.tsx           # Custom Interactive Mouse Pointer
│   ├── FloatingSocials.tsx        # Quick Access Social Links Widget
│   ├── Footer.tsx                 # Site Footer Component
│   ├── Navbar.tsx                 # Top Navigation Header
│   └── ToastProvider.tsx          # System Toast Notifications
├── 📁 lib/                        # Backend Core Utilities & Security Libraries
│   ├── auth.ts                    # Session Management & JWT Token issuance/verification
│   ├── prisma.ts                  # Database Singleton Connection Handler
│   ├── rate-limit.ts              # Sliding Window API Rate Limiter
│   ├── security.ts                # Bcrypt Password Hashing & HTML XSS Sanitization
│   └── validation.ts              # Zod Input Validation Schemas
├── 📁 prisma/                     # Database Layer & ORM
│   ├── schema.prisma              # PostgreSQL Relational Data Models
│   └── seed.ts                    # Database Initializer & Admin Account Seeder
├── 📁 public/                     # Static Public Assets (Images, Logos, Favicon)
├── 📁 src/                        # Prototype React/Vite Source Files & Assets
├── 📄 .env                        # Environment Secret Variables (Database URL, JWT Secret)
├── 📄 middleware.ts               # Security Route Guard (RBAC for /admin & /dashboard)
├── 📄 next.config.mjs             # Next.js Settings & HTTP Security Headers
├── 📄 package.json                # Project Dependencies & npm Scripts
└── 📄 README.md                   # Project Quickstart Guide
```

---

## 🛠️ Detailed Component & Folder Explanation

### 1. `app/` (Application Routes & APIs)
The core of Next.js App Router where file-system based routing and API routes reside.

- **`app/page.tsx`**: Main landing page displaying Hero, Feature Cards, Latest Jobs, Resources Preview, and Counseling Call to Action.
- **`app/globals.css`**: Configures Tailwind CSS v4, color variables (`--color-navy`, `--color-brandGreen`), Google Fonts (`Inter`, `Outfit`, `Great Vibes`), `.glass-panel`, `.skyline-bg`, and 3D card perspective classes.
- **`app/api/`**: Contains serverless Node.js handlers executing database queries via Prisma ORM.

### 2. `lib/` (Infrastructure & Security Engine)
- **`auth.ts`**: Encapsulates JWT issuance, cookie handling (`taxman_session` with `httpOnly`, `Secure`, `SameSite=Strict`), and session validation.
- **`prisma.ts`**: Prevents multiple Prisma Client instances during development Hot-Reloading.
- **`security.ts`**: Password hashing via `bcryptjs` with 12 rounds + XSS string sanitization.
- **`validation.ts`**: Defines Zod validation rules for login, registration, job creation, counseling forms, and profile updates.
- **`rate-limit.ts`**: Protects auth endpoints against brute-force attacks.

### 3. `prisma/` (Data Schema & Storage)
- **`schema.prisma`**: Defines database models:
  - `User`: User roles (`USER`, `ADMIN`, `TEAM_HEAD`), qualifications, paper clearance.
  - `Job`: Job postings with filters (city, qualification level, experience, overseas).
  - `JobBookmark`: Saved jobs relation.
  - `Resource`: Study notes, downloads tracker.
  - `CounselingQuery`: Career questions, admin response system.
  - `Event` & `Announcement`: News, webinars, and event registrations.
  - `Podcast` & `CommunityGroup`: Media links & group URLs.
- **`seed.ts`**: Pre-populates the database with initial admin credentials and sample records.

### 4. Security & Access Control
- **`middleware.ts`**: Intercepts requests to protected paths (`/admin/*`, `/dashboard/*`), decodes session cookies, and enforces Role-Based Access Control (RBAC).

---

## 🚀 Key Command Shortcuts
| Script | Command | Description |
| :--- | :--- | :--- |
| **Dev Server** | `npm run dev` | Starts local Next.js dev server on http://localhost:3000 |
| **Database Sync** | `npm run db:push` | Pushes Prisma schema changes to PostgreSQL |
| **Seed Database** | `npm run db:seed` | Fills DB with initial admin user and default records |
| **Production Build**| `npm run build` | Generates Prisma client & compiles production build |
