/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call } from 'redux-saga/effects';

import request from '@onyx/utils/request';

import { GET_INSTALL, INSTALL_ONYX } from '../constants';
import * as InstallAction from '../actions';

import installSaga, { loadGetInstall, loadInstallOnyx } from '../saga';

const email = 'test@test.fr';
const password = '123456';
const verifPassword = '123456';
const username = 'test';
const firstname = 'John';
const lastname = 'Doe';
const language = 'fr-FR';

const installState = {
  email,
  password,
  verifPassword,
  username,
  firstname,
  lastname,
  language,
};

/* eslint-disable redux-saga/yield-effects */
describe('getInstall Saga', () => {
  let getInstallGenerator;

  beforeEach(() => {
    getInstallGenerator = loadGetInstall();
  });

  it('should call the api to getInstall', () => {
    const callDescriptor = getInstallGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/install`,
      }),
    );
  });

  it('should call api success for getInstall', () => {
    const spy = jest.spyOn(InstallAction, 'getInstallSuccess');
    const result = {
      status: 'success',
    };
    getInstallGenerator.next({});
    getInstallGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getInstall', () => {
    const spy = jest.spyOn(InstallAction, 'getInstallError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getInstallGenerator.next({});
    getInstallGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for getInstall', () => {
    const spy = jest.spyOn(InstallAction, 'getInstallError');
    getInstallGenerator.next({});
    getInstallGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(InstallAction, 'getInstallError');
    const response = new Error('Some error');
    getInstallGenerator.next({});
    getInstallGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('installOnyx Saga', () => {
  let installOnyxGenerator;

  beforeEach(() => {
    installOnyxGenerator = loadInstallOnyx();
  });

  it('should call the api to install Onyx', () => {
    installOnyxGenerator.next();
    const callDescriptor = installOnyxGenerator.next(installState).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/install`,
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

  it('should call api success for install Onyx', () => {
    const spy = jest.spyOn(InstallAction, 'installOnyxSuccess');
    const result = {
      status: 'success',
    };
    installOnyxGenerator.next();
    installOnyxGenerator.next({});
    installOnyxGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for install Onyx', () => {
    const spy = jest.spyOn(InstallAction, 'installOnyxError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    installOnyxGenerator.next();
    installOnyxGenerator.next({});
    installOnyxGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for install Onyx', () => {
    const spy = jest.spyOn(InstallAction, 'installOnyxError');
    installOnyxGenerator.next();
    installOnyxGenerator.next({});
    installOnyxGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(InstallAction, 'installOnyxError');
    const response = new Error('Some error');
    installOnyxGenerator.next();
    installOnyxGenerator.next({});
    installOnyxGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });
});

describe('settingsSaga Saga', () => {
  const installSagaFunc = installSaga();

  it('should start task to watch for GET_INSTALL action', () => {
    const takeLatestDescriptor = installSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_INSTALL, loadGetInstall),
    );
  });

  it('should start task to watch for INSTALL_ONYX action', () => {
    const takeLatestDescriptor = installSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(INSTALL_ONYX, loadInstallOnyx),
    );
  });
});
