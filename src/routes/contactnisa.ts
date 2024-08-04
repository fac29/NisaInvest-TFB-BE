import express from 'express'
import supabase from '../supabaseClient'

const router = express.Router()

// interface ContactRequest {
// 	id: number;
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	socialMedia: string;
//     textField: string;
// 	date: string;
// }

// Create contact request
router.get('/all', async (req, res) => {
	try {
	  const { data, error } = await supabase.from('contact_nisa').select('*');
	  if (error) throw new Error(error.message);
	  res.json(data);
	} catch (error: unknown) {
	  res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
	}
  });


// Create contact request
router.post('/', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('contact_nisa')
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
})

export default router


