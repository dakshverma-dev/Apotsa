// ============================================================
// APOTSA — API Layer
// Token persisted in localStorage for session continuity
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const TOKEN_KEY = 'apotsa_token'

export const setToken = (t: string) => { localStorage.setItem(TOKEN_KEY, t) }
export const clearToken = () => { localStorage.removeItem(TOKEN_KEY) }
export const getToken = () => localStorage.getItem(TOKEN_KEY)

// ─── Types ───────────────────────────────────────────────────

export interface User {
  id: string
  company_id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'employee'
  department: string | null
  avatar_color: string
  created_at: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface RegisterData {
  email: string
  password: string
  name: string
  company_name?: string
  role?: string
}

export interface Expense {
  id: string
  company_id: string
  submitted_by: string
  approved_by: string | null
  vendor: string
  amount: number
  category: string
  department: string | null
  description: string | null
  receipt_url: string | null
  status: 'pending' | 'approved' | 'rejected' | 'auto_approved' | 'flagged'
  gst_type: 'intrastate' | 'interstate' | null
  cgst: number
  sgst: number
  igst: number
  ai_decision: string | null
  ai_confidence: number | null
  ai_reason: string | null
  policy_triggered: string | null
  expense_date: string
  created_at: string
  updated_at: string
}

export interface ExpenseListParams {
  page?: number
  limit?: number
  status?: string
  category?: string
  department?: string
  search?: string
  date_from?: string
  date_to?: string
}

export interface ExpenseListResponse {
  data: Expense[]
  total: number
  page: number
  limit: number
}

export interface CreateExpenseData {
  vendor: string
  amount: number
  category: string
  department?: string
  date: string
  description?: string
  gst_type?: 'intrastate' | 'interstate'
}

export interface ExpenseStats {
  total_this_month: number
  pending_count: number
  approved_count: number
  violations_count: number
  top_categories: { name: string; total: number }[]
  spend_by_department: { name: string; total: number }[]
}

export interface Card {
  id: string
  company_id: string
  assigned_to: string | null
  card_number: string
  last_four: string
  cvv: string
  expiry_month: number
  expiry_year: number
  monthly_limit: number
  current_spend: number
  category_restrictions: string[]
  nickname: string | null
  status: 'active' | 'frozen' | 'cancelled'
  created_at: string
}

export interface CreateCardData {
  employee_id: string
  monthly_limit: number
  category_restrictions?: string[]
  nickname?: string
}

// ─── Core fetch ──────────────────────────────────────────────

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (getToken()) {
    headers['Authorization'] = `Bearer ${getToken()}`
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (res.status === 401) {
    window.dispatchEvent(new CustomEvent('auth:logout'))
    throw new Error('Session expired. Please log in again.')
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const body = await res.json()
      message = body.error || body.message || message
    } catch {
      // ignore parse errors
    }
    throw new Error(message)
  }

  return res.json() as Promise<T>
}

// ─── Auth ─────────────────────────────────────────────────────

export const auth = {
  login: (email: string, password: string) =>
    apiFetch<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data: RegisterData) =>
    apiFetch<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  me: () =>
    apiFetch<{ user: User }>('/api/auth/me'),
}

// ─── Expenses ─────────────────────────────────────────────────

export const expenses = {
  list: (params: ExpenseListParams = {}) => {
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '' && v !== null) qs.set(k, String(v))
    })
    const query = qs.toString()
    return apiFetch<ExpenseListResponse>(`/api/expenses${query ? `?${query}` : ''}`)
  },

  create: (data: CreateExpenseData) =>
    apiFetch<{ data: Expense }>('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStatus: (id: string, status: 'approved' | 'rejected', comment?: string) =>
    apiFetch<{ data: Expense }>(`/api/expenses/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, comment }),
    }),

  stats: () =>
    apiFetch<ExpenseStats>('/api/expenses/stats'),
}

// ─── Cards ────────────────────────────────────────────────────

export const cards = {
  list: () =>
    apiFetch<{ data: Card[] }>('/api/cards'),

  create: (data: CreateCardData) =>
    apiFetch<{ data: Card }>('/api/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  freeze: (id: string) =>
    apiFetch<{ data: Card }>(`/api/cards/${id}/freeze`, {
      method: 'PATCH',
    }),

  updateLimit: (id: string, monthly_limit: number) =>
    apiFetch<{ data: Card }>(`/api/cards/${id}/limit`, {
      method: 'PATCH',
      body: JSON.stringify({ monthly_limit }),
    }),
}
