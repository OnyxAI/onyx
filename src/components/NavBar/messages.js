/*
 * Navbar Messages
 *
 * This contains all the text for the Navbar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.component.Navbar';

export default defineMessages({
  myaccount: {
    id: `${scope}.myaccount`,
    defaultMessage: 'My Account',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
  menu: {
    id: `${scope}.menu`,
    defaultMessage: 'Menu',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  user: {
    id: `${scope}.user`,
    defaultMessage: 'User',
  },
  modal_header: {
    id: `${scope}.modal_header`,
    defaultMessage: 'Add Link',
  },
  url: {
    id: `${scope}.url`,
    defaultMessage: 'Link',
  },
  other_settings: {
    id: `${scope}.other_settings`,
    defaultMessage: 'Other Settings',
  },
  custom_icon: {
    id: `${scope}.custom_icon`,
    defaultMessage: 'Custom Icon (eg: fa fa-user)',
  },
  send: {
    id: `${scope}.send`,
    defaultMessage: 'Send',
  },
});