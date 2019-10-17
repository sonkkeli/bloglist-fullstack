import React from 'react'
import PropTypes from 'prop-types'
import  { useField } from '../hooks/index'

const LoginForm = ({
  handleLogin
}) => {

  const username = useField('text')
  const password = useField('text') 

  return (
    <div >
      <h2>Login</h2>
      <br/>
      <form onSubmit={handleLogin} data-testid="loginform">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">username</span>
          </div>
          <input className="form-control"
            id='username'
            name="Username"
            {...username}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">password</span>
          </div>
          <input className="form-control"            
            name="Password"
            id='password'
            type="password"
            {...password}
          />
        </div>
        <button type="submit" className="btn btn-dark">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired  
}

export default LoginForm