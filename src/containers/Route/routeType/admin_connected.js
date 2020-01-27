/* eslint-disable no-nested-ternary */
/**
 *
 * AdminConnected
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';
import Loader from 'components/Loader';

import { useInjectSaga } from 'utils/injectSaga';
import saga from '../saga';

export default function AdminConnected({
  verifyTokenFunc,
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
        user.account_type === 1 && (
          <div>
            <div className="container main-container">
              <Route
                {...rest}
                path={path}
                render={props => <Container user={user} {...props} />}
              />
            </div>
          </div>
        )
      ) : (
        <Redirect to="/hello" />
      )}
    </div>
  );
}

AdminConnected.propTypes = {
  verifyTokenFunc: PropTypes.func,
  path: PropTypes.string,
  container: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  containerType: PropTypes.string,
  user: PropTypes.object,
};
