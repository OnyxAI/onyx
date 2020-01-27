/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch } from 'react-router-dom';

import GlobalStyle from 'global-styles';
import Toasts from '../Global/Toasts';

import Main from '../Main/Loadable';
import { Login, Register } from '../Auth/Loadable';
import Home from '../Home/Loadable';
import NotFound from '../NotFound/Loadable';
import CustomRoute from '../Route';

export default function App() {
  return (
    <div>
      <Switch>
        <CustomRoute
          exact
          container={Home}
          containerType="native"
          routeType="not_connected"
          path="/hello"
        />
        <CustomRoute
          exact
          container={Login}
          containerType="native"
          routeType="not_connected"
          path="/login"
        />
        <CustomRoute
          exact
          container={Register}
          containerType="native"
          routeType="not_connected"
          path="/register"
        />
        <CustomRoute
          exact
          container={Main}
          containerType="native"
          routeType="user_connected"
          path="/"
        />
        <CustomRoute
          container={NotFound}
          containerType="native"
          routeType="normal"
        />
      </Switch>
      <Toasts />
      <GlobalStyle />
    </div>
  );
}
