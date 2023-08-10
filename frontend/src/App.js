import { Route, Routes } from 'react-router-dom'
import { StudentContext } from './contexts/StudentContext'
import AddStudentForm from './components/AddStudentForm'
import CourseList from './components/CourseList'
import StudentList from './components/StudentList'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './index.css'
import Layout from './components/Layout'
import NoMatch from './components/NoMatch'
import { useEffect, useMemo, useState } from 'react'
import AddCourseForm from './components/AddCourseForm'
import Dashboard from './containers/Dashboard'
import axios from 'axios'
import Login from './containers/Login'
import { AuthContext } from './contexts/AuthContext'
import LoginSuccess from './components/LoginSuccess'

function App() {
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [loggedIn, setLoggedIn] = useState({ status: false })
  console.log('from app.js', loggedIn)

  const schoolProviderValue = useMemo(
    () => ({ students, setStudents, courses, setCourses }),
    [students, setStudents, courses, setCourses]
  )

  const authProviderValue = useMemo(
    () => ({
      loggedIn,
      setLoggedIn,
    }),
    [loggedIn, setLoggedIn]
  )

  useEffect(() => {
    // Check user auth status
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setLoggedIn(true)
      console.log('from app.js useEffect', loggedIn)
    } else setLoggedIn(false)
    // Fetch courses data from the API when the component mounts
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/courses') // Replace API_URL with your actual API URL
        setCourses(response.data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }
    fetchCourses()
    // Fetch students data from the API when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/students') // Replace API_URL with your actual API URL
        setStudents(response.data)
      } catch (error) {
        console.error(error.response.data.message)
      }
    }
    fetchStudents()
  }, [])

  return (
    <div className='App'>
      <AuthContext.Provider value={authProviderValue}>
        <StudentContext.Provider value={schoolProviderValue}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Dashboard />} />
              {loggedIn ? (
                <Route path='/login' element={<LoginSuccess />} />
              ) : (
                <Route path='/login' element={<Login />} />
              )}
              {!loggedIn ? <Route path='/login' element={<Login />} /> : (
                <Route path='/students/new' element={<AddStudentForm />} />
              )}
              {!loggedIn ? <Route path='/login' element={<Login />} /> : (
                <Route path='/courses/new' element={<AddCourseForm />} />
              )}
              {!loggedIn ? <Route path='/login' element={<Login />} /> : <Route path='/students' element={<StudentList />} />}
              {!loggedIn ? <Route path='/login' element={<Login />} /> : <Route path='/courses' element={<CourseList />} />}
              <Route path='*' element={<NoMatch />} />
            </Route>
          </Routes>
        </StudentContext.Provider>
      </AuthContext.Provider>
    </div>
  )
}

export default App
