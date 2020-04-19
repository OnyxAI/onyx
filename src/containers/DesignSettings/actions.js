/*
 *
 * DesignSettings actions
 *
 */

import {
  CHANGE_COLOR,
  CHANGE_COLOR_ERROR,
  CHANGE_COLOR_SUCCESS,
  CHANGE_MODE,
  CHANGE_MODE_ERROR,
  CHANGE_MODE_SUCCESS,
} from './constants';

import { refreshToken } from '../Route/actions';

export function changeColor(color) {
  return {
    type: CHANGE_COLOR,
    color,
  };
}

export function changeColorSuccess() {
  return dispatch => {
    dispatch({ type: CHANGE_COLOR_SUCCESS });
    dispatch(refreshToken());
  };
}

export function changeColorError(error) {
  return {
    type: CHANGE_COLOR_ERROR,
    error,
  };
}

export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    mode,
  };
}

export function changeModeSuccess() {
  return dispatch => {
    dispatch({ type: CHANGE_MODE_SUCCESS });
    dispatch(refreshToken());
  };
}

export function changeModeError(error) {
  return {
    type: CHANGE_MODE_ERROR,
    error,
  };
}
