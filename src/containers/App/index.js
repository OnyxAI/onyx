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

import GlobalStyle from 'global-styles';

import { useInjectSaga } from 'utils/injectSaga';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loader from 'components/Loader';

import { makeSelectNeurons } from './selectors';

import { getNeurons } from '../Neurons/actions';

import Toasts from '../Global/Toasts';

import Main from '../Main/Loadable';
import { Login, Register, Manage } from '../Auth/Loadable';
import Home from '../Home/Loadable';
import DesignSettings from '../DesignSettings/Loadable';
import NotFound from '../NotFound/Loadable';
import CustomRoute from '../Route';

import neuronsSaga from '../Neurons/saga';

export function App({ neurons, getNeuronsFunc, sockyx }) {
  useInjectSaga({ key: 'neurons', saga: neuronsSaga });

  const [all_neurons, setNeurons] = useState([]);

  useEffect(() => {
    getNeuronsFunc();
  }, [0]);

  useMemo(() => {
    if (neurons.neurons.length) {
      const all_neurons = neurons.neurons.map(neuron => {
        const waitForChunk = () => {
          return import(`@neurons/${neuron.raw_name}/index.js`)
            .then(module => module);
        }

        return new Promise(resolve =>
          waitForChunk().then(file => {
            resolve({ name: neuron.raw_name, data: file.default });
          })
        ).catch((e) => {
          // eslint-disable-next-line no-console
          console.error(`Error loading neuron "${neuron.raw_name}": ${e}`);
        });
      });

      Promise.all(all_neurons).then(res => {
        const all_neurons = res.reduce((prev, current) => prev.concat(current), []);

        if (all_neurons.length) {
          setNeurons(all_neurons);
        }
      });
    }
  }, [neurons.loadingNeurons]);

  return (
    <div>
      {neurons.loadingNeurons ? (
        <Loader />
      ) : (
        <div>
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

            {all_neurons.map(neuron => {

              return neuron.data.map(route => (
                <CustomRoute
                  sockyx={sockyx}
                  exact
                  nav
                  container={route}
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
          <Toasts />
          <GlobalStyle />
        </div>
      )}
    </div>
  );
}

App.propTypes = {
  neurons: PropTypes.array,
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
