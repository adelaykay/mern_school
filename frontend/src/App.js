import { Route, Routes } from 'react-router-dom'
import AddStudentForm from './components/AddStudentForm'
import CourseList from './components/CourseList'
import StudentList from './components/StudentList'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './index.css'
import Navbar from './components/Navbar'
import NoMatch from './components/NoMatch'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<AddStudentForm />} />
        <Route path='/students' element={<StudentList />} />
        <Route path='/courses' element={<CourseList />} />
        <Route path='*' element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

export default App
