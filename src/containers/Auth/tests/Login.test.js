import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { browserHistory } from 'react-router-dom';
import LanguageProvider from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';

import configureStore from '@onyx/configureStore';

import { changeInput, loginUser } from '../actions';

import Login from '../Login';

describe('<Login />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({}, browserHistory);

    store.dispatch = jest.fn();
  });

  it('should not call onSubmitForm if email or password is an empty string', () => {
    const submitSpy = jest.fn();
    renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Login />
        </LanguageProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should call onChangeInput if email is changed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Login />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root
        .findByProps({ id: 'email' })
        .props.onChange({ target: { value: 'test@test.fr' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('email', 'test@test.fr'),
    );
  });

  it('should call onChangeInput if password is changed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Login />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root
        .findByProps({ id: 'password' })
        .props.onChange({ target: { value: 'password' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('password', 'password'),
    );
  });

  it('should call onSubmit if button is pressed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Login />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root.findByProps({ id: 'loginForm' }).props.onSubmit();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(loginUser());
  });

  it('should call preventDefault onSubmit if button is pressed', () => {
    const evt = {
      preventDefault: jest.fn(),
    };
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Login />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root.findByProps({ id: 'loginForm' }).props.onSubmit(evt);
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(loginUser());
  });
});
