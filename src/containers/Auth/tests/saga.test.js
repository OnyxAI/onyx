/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call } from 'redux-saga/effects';

import { API_URL } from '@onyx/global/constants';
import request from '@onyx/utils/request';

import { LOGIN_USER, REGISTER_USER, MANAGE_USER } from '../constants';
import * as AuthAction from '../actions';

import authSaga, {
  loadLoginUser,
  loadRegisterUser,
  loadManageUser,
} from '../saga';

const email = 'test@test.fr';
const password = '123456';
const verifPassword = '123456';
const username = 'test';
const firstname = 'John';
const lastname = 'Doe';
const language = 'fr-FR';

const registerState = {
  email,
  password,
  verifPassword,
  username,
  firstname,
  lastname,
  language,
};

const loginState = {
  email,
  password,
};

const manageState = {
  email,
  password,
  verifPassword,
  username,
  firstname,
  lastname,
  language,
};

/* eslint-disable redux-saga/yield-effects */
describe('loginUser Saga', () => {
  let loginUserGenerator;

  beforeEach(() => {
    loginUserGenerator = loadLoginUser();
  });

  it('should call the api to login', () => {
    loginUserGenerator.next();
    const callDescriptor = loginUserGenerator.next(loginState).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `${API_URL}/users/login`,
        data: {
          email,
          password,
        },
      }),
    );
  });

  it('should call api success for login User', () => {
    const spy = jest.spyOn(AuthAction, 'loginUserSuccess');
    const result = {
      status: 'success',
      access_token: 'my_token',
      refresh_token: 'my_token',
    };
    loginUserGenerator.next();
    loginUserGenerator.next({});
    loginUserGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('my_token', 'my_token');
  });

  it('should call api with error for login user', () => {
    const spy = jest.spyOn(AuthAction, 'loginUserError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    loginUserGenerator.next();
    loginUserGenerator.next({});
    loginUserGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for login user', () => {
    const spy = jest.spyOn(AuthAction, 'loginUserError');
    loginUserGenerator.next();
    loginUserGenerator.next({});
    loginUserGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(AuthAction, 'loginUserError');
    const response = new Error('Some error');
    loginUserGenerator.next();
    loginUserGenerator.next({});
    loginUserGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });
});

describe('loginSaga Saga', () => {
  const loginSagaFunc = authSaga();

  it('should start task to watch for LOGIN_USER action', () => {
    const takeLatestDescriptor = loginSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOGIN_USER, loadLoginUser));
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('registerUser Saga', () => {
  let registerUserGenerator;

  beforeEach(() => {
    registerUserGenerator = loadRegisterUser();
  });

  it('should call the api to register', () => {
    registerUserGenerator.next();
    const callDescriptor = registerUserGenerator.next(registerState).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `${API_URL}/users/register`,
        data: {
          email,
          password,
          username,
          language,
          firstname,
          lastname,
        },
      }),
    );
  });

  it('should call api success for register User', () => {
    const spy = jest.spyOn(AuthAction, 'registerUserSuccess');
    const result = {
      status: 'success',
    };
    registerUserGenerator.next();
    registerUserGenerator.next({});
    registerUserGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for register user', () => {
    const spy = jest.spyOn(AuthAction, 'registerUserError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    registerUserGenerator.next();
    registerUserGenerator.next({});
    registerUserGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should call api with error for register user password mismatch', () => {
    const spy = jest.spyOn(AuthAction, 'registerUserError');
    registerUserGenerator.next();
    registerUserGenerator.next({
      password: '123456',
      verifPassword: '3453464',
    });

    expect(spy).toHaveBeenCalledWith('onyx.auth.password_mismatch');
  });

  it('should dispatch an error if it requests doesnt work for register user', () => {
    const spy = jest.spyOn(AuthAction, 'registerUserError');
    registerUserGenerator.next();
    registerUserGenerator.next({});
    registerUserGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(AuthAction, 'registerUserError');
    const response = new Error('Some error');
    registerUserGenerator.next();
    registerUserGenerator.next({});
    registerUserGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });
});

describe('registerSaga Saga', () => {
  const registerSagaFunc = authSaga();

  it('should start task to watch for REGISTER_USER action', () => {
    registerSagaFunc.next();
    const takeLatestDescriptor = registerSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(REGISTER_USER, loadRegisterUser),
    );
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('manageUser Saga', () => {
  let manageUserGenerator;

  beforeEach(() => {
    manageUserGenerator = loadManageUser();
  });

  it('should call the api to manage', () => {
    localStorage.setItem('access_token', 'my_token');

    manageUserGenerator.next();
    const callDescriptor = manageUserGenerator.next(manageState).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `${API_URL}/users/manage`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          email,
          password,
          username,
          language,
          firstname,
          lastname,
          verifPassword,
        },
      }),
    );
  });

  it('should call api success for manage User', async () => {
    const spy = jest.spyOn(AuthAction, 'manageUserSuccess');
    const result = {
      status: 'success',
      access_token: 'my_token',
      refresh_token: 'my_token',
    };

    manageUserGenerator.next();
    manageUserGenerator.next({});
    manageUserGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('my_token', 'my_token');
  });

  it('should call api with error for manage user', () => {
    const spy = jest.spyOn(AuthAction, 'manageUserError');

    const result = {
      status: 'error',
      message: 'An error has occured',
    };

    manageUserGenerator.next();
    manageUserGenerator.next({});
    manageUserGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for manage user', () => {
    const spy = jest.spyOn(AuthAction, 'manageUserError');
    manageUserGenerator.next();
    manageUserGenerator.next({});
    manageUserGenerator.next();

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(AuthAction, 'manageUserError');
    const response = new Error('Some error');

    manageUserGenerator.next();
    manageUserGenerator.next({});
    manageUserGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

describe('manageSaga Saga', () => {
  const manageSagaFunc = authSaga();

  it('should start task to watch for MANAGE_USER action', () => {
    manageSagaFunc.next();
    manageSagaFunc.next();
    const takeLatestDescriptor = manageSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(MANAGE_USER, loadManageUser),
    );
  });
});
