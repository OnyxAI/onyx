import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import LanguageProvider from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import configureStore from '@onyx/configureStore';
import { BasicNav } from '../BasicNav';

describe('Nav BasicNav', () => {
  let store;
  let wrapper;
  let history;
  const user = {};
  const logoutUserFunc = jest.fn();

  beforeEach(() => {
    store = configureStore({}, browserHistory);
    history = { push: jest.fn() };
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <BasicNav
              user={user}
              logoutUserFunc={logoutUserFunc}
              history={history}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
  });

  it('Should render BasicNav', () => {
    expect(
      wrapper
        .find('div')
        .at(0)
        .hasClass('uk-hidden@xl'),
    ).toBe(true);
  });

  it('Should render BasicNav simulate logout', () => {
    wrapper
      .find('NavItem')
      .last()
      .simulate('click');

    expect(logoutUserFunc).toHaveBeenCalled();
  });

  it('Should render BasicNav simulate Home Click', () => {
    wrapper
      .find('a')
      .at(0)
      .simulate('click');

    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('Should render BasicNav simulate Home Click Item', () => {
    wrapper
      .find('NavItem')
      .at(0)
      .simulate('click');

    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('Should render BasicNav simulate Neurons Click', () => {
    wrapper
      .find('NavItem')
      .at(1)
      .simulate('click');

    expect(history.push).toHaveBeenCalledWith('/neurons');
  });

  it('Should render BasicNav simulate User Manage Click', () => {
    wrapper
      .find('NavItem')
      .at(2)
      .simulate('click');

    expect(history.push).toHaveBeenCalledWith('/user/manage');
  });
  it('Should render BasicNav simulate Settings Click', () => {
    wrapper
      .find('NavItem')
      .at(3)
      .simulate('click');

    expect(history.push).toHaveBeenCalledWith('/settings');
  });
});
