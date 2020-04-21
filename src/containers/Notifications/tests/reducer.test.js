import produce from 'immer';
import notificationsReducer from '../reducer';
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
} from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('notificationsReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      errorText: '',
      loading: false,
      delected: '',
      notifications: [],
      user: '',
      title: '',
      color: '',
      icon: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(notificationsReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the viewNotificationError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
    });

    const action = {
      type: VIEW_NOTIFICATION_ERROR,
      error: 'An error has occured',
    };

    expect(notificationsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getNotifications action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
    });

    const action = {
      type: GET_NOTIFICATIONS,
    };

    expect(notificationsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getNotificationsSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.notifications = [{}];
    });

    const action = {
      type: GET_NOTIFICATIONS_SUCCESS,
      notifications: [{}],
    };

    expect(notificationsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getNotificationsError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loading = false;
    });

    const action = {
      type: GET_NOTIFICATIONS_ERROR,
      error: 'An error has occured',
    };

    expect(notificationsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteNotification action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.selected = 1;
    });

    const action = {
      type: DELETE_NOTIFICATION,
      id: 1,
    };

    expect(notificationsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteNotificationSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.selected = '';
    });

    const action = {
      type: DELETE_NOTIFICATION_SUCCESS,
    };

    expect(notificationsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteNotificationError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.selected = '';
    });

    const action = {
      type: DELETE_NOTIFICATION_ERROR,
      error: 'An error has occured',
    };

    expect(notificationsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the addNotification action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.user = 1;
      draft.title = 'title';
      draft.content = 'content';
      draft.icon = 'icon';
      draft.color = 'color';
    });

    const action = {
      type: ADD_NOTIFICATION,
      user: 1,
      title: 'title',
      content: 'content',
      icon: 'icon',
      color: 'color',
    };

    expect(notificationsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the addNotificationSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.user = '';
      draft.title = '';
      draft.content = '';
      draft.icon = '';
      draft.color = '';
    });

    const action = {
      type: ADD_NOTIFICATION_SUCCESS,
    };

    expect(notificationsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the addNotificationError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.user = '';
      draft.title = '';
      draft.content = '';
      draft.icon = '';
      draft.color = '';
    });

    const action = {
      type: ADD_NOTIFICATION_ERROR,
      error: 'An error has occured',
    };

    expect(notificationsReducer(state, action)).toEqual(expectedResult);
  });
});
