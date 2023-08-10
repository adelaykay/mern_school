import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBValidationItem,
  MDBValidation,
  MDBTextArea,
} from 'mdb-react-ui-kit'
import image from '../library.jpg'

function AddCourseForm() {
  const [course, setCourse] = useState({
    course_name: '',
    description: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setCourse({ ...course, [name]: value })
  }

  const register = () => {
    // set the student state to the new state
    const { course_name, description } = course
    // validate the state and make post request
    if (course_name) {
      axios
        .post('http://localhost:3000/api/courses', course)
        .then(response => {
          console.log(response.data)
          alert(response.statusText)
        })
        .catch(console.error)
    } else {
      alert('Invalid input')
    }
  }

  return (
    <MDBContainer className='bg-light mb-5'>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol>
          <MDBCard className='my-2 '>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='d-none d-md-block'>
                <MDBCardImage
                  src={image}
                  alt='Sample photo'
                  className='img-fluid rounded-start'
                  style={{ height: '80vh' }}
                  fluid
                />
              </MDBCol>

              <MDBCol md='6'>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className='mb-5 text-uppercase fw-bold'>
                    Student registration form
                  </h3>
                  <MDBValidation>
                    <MDBValidationItem>
                      <MDBInput
                        wrapperClass='mb-4'
                        label='Course Name'
                        size='lg'
                        id='form1'
                        name='course_name'
                        value={course.course_name}
                        onChange={handleChange}
                        type='text'
                        required
                      />
                    </MDBValidationItem>
                    <MDBValidationItem>
                      <MDBTextArea
                        wrapperClass='mb-4'
                        label='Course Description'
                        size='lg'
                        id='form2'
                        name='description'
                        value={course.description}
                        onChange={handleChange}
                        type='text'
                        rows={4}
                      />
                    </MDBValidationItem>
                    <div className='d-flex justify-content-end pt-3'>
                      <MDBBtn color='light' size='lg' type='reset'>
                        Reset all
                      </MDBBtn>
                      <MDBBtn
                        type='submit'
                        onClick={register}
                        className='ms-2'
                        color='primary'
                        size='lg'>
                        Add Course
                      </MDBBtn>
                    </div>
                  </MDBValidation>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default AddCourseForm
