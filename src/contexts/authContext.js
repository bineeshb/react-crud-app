import { createContext, useReducer, useEffect } from 'react';

import { authReducer } from '../reducers/authReducer';

export const AuthContext = createContext();

const storageKey = 'userDetails';

const AuthContextProvider = props => {
  const getLoggedUser = () => {
    const loggedUser = sessionStorage.getItem(storageKey);

    return loggedUser ? JSON.parse(loggedUser) : ({
      username: null,
      isAdmin: false,
      sessionId: null
    });
  };
  const [user, authDispatch] = useReducer(authReducer, {}, getLoggedUser);

  useEffect(() => {
    const { username, sessionId } = user;

    if (username && sessionId) {
      sessionStorage.setItem(storageKey, JSON.stringify(user));
    } else {
      sessionStorage.clear();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, authDispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}
 
export default AuthContextProvider;
