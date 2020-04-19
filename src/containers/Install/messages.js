/*
 * Install Messages
 *
 * This contains all the text for the Install container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'onyx.containers.Install';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Install',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  verif_password: {
    id: `${scope}.verif_password`,
    defaultMessage: 'Password Again',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username',
  },
  lastname: {
    id: `${scope}.lastname`,
    defaultMessage: 'Lastname',
  },
  firstname: {
    id: `${scope}.firstname`,
    defaultMessage: 'Firstname',
  },
  french: {
    id: `${scope}.french`,
    defaultMessage: 'French',
  },
  english: {
    id: `${scope}.english`,
    defaultMessage: 'English',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
  previous: {
    id: `${scope}.previous`,
    defaultMessage: 'Previous',
  },
  welcome_message: {
    id: `${scope}.welcome_message`,
    defaultMessage:
      'Welcome to Onyx, you can install it simply by the following the next step ! Enjoy with your personnal assistant !',
  },
  header_data: {
    id: `${scope}.header_data`,
    defaultMessage:
      'Please download all the Onyx data to get the best experience.',
  },
  header_token: {
    id: `${scope}.header_token`,
    defaultMessage:
      'Add an API token to allows Onyx communicate with all services.',
  },
  add_token: {
    id: `${scope}.add_token`,
    defaultMessage: 'Add Token.',
  },
  download_data: {
    id: `${scope}.download_data`,
    defaultMessage: 'Download Data',
  },
  header_account: {
    id: `${scope}.header_account`,
    defaultMessage: 'Create an admin account to manage your Onyx.',
  },
  error_empty: {
    id: `${scope}.error_empty`,
    defaultMessage: 'Every input must be set',
  },
  error_email: {
    id: `${scope}.error_email`,
    defaultMessage: 'Invalid email',
  },
  error_password: {
    id: `${scope}.error_password`,
    defaultMessage: 'Passwords mismatch',
  },
  header_finish: {
    id: `${scope}.header_finish`,
    defaultMessage:
      'Everything is good, please finish the installation to access Onyx !',
  },
  finish: {
    id: `${scope}.finish`,
    defaultMessage: 'Finish',
  },
  install_success: {
    id: `${scope}.install_success`,
    defaultMessage: 'Onyx is installed with success !',
  },
  install_error: {
    id: `${scope}.install_error`,
    defaultMessage: 'An error appear during installation !',
  },
});
