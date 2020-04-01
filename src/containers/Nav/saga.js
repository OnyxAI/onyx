import { call, put, takeLatest, select } from 'redux-saga/effects';
import { API_URL } from 'global/constants';
import request from 'utils/request';
import { ADD_NAV, REMOVE_NAV, GET_NAV } from './constants';

import {
  addNavSuccess,
  addNavError,
  removeNavSuccess,
  removeNavError,
  getNavError,
  getNavSuccess,
} from './actions';

import makeSelectNav from './selectors';

// Get Nav
export function* loadGetNav() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `${API_URL}/users/nav`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getNavSuccess(result.nav));
    } else if (result && result.status === 'error') {
      yield put(getNavError(result.message));
    } else {
      yield put(getNavError('An error has occured'));
    }
  } catch (error) {
    yield put(getNavError(error.toString()));
  }
}

// Add Nav
export function* loadAddNav() {
  const token = localStorage.getItem('access_token');

  const nav = yield select(makeSelectNav());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `${API_URL}/users/nav`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        color: nav.color,
        icon: nav.icon,
        url: nav.url,
        position: nav.position,
        buttonNumber: nav.buttonNumber,
      },
    });
    if (result && result.status === 'success') {
      yield put(addNavSuccess());
    } else if (result && result.status === 'error') {
      yield put(addNavError(result.message));
    } else {
      yield put(addNavError('An error has occured'));
    }
  } catch (error) {
    yield put(addNavError(error.toString()));
  }
}

// Remove Nav
export function* loadRemoveNav() {
  const token = localStorage.getItem('access_token');

  const nav = yield select(makeSelectNav());

  try {
    const result = yield call(request, {
      method: 'PUT',
      url: `${API_URL}/users/nav`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        position: nav.position,
        buttonNumber: nav.buttonNumber,
      },
    });
    if (result && result.status === 'success') {
      yield put(removeNavSuccess());
    } else if (result && result.status === 'error') {
      yield put(removeNavError(result.message));
    } else {
      yield put(removeNavError('An error has occured'));
    }
  } catch (error) {
    yield put(removeNavError(error.toString()));
  }
}

// Individual exports for testing
export default function* navSaga() {
  yield takeLatest(GET_NAV, loadGetNav);
  yield takeLatest(ADD_NAV, loadAddNav);
  yield takeLatest(REMOVE_NAV, loadRemoveNav);
}
