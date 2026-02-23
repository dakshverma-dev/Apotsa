import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabase } from '../db/supabase.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role, company_id: user.company_id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, company_name, role } = req.body
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'email, password and name are required' })
    }

    const password_hash = await bcrypt.hash(password, 10)

    const { data: user, error } = await supabase
      .from('users')
      .insert([{ email, password_hash, name, company_name, role: role || 'employee' }])
      .select('id, email, name, company_name, role, company_id, created_at')
      .single()

    if (error) {
      if (error.code === '23505') return res.status(409).json({ error: 'Email already registered' })
      return res.status(500).json({ error: error.message })
    }

    const token = signToken(user)
    res.status(201).json({ token, user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' })
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const { password_hash, ...safeUser } = user
    const token = signToken(safeUser)
    res.json({ token, user: safeUser })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, company_name, role, company_id, created_at')
      .eq('id', req.user.id)
      .single()

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
