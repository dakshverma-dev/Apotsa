import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { auth, setToken, clearToken, getToken, User } from '../lib/api'

// ─── Types ────────────────────────────────────────────────────

interface AuthContextValue {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<User>
  logout: () => void
}

// ─── Helpers ──────────────────────────────────────────────────

/** Decode a JWT payload without a library */
function decodePayload(token: string): Record<string, unknown> | null {
  try {
    const base64 = token.split('.')[1]
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  } catch {
    return null
  }
}

// ─── Context ──────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setTokenState] = useState<string | null>(getToken())
  const [isLoading, setIsLoading] = useState(true)

  // Restore session on mount — fetch /api/auth/me if a token exists
  useEffect(() => {
    const stored = getToken()
    if (!stored) {
      setIsLoading(false)
      return
    }
    // Validate token hasn't expired client-side
    const payload = decodePayload(stored)
    if (payload && typeof payload.exp === 'number' && payload.exp * 1000 < Date.now()) {
      clearToken()
      setTokenState(null)
      setIsLoading(false)
      return
    }

    auth
      .me()
      .then((res) => {
        setUser(res.user)
        setTokenState(stored)
      })
      .catch(() => {
        clearToken()
        setTokenState(null)
      })
      .finally(() => setIsLoading(false))
  }, [])

  // Listen for 401 forced-logout events fired by apiFetch
  useEffect(() => {
    const handle = () => {
      clearToken()
      setTokenState(null)
      setUser(null)
    }
    window.addEventListener('auth:logout', handle)
    return () => window.removeEventListener('auth:logout', handle)
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<User> => {
    const res = await auth.login(email, password)
    setToken(res.token)
    setTokenState(res.token)
    setUser(res.user)
    return res.user
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setTokenState(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
