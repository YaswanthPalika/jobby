import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <div>
      <ul className="nav">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </li>
        <li>
          <Link to="/" className="div-links">
            Home
          </Link>
          <Link to="/jobs" className="div-links">
            Jobs
          </Link>
        </li>
        <li>
          <button type="button" onClick={logout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
