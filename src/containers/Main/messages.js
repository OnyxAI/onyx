/*
 * Main Messages
 *
 * This contains all the text for the Main container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Main';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Main',
  },
  widget: {
    id: `${scope}.widget`,
    defaultMessage: 'Widget',
  },
  no_widgets: {
    id: `${scope}.no_widgets`,
    defaultMessage: 'There is no widgets',
  },
  add_widget_success: {
    id: `${scope}.add_widget_success`,
    defaultMessage: 'Widget added',
  },
  delete_widget_success: {
    id: `${scope}.delete_widget_success`,
    defaultMessage: 'Widget deleted',
  },
  modal_header: {
    id: `${scope}.modal_header`,
    defaultMessage: 'Add',
  },
});
