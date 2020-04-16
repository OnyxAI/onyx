import { call, put, takeLatest } from 'redux-saga/effects';

import request from '@onyx/utils/request';
import { RELOAD_API } from './constants';

import { globalError } from './actions';

// Reload Onyx API
export function* loadReloadApi() {
  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/reload_onyx`,
    });
    if (result && result.status === 'error') {
      yield put(globalError(result.message));
    }
  } catch (error) {
    yield put(globalError(error.toString()));
  }
}

// Individual exports for testing
export default function* settingsSaga() {
  yield takeLatest(RELOAD_API, loadReloadApi);
}
