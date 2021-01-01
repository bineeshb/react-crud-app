import { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';

import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: null,
    password: null
  });
  const [loginErrors, setLoginErrors] = useState({});
  const history = useHistory();
  const authContext = useContext(AuthContext);

  function inputLoginDetails(event) {
    const { name, value } = event.target;

    setLoginDetails({ ...loginDetails, [name]: value });
    setLoginErrors({ ...loginErrors, [name]: null });
  }

  function isMinLength(field, value) {
    return value?.length > 0 ? null : `${field} is required`;
  }

  function submitLoginDetails(event) {
    event.preventDefault();

    let formErrors = Object.entries(loginDetails).reduce((formErrors, [field, value]) => {
      const fieldError = isMinLength(field, value);

      if (fieldError !== null) {
        formErrors = {
          ...formErrors,
          [field]: fieldError
        };
      }

      return formErrors;
    }, {});
    let isFormValid = Object.keys(formErrors).length === 0;

    setLoginErrors(formErrors);

    if (isFormValid) {
      const { success } = authContext.login(loginDetails.username, loginDetails.password);

      if (success) {
        history.push('/');
      } else {
        console.error('Invalid credentials');
      }
    } else {
      console.error('Form is invalid', loginErrors);
    }
  }

  return (
    <form onSubmit={submitLoginDetails} noValidate>
      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username*</label>
        <input type="text" name="username" id="username" onChange={inputLoginDetails} required/>
        {loginErrors.username && <div>{loginErrors.username}</div>}
      </div>
      <div>
        <label htmlFor="password">Password*</label>
        <input type="password" name="password" id="password" onChange={inputLoginDetails} required/>
        {loginErrors.password && <div>{loginErrors.password}</div>}
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;
