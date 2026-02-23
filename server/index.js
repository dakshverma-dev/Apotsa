import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import authRouter from './routes/auth.js'
import expensesRouter from './routes/expenses.js'
import cardsRouter from './routes/cards.js'

const app = express()

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))

// Body parser
app.use(express.json())

// Rate limiting — 100 req / 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})
app.use(limiter)

// Routes
app.use('/api/auth', authRouter)
app.use('/api/expenses', expensesRouter)
app.use('/api/cards', cardsRouter)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Root
app.get('/', (_req, res) => {
  res.json({
    name: 'APOTSA API',
    version: '1.0.0',
    status: 'running',
    endpoints: ['/api/health', '/api/auth', '/api/expenses', '/api/cards'],
  })
})

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
