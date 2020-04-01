/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, call } from 'redux-saga/effects';

import { API_URL } from 'global/constants';
import { changeLocale } from 'containers/LanguageProvider/actions';
import request from 'utils/request';

import { VERIFY_TOKEN, LOGOUT_USER, REFRESH_TOKEN } from '../constants';

import authSaga, {
  loadVerifyToken,
  loadLogoutUser,
  loadRefreshUser,
} from '../saga';
import * as AuthAction from '../actions';

describe('Auth Saga', () => {
  let verifyTokenGenerator;
  let logoutUserGenerator;
  let refreshTokenGenerator;

  beforeEach(() => {
    verifyTokenGenerator = loadVerifyToken();
    logoutUserGenerator = loadLogoutUser();
    refreshTokenGenerator = loadRefreshUser();
  });

  it('should call the api to verify token', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = verifyTokenGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `${API_URL}/users/token_valid`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for verify token', () => {
    const result = {
      status: 'success',
      user: { language: 'fr-Fr' },
    };
    verifyTokenGenerator.next();
    verifyTokenGenerator.next(result);
    const putDescriptor = verifyTokenGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(AuthAction.verifyTokenSuccess({ language: 'fr-Fr' })),
    );
  });

  it('should call api success for changing language', () => {
    const result = {
      status: 'success',
      user: { language: 'fr-Fr' },
    };
    verifyTokenGenerator.next();
    const putDescriptor = verifyTokenGenerator.next(result).value;

    expect(putDescriptor).toEqual(put(changeLocale('fr-Fr')));
  });

  it('should call api with error for verify token', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    verifyTokenGenerator.next();
    const putDescriptor = verifyTokenGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(AuthAction.verifyTokenError('An error has occured')),
    );
  });

  it('should dispatch an error if it requests doesnt work for verify token', () => {
    verifyTokenGenerator.next();
    const putDescriptor = verifyTokenGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(AuthAction.verifyTokenError('onyx.global.error')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    verifyTokenGenerator.next();
    const putDescriptor = verifyTokenGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(AuthAction.verifyTokenError('Error: Some error')),
    );
  });

  it('should call the api to refresh token', () => {
    localStorage.setItem('refresh_token', 'my_token');
    const callDescriptor = refreshTokenGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `${API_URL}/users/refresh_token`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for refresh token', () => {
    const result = {
      status: 'success',
      access_token: '12345',
    };
    refreshTokenGenerator.next();
    const putDescriptor = refreshTokenGenerator.next(result).value;

    expect(putDescriptor).toEqual(put(AuthAction.refreshTokenSuccess('12345')));
  });

  it('should call api success for verifyToken after refresh', () => {
    const result = {
      status: 'success',
      access_token: '12345',
    };
    refreshTokenGenerator.next();
    refreshTokenGenerator.next(result);
    const putDescriptor = refreshTokenGenerator.next().value;

    expect(putDescriptor).toEqual(put(AuthAction.verifyToken()));
  });

  it('should call api with error for refresh token', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    refreshTokenGenerator.next();
    const putDescriptor = refreshTokenGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(AuthAction.refreshTokenError('An error has occured')),
    );
  });

  it('should dispatch an error if it requests doesnt work for refresh token', () => {
    refreshTokenGenerator.next();
    const putDescriptor = refreshTokenGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(AuthAction.refreshTokenError('onyx.global.error')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    refreshTokenGenerator.next();
    const putDescriptor = refreshTokenGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(AuthAction.refreshTokenError('Error: Some error')),
    );
  });

  it('should call the api to logout user', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = logoutUserGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `${API_URL}/users/logout_access`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for logout', () => {
    const spy = jest.spyOn(AuthAction, 'logoutUserSuccess');
    const result = {
      status: 'success',
    };
    logoutUserGenerator.next();
    logoutUserGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error', () => {
    const spy = jest.spyOn(AuthAction, 'logoutUserError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    logoutUserGenerator.next();
    logoutUserGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for logout', () => {
    const spy = jest.spyOn(AuthAction, 'logoutUserError');
    logoutUserGenerator.next();
    logoutUserGenerator.next();

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch and error if an error is raised for logout', () => {
    const spy = jest.spyOn(AuthAction, 'logoutUserError');
    const response = new Error('Some error');
    logoutUserGenerator.next();
    logoutUserGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

describe('Auth Saga', () => {
  const authSagaFunc = authSaga();

  it('should start task to watch for VERIFY_TOKEN action', () => {
    const takeLatestDescriptor = authSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(VERIFY_TOKEN, loadVerifyToken),
    );
  });

  it('should start task to watch for LOGOUT_USER action', () => {
    const takeLatestDescriptor = authSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOGOUT_USER, loadLogoutUser),
    );
  });

  it('should start task to watch for REFRESH_TOKEN action', () => {
    const takeLatestDescriptor = authSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(REFRESH_TOKEN, loadRefreshUser),
    );
  });
});
