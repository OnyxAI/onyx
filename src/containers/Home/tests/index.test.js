/**
 * Testing the MainPage
 */

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import configureStore from '@onyx/configureStore';
import history from '@onyx/utils/history';

import Home from '../index';

describe('<Home />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({}, history);

    store.dispatch = jest.fn();
  });

  it('should render the Page Home text', () => {
    mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Home />
        </IntlProvider>
      </Provider>,
    );
  });
});
