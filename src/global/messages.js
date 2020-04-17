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
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  no_access: {
    id: `${scope}.no_access`,
    defaultMessage: "You don't have the right to access it !",
  },
});
