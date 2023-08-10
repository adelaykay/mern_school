// components/courseList.js
import React, { useContext } from 'react'
import {
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBTypography,
} from 'mdb-react-ui-kit'
import { StudentContext } from '../contexts/StudentContext'

function CourseList() {
  const { courses, students } = useContext(StudentContext)

  return (
    <MDBContainer className='my-3'>
      <MDBTypography variant='h3'>Course List</MDBTypography>
      <hr />

      {/* {loading && <div>Loading...</div>} */}
      {courses && (
        <MDBListGroup light>
          {courses.map(course => (
            <MDBListGroupItem
              tag='a'
              href='#'
              action
              noBorders
              color='primary'
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
