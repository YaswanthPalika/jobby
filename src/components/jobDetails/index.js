import './index.css'
import Cookies from 'js-cookie'
import {FiExternalLink} from 'react-icons/fi'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FcApproval} from 'react-icons/fc'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import SimilarJobs from '../SimilarJobs'

import SkillCard from '../skillCard/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    data: {},
  }

  componentDidMount = () => {
    this.getData()
  }

  mapSkills = skills => {
    const y = skills.map(each => ({
      name: each.name,
      image: each.image_url,
    }))
    return y
  }

  mapSimilarJobs = x => {
    const y = x.map(each => ({
      apiStatus: apiStatusConstants.initial,
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    return y
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    //  console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const x = data.job_details
      const sim = data.similar_jobs
      const mappedSimilarJobs = this.mapSimilarJobs(sim)
      //  console.log(mappedSimilarJobs)
      const mappedSkills = this.mapSkills(x.skills)
      this.setState({
        data: {
          id: x.id,
          title: x.title,
          rating: x.rating,
          companyLogoUrl: x.company_logo_url,
          companyWebsiteUrl: x.company_website_url,
          employmentType: x.employment_type,
          jobDescription: x.job_description,
          skills: mappedSkills,
          lifeAtCompany: {
            description: x.life_at_company.description,
            imageUrl: x.life_at_company.image_url,
          },
          location: x.location,
          packagePerAnnum: x.package_per_annum,
          similarJobs: mappedSimilarJobs,
        },
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="load">
      <Loader
        id="loader"
        type="ThreeDots"
        color="#0b69ff"
        height="50"
        width="50"
        value="loader"
      />
    </div>
  )

  renderFailureView = () => {
    console.log(' ')
    return (
      <div className="load">
        <div className="retry">
          <image
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button
            type="button"
            className="retry-button"
            onClick={this.searchButton}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {data} = this.state
    const sim = data.skills
    return (
      <div className="job-details-box">
        <div className="main-card">
          <div className="card1">
            <img
              src={data.companyLogoUrl}
              alt="company logo"
              className="company-logo"
              key="company_logo_url"
            />
            <div className="card1-1">
              <h3>{data.title}</h3>
              <p>
                <AiFillStar className="star" /> {data.rating}
              </p>
            </div>
          </div>
          <div className="card2">
            <div className="card2-1">
              <MdLocationOn className="location" />
              <p>{data.location}</p>
              <FcApproval className="bag" />
              <p>{data.employmentType}</p>
            </div>
            <h2>{data.packagePerAnnum}</h2>
          </div>
          <hr />
          <div className="description-bar">
            <h3>Description</h3>
            <a href={data.companyWebsiteUrl} className="jobWebsite">
              visit
              <FiExternalLink className="jobLink" />
            </a>
          </div>
          <p className="sss">{data.jobDescription}</p>
          <br />
          <h2>Skills</h2>
          <br />
          <div className="skills-group">
            <SkillCard x={sim} />
          </div>
          <br />
          <h2>Life at Company</h2>
          <div className="life">
            <p className="life-p">{data.lifeAtCompany.description}</p>
            <img
              className="life-image"
              src={data.lifeAtCompany.imageUrl}
              alt="life-at-company"
            />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <br />
        <SimilarJobs data={data.similarJobs} />
      </div>
    )
  }

  renderAllThings = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    // console.log('from state')

    return (
      <div>
        <Header />
        {this.renderAllThings()}
      </div>
    )
  }
}

export default JobDetails
