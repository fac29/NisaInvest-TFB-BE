import dotenv from 'dotenv';

dotenv.config();

interface Config {
	port: number;
	corsOrigin: string;
	nodeEnv: string;
	supabaseUrl: string;
	supabaseAnonKey: string;
}

const config: Config = {
	port: parseInt(process.env.PORT || '3000', 10),
	corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
	nodeEnv: process.env.NODE_ENV || 'development',
	supabaseUrl: process.env.SUPABASE_URL || '',
	supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
};

export default config;
