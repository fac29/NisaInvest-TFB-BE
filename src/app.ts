import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users'
import goalRoutes from './routes/goals'
import quoteRoutes from './routes/quotes'
import dotenv from 'dotenv'
dotenv.config()
import config from './config/config'; // This is file to extract environment variables, use eg. config.port


const app = express();

// CORS setup
const corsOptions = {
	origin: process.env.CORS_ORIGIN || '*',
	optionsSuccessStatus: 200,

}

// CORS OPTIONS
// app.use(cors(corsOptions))
app.use(cors())
app.use(express.json())

// Routes
app.use('/users', userRoutes)
app.use('/goals', goalRoutes)
app.use('/quotes', quoteRoutes)

const port = process.env.PORT || 3000

// Check if both result the same. Delete this first option
if (process.env.NODE_ENV !== 'production') {
	app.listen(port, () => {
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
		)
	})
};


if (process.env.NODE_ENV !== 'production') {
	app.listen(config.port, () => {
		console.log(
			`Server running in ${config.port} mode on http://localhost:${config.port}`
		);
	});
}

export default app
