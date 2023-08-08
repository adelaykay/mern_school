// components/StudentList.js
import React, { useState, useEffect } from 'react'
import axios from 'axios' // You can use Axios for HTTP requests
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead, MDBTypography } from 'mdb-react-ui-kit'

function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch students data from the API when the component mounts
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/students') // Replace API_URL with your actual API URL
      setStudents(response.data)
      setLoading(!loading)
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  return (
    <MDBContainer className='my-3'>
      <MDBTypography variant='h3'>Student List</MDBTypography>
      <hr />

      {loading && <div>Loading...</div>}
      {/* {students && (
        <MDBListGroup light>
          {students.map(student => (
            <MDBListGroupItem
              tag='a'
              href='#'
              action
              noBorders
              color='warning'
              className='px-3 rounded-3 mb-2'
              key={student._id}>
              {student.first_name} {student.surname}
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      )} */}
      {students && (
        <MDBTable className='table-sm' hover striped>
          <MDBTableHead>
            <tr className='table-warning'>
              <th scope= 'col'>#</th>
              <th scope= 'col'>Name</th>
              <th scope= 'col'>Gender</th>
              <th scope= 'col'>State of Origin</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {students.map((student, idx) => (
              <tr className='table-warning' key={student._id}>
                <th scope='row'>{idx+1}</th>
                <td>{student.surname} {student.middlename && student.middlename[0]+'. '}{student.first_name[0]}.</td>
                <td>
                  {student.sex.toUpperCase()}
                </td>
                <td>
                  {student.state_of_origin}
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      )}
    </MDBContainer>
  )
}

export default StudentList
