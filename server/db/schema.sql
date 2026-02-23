-- ============================================================
-- APOTSA — Complete Supabase SQL Schema
-- Paste this entire file into the Supabase SQL Editor and run.
-- ============================================================

-- Enable pgcrypto for gen_random_uuid() (usually already enabled)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. TABLES
-- ============================================================

-- COMPANIES
CREATE TABLE IF NOT EXISTS companies (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  gstin       TEXT UNIQUE,
  plan        TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  monthly_budget NUMERIC(12,2) DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id    UUID REFERENCES companies(id) ON DELETE CASCADE,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT DEFAULT 'employee' CHECK (role IN ('admin', 'manager', 'employee')),
  department    TEXT,
  avatar_color  TEXT DEFAULT '#6366f1',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- EXPENSES
CREATE TABLE IF NOT EXISTS expenses (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id       UUID REFERENCES companies(id) ON DELETE CASCADE,
  submitted_by     UUID REFERENCES users(id),
  approved_by      UUID REFERENCES users(id),
  vendor           TEXT NOT NULL,
  amount           NUMERIC(12,2) NOT NULL,
  category         TEXT NOT NULL CHECK (category IN (
                     'travel', 'meals', 'software', 'office', 'marketing',
                     'hardware', 'training', 'utilities', 'other'
                   )),
  department       TEXT,
  description      TEXT,
  receipt_url      TEXT,
  status           TEXT DEFAULT 'pending' CHECK (status IN (
                     'pending', 'approved', 'rejected', 'auto_approved', 'flagged'
                   )),
  gst_type         TEXT CHECK (gst_type IN ('intrastate', 'interstate')),
  cgst             NUMERIC(10,2) DEFAULT 0,
  sgst             NUMERIC(10,2) DEFAULT 0,
  igst             NUMERIC(10,2) DEFAULT 0,
  ai_decision      TEXT,
  ai_confidence    INTEGER,
  ai_reason        TEXT,
  policy_triggered TEXT,
  expense_date     DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- CARDS
CREATE TABLE IF NOT EXISTS cards (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id            UUID REFERENCES companies(id) ON DELETE CASCADE,
  assigned_to           UUID REFERENCES users(id),
  card_number           TEXT NOT NULL,
  last_four             TEXT NOT NULL,
  cvv                   TEXT NOT NULL,
  expiry_month          INTEGER NOT NULL,
  expiry_year           INTEGER NOT NULL,
  monthly_limit         NUMERIC(12,2) NOT NULL,
  current_spend         NUMERIC(12,2) DEFAULT 0,
  category_restrictions TEXT[] DEFAULT '{}',
  nickname              TEXT,
  status                TEXT DEFAULT 'active' CHECK (status IN ('active', 'frozen', 'cancelled')),
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- POLICIES
CREATE TABLE IF NOT EXISTS policies (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id        UUID REFERENCES companies(id) ON DELETE CASCADE,
  title             TEXT NOT NULL,
  description       TEXT,
  rule_type         TEXT NOT NULL,
  threshold_amount  NUMERIC(12,2),
  category          TEXT,
  is_active         BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- AUDIT LOG
CREATE TABLE IF NOT EXISTS audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id  UUID REFERENCES companies(id),
  user_id     UUID REFERENCES users(id),
  action      TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id   UUID,
  old_value   JSONB,
  new_value   JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 2. INDEXES
-- ============================================================

-- Expenses indexes
CREATE INDEX IF NOT EXISTS idx_expenses_company_id   ON expenses(company_id);
CREATE INDEX IF NOT EXISTS idx_expenses_submitted_by  ON expenses(submitted_by);
CREATE INDEX IF NOT EXISTS idx_expenses_status        ON expenses(status);
CREATE INDEX IF NOT EXISTS idx_expenses_expense_date  ON expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_expenses_category      ON expenses(category);

-- Cards indexes
CREATE INDEX IF NOT EXISTS idx_cards_company_id   ON cards(company_id);
CREATE INDEX IF NOT EXISTS idx_cards_assigned_to   ON cards(assigned_to);
CREATE INDEX IF NOT EXISTS idx_cards_status        ON cards(status);

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_company_id ON users(company_id);
CREATE INDEX IF NOT EXISTS idx_users_email      ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role       ON users(role);

-- Audit log indexes
CREATE INDEX IF NOT EXISTS idx_audit_log_company_id ON audit_log(company_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id    ON audit_log(user_id);


-- ============================================================
-- 3. AUTO-UPDATE updated_at TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_expenses_updated_at ON expenses;
CREATE TRIGGER trg_expenses_updated_at
  BEFORE UPDATE ON expenses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ============================================================
-- 4. DISABLE RLS (our Express middleware handles auth)
-- ============================================================

ALTER TABLE companies  DISABLE ROW LEVEL SECURITY;
ALTER TABLE users      DISABLE ROW LEVEL SECURITY;
ALTER TABLE expenses   DISABLE ROW LEVEL SECURITY;
ALTER TABLE cards      DISABLE ROW LEVEL SECURITY;
ALTER TABLE policies   DISABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log  DISABLE ROW LEVEL SECURITY;


-- ============================================================
-- 5. SEED DATA
-- ============================================================

-- 5a. Company
INSERT INTO companies (id, name, gstin, plan, monthly_budget)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'TechSpire Pvt Ltd',
  '27AAPCS1234A1Z5',
  'pro',
  500000.00
);

-- 5b. Users  (password = "password123" hashed with bcrypt, 10 rounds)
-- Pre-computed hash for "password123" (bcryptjs, 10 rounds):
-- $2a$10$vMGS0GmNCR.zelMYsEq7ke5dIJeZbF2ZyC8pli0Mt6xS/mYzCmat.
-- (In production the server hashes on register; this is seed-only.)

INSERT INTO users (id, company_id, email, password_hash, name, role, department, avatar_color) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'alex@techspire.com',
  '$2a$10$vMGS0GmNCR.zelMYsEq7ke5dIJeZbF2ZyC8pli0Mt6xS/mYzCmat.',
  'Alex Morgan',
  'admin',
  NULL,
  '#6366f1'
),
(
  '22222222-2222-2222-2222-222222222222',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'priya@techspire.com',
  '$2a$10$vMGS0GmNCR.zelMYsEq7ke5dIJeZbF2ZyC8pli0Mt6xS/mYzCmat.',
  'Priya Singh',
  'manager',
  'Engineering',
  '#ec4899'
),
(
  '33333333-3333-3333-3333-333333333333',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'rahul@techspire.com',
  '$2a$10$vMGS0GmNCR.zelMYsEq7ke5dIJeZbF2ZyC8pli0Mt6xS/mYzCmat.',
  'Rahul Verma',
  'employee',
  'Engineering',
  '#f59e0b'
);

-- 5c. Expenses (15 entries — vendors from spec)
INSERT INTO expenses
  (company_id, submitted_by, approved_by, vendor, amount, category, department,
   description, status, gst_type, cgst, sgst, igst,
   ai_decision, ai_confidence, ai_reason, expense_date)
VALUES
-- 1  approved travel — Uber India
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  'Uber India', 4500.00, 'travel', 'Engineering',
  'Cab to client site — Whitefield',
  'approved', 'intrastate', 405.00, 405.00, 0,
  'approve', 96, 'Within cab policy limit',
  '2026-02-01'),

-- 2  auto_approved meals — Swiggy
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '33333333-3333-3333-3333-333333333333',
  NULL,
  'Swiggy', 2200.00, 'meals', 'Engineering',
  'Working lunch — product release',
  'auto_approved', 'intrastate', 198.00, 198.00, 0,
  'approve', 94, 'Under ₹5,000 auto-approve threshold',
  '2026-02-03'),

-- 3  approved utilities — AWS India
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'AWS India', 48000.00, 'utilities', 'Engineering',
  'Feb cloud infrastructure bill',
  'approved', 'interstate', 0, 0, 8640.00,
  'auto_approve', 99, 'Recurring vendor — auto-approved',
  '2026-02-01'),

-- 4  pending travel — MakeMyTrip
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '22222222-2222-2222-2222-222222222222',
  NULL,
  'MakeMyTrip', 18200.00, 'travel', 'Sales',
  'Flight MUM→BLR — client pitch',
  'pending', 'interstate', 0, 0, 3276.00,
  NULL, NULL, NULL,
  '2026-02-05'),

-- 5  approved office — WeWork
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'WeWork India', 45000.00, 'office', 'Operations',
  'Co-working space — monthly pass × 3',
  'approved', 'intrastate', 4050.00, 4050.00, 0,
  'approve', 91, 'Within office budget',
  '2026-02-02'),

-- 6  auto_approved software — Figma
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '22222222-2222-2222-2222-222222222222',
  NULL,
  'Figma', 4200.00, 'software', 'Design',
  'Figma Pro seat — monthly',
  'auto_approved', 'interstate', 0, 0, 756.00,
  'approve', 97, 'Recurring subscription under threshold',
  '2026-02-04'),

-- 7  rejected meals — Zomato
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  'Zomato', 6500.00, 'meals', 'Marketing',
  'Team dinner — no prior approval',
  'rejected', 'intrastate', 585.00, 585.00, 0,
  'reject', 89, 'Meals exceed ₹3,000 per-person limit without approval',
  '2026-02-06'),

-- 8  pending software — Adobe
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '22222222-2222-2222-2222-222222222222',
  NULL,
  'Adobe Creative Cloud', 12800.00, 'software', 'Design',
  'Adobe CC team plan — annual',
  'pending', 'interstate', 0, 0, 2304.00,
  NULL, NULL, NULL,
  '2026-02-09'),

-- 9  approved travel — OYO
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  'OYO Business', 7800.00, 'travel', 'Sales',
  'Hotel stay — Delhi client visit 2 nights',
  'approved', 'intrastate', 702.00, 702.00, 0,
  'approve', 88, 'Within hotel policy limit',
  '2026-02-08'),

-- 10 auto_approved software — Slack
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '11111111-1111-1111-1111-111111111111',
  NULL,
  'Slack Pro', 3200.00, 'software', 'Engineering',
  'Slack channel — monthly billing',
  'auto_approved', 'interstate', 0, 0, 576.00,
  'approve', 95, 'Under ₹5,000 auto-approve threshold',
  '2026-02-10'),

-- 11 approved software — Razorpay
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'Razorpay', 2100.00, 'software', 'Finance',
  'Payment gateway monthly fee',
  'approved', 'intrastate', 189.00, 189.00, 0,
  'auto_approve', 98, 'Recurring payment infra — auto-approved',
  '2026-02-02'),

-- 12 flagged meals — Cafe Coffee Day
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '33333333-3333-3333-3333-333333333333',
  NULL,
  'Cafe Coffee Day', 1850.00, 'meals', 'HR',
  'Client entertainment — interview day',
  'flagged', 'intrastate', 166.50, 166.50, 0,
  'flag', 82, 'Receipt required for expenses above ₹2,000 — please attach',
  '2026-02-11'),

-- 13 approved travel — IndiGo
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'IndiGo Airlines', 11500.00, 'travel', 'Engineering',
  'Flight BLR→HYD for sprint planning',
  'approved', 'interstate', 0, 0, 2070.00,
  'approve', 93, 'Domestic travel within policy',
  '2026-02-13'),

-- 14 pending travel — Hilton
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '22222222-2222-2222-2222-222222222222',
  NULL,
  'Hilton Bangalore', 22000.00, 'travel', 'Sales',
  'Hotel — investor offsite 2 nights',
  'pending', 'intrastate', 1980.00, 1980.00, 0,
  'flag', 76, 'Hotel rate exceeds ₹8,000/night policy limit',
  '2026-02-15'),

-- 15 auto_approved software — Microsoft
( 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '11111111-1111-1111-1111-111111111111',
  NULL,
  'Microsoft 365', 8900.00, 'software', 'Engineering',
  'M365 Business Premium — 10 seats',
  'auto_approved', 'interstate', 0, 0, 1602.00,
  'auto_approve', 96, 'Recognised recurring vendor — auto-approved',
  '2026-02-16');


-- 5d. Cards (6 cards)
INSERT INTO cards
  (company_id, assigned_to, card_number, last_four, cvv,
   expiry_month, expiry_year, monthly_limit, current_spend,
   category_restrictions, nickname, status)
VALUES
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '11111111-1111-1111-1111-111111111111',
  '4291 7823 4510 6634', '6634', '812',
  3, 2029, 200000.00, 45000.00,
  '{}', 'Admin Primary', 'active'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '22222222-2222-2222-2222-222222222222',
  '4291 3345 8821 1190', '1190', '547',
  3, 2029, 100000.00, 23400.00,
  '{}', 'Priya Ops Card', 'active'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '33333333-3333-3333-3333-333333333333',
  '4291 5567 2209 4478', '4478', '391',
  3, 2029, 50000.00, 18700.00,
  '{"travel","meals"}', 'Rahul Travel', 'active'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '33333333-3333-3333-3333-333333333333',
  '4291 9012 6743 3321', '3321', '265',
  3, 2029, 25000.00, 4500.00,
  '{"software","training"}', 'Rahul Learning', 'frozen'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '22222222-2222-2222-2222-222222222222',
  '4291 1188 3344 5566', '5566', '903',
  3, 2029, 75000.00, 0.00,
  '{"marketing"}', 'Marketing Spend', 'active'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '11111111-1111-1111-1111-111111111111',
  '4291 6677 8899 2211', '2211', '174',
  12, 2028, 500000.00, 128000.00,
  '{}', 'Infrastructure', 'active'
);


-- 5e. Policies (5 rules from spec)
INSERT INTO policies
  (company_id, title, description, rule_type, threshold_amount, category, is_active)
VALUES
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Auto-approve small expenses',
  'Expenses under ₹5,000 are automatically approved without manager review.',
  'auto_approve',
  5000.00,
  NULL,
  true
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Meal limit',
  'Flag meal expenses exceeding ₹3,000 per person per day — requires manager approval.',
  'flag',
  3000.00,
  'meals',
  true
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Receipt required',
  'All expenses above ₹2,000 must have a receipt attached before approval.',
  'receipt_required',
  2000.00,
  NULL,
  true
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'No entertainment without approval',
  'Entertainment and alcohol expenses are automatically rejected unless pre-approved by CFO.',
  'reject',
  NULL,
  'other',
  true
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Advance travel booking',
  'Travel bookings made less than 48 hours before departure are flagged for review.',
  'flag',
  NULL,
  'travel',
  true
);


-- ============================================================
-- Done! All tables, indexes, triggers, and seed data created.
-- ============================================================
