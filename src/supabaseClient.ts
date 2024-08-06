import config from './config/config';
import { createClient } from '@supabase/supabase-js'

console.log('NODE_ENV:', config.nodeEnv)
console.log('Supabase URL:', config.supabaseUrl)
console.log('Supabase Anon Key:', config.supabaseAnonKey ? '**hidden**' : 'undefined')
console.log('Supabase Service Role Key:', config.supabaseServiceRoleKey ? '**hidden**' : 'undefined')

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey)
const supabaseAdmin = createClient(config.supabaseUrl, config.supabaseServiceRoleKey)

export { supabase, supabaseAdmin }