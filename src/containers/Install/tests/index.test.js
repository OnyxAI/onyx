/**
 * Testing the Install Page
 */

import React from 'react';
import { mount } from 'enzyme';
import { browserHistory } from 'react-router-dom';
import configureStore from '@onyx/configureStore';
import { Provider } from 'react-redux';
import { LanguageProvider } from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import { Install, mapDispatchToProps } from '../index';

describe('<Install />', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();

  const onChangeInput = jest.fn();
  const onSubmit = jest.fn();
  const accountErrorFunc = jest.fn();
  const changeStepFunc = jest.fn();
  const getOnyxDataFunc = jest.fn();

  it('should render the Page Install', () => {
    const install = {};
    const settings = {};

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Install
            install={install}
            settings={settings}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            accountErrorFunc={accountErrorFunc}
            changeStepFunc={changeStepFunc}
            getOnyxDataFunc={getOnyxDataFunc}
          />
        </LanguageProvider>
      </Provider>,
    );
    expect(wrapper.exists('Container')).toBe(true);
  });

  it('should render the Page Install change to step 2', () => {
    const install = {
      step: 1,
    };
    const settings = {};

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Install
            install={install}
            settings={settings}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            accountErrorFunc={accountErrorFunc}
            changeStepFunc={changeStepFunc}
            getOnyxDataFunc={getOnyxDataFunc}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper.find('button').simulate('click');

    expect(changeStepFunc).toHaveBeenCalled();
  });

  it('should render the Page Install step 2', () => {
    const install = {
      step: 2,
    };
    const settings = {
      downloaded: true,
    };

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Install
            install={install}
            settings={settings}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            accountErrorFunc={accountErrorFunc}
            changeStepFunc={changeStepFunc}
            getOnyxDataFunc={getOnyxDataFunc}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('button')
      .first()
      .simulate('click');

    expect(getOnyxDataFunc).toHaveBeenCalled();

    wrapper
      .find('button')
      .at(1)
      .simulate('click');

    expect(changeStepFunc).toHaveBeenCalled();

    wrapper
      .find('button')
      .at(2)
      .simulate('click');

    expect(changeStepFunc).toHaveBeenCalled();
  });

  it('should render the Page Install step 2 loading data', () => {
    const install = {
      step: 2,
    };
    const settings = {
      loadingData: true,
    };

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Install
            install={install}
            settings={settings}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            accountErrorFunc={accountErrorFunc}
            changeStepFunc={changeStepFunc}
            getOnyxDataFunc={getOnyxDataFunc}
          />
        </LanguageProvider>
      </Provider>,
    );

    expect(wrapper.exists('span')).toBe(true);
  });

  it('should render the Page Install step 3', () => {
    const install = {
      step: 3,
      errorText: 'error_email',
      email: 'test@test.fr',
      password: '1234',
      verifPassword: '1234',
      username: 'Aituglo',
      firstname: 'John',
      lastname: 'Doe',
      language: 'fr-FR',
    };
    const settings = {};

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Install
            install={install}
            settings={settings}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            accountErrorFunc={accountErrorFunc}
            changeStepFunc={changeStepFunc}
            getOnyxDataFunc={getOnyxDataFunc}
          />
        </LanguageProvider>
      </Provider>,
    );

    wrapper
      .find('button')
      .first()
      .simulate('click');

    expect(getOnyxDataFunc).toHaveBeenCalled();

    wrapper
      .find('button')
      .at(1)
      .simulate('click');

    expect(changeStepFunc).toHaveBeenCalled();

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } });

    expect(onChangeInput).toHaveBeenCalled();

    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'test' } });

    expect(onChangeInput).toHaveBeenCalled();

    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { value: 'test' } });

    expect(onChangeInput).toHaveBeenCalled();

    wrapper
      .find('input')
      .at(3)
      .simulate('change', { target: { value: 'test' } });

    expect(onChangeInput).toHaveBeenCalled();

    wrapper
      .find('input')
      .at(4)
      .simulate('change', { target: { value: 'test' } });

    expect(onChangeInput).toHaveBeenCalled();

    wrapper
      .find('input')
      .at(5)
      .simulate('change', { target: { value: 'test' } });

    expect(onChangeInput).toHaveBeenCalled();

    wrapper
      .find('select')
      .at(0)
      .simulate('change', { target: { value: 'test' } });

    expect(onChangeInput).toHaveBeenCalled();
  });

  it('should render the Page Install step 3 password mismatch', () => {
    const install = {
      step: 3,
      errorText: 'error_email',
      email: 'test@test.fr',
      password: '12345',
      verifPassword: '1234',
      username: 'Aituglo',
      firstname: 'John',
      lastname: 'Doe',
      language: 'fr-FR',
    };
    const settings = {};

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Install
            install={install}
            settings={settings}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            accountErrorFunc={accountErrorFunc}
            changeStepFunc={changeStepFunc}
            getOnyxDataFunc={getOnyxDataFunc}
          />
        </LanguageProvider>
      </Provider>,
    );

    expect(wrapper.exists('button')).toBe(false);
  });

  it('should render the Page Install step 3 wrong email', () => {
    const install = {
      step: 3,
      errorText: 'error_email',
      email: 'false_email',
      password: '1234',
      verifPassword: '1234',
      username: 'Aituglo',
      firstname: 'John',
      lastname: 'Doe',
      language: 'fr-FR',
    };
    const settings = {};

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Install
            install={install}
            settings={settings}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            accountErrorFunc={accountErrorFunc}
            changeStepFunc={changeStepFunc}
            getOnyxDataFunc={getOnyxDataFunc}
          />
        </LanguageProvider>
      </Provider>,
    );

    expect(wrapper.exists('button')).toBe(false);
  });

  it('should render the Page Install step 3 input empty', () => {
    const install = {
      step: 3,
      errorText: 'error_email',
      email: '',
      password: '',
      verifPassword: '',
      username: '',
      firstname: 'John',
      lastname: 'Doe',
      language: 'fr-FR',
    };
    const settings = {};

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Install
            install={install}
            settings={settings}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            accountErrorFunc={accountErrorFunc}
            changeStepFunc={changeStepFunc}
            getOnyxDataFunc={getOnyxDataFunc}
          />
        </LanguageProvider>
      </Provider>,
    );

    expect(wrapper.exists('button')).toBe(false);
  });

  it('should render the Page Install step 4', () => {
    const install = {
      step: 4,
    };
    const settings = {};

    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Install
            install={install}
            settings={settings}
            onChangeInput={onChangeInput}
            onSubmit={onSubmit}
            accountErrorFunc={accountErrorFunc}
            changeStepFunc={changeStepFunc}
            getOnyxDataFunc={getOnyxDataFunc}
          />
        </LanguageProvider>
      </Provider>,
    );

    wrapper.find('button').simulate('click');

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should dispatch onSubmit', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onSubmit();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Install/INSTALL_ONYX',
    });
  });

  it('should dispatch changeStepFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).changeStepFunc(1);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Install/CHANGE_STEP',
      step: 1,
    });
  });

  it('should dispatch onChangeInput', () => {
    const dispatch = jest.fn();
    const evt = {
      target: {
        value: 'test',
      },
    };

    mapDispatchToProps(dispatch).onChangeInput(evt, 'username');

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Install/CHANGE_INPUT',
      input: 'username',
      value: 'test',
    });
  });

  it('should dispatch getOnyxDataFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).getOnyxDataFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'app/Settings/GET_ONYX_DATA',
    });
  });

  it('should dispatch accountErrorFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).accountErrorFunc('error');

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Install/ACCOUNT_ERROR',
      error: 'error',
    });
  });
});
