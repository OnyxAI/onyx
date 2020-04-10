/**
 * Testing the MainPage
 */

import React from 'react';
import { mount } from 'enzyme';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import configureStore from '@onyx/configureStore';
import { Provider } from 'react-redux';
import { LanguageProvider } from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';

import { Home, mapDispatchToProps } from '../index';

describe('<Home />', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();
  const sockyx = {};
  const getNeuronsFunc = jest.fn();
  const neurons = {
    loadingNeurons: false,
  };

  it('should render the Page Home text', () => {
    mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Home
              sockyx={sockyx}
              getNeuronsFunc={getNeuronsFunc}
              neurons={neurons}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
  });

  it('should dispatch dispatch', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toStrictEqual({ dispatch });
  });
});
