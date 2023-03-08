import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import themeContext from '../../context/themeContext'
import {LoginButton} from '../styledComponents'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    ischecked: false,
    errormsg: '',
    errorMsgDisplay: false,
  }

  // checkbox to show or hide the password
  checkbox = () => {
    const {ischecked} = this.state
    this.setState({ischecked: !ischecked})
  }

  // username change value
  username = event => {
    this.setState({username: event.target.value})
  }

  // password change value
  password = event => {
    this.setState({password: event.target.value})
  }

  //  submitForm
  onClickButton = async event => {
    event.preventDefault()

    const submitSucces = jwtToken => {
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    }

    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    // console.log(response.status_code)
    const jsonData = await response.json()
    console.log(jsonData)
    if (response.ok === true) {
      submitSucces(jsonData.jwt_token)
    }
    if (jsonData.status_code === 400) {
      console.log(jsonData.error_msg)
      this.setState({errormsg: jsonData.error_msg, errorMsgDisplay: true})
    }
  }

  render() {
    const {
      username,
      password,
      ischecked,
      errormsg,
      errorMsgDisplay,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <themeContext.Consumer>
        {value => {
          const {isDarkThemeActive} = value

          const logoUrl = isDarkThemeActive
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const backgroundcolorgray = isDarkThemeActive
            ? 'css-background-dark-color-181818'
            : 'css-background-light-color-f9f9f9'

          const backgroundcolor = isDarkThemeActive
            ? 'css-background-dark-color-0f0f0f'
            : 'css-background-light-color-f9f9f9'

          const textColor = isDarkThemeActive
            ? 'css-textColor-dark-color-f9f9f9'
            : 'css-textColor-light-color-0f0f0f'

          return (
            <div className={`css-login-container ${backgroundcolorgray}`}>
              <div
                style={{
                  borderStyle: 'solid',
                  borderColor: 'black',
                  marginBottom: '50px',
                  padding: '5px',
                }}
                className={textColor}
              >
                <p>
                  To SignIn - USERNAME - &apos;rahul&apos; and PASSWORD -
                  &apos;rahul@2021&apos;
                </p>
              </div>
              <form className={`css-login-form-container ${backgroundcolor}`}>
                <div>
                  <img
                    src={logoUrl}
                    alt="website logo"
                    className="css-websitelogo"
                  />
                </div>
                <div style={{margin: '15px'}}>
                  <label htmlFor="username" className={textColor}>
                    USERNAME
                  </label>
                  <br />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    placeholder="username"
                    onChange={this.username}
                    className={`css-input-password-itself ${backgroundcolor} ${textColor}`}
                  />
                </div>
                <div style={{margin: '15px'}}>
                  <label htmlFor="password" className={textColor}>
                    PASSWORD
                  </label>
                  <br />
                  <input
                    type={ischecked ? 'text' : 'password'}
                    id="password"
                    value={password}
                    placeholder="password"
                    onChange={this.password}
                    className={`css-input-password-itself ${backgroundcolor} ${textColor}`}
                  />
                  <br />
                  <div style={{display: 'flex', textAlign: 'center'}}>
                    <input
                      type="checkbox"
                      id="checkbox"
                      onClick={this.checkbox}
                    />
                    <label htmlFor="checkbox" className={textColor}>
                      show password
                    </label>
                  </div>
                </div>
                <div>
                  <LoginButton onClick={this.onClickButton}>Login</LoginButton>
                </div>
                <p style={{color: 'red'}}>
                  {errorMsgDisplay ? `*${errormsg}` : ''}
                </p>
              </form>
            </div>
          )
        }}
      </themeContext.Consumer>
    )
  }
}

export default Login
