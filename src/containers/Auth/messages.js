/*
 * Auth Messages
 *
 * This contains all the text for the Auth container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'onyx.auth';

export default defineMessages({
  login_header: {
    id: `${scope}.login_header`,
    defaultMessage: 'Login',
  },
  register_header: {
    id: `${scope}.register_header`,
    defaultMessage: 'Register',
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
  forgot: {
    id: `${scope}.forgot`,
    defaultMessage: 'Forgot Password ?',
  },
  remember: {
    id: `${scope}.remember`,
    defaultMessage: 'Remember me',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
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
  logout_success: {
    id: `${scope}.logout_success`,
    defaultMessage: 'You are now disconnected',
  },
  register_success: {
    id: `${scope}.register_success`,
    defaultMessage: 'You are now registered',
  },
  register_error: {
    id: `${scope}.register_error`,
    defaultMessage: 'User already registered',
  },
  password_mismatch: {
    id: `${scope}.password_mismatch`,
    defaultMessage: 'Password Mismatch',
  },
  login_success: {
    id: `${scope}.login_success`,
    defaultMessage: 'You are logged in !',
  },
  login_error: {
    id: `${scope}.login_error`,
    defaultMessage: 'Password or Email is wrong',
  },
});
