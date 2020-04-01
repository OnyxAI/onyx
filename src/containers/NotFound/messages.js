/*
 * Error Messages
 *
 * This contains all the text for the Auth container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'onyx.error';

export default defineMessages({
  not_found_message: {
    id: `${scope}.not_found_message`,
    defaultMessage:
      'Looks like the page you were looking for is no longer here.',
  },
});
