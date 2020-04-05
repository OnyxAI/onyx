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
import injectNeuron from 'utils/loadNeuron';

import makeSelectCurrentUser from './selectors';

import UserConnected from './routeType/user_connected';
import AdminConnected from './routeType/admin_connected';
import NotConnected from './routeType/not_connected';
import Normal from './routeType/normal';

import { verifyToken, logoutUser } from './actions';
import saga from './saga';

export function OnyxRoute({
  sockyx,
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
      if (containerType === 'neuron') {
        const Neuron = injectNeuron({
          mapDispatchToProps: container.mapDispatchToProps,
          mapStateToProps: container.mapStateToProps,
          reducers: container.reducers,
          sagas: container.sagas,
        })(container.component);

        return (
          <UserConnected
            sockyx={sockyx}
            container={Neuron}
            containerType={containerType}
            verifyTokenFunc={verifyTokenFunc}
            user={currentUser.user}
            logoutUserFunc={logoutUserFunc}
            isAuthenticated={currentUser.isAuthenticated}
            isAuthenticating={currentUser.isAuthenticating}
            {...rest}
          />
        );
      }
      return (
        <UserConnected
          sockyx={sockyx}
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
          sockyx={sockyx}
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
          sockyx={sockyx}
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
        <Normal
          sockyx={sockyx}
          container={container}
          containerType={containerType}
          {...rest}
        />
      );
    default:
      return (
        <Normal
          sockyx={sockyx}
          container={container}
          containerType={containerType}
          {...rest}
        />
      );
  }
}

OnyxRoute.propTypes = {
  sockyx: PropTypes.array,
  verifyTokenFunc: PropTypes.func,
  logoutUserFunc: PropTypes.func,
  currentUser: PropTypes.object,
  container: PropTypes.object,
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
