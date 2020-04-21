/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call } from 'redux-saga/effects';

import request from '@onyx/utils/request';

import {
  GET_ONYX_DATA,
  GET_TOKENS,
  ADD_TOKEN,
  DELETE_TOKEN,
} from '../constants';
import * as SettingsAction from '../actions';

import settingsSaga, {
  loadGetOnyxData,
  loadGetTokens,
  loadAddToken,
  loadDeleteToken,
} from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('getOnyxData Saga', () => {
  let getOnyxDataGenerator;

  beforeEach(() => {
    getOnyxDataGenerator = loadGetOnyxData();
  });

  it('should call the api to getOnyxData', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = getOnyxDataGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/settings/get_onyx_data`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for getOnyxData', () => {
    const spy = jest.spyOn(SettingsAction, 'getOnyxDataSuccess');
    const result = {
      status: 'success',
    };
    getOnyxDataGenerator.next({});
    getOnyxDataGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getOnyxData', () => {
    const spy = jest.spyOn(SettingsAction, 'getOnyxDataError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getOnyxDataGenerator.next({});
    getOnyxDataGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for getOnyxData', () => {
    const spy = jest.spyOn(SettingsAction, 'getOnyxDataError');
    getOnyxDataGenerator.next({});
    getOnyxDataGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(SettingsAction, 'getOnyxDataError');
    const response = new Error('Some error');
    getOnyxDataGenerator.next({});
    getOnyxDataGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('getTokens Saga', () => {
  let getTokensGenerator;

  beforeEach(() => {
    getTokensGenerator = loadGetTokens();
  });

  it('should call the api to getTokens', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = getTokensGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/tokens`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for getTokens', () => {
    const spy = jest.spyOn(SettingsAction, 'getTokensSuccess');
    const result = {
      status: 'success',
    };
    getTokensGenerator.next({});
    getTokensGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getTokens', () => {
    const spy = jest.spyOn(SettingsAction, 'getTokensError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getTokensGenerator.next({});
    getTokensGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for getTokens', () => {
    const spy = jest.spyOn(SettingsAction, 'getTokensError');
    getTokensGenerator.next({});
    getTokensGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(SettingsAction, 'getTokensError');
    const response = new Error('Some error');
    getTokensGenerator.next({});
    getTokensGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('addToken Saga', () => {
  let addTokenGenerator;

  beforeEach(() => {
    addTokenGenerator = loadAddToken();
  });

  it('should call the api to addToken', () => {
    localStorage.setItem('access_token', 'my_token');
    addTokenGenerator.next();
    const callDescriptor = addTokenGenerator.next({ tokenName: 'name' }).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/tokens`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          name: 'name',
        },
      }),
    );
  });

  it('should call api success for addToken', () => {
    const spy = jest.spyOn(SettingsAction, 'addTokenSuccess');
    const result = {
      status: 'success',
    };
    addTokenGenerator.next();
    addTokenGenerator.next({});
    addTokenGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for addToken', () => {
    const spy = jest.spyOn(SettingsAction, 'addTokenError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    addTokenGenerator.next();
    addTokenGenerator.next({});
    addTokenGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for addToken', () => {
    const spy = jest.spyOn(SettingsAction, 'addTokenError');
    addTokenGenerator.next();
    addTokenGenerator.next({});
    addTokenGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(SettingsAction, 'addTokenError');
    const response = new Error('Some error');
    addTokenGenerator.next();
    addTokenGenerator.next({});
    addTokenGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('deleteToken Saga', () => {
  let deleteTokenGenerator;

  beforeEach(() => {
    deleteTokenGenerator = loadDeleteToken();
  });

  it('should call the api to deleteToken', () => {
    localStorage.setItem('access_token', 'my_token');
    deleteTokenGenerator.next();
    const callDescriptor = deleteTokenGenerator.next({ tokenId: 1 }).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'PUT',
        url: `/api/tokens`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          id: 1,
        },
      }),
    );
  });

  it('should call api success for deleteToken', () => {
    const spy = jest.spyOn(SettingsAction, 'deleteTokenSuccess');
    const result = {
      status: 'success',
    };
    deleteTokenGenerator.next();
    deleteTokenGenerator.next({});
    deleteTokenGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for deleteToken', () => {
    const spy = jest.spyOn(SettingsAction, 'deleteTokenError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    deleteTokenGenerator.next();
    deleteTokenGenerator.next({});
    deleteTokenGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for deleteToken', () => {
    const spy = jest.spyOn(SettingsAction, 'deleteTokenError');
    deleteTokenGenerator.next();
    deleteTokenGenerator.next({});
    deleteTokenGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(SettingsAction, 'deleteTokenError');
    const response = new Error('Some error');
    deleteTokenGenerator.next();
    deleteTokenGenerator.next({});
    deleteTokenGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

describe('settingsSaga Saga', () => {
  const settingsSagaFunc = settingsSaga();

  it('should start task to watch for GET_ONYX_DATA action', () => {
    const takeLatestDescriptor = settingsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_ONYX_DATA, loadGetOnyxData),
    );
  });

  it('should start task to watch for GET_TOKENS action', () => {
    const takeLatestDescriptor = settingsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_TOKENS, loadGetTokens));
  });

  it('should start task to watch for ADD_TOKEN action', () => {
    const takeLatestDescriptor = settingsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(ADD_TOKEN, loadAddToken));
  });

  it('should start task to watch for DELETE_TOKEN action', () => {
    const takeLatestDescriptor = settingsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(DELETE_TOKEN, loadDeleteToken),
    );
  });
});
