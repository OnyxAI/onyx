/* eslint-disable no-nested-ternary */
/**
 *
 * OnyxRoute
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';

import makeSelectCurrentUser from './selectors';

import UserConnected from './routeType/user_connected';
import AdminConnected from './routeType/admin_connected';
import NotConnected from './routeType/not_connected';
import Normal from './routeType/normal';

import { verifyToken, logoutUser } from './actions';
import saga from './saga';

export function OnyxRoute({
  verifyTokenFunc,
  logoutUserFunc,
  currentUser,
  routeType,
  container,
  containerType,
  ...rest
}) {
  useInjectSaga({ key: 'currentUser', saga });

  switch (routeType) {
    case 'user_connected':
      return (
        <UserConnected
          container={container}
          containerType={containerType}
          verifyTokenFunc={verifyTokenFunc}
          user={currentUser.user}
          logoutUserFunc={logoutUserFunc}
          isAuthenticated={currentUser.isAuthenticated}
          isAuthenticating={currentUser.isAuthenticating}
          {...rest}
        />
      );
    case 'admin_connected':
      return (
        <AdminConnected
          container={container}
          containerType={containerType}
          verifyTokenFunc={verifyTokenFunc}
          user={currentUser.user}
          logoutUserFunc={logoutUserFunc}
          isAuthenticated={currentUser.isAuthenticated}
          isAuthenticating={currentUser.isAuthenticating}
          {...rest}
        />
      );
    case 'not_connected':
      return (
        <NotConnected
          container={container}
          containerType={containerType}
          verifyTokenFunc={verifyTokenFunc}
          isAuthenticated={currentUser.isAuthenticated}
          isAuthenticating={currentUser.isAuthenticating}
          {...rest}
        />
      );
    case 'normal':
      return (
        <Normal container={container} containerType={containerType} {...rest} />
      );
    default:
      return (
        <Normal container={container} containerType={containerType} {...rest} />
      );
  }
}

OnyxRoute.propTypes = {
  verifyTokenFunc: PropTypes.func,
  logoutUserFunc: PropTypes.func,
  currentUser: PropTypes.object,
  container: PropTypes.func,
  routeType: PropTypes.string,
  containerType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    verifyTokenFunc: () => {
      dispatch(verifyToken());
    },
    logoutUserFunc: () => {
      dispatch(logoutUser());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OnyxRoute);
