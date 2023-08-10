import { MDBContainer } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'

function LoginSuccess() {
  const verifiedUser = JSON.parse(localStorage.getItem('user'))?.email

  return (
    <MDBContainer>
      <div className='not-found mt-5'>
        <h2>Hello</h2>
        <p>You're logged in as {verifiedUser} </p>
        <Link to='/'>Back to homepage...</Link>
      </div>
    </MDBContainer>
  )
}

export default LoginSuccess
