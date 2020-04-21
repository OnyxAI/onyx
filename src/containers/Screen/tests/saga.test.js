/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call } from 'redux-saga/effects';

import request from '@onyx/utils/request';

import {
  GET_SCREEN_STORE,
  GET_SCREEN,
  ADD_SCREEN,
  DELETE_SCREEN,
} from '../constants';
import * as ScreenAction from '../actions';

import screenSaga, {
  loadGetScreenStore,
  loadGetScreen,
  loadAddScreen,
  loadDeleteScreen,
} from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('getScreenStore Saga', () => {
  let getScreenStoreGenerator;

  beforeEach(() => {
    getScreenStoreGenerator = loadGetScreenStore();
  });

  it('should call the api to getScreenStore', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = getScreenStoreGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/screen/store`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for getScreenStore', () => {
    const spy = jest.spyOn(ScreenAction, 'getScreenStoreSuccess');
    const result = {
      status: 'success',
    };
    getScreenStoreGenerator.next({});
    getScreenStoreGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getScreenStore', () => {
    const spy = jest.spyOn(ScreenAction, 'getScreenStoreError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getScreenStoreGenerator.next({});
    getScreenStoreGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for getScreenStore', () => {
    const spy = jest.spyOn(ScreenAction, 'getScreenStoreError');
    getScreenStoreGenerator.next({});
    getScreenStoreGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(ScreenAction, 'getScreenStoreError');
    const response = new Error('Some error');
    getScreenStoreGenerator.next({});
    getScreenStoreGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('getScreen Saga', () => {
  let getScreenGenerator;

  beforeEach(() => {
    getScreenGenerator = loadGetScreen();
  });

  it('should call the api to getScreen', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = getScreenGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/screen`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for getScreen', () => {
    const spy = jest.spyOn(ScreenAction, 'getScreenSuccess');
    const result = {
      status: 'success',
    };
    getScreenGenerator.next({});
    getScreenGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getScreen', () => {
    const spy = jest.spyOn(ScreenAction, 'getScreenError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getScreenGenerator.next({});
    getScreenGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for getScreen', () => {
    const spy = jest.spyOn(ScreenAction, 'getScreenError');
    getScreenGenerator.next({});
    getScreenGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(ScreenAction, 'getScreenError');
    const response = new Error('Some error');
    getScreenGenerator.next({});
    getScreenGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('addScreen Saga', () => {
  let addScreenGenerator;

  beforeEach(() => {
    addScreenGenerator = loadAddScreen();
  });

  it('should call the api to addScreen', () => {
    localStorage.setItem('access_token', 'my_token');
    addScreenGenerator.next();
    const callDescriptor = addScreenGenerator.next({
      screenName: 'name',
      screenRaw: 'raw',
      screenType: 'neuron',
    }).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/screen`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          name: 'name',
          raw: 'raw',
          type: 'neuron',
        },
      }),
    );
  });

  it('should call api success for addScreen', () => {
    const spy = jest.spyOn(ScreenAction, 'addScreenSuccess');
    const result = {
      status: 'success',
    };
    addScreenGenerator.next();
    addScreenGenerator.next({});
    addScreenGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for addScreen', () => {
    const spy = jest.spyOn(ScreenAction, 'addScreenError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    addScreenGenerator.next();
    addScreenGenerator.next({});
    addScreenGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for addScreen', () => {
    const spy = jest.spyOn(ScreenAction, 'addScreenError');
    addScreenGenerator.next();
    addScreenGenerator.next({});
    addScreenGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(ScreenAction, 'addScreenError');
    const response = new Error('Some error');
    addScreenGenerator.next();
    addScreenGenerator.next({});
    addScreenGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('deleteScreen Saga', () => {
  let deleteScreenGenerator;

  beforeEach(() => {
    deleteScreenGenerator = loadDeleteScreen();
  });

  it('should call the api to deleteScreen', () => {
    localStorage.setItem('access_token', 'my_token');
    deleteScreenGenerator.next();
    const callDescriptor = deleteScreenGenerator.next({ screenId: 1 }).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'PUT',
        url: `/api/screen`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          id: 1,
        },
      }),
    );
  });

  it('should call api success for deleteScreen', () => {
    const spy = jest.spyOn(ScreenAction, 'deleteScreenSuccess');
    const result = {
      status: 'success',
    };
    deleteScreenGenerator.next();
    deleteScreenGenerator.next({});
    deleteScreenGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for deleteScreen', () => {
    const spy = jest.spyOn(ScreenAction, 'deleteScreenError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    deleteScreenGenerator.next();
    deleteScreenGenerator.next({});
    deleteScreenGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for deleteScreen', () => {
    const spy = jest.spyOn(ScreenAction, 'deleteScreenError');
    deleteScreenGenerator.next();
    deleteScreenGenerator.next({});
    deleteScreenGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(ScreenAction, 'deleteScreenError');
    const response = new Error('Some error');
    deleteScreenGenerator.next();
    deleteScreenGenerator.next({});
    deleteScreenGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

describe('screenSaga Saga', () => {
  const screenSagaFunc = screenSaga();

  it('should start task to watch for GET_SCREEN_STORE action', () => {
    const takeLatestDescriptor = screenSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_SCREEN_STORE, loadGetScreenStore),
    );
  });

  it('should start task to watch for GET_SCREEN action', () => {
    const takeLatestDescriptor = screenSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_SCREEN, loadGetScreen));
  });

  it('should start task to watch for ADD_SCREEN action', () => {
    const takeLatestDescriptor = screenSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(ADD_SCREEN, loadAddScreen));
  });

  it('should start task to watch for DELETE_SCREEN action', () => {
    const takeLatestDescriptor = screenSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(DELETE_SCREEN, loadDeleteScreen),
    );
  });
});
