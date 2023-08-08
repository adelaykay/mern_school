// Import Express and Mongoose modules
import express from 'express'
import { Types } from 'mongoose'

// Import the course model
import Course from '../models/courses.js'

// Create a router object
const router = express.Router()

// Define a route for getting a single or a list of courses
router.get('/', async (req, res) => {
  try {
    // Get the query parameters from the request
    const { id, course_name } = req.query

    // Declare a variable to store the query object
    let query

    // Check if id parameter is provided
    if (id) {
      // Validate the id parameter as a valid MongoDB ObjectId
      if (!Types.ObjectId.isValid(id)) {
        // Return an error response with status code 400 (Bad Request)
        return res.status(400).json({ message: 'Invalid id' })
      }

      // Set the query object to find  a course by id
      query = Course.findById(id)
    } else {
      // Set the query object to find all students or by first_name or surname if provided
      query = Course.find({
        ...(course_name && { course_name }), // spread operator to conditionally add properties to the query object
      })
    }

    // Execute the query and store the result in a variable
    const courses = await query.exec()

    // Check if the result is empty
    if (!courses || courses.lenth === 0) {
      // Return an error response with status code 404 (Not found)
      return res.status(404).json({ message: 'No courses found' })
    }

    // Return a success response with status code 200 (ok) and the result as data
    res.status(200).json({ data: courses })
  } catch (err) {
    // Handle any possible errors and return an erro response with status code 500 (Internal Server Error) and the error message
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

// Define a route for adding a new course
router.post('/', async (req, res) => {
  try {
    // Get the request body from the request
    const {
      course_name,
      description
    } = req.body

    // Validate the required properties are provided
    if (!course_name || !description ) {
      // Return an error response with status code 400 (Bad Request)
      return res.status(400).json({ message: 'Missing required properties' })
    }

    // Create empty students array
    const students = []

    // Create a new course object using the request body
    const newCourse = new Course({
      course_name,
      description,
      students
    })

    // Save the new course object to the database and store the result in a variable
    const course = await newCourse.save()

    // Return a success response with status code 201 (Created) and the result as data
    res.status(201).json({ data: course })

  } catch (err) {
    // Handling any possible errors and return an error response with status code 500 (Internal Server Error) and the error message
    console.log(err)
    res.status(500).json({message: err.message})
  }
})

// Define a route for modifying an existing course by id
router.put('/', async (req, res) => {
  try {
    // Get the update from the request body
    const update = req.body

    const id = req.query.id
    // Validate the id parameter as a valid MongoDB ObjectId
    if(!Types.ObjectId.isValid(id)){
      // Return an error response with status code 400 (Bad Request)
      return res.status(400).json({message: 'Invalid id'})
    }

    // Set the query to find and update a course by id
    query = await Course.findByIdAndUpdate(id, update, {new: true})

    const updatedCourse = await query.exec()

    // Check if the result is empty
    if (!updatedCourse || updatedCourse.length === 0) {
      // Return an error response with status code 404 (Not Found)
      return res.status(404).json({ message: 'No student found' })
    }

    // Return a success response with status code 200 (OK) and the result as data
    res.status(200).json({ data: updatedCourse })

  } catch (err) {
    // Handling any possible errors and return an error response with status code 500 (Internal Server Error) and the error message
    console.log(err)
    res.status(500).json({message: err.message})
  }
})

// Define a route for deleting an existing course by id
router.delete('/', (req, res) => {
  Course.findByIdAndRemove(req.query.id)
    .then(course => {
      if (!course) return res.status(404).send('Course not found')
      res.json({ message: 'Course deleted successfully' })
    })
    .catch(err => {
      // Handling any possible errors and return an error response with status code 500 (Internal Server Error) and the error message
      console.log(err)
      res.status(500).send(err.message)
    })
})

// Get students offering a course
router.get('/students', async (req, res) => {
  // Find the course by id and populate its students array
  Course.findById(req.query.id)
    .populate('students')
    .exec()
    .then(course => {
      if (!course) return res.status(404).send('Course not found')
      // Send the students array as the response
      res.json(course.students)
    })
    .catch(err => {
      return res.status(500).send(err)
    })
})

export default router
