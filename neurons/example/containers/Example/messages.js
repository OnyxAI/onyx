/*
 * Example Messages
 *
 * This contains all the text for the Example container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Example';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Example',
  },
});
