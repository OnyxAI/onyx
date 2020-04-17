import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '@onyx/utils/request';
import {
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  VIEW_NOTIFICATION,
  ADD_NOTIFICATION,
} from './constants';

import {
  getNotificationsSuccess,
  getNotificationsError,
  deleteNotificationError,
  deleteNotificationSuccess,
  viewNotificationSuccess,
  viewNotificationError,
  addNotificationSuccess,
  addNotificationError,
} from './actions';

import { makeSelectNotifications } from './selectors';

// Add Notification
export function* loadAddNotification() {
  const notifications = yield select(makeSelectNotifications());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/notifications/add`,
      data: {
        user: notifications.user,
        title: notifications.title,
        content: notifications.content,
        color: notifications.color,
        icon: notifications.icon,
      },
    });
    if (result && result.status === 'success') {
      yield put(addNotificationSuccess());
    } else if (result && result.status === 'error') {
      yield put(addNotificationError(result.message));
    } else {
      yield put(addNotificationError('onyx.global.error'));
    }
  } catch (error) {
    yield put(addNotificationError(error.toString()));
  }
}

// Delete Notification
export function* loadDeleteNotification() {
  const token = localStorage.getItem('access_token');
  const notifications = yield select(makeSelectNotifications());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/notifications`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        id: notifications.selected,
      },
    });
    if (result && result.status === 'success') {
      yield put(deleteNotificationSuccess());
    } else if (result && result.status === 'error') {
      yield put(deleteNotificationError(result.message));
    } else {
      yield put(deleteNotificationError('onyx.global.error'));
    }
  } catch (error) {
    yield put(deleteNotificationError(error.toString()));
  }
}

// Get Notifications
export function* loadGetNotifications() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/notifications`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getNotificationsSuccess(result.notifications));
    } else if (result && result.status === 'error') {
      yield put(getNotificationsError(result.message));
    } else {
      yield put(getNotificationsError('onyx.global.error'));
    }
  } catch (error) {
    yield put(getNotificationsError(error.toString()));
  }
}

// View Notification
export function* loadViewNotification() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/notifications/seen`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(viewNotificationSuccess());
    } else if (result && result.status === 'error') {
      yield put(viewNotificationError(result.message));
    } else {
      yield put(viewNotificationError('onyx.global.error'));
    }
  } catch (error) {
    yield put(viewNotificationError(error.toString()));
  }
}

// Individual exports for testing
export default function* notificationsSaga() {
  yield takeLatest(GET_NOTIFICATIONS, loadGetNotifications);
  yield takeLatest(ADD_NOTIFICATION, loadAddNotification);
  yield takeLatest(DELETE_NOTIFICATION, loadDeleteNotification);
  yield takeLatest(VIEW_NOTIFICATION, loadViewNotification);
}
