import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import AuthService from './services/auth';
import AuthContextProvider from './contexts/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';


function App() {
  const authService = new AuthService();

  return (
    <AuthContextProvider authService={authService}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" render={() => (
              !authService.isUserValid() ? <Login /> : <Redirect to="/" />
            )} />
            <Route exact path="/" render={() => (
              authService.isUserValid() ? <Home /> : <Redirect to="/login" />
            )} />
          </Switch>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
