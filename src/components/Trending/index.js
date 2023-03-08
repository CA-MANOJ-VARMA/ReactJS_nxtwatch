import {Component} from 'react'
import {Link} from 'react-router-dom'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faFireFlameCurved} from '@fortawesome/free-solid-svg-icons'
import {IoMdFlame} from 'react-icons/io'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import {RetryButton} from '../styledComponents'
import './index.css'
import themeContext from '../../context/themeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  noresults: 'NORESULTS',
}

class Trending extends Component {
  state = {
    bannerItem: false,

    apiStatus: apiStatusConstants.initial,
    videoDetails: [],
  }

  componentDidMount() {
    this.setState({bannerItem: true})
    this.fetchDetails()
  }

  bannerCloseButton = () => {
    this.setState({bannerItem: false})
  }

  bannerItem = () => (
    <div className="css-Trending-container">
      <div style={{marginRight: '10px'}}>
        <IoMdFlame style={{fontSize: '50px'}} />
      </div>
      <div>
        <h1>Trending</h1>
      </div>
    </div>
  )

  loadingFunction = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="100" width="100" />
    </div>
  )

  fetchDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})

    const jwtToken = Cookies.get('JwtToken')
    const url = 'https://apis.ccbp.in/videos/trending'
    console.log(url)
    const options = {
      headers: {
        authorization: `bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstants.success})
      const jsonData = await response.json()
      //   console.log(jsonData)
      this.setState({videoDetails: jsonData.videos})
      console.log(jsonData.total)
      if (jsonData.total === 0) {
        this.setState({apiStatus: apiStatusConstants.noresults})
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  succesView = () => {
    const {videoDetails} = this.state
    return (
      <themeContext.Consumer>
        {value => {
          const {isDarkThemeActive} = value

          const textColor = isDarkThemeActive
            ? 'css-textColor-dark-color-f9f9f9'
            : 'css-textColor-light-color-0f0f0f'

          const backgroundcolorgray = isDarkThemeActive
            ? 'css-background-dark-color-181818'
            : 'css-background-light-color-f9f9f9'

          return (
            <>
              <ul className="css-ul-trending-container">
                {videoDetails.map(eachItem => (
                  <li key={eachItem.id} className="css-list-trending-container">
                    <Link
                      to={`/videos/${eachItem.id}`}
                      className={`css-trending-Link-property ${backgroundcolorgray} ${textColor}`}
                    >
                      <div>
                        <img
                          src={eachItem.thumbnail_url}
                          alt={eachItem.channel.name}
                          style={{width: '270px', margin: '10px'}}
                        />
                      </div>
                      <div className="css-icon-titlepart-container">
                        <div style={{margin: '10px'}}>
                          <img
                            src={eachItem.channel.profile_image_url}
                            alt="video thumbnail"
                            style={{width: '50px'}}
                          />
                        </div>
                        <div>
                          <p style={{fontWeight: 'bold'}}>{eachItem.title}</p>
                          <p>{eachItem.channel.name}</p>
                          <p>
                            {`${eachItem.view_count} views`} |
                            {` ${formatDistanceToNow(
                              new Date(eachItem.published_at),
                            )} ago`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )
        }}
      </themeContext.Consumer>
    )
  }

  retryButton = () => {
    this.fetchDetails()
  }

  failureView = () => (
    <>
      <div className="css-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
          style={{
            width: '250px',
          }}
        />
        <h1 style={{fontSize: '15px'}}>Oops! Something Went Wrong</h1>
        <p style={{fontSize: '15px'}}>
          We are having some trouble to complete your request
        </p>
        <p style={{fontSize: '15px'}}>Please try again</p>
        <RetryButton onClick={this.retryButton}>Retry</RetryButton>
      </div>
    </>
  )

  noResultsView = () => (
    <>
      <div className="css-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          style={{
            width: '250px',
          }}
        />
        <h1 style={{fontSize: '15px'}}>No Search results found</h1>
        <p style={{fontSize: '15px'}}>
          Try different key words or remove search filter
        </p>
        <RetryButton onClick={this.retryButton}>Retry</RetryButton>
      </div>
    </>
  )

  statusFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.loadingFunction()
      case apiStatusConstants.success:
        return this.succesView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.noresults:
        return this.noResultsView()
      default:
        return null
    }
  }

  render() {
    const {bannerItem, videoDetails} = this.state
    console.log(videoDetails)
    return (
      <themeContext.Consumer>
        {value => {
          const {isDarkThemeActive} = value

          const textColor = isDarkThemeActive
            ? 'css-textColor-dark-color-f9f9f9'
            : 'css-textColor-light-color-0f0f0f'

          const backgroundcolorgray = isDarkThemeActive
            ? 'css-background-dark-color-181818'
            : 'css-background-light-color-f9f9f9'

          return (
            <>
              <Header />
              <SideBar />

              <div
                className={`css-mainbar-container ${backgroundcolorgray} ${textColor}`}
                data-testid="trending"
              >
                {bannerItem ? this.bannerItem() : ''}
                <div style={{margin: '5px'}}>
                  <div className="css-view-container">
                    {this.statusFunction()}
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </themeContext.Consumer>
    )
  }
}
export default Trending
