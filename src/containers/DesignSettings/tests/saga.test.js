/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest, call } from 'redux-saga/effects';

import request from '@onyx/utils/request';

import { CHANGE_COLOR, CHANGE_MODE } from '../constants';
import * as DesignSettingsAction from '../actions';

import designSettingsSaga, { loadChangeColor, loadChangeMode } from '../saga';

const color = 'blue';
const mode = 'light';

/* eslint-disable redux-saga/yield-effects */
describe('designSettings Saga Color', () => {
  let changeColorGenerator;

  beforeEach(() => {
    changeColorGenerator = loadChangeColor();
  });

  it('should call the api to changeColor', () => {
    localStorage.setItem('access_token', 'my_token');
    changeColorGenerator.next();
    const callDescriptor = changeColorGenerator.next(color).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/users/color`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          color,
        },
      }),
    );
  });

  it('should call api success for changeColor', () => {
    const spy = jest.spyOn(DesignSettingsAction, 'changeColorSuccess');
    const result = {
      status: 'success',
    };
    changeColorGenerator.next();
    changeColorGenerator.next({});
    changeColorGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for changeColor', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    changeColorGenerator.next();
    changeColorGenerator.next({});
    const putDescriptor = changeColorGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(DesignSettingsAction.changeColorError('An error has occured')),
    );
  });

  it('should dispatch an error if it requests doesnt work for changeColor', () => {
    changeColorGenerator.next();
    changeColorGenerator.next({});
    const putDescriptor = changeColorGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(DesignSettingsAction.changeColorError('onyx.global.error')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    changeColorGenerator.next();
    changeColorGenerator.next({});
    const putDescriptor = changeColorGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(DesignSettingsAction.changeColorError('Error: Some error')),
    );
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('designSettings Mode', () => {
  let changeModeGenerator;

  beforeEach(() => {
    changeModeGenerator = loadChangeMode();
  });

  it('should call the api to changeMode', () => {
    localStorage.setItem('access_token', 'my_token');
    changeModeGenerator.next();
    const callDescriptor = changeModeGenerator.next(mode).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/users/mode`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          mode,
        },
      }),
    );
  });

  it('should call api success for changeMode', () => {
    const spy = jest.spyOn(DesignSettingsAction, 'changeModeSuccess');
    const result = {
      status: 'success',
    };
    changeModeGenerator.next();
    changeModeGenerator.next({});
    changeModeGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for changeMode', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    changeModeGenerator.next();
    changeModeGenerator.next({});
    const putDescriptor = changeModeGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(DesignSettingsAction.changeModeError('An error has occured')),
    );
  });

  it('should dispatch an error if it requests doesnt work for changeMode', () => {
    changeModeGenerator.next();
    changeModeGenerator.next({});
    const putDescriptor = changeModeGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(DesignSettingsAction.changeModeError('onyx.global.error')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    changeModeGenerator.next();
    changeModeGenerator.next({});
    const putDescriptor = changeModeGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(DesignSettingsAction.changeModeError('Error: Some error')),
    );
  });
});

describe('designSettingsSaga Saga', () => {
  const designSettingsSagaFunc = designSettingsSaga();

  it('should start task to watch for CHANGE_COLOR action', () => {
    const takeLatestDescriptor = designSettingsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CHANGE_COLOR, loadChangeColor),
    );
  });

  it('should start task to watch for CHANGE_MODE action', () => {
    const takeLatestDescriptor = designSettingsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CHANGE_MODE, loadChangeMode),
    );
  });
});
