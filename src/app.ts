import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users'  // Make sure this path is correct
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// CORS setup
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())  // This line is important for parsing JSON request bodies

// Routes
app.use('/users', userRoutes)  // Use the user routes

app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express on Vercel!')
})

const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(
            `Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
        )
    })
}

export default app