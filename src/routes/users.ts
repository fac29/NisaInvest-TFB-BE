import express, { Request, Response, NextFunction } from 'express';
//import supabase from '../supabaseClient';
import supabaseAdmin from '../supabaseAdminClient';

const router = express.Router();


// Middleware to use the service role key for protected routes
const serviceRoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  (req as any).supabaseAdmin = supabaseAdmin;
  next();
};

// Get all users
router.get('/all', serviceRoleMiddleware, async (req: Request, res: Response) => {
  try {
    const { data, error } = await (req as any).supabaseAdmin.from('users').select('*');
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Get user by ID
router.get('/id/:id', serviceRoleMiddleware, async (req: Request, res: Response) => {
  try {
    const { data, error } = await (req as any).supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', req.params.id);

    if (error) throw new Error(error.message);
    if (data.length === 0) return res.status(404).json({ error: 'User not found' });
    if (data.length > 1) return res.status(500).json({ error: 'Multiple users found with the same ID' });

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Get user by email
router.get('/email/:email', serviceRoleMiddleware, async (req: Request, res: Response) => {
  try {
    const { data, error } = await (req as any).supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', req.params.email)
      .single();
    if (error) throw new Error(error.message);
    if (!data) return res.status(404).json({ error: 'User not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Create user
router.post('/', serviceRoleMiddleware, async (req: Request, res: Response) => {
  try {
    const { data, error } = await (req as any).supabaseAdmin
      .from('users')
      .insert([req.body])
      .select();
    if (error) throw new Error(error.message);
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Update user
router.put('/:id', serviceRoleMiddleware, async (req: Request, res: Response) => {
  try {
    const { data, error } = await (req as any).supabaseAdmin
      .from('users')
      .update(req.body)
      .eq('id', req.params.id)
      .select();
    if (error) throw new Error(error.message);
    if (data.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Delete user
router.delete('/:id', serviceRoleMiddleware, async (req: Request, res: Response) => {
  try {
    const { error } = await (req as any).supabaseAdmin
      .from('users')
      .delete()
      .eq('id', req.params.id);
    if (error) throw new Error(error.message);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

export default router;