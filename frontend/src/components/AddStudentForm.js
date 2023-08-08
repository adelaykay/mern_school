import React from 'react'
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
} from 'mdb-react-ui-kit'
import image from '../library.jpg'

function AddStudentForm() {
  return (
    <MDBContainer fluid className='bg-light'>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol>
          <MDBCard className='my-2'>
            <MDBRow className='g-0'>
              <MDBCol md='6' className='d-none d-md-block'>
                <MDBCardImage
                  src={image}
                  alt='Sample photo'
                  className='rounded-start'
                  fluid
                />
              </MDBCol>

              <MDBCol md='6'>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className='mb-5 text-uppercase fw-bold'>
                    Student registration form
                  </h3>

                  <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mb-4'
                        label='First Name'
                        size='lg'
                        id='form1'
                        type='text'
                      />
                    </MDBCol>

                    <MDBCol md='6'>
                      <MDBInput
                        wrapperClass='mb-4'
                        label='Middle Name (Optional)'
                        size='lg'
                        id='form2'
                        type='text'
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput
                    wrapperClass='mb-4'
                    label='Surname'
                    size='lg'
                    id='form3'
                    type='text'
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Address (Optional)'
                    size='lg'
                    id='form3'
                    type='text'
                  />

                  <div className='d-md-flex ustify-content-start align-items-center mb-4'>
                    <h6 class='fw-bold mb-0 me-4'>Gender: </h6>
                    <MDBRadio
                      name='inlineRadio'
                      id='inlineRadio1'
                      value='option1'
                      label='Female'
                      inline
                    />
                    <MDBRadio
                      name='inlineRadio'
                      id='inlineRadio2'
                      value='option2'
                      label='Male'
                      inline
                    />
                  </div>

                  <MDBInput
                    wrapperClass='mb-4'
                    label='Date of Birth'
                    size='lg'
                    id='form4'
                    type='text'
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='State of Origin'
                    size='lg'
                    id='form5'
                    type='text'
                  />
                  <div className='d-flex justify-content-end pt-3'>
                    <MDBBtn color='light' size='lg'>
                      Reset all
                    </MDBBtn>
                    <MDBBtn className='ms-2' color='warning' size='lg'>
                      Add Student
                    </MDBBtn>
                  </div>
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
