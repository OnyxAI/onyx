import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import LanguageProvider from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import configureStore from '@onyx/configureStore';
import BasicNav from '../BasicNav';

describe('Nav BasicNav', () => {
  let store;
  let wrapper;
  const user = {};
  const logoutUserFunc = jest.fn();

  beforeEach(() => {
    store = configureStore({}, browserHistory);

    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <BasicNav
              user={user}
              logoutUserFunc={logoutUserFunc}
              history={browserHistory}
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
});
