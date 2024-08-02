import express from 'express';
import supabase from '../supabaseClient';

const router = express.Router();

interface ContactRequest {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	socialMedia: string;
    textField: string;
	date: string;
}

// Create contact request
router.post('/contactNisa', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('contactNisa')
			.insert([req.body])
			.select();
		if (error) throw new Error(error.message);
		res.status(201).json(data[0]);
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		});
	}
});

export default router;
