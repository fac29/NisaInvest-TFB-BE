//import { Config } from './config/config';
import Config from "./config/config"
import config from "./config/config"
import { createClient } from '@supabase/supabase-js'

// Explicitly type the config
const typedConfig: typeof Config = config;

console.log('NODE_ENV:', typedConfig.nodeEnv)
console.log('Supabase URL:', typedConfig.supabaseUrl)
console.log('Supabase Anon Key:', typedConfig.supabaseAnonKey ? '**hidden**' : 'undefined')
//console.log('Supabase Service Role Key:', typedConfig.supabaseServiceRoleKey ? '**hidden**' : 'undefined')

const supabase = createClient(typedConfig.supabaseUrl, typedConfig.supabaseAnonKey)
//const supabaseAdmin = createClient(typedConfig.supabaseUrl, typedConfig.supabaseServiceRoleKey)

//export { supabase, supabaseAdmin }
export {supabase}