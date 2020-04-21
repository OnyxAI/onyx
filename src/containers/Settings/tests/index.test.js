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
  const addTokenFunc = jest.fn();
  const deleteTokenFunc = jest.fn();
  const changeSelectedFunc = jest.fn();
  const changeTokenNameFunc = jest.fn();
  const user = { language: 'en-US' };

  it('should render the Page Settings', () => {
    const settings = {};
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Settings
            getOnyxDataFunc={getOnyxDataFunc}
            getTokensFunc={getTokensFunc}
            addTokenFunc={addTokenFunc}
            deleteTokenFunc={deleteTokenFunc}
            changeSelectedFunc={changeSelectedFunc}
            changeTokenNameFunc={changeTokenNameFunc}
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
            addTokenFunc={addTokenFunc}
            deleteTokenFunc={deleteTokenFunc}
            changeSelectedFunc={changeSelectedFunc}
            changeTokenNameFunc={changeTokenNameFunc}
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
            addTokenFunc={addTokenFunc}
            deleteTokenFunc={deleteTokenFunc}
            changeSelectedFunc={changeSelectedFunc}
            changeTokenNameFunc={changeTokenNameFunc}
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
            addTokenFunc={addTokenFunc}
            deleteTokenFunc={deleteTokenFunc}
            changeSelectedFunc={changeSelectedFunc}
            changeTokenNameFunc={changeTokenNameFunc}
            settings={settings}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper.find('button').simulate('click');

    expect(getOnyxDataFunc).toHaveBeenCalled();
  });

  it('should render the Page Settings simulate changing selection', () => {
    const settings = { selected: '' };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Settings
            getOnyxDataFunc={getOnyxDataFunc}
            getTokensFunc={getTokensFunc}
            addTokenFunc={addTokenFunc}
            deleteTokenFunc={deleteTokenFunc}
            changeSelectedFunc={changeSelectedFunc}
            changeTokenNameFunc={changeTokenNameFunc}
            settings={settings}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('select')
      .first()
      .simulate('change', {});

    expect(changeSelectedFunc).toHaveBeenCalled();
  });

  it('should render the Page Settings simulate change token input', () => {
    const settings = { selected: 'tokens' };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Settings
            getOnyxDataFunc={getOnyxDataFunc}
            getTokensFunc={getTokensFunc}
            addTokenFunc={addTokenFunc}
            deleteTokenFunc={deleteTokenFunc}
            changeSelectedFunc={changeSelectedFunc}
            changeTokenNameFunc={changeTokenNameFunc}
            settings={settings}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('input')
      .first()
      .simulate('change');

    expect(changeTokenNameFunc).toHaveBeenCalled();
  });

  it('should render the Page Settings simulate adding Token', () => {
    const settings = { selected: 'tokens' };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Settings
            getOnyxDataFunc={getOnyxDataFunc}
            getTokensFunc={getTokensFunc}
            addTokenFunc={addTokenFunc}
            deleteTokenFunc={deleteTokenFunc}
            changeSelectedFunc={changeSelectedFunc}
            changeTokenNameFunc={changeTokenNameFunc}
            settings={settings}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('button')
      .first()
      .simulate('click');

    expect(addTokenFunc).toHaveBeenCalled();
  });

  it('should render the Page Settings simulate deleting Token', () => {
    const settings = {
      selected: 'tokens',
      tokens: [{ name: 'name', token: 'token', id: 1 }],
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Settings
            getOnyxDataFunc={getOnyxDataFunc}
            getTokensFunc={getTokensFunc}
            addTokenFunc={addTokenFunc}
            deleteTokenFunc={deleteTokenFunc}
            changeSelectedFunc={changeSelectedFunc}
            changeTokenNameFunc={changeTokenNameFunc}
            settings={settings}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('button')
      .last()
      .simulate('click');

    expect(deleteTokenFunc).toHaveBeenCalled();
  });

  it('should dispatch getOnyxDataFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getOnyxDataFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Settings/GET_ONYX_DATA',
    });
  });

  it('should dispatch getTokensFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getTokensFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Settings/GET_TOKENS',
    });
  });

  it('should dispatch addTokenFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).addTokenFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Settings/ADD_TOKEN',
    });
  });

  it('should dispatch deleteTokenFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).deleteTokenFunc(1);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Settings/DELETE_TOKEN',
      id: 1,
    });
  });

  it('should dispatch changeTokenNameFunc', () => {
    const dispatch = jest.fn();
    const evt = { target: { value: 'name' } };

    mapDispatchToProps(dispatch).changeTokenNameFunc(evt);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Settings/CHANGE_TOKEN_NAME',
      name: 'name',
    });
  });

  it('should dispatch changeTokenNameFunc without evt', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).changeTokenNameFunc();

    expect(dispatch.mock.calls).toEqual([]);
  });

  it('should dispatch SelectedFunc', () => {
    const dispatch = jest.fn();
    const evt = { target: { value: 1 } };

    mapDispatchToProps(dispatch).changeSelectedFunc(evt);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Settings/CHANGE_SELECTED',
      selected: 1,
    });
  });

  it('should dispatch changeSelectedFunc without evt', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).changeSelectedFunc();

    expect(dispatch.mock.calls).toEqual([]);
  });
});
