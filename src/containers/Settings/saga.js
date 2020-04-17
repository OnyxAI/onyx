import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '@onyx/utils/request';
import {
  GET_ONYX_DATA,
  GET_TOKENS,
  ADD_TOKEN,
  DELETE_TOKEN,
} from './constants';

import {
  getOnyxDataSuccess,
  getOnyxDataError,
  getTokensError,
  getTokensSuccess,
  addTokenSuccess,
  addTokenError,
  deleteTokenError,
  deleteTokenSuccess,
} from './actions';

import { makeSelectSettings } from './selectors';

// Get Onyx Data
export function* loadGetOnyxData() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/settings/get_onyx_data`,
      headers: { Authorization: `Bearer ${token}` },
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

// Get Tokens
export function* loadGetTokens() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/tokens`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getTokensSuccess(result.tokens));
    } else if (result && result.status === 'error') {
      yield put(getTokensError(result.message));
    } else {
      yield put(getTokensError('onyx.global.error'));
    }
  } catch (error) {
    yield put(getTokensError(error.toString()));
  }
}

// Add Token
export function* loadAddToken() {
  const token = localStorage.getItem('access_token');
  const tokens = yield select(makeSelectSettings());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/tokens`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: tokens.tokenName,
      },
    });
    if (result && result.status === 'success') {
      yield put(addTokenSuccess());
    } else if (result && result.status === 'error') {
      yield put(addTokenError(result.message));
    } else {
      yield put(addTokenError('onyx.global.error'));
    }
  } catch (error) {
    yield put(addTokenError(error.toString()));
  }
}

// Delete Token
export function* loadDeleteToken() {
  const token = localStorage.getItem('access_token');
  const tokens = yield select(makeSelectSettings());

  try {
    const result = yield call(request, {
      method: 'PUT',
      url: `/api/tokens`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        id: tokens.tokenId,
      },
    });
    if (result && result.status === 'success') {
      yield put(deleteTokenSuccess());
    } else if (result && result.status === 'error') {
      yield put(deleteTokenError(result.message));
    } else {
      yield put(deleteTokenError('onyx.global.error'));
    }
  } catch (error) {
    yield put(deleteTokenError(error.toString()));
  }
}

// Individual exports for testing
export default function* settingsSaga() {
  yield takeLatest(GET_ONYX_DATA, loadGetOnyxData);
  yield takeLatest(GET_TOKENS, loadGetTokens);
  yield takeLatest(ADD_TOKEN, loadAddToken);
  yield takeLatest(DELETE_TOKEN, loadDeleteToken);
}
