/*
 *
 * Settings actions
 *
 */
import Toast from '@onyx/global/actions';
import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  GET_NOTIFICATIONS,
  VIEW_NOTIFICATION,
  VIEW_NOTIFICATION_ERROR,
  VIEW_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_ERROR,
  DELETE_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_ERROR,
  ADD_NOTIFICATION_SUCCESS,
} from './constants';

import { getMessage } from '../../i18n';

export function getNotifications() {
  return {
    type: GET_NOTIFICATIONS,
  };
}

export function getNotificationsSuccess(notifications) {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

export function getNotificationsError(error) {
  return {
    type: GET_NOTIFICATIONS_ERROR,
    error,
  };
}

export function addNotification(user, title, content, icon, color) {
  return {
    type: ADD_NOTIFICATION,
    user,
    title,
    content,
    icon,
    color,
  };
}

export function addNotificationSuccess() {
  return dispatch => {
    dispatch(getNotifications());
    dispatch({ type: ADD_NOTIFICATION_SUCCESS });
  };
}

export function addNotificationError(error) {
  return dispatch => {
    dispatch(getNotifications());
    dispatch({ type: ADD_NOTIFICATION_ERROR, error });
  };
}

export function deleteNotification(id) {
  return {
    type: DELETE_NOTIFICATION,
    id,
  };
}

export function deleteNotificationSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: DELETE_NOTIFICATION_SUCCESS });
    dispatch(getNotifications());
    dispatch(
      Toast.success({
        text: getMessage(
          locale,
          'app.containers.Notifications.delete_notification_success',
        ),
      }),
    );
  };
}

export function deleteNotificationError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: DELETE_NOTIFICATION_ERROR, error });
    dispatch(getNotifications());
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}

export function viewNotification() {
  return {
    type: VIEW_NOTIFICATION,
  };
}

export function viewNotificationSuccess() {
  return dispatch => {
    dispatch(getNotifications());
    dispatch({ type: VIEW_NOTIFICATION_SUCCESS });
  };
}

export function viewNotificationError(error) {
  return dispatch => {
    dispatch(getNotifications());
    dispatch({ type: VIEW_NOTIFICATION_ERROR, error });
  };
}
