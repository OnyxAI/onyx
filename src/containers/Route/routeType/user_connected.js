/* eslint-disable no-nested-ternary */
/**
 *
 * UserConnected
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';
import Loader from '@onyx/components/Loader';
import Nav from '@onyx/containers/Nav/Loadable';

import { useInjectSaga } from '@onyx/utils/injectSaga';
import saga from '../saga';

export default function UserConnected({
  sockyx,
  neurons,
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

  useEffect(() => {
    verifyTokenFunc();
  }, [0]);

  return (
    <div>
      {isAuthenticating ? (
        <Loader />
      ) : isAuthenticated ? (
        <div>
          {rest.nav && (
            <Nav
              sockyx={sockyx}
              neurons={neurons}
              user={user}
              logoutUserFunc={logoutUserFunc}
            />
          )}
          <div className="main-container container">
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
        <Redirect to="/hello" />
      )}
    </div>
  );
}

UserConnected.propTypes = {
  sockyx: PropTypes.object,
  verifyTokenFunc: PropTypes.func,
  logoutUserFunc: PropTypes.func,
  path: PropTypes.string,
  container: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  containerType: PropTypes.string,
  user: PropTypes.object,
  neurons: PropTypes.object,
};
