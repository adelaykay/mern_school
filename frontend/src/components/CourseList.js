// components/courseList.js
import React, { useState, useEffect } from 'react'
import axios from 'axios' // You can use Axios for HTTP requests
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBTypography } from 'mdb-react-ui-kit'

function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch courses data from the API when the component mounts
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/courses') // Replace API_URL with your actual API URL
      console.log(response.data)
      setCourses(response.data)
      setLoading(!loading)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  return (
    <MDBContainer className='my-3'>
      <MDBTypography variant='h1'>Course List</MDBTypography>
      <hr />

      {loading && <div>Loading...</div>}
      {courses && (
        <MDBListGroup light>
          {courses.map(course => (
            <MDBListGroupItem
              tag='a'
              href='#'
              action
              noBorders
              color='warning'
              className='px-3 rounded-3 mb-2'
              key={course._id}>
              {course.course_name}
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      )}
    </MDBContainer>
  )
}

export default CourseList
