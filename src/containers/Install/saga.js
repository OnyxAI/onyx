import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '@onyx/utils/request';
import { makeSelectInstall } from './selectors';
import { GET_INSTALL, INSTALL_ONYX } from './constants';

import {
  getInstallSuccess,
  getInstallError,
  installOnyxSuccess,
  installOnyxError,
} from './actions';

// Get Install
export function* loadGetInstall() {
  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/install`,
    });
    if (result && result.status === 'success') {
      yield put(getInstallSuccess(result.isInstalled));
    } else if (result && result.status === 'error') {
      yield put(getInstallError(result.message));
    } else {
      yield put(getInstallError('onyx.global.error'));
    }
  } catch (error) {
    yield put(getInstallError(error.toString()));
  }
}

// Install Onyx
export function* loadInstallOnyx() {
  const install = yield select(makeSelectInstall());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/install`,
      data: {
        email: install.email,
        password: install.password,
        username: install.username,
        language: install.language,
        firstname: install.firstname,
        lastname: install.lastname,
      },
    });
    if (result && result.status === 'success') {
      yield put(installOnyxSuccess());
    } else if (result && result.status === 'error') {
      yield put(installOnyxError(result.message));
    } else {
      yield put(installOnyxError('onyx.global.error'));
    }
  } catch (error) {
    yield put(installOnyxError(error.toString()));
  }
}

// Individual exports for testing
export default function* installSaga() {
  yield takeLatest(GET_INSTALL, loadGetInstall);
  yield takeLatest(INSTALL_ONYX, loadInstallOnyx);
}
