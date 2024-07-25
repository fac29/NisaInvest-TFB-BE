import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users'
import goalRoutes from './routes/goals'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// CORS setup
const corsOptions = {
	origin: process.env.CORS_ORIGIN || '*',
	optionsSuccessStatus: 200,
}

// CORSOPTIONS XXXXXXXXXXXXXXXXXXXXXXXXXXX
// app.use(cors(corsOptions))
app.use(cors())
app.use(express.json())

// Routes
app.use('/users', userRoutes)
app.use('/goals', goalRoutes)

const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
	app.listen(port, () => {
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
		)
	})
}

export default app
