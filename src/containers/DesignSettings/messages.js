/*
 * DesignSettings Messages
 *
 * This contains all the text for the DesignSettings container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DesignSettings';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Design',
  },
  main_color: {
    id: `${scope}.main_color`,
    defaultMessage: 'Main Color',
  },
  main_mode: {
    id: `${scope}.main_mode`,
    defaultMessage: 'Mode',
  },
});
