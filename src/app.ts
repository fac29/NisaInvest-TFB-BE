import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users'; // Make sure this path is correct
import config from './config/config'; // This is file to extract environment variables, use eg. config.port

const app = express();

// CORS setup
const corsOptions = {
	origin: process.env.CORS_ORIGIN || '*',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); // This line is important for parsing JSON request bodies

// Routes
app.use('/users', userRoutes); // Use the user routes

app.get('/', (req, res) => {
	res.send('Hello, TypeScript Express on Vercel!');
});

if (process.env.NODE_ENV !== 'production') {
	app.listen(config.port, () => {
		console.log(
			`Server running in ${config.port} mode on http://localhost:${config.port}`
		);
	});
}

export default app