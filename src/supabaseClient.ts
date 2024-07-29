import { createClient } from '@supabase/supabase-js'
import config from './config/config'

console.log('NODE_ENV:', config.nodeEnv)
console.log('Supabase URL:', config.supabaseUrl)
console.log('Supabase Key:', config.supabaseAnonKey ? '**hidden**' : 'undefined')

if (!config.supabaseUrl || !config.supabaseAnonKey) {
  throw new Error('Supabase URL or Key is missing. Check your environment variables.')
}

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey)

export default supabase