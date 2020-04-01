/*
 *
 * Nav actions
 *
 */
import {
  ADD_NAV,
  ADD_NAV_ERROR,
  ADD_NAV_SUCCESS,
  CHANGE_NAV_COLOR,
  CHANGE_NAV_ICON,
  CHANGE_NAV_URL,
  CHANGE_NAV_ON_MANAGE,
  REMOVE_NAV,
  REMOVE_NAV_ERROR,
  REMOVE_NAV_SUCCESS,
  GET_NAV,
  GET_NAV_ERROR,
  GET_NAV_SUCCESS,
} from './constants';

export function getNav() {
  return {
    type: GET_NAV,
  };
}

export function getNavSuccess(nav) {
  return {
    type: GET_NAV_SUCCESS,
    nav,
  };
}

export function getNavError(error) {
  return {
    type: GET_NAV_ERROR,
    error,
  };
}

export function addNav(buttonNumber, position) {
  return {
    type: ADD_NAV,
    position,
    buttonNumber,
  };
}

export function addNavSuccess() {
  return dispatch => {
    dispatch({ type: ADD_NAV_SUCCESS });
    dispatch(getNav());
  };
}

export function addNavError(error) {
  return {
    type: ADD_NAV_ERROR,
    error,
  };
}

export function changeOnManage(onManage) {
  return {
    type: CHANGE_NAV_ON_MANAGE,
    onManage,
  };
}

export function changeNavColor(color) {
  return {
    type: CHANGE_NAV_COLOR,
    color,
  };
}

export function changeNavIcon(icon) {
  return {
    type: CHANGE_NAV_ICON,
    icon,
  };
}

export function changeNavUrl(url) {
  return {
    type: CHANGE_NAV_URL,
    url,
  };
}

export function removeNav(buttonNumber, position) {
  return {
    type: REMOVE_NAV,
    position,
    buttonNumber,
  };
}

export function removeNavSuccess() {
  return dispatch => {
    dispatch({ type: REMOVE_NAV_SUCCESS });
    dispatch(getNav());
  };
}

export function removeNavError(error) {
  return {
    type: REMOVE_NAV_ERROR,
    error,
  };
}
