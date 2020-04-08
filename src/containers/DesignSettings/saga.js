import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '@onyx/utils/request';
import { CHANGE_COLOR } from './constants';

import { changeColorSuccess, changeColorError } from './actions';

import { makeSelectColor } from './selectors';

// Change Color
export function* loadChangeColor() {
  const token = localStorage.getItem('access_token');

  const color = yield select(makeSelectColor());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/users/color`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        color,
      },
    });
    if (result && result.status === 'success') {
      yield put(changeColorSuccess());
    } else if (result && result.status === 'error') {
      yield put(changeColorError(result.message));
    } else {
      yield put(changeColorError('onyx.global.error'));
    }
  } catch (error) {
    yield put(changeColorError(error.toString()));
  }
}

// Individual exports for testing
export default function* designSettingsSaga() {
  yield takeLatest(CHANGE_COLOR, loadChangeColor);
}
