import express from 'express'
import { supabase } from '../db/supabase.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

// GET /api/expenses  — paginated, filterable
router.get('/', authenticate, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      department,
      search,
      date_from,
      date_to,
    } = req.query

    const from = (Number(page) - 1) * Number(limit)
    const to = from + Number(limit) - 1

    let query = supabase
      .from('expenses')
      .select('*', { count: 'exact' })
      .eq('company_id', req.user.company_id)
      .range(from, to)
      .order('date', { ascending: false })

    if (status) query = query.eq('status', status)
    if (category) query = query.eq('category', category)
    if (department) query = query.eq('department', department)
    if (date_from) query = query.gte('date', date_from)
    if (date_to) query = query.lte('date', date_to)
    if (search) query = query.ilike('vendor', `%${search}%`)

    const { data, error, count } = await query

    if (error) return res.status(500).json({ error: error.message })
    res.json({ data, total: count, page: Number(page), limit: Number(limit) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/expenses/stats
router.get('/stats', authenticate, async (req, res) => {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    const { data: allExpenses, error } = await supabase
      .from('expenses')
      .select('amount, status, category, department, date')
      .eq('company_id', req.user.company_id)

    if (error) return res.status(500).json({ error: error.message })

    const total_this_month = allExpenses
      .filter((e) => e.date >= startOfMonth)
      .reduce((sum, e) => sum + Number(e.amount), 0)

    const pending_count = allExpenses.filter((e) => e.status === 'pending').length
    const approved_count = allExpenses.filter((e) => e.status === 'approved').length
    const violations_count = allExpenses.filter((e) => e.status === 'rejected').length

    const categoryMap = {}
    const deptMap = {}
    for (const e of allExpenses) {
      if (e.category) categoryMap[e.category] = (categoryMap[e.category] || 0) + Number(e.amount)
      if (e.department) deptMap[e.department] = (deptMap[e.department] || 0) + Number(e.amount)
    }

    const top_categories = Object.entries(categoryMap)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)

    const spend_by_department = Object.entries(deptMap)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)

    res.json({
      total_this_month,
      pending_count,
      approved_count,
      violations_count,
      top_categories,
      spend_by_department,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/expenses
router.post('/', authenticate, async (req, res) => {
  try {
    const { vendor, amount, category, department, date, description, gst_type } = req.body

    if (!vendor || !amount || !category || !date) {
      return res.status(400).json({ error: 'vendor, amount, category, and date are required' })
    }

    const numAmount = Number(amount)
    let cgst = 0, sgst = 0, igst = 0

    if (gst_type === 'intrastate') {
      cgst = +(numAmount * 0.09).toFixed(2)
      sgst = +(numAmount * 0.09).toFixed(2)
    } else if (gst_type === 'interstate') {
      igst = +(numAmount * 0.18).toFixed(2)
    }

    const { data, error } = await supabase
      .from('expenses')
      .insert([{
        vendor,
        amount: numAmount,
        category,
        department,
        date,
        description,
        gst_type,
        cgst,
        sgst,
        igst,
        status: 'pending',
        submitted_by: req.user.id,
        company_id: req.user.company_id,
      }])
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })
    res.status(201).json({ data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/expenses/:id/status
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { role } = req.user
    if (role !== 'manager' && role !== 'admin') {
      return res.status(403).json({ error: 'Only managers and admins can update expense status' })
    }

    const { status, comment } = req.body
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'status must be approved or rejected' })
    }

    const { data, error } = await supabase
      .from('expenses')
      .update({ status, comment, reviewed_by: req.user.id, reviewed_at: new Date().toISOString() })
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
