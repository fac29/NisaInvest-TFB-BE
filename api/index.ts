import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';
import config from '../src/config/config';

console.log('Current environment:', config.nodeEnv);

export default function (req: VercelRequest, res: VercelResponse) {
  app(req, res);
}