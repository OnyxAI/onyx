/**
 *
 * Tests for DesignSettings
 *
 *
 */

import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from '@onyx/configureStore';
import { browserHistory } from 'react-router-dom';
import { translationMessages } from '@onyx/i18n';
import { DesignSettings, mapDispatchToProps } from '../index';

describe('<DesignSettings />', () => {
  let store;
  const changeColorFunc = jest.fn();
  const changeModeFunc = jest.fn();
  const user = {
    color: 'blue',
    mode: 'light',
  };

  beforeEach(() => {
    store = configureStore({}, browserHistory);

    store.dispatch = jest.fn();
  });

  it('Should Render Design Settings Color', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider messages={translationMessages}>
          <DesignSettings
            user={user}
            changeColorFunc={changeColorFunc}
            changeModeFunc={changeModeFunc}
          />
        </IntlProvider>
      </Provider>,
    );

    expect(wrapper.exists('Container')).toBe(true);

    wrapper
      .find('button')
      .first()
      .simulate('click');

    expect(changeColorFunc).toHaveBeenCalled();
  });

  it('Should Render Design Settings Mode', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider messages={translationMessages}>
          <DesignSettings
            user={user}
            changeColorFunc={changeColorFunc}
            changeModeFunc={changeModeFunc}
          />
        </IntlProvider>
      </Provider>,
    );

    expect(wrapper.exists('Container')).toBe(true);

    wrapper
      .find('button')
      .last()
      .simulate('click');

    expect(changeModeFunc).toHaveBeenCalled();
  });

  it('Should dispatch changeColor', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).changeColorFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Design/CHANGE_COLOR',
    });
  });

  it('Should dispatch changeMode', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).changeModeFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Design/CHANGE_MODE',
    });
  });
});
