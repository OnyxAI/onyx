/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call } from 'redux-saga/effects';

import request from '@onyx/utils/request';

import { GET_ONYX_DATA } from '../constants';
import * as DesignSettingsAction from '../actions';

import settingsSaga, { loadGetOnyxData } from '../saga';

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
    const spy = jest.spyOn(DesignSettingsAction, 'getOnyxDataSuccess');
    const result = {
      status: 'success',
    };
    getOnyxDataGenerator.next({});
    getOnyxDataGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getOnyxData', () => {
    const spy = jest.spyOn(DesignSettingsAction, 'getOnyxDataError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getOnyxDataGenerator.next({});
    getOnyxDataGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for getOnyxData', () => {
    const spy = jest.spyOn(DesignSettingsAction, 'getOnyxDataError');
    getOnyxDataGenerator.next({});
    getOnyxDataGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(DesignSettingsAction, 'getOnyxDataError');
    const response = new Error('Some error');
    getOnyxDataGenerator.next({});
    getOnyxDataGenerator.throw(response);

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
});
