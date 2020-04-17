/*
 *
 * Notifications reducer
 *
 */
import produce from 'immer';
import {
  GET_NOTIFICATIONS_ERROR,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_ERROR,
  VIEW_NOTIFICATION_ERROR,
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_ERROR,
} from './constants';

export const initialState = {
  errorText: '',
  loading: false,
  delected: '',
  notifications: [],
  user: '',
  title: '',
  color: '',
  icon: '',
};

/* eslint-disable default-case, no-param-reassign */
const notificationsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_NOTIFICATIONS:
        draft.loading = true;
        break;
      case GET_NOTIFICATIONS_SUCCESS:
        draft.notifications = action.notifications;
        draft.loading = false;
        break;
      case GET_NOTIFICATIONS_ERROR:
        draft.loading = false;
        draft.errorText = action.error;
        break;
      case ADD_NOTIFICATION:
        draft.user = action.user;
        draft.title = action.title;
        draft.content = action.content;
        draft.icon = action.icon;
        draft.color = action.color;
        break;
      case ADD_NOTIFICATION_SUCCESS:
        draft.user = '';
        draft.title = '';
        draft.content = '';
        draft.icon = '';
        draft.color = '';
        break;
      case ADD_NOTIFICATION_ERROR:
        draft.user = '';
        draft.title = '';
        draft.content = '';
        draft.icon = '';
        draft.color = '';
        draft.errorText = action.error;
        break;
      case DELETE_NOTIFICATION:
        draft.selected = action.id;
        break;
      case DELETE_NOTIFICATION_SUCCESS:
        draft.selected = '';
        break;
      case DELETE_NOTIFICATION_ERROR:
        draft.selected = '';
        draft.errorText = action.error;
        break;
      case VIEW_NOTIFICATION_ERROR:
        draft.errorText = action.error;
        break;
    }
  });

export default notificationsReducer;
