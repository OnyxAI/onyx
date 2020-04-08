/*
 * Settings Messages
 *
 * This contains all the text for the Settings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Settings';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Settings',
  },
  onyx_data: {
    id: `${scope}.onyx_data`,
    defaultMessage: 'Download Onyx Data',
  },
});
