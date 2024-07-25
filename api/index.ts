import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
console.log('Current environment:', process.env.NODE_ENV);

export default function (req: VercelRequest, res: VercelResponse) {
  app(req, res);
}