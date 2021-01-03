import { Redirect, Route } from 'react-router-dom';

const GuardedRoute = ({ component: Component, navigateIf, failRedirect, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
        navigateIf ? <Component {...rest} {...props} /> : <Redirect to={failRedirect} />
    )}/>
  );
}
 
export default GuardedRoute;
