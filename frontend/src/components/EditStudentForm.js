import React, { useState } from 'react'
import axios from 'axios' // You can use Axios for HTTP requests
import {
  MDBBtn,
  MDBInput,
  MDBValidation,
  MDBRadio,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBValidationItem,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit'

function EditStudentForm({editModal, setEditModal}) {
  const [student, setStudent] = useState({
    first_name: '',
    middlename: '',
    surname: '',
    sex: '',
    address: '',
    date_of_birth: '',
    state_of_origin: '',
  })
  

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }
  
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
    <MDBModal tabIndex='-1' show={editModal} setShow={setEditModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modify Student</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={toggleEditModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
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
                    color='primary'
                    size='lg'>
                    Add Student
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleEditModal}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
  )
}

export default EditStudentForm