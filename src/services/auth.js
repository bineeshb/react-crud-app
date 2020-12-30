const MOCK_DATA = [
  { username: 'admin', password: 'admin', permission: 'all' },
  { username: 'user', password: 'user', permission: 'user' }
];

const storageKey = 'userDetails';

class AuthService {
  user = {
    username: null,
    isAdmin: false,
    sessionId: null
  };

  constructor() {
    this.user = this.getLoggedUser();
  }

  loginUser(inputUsername, inputPassword) {
    const isUserValid = MOCK_DATA.some(({ username, password }) => username === inputUsername && password === inputPassword);

    if (isUserValid) {
      const sessionId = Math.random();
      this.user = this.getUserDetails(inputUsername, sessionId);
      sessionStorage.setItem(storageKey, JSON.stringify(this.user));
    }

    return { success: isUserValid, user: this.user };
  }

  logoutUser() {
    // console.log('auth - logoutUser');
    sessionStorage.clear();
    this.user = {
      username: null,
      isAdmin: false,
      sessionId: null
    };

    return { success: true }
  }

  isUserValid() {
    const loggedUserSession = this.getLoggedUser().sessionId;
    // console.log('isUserValid', !!loggedUserSession && loggedUserSession === this.user.sessionId);
    return !!loggedUserSession && loggedUserSession === this.user.sessionId;
  }

  getLoggedUser() {
    const loggedUser = sessionStorage.getItem(storageKey);
    // console.log('loggedUser', loggedUser);
    return loggedUser ? JSON.parse(loggedUser) : ({
      username: null,
      isAdmin: false,
      sessionId: null
    });
  }

  getUserDetails(username, sessionId) {
    return {
      username,
      isAdmin: MOCK_DATA.some(({ username: name, permission }) => name === username && permission === 'all'),
      sessionId
    }
  }
}

export default AuthService;