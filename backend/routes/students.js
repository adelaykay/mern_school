// Import Express and Mongoose modules
import express from 'express'
import { Types } from 'mongoose'

// Import the student model
import Student from '../models/students.js'

// Create a router object
const router = express.Router()

// Define a route for getting a single or a list of students
router.get('/', async (req, res) => {
  try {
    // Get the query parameters from the request
    const { id, first_name, surname } = req.query

    // Declare a variable to store the query object
    let query

    // Check if id parameter is provided
    if (id) {
      // Validate the id parameter as a valid MongoDB ObjectId
      if (!Types.ObjectId.isValid(id)) {
        // Return an error response with status code 400 (Bad Request)
        return res.status(400).json({ message: 'Invalid id' })
      }

      // Set the query object to find a student by id
      query = Student.findById(id).populate('courses')
    } else {
      // Set the query object to find all students or by firstName or surname if provided
      query = Student.find({
        ...(first_name && { first_name }), // spread operator to conditionally add properties to the query object
        ...(surname && { surname }),
      }).populate('courses')
    }

    // Execute the query and store the result in a variable
    const students = await query.exec()
    console.log(students)

    // Check if the result is empty
    if (!students || students.length === 0) {
      // Return an error response with status code 404 (Not Found)
      return res.status(404).json({ message: 'No students found' })
    }

    // Return a success response with status code 200 (OK) and the result as data
    res.status(200).json(students)
  } catch (err) {
    // Handle any possible errors and return an error response with status code 500 (Internal Server Error) and the error message
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})

// Define a route for adding a new student
router.post('/', async (req, res) => {
  try {
    // Get the request body from the request
    const {
      first_name,
      middlename,
      surname,
      sex,
      date_of_birth,
      address,
      state_of_origin,
    } = req.body

    // Validate the required properties are provided
    if (!first_name || !surname || !sex || !date_of_birth || !state_of_origin) {
      // Return an error response with status code 400 (Bad Request)
      return res.status(400).json({ message: 'Missing required properties' })
    }

    // Create empty courses array
    const courses = []

    // Create a new student object using the request body
    const newStudent = new Student({
      first_name,
      middlename,
      surname,
      sex,
      date_of_birth,
      address,
      state_of_origin,
      courses,
    })

    // Save the new student object to the database and store the result in a variable
    const student = await newStudent.save()

    // Return a success response with status code 201 (Created) and the result as data
    res.status(201).json(student)
  } catch (err) {
    // Handling any possible errors and return an error response with status code 500 (Internal Server Error) and the error message
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})

// Define a route for modifying an existing student by id
router.put('/', async (req, res) => {
  try {
    // Get the update from the request body
    const update = req.body

    const id = req.query.id
    // Validate the id parameter as a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
      // Return an error response with status code 400 (Bad Request)
      return res.status(400).json({ message: 'Invalid id' })
    }

    let query
    // Set the query to find and update a student by id
    const updatedStudent = await Student.findByIdAndUpdate(id, update, {
      new: true,
    }).exec()

    // Check if the result is empty
    if (!updatedStudent || updatedStudent.length === 0) {
      // Return an error response with status code 404 (Not Found)
      return res.status(404).json({ message: 'Student not found' })
    }

    // Return a success response with status code 200 (OK) and the result as data
    res.status(200).json(updatedStudent)

    // student.first_name = first_name ?? student.first_name
    // student.middlename = middlename ?? student.middlename
    // student.surname = surname ?? student.surname
    // student.sex = sex ?? student.sex
    // student.date_of_birth = date_of_birth ?? student.date_of_birth
    // student.address = address ?? student.address
    // student.state_of_origin = state_of_origin ?? student.state_of_origin
  } catch (err) {
    // Handling any possible errors and return an error response with status code 500 (Internal Server Error) and the error message
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

// Define a route for deleting an existing student by id
router.delete('/', (req, res) => {
  Student.findByIdAndRemove(req.query.id)
    .then(student => {
      if (!student) return res.status(404).send('Student not found')
      res.json({ message: 'Student deleted successfully' })
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

// Get courses offered by a student
router.get('/courses', (req, res) => {
  // Find the student by id and populate its courses array
  Student.findById(req.query.id)
    .populate('courses')
    .exec()
    .then(student => {
      if (!student) return res.status(404).send('Student not found')
      // Send the courses array as the response
      res.json(student.courses)
    })
    .catch(err => {
      return res.status(500).send(err)
    })
})

export default router
