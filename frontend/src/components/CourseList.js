// components/courseList.js
import React, { useContext, useState } from 'react'
import {
  MDBBtn,
  MDBCard,
  MDBCardImage,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBTypography,
} from 'mdb-react-ui-kit'
import { StudentContext } from '../contexts/StudentContext'

function CourseList() {
  const [course, setCourse] = useState({})
  const { courses, students } = useContext(StudentContext)
  const [courseModal, setCourseModal] = useState(false)

  const toggleCourseModal = () => {
    setCourseModal(!courseModal)
  }

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
              onClick={e => {
                setCourse(course)
                toggleCourseModal()
              }}
              key={course._id}>
              {course.course_name}
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      )}
      <MDBBtn href='/courses/new'>Add New Course</MDBBtn>
      <MDBModal tabIndex='-1' show={courseModal} setShow={setCourseModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{course.course_name}</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={toggleCourseModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBCard className='text-center'>
                <MDBCardImage
                  src={'https://placehold.co/600x400?text='}></MDBCardImage>
                <br />
                <MDBTypography className='h7'>
                  {course.description}
                </MDBTypography>
                <MDBTypography className='h6 mt-3'>
                  Students Offering Course
                </MDBTypography>
                <hr />
                {course.students?.map(student => (
                  <p>{student.first_name + ' ' + student.surname}</p>
                ))}
              </MDBCard>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  )
}

export default CourseList
