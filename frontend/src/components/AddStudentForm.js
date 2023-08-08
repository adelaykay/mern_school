import React, { useState } from 'react'
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
  MDBRadio,
  MDBValidationItem,
  MDBValidation,
} from 'mdb-react-ui-kit'
import image from '../library.jpg'

function AddStudentForm() {
  const [student, setStudent] = useState({
    first_name: '',
    middlename: '',
    surname: '',
    sex: '',
    address: '',
    date_of_birth: '',
    state_of_origin: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setStudent({ ...student, [name]: value })
  }

  const register = () => {
    // set the student state to the new state
    const {
      first_name,
      middlename,
      surname,
      address,
      date_of_birth,
      state_of_origin,
      sex,
    } = student
    // validate the state and make post request
    if (first_name && surname && sex && date_of_birth && state_of_origin) {
      axios
        .post('http://localhost:3000/api/students', student)
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
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBValidationItem>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='First Name'
                            size='lg'
                            id='form1'
                            name='first_name'
                            value={student.first_name}
                            onChange={handleChange}
                            type='text'
                            required
                          />
                        </MDBValidationItem>
                      </MDBCol>

                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          label='Middle Name (Optional)'
                          size='lg'
                          id='form2'
                          name='middlename'
                          value={student.middlename}
                          onChange={handleChange}
                          type='text'
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBInput
                      wrapperClass='mb-4'
                      label='Surname'
                      size='lg'
                      id='form3'
                      name='surname'
                      value={student.surname}
                      onChange={handleChange}
                      type='text'
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Address (Optional)'
                      size='lg'
                      id='form3'
                      name='address'
                      value={student.address}
                      onChange={handleChange}
                      type='text'
                    />

                    <div className='d-md-flex ustify-content-start align-items-center mb-4'>
                      <h6 class='fw-bold mb-0 me-4'>Gender: </h6>
                      <MDBRadio
                        name='sex'
                        id='inlineRadio1'
                        value='female'
                        label='Female'
                        onChange={handleChange}
                        required
                        inline
                      />
                      <MDBValidationItem invalid feedback='Please select one'>
                        <MDBRadio
                          name='sex'
                          id='inlineRadio2'
                          value='male'
                          label='Male'
                          onChange={handleChange}
                          required
                          inline
                        />
                      </MDBValidationItem>
                    </div>

                    <MDBInput
                      wrapperClass='mb-4'
                      label='Date of Birth'
                      size='lg'
                      id='form4'
                      name='date_of_birth'
                      value={student.date_of_birth}
                      onChange={handleChange}
                      type='date'
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      label='State of Origin'
                      size='lg'
                      id='form5'
                      name='state_of_origin'
                      value={student.state_of_origin}
                      onChange={handleChange}
                      type='text'
                      required
                    />
                    <div className='d-flex justify-content-end pt-3'>
                      <MDBBtn color='light' size='lg' type='reset'>
                        Reset all
                      </MDBBtn>
                      <MDBBtn
                        type='submit'
                        onClick={register}
                        className='ms-2'
                        color='warning'
                        size='lg'>
                        Add Student
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

export default AddStudentForm
