import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '@onyx/utils/request';
import {
  GET_SCREEN,
  GET_SCREEN_STORE,
  ADD_SCREEN,
  DELETE_SCREEN,
} from './constants';

import {
  getScreenError,
  getScreenSuccess,
  getScreenStoreSuccess,
  getScreenStoreError,
  addScreenSuccess,
  addScreenError,
  deleteScreenError,
  deleteScreenSuccess,
} from './actions';

import { makeSelectScreen } from './selectors';

// Get Screen
export function* loadGetScreen() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/screen`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getScreenSuccess(result.screen));
    } else if (result && result.status === 'error') {
      yield put(getScreenError(result.message));
    } else {
      yield put(getScreenError('onyx.global.error'));
    }
  } catch (error) {
    yield put(getScreenError(error.toString()));
  }
}

// Get Screen Store
export function* loadGetScreenStore() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/screen/store`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getScreenStoreSuccess(result.screen));
    } else if (result && result.status === 'error') {
      yield put(getScreenStoreError(result.message));
    } else {
      yield put(getScreenStoreError('onyx.global.error'));
    }
  } catch (error) {
    yield put(getScreenStoreError(error.toString()));
  }
}

// Add Screen
export function* loadAddScreen() {
  const token = localStorage.getItem('access_token');
  const screen = yield select(makeSelectScreen());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/screen`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        raw: screen.screenRaw,
        name: screen.screenName,
        type: screen.screenType,
      },
    });
    if (result && result.status === 'success') {
      yield put(addScreenSuccess());
    } else if (result && result.status === 'error') {
      yield put(addScreenError(result.message));
    } else {
      yield put(addScreenError('onyx.global.error'));
    }
  } catch (error) {
    yield put(addScreenError(error.toString()));
  }
}

// Delete Screen
export function* loadDeleteScreen() {
  const token = localStorage.getItem('access_token');
  const screen = yield select(makeSelectScreen());

  try {
    const result = yield call(request, {
      method: 'PUT',
      url: `/api/screen`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        id: screen.screenId,
      },
    });
    if (result && result.status === 'success') {
      yield put(deleteScreenSuccess());
    } else if (result && result.status === 'error') {
      yield put(deleteScreenError(result.message));
    } else {
      yield put(deleteScreenError('onyx.global.error'));
    }
  } catch (error) {
    yield put(deleteScreenError(error.toString()));
  }
}

// Individual exports for testing
export default function* screenSaga() {
  yield takeLatest(GET_SCREEN_STORE, loadGetScreenStore);
  yield takeLatest(GET_SCREEN, loadGetScreen);
  yield takeLatest(ADD_SCREEN, loadAddScreen);
  yield takeLatest(DELETE_SCREEN, loadDeleteScreen);
}
