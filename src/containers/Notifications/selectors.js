import { createSelector } from 'reselect';

const selectNotifications = state => state.notifications;

const makeSelectNotifications = () =>
  createSelector(
    selectNotifications,
    notificationsState => notificationsState,
  );

export { makeSelectNotifications };
