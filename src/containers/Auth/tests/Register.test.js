import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import LanguageProvider from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import configureStore from '@onyx/configureStore';

import { changeInput, registerUser } from '../actions';

import Register from '../Register';

describe('<Register />', () => {
  let store;
  let container;

  beforeEach(() => {
    store = configureStore({}, browserHistory);

    store.dispatch = jest.fn();

    container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Register />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
  });

  it('should not call onSubmitForm if email or password is an empty string', () => {
    const submitSpy = jest.fn();
    renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Register />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should call onChangeInput if email is changed', () => {
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

  it('should call onChangeInput if verifPassword is changed', () => {
    renderer.act(() => {
      container.root
        .findByProps({ id: 'verifPassword' })
        .props.onChange({ target: { value: 'password' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('verifPassword', 'password'),
    );
  });

  it('should call onChangeInput if username is changed', () => {
    renderer.act(() => {
      container.root
        .findByProps({ id: 'username' })
        .props.onChange({ target: { value: 'Aituglo' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('username', 'Aituglo'),
    );
  });

  it('should call onChangeInput if firstname is changed', () => {
    renderer.act(() => {
      container.root
        .findByProps({ id: 'firstname' })
        .props.onChange({ target: { value: 'firstname' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('firstname', 'firstname'),
    );
  });

  it('should call onChangeInput if lastname is changed', () => {
    renderer.act(() => {
      container.root
        .findByProps({ id: 'lastname' })
        .props.onChange({ target: { value: 'lastname' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('lastname', 'lastname'),
    );
  });

  it('should call onChangeInput if language is changed', () => {
    renderer.act(() => {
      container.root
        .findByProps({ id: 'language' })
        .props.onChange({ target: { value: 'language' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('language', 'language'),
    );
  });

  it('should call onSubmit if button is pressed', () => {
    renderer.act(() => {
      container.root.findByProps({ id: 'registerForm' }).props.onSubmit();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(registerUser());
  });

  it('should call preventDefault onSubmit if button is pressed', () => {
    const evt = {
      preventDefault: jest.fn(),
    };

    renderer.act(() => {
      container.root.findByProps({ id: 'registerForm' }).props.onSubmit(evt);
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(registerUser());
  });
});
