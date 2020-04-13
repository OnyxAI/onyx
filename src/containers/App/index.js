/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import GlobalStyle from '@onyx/global-styles';

import { useInjectSaga } from '@onyx/utils/injectSaga';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loader from '@onyx/components/Loader';

import { makeSelectNeurons } from './selectors';

import { getNeurons } from '../Neurons/actions';

import Toasts from '../Global/Toasts';

import Main from '../Main/Loadable';
import { Login, Register, Manage } from '../Auth/Loadable';
import Home from '../Home/Loadable';
import DesignSettings from '../DesignSettings/Loadable';
import Neurons from '../Neurons/Loadable';
import Settings from '../Settings/Loadable';
import NotFound from '../NotFound/Loadable';
import CustomRoute from '../Route';

import neuronsSaga from '../Neurons/saga';

function loadComponent(scope, module) {
  return async () => {
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  }
}

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return
    }

    const element = document.createElement('script');

    element.src = args.url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true)
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    }
  }, [args.url]);

  return {
    ready,
    failed,
  }
};

function System(props) {
  const { ready, failed } = useDynamicScript({
    url: props.system && props.system.url
  });

  if (!props.system) {
    return <h2>Not system specified</h2>
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.system.url}</h2>
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.system.url}</h2>
  }

  const Component = React.lazy(loadComponent(props.system.scope, props.system.module));

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  )
}

export function App({ neurons, getNeuronsFunc, sockyx }) {
  useInjectSaga({ key: 'neurons', saga: neuronsSaga });

  const [system, setSystem] = React.useState(undefined);

  useEffect(() => {
    getNeuronsFunc();
    /**
    setSystem({
      url: 'http://localhost:3002/remoteEntry.js',
      scope: 'calendar',
      module: 'calendar'
    })
     */
  }, [0]);


  return (
    <div>
      {neurons.loadingNeurons ? (
        <Loader />
      ) : (
        <div>
          <System system={system} />
          <Switch>
            <CustomRoute
              sockyx={sockyx}
              exact
              container={Home}
              containerType="native"
              routeType="not_connected"
              path="/hello"
            />
            <CustomRoute
              sockyx={sockyx}
              exact
              container={Login}
              containerType="native"
              routeType="not_connected"
              path="/login"
            />
            <CustomRoute
              sockyx={sockyx}
              exact
              container={Register}
              containerType="native"
              routeType="not_connected"
              path="/register"
            />
            <CustomRoute
              sockyx={sockyx}
              exact
              nav
              container={Main}
              containerType="native"
              routeType="user_connected"
              path="/"
            />
            <CustomRoute
              sockyx={sockyx}
              exact
              nav
              container={DesignSettings}
              containerType="native"
              routeType="user_connected"
              path="/user/design"
            />
            <CustomRoute
              sockyx={sockyx}
              exact
              nav
              container={Manage}
              containerType="native"
              routeType="user_connected"
              path="/user/manage"
            />
            <CustomRoute
              sockyx={sockyx}
              exact
              nav
              container={Settings}
              containerType="native"
              routeType="admin_connected"
              path="/settings"
            />
            <CustomRoute
              sockyx={sockyx}
              exact
              nav
              container={Neurons}
              containerType="native"
              routeType="user_connected"
              path="/neurons"
            />

            <CustomRoute
              sockyx={sockyx}
              container={NotFound}
              containerType="native"
              routeType="normal"
            />
          </Switch>
          <Toasts />
          <GlobalStyle />
        </div>
      )}
    </div>
  );
}

App.propTypes = {
  sockyx: PropTypes.object,
  neurons: PropTypes.object,
  getNeuronsFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  neurons: makeSelectNeurons(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNeuronsFunc: () => {
      dispatch(getNeurons());
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
)(App);
