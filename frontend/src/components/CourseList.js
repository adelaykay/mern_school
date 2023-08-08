// components/courseList.js
import React, { useState, useEffect } from 'react'
import axios from 'axios' // You can use Axios for HTTP requests

function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState([])

  useEffect(() => {
    // Fetch courses data from the API when the component mounts
    setLoading(true)
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/courses') // Replace API_URL with your actual API URL
      console.log(response.data)
      setCourses(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  return (
    <div>
      <h2>Course List</h2>
      {loading && <div>Loading...</div>}
      {courses && (
        <ol>
          {courses.map(course => (
            <li key={course._id}>{course.course_name}</li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default CourseList
