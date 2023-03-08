import './App.css'
import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import themeContext from './context/themeContext'
import savedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

// Replace your code here

class App extends Component {
  state = {isDarkThemeActive: false, cartList: []}

  onChangeTheme = isDarkThemeActive => {
    this.setState({isDarkThemeActive})
  }

  onClickAddVideo = pushVideoItemDetails => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList, pushVideoItemDetails],
    }))
  }

  onClickDeleteVideo = () => {}

  render() {
    const {isDarkThemeActive, cartList} = this.state
    return (
      <themeContext.Provider
        value={{
          isDarkThemeActive,
          cartList,
          onChangeTheme: this.onChangeTheme,
          onClickAddVideo: this.onClickAddVideo,
          onClickDeleteVideo: this.onClickDeleteVideo,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={savedVideos}
            />
            <Route exact path="/bad-path" component={NotFound} />
            <Redirect to="/bad-path" />
          </Switch>
        </>
      </themeContext.Provider>
    )
  }
}

export default App
