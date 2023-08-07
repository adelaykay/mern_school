import { Schema, model } from 'mongoose'

// Define the schema for Courses
const CourseSchema = new Schema({
  course_name: {
    type: String,
    required: [true, 'course name is required'],
  },
  description: {
    type: String,
  },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
})

// Create the model for Courses
const Course = model('Course', CourseSchema)

export default Course
