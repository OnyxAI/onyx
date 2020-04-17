/*
 * Settings Messages
 *
 * This contains all the text for the Settings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Notifications';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Notifications',
  },
  delete_notification_success: {
    id: `${scope}.delete_notification_success`,
    defaultMessage: 'Notifications deleted !',
  },
  no_notifications: {
    id: `${scope}.no_notifications`,
    defaultMessage: 'There is nothing to view !',
  },
});
