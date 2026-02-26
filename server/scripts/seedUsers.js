/**
 * Seed script — creates 3 demo user accounts for APOTSA.
 *
 * Usage:
 *   node scripts/seedUsers.js
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_KEY in .env
 */

import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌  Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const SALT_ROUNDS = 10

const DEMO_USERS = [
  {
    name: 'Rahul Sharma',
    email: 'admin@nexustech.in',
    password: 'Demo@1234',
    role: 'admin',
    department: 'Finance',
  },
  {
    name: 'Priya Mehta',
    email: 'manager@nexustech.in',
    password: 'Demo@1234',
    role: 'manager',
    department: 'Engineering',
  },
  {
    name: 'Arjun Patel',
    email: 'employee@nexustech.in',
    password: 'Demo@1234',
    role: 'employee',
    department: 'Engineering',
  },
]

async function seed() {
  console.log('🌱  Seeding demo users …\n')

  for (const { password, ...fields } of DEMO_USERS) {
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS)

    const { data, error } = await supabase
      .from('users')
      .upsert(
        { ...fields, password_hash },
        { onConflict: 'email' }            // idempotent — safe to re-run
      )
      .select('id, name, email, role, department')
      .single()

    if (error) {
      console.error(`   ✖  ${fields.email} — ${error.message}`)
    } else {
      console.log(`   ✔  ${data.email}  (${data.role})  id=${data.id}`)
    }
  }

  console.log('\n✅  Seed complete.')
}

seed().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
