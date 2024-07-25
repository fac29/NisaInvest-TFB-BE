import express from 'express';
import { supabase } from '../supabaseClient';

const router = express.Router();

// Get all goals for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', req.params.userId);
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Get goal by goal_id
router.get('/:goalId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('id', req.params.goalId)
      .single();
    if (error) throw new Error(error.message);
    if (!data) return res.status(404).json({ error: 'Goal not found' });
    res.json(data);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Create goal
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .insert([req.body])
      .select();
    if (error) throw new Error(error.message);
    res.status(201).json(data[0]);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Update goal
router.put('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('goals')
      .update(req.body)
      .eq('id', req.params.id)
      .select();
    if (error) throw new Error(error.message);
    if (data.length === 0) return res.status(404).json({ error: 'Goal not found' });
    res.json(data[0]);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Delete goal
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', req.params.id);
    if (error) throw new Error(error.message);
    res.status(204).send();
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

export default router;