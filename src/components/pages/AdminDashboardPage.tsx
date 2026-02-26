import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { LogOut, Shield } from 'lucide-react'

export function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6">
          <Shield size={32} className="text-indigo-600" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          {user?.name ?? 'Admin'}
        </h1>
        <span className="mt-2 inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Admin
        </span>
        <p className="mt-3 text-slate-500 text-sm">
          {user?.department ?? '—'} · {user?.email}
        </p>

        <button
          onClick={handleLogout}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  )
}
