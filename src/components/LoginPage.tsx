import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

type Role = 'admin' | 'manager' | 'employee'

const DEMO_ACCOUNTS = [
  { label: 'Admin',    email: 'admin@nexustech.in',    password: 'Demo@1234', role: 'admin'    as Role, color: '#6366f1', initials: 'RS' },
  { label: 'Manager',  email: 'manager@nexustech.in',  password: 'Demo@1234', role: 'manager'  as Role, color: '#ec4899', initials: 'PM' },
  { label: 'Employee', email: 'employee@nexustech.in', password: 'Demo@1234', role: 'employee' as Role, color: '#f59e0b', initials: 'AP' },
]

function redirectForRole(role: Role): string {
  switch (role) {
    case 'admin':    return '/admin/dashboard'
    case 'manager':  return '/manager/dashboard'
    case 'employee': return '/employee/dashboard'
  }
}

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingDemo, setLoadingDemo] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const user = await login(email, password)
      navigate(redirectForRole(user.role), { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemo = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setError('')
    setLoadingDemo(account.email)
    try {
      const user = await login(account.email, account.password)
      navigate(redirectForRole(user.role), { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Demo login failed')
    } finally {
      setLoadingDemo(null)
    }
  }

  return (
    <div className="min-h-screen flex font-sans">
      {/* ── Left panel ─────────────────────────────────── */}
      <div className="hidden md:flex md:w-[45%] bg-[#0f172a] flex-col justify-between p-12">
        {/* Logo */}
        <div>
          <span className="text-4xl font-black tracking-tighter text-lime-400">apotsa</span>
          <p className="mt-4 text-slate-400 text-lg leading-relaxed">
            The financial OS for modern Indian businesses
          </p>

          {/* Bullets */}
          <ul className="mt-10 space-y-5">
            {[
              'Real-time spend visibility across all departments',
              'Auto GST compliance — CGST, SGST, IGST calculated instantly',
              'AI-powered policy enforcement — 24/7',
            ].map((text) => (
              <li key={text} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-lime-400 mt-0.5 shrink-0" />
                <span className="text-slate-300 text-sm leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <p className="text-slate-200 text-sm leading-relaxed italic">
            "We saved 18 hours a month on expense reconciliation."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center text-slate-900 font-bold text-xs">
              AM
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Arjun Mehta</p>
              <p className="text-slate-400 text-xs">CFO at Growfin</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="md:hidden mb-8 text-center">
            <span className="text-3xl font-black tracking-tighter text-slate-900">apotsa</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-1 text-slate-500 text-sm">Sign in to your account</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-lime-400 hover:text-slate-900 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-slate-400 text-xs">or continue with demo</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Demo accounts */}
          <div className="space-y-3">
            {DEMO_ACCOUNTS.map((account) => {
              const busy = loadingDemo === account.email
              return (
                <button
                  key={account.email}
                  onClick={() => handleDemo(account)}
                  disabled={!!loadingDemo}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl border border-slate-200 hover:border-lime-400 hover:bg-lime-50/50 transition-all duration-200 text-left disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                    style={{ backgroundColor: account.color }}
                  >
                    {busy ? <Loader2 size={14} className="animate-spin" /> : account.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900">{account.label}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 capitalize">
                        {account.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{account.email}</p>
                  </div>
                  <span className="text-xs text-slate-300 group-hover:text-lime-500 transition shrink-0">
                    {busy ? 'Loading…' : '→'}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Demo accounts use password:{' '}
            <span className="font-mono text-slate-600">Demo@1234</span>
          </p>
        </div>
      </div>
    </div>
  )
}
