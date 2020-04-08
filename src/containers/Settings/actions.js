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
} from './constants';

import { getMessage } from '../../i18n';

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
        text: getMessage(locale, 'onyx.settings.get_onyx_data_success'),
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
