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
  screen: {
    id: `${scope}.screen`,
    defaultMessage: 'Screen',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  notifications: {
    id: `${scope}.notifications`,
    defaultMessage: 'Notifications',
  },
  neurons: {
    id: `${scope}.neurons`,
    defaultMessage: 'Neurons',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  user: {
    id: `${scope}.user`,
    defaultMessage: 'User',
  },
  modal_header: {
    id: `${scope}.modal_header`,
    defaultMessage: 'Add Link',
  },
  modal_header_icon: {
    id: `${scope}.modal_header_icon`,
    defaultMessage: 'Modifier',
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
