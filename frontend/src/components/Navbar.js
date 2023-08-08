import React from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBInputGroup,
  MDBFooter,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit'
import { Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <MDBContainer className='h-100'>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol>
          <MDBNavbar light bgColor='light'>
            <MDBContainer fluid>
              <MDBNavbarBrand>School</MDBNavbarBrand>
              <MDBInputGroup tag='form' className='d-flex w-auto mb-3'>
                <input
                  className='form-control'
                  placeholder='Type query'
                  aria-label='Search'
                  type='Search'
                />
                <MDBBtn outline>Search</MDBBtn>
              </MDBInputGroup>
            </MDBContainer>
            {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
          </MDBNavbar>
          <Outlet />
          <MDBFooter
            bgColor='light'
            className='text-center text-lg-left fixed-bottom'>
            <div
              className='text-center p-3'>
              &copy; {new Date().getFullYear()} Copyright:{' '}
              <a className='text-dark' href='https://adeleke.dev/'>
                Adeleke.dev
              </a>
            </div>
          </MDBFooter>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Navbar
