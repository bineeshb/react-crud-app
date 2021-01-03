const MOCK_DATA = [
  { username: 'admin', password: 'admin', permission: 'all' },
  { username: 'user', password: 'user', permission: 'user' }
];

const DEFAULT_USER = {
  username: null,
  isAdmin: false,
  sessionId: null
};

const getUserDetails = (username, sessionId) => ({
  username,
  isAdmin: MOCK_DATA.some(({ username: name, permission }) => name === username && permission === 'all'),
  sessionId
});

export const authReducer = (state, action) => {
  let returnValue;

  switch(action.type) {
    case 'LOGIN':
      const { inputUsername, inputPassword } = action;
      const isUserValid = MOCK_DATA.some(({ username, password }) => username === inputUsername && password === inputPassword);
      let user = DEFAULT_USER;

      if (isUserValid) {
        const sessionId = Math.random();
        user = getUserDetails(inputUsername, sessionId);
      }

      returnValue = user;
      break;

    case 'LOGOUT':
      returnValue = DEFAULT_USER;
      break;

    default:
      returnValue = state;
  }

  return returnValue;
};
