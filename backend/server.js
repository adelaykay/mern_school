// Import the required modules
import express from 'express'
import Course from './models/courses.js'
import Student from './models/students.js'
import { connect } from 'mongoose'
import cors from 'cors'

// Create an express app
const app = express()

// Use JSON middleware to parse request body
app.use(express.json())

app.use(cors())

// Connect to MongoDB database
connect('mongodb://localhost:27017/school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err))

// API endpoint routes
import studentRoutes from './routes/students.js'
import courseRoutes from './routes/courses.js'
import registrationRoutes from './routes/registrations.js'

// using routes as middleware with prefix
app.use('/api/students', studentRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/registrations', registrationRoutes)

// Invalid requests route
app.use((req, res) => {
  res.status(404).json({ message: 'Invalid request' })
})

// Start the server on port 3000
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`))
