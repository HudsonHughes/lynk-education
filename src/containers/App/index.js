/* @flow */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import config from '../../config';
import routes from '../../routes';
// Import your global styles here
import '../../theme/style.css';

export default () => {
  // Use it when sub routes are added to any route it'll work
  const routeWithSubRoutes = route => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );

  return (
    <MuiThemeProvider>
      <div>
        <Helmet {...config.app} />
        <div>
          <img src={require('./assets/logo.svg')} alt="Logo" role="presentation" />
          <h1>{config.app.title}</h1>
        </div>
        <hr />
        <Switch>
          {routes.map(route => routeWithSubRoutes(route))}
        </Switch>
      </div>
    </MuiThemeProvider>
  );
};
