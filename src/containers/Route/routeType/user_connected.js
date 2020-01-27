/* eslint-disable no-nested-ternary */
/**
 *
 * UserConnected
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';
import Loader from 'components/Loader';

import { useInjectSaga } from 'utils/injectSaga';
import saga from '../saga';

export default function UserConnected({
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
          <div className="container main-container">
            <button type="button" onClick={() => logoutUserFunc()}>
              LOGOUT
            </button>
            <Route
              {...rest}
              path={path}
              render={props => <Container user={user} {...props} />}
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
  verifyTokenFunc: PropTypes.func,
  logoutUserFunc: PropTypes.func,
  path: PropTypes.string,
  container: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  containerType: PropTypes.string,
  user: PropTypes.object,
};
