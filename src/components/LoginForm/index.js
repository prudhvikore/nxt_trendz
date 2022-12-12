import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'http://localhost:8000/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="data:image/png;base64,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"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <h3 aria-label="heading" className="login_heading">
            Login
          </h3>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="btn-cont">
            <button
              type="submit"
              className="login button"
              data-testid="login-test"
            >
              Login
            </button>
          </div>

          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
