import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import AuthContextProvider from './contexts/AuthContext';
import ItemsContextProvider from './contexts/ItemsContext';

import Home from './pages/Home';
import Login from './pages/Login';


function App() {
  const isUserValid = () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('userDetails'));
    return loggedInUser && loggedInUser.sessionId !== null ? true : false;
  };

  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" render={() => (
              !isUserValid() ? <Login /> : <Redirect to="/" />
            )} />
            <ItemsContextProvider>
              <Route exact path="/" render={() => (
                isUserValid() ? <Home /> : <Redirect to="/login" />
              )} />
            </ItemsContextProvider>
          </Switch>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
