import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL } from 'global/constants';
import { LOGIN_USER, REGISTER_USER } from './constants';
import makeSelectAuth from './selectors';

import {
  loginUserError,
  loginUserSuccess,
  registerUserError,
  registerUserSuccess,
} from './actions';

// Login User
export function* loadLoginUser() {
  const login = yield select(makeSelectAuth());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `${API_URL}/users/login`,
      data: {
        email: login.email,
        password: login.password,
      },
    });
    if (result && result.status === 'success') {
      yield put(loginUserSuccess(result.access_token, result.refresh_token));
    } else if (result && result.status === 'error') {
      yield put(loginUserError(result.message));
    } else {
      yield put(loginUserError('onyx.global.error'));
    }
  } catch (error) {
    yield put(loginUserError('onyx.global.error'));
  }
}

// Register User
export function* loadRegisterUser() {
  const register = yield select(makeSelectAuth());

  try {
    if (register.password === register.verifPassword) {
      const result = yield call(request, {
        method: 'POST',
        url: `${API_URL}/users/register`,
        data: {
          email: register.email,
          password: register.password,
          username: register.username,
          language: register.language,
          firstname: register.firstname,
          lastname: register.lastname,
        },
      });
      if (result && result.status === 'success') {
        yield put(registerUserSuccess());
      } else if (result && result.status === 'error') {
        yield put(registerUserError(result.message));
      } else {
        yield put(registerUserError('onyx.global.error'));
      }
    } else {
      yield put(registerUserError('onyx.auth.password_mismatch'));
    }
  } catch (error) {
    yield put(registerUserError('onyx.global.error'));
  }
}

// Individual exports for testing
export default function* authSaga() {
  yield takeLatest(LOGIN_USER, loadLoginUser);
  yield takeLatest(REGISTER_USER, loadRegisterUser);
}
