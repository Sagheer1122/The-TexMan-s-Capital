# 🚀 Production Deployment Guide — The TaxMan's Capital

This guide details how to deploy **The TaxMan's Capital** (Next.js 15 App Router + PostgreSQL + Prisma ORM) to live production cloud hosting with **zero local dependencies**.

---

## 📌 Architecture Overview
- **Web App Hosting (Frontend & API Routes)**: **Vercel** (Free tier available, native Next.js 15 support).
- **Cloud Database (PostgreSQL)**: **Neon.tech** or **Supabase** (Serverless PostgreSQL).
- **ORM & Migrations**: **Prisma ORM** (`prisma generate`, `prisma db push`, `prisma db seed`).

---

## 🌐 Step 1: Create a Free Cloud PostgreSQL Database

### Option A: Neon.tech (Recommended)
1. Go to [https://neon.tech](https://neon.tech) and sign up for a free account.
2. Click **Create Project** -> Name it `taxman-capital-db`.
3. Copy the provided PostgreSQL Connection String (e.g. `postgresql://alex:password@ep-cool-cloud-123456.us-east-2.aws.neon.tech/neondb?sslmode=require`).

### Option B: Supabase
1. Go to [https://supabase.com](https://supabase.com) and create a project.
2. Go to **Project Settings** -> **Database** -> Copy the **URI Connection String** (Transaction pooler on port 6543 or Session pooler on port 5432).

---

## 🗄️ Step 2: Push Schema & Seed Data to Cloud Database

In your local terminal, update `.env` temporarily with your new **Cloud Database URL**:

```env
DATABASE_URL="postgresql://user:password@cloud-db-host/taxman_db?sslmode=require"
JWT_SECRET="your-secure-production-jwt-secret-key-2026"
NODE_ENV="production"
```

Then run the following commands to create tables and insert default seed data (Admin credentials, jobs, resources):

```bash
# Push Prisma schema to Cloud DB
npm run db:push

# Populate Cloud DB with initial data & admin user
npm run db:seed
```

---

## ☁️ Step 3: Deploy to Vercel

1. Push your latest code to your GitHub Repository:
   ```bash
   git add .
   git commit -m "Deploy readiness: Next.js 15 + Prisma setup"
   git push origin main
   ```

2. Open [https://vercel.com](https://vercel.com) and log in with GitHub.
3. Click **Add New Project** -> Select **`The-TexMan-s-Capital`** repository.
4. **Environment Variables**:
   Add the following variables under the **Environment Variables** section:
   - `DATABASE_URL` = `postgresql://user:password@cloud-db-host/taxman_db?sslmode=require`
   - `JWT_SECRET` = `your-secure-production-jwt-secret-key-2026`
   - `NODE_ENV` = `production`

5. **Build Settings**:
   Vercel automatically detects Next.js. Ensure the build command is:
   ```bash
   npm run build
   ```
   *(This automatically executes `prisma generate && next build`)*

6. Click **Deploy**.

---

## ✅ Step 4: Verify Live Production Deployment

Once Vercel completes deployment:
- Open your live production URL (e.g. `https://the-taxmans-capital.vercel.app`).
- **Test Admin Portal**: Navigate to `/login` and log in with default admin credentials:
  - **Email**: `admin@taxmancapital.com`
  - **Password**: `Admin@123`
- **Test Features**: Test Job Search, Counseling Query Submission, and Resources download.
