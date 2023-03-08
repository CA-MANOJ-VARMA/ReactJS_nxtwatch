import './index.css'
import Header from '../Header'
import SideBar from '../SideBar'
import themeContext from '../../context/themeContext'

const NotFound = () => (
  <themeContext.Consumer>
    {value => {
      const {isDarkThemeActive} = value

      const textColor = isDarkThemeActive
        ? 'css-textColor-dark-color-f9f9f9'
        : 'css-textColor-light-color-0f0f0f'

      const backgroundcolorgray = isDarkThemeActive
        ? 'css-background-dark-color-181818'
        : 'css-background-light-color-f9f9f9'
      const notFoundImage = isDarkThemeActive
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <>
          <Header />
          <SideBar />
          <div
            className={`css-mainbar-container ${backgroundcolorgray} ${textColor}`}
          >
            <div className="css-no-saved-videos-container">
              <img
                src={notFoundImage}
                alt="not found"
                className="css-no-saved-videos-image"
              />
              <h1>Page Not Found</h1>
              <p>we are sorry, the page you requested could not be found.</p>
            </div>
          </div>
        </>
      )
    }}
  </themeContext.Consumer>
)

export default NotFound
