/*
 * Screen Messages
 *
 * This contains all the text for the Main container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Screen';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Screen',
  },
  screen: {
    id: `${scope}.screen`,
    defaultMessage: 'Screen',
  },
  no_screen: {
    id: `${scope}.no_screen`,
    defaultMessage: 'Please configure Screen',
  },
  add_screen_success: {
    id: `${scope}.add_screen_success`,
    defaultMessage: 'Screen added',
  },
  delete_screen_success: {
    id: `${scope}.delete_screen_success`,
    defaultMessage: 'Screen deleted',
  },
  modal_header: {
    id: `${scope}.modal_header`,
    defaultMessage: 'Add',
  },
});
