import express from 'express'
import supabase from '../supabaseClient'

const router = express.Router()

// Get all reports
router.get('/all', async (req, res) => {
    try {
        const { data, error } = await supabase.from('reports').select('*');
        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error: unknown) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

// Get reports for a specific user
router.get('/user/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const { data, error } = await supabase
            .from('reports')
            .select('*')
            .eq('user_id', userId);
        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error: unknown) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

// Create a new report
router.post('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reports')
            .insert([req.body])
            .select()
        if (error) throw new Error(error.message)
        res.status(201).json(data[0])
    } catch (error: unknown) {
        res.status(500).json({
            error:
                error instanceof Error ? error.message : 'An unknown error occurred',
        })
    }
});

// Update a report
router.put('/:id', async (req, res) => {
    const reportId = parseInt(req.params.id);
    try {
        const { data, error } = await supabase
            .from('reports')
            .update(req.body)
            .eq('id', reportId)
            .select()
        if (error) throw new Error(error.message)
        if (data.length === 0) return res.status(404).json({ error: 'Report not found' })
        res.json(data[0])
    } catch (error: unknown) {
        res.status(500).json({
            error:
                error instanceof Error ? error.message : 'An unknown error occurred',
        })
    }
});

// Delete a report
router.delete('/:id', async (req, res) => {
    const reportId = parseInt(req.params.id);
    try {
        const { error } = await supabase
            .from('reports')
            .delete()
            .eq('id', reportId)
        if (error) throw new Error(error.message)
        res.status(204).send()
    } catch (error: unknown) {
        res.status(500).json({
            error:
                error instanceof Error ? error.message : 'An unknown error occurred',
        })
    }
});

export default router