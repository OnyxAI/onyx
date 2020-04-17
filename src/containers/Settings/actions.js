/*
 *
 * Settings actions
 *
 */
import Toast from '@onyx/global/actions';
import {
  GET_ONYX_DATA_SUCCESS,
  GET_ONYX_DATA_ERROR,
  GET_ONYX_DATA,
  ADD_TOKEN,
  ADD_TOKEN_ERROR,
  ADD_TOKEN_SUCCESS,
  GET_TOKENS,
  GET_TOKENS_SUCCESS,
  GET_TOKENS_ERROR,
  DELETE_TOKEN,
  DELETE_TOKEN_ERROR,
  DELETE_TOKEN_SUCCESS,
  CHANGE_TOKEN_NAME,
  CHANGE_SELECTED,
} from './constants';

import { getMessage } from '../../i18n';

export function changeTokenName(name) {
  return {
    type: CHANGE_TOKEN_NAME,
    name,
  };
}

export function changeSelected(selected) {
  return {
    type: CHANGE_SELECTED,
    selected,
  };
}

export function getOnyxData() {
  return {
    type: GET_ONYX_DATA,
  };
}

export function getOnyxDataSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: GET_ONYX_DATA_SUCCESS });
    dispatch(
      Toast.success({
        text: getMessage(locale, 'onyx.Settings.get_onyx_data_success'),
      }),
    );
  };
}

export function getOnyxDataError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: GET_ONYX_DATA_ERROR, error });
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}

export function getTokens() {
  return {
    type: GET_TOKENS,
  };
}

export function getTokensSuccess(tokens) {
  return dispatch => {
    dispatch({
      type: GET_TOKENS_SUCCESS,
      tokens,
    });
  };
}

export function getTokensError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: GET_TOKENS_ERROR, error });
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}

export function addToken() {
  return {
    type: ADD_TOKEN,
  };
}

export function addTokenSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: ADD_TOKEN_SUCCESS });
    dispatch(getTokens());
    dispatch(
      Toast.success({
        text: getMessage(locale, 'onyx.Settings.add_token_success'),
      }),
    );
  };
}

export function addTokenError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: ADD_TOKEN_ERROR, error });
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}

export function deleteToken(id) {
  return {
    type: DELETE_TOKEN,
    id,
  };
}

export function deleteTokenSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: DELETE_TOKEN_SUCCESS });
    dispatch(getTokens());
    dispatch(
      Toast.success({
        text: getMessage(locale, 'onyx.Settings.delete_token_success'),
      }),
    );
  };
}

export function deleteTokenError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: DELETE_TOKEN_ERROR, error });
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}
