import React from 'react';
import { render } from 'react-testing-library';

import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import configureStore from '@onyx/configureStore';
import history from '@onyx/utils/history';

import Toasts from '../Toasts';

describe('<Toast />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({}, history);

    store.dispatch = jest.fn();
  });

  it('should render an <ul> tag', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Toasts />
        </IntlProvider>
      </Provider>,
    );

    expect(firstChild.tagName).toEqual('UL');
  });
  /*
  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<Form id={id} />);
    expect(firstChild.id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const {
      container: { firstChild },
    } = render(<Form attribute="test" />);
    expect(firstChild.hasAttribute('attribute')).toBe(false);
  });
  */
});
