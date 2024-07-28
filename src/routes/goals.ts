import express from 'express';
import { supabase } from '../supabaseClient';

const router = express.Router();

// Get all goals for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user_goals')
      .select(`
        id,
        user_id,
        goal_id,
        assigned_at,
        due_date,
        status,
        completed_at,
        goals (*)
      `)
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

// Create goal and assign to user
router.post('/', async (req, res) => {
  const { user_id, due_date, status, ...goalData } = req.body;
  
  try {
    // Start a transaction
    const { data: newGoal, error: goalError } = await supabase
      .from('goals')
      .insert([goalData])
      .select()
      .single();

    if (goalError) throw new Error(goalError.message);

    const { data: userGoal, error: userGoalError } = await supabase
      .from('user_goals')
      .insert([{
        user_id: user_id,
        goal_id: newGoal.id,
        due_date: due_date,
        status: status || 'not_done'
      }])
      .select()
      .single();

    if (userGoalError) throw new Error(userGoalError.message);

    res.status(201).json({ ...newGoal, user_goal: userGoal });
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Update goal (in goals table only)
router.put('/:id', async (req, res) => {
  try {
    const { data: updatedGoal, error } = await supabase
      .from('goals')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!updatedGoal) return res.status(404).json({ error: 'Goal not found' });

    res.json(updatedGoal);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Update user-specific goal information (in user_goals table)
router.put('/user-goal/:userId/:goalId', async (req, res) => {
  try {
    const { data: updatedUserGoal, error } = await supabase
      .from('user_goals')
      .update(req.body)
      .eq('user_id', req.params.userId)
      .eq('goal_id', req.params.goalId)
      .select(`
        id,
        user_id,
        goal_id,
        assigned_at,
        due_date,
        status,
        completed_at,
        goals (*)
      `)
      .single();

    if (error) throw new Error(error.message);
    if (!updatedUserGoal) return res.status(404).json({ error: 'User goal not found' });

    res.json(updatedUserGoal);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Delete goal and its user assignments
router.delete('/:id', async (req, res) => {
  try {
    // Delete user_goals entries first
    const { error: userGoalsError } = await supabase
      .from('user_goals')
      .delete()
      .eq('goal_id', req.params.id);
    
    if (userGoalsError) throw new Error(userGoalsError.message);

    // Then delete the goal
    const { error: goalError } = await supabase
      .from('goals')
      .delete()
      .eq('id', req.params.id);
    
    if (goalError) throw new Error(goalError.message);

    res.status(204).send();
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

export default router;