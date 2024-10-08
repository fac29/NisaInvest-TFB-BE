import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  corsOrigin: string;
  nodeEnv: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey: string;
}

const isProd = process.env.NODE_ENV === 'production';

console.log('Environment:', process.env.NODE_ENV);
console.log('Is Production:', isProd);

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  nodeEnv: process.env.NODE_ENV || 'development',
  supabaseUrl: isProd ? process.env.PROD_SUPABASE_URL! : process.env.LOCAL_SUPABASE_URL!,
  supabaseAnonKey: isProd ? process.env.PROD_SUPABASE_ANON_KEY! : process.env.LOCAL_SUPABASE_ANON_KEY!,
  supabaseServiceRoleKey: isProd ? process.env.PROD_SUPABASE_SERVICE_ROLE_KEY! : process.env.LOCAL_SUPABASE_SERVICE_ROLE_KEY!,
};

console.log('Config:', {
  ...config,
  supabaseAnonKey: config.supabaseAnonKey ? '[REDACTED]' : 'undefined',
  supabaseServiceRoleKey: config.supabaseServiceRoleKey ? '[REDACTED]' : 'undefined'
});

export default config;