import React, { ReactElement } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }: any): ReactElement => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...rest} render={() => (isUser ? children : <Redirect to="/login" />)} />
  );
};
export default PrivateRoute;
