import express from 'express'
import { supabase } from '../db/supabase.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

const randDigits = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')

const generateCardNumber = () =>
  `4291 ${randDigits(4)} ${randDigits(4)} ${randDigits(4)}`

const generateCVV = () => randDigits(3)

const expiryDate = () => {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 3)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(-2)
  return `${mm}/${yy}`
}

// GET /api/cards
router.get('/', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('company_id', req.user.company_id)
      .order('created_at', { ascending: false })

    if (error) return res.status(500).json({ error: error.message })
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/cards
router.post('/', authenticate, async (req, res) => {
  try {
    const { employee_id, monthly_limit, category_restrictions, nickname } = req.body

    const { data, error } = await supabase
      .from('cards')
      .insert([{
        employee_id,
        monthly_limit: Number(monthly_limit),
        category_restrictions: category_restrictions || [],
        nickname,
        card_number: generateCardNumber(),
        cvv: generateCVV(),
        expiry: expiryDate(),
        status: 'active',
        company_id: req.user.company_id,
        created_by: req.user.id,
      }])
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })
    res.status(201).json({ data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/cards/:id/freeze
router.patch('/:id/freeze', authenticate, async (req, res) => {
  try {
    const { data: card, error: fetchError } = await supabase
      .from('cards')
      .select('status')
      .eq('id', req.params.id)
      .eq('company_id', req.user.company_id)
      .single()

    if (fetchError || !card) return res.status(404).json({ error: 'Card not found' })

    const newStatus = card.status === 'active' ? 'frozen' : 'active'

    const { data, error } = await supabase
      .from('cards')
      .update({ status: newStatus })
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/cards/:id/limit
router.patch('/:id/limit', authenticate, async (req, res) => {
  try {
    const { monthly_limit } = req.body
    if (monthly_limit === undefined) {
      return res.status(400).json({ error: 'monthly_limit is required' })
    }

    const { data, error } = await supabase
      .from('cards')
      .update({ monthly_limit: Number(monthly_limit) })
      .eq('id', req.params.id)
      .eq('company_id', req.user.company_id)
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
