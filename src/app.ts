import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users'
import goalRoutes from './routes/goals'
import quoteRoutes from './routes/quotes'
import quizRoutes from './routes/quiz'
import contact_nisaRoutes from './routes/contactnisa'
import reportRoutes from './routes/reports'
import config from './config/config'
import './types';

const app = express()

// CORS setup
const corsOptions = {
    origin: config.corsOrigin,
    optionsSuccessStatus: 200,
}

// CORS OPTIONS
app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.use('/users', userRoutes)
app.use('/goals', goalRoutes)
app.use('/quotes', quoteRoutes)
app.use('/quiz', quizRoutes)
app.use('/reports', reportRoutes)

app.use('/contactnisa', contact_nisaRoutes)

if (config.nodeEnv !== 'production') {
    const server = app.listen(config.port, () => {
        console.log(
            `Server running in ${config.nodeEnv} mode on http://localhost:${config.port}`
        )
    })

    server.on('error', (e: NodeJS.ErrnoException) => {
        if (e.code === 'EADDRINUSE') {
            console.log('Address in use, retrying...')
            setTimeout(() => {
                server.close()
                server.listen(config.port)
            }, 1000)
        } else {
            console.error('Server error:', e.message)
        }
    })
}

export default app