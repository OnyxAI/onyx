import { call, put, takeLatest } from 'redux-saga/effects';
import { API_URL } from '@onyx/global/constants';
import request from '@onyx/utils/request';
import { GET_ONYX_DATA } from './constants';

import { getOnyxDataSuccess, getOnyxDataError } from './actions';

// Get Onyx Data
export function* loadGetOnyxData() {
  try {
    const result = yield call(request, {
      method: 'GET',
      url: `${API_URL}/settings/get_onyx_data`,
    });
    if (result && result.status === 'success') {
      yield put(getOnyxDataSuccess());
    } else if (result && result.status === 'error') {
      yield put(getOnyxDataError(result.message));
    } else {
      yield put(getOnyxDataError('onyx.global.error'));
    }
  } catch (error) {
    yield put(getOnyxDataError(error.toString()));
  }
}

// Individual exports for testing
export default function* settingsSaga() {
  yield takeLatest(GET_ONYX_DATA, loadGetOnyxData);
}
