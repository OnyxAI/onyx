/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable global-require */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import GlobalStyle from '@onyx/global-styles';

import { useInjectSaga } from '@onyx/utils/injectSaga';
import { useInjectReducer } from '@onyx/utils/injectReducer';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loader from '@onyx/components/Loader';

// Import Language Provider
import LanguageProvider from '@onyx/containers/LanguageProvider';

// Import i18n messages
import { translationMessages } from '@onyx/i18n';

import { makeSelectNeurons, makeSelectInstall } from './selectors';

import { getNeurons } from '../Neurons/actions';
import { getInstall } from '../Install/actions';

import Toasts from '../Global/Toasts';

import Main from '../Main/Loadable';
import Screen from '../Screen/Loadable';
import { Login, Register, Manage } from '../Auth/Loadable';
import Home from '../Home/Loadable';
import DesignSettings from '../DesignSettings/Loadable';
import Neurons from '../Neurons/Loadable';
import Settings from '../Settings/Loadable';
import NotFound from '../NotFound/Loadable';
import Notifications from '../Notifications/Loadable';

import Install from '../Install/Loadable';

import CustomRoute from '../Route';

import neuronsSaga from '../Neurons/saga';

import installSaga from '../Install/saga';
import installReducer from '../Install/reducer';

function loadComponent(scope, module) {
  window[scope].override(
    Object.assign(
      {
        react: () => Promise.resolve().then(() => () => require('react')),
        'react-dom': () =>
          Promise.resolve().then(() => () => require('react-dom')),
        redux: () => Promise.resolve().then(() => () => require('redux')),
        'react-redux': () =>
          Promise.resolve().then(() => () => require('react-redux')),
        'react-intl': () =>
          Promise.resolve().then(() => () => require('react-intl')),
      },
      __webpack_require__.O,
    ),
  );

  return window[scope].get(module).then(factory => {
    const Module = factory();
    return Module;
  });
}

const useDynamicScript = args => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement('script');

    element.src = args.url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);

    element.onload = () => {
      console.log(`Neuron Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Neuron Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Neuron Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

function GetComponent(props) {
  const { ready, failed } = useDynamicScript({
    url: props.neuronSettings && props.neuronSettings.url,
  });

  if (!props.neuronSettings) {
    return <div />;
  }

  if (!ready) {
    return <span className="uk-margin-small-right" uk-spinner="ratio: 1" />;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.neuronSettings.url}</h2>;
  }
  const Component = React.lazy(() =>
    loadComponent(props.neuronSettings.scope, props.neuronSettings.module),
  );

  return (
    <React.Suspense
      fallback={
        <span
          className="uk-margin-small-right uk-position-center"
          uk-spinner="ratio: 2"
        />
      }
    >
      <Component {...props} />
    </React.Suspense>
  );
}

export function App({
  neurons,
  getNeuronsFunc,
  install,
  getInstallFunc,
  sockyx,
}) {
  useInjectReducer({ key: 'install', reducer: installReducer });
  useInjectSaga({ key: 'neurons', saga: neuronsSaga });
  useInjectSaga({ key: 'install', saga: installSaga });

  const loadScript = url =>
    new Promise(resolve => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.async = true;
      script.addEventListener('load', () => {
        resolve(script);
      });
      document.head.appendChild(script);
    });

  const getMessages = allNeurons => {
    if (translationMessages) {
      const messages = translationMessages;

      allNeurons.map(neuron =>
        loadScript(`/neurons/${neuron.raw_name}/remoteEntry.js`).then(() =>
          loadComponent(neuron.raw_name, 'i18n').then(i18n => {
            Object.keys(i18n.translationMessages).forEach(lang => {
              Object.assign(messages[lang], i18n.translationMessages[lang]);
            });
          }),
        ),
      );

      return messages;
    }
  };

  useEffect(() => {
    getInstallFunc();
    getNeuronsFunc();
  }, [0]);

  return (
    <div>
      {neurons.loadingNeurons ? (
        <Loader />
      ) : (
        <LanguageProvider messages={getMessages(neurons.neurons)}>
          <div>
            {!install.loading && install.isInstalled === 'true' ? (
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
                  container={Notifications}
                  containerType="native"
                  routeType="user_connected"
                  path="/notifications"
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
                  container={Screen}
                  containerType="native"
                  routeType="user_connected"
                  path="/screen"
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

                {neurons.neurons.map(neuron => {
                  const { routes } = neuron;

                  return routes.map(route => (
                    <CustomRoute
                      sockyx={sockyx}
                      exact
                      nav
                      neuronSettings={{
                        url: `/neurons/${route.raw}/remoteEntry.js`,
                        scope: route.raw,
                        module: route.name,
                      }}
                      container={GetComponent}
                      containerType="neuron"
                      routeType="user_connected"
                      path={route.url}
                    />
                  ));
                })}

                <CustomRoute
                  sockyx={sockyx}
                  container={NotFound}
                  containerType="native"
                  routeType="normal"
                />
              </Switch>
            ) : (
              <Switch>
                <CustomRoute
                  sockyx={sockyx}
                  container={Install}
                  containerType="native"
                  routeType="normal"
                />
              </Switch>
            )}

            <Toasts />
            <GlobalStyle />
          </div>
        </LanguageProvider>
      )}
    </div>
  );
}

App.propTypes = {
  sockyx: PropTypes.object,
  neurons: PropTypes.object,
  getNeuronsFunc: PropTypes.func,
  install: PropTypes.object,
  getInstallFunc: PropTypes.func,
};

GetComponent.propTypes = {
  neuronSettings: PropTypes.object,
  url: PropTypes.string,
  scope: PropTypes.string,
  module: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  neurons: makeSelectNeurons(),
  install: makeSelectInstall(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNeuronsFunc: () => {
      dispatch(getNeurons());
    },
    getInstallFunc: () => {
      dispatch(getInstall());
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
