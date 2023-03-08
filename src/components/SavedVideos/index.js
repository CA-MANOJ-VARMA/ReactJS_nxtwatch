import './index.css'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Header from '../Header'
import SideBar from '../SideBar'
import themeContext from '../../context/themeContext'

const savedVideos = () => (
  <themeContext.Consumer>
    {value => {
      const {isDarkThemeActive, cartList} = value

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
            data-testid="savedVideos"
          >
            {cartList.length === 0 ? (
              <div className="css-no-saved-videos-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                  className="css-no-saved-videos-image"
                />
                <h1>No saved videos found</h1>
                <p>You can save your videos while watching them</p>
              </div>
            ) : (
              <ul className="css-ul-saved-videos-container">
                {cartList.map(eachItem => (
                  <li
                    key={eachItem.channelId}
                    className="css-list-trending-container"
                  >
                    <Link
                      to={`/videos/${eachItem.channelId}`}
                      className={`css-saved-Link-property ${backgroundcolorgray} ${textColor}`}
                    >
                      <div>
                        <img
                          src={eachItem.channelThumbnailUrl}
                          alt={eachItem.channelName}
                          style={{width: '270px', margin: '10px'}}
                        />
                      </div>
                      <div className="css-icon-titlepart-container">
                        <div style={{margin: '20px'}}>
                          <img
                            src={eachItem.channelProfileImageUrl}
                            alt={eachItem.channelName}
                            style={{width: '50px'}}
                          />
                        </div>
                        <div>
                          <p style={{fontWeight: 'bold'}}>
                            {eachItem.channelTitle}
                          </p>
                          <p>{eachItem.channelName}</p>
                          <p>
                            {`${eachItem.channelViewCount} views`} |
                            {` ${formatDistanceToNow(
                              new Date(eachItem.channelPublishedAt),
                            )} ago`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )
    }}
  </themeContext.Consumer>
)

export default savedVideos
