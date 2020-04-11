/**
 * Testing the NavPage
 */

import React from 'react';
import { mount } from 'enzyme';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import configureStore from '@onyx/configureStore';
import { Provider } from 'react-redux';
import { LanguageProvider } from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import { Nav, mapDispatchToProps, getButtonIcon } from '../index';

describe('<Nav />', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();
  const sockyx = {};
  const neurons = {
    neurons: [
      {
        routes: [],
      },
    ],
  };
  const nav = {
    nav: [],
  };
  const user = {};
  const logoutUserFunc = jest.fn();
  const getNavFunc = jest.fn();
  const removeNavFunc = jest.fn();
  const addNavFunc = jest.fn();
  const onChangeNavColor = jest.fn();
  const onChangeNavIcon = jest.fn();
  const onChangeNavUrl = jest.fn();
  const onChangeManage = jest.fn();
  const onChangeButton = jest.fn();

  it('should render the Page Nav', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Nav
              sockyx={sockyx}
              neurons={neurons}
              nav={nav}
              user={user}
              logoutUserFunc={logoutUserFunc}
              getNavFunc={getNavFunc}
              removeNavFunc={removeNavFunc}
              addNavFunc={addNavFunc}
              onChangeManage={onChangeManage}
              onChangeNavColor={onChangeNavColor}
              onChangeNavIcon={onChangeNavIcon}
              onChangeNavUrl={onChangeNavUrl}
              onChangeButton={onChangeButton}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(
      wrapper
        .find('div')
        .at(1)
        .hasClass('uk-visible@xl'),
    ).toBe(true);
  });

  it('Should dispatch getNavFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getNavFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/GET_NAV',
    });
  });

  it('Should dispatch addNavFunc', () => {
    const dispatch = jest.fn();
    const evt = {
      preventDefault: jest.fn(),
    };

    mapDispatchToProps(dispatch).addNavFunc(evt, '1', '1');
    expect(evt.preventDefault).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/ADD_NAV',
      buttonNumber: '1',
      position: '1',
    });
  });

  it('Should dispatch addNavFunc with evt undefined', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).addNavFunc(undefined, '1', '1');

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/ADD_NAV',
      buttonNumber: '1',
      position: '1',
    });
  });

  it('Should dispatch removeNavFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).removeNavFunc('1', '1');

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/REMOVE_NAV',
      buttonNumber: '1',
      position: '1',
    });
  });

  it('Should dispatch onChangeNavColor', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onChangeNavColor({ hex: '#ffffff' });

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/CHANGE_NAV_COLOR',
      color: '#ffffff',
    });
  });

  it('Should dispatch onChangeManage', () => {
    const dispatch = jest.fn();
    const evt = {
      target: { checked: true },
    };

    mapDispatchToProps(dispatch).onChangeManage(evt);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/CHANGE_NAV_ONMANAGE',
      onManage: true,
    });
  });

  it('Should dispatch onChangeNavUrl', () => {
    const dispatch = jest.fn();
    const evt = {
      target: { value: '/' },
    };

    mapDispatchToProps(dispatch).onChangeNavUrl(evt);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/CHANGE_NAV_URL',
      url: '/',
    });
  });

  it('Should dispatch onChangeNavIcon', () => {
    const dispatch = jest.fn();
    const evt = {
      target: { value: 'fa fa-home' },
    };

    mapDispatchToProps(dispatch).onChangeNavIcon(evt);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/CHANGE_NAV_ICON',
      icon: 'fa fa-home',
    });
  });

  it('Should dispatch onChangeNavIcon without target value', () => {
    const dispatch = jest.fn();
    const evt = 'fa fa-home';

    mapDispatchToProps(dispatch).onChangeNavIcon(evt);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/CHANGE_NAV_ICON',
      icon: 'fa fa-home',
    });
  });

  it('Should dispatch onChangeNavCustomIcon', () => {
    const dispatch = jest.fn();
    const evt = {
      target: { value: 'fa fa-home' },
    };

    mapDispatchToProps(dispatch).onChangeNavCustomIcon(evt);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/CHANGE_NAV_CUSTOM_ICON',
      icon: 'fa fa-home',
    });
  });

  it('Should dispatch onChangeNavCustomIcon without target value', () => {
    const dispatch = jest.fn();
    const evt = 'fa fa-home';

    mapDispatchToProps(dispatch).onChangeNavCustomIcon(evt);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/CHANGE_NAV_CUSTOM_ICON',
      icon: 'fa fa-home',
    });
  });

  it('Should dispatch onChangeButton with evt undefined', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onChangeButton(undefined);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/CHANGE_BUTTON',
    });
  });

  it('Should dispatch onChangeButton with evt', () => {
    const dispatch = jest.fn();
    const evt = {
      preventDefault: jest.fn(),
    };

    mapDispatchToProps(dispatch).onChangeButton(evt);

    expect(evt.preventDefault).toHaveBeenCalled();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Nav/CHANGE_BUTTON',
    });
  });

  it('Should get the good button icon', () => {
    const buttons = [
      {
        buttonNumber: '1',
        icon: 'test',
      },
      {
        buttonNumber: '2',
        icon: 'fa fa-user',
      },
    ];

    expect(getButtonIcon('1', buttons)).toBe('test');

    expect(getButtonIcon('3', buttons)).toBe('fa fa-circle');
  });
});
