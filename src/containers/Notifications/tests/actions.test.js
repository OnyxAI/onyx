import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getNotifications,
  getNotificationsSuccess,
  getNotificationsError,
  viewNotification,
  viewNotificationSuccess,
  viewNotificationError,
  deleteNotification,
  deleteNotificationSuccess,
  deleteNotificationError,
  addNotification,
  addNotificationSuccess,
  addNotificationError,
} from '../actions';

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
} from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  language: 'fr',
  errorText: '',
  loading: false,
  delected: '',
  notifications: [],
  user: '',
  title: '',
  color: '',
  icon: '',
});

describe('Notifications Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe(' viewNotification', () => {
    it('should return the correct type viewNotification', () => {
      const expectedResult = {
        type: VIEW_NOTIFICATION,
      };

      expect(viewNotification()).toEqual(expectedResult);
    });
  });

  describe('viewNotificationSuccess', () => {
    it('should return the correct type and the passed viewNotificationSuccess', () => {
      const expectedResult = {
        type: VIEW_NOTIFICATION_SUCCESS,
      };

      store.dispatch(viewNotificationSuccess());

      expect(store.getActions()[0]).toEqual({ type: GET_NOTIFICATIONS });
      expect(store.getActions()[1]).toEqual(expectedResult);
    });
  });

  describe('viewNotificationError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: VIEW_NOTIFICATION_ERROR,
        error,
      };

      store.dispatch(viewNotificationError(error));

      expect(store.getActions()[0]).toEqual({ type: GET_NOTIFICATIONS });
      expect(store.getActions()[1]).toEqual(expectedResult);
    });
  });

  describe('getNotifications', () => {
    it('should return the correct type getTokens', () => {
      const expectedResult = {
        type: GET_NOTIFICATIONS,
      };

      expect(getNotifications()).toEqual(expectedResult);
    });
  });

  describe('getNotificationsSuccess', () => {
    it('should return the correct type and the passed getNotificationsSuccess', () => {
      const expectedResult = {
        type: GET_NOTIFICATIONS_SUCCESS,
        notifications: [],
      };

      store.dispatch(getNotificationsSuccess([]));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('getNotificationsError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: GET_NOTIFICATIONS_ERROR,
        error,
      };

      store.dispatch(getNotificationsError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('addNotification', () => {
    it('should return the correct type addNotification', () => {
      const expectedResult = {
        type: ADD_NOTIFICATION,
        user: 1,
        title: 'title',
        content: 'content',
        icon: 'icon',
        color: 'color',
      };

      expect(addNotification(1, 'title', 'content', 'icon', 'color')).toEqual(
        expectedResult,
      );
    });
  });

  describe('addNotificationSuccess', () => {
    it('should return the correct type and the passed addNotificationSuccess', () => {
      const expectedResult = {
        type: ADD_NOTIFICATION_SUCCESS,
      };

      store.dispatch(addNotificationSuccess());

      expect(store.getActions()[0]).toEqual({ type: GET_NOTIFICATIONS });
      expect(store.getActions()[1]).toEqual(expectedResult);
    });
  });

  describe('addNotificationError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: ADD_NOTIFICATION_ERROR,
        error,
      };

      store.dispatch(addNotificationError(error));

      expect(store.getActions()[0]).toEqual({ type: GET_NOTIFICATIONS });
      expect(store.getActions()[1]).toEqual(expectedResult);
    });
  });

  describe('deleteNotification', () => {
    it('should return the correct type deleteNotification', () => {
      const expectedResult = {
        type: DELETE_NOTIFICATION,
        id: 1,
      };

      expect(deleteNotification(1)).toEqual(expectedResult);
    });
  });

  describe('deleteNotificationSuccess', () => {
    it('should return the correct type and the passed deleteNotificationSuccess', () => {
      const expectedResult = {
        type: DELETE_NOTIFICATION_SUCCESS,
      };

      store.dispatch(deleteNotificationSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1]).toEqual({ type: GET_NOTIFICATIONS });
    });
  });

  describe('deleteNotificationError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: DELETE_NOTIFICATION_ERROR,
        error,
      };

      store.dispatch(deleteNotificationError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1]).toEqual({ type: GET_NOTIFICATIONS });
    });
  });
});
