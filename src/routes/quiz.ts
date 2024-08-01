import express from 'express'
import supabase from '../supabaseClient'

const router = express.Router()

// Questions Endpoints
router.get('/questions', async (req, res) => {
	try {
		const { data, error } = await supabase.from('questions').select('*')
		if (error) throw new Error(error.message)
		res.json(data)
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

// Get question by ID
router.get('/questions/:questionId', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('questions')
			.select('*')
			.eq('id', req.params.questionId)
			.single()
		if (error) throw new Error(error.message)
		if (!data) return res.status(404).json({ error: 'Question not found' })
		res.json(data)
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

// Create question
router.post('/questions', async (req, res) => {
	const { id,...questionData } = req.body

	try {
		// Start a transaction
		const { data: newQuestion, error: questionError } = await supabase
			.from('questions')
			.insert([questionData])
			.select()
			.single()

		if (questionError) throw new Error(questionError.message)

		res.status(201).json(newQuestion)
	} catch (error: unknown) {
		res
			.status(500)
			.json({
				error:
					error instanceof Error ? error.message : 'An unknown error occurred',
			})
	}
})

// Edit question
router.put('/questions/:questionId', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('questions')
			.update(req.body)
			.eq('id', req.params.questionId)
			.select()
		if (error) throw new Error(error.message)
		if (data.length === 0)
			return res.status(404).json({ error: 'Question not found' })
		res.json(data[0])
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

// Delete question
router.delete('/questions/:questionId', async (req, res) => {
	try {
		const { error } = await supabase
			.from('questions')
			.delete()
			.eq('id', req.params.questionId)
		if (error) throw new Error(error.message)
		res.status(204).send()
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

// Answers Endpoints
// Get all answers
router.get('/answers', async (req, res) => {
	try {
		const { data, error } = await supabase.from('answers').select('*')
		if (error) throw new Error(error.message)
		res.json(data)
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

// Get answer by ID
router.get('/answers/:answerId', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('answers')
			.select('*')
			.eq('id', req.params.answerId)
			.single()
		if (error) throw new Error(error.message)
		if (!data) return res.status(404).json({ error: 'Answer not found' })
		res.json(data)
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

// Create Answer
router.post('/answers', async (req, res) => {
    const { id, ...answerData } = req.body

    try {
        // Start a transaction
        const { data: newAnswer, error: answerError } = await supabase
            .from('answers')
            .insert([answerData])
            .select()
            .single()

        if (answerError) throw new Error(answerError.message)

        res.status(201).json(newAnswer)
    } catch (error: unknown) {
        res.status(500).json({
            error:
                error instanceof Error ? error.message : 'An unknown error occurred',
        })
    }
})

// Edit answer
router.put('/answers/:answerId', async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('answers')
			.update(req.body)
			.eq('id', req.params.answerId)
			.select()
		if (error) throw new Error(error.message)
		if (data.length === 0)
			return res.status(404).json({ error: 'Answer not found' })
		res.json(data[0])
	} catch (error: unknown) {
		res.status(500).json({
			error:
				error instanceof Error ? error.message : 'An unknown error occurred',
		})
	}
})

//Delete Answer
router.delete('/answers/:answerId', async (req, res) => {
	try {
		const { error } = await supabase
			.from('answers')
			.delete()
			.eq('id', req.params.answerId)
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
