import { makeSelectNotifications } from '../selectors';

describe('makeSelectNotifications', () => {
  const notificationsSelector = makeSelectNotifications();
  it('should select the notifications', () => {
    const mockedState = {
      notifications: {},
    };
    expect(notificationsSelector(mockedState)).toEqual({});
  });
});
