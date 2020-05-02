/*
 *
 * Screen actions
 *
 */
import Toast from '@onyx/global/actions';
import {
  SET_SCREEN_SUCCESS,
  SET_SCREEN_ERROR,
  SET_SCREEN,
  GET_SCREEN_SUCCESS,
  GET_SCREEN_ERROR,
  GET_SCREEN,
  GET_SCREEN_STORE,
  GET_SCREEN_STORE_ERROR,
  GET_SCREEN_STORE_SUCCESS,
  ADD_SCREEN,
  ADD_SCREEN_ERROR,
  ADD_SCREEN_SUCCESS,
  DELETE_SCREEN,
  DELETE_SCREEN_ERROR,
  DELETE_SCREEN_SUCCESS,
  CHANGE_SCREEN,
  MANAGE_SCREEN,
} from './constants';

import { getMessage } from '../../i18n';

export function manageScreen() {
  return {
    type: MANAGE_SCREEN,
  };
}

export function onChangeScreen(
  name,
  raw,
  type,
  screenBeautifulName,
  screenDefaultLayout,
) {
  return {
    type: CHANGE_SCREEN,
    name,
    raw,
    screenType: type,
    screenBeautifulName,
    screenDefaultLayout,
  };
}

export function setScreen(layouts) {
  return {
    type: SET_SCREEN,
    layouts,
  };
}

export function setScreenSuccess() {
  return dispatch => {
    dispatch({
      type: SET_SCREEN_SUCCESS,
    });
  };
}

export function setScreenError(error) {
  return dispatch => {
    dispatch({ type: SET_SCREEN_ERROR, error });
  };
}

export function getScreen() {
  return {
    type: GET_SCREEN,
  };
}

export function getScreenSuccess(screen, layouts) {
  return dispatch => {
    dispatch({
      type: GET_SCREEN_SUCCESS,
      screen,
      layouts,
    });
  };
}

export function getScreenError(error) {
  return dispatch => {
    dispatch({ type: GET_SCREEN_ERROR, error });
  };
}

export function getScreenStore() {
  return {
    type: GET_SCREEN_STORE,
  };
}

export function getScreenStoreSuccess(screenStore) {
  return dispatch => {
    dispatch({
      type: GET_SCREEN_STORE_SUCCESS,
      screenStore,
    });
  };
}

export function getScreenStoreError(error) {
  return dispatch => {
    dispatch({ type: GET_SCREEN_STORE_ERROR, error });
  };
}

export function addScreen() {
  return {
    type: ADD_SCREEN,
  };
}

export function addScreenSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: ADD_SCREEN_SUCCESS });
    dispatch(getScreen());
    dispatch(
      Toast.success({
        text: getMessage(locale, 'app.containers.Main.add_screen_success'),
      }),
    );
  };
}

export function addScreenError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: ADD_SCREEN_ERROR, error });
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}

export function deleteScreen(id) {
  return {
    type: DELETE_SCREEN,
    id,
  };
}

export function deleteScreenSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: DELETE_SCREEN_SUCCESS });
    dispatch(getScreen());
    dispatch(
      Toast.success({
        text: getMessage(locale, 'app.containers.Main.delete_screen_success'),
      }),
    );
  };
}

export function deleteScreenError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: DELETE_SCREEN_ERROR, error });
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}
