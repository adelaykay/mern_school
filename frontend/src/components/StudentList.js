// components/StudentList.js
import React, { useState, useEffect } from 'react'
import axios from 'axios' // You can use Axios for HTTP requests

function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState([])

  useEffect(() => {
    // Fetch students data from the API when the component mounts
    setLoading(true)
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/students') // Replace API_URL with your actual API URL
      console.log(response.data)
      setStudents(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  return (
    <div>
      <h2>Student List</h2>
      {loading && <div>Loading...</div>}
      {students && (
        <ol>
          {students.map(student => (
            <li key={student._id}>{student.first_name} {student.surname}</li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default StudentList
