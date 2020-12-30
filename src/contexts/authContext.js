import { createContext, Component } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.authService = props.authService;
    this.state = {
      user: this.authService.getLoggedUser(),
      isUserValid: this.authService.isUserValid()
    };
  }

  login = (username, password) => {
    const { success, user } = this.authService.loginUser(username, password);

    if (success) {
      this.setState({ user, isUserValid: success });
    }

    return { success };
  }

  logout = () => {
    const { success } = this.authService.logoutUser();
    this.setState({
      user: {
        username: null,
        isAdmin: false,
        sessionId: null
      },
      isUserValid: false
    });
    return { success };
  }

  render() { 
    return (
      <AuthContext.Provider value={{ ...this.state, login: this.login, logout: this.logout }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default AuthContextProvider;