# JanSaathi AI — Every Citizen. Every Opportunity.

> **An inclusive India-wide government scheme discovery platform built strictly on the Bauhaus design system.**

![Design System](https://img.shields.io/badge/Design%20System-Bauhaus%20Geometric-D02020?style=for-the-badge)
![Framework](https://img.shields.io/badge/Next.js-14%20App%20Router-1040C0?style=for-the-badge)
![Styling](https://img.shields.io/badge/Tailwind%20CSS-Custom%20Tokens-F0C020?style=for-the-badge)
![Database](https://img.shields.io/badge/Supabase-PostgreSQL%20RLS-121212?style=for-the-badge)
![Accessibility](https://img.shields.io/badge/WCAG-2.2%20AA%20Compliant-success?style=for-the-badge)

---

## 1. Overview & Public Purpose

**JanSaathi AI** is a non-commercial, non-partisan public interest web application designed to eliminate administrative opacity in discovering Indian Union and State Government welfare schemes. 

Inspired by the effortless discovery offered by Buddy4Study and grounded strictly in official government gazettes (`myscheme.gov.in`, `scholarships.gov.in`, `services.india.gov.in`), JanSaathi AI serves:
- **Farmers & Agricultural Workers** (PM-KISAN, Rythu Bharosa)
- **Students & Research Scholars** (NSP Post-Matric, State Fellowships)
- **Traditional Artisans & Craftsmen** (PM Vishwakarma)
- **Street Vendors & Micro-entrepreneurs** (PM SVANidhi, Mudra)
- **Women Heads of Households** (Magalir Urimai, Ladki Bahin, Sukanya Samriddhi)
- **Senior Citizens & Unorganized Laborers** (Atal Pension Yojana, Old Age Pensions)
- **Persons with Benchmark Disabilities (PwD)** (Divyangjan Swavalamban)
- **Urban & Rural Families** (PMAY Urban, Ayushman Bharat PM-JAY, PM Surya Ghar)

---

## 2. Mandatory Bauhaus Design System

JanSaathi AI strictly embodies Bauhaus architectural principles: **geometric purity, primary colors, functional honesty, asymmetric balance, and tactile depth**.

### Color Tokens
- **Background:** `#F0F0F0` (Architectural Off-White)
- **Foreground:** `#121212` (Solid Carbon Black)
- **Primary Red:** `#D02020`
- **Primary Blue:** `#1040C0`
- **Primary Yellow:** `#F0C020`
- **White:** `#FFFFFF`
- **Muted Gray:** `#E0E0E0`
- **Borders:** `#121212` (Thick 2px mobile / 4px desktop)

*Note: No gradients, no glassmorphism, no pastels, and no blurred shadows are used anywhere across the interface.*

### Typography & Physics
- **Google Font:** `Outfit` (Weights: 400, 500, 700, 900)
- **Display Headings:** Massive uppercase display typography with tight tracking (`leading-[0.9]`)
- **Corners:** Square `rounded-none` default. Circles are restricted exclusively to avatars, badges, and intentional geometric shapes.
- **Hard Offset Shadows:**
  - Small: `3px 3px 0 #121212`
  - Medium: `6px 6px 0 #121212`
  - Large: `8px 8px 0 #121212`
- **Button Physics:** Tactile press (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`).

---

## 3. Key Pages & Routes

| Route | Purpose |
|---|---|
| `/` | Inclusive Bauhaus Homepage with 2-col hero, 12 category posters, situation quick-filters, coverage split, and trust benchmarks |
| `/discover` | Advanced Search Directory with keyword match, state filters, category filters, level filters, and grid/list view |
| `/categories` | 12 Citizen need domains with scheme statistics |
| `/categories/[slug]` | Dedicated category scheme listings |
| `/states` | Interactive portal for all 28 States and 8 Union Territories |
| `/states/[state]` | State-specific schemes directory + central schemes applicable in that state |
| `/schemes/[slug]` | Dedicated scheme detail page with interactive eligibility checklist, benefits breakdown, and official .gov.in links |
| `/eligibility` | 4-step eligibility questionnaire with zero sensitive data collection and instant statutory matching |
| `/assistant` | Full-page **Saathi AI** conversational assistant grounded in official scheme gazettes with fallback heuristics |
| `/compare` | Side-by-side Bauhaus comparison table for up to 3 schemes |
| `/saved` | Bookmarked schemes with offline persistence and print support |
| `/deadlines` | Application calendar and closing schedule monitor |
| `/data-sources` | Official source registry (MyScheme, NSP, PM-KISAN, Buddy4Study attribution) |
| `/about` | JanSaathi mission & Bauhaus architectural manifesto |
| `/privacy` | DPDP-compliant zero biometric/financial data policy |
| `/terms` | Citizen charter and non-governmental disclaimer |
| `/accessibility` | WCAG 2.2 AA conformance statement |
| `/report-issue` | Community data discrepancy and scheme update reporting |
| `/auth/sign-in` | Bauhaus citizen authentication with guest access option |
| `/auth/sign-up` | Citizen profile creation |
| `/profile` | Domicile, occupation preferences, saved schemes, and data purge |
| `/admin` | Administrator overview, verification queue, and KPI cards |
| `/admin/schemes` | Scheme repository management & new gazette scheme authoring |
| `/admin/imports` | Bulk JSON/CSV data ingestion pipeline with validation |
| `/admin/sources` | Official data source synchronization monitor |
| `/admin/reports` | Citizen discrepancy review queue |

---

## 4. Local Development Quickstart

### Prerequisites
- Node.js v18.0.0 or higher
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/jansaathi-ai.git
cd jansaathi-ai

# Install dependencies
npm install

# Setup local environment
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 5. Environment Variables (`.env.local`)

```env
# Optional Supabase Database (app includes full local storage fallback if omitted)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional OpenAI API Key for Saathi AI (high-accuracy grounded heuristic engine fallback included)
OPENAI_API_KEY=sk-...

# Application Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 6. Supabase Database Setup

To run JanSaathi AI on a live Supabase PostgreSQL database:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `supabase/migrations/20261015000000_init.sql`.
4. Click **Run**. This provisions:
   - `schemes` table with GIN full-text search indexes
   - `saved_schemes` table with Row Level Security (RLS)
   - `issue_reports` table for community audits
   - `admin_audit_logs` table
5. Copy your Project URL and Anon API key into `.env.local`.

---

## 7. Deployment to Vercel & GitHub

### GitHub Setup
```bash
git init
git add .
git commit -m "feat: Initial JanSaathi AI Bauhaus platform"
git branch -M main
git remote add origin https://github.com/your-username/jansaathi-ai.git
git push -u origin main
```

### Vercel Deployment
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository.
3. In **Environment Variables**, optionally paste `OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Click **Deploy**. The site will build automatically via `next build`.

---

## 8. Public Trust Disclaimer

JanSaathi AI is an independent discovery platform designed in the public interest. JanSaathi AI is not affiliated with, endorsed by, or an official representative of the Government of India or any State Government. We do not charge fees, collect sensitive financial/biometric identifiers, or guarantee application approval. Always submit official applications through authorized `.gov.in` or `.nic.in` portals.
