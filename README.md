APOTSA

## The Goal

India has 60M+ SMBs, most still managing expenses over WhatsApp and Excel. APOTSA is being built to be the financial OS for modern Indian businesses — real-time spend visibility, GST-compliant expense tracking, multi-level approval workflows, and virtual corporate cards.

**Revenue model:**  
- ₹399/user/month (Pro plan)  
- 1.5% on credit loaded to platform  
- Future: card interchange (2–2.5%) once real cards launch via RazorpayX

**Target:** 10 pilot customers in Q1 2026 → 300 customers by Q4 2026 → ₹250 Cr TPV

---

## MVP Scope (60-day sprint)

- [x] Landing page (marketing)
- [x] Role-based dashboard UI (Admin / Manager / Employee)
- [x] Backend — Express + Supabase (auth, expenses, cards routes)
- [x] Database schema + seed data (companies, users, expenses, cards, policies, audit_log)
- [ ] Frontend auth — Login page, AuthContext, API layer
- [ ] Expense CRUD wired to backend
- [ ] Cards UI wired to backend
- [ ] Receipt upload (Cloudinary)
- [ ] Approval workflow UI
- [ ] GST auto-calculation display
- [ ] Admin analytics dashboard (live data)
- [ ] Tally integration *(Q2)*
- [ ] Real virtual cards via RazorpayX *(Q3)*
- [ ] AI policy agent — auto-approve/flag *(Q4)*

---

## Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS** — utility-first styling
- **Radix UI** — accessible component primitives (Dialog, Dropdown, Select, Tabs, etc.)
- **Lucide React** — icon system
- **Motion (framer-motion)** — animations
- **Vaul** — drawer component

### Backend
- **Node.js** + **Express 4** (ESM modules)
- **Supabase** (PostgreSQL, free tier — 500MB)
- **JWT** (jsonwebtoken, 7-day expiry)
- **bcryptjs** — password hashing
- **multer** — receipt file handling
- **express-rate-limit** — 100 req / 15 min

### Infrastructure (MVP — ₹0 cost)
- Frontend: Vercel free tier
- Backend: Render / Railway free tier
- Database: Supabase free tier
- File storage: Cloudinary free tier (receipts)
- OCR: Tesseract (open-source) or Google Vision API (1k free/month)

---

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx           # Marketing landing page
│   │   ├── LoginPage.tsx             # Auth UI
│   │   ├── Dashboard.tsx             # Shell + sidebar navigation
│   │   └── dashboard/
│   │       ├── AdminDashboard.tsx    # Admin view — analytics, user mgmt
│   │       ├── ManagerDashboard.tsx  # Manager view — approvals, team spend
│   │       └── EmployeeDashboard.tsx # Employee view — submit, track expenses
│   ├── contexts/
│   │   └── AuthContext.tsx           # Auth state
│   ├── lib/
│   │   └── api.ts                    # Typed API client
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server/
│   ├── index.js                      # Express entry point
│   ├── db/supabase.js                # Supabase client
│   ├── middleware/auth.js            # JWT middleware
│   ├── routes/
│   │   ├── auth.js                   # Register / Login / Me
│   │   ├── expenses.js               # Expense CRUD + stats
│   │   └── cards.js                  # Card management
│   └── package.json
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Local Development

### Prerequisites
- Node.js v18+
- A [Supabase](https://supabase.com) project (free tier is fine)

### Frontend

```bash
npm install
npm run dev
# → http://localhost:5173
```

### Backend

```bash
cd server
npm install
# Create server/.env from server/.env.example and fill in Supabase keys
npm run dev
# → http://localhost:3001
# Test: http://localhost:3001/api/health
```

### Backend `.env` variables

```
PORT=3001
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
JWT_SECRET=your_32_char_secret
CLIENT_URL=http://localhost:5173
```

---

## 12-Month Roadmap

| Quarter | Product | Business Goal |
|---|---|---|
| Q1 2026 | MVP: expense tracking, spend controls, dummy cards, dashboard | 10 pilot customers, validate PMF |
| Q2 2026 | Tally integration, basic reporting, reimbursement tracking | 50 customers, ₹30 Cr TPV, seed raise (₹5 Cr) |
| Q3 2026 | Real virtual cards (RazorpayX), vendor payment module | 150 customers, ₹100 Cr TPV, 5 engineers |
| Q4 2026 | AI policy agent (auto-approve/flag), advanced analytics, partner API | 300 customers, ₹250 Cr TPV, 40% MoM growth |

---

## License

Private and proprietary. All rights reserved.

## Authors

**Daksh Verma** — [@dakshverma-dev](https://github.com/dakshverma-dev)  
**Milind Maula** — [@Milind-Maula](https://github.com/NeuronNexus)
