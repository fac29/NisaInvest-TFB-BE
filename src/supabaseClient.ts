import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.NODE_ENV === 'production' 
  ? process.env.PROD_SUPABASE_URL 
  : process.env.LOCAL_SUPABASE_URL

const supabaseKey = process.env.NODE_ENV === 'production'
  ? process.env.PROD_SUPABASE_ANON_KEY
  : process.env.LOCAL_SUPABASE_ANON_KEY

console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseKey ? '[REDACTED]' : 'undefined')

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is missing. Check your environment variables.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase