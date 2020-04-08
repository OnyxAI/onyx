import Toast from '@onyx/global/actions';
import { getMessage } from '@onyx/i18n';
import {
  VERIFY_TOKEN,
  VERIFY_TOKEN_ERROR,
  VERIFY_TOKEN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  REFRESH_TOKEN,
  REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_SUCCESS,
} from './constants';

export function refreshToken() {
  return {
    type: REFRESH_TOKEN,
  };
}

export function refreshTokenSuccess(accessToken) {
  localStorage.setItem('access_token', accessToken);

  return {
    type: REFRESH_TOKEN_SUCCESS,
  };
}

export function refreshTokenError(error) {
  return {
    type: REFRESH_TOKEN_ERROR,
    error,
  };
}

export function verifyToken() {
  return {
    type: VERIFY_TOKEN,
  };
}

export function verifyTokenSuccess(user) {
  return {
    type: VERIFY_TOKEN_SUCCESS,
    user,
  };
}

export function verifyTokenError(error) {
  return {
    type: VERIFY_TOKEN_ERROR,
    error,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function logoutUserSuccess() {
  localStorage.setItem('access_token', '');
  localStorage.setItem('refresh_token', '');

  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({
      type: LOGOUT_USER_SUCCESS,
    });
    dispatch(
      Toast.success({ text: getMessage(locale, 'onyx.auth.logout_success') }),
    );
  };
}

export function logoutUserError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({
      type: LOGOUT_USER_ERROR,
      error,
    });
    dispatch(Toast.error({ text: getMessage(locale, 'onyx.global.error') }));
  };
}
