import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { AuthContext } from "../contexts/AuthContext";

class Login extends Component {
  state = {
    loginDetails: {
      username: null,
      password: null
    },
    loginErrors: {},
    isFormSubmitted: false
  };

  static contextType = AuthContext;

  get loginFormErrors() {
    return Object.entries(this.state.loginDetails).reduce((formErrors, [field, value]) => {
      const fieldError = this.isMinLength(field, value);

      if (fieldError !== null) {
        formErrors = {
          ...formErrors,
          [field]: fieldError
        };
      }

      return formErrors;
    }, {});
  }

  componentDidUpdate() {
    if (this.state.isFormSubmitted) {
      if (this.context.user.sessionId !== null) {
        this.props.history.push('/');
      } else {
        console.error('Invalid credentials');
      }

      this.setState({ isFormSubmitted: false });
    }
  }

  inputLoginDetails(event) {
    const { name, value } = event.target;

    this.setState({
      loginDetails: {
        ...this.state.loginDetails,
        [name]: value
      },
      loginErrors: {
        ...this.state.loginErrors,
        [name]: null
      }
    });
  }

  isMinLength(field, value) {
    return value?.length > 0 ? null : `${field} is required`;
  }

  submitLoginDetails(event) {
    event.preventDefault();

    const isFormValid = Object.keys(this.loginFormErrors).length === 0;
    const { username, password } = this.state.loginDetails;

    this.setState({
      loginErrors: this.loginFormErrors
    });

    if (isFormValid) {
      this.context.authDispatch({
        type: 'LOGIN',
        inputUsername: username,
        inputPassword: password
      });

      this.setState({ isFormSubmitted: true });
    } else {
      console.error('Form is invalid', this.state.loginErrors);
    }
  }

  render() { 
    return (
      <form onSubmit={event => this.submitLoginDetails(event)} noValidate>
        <h1>Login</h1>
        <div>
          <label htmlFor="username">Username*</label>
          <input type="text" name="username" id="username" onChange={event => this.inputLoginDetails(event)} required/>
          {this.state.loginErrors.username && <div>{this.state.loginErrors.username}</div>}
        </div>
        <div>
          <label htmlFor="password">Password*</label>
          <input type="password" name="password" id="password" onChange={event => this.inputLoginDetails(event)} required/>
          {this.state.loginErrors.password && <div>{this.state.loginErrors.password}</div>}
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}
 
export default withRouter(Login);
