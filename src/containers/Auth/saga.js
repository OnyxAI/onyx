import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '@onyx/utils/request';

import { LOGIN_USER, REGISTER_USER, MANAGE_USER } from './constants';
import makeSelectAuth from './selectors';

import {
  loginUserError,
  loginUserSuccess,
  registerUserError,
  registerUserSuccess,
  manageUserSuccess,
  manageUserError,
} from './actions';

import { changeLocale } from '../LanguageProvider/actions';
import { verifyTokenSuccess } from '../Route/actions';

// Login User
export function* loadLoginUser() {
  const login = yield select(makeSelectAuth());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/users/login`,
      data: {
        email: login.email,
        password: login.password,
      },
    });
    if (result && result.status === 'success') {
      yield put(loginUserSuccess(result.access_token, result.refresh_token));
      yield put(changeLocale(result.user.language));
      yield put(verifyTokenSuccess(result.user));
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
        url: `/api/users/register`,
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

// Manage User
export function* loadManageUser() {
  const token = localStorage.getItem('access_token');
  const manage = yield select(makeSelectAuth());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/users/manage`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        email: manage.email,
        password: manage.password,
        username: manage.username,
        language: manage.language,
        firstname: manage.firstname,
        lastname: manage.lastname,
        verifPassword: manage.verifPassword,
      },
    });
    if (result && result.status === 'success') {
      yield put(manageUserSuccess(result.access_token, result.refresh_token));
    } else if (result && result.status === 'error') {
      yield put(manageUserError(result.message));
    } else {
      yield put(manageUserError('onyx.global.error'));
    }
  } catch (error) {
    yield put(manageUserError(error.toString()));
  }
}

// Individual exports for testing
export default function* authSaga() {
  yield takeLatest(LOGIN_USER, loadLoginUser);
  yield takeLatest(REGISTER_USER, loadRegisterUser);
  yield takeLatest(MANAGE_USER, loadManageUser);
}
