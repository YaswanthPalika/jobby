import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FcApproval} from 'react-icons/fc'

const JobCard = props => {
  const {jobs} = props

  if (jobs.length === 0) {
    return (
      <div className="no-job-box">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  return (
    <ul>
      {jobs.map(each => (
        <li key={each.id} className="card">
          <Link to={`/jobs/${each.id}`} className="link-item">
            <div className="card1">
              <img
                src={each.company_logo_url}
                alt="company logo"
                className="company-logo"
                key="company_logo_url"
              />
              <div className="card1-1">
                <h3>{each.title}</h3>
                <p>
                  <AiFillStar className="star" /> {each.rating}
                </p>
              </div>
            </div>
            <div className="card2">
              <div className="card2-1">
                <MdLocationOn className="location" />
                <p>{each.location}</p>
                <FcApproval className="bag" />
                <p>{each.employment_type}</p>
              </div>
              <h4>{each.package_per_annum}</h4>
            </div>
            <hr />
            <h4>Description</h4>
            <p>{each.job_description}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default JobCard
