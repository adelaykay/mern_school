// Import Express and Mongoose modules
import express from 'express'
import { Schema, model } from 'mongoose'

// Import the student and course models
import Course from '../models/courses.js'
import Student from '../models/students.js'

// Create a router object
const router = express.Router()

// Define a route for registering a student for a course
// Register a student for a course
router.post('/', async (req, res) => {
  // Find the student and the course by id
  try {
    let [student, course] = await Promise.all([
      Student.findById(req.query.student_id),
      Course.findById(req.query.course_id),
    ])
    if (!student) return res.status(404).send('Student not found')
    else if (!course) return res.status(404).send('Course not found')
    // Add the course to the student's courses array
    student.courses.push(course)
    // Add the student to the course's students array
    course.students.push(student)
    // Save both the student and the course
    Promise.all([student.save(), course.save()])
      .then(response => {
        console.log(response)
        // Send a success message
        res.json({ message: 'Student registered for course successfully' })
      })
      .catch(err => {
        res.status(500).send(err.message)
      })
  } catch (err) {
    // Handling any possible errors and return an error response with status code 500 (Internal Server Error) and the error message
    console.log(err)
    res.status(500).send(err.message)
  }
})

export default router
