/**
 * Testing the MainPage
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import configureStore from '@onyx/configureStore';
import history from '@onyx/utils/history';

import Main from '../index';

describe('<Main />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({}, history);

    store.dispatch = jest.fn();
  });

  it('should render the Page Main text', () => {
    const container = renderer.create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Main />
        </IntlProvider>
      </Provider>,
    );
    expect(container.toJSON().children).toStrictEqual(['Welcome to main']);
  });
});
