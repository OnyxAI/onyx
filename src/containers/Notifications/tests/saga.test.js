/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call } from 'redux-saga/effects';

import request from '@onyx/utils/request';

import {
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  VIEW_NOTIFICATION,
  ADD_NOTIFICATION,
} from '../constants';
import * as NotificationsAction from '../actions';

import notificationsSaga, {
  loadGetNotifications,
  loadAddNotification,
  loadDeleteNotification,
  loadViewNotification,
} from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('viewNotification Saga', () => {
  let viewNotificationGenerator;

  beforeEach(() => {
    viewNotificationGenerator = loadViewNotification();
  });

  it('should call the api to getOnyxData', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = viewNotificationGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/notifications/seen`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for viewNotification', () => {
    const spy = jest.spyOn(NotificationsAction, 'viewNotificationSuccess');
    const result = {
      status: 'success',
    };
    viewNotificationGenerator.next({});
    viewNotificationGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for viewNotification', () => {
    const spy = jest.spyOn(NotificationsAction, 'viewNotificationError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    viewNotificationGenerator.next({});
    viewNotificationGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for viewNotification', () => {
    const spy = jest.spyOn(NotificationsAction, 'viewNotificationError');
    viewNotificationGenerator.next({});
    viewNotificationGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(NotificationsAction, 'viewNotificationError');
    const response = new Error('Some error');
    viewNotificationGenerator.next({});
    viewNotificationGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('getNotifications Saga', () => {
  let getNotificationsGenerator;

  beforeEach(() => {
    getNotificationsGenerator = loadGetNotifications();
  });

  it('should call the api to getNotifications', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = getNotificationsGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/notifications`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for getNotifications', () => {
    const spy = jest.spyOn(NotificationsAction, 'getNotificationsSuccess');
    const result = {
      status: 'success',
    };
    getNotificationsGenerator.next({});
    getNotificationsGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getNotifications', () => {
    const spy = jest.spyOn(NotificationsAction, 'getNotificationsError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getNotificationsGenerator.next({});
    getNotificationsGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for getNotifications', () => {
    const spy = jest.spyOn(NotificationsAction, 'getNotificationsError');
    getNotificationsGenerator.next({});
    getNotificationsGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(NotificationsAction, 'getNotificationsError');
    const response = new Error('Some error');
    getNotificationsGenerator.next({});
    getNotificationsGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('addNotification Saga', () => {
  let addNotificationGenerator;

  beforeEach(() => {
    addNotificationGenerator = loadAddNotification();
  });

  it('should call the api to addNotification', () => {
    const notifications = {
      user: 1,
      title: 'title',
      content: 'content',
      color: 'color',
      icon: 'icon',
    };
    addNotificationGenerator.next();
    const callDescriptor = addNotificationGenerator.next(notifications).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/notifications/add`,
        data: {
          user: notifications.user,
          title: notifications.title,
          content: notifications.content,
          color: notifications.color,
          icon: notifications.icon,
        },
      }),
    );
  });

  it('should call api success for addNotification', () => {
    const spy = jest.spyOn(NotificationsAction, 'addNotificationSuccess');
    const result = {
      status: 'success',
    };
    addNotificationGenerator.next();
    addNotificationGenerator.next({});
    addNotificationGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for addNotification', () => {
    const spy = jest.spyOn(NotificationsAction, 'addNotificationError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    addNotificationGenerator.next();
    addNotificationGenerator.next({});
    addNotificationGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for addNotification', () => {
    const spy = jest.spyOn(NotificationsAction, 'addNotificationError');
    addNotificationGenerator.next();
    addNotificationGenerator.next({});
    addNotificationGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(NotificationsAction, 'addNotificationError');
    const response = new Error('Some error');
    addNotificationGenerator.next();
    addNotificationGenerator.next({});
    addNotificationGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('deleteNotification Saga', () => {
  let deleteNotificationGenerator;

  beforeEach(() => {
    deleteNotificationGenerator = loadDeleteNotification();
  });

  it('should call the api to deleteNotification', () => {
    localStorage.setItem('access_token', 'my_token');
    deleteNotificationGenerator.next();
    const callDescriptor = deleteNotificationGenerator.next({ selected: 1 })
      .value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/notifications`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          id: 1,
        },
      }),
    );
  });

  it('should call api success for deleteNotification', () => {
    const spy = jest.spyOn(NotificationsAction, 'deleteNotificationSuccess');
    const result = {
      status: 'success',
    };
    deleteNotificationGenerator.next();
    deleteNotificationGenerator.next({});
    deleteNotificationGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for deleteNotification', () => {
    const spy = jest.spyOn(NotificationsAction, 'deleteNotificationError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    deleteNotificationGenerator.next();
    deleteNotificationGenerator.next({});
    deleteNotificationGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for deleteNotification', () => {
    const spy = jest.spyOn(NotificationsAction, 'deleteNotificationError');
    deleteNotificationGenerator.next();
    deleteNotificationGenerator.next({});
    deleteNotificationGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(NotificationsAction, 'deleteNotificationError');
    const response = new Error('Some error');
    deleteNotificationGenerator.next();
    deleteNotificationGenerator.next({});
    deleteNotificationGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

describe('notificationsSaga Saga', () => {
  const notificationsSagaFunc = notificationsSaga();

  it('should start task to watch for GET_NOTIFICATIONS action', () => {
    const takeLatestDescriptor = notificationsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_NOTIFICATIONS, loadGetNotifications),
    );
  });

  it('should start task to watch for ADD_NOTIFICATION action', () => {
    const takeLatestDescriptor = notificationsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(ADD_NOTIFICATION, loadAddNotification),
    );
  });

  it('should start task to watch for DELETE_NOTIFICATION action', () => {
    const takeLatestDescriptor = notificationsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(DELETE_NOTIFICATION, loadDeleteNotification),
    );
  });

  it('should start task to watch for VIEW_NOTIFICATION action', () => {
    const takeLatestDescriptor = notificationsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(VIEW_NOTIFICATION, loadViewNotification),
    );
  });
});
