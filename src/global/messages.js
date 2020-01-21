/*
 * Global Messages
 *
 */

import { defineMessages } from 'react-intl';

export const scope = 'onyx.global';

export default defineMessages({
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Submit',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'An error has occured',
  },
});
