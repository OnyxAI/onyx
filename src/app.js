// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import UI KIT
import 'assets/css/uikit.css';

// Import Materialize CSS
import 'assets/css/materialize.css';

// Import Custom
import 'assets/css/colors.css';
import 'assets/css/custom.css';
import 'assets/css/button.css';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

import { Context } from 'utils/getContext';

// Import Sockyx

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./assets/img/favicon.ico';
/* eslint-enable import/no-unresolved, import/extensions */

import { WS_URL } from 'global/constants';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

require('assets/js/uikit-icons'); // eslint-disable-line global-require
require('assets/js/uikit'); // eslint-disable-line global-require

// Create redux store with history
const initialState = {};
export const store = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('app');
export const sockyx = new WebSocket(WS_URL);

const render = messages => {
  ReactDOM.render(
    <Provider store={store} context={Context}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App sockyx={sockyx} />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
