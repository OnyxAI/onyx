/* eslint-disable no-nested-ternary */
/**
 *
 * AdminConnected
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';
import Loader from '@onyx/components/Loader';
import Nav from '@onyx/containers/Nav/Loadable';

import { useInjectSaga } from '@onyx/utils/injectSaga';
import saga from '../saga';

export default function AdminConnected({
  sockyx,
  verifyTokenFunc,
  logoutUserFunc,
  isAuthenticated,
  isAuthenticating,
  user,
  path,
  containerType,
  container: Container,
  ...rest
}) {
  useInjectSaga({ key: 'currentUser', saga });

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    verifyTokenFunc();
  }, [token]);

  return (
    <div>
      {isAuthenticating ? (
        <Loader />
      ) : isAuthenticated ? (
        user.account_type === 1 ? (
          <div>
            {rest.nav && (
              <Nav
                sockyx={sockyx}
                user={user}
                logoutUserFunc={logoutUserFunc}
              />
            )}
            <div className="container main-container">
              <Route
                {...rest}
                path={path}
                render={props => (
                  <Container sockyx={sockyx} user={user} {...props} />
                )}
              />
            </div>
          </div>
        ) : (
          <Redirect to="/" />
        )
      ) : (
        <Redirect to="/hello" />
      )}
    </div>
  );
}

AdminConnected.propTypes = {
  sockyx: PropTypes.object,
  verifyTokenFunc: PropTypes.func,
  logoutUserFunc: PropTypes.func,
  path: PropTypes.string,
  container: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  containerType: PropTypes.string,
  user: PropTypes.object,
};
