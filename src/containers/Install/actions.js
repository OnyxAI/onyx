/*
 *
 * Install actions
 *
 */
import Toast from '@onyx/global/actions';
import {
  GET_INSTALL,
  GET_INSTALL_SUCCESS,
  GET_INSTALL_ERROR,
  INSTALL_ONYX,
  INSTALL_ONYX_SUCCESS,
  INSTALL_ONYX_ERROR,
  CHANGE_INPUT,
  CHANGE_STEP,
  ACCOUNT_ERROR,
} from './constants';

import { getMessage } from '../../i18n';

export function accountError(error) {
  return {
    type: ACCOUNT_ERROR,
    error,
  };
}

export function changeInput(input, value) {
  return {
    type: CHANGE_INPUT,
    input,
    value,
  };
}

export function changeStep(step) {
  return {
    type: CHANGE_STEP,
    step,
  };
}

export function installOnyx() {
  return {
    type: INSTALL_ONYX,
  };
}

export function installOnyxSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: INSTALL_ONYX_SUCCESS });
    dispatch(getInstall());
    dispatch(
      Toast.success({
        text: getMessage(locale, 'onyx.containers.Install.install_success'),
      }),
    );
  };
}

export function installOnyxError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: INSTALL_ONYX_ERROR });
    dispatch(
      Toast.error({
        text: getMessage(locale, error),
      }),
    );
  };
}

export function getInstall() {
  return {
    type: GET_INSTALL,
  };
}

export function getInstallSuccess(isInstalled) {
  return {
    type: GET_INSTALL_SUCCESS,
    isInstalled,
  };
}

export function getInstallError(error) {
  return {
    type: GET_INSTALL_ERROR,
    error,
  };
}
