import { createClient } from '@supabase/supabase-js';
import config from './config/config';

const supabaseAdmin = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);

export default supabaseAdmin;
