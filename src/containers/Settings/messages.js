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
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  copy: {
    id: `${scope}.copy`,
    defaultMessage: 'Copy',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  onyx_data_title: {
    id: `${scope}.onyx_data_title`,
    defaultMessage: 'Onyx Data',
  },
  tokens_title: {
    id: `${scope}.tokens_title`,
    defaultMessage: 'Tokens',
  },
  onyx_data: {
    id: `${scope}.onyx_data`,
    defaultMessage: 'Download Onyx Data',
  },
  onyx_data_header: {
    id: `${scope}.onyx_data_header`,
    defaultMessage: 'Manage Onyx Data',
  },
  add_token_success: {
    id: `${scope}.add_token_success`,
    defaultMessage: 'Token added !',
  },
  delete_token_success: {
    id: `${scope}.delete_token_success`,
    defaultMessage: 'Token deleted !',
  },
  get_onyx_data_success: {
    id: `${scope}.get_onyx_data_success`,
    defaultMessage: 'Data Downloaded !',
  },
});
