/**
 * Testing the Settings Page
 */

import React from 'react';
import { mount } from 'enzyme';
import { browserHistory } from 'react-router-dom';
import configureStore from '@onyx/configureStore';
import { Provider } from 'react-redux';
import { LanguageProvider } from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import { Settings, mapDispatchToProps } from '../index';

describe('<Settings />', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();

  const getOnyxDataFunc = jest.fn();
  const getTokensFunc = jest.fn();
  const user = { language: 'en-US' };

  it('should render the Page Settings', () => {
    const settings = {};
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Settings
            getOnyxDataFunc={getOnyxDataFunc}
            getTokensFunc={getTokensFunc}
            settings={settings}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    expect(wrapper.exists('Container')).toBe(true);
  });

  it('should render the Page Settings without settings', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Settings
            getOnyxDataFunc={getOnyxDataFunc}
            getTokensFunc={getTokensFunc}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    expect(wrapper.exists('Container')).toBe(false);
  });

  it('should render the Page Settings loading', () => {
    const settings = { loadingData: true, selected: 'data' };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Settings
            getOnyxDataFunc={getOnyxDataFunc}
            getTokensFunc={getTokensFunc}
            settings={settings}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );

    expect(
      wrapper
        .find('span')
        .at(3)
        .hasClass('uk-margin-small-right'),
    ).toBe(true);
  });

  it('should render the Page Settings simulate download data', () => {
    const settings = { selected: 'data' };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Settings
            getOnyxDataFunc={getOnyxDataFunc}
            getTokensFunc={getTokensFunc}
            settings={settings}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper.find('button').simulate('click');

    expect(getOnyxDataFunc).toHaveBeenCalled();
  });

  it('should dispatch getOnyxDataFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getOnyxDataFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Settings/GET_ONYX_DATA',
    });
  });
});
