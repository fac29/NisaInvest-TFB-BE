const isProduction = process.env.NODE_ENV === 'production'

const getEnvVariable = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  supabaseUrl: isProduction 
    ? getEnvVariable('PROD_SUPABASE_URL')
    : getEnvVariable('LOCAL_SUPABASE_URL'),
  supabaseAnonKey: isProduction
    ? getEnvVariable('PROD_SUPABASE_ANON_KEY')
    : getEnvVariable('LOCAL_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: isProduction
    ? getEnvVariable('PROD_SUPABASE_SERVICE_ROLE_KEY')
    : getEnvVariable('LOCAL_SUPABASE_SERVICE_ROLE_KEY')
} as const;

type Config = typeof config;

export default config;