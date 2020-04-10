import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import LanguageProvider from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import configureStore from '@onyx/configureStore';
import UserNav from '../UserNav';

describe('Nav UserNav', () => {
  let store;
  let wrapper;
  const user = { username: 'Aituglo', email: 'contact@test.fr' };
  const logoutUserFunc = jest.fn();

  beforeEach(() => {
    store = configureStore({}, browserHistory);

    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <UserNav
              user={user}
              logoutUserFunc={logoutUserFunc}
              history={browserHistory}
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

  it('Should check if username is empty', () => {
    expect(wrapper.find('.name').text()).toBe('Aituglo');
  });

  it('Should check if email is empty', () => {
    expect(wrapper.find('.email').text()).toBe('contact@test.fr');
  });
});
