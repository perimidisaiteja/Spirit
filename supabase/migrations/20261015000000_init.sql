-- JanSaathi AI — Supabase Database Migration
-- Bauhaus Design System & Public Scheme Discovery

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Schemes Table
CREATE TABLE IF NOT EXISTS public.schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    short_name TEXT,
    ministry TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('Central', 'State')),
    state_code TEXT NOT NULL DEFAULT 'ALL',
    state_name TEXT,
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    description TEXT NOT NULL,
    benefit_amount_display TEXT NOT NULL,
    detailed_benefits JSONB DEFAULT '[]'::jsonb,
    target_beneficiaries JSONB DEFAULT '[]'::jsonb,
    eligibility JSONB DEFAULT '{}'::jsonb,
    eligibility_summary JSONB DEFAULT '[]'::jsonb,
    documents_required JSONB DEFAULT '[]'::jsonb,
    application_process JSONB DEFAULT '[]'::jsonb,
    official_portal_url TEXT NOT NULL,
    official_application_url TEXT NOT NULL,
    supplementary_url TEXT,
    verification_status TEXT NOT NULL DEFAULT 'Verified' CHECK (verification_status IN ('Verified', 'Pending Review')),
    last_verified_date DATE NOT NULL DEFAULT CURRENT_DATE,
    deadline TEXT NOT NULL DEFAULT 'Always Open',
    application_status TEXT NOT NULL DEFAULT 'Open' CHECK (application_status IN ('Open', 'Always Open', 'Upcoming', 'Closed')),
    tags JSONB DEFAULT '[]'::jsonb,
    funding_ratio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search Index using PostgreSQL full-text search
CREATE INDEX IF NOT EXISTS schemes_fts_idx ON public.schemes 
USING GIN (to_tsvector('english', name || ' ' || description || ' ' || ministry));

-- Saved Schemes Table (User Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    scheme_id UUID REFERENCES public.schemes(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, scheme_id)
);

-- Issue Reports Table (Community Feedback & Corrections)
CREATE TABLE IF NOT EXISTS public.issue_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheme_id UUID REFERENCES public.schemes(id) ON DELETE SET NULL,
    scheme_name TEXT,
    issue_type TEXT NOT NULL,
    description TEXT NOT NULL,
    contact_email TEXT,
    status TEXT NOT NULL DEFAULT 'Under Review' CHECK (status IN ('Under Review', 'Verified', 'Resolved', 'Dismissed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Audit Logs Table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    performed_by TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public read access to verified schemes
CREATE POLICY "Public schemes are viewable by everyone" 
ON public.schemes FOR SELECT 
USING (true);

-- Users manage their own saved schemes
CREATE POLICY "Users can view their own saved schemes" 
ON public.saved_schemes FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved schemes" 
ON public.saved_schemes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved schemes" 
ON public.saved_schemes FOR DELETE 
USING (auth.uid() = user_id);

-- Anyone can submit an issue report
CREATE POLICY "Anyone can report an issue" 
ON public.issue_reports FOR INSERT 
WITH CHECK (true);
