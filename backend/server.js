// Import the required modules
import { config } from 'dotenv'
import express from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
// set environment variables
config()

// Create an express app
const app = express()

app.use(cors())
// Use JSON middleware to parse request body
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Connect to MongoDB database
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err))

// API endpoint routes
import studentRoutes from './routes/students.js'
import courseRoutes from './routes/courses.js'
import registrationRoutes from './routes/registrations.js'
import userRoutes from './routes/user.js'

// using routes as middleware with prefix
app.use('/api/students', studentRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/registrations', registrationRoutes)
app.use('/api/users', userRoutes)

// Invalid requests route
app.use((req, res) => {
  res.status(404).json({ message: 'Invalid request' })
})

// Start the server on port 3000
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`))
