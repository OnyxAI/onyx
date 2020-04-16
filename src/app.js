// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import UI KIT
import '@onyx/assets/css/uikit.css';

// Import Materialize CSS
import '@onyx/assets/css/materialize.css';

// Import Custom
import '@onyx/assets/css/colors.css';
import '@onyx/assets/css/custom.css';
import '@onyx/assets/css/button.css';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from '@onyx/utils/history';
import 'sanitize.css/sanitize.css';

import { Context } from '@onyx/utils/getContext';

// Import root app
import App from '@onyx/containers/App';

// Load the favicon
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./assets/img/favicon.ico';
/* eslint-enable import/no-unresolved, import/extensions */

import { WS_URL } from '@onyx/global/constants';

import configureStore from './configureStore';

require('@onyx/assets/js/uikit-icons'); // eslint-disable-line global-require
require('@onyx/assets/js/uikit'); // eslint-disable-line global-require

// Create redux store with history
const initialState = {};
export const store = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('app');
export const sockyx = new WebSocket(WS_URL);

const render = () => {
  ReactDOM.render(
    <Provider store={store} context={Context}>
      <ConnectedRouter history={history}>
        <App sockyx={sockyx} />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', '@onyx/containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render())
    .catch(err => {
      throw err;
    });
} else {
  render();
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
