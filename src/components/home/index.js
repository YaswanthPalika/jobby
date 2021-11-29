import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="home-box">
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary <br />{' '}
            information, company reviews. Find the job that fits your <br />{' '}
            abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="findjob-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
