import { FC } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { PrivateRoute, Login, Dashboard, AuthWrapper, Error } from 'pages';
import { ReturnComponentType } from 'types';

export const App: FC = (): ReturnComponentType => (
  <AuthWrapper>
    <Router>
      <Switch>
        <PrivateRoute path="/" exact>
          <Dashboard />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  </AuthWrapper>
);
