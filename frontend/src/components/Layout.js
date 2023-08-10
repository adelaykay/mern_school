import React, { useContext, useState } from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBFooter,
  MDBCol,
  MDBRow,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBNavbarToggler,
  MDBIcon,
} from 'mdb-react-ui-kit'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

function Layout() {
  const [showBasic, setShowBasic] = useState(false)

  const { loggedIn, setLoggedIn } = useContext(AuthContext)
  console.log('from Layout', loggedIn)

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem('user')

    // remove user from state
    setLoggedIn(false)
  }

  return (
    <MDBContainer className='h-100'>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol>
          <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
              <MDBNavbarBrand href='#'>School</MDBNavbarBrand>

              <MDBNavbarToggler
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowBasic(!showBasic)}>
                <MDBIcon icon='bars' fas />
              </MDBNavbarToggler>

              <MDBCollapse navbar show={showBasic}>
                <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' href='/'>
                      Home
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                  {loggedIn && (
                    <>
                      <MDBNavbarItem>
                        <MDBNavbarLink href='/students'>Students</MDBNavbarLink>
                      </MDBNavbarItem>

                      <MDBNavbarItem>
                        <MDBNavbarLink href='/courses'>Courses</MDBNavbarLink>
                      </MDBNavbarItem>
                    </>
                  )}
                  {!loggedIn && (
                    <MDBNavbarItem className='ms-auto me-3'>
                      <MDBNavbarLink href='/login'>Login/Signup</MDBNavbarLink>
                    </MDBNavbarItem>
                  )}
                  {loggedIn && (
                    <MDBNavbarItem className='ms-auto me-3'>
                      <MDBNavbarLink onClick={logout}>Logout</MDBNavbarLink>
                    </MDBNavbarItem>
                  )}
                </MDBNavbarNav>

                <form className='d-flex input-group w-auto'>
                  <input
                    type='search'
                    className='form-control'
                    placeholder='Type query'
                    aria-label='Search'
                  />
                  <MDBBtn color='primary'>Search</MDBBtn>
                </form>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
          {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
          <Outlet />
          <MDBFooter
            bgColor='light'
            className='text-center text-lg-left fixed-bottom'>
            <div className='text-center p-3'>
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

export default Layout
