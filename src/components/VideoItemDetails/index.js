import './index.css'
import {withRouter} from 'react-router-dom'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiOutlineLike, AiOutlineDislike, AiOutlinePlus} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import {RetryButton, LikeDislikeSaveButton} from '../styledComponents'
import themeContext from '../../context/themeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  noresults: 'NORESULTS',
}

class VideoItemDetails extends Component {
  state = {
    videoItemDetails: [],
    videoItemDetailsChannel: [],
    apiStatus: apiStatusConstants.initial,
    like: false,
    dislike: false,
    save: false,
  }

  componentDidMount() {
    this.videoItemDetailsApiUrl()
  }

  onClickLikeButton = () => {
    const {like, dislike} = this.state
    if (dislike === true) {
      this.setState({like: !like, dislike: !dislike})
    } else {
      this.setState({like: !like})
    }
  }

  onClickDisLikeButton = () => {
    const {like, dislike} = this.state
    if (like === true) {
      this.setState({like: !like, dislike: !dislike})
    } else {
      this.setState({dislike: !like})
    }
  }

  videoItemDetailsApiUrl = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('JwtToken')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const jsonData = await response.json()
      const dateFns = await jsonData.video_details.published_at
      console.log(dateFns)
      console.log(jsonData)
      this.setState({
        videoItemDetails: jsonData.video_details,
        videoItemDetailsChannel: jsonData.video_details.channel,
        date: dateFns,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  dateFormat = () => {
    const {date} = this.state
    const longDate = new Date(date)
    const formatedDate = longDate.toLocaleDateString().split('/')
    console.log(formatedDate)
    // console.log(
    //   formatDistanceToNow(formatedDate[2], formatedDate[1], formatedDate[0]),
    // )
    // formatDistanceToNow(new Date(date))
  }

  loadingFunction = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="100" width="100" />
    </div>
  )

  successView = () => (
    <themeContext.Consumer>
      {value => {
        const {onClickAddVideo, cartList} = value

        console.log('cartList')
        console.log(cartList)
        const {
          videoItemDetails,
          videoItemDetailsChannel,
          date,
          like,
          dislike,
          save,
        } = this.state

        const result = cartList.filter(
          eachItem => eachItem.channelId === videoItemDetails.id,
        )
        console.log(result.channelSaved)
        if (result.length !== 0 && save === false) {
          this.setState({save: result[0].channelSaved})
        }

        console.log('result')
        console.log(result)
        const onClicksaveButton = () => {
          if (result.length === 0) {
            console.log(`videoItemDetails-${videoItemDetails}`)
            const pushVideoItemDetails = {
              channelSaved: true,
              channelName: videoItemDetails.channel.name,
              channelId: videoItemDetails.id,
              channelProfileImageUrl:
                videoItemDetails.channel.profile_image_url,
              channelSubscriberCount: videoItemDetails.channel.subscriber_count,
              channelDescription: videoItemDetails.description,
              channelPublishedAt: videoItemDetails.published_at,
              channelThumbnailUrl: videoItemDetails.thumbnail_url,
              channelTitle: videoItemDetails.title,
              channelVideoUrl: videoItemDetails.video_url,
              channelViewCount: videoItemDetails.view_count,
            }
            //   console.log(pushVideoItemDetails)
            onClickAddVideo(pushVideoItemDetails)
            this.setState({save: true})
          } else {
            // need to remove from the list
            const indexOf = cartList.findIndex(
              eachItem => eachItem.channelId === videoItemDetails.id,
            )
            cartList.splice(indexOf, 1)

            this.setState({save: false})
          }
        }

        const likeButtonColor = like
          ? 'css-like-dislike-button-active'
          : 'css-like-dislike-button-inactive'
        const dislikeButtonColor = dislike
          ? 'css-like-dislike-button-active'
          : 'css-like-dislike-button-inactive'
        console.log(save)

        const saveButtonColor = save
          ? 'css-like-dislike-button-active'
          : 'css-like-dislike-button-inactive'

        return (
          <>
            <div
              className="css-mainbar-container"
              data-testid="videoItemDetails"
            >
              <div>
                <ReactPlayer
                  url={videoItemDetails.video_url}
                  style={{width: '600px'}}
                />
              </div>
              <div>
                <p>{videoItemDetails.title}</p>
                <div className="css-videoItemDetails">
                  <div>
                    <p>
                      {`${videoItemDetails.view_count} views`} |
                      {`${formatDistanceToNow(new Date(date))} ago`}
                    </p>
                  </div>
                  <div>
                    <LikeDislikeSaveButton
                      onClick={this.onClickLikeButton}
                      className={likeButtonColor}
                      type="button"
                    >
                      <AiOutlineLike />
                      {/* <FontAwesomeIcon icon={faThumbsUp} /> */}
                      Like
                    </LikeDislikeSaveButton>
                    <LikeDislikeSaveButton
                      onClick={this.onClickDisLikeButton}
                      className={dislikeButtonColor}
                      type="button"
                    >
                      <AiOutlineDislike />
                      {/* <FontAwesomeIcon icon={faThumbsDown} /> */}
                      Dislike
                    </LikeDislikeSaveButton>
                    <LikeDislikeSaveButton
                      onClick={onClicksaveButton}
                      className={saveButtonColor}
                      type="button"
                    >
                      <AiOutlinePlus />
                      {/* <FontAwesomeIcon icon={faPlus} /> */}
                      {save ? 'saved' : 'save'}
                    </LikeDislikeSaveButton>
                  </div>
                </div>
                <hr />
                <div className="css-videoItemDetails-container">
                  <div style={{margin: '10px'}}>
                    <img
                      src={videoItemDetailsChannel.profile_image_url}
                      alt="channel logo"
                      style={{width: '50px'}}
                    />
                  </div>
                  <div>
                    <p>{videoItemDetailsChannel.name}</p>
                    <p>{`${videoItemDetailsChannel.subscriber_count} subscribers`}</p>
                    <p>{videoItemDetails.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </themeContext.Consumer>
  )

  retryButton = () => {
    this.videoItemDetailsApiUrl()
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
          We are having some trouble to complete your request. Please try again.
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
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.noresults:
        return this.noResultsView()
      default:
        return null
    }
  }

  render() {
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
              <div className={`${backgroundcolorgray} ${textColor}`}>
                {this.statusFunction()}
              </div>
            </>
          )
        }}
      </themeContext.Consumer>
    )
  }
}

export default withRouter(VideoItemDetails)
