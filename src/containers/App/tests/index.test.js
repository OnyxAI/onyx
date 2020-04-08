import React from 'react';
import { render } from 'react-testing-library';

import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router';

import configureStore from '@onyx/configureStore';
import history from '@onyx/utils/history';

import App from '../index';

describe('<Toast />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({}, history);

    store.dispatch = jest.fn();
  });

  it('should render an <div> tag', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(firstChild.tagName).toEqual('DIV');
  });
});
