import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { loggedIn, setLoggedIn } = useContext(AuthContext)
  const [error, setError] = useState('')
  let [loginRegisterActive, setloginRegisterActive] = useState('login')
  const handleLoginRegisterClick = tab => {
    setloginRegisterActive(tab)
  }
  const [user, setUser] = useState({
    email: '',
    password: '',
    repeat_password: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const loginUser = () => {
    // set the student state to the new state
    const { email, password, repeat_password } = user
    // validate the state and make post request
    if (email && password) {
      axios
        .post('http://localhost:3000/api/users/login', user)
        .then(response => {
          console.log(response.data)

          if (response) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(response.data))

            // update the auth context
            setLoggedIn(!loggedIn)
            console.log('from login', loggedIn)

            if (loggedIn) navigate('/students', { replace: true })
          }
        })
        .catch(err => {
          setError(err.response ? err.response.data.error : 'error')
          console.error(err.response ? err.response.data.error : err)
        })
    } else {
      setError('Invalid input')
    }
  }
  const gLogin = () => {
    
  }
  const registerUser = () => {
    // set the student state to the new state
    const { email, password, repeat_password } = user
    // validate the state and make post request
    if (email && password && password === repeat_password) {
      axios
        .post('http://localhost:3000/api/users/signup', user)
        .then(response => {
          console.log(response.data)

          if (response.data.email === email) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(response.data))

            // update the auth context
            setLoggedIn(!loggedIn)
            console.log('from login', loggedIn)

            if (loggedIn) navigate('/students', { replace: true })
          }
        })
        .catch(err => {
          setError(err.response ? err.response.data.error : 'error')
          console.error(err.response ? err.response.data.error : err)
        })
    } else {
      setError('Invalid input')
    }
  }

  const handleSignupSubmit = e => {
    e.preventDefault()
    registerUser()
  }
  const handleLoginSubmit = e => {
    e.preventDefault()
    loginUser()
  }

  return (
    <main className='p-4 bg-white my-3 center shadow'>
      <MDBTabs pills justify className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick('login')}
            active={loginRegisterActive === 'login'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleLoginRegisterClick('register')}
            active={loginRegisterActive === 'register'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={loginRegisterActive === 'login'}>
          <form onSubmit={handleLoginSubmit} className='text-center'>
            <div className='text-center mb-3'>
              <p>Sign up with:</p>

              <MDBBtn floating color='secondary' className='mx-1'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>

              <MDBBtn floating color='secondary' className='mx-1'>
                <MDBIcon fab icon='google' onClick={gLogin} />
              </MDBBtn>

              <MDBBtn floating color='secondary' className='mx-1'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>

              <MDBBtn floating color='secondary' className='mx-1'>
                <MDBIcon fab icon='github' />
              </MDBBtn>
            </div>

            <p className='text-center'>or:</p>

            <MDBInput
              className='mb-4'
              type='email'
              name='email'
              value={user.email}
              id='form7Example1'
              label='Email address'
              onChange={handleChange}
              required
            />
            <MDBInput
              className='mb-2'
              type='password'
              name='password'
              value={user.password}
              id='form7Example2'
              label='Password'
              onChange={handleChange}
              required
            />
            <MDBRow>
              <div>
                <p className='text-danger text-start'>{error}</p>
              </div>
            </MDBRow>
            <MDBRow className='mb-4'>
              <MDBCol className='d-flex justify-content-center'>
                <MDBCheckbox
                  id='form7Example3'
                  label='Remember me'
                  defaultChecked
                />
              </MDBCol>
              <MDBCol>
                <a href='#!'>Forgot password?</a>
              </MDBCol>
            </MDBRow>

            <button
              type='submit'
              className='mb-4 btn btn-primary col-md-6'
              block>
              Sign in
            </button>

            <div className='text-center'>
              <p>
                Not a member?{' '}
                <a href='#!' onClick={() => setloginRegisterActive('register')}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </MDBTabsPane>
        <MDBTabsPane show={loginRegisterActive === 'register'}>
          <form onSubmit={handleSignupSubmit} className='text-center'>
            <div className='text-center mb-3'>
              <p>Sign up with:</p>

              <MDBBtn floating color='secondary' className='mx-1'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>

              <MDBBtn floating color='secondary' className='mx-1'>
                <MDBIcon fab icon='google' />
              </MDBBtn>

              <MDBBtn floating color='secondary' className='mx-1'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>

              <MDBBtn floating color='secondary' className='mx-1'>
                <MDBIcon fab icon='github' />
              </MDBBtn>
            </div>

            <p className='text-center'>or:</p>

            <MDBInput
              className='mb-4'
              type='email'
              name='email'
              value={user.email}
              id='form8Example3'
              label='Email address'
              onChange={handleChange}
              required
            />
            <MDBInput
              className='mb-4'
              type='password'
              name='password'
              id='form8Example4'
              label='Password'
              onChange={handleChange}
              required
            />
            <MDBInput
              className='mb-4'
              type='password'
              name='repeat_password'
              id='form8Example5'
              label='Repeat password'
              onChange={handleChange}
              required
            />
            <MDBRow>
              <div>
                <p className='text-danger text-start'>{error}</p>
              </div>
            </MDBRow>

            <MDBCheckbox
              wrapperClass='d-flex justify-content-center mb-4'
              id='form8Example6'
              label='I have read and agree to the terms'
              defaultChecked
            />

            <button
              type='submit'
              className='mb-4 btn btn-primary col-md-6'
              onClick={handleSignupSubmit}
              block>
              Sign up
            </button>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </main>
  )
}

export default Login
