import { MDBContainer } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'

function NoMatch() {
  return (
    <MDBContainer>
      <div className='not-found mt-5'>
        <h2>Sorry</h2>
        <p>That page cannot be found</p>
        <Link to='/'>Back to homepage...</Link>
      </div>
    </MDBContainer>
  )
}

export default NoMatch
