// components/StudentList.js
import React, { useEffect, useContext, useState } from 'react'
import { StudentContext } from '../contexts/StudentContext'
import axios from 'axios' // You can use Axios for HTTP requests
import {
  MDBBtn,
  MDBInput,
  MDBValidation,
  MDBRadio,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTypography,
  MDBValidationItem,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'

function StudentList() {
  const [student, setStudent] = useState({
    first_name: '',
    middlename: '',
    surname: '',
    sex: '',
    address: '',
    date_of_birth: '',
    state_of_origin: '',
  })
  const [id, setId] = useState('')
  const { students, setStudents } = useContext(StudentContext)
  const [editModal, setEditModal] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setStudent({ ...student, [name]: value })
  }

  const register = id => {
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
    console.log(student.id)
    // validate the state and make post request
    if (first_name || surname || sex || date_of_birth || state_of_origin || middlename || address) {
      console.log(id)
      axios
        .put(`http://localhost:3000/api/students?id=${id}`, student)
        .then(response => {
          console.log(response.data)
          alert(response.statusText)
        })
        .catch(console.error)
    } else {
      alert('Invalid input')
    }
  }

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }


  const handleDelete = id => {
    // Delete the student from the database
    axios
      .delete(`http://localhost:3000/api/students?id=${id}`)
      .then(response => {
        alert('Student deleted successfully')
        setStudents(students.filter(student => student._id !== id))
      })
  }

  return (
    <MDBContainer className='my-3'>
      <MDBTypography variant='h3'>Student List</MDBTypography>
      <hr />
      {students && (
        <MDBTable className='table-sm' hover striped>
          <MDBTableHead>
            <tr className='table-primary'>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Sex</th>
              <th scope='col'>State of Origin</th>
              <th></th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {students.map((student, idx) => (
              <tr className='table-primary' key={student._id}>
                <th scope='row'>{idx + 1}</th>
                <td>
                  {student.surname}{' '}
                  {student.middlename && student.middlename[0] + '. '}
                  {student.first_name[0]}.
                </td>
                <td>{student.sex.toUpperCase()[0]}</td>
                <td>{student.state_of_origin}</td>
                <td>
                  <Link onClick={(e)=>{
                    setId(e.target.id)
                    console.log(id)
                    toggleEditModal()
                  }}>
                    <MDBIcon
                      className='hover-zoom'
                      icon='edit'
                      id={student._id}
                    />
                  </Link>
                </td>
                <td>
                  <Link onClick={() => handleDelete(student._id)}>
                    <MDBIcon icon='trash' />
                  </Link>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      )}
      {students.length < 1 && <div>Loading...</div>}
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
                  <h6 className='fw-bold mb-0 me-4'>Gender: </h6>
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
              </MDBValidation>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleEditModal}>
                Close
              </MDBBtn>
              <MDBBtn
                type='submit'
                onClick={() => {
                  register(student._id)
                  toggleEditModal()
                }}>
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  )
}

export default StudentList
