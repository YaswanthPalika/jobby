import './index.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {GoSearch} from 'react-icons/go'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobCard from '../jobCard'
import FilterGroups from '../filterGroups'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusProfileConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    search: '',
    profile: {
      profileImage: '',
      name: '',
      shortBio: '',
    },

    allJobs: {},
    salaryRange: '',
    employment: [],
    apiStatus: apiStatusConstants.initial,
    apiStatusProfile: apiStatusProfileConstants.initial,
  }

  changeLpa = salary => {
    this.setState({salaryRange: salary}, this.searchButton)
  }

  changeEmployment = (value, t) => {
    const {employment} = this.state

    if (t) {
      const x = employment.indexOf(value)
      employment.splice(x, 1)
    } else {
      employment.push(value)
    }
    this.setState({employment}, this.searchButton)
  }

  renderLoadingView = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  changeSearch = event => {
    this.setState({search: event.target.value}, this.searchButton)
  }

  getProfile = async () => {
    this.setState({
      apiStatusProfile: apiStatusProfileConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const image = data.profile_details.profile_image_url
      this.setState({
        apiStatusProfile: apiStatusProfileConstants.success,
        profile: {
          profileImage: image,
          name: data.profile_details.name,
          shortBio: data.profile_details.short_bio,
        },
      })
    } else {
      this.setState({
        apiStatusProfile: apiStatusProfileConstants.failure,
      })
    }
  }

  searchButton = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {search, salaryRange, employment} = this.state
    let x = ''
    employment.forEach(element => {
      x = `${x},${element}`
    })
    x = x.substring(1)
    //  https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=
    const url = `https://apis.ccbp.in/jobs?employment_type=${x}&minimum_package=${salaryRange}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({allJobs: data.jobs, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }

    //  this.setState({isLoading: false})
  }

  componentDidMount = () => {
    this.getProfile()
    this.searchButton()
  }

  renderJobs = () => {
    const {allJobs} = this.state
    return <JobCard jobs={allJobs} />
  }

  renderFailureView = () => {
    console.log(' ')
    return (
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
    )
  }

  renderLoadingView = () => (
    <Loader
      id="loader"
      type="ThreeDots"
      color="#0b69ff"
      height="50"
      width="50"
      value="loader"
    />
  )

  renderAllThings = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobs()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderProfileCard = () => {
    const {profile} = this.state
    return (
      <div className="profile-card">
        <img
          src={profile.profileImage}
          alt="profile-pic"
          className="profile-image"
        />
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-bio">{profile.shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <button type="button" className="retry-profile" onClick={this.getProfile}>
      Retry
    </button>
  )

  renderProfile = () => {
    const {apiStatusProfile} = this.state

    switch (apiStatusProfile) {
      case apiStatusProfileConstants.success:
        return this.renderProfileCard()
      case apiStatusProfileConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusProfileConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {search, salaryRange, employment} = this.state

    return (
      <div>
        <Header />
        <div className="job-box">
          <div className="block1">
            {this.renderProfile()}
            <FilterGroups
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              search={search}
              salaryRange={salaryRange}
              changeLpa={this.changeLpa}
              employment={employment}
              changeEmployment={this.changeEmployment}
            />
          </div>
          <div className="block2">
            <div className="search-bar">
              <input
                placeholder="search"
                className="search-input"
                type="search"
                value={search}
                onChange={this.changeSearch}
              />
              <button
                type="button"
                id="searchButton"
                className="search-logo-button"
                onClick={this.searchButton}
                value="searchButton"
              >
                <GoSearch className="search-logo" />
              </button>
            </div>
            {this.renderAllThings()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
