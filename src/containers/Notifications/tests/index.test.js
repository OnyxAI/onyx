/**
 * Testing the Notifications Page
 */

import React from 'react';
import { mount } from 'enzyme';
import { browserHistory } from 'react-router-dom';
import configureStore from '@onyx/configureStore';
import { Provider } from 'react-redux';
import { LanguageProvider } from '@onyx/containers/LanguageProvider';
import { translationMessages } from '@onyx/i18n';
import { Notifications, mapDispatchToProps } from '../index';

describe('<Notifications />', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();

  const viewNotificationFunc = jest.fn();
  const deleteNotificationFunc = jest.fn();
  const user = { language: 'en-US' };

  it('should render the Page Notifications', () => {
    const notifications = {
      notifications: [],
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Notifications
            viewNotificationFunc={viewNotificationFunc}
            deleteNotificationFunc={deleteNotificationFunc}
            notifications={notifications}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    expect(wrapper.exists('Container')).toBe(true);
  });

  it('should render the Page Notifications without notifications', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Notifications
            viewNotificationFunc={viewNotificationFunc}
            deleteNotificationFunc={deleteNotificationFunc}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    expect(wrapper.exists('Container')).toBe(false);
  });

  it('should render the Page Notifications with notifications', () => {
    const notifications = {
      notifications: [
        {
          title: 'title',
          content: 'content',
          id: 1,
        },
      ],
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Notifications
            viewNotificationFunc={viewNotificationFunc}
            deleteNotificationFunc={deleteNotificationFunc}
            notifications={notifications}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    expect(wrapper.exists('li')).toBe(true);
  });

  it('should render the Page Notifications with notifications and icon', () => {
    const notifications = {
      notifications: [
        {
          title: 'title',
          content: 'content',
          icon: 'icon',
          id: 1,
        },
      ],
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Notifications
            viewNotificationFunc={viewNotificationFunc}
            deleteNotificationFunc={deleteNotificationFunc}
            notifications={notifications}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    expect(
      wrapper
        .find('i')
        .first()
        .hasClass('icon'),
    ).toBe(true);
  });

  it('should render the Page Notifications with notifications and color', () => {
    const notifications = {
      notifications: [
        {
          title: 'title',
          content: 'content',
          color: 'color',
          id: 1,
        },
      ],
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Notifications
            viewNotificationFunc={viewNotificationFunc}
            deleteNotificationFunc={deleteNotificationFunc}
            notifications={notifications}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    expect(
      wrapper
        .find('i')
        .first()
        .hasClass('color'),
    ).toBe(true);
  });

  it('should render the Page Notifications with deleting notification', () => {
    const notifications = {
      notifications: [
        {
          title: 'title',
          content: 'content',
          id: 1,
        },
      ],
    };
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Notifications
            viewNotificationFunc={viewNotificationFunc}
            deleteNotificationFunc={deleteNotificationFunc}
            notifications={notifications}
            user={user}
          />
        </LanguageProvider>
      </Provider>,
    );
    wrapper
      .find('button')
      .first()
      .simulate('click');

    expect(deleteNotificationFunc).toHaveBeenCalled();
  });

  it('should dispatch viewNotificationFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).viewNotificationFunc();

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Notifications/VIEW_NOTIFICATION',
    });
  });

  it('should dispatch deleteNotificationFunc', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).deleteNotificationFunc(1);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'onyx/Notifications/DELETE_NOTIFICATION',
      id: 1,
    });
  });
});
