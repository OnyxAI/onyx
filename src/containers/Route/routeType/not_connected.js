/* eslint-disable no-nested-ternary */
/**
 *
 * NotConnected
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';
import Loader from 'components/Loader';

import { useInjectSaga } from 'utils/injectSaga';
import saga from '../saga';

export default function NotConnected({
  sockyx,
  verifyTokenFunc,
  isAuthenticated,
  isAuthenticating,
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
      ) : !isAuthenticated ? (
        <div>
          <Route
            {...rest}
            path={path}
            render={props => <Container sockyx={sockyx} {...props} />}
          />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

NotConnected.propTypes = {
  verifyTokenFunc: PropTypes.func,
  path: PropTypes.string,
  container: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  containerType: PropTypes.string,
  user: PropTypes.object,
};
