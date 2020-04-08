/*
 * Neurons Messages
 *
 * This contains all the text for the Neurons container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Neurons';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Neurons',
  },
  install: {
    id: `${scope}.install`,
    defaultMessage: 'Install',
  },
  remove: {
    id: `${scope}.remove`,
    defaultMessage: 'Remove',
  },
});
