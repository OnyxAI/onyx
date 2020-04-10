/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import LanguageProvider from '@onyx/containers/LanguageProvider';
import { browserHistory } from 'react-router-dom';
import { translationMessages } from '@onyx/i18n';
import configureStore from '@onyx/configureStore';

import NotFound from '../index';
import messages from '../messages';

describe('<NotFound />', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();

  it('should render the Page Not Found text', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <NotFound />
        </LanguageProvider>
      </Provider>,
    );
    expect(
      queryByText(messages.not_found_message.defaultMessage),
    ).not.toBeNull();
  });
});
