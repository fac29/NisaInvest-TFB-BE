import express from 'express'
import { supabase } from '../supabaseClient'

const router = express.Router()

// Get all quotes
router.get('/', async (req, res) => {
	try {
		const { data, error } = await supabase.from('quotes').select('*')
		if (error) throw new Error(error.message)
		res.json(data)
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

// Get random quotes for a specific date

interface Quote {
	id: number
	text: string
	valid_from: string | null
	valid_to: string | null
}

// Auxiliary function to randomize the quotes
function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

router.get('/random', async (req, res) => {
	try {
		const { date, count } = req.query
		const parsedDate = new Date(date as string)
		const parsedCount = parseInt(count as string) || 1

		if (isNaN(parsedDate.getTime())) {
			return res.status(400).json({ error: 'Invalid date format' })
		}

		const { data, error } = await supabase
			.from('quotes')
			.select('*')
			.or(`valid_from.is.null,valid_from.lte.${parsedDate.toISOString()}`)
			.or(`valid_to.is.null,valid_to.gte.${parsedDate.toISOString()}`)

		if (error) throw new Error(error.message)

		// Ensure data is of type Quote[]
		const quotes: Quote[] = data

		// Shuffle the results and select the required number of quotes
		const shuffledData = shuffleArray(quotes).slice(0, parsedCount)

		res.json(shuffledData)
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

// Get quote by id
router.get('/:quoteId', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('quotes')
			.select('*')
			.eq('id', req.params.quoteId)
			.single()
		if (error) throw new Error(error.message)
		if (!data) return res.status(404).json({ error: 'Quote not found' })
		res.json(data)
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

// Create quote
router.post('/', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('quotes')
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

// Update quote
router.put('/:quoteId', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('quotes')
			.update(req.body)
			.eq('id', req.params.quoteId)
			.select()
		if (error) throw new Error(error.message)
		if (data.length === 0)
			return res.status(404).json({ error: 'Quote not found' })
		res.json(data[0])
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

// Delete quote
router.delete('/:quoteId', async (req, res) => {
	try {
		const { error } = await supabase
			.from('quotes')
			.delete()
			.eq('id', req.params.quoteId)
		if (error) throw new Error(error.message)
		res.status(204).send()
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

export default router
