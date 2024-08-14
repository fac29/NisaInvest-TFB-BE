import express from 'express';
import supabase  from '../supabaseClient';

const router = express.Router();

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

// Focus a goal manually by the user
router.put('/user-goal/focus/:userId/:goalId', async (req, res) => {
  try {
    const { data: updatedUserGoal, error } = await supabase
      .from('user_goals')
      .update({
        status: 'focused',
        focus_origin: 'user'
      })
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
        focus_origin,
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

// Update status for multiple user goals. Used by the quiz
router.post('/update-quiz-selected', async (req, res) => {
  const { userId, goalIds } = req.body;

    if (!userId || !goalIds || !Array.isArray(goalIds) || goalIds.length === 0) {
        return res.status(400).json({ error: 'Invalid or missing userId or goalIds in request body' });
    }

    try {
        // Start a Supabase transaction
        const { data: existingUserGoals, error: fetchError } = await supabase
            .from('user_goals')
            .select('goal_id')
            .eq('user_id', userId)
            .in('goal_id', goalIds);

        if (fetchError) throw new Error(fetchError.message);

        const existingGoalIds = new Set(existingUserGoals.map(ug => ug.goal_id));
        const goalsToCreate = goalIds.filter(id => !existingGoalIds.has(id));

        // Create new user_goals entries for non-existing combinations
        if (goalsToCreate.length > 0) {
            const newUserGoals = goalsToCreate.map(goalId => ({
                user_id: userId,
                goal_id: goalId,
                status: 'focused',
                focus_origin: 'quiz'
            }));

            const { error: insertError } = await supabase
                .from('user_goals')
                .insert(newUserGoals);

            if (insertError) throw new Error(insertError.message);
        }

        // Update existing user_goals entries
        const { data: updatedGoals, error: updateError } = await supabase
            .from('user_goals')
            .update({ status: 'focused' , focus_origin: 'quiz'})
            .eq('user_id', userId)
            .in('goal_id', goalIds)
            .select();

        if (updateError) throw new Error(updateError.message);

        res.json({
            message: 'User goals updated or created successfully',
            updatedGoals,
            newGoalsCreated: goalsToCreate.length
        });
    } catch (error: unknown) {
        res.status(500).json({
            error:
                error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});

// Get all goals sorted by status: completed > focused > not_done
router.get('/user/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId provided' });
  }

  try {
    // 1. Fetch user_goals with status 'completed'
    const { data: completedUserGoals, error: completedUserGoalsError } = await supabase
      .from('user_goals')
      .select(`
        goal_id,
        status,
        goals (*)
      `)
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('sort_order', { referencedTable: 'goals' });

    if (completedUserGoalsError) throw new Error(completedUserGoalsError.message);

    // 2. Fetch user_goals with status 'focused'
    const { data: focusedUserGoals, error: focusedUserGoalsError } = await supabase
      .from('user_goals')
      .select(`
        goal_id,
        status,
        goals (*)
      `)
      .eq('user_id', userId)
      .eq('status', 'focused')
      .order('sort_order', { referencedTable: 'goals' });

    if (focusedUserGoalsError) throw new Error(focusedUserGoalsError.message);

    // 3. Fetch user_goals with status 'not_done'
    const { data: notDoneUserGoals, error: notDoneUserGoalsError } = await supabase
      .from('user_goals')
      .select(`
        goal_id,
        status,
        goals (*)
      `)
      .eq('user_id', userId)
      .eq('status', 'not_done')
      .order('sort_order', { referencedTable: 'goals' });

    if (notDoneUserGoalsError) throw new Error(notDoneUserGoalsError.message);

    // 4. Fetch all goals
    const { data: allGoals, error: allGoalsError } = await supabase
      .from('goals')
      .select('*')
      .order('sort_order');

    if (allGoalsError) throw new Error(allGoalsError.message);

    // Create a set of goal IDs that are in user_goals
    const userGoalIds = new Set([
      ...completedUserGoals.map(ug => ug.goal_id),
      ...focusedUserGoals.map(ug => ug.goal_id),
      ...notDoneUserGoals.map(ug => ug.goal_id)
    ]);

    // Combine the results in the specified order
    const combinedGoals = [
      ...completedUserGoals.map(ug => ({ ...ug.goals, status: 'completed' })),
      ...focusedUserGoals.map(ug => ({ ...ug.goals, status: 'focused' })),
      ...notDoneUserGoals.map(ug => ({ ...ug.goals, status: 'not_done' })),
      ...allGoals.filter(goal => !userGoalIds.has(goal.id)).map(goal => ({ ...goal, status: null }))
    ];

    // Group goals by category
    const goalsByCategory = combinedGoals.reduce((acc, goal) => {
      if (!acc[goal.category]) {
        acc[goal.category] = [];
      }
      acc[goal.category].push(goal);
      return acc;
    }, {});

    // Create the final structure
    const categorizedGoals = Object.entries(goalsByCategory).map(([category, goals]) => ({
      category,
      goals
    }));

    res.json({
      message: 'Goals fetched successfully',
      categorizedGoals
    });

  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
});

// Focus a goal manually by the user
router.put('/user-goal/focus/:userId/:goalId', async (req, res) => {
  try {
    // Check if the user_goal exists
    const { data: existingUserGoal, error: checkError } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', req.params.userId)
      .eq('goal_id', req.params.goalId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw new Error(checkError.message);
    }

    let updatedUserGoal;

    if (existingUserGoal) {
      // Update existing user_goal
      const { data, error } = await supabase
        .from('user_goals')
        .update({
          status: 'focused',
          focus_origin: 'user'
        })
        .eq('id', existingUserGoal.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      updatedUserGoal = data;
    } else {
      // Create new user_goal
      const { data, error } = await supabase
        .from('user_goals')
        .insert({
          user_id: req.params.userId,
          goal_id: req.params.goalId,
          status: 'focused',
          focus_origin: 'user'
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      updatedUserGoal = data;
    }

    if (!updatedUserGoal) return res.status(404).json({ error: 'User goal not found or could not be created' });

    res.json(updatedUserGoal);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

// Complete a goal manually by the user
router.put('/user-goal/complete/:userId/:goalId', async (req, res) => {
  try {
    const currentTime = new Date().toISOString().replace('T', ' ').substr(0, 19) + '+00';

    // Check if the user_goal exists
    const { data: existingUserGoal, error: checkError } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', req.params.userId)
      .eq('goal_id', req.params.goalId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw new Error(checkError.message);
    }

    let updatedUserGoal;

    if (existingUserGoal) {
      // Update existing user_goal
      const { data, error } = await supabase
        .from('user_goals')
        .update({
          status: 'completed',
          completed_at: currentTime
        })
        .eq('id', existingUserGoal.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      updatedUserGoal = data;
    } else {
      // Create new user_goal
      const { data, error } = await supabase
        .from('user_goals')
        .insert({
          user_id: req.params.userId,
          goal_id: req.params.goalId,
          status: 'completed',
          completed_at: currentTime
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      updatedUserGoal = data;
    }

    if (!updatedUserGoal) return res.status(404).json({ error: 'User goal not found or could not be created' });

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

// Update status for multiple user goals. Used by the quiz
router.post('/update-quiz-selected', async (req, res) => {
  const { userId, goalIds } = req.body;
    if (!userId || !goalIds || !Array.isArray(goalIds) || goalIds.length === 0) {
        return res.status(400).json({ error: 'Invalid or missing userId or goalIds in request body' });
    }
    try {
        // Start a Supabase transaction
        const { data: existingUserGoals, error: fetchError } = await supabase
            .from('user_goals')
            .select('goal_id')
            .eq('user_id', userId)
            .in('goal_id', goalIds);
        if (fetchError) throw new Error(fetchError.message);
        const existingGoalIds = new Set(existingUserGoals.map(ug => ug.goal_id));
        const goalsToCreate = goalIds.filter(id => !existingGoalIds.has(id));
        // Create new user_goals entries for non-existing combinations
        if (goalsToCreate.length > 0) {
            const newUserGoals = goalsToCreate.map(goalId => ({
                user_id: userId,
                goal_id: goalId,
                status: 'focused',
                focus_origin: 'quiz'
            }));
            const { error: insertError } = await supabase
                .from('user_goals')
                .insert(newUserGoals);
            if (insertError) throw new Error(insertError.message);
        }
        // Update existing user_goals entries
        const { data: updatedGoals, error: updateError } = await supabase
            .from('user_goals')
            .update({ status: 'focused' , focus_origin: 'quiz'})
            .eq('user_id', userId)
            .in('goal_id', goalIds)
            .select();
        if (updateError) throw new Error(updateError.message);
        res.json({
            message: 'User goals updated or created successfully',
            updatedGoals,
            newGoalsCreated: goalsToCreate.length
        });
    } catch (error: unknown) {
        res.status(500).json({
            error:
                error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
});



export default router;