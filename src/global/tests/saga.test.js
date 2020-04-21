/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest, call } from 'redux-saga/effects';

import request from '@onyx/utils/request';

import { RELOAD_API } from '../constants';
import * as GlobalAction from '../actions';

import globalSaga, { loadReloadApi } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('global Saga', () => {
  let reloadApiGenerator;

  beforeEach(() => {
    reloadApiGenerator = loadReloadApi();
  });

  it('should call the api to reloadApi', () => {
    const callDescriptor = reloadApiGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/reload_onyx`,
      }),
    );
  });

  it('should call api with error for reloadApi', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    reloadApiGenerator.next({});
    const putDescriptor = reloadApiGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(GlobalAction.globalError('An error has occured')),
    );
  });

  it('should dispatch an error if it requests doesnt work for reloadApi', () => {
    reloadApiGenerator.next({});
    const putDescriptor = reloadApiGenerator.next({}).value;

    expect(putDescriptor).toEqual(
      put(GlobalAction.globalError('onyx.global.error')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    reloadApiGenerator.next({});
    const putDescriptor = reloadApiGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(GlobalAction.globalError('Error: Some error')),
    );
  });
});

describe('globalSaga Saga', () => {
  const globalSagaFunc = globalSaga();

  it('should start task to watch for RELOAD_API action', () => {
    const takeLatestDescriptor = globalSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(RELOAD_API, loadReloadApi));
  });
});
