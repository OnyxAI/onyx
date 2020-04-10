/**
 *
 * Tests for DesignSettings
 *
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from '@onyx/configureStore';
import { browserHistory } from 'react-router-dom';
import DesignSettings from '../Loadable';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<DesignSettings />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ color: 'blue' }, browserHistory);

    store.dispatch = jest.fn();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <DesignSettings dispatch={dispatch} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
