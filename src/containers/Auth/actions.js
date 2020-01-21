import Toast from 'global/actions';
import { push } from 'connected-react-router';
import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  CHANGE_INPUT,
} from './constants';

import { getMessage } from '../../i18n';

export function changeInput(input, value) {
  return {
    type: CHANGE_INPUT,
    input,
    value,
  };
}

/**
 * Login User Actions
 */
export function loginUser() {
  return {
    type: LOGIN_USER,
  };
}

export function loginUserSuccess(accessToken, refreshToken) {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);

  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({
      type: LOGIN_USER_SUCCESS,
      refreshToken,
      accessToken,
    });
    dispatch(
      Toast.success({ text: getMessage(locale, 'onyx.auth.login_success') }),
    );
  };
}

export function loginUserError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({
      type: LOGIN_USER_ERROR,
      error,
    });
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}

/**
 * Register User Actions
 */
export function registerUser() {
  return {
    type: REGISTER_USER,
  };
}

export function registerUserSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: REGISTER_USER_SUCCESS });
    dispatch(push('/login'));
    dispatch(
      Toast.success({ text: getMessage(locale, 'onyx.auth.register_success') }),
    );
  };
}

export function registerUserError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({
      type: REGISTER_USER_ERROR,
      error,
    });
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}
