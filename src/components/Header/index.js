import {Component} from 'react'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {
  LogoutButton,
  ThemeButton,
  MarginDiv,
  ConfirmButton,
  CancelButton,
} from '../styledComponents'
import themeContext from '../../context/themeContext'

import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <themeContext.Consumer>
        {value => {
          const {isDarkThemeActive, onChangeTheme} = value

          const changeThemeButton = () => {
            onChangeTheme(!isDarkThemeActive)
          }

          const logoUrl = isDarkThemeActive
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const backgroundcolorgray = isDarkThemeActive
            ? 'css-background-dark-color-181818'
            : 'css-background-light-color-f9f9f9'

          const textColor = isDarkThemeActive
            ? 'css-textColor-dark-color-f9f9f9'
            : 'css-textColor-light-color-0f0f0f'

          const themeButton = isDarkThemeActive ? 'Light Theme' : 'Dark Theme'

          return (
            <>
              <div
                data-testid="Home"
                className={`css-header-container ${backgroundcolorgray}`}
              >
                <Link to="/">
                  <img
                    src={logoUrl}
                    alt="website logo"
                    style={{height: '40px', margin: '10px'}}
                  />
                </Link>
                <div className="css-logout-theme-profile-container">
                  <MarginDiv className="css-button-container-for-">
                    <ThemeButton
                      onClick={changeThemeButton}
                      className={textColor}
                      data-testid="theme"
                    >
                      {themeButton}
                    </ThemeButton>
                  </MarginDiv>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    style={{height: '30px'}}
                  />
                  <Popup
                    modal
                    trigger={
                      <MarginDiv data-testid="close">
                        <LogoutButton className={textColor} data-testid="close">
                          Logout
                        </LogoutButton>
                      </MarginDiv>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <>
                        <div
                          className={`css-popup-container ${backgroundcolorgray}`}
                        >
                          <div
                            className={`css-trigger-button-div ${textColor}`}
                          >
                            <p style={{fontSize: '20px'}}>
                              Are you sure, you want to logout?
                            </p>
                          </div>
                          <div className="css-cancel-confirm-button">
                            <CancelButton
                              type="button"
                              onClick={() => close()}
                              className={textColor}
                            >
                              Cancel
                            </CancelButton>
                            <ConfirmButton
                              type="button"
                              onClick={this.onClickLogout}
                            >
                              Confirm
                            </ConfirmButton>
                          </div>
                        </div>
                      </>
                    )}
                  </Popup>
                </div>
              </div>
            </>
          )
        }}
      </themeContext.Consumer>
    )
  }
}

export default withRouter(Header)
