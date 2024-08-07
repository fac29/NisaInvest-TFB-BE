import { Request, Response, NextFunction } from 'express';
import  supabase  from './supabaseClient';
import './types';  // Import the types file

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;

    req.user = data.user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};