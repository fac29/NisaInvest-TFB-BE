import express from 'express'
import { supabase } from '../supabaseClient'

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const { data, error } = await supabase.from('users').select('*')

		if (error) throw error

		res.json(data)
	} catch (error) {
		res.status(500).json({ error: (error as Error).message })
	}
})

export default router
