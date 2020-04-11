/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, call } from 'redux-saga/effects';

import request from '@onyx/utils/request';
import { GET_NAV, ADD_NAV, REMOVE_NAV, CHANGE_BUTTON } from '../constants';
import navSaga, {
  loadAddNav,
  loadGetNav,
  loadRemoveNav,
  loadChangeButton,
} from '../saga';
import * as NavAction from '../actions';

const navState = {
  errorText: '',
  buttonNumber: '1',
  position: '1',
  icon: 'fa fa-home',
  customIcon: 'fa fa-home',
  url: '/',
  color: 'blue',
  onManage: false,
  selectedButton: '1',
  nav: [],
  buttons: [],
};

describe('Nav Saga', () => {
  let getNavGenerator;
  let addNavGenerator;
  let removeNavGenerator;
  let changeButtonGenerator;

  beforeEach(() => {
    getNavGenerator = loadGetNav();
    addNavGenerator = loadAddNav();
    removeNavGenerator = loadRemoveNav();
    changeButtonGenerator = loadChangeButton();
  });

  it('should call the api to get Nav', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = getNavGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/users/nav`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for getting nav', () => {
    const result = {
      status: 'success',
      nav: {},
    };
    getNavGenerator.next();
    const putDescriptor = getNavGenerator.next(result).value;

    expect(putDescriptor).toEqual(put(NavAction.getNavSuccess({})));
  });

  it('should call api with error for getting nav', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getNavGenerator.next();
    const putDescriptor = getNavGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(NavAction.getNavError('An error has occured')),
    );
  });

  it('should call api with error for getting nav', () => {
    getNavGenerator.next();
    const putDescriptor = getNavGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(NavAction.getNavError('An error has occured')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    getNavGenerator.next();
    getNavGenerator.next();
    const putDescriptor = getNavGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(NavAction.getNavError('Error: Some error')),
    );
  });

  it('should call the api to add Nav', () => {
    localStorage.setItem('access_token', 'my_token');
    addNavGenerator.next();
    const callDescriptor = addNavGenerator.next(navState).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/users/nav`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          color: 'blue',
          icon: 'fa fa-home',
          url: '/',
          position: '1',
          buttonNumber: '1',
        },
      }),
    );
  });

  it('should call api success for adding nav', () => {
    const spy = jest.spyOn(NavAction, 'addNavSuccess');
    const result = {
      status: 'success',
    };
    addNavGenerator.next();
    addNavGenerator.next({});
    addNavGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for adding nav', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    addNavGenerator.next();
    addNavGenerator.next({});
    const putDescriptor = addNavGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(NavAction.addNavError('An error has occured')),
    );
  });

  it('should call api with error for adding nav', () => {
    addNavGenerator.next();
    addNavGenerator.next({});
    const putDescriptor = addNavGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(NavAction.addNavError('An error has occured')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    addNavGenerator.next();
    addNavGenerator.next({});
    const putDescriptor = addNavGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(NavAction.addNavError('Error: Some error')),
    );
  });

  it('should call the api to remove Nav', () => {
    localStorage.setItem('access_token', 'my_token');
    removeNavGenerator.next();
    const callDescriptor = removeNavGenerator.next({
      position: '1',
      buttonNumber: '1',
    }).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'PUT',
        url: `/api/users/nav`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          position: '1',
          buttonNumber: '1',
        },
      }),
    );
  });

  it('should call api success for removing nav', () => {
    const spy = jest.spyOn(NavAction, 'removeNavSuccess');
    const result = {
      status: 'success',
    };
    removeNavGenerator.next();
    removeNavGenerator.next({});
    removeNavGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for removing nav', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    removeNavGenerator.next();
    removeNavGenerator.next({});
    const putDescriptor = removeNavGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(NavAction.removeNavError('An error has occured')),
    );
  });

  it('should call api with error for removing nav', () => {
    removeNavGenerator.next();
    removeNavGenerator.next({});
    const putDescriptor = removeNavGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(NavAction.removeNavError('An error has occured')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    removeNavGenerator.next();
    removeNavGenerator.next({});
    const putDescriptor = removeNavGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(NavAction.removeNavError('Error: Some error')),
    );
  });

  it('should call the api to change Button', () => {
    localStorage.setItem('access_token', 'my_token');
    changeButtonGenerator.next();
    const callDescriptor = changeButtonGenerator.next(navState).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/users/buttons`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          icon: 'fa fa-home',
          buttonNumber: '1',
        },
      }),
    );
  });

  it('should call api success for changing Button', () => {
    const spy = jest.spyOn(NavAction, 'changeButtonSuccess');
    const result = {
      status: 'success',
    };
    changeButtonGenerator.next();
    changeButtonGenerator.next({});
    changeButtonGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for change Button', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    changeButtonGenerator.next();
    changeButtonGenerator.next({});
    const putDescriptor = changeButtonGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(NavAction.changeButtonError('An error has occured')),
    );
  });

  it('should call api with error for change Button', () => {
    changeButtonGenerator.next();
    changeButtonGenerator.next({});
    const putDescriptor = changeButtonGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(NavAction.changeButtonError('An error has occured')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    changeButtonGenerator.next();
    changeButtonGenerator.next({});
    const putDescriptor = changeButtonGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(NavAction.changeButtonError('Error: Some error')),
    );
  });
});

describe('Nav Saga', () => {
  const navSagaFunc = navSaga();

  it('should start task to watch for GET_NAV action', () => {
    const takeLatestDescriptor = navSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_NAV, loadGetNav));
  });

  it('should start task to watch for ADD_NAV action', () => {
    const takeLatestDescriptor = navSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(ADD_NAV, loadAddNav));
  });

  it('should start task to watch for REMOVE_NAV action', () => {
    const takeLatestDescriptor = navSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(REMOVE_NAV, loadRemoveNav));
  });

  it('should start task to watch for CHANGE_BUTTON action', () => {
    const takeLatestDescriptor = navSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CHANGE_BUTTON, loadChangeButton),
    );
  });
});
