import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import LanguageProvider from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import configureStore from '@onyx/configureStore';

import { UserNav } from '../UserNav';

describe('Nav UserNav', () => {
  let store;
  let wrapper;
  let history;
  const user = { username: 'Aituglo', email: 'contact@test.fr' };
  const logoutUserFunc = jest.fn();

  beforeEach(() => {
    store = configureStore({}, browserHistory);
    history = { push: jest.fn() };
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <UserNav
              user={user}
              logoutUserFunc={logoutUserFunc}
              history={history}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
  });

  it('Should render UserNav', () => {
    expect(
      wrapper
        .find('div')
        .first()
        .hasClass('uk-visible@s'),
    ).toBe(true);
  });

  it('Should simulate logout', () => {
    wrapper
      .find('SideNavItem')
      .last()
      .simulate('click');
    expect(logoutUserFunc).toHaveBeenCalled();
  });

  it('Should simulate User Manage click', () => {
    wrapper
      .find('SideNavItem')
      .at(0)
      .simulate('click');
    expect(history.push).toHaveBeenCalledWith('/user/manage');
  });

  it('Should check if username is empty', () => {
    wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <UserNav
              user={{}}
              logoutUserFunc={logoutUserFunc}
              history={history}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(wrapper.find('.name').text()).toBe('');
  });

  it('Should check if email is empty', () => {
    wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <UserNav
              user={{}}
              logoutUserFunc={logoutUserFunc}
              history={history}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );

    expect(wrapper.find('.email').text()).toBe('');
  });
});
