/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call } from 'redux-saga/effects';

import request from '@onyx/utils/request';

import {
  GET_WIDGETS_STORE,
  GET_WIDGETS,
  ADD_WIDGET,
  DELETE_WIDGET,
} from '../constants';
import * as WidgetsAction from '../actions';

import widgetsSaga, {
  loadGetWidgetsStore,
  loadGetWidgets,
  loadAddWidget,
  loadDeleteWidget,
} from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('getWidgetsStore Saga', () => {
  let getWidgetsStoreGenerator;

  beforeEach(() => {
    getWidgetsStoreGenerator = loadGetWidgetsStore();
  });

  it('should call the api to getWidgetsStore', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = getWidgetsStoreGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/widgets/store`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for getWidgetsStore', () => {
    const spy = jest.spyOn(WidgetsAction, 'getWidgetsStoreSuccess');
    const result = {
      status: 'success',
    };
    getWidgetsStoreGenerator.next({});
    getWidgetsStoreGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getWidgetsStore', () => {
    const spy = jest.spyOn(WidgetsAction, 'getWidgetsStoreError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getWidgetsStoreGenerator.next({});
    getWidgetsStoreGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for getWidgetsStore', () => {
    const spy = jest.spyOn(WidgetsAction, 'getWidgetsStoreError');
    getWidgetsStoreGenerator.next({});
    getWidgetsStoreGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(WidgetsAction, 'getWidgetsStoreError');
    const response = new Error('Some error');
    getWidgetsStoreGenerator.next({});
    getWidgetsStoreGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('getWidgets Saga', () => {
  let getWidgetsGenerator;

  beforeEach(() => {
    getWidgetsGenerator = loadGetWidgets();
  });

  it('should call the api to getWidgets', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = getWidgetsGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/widgets`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for getWidgets', () => {
    const spy = jest.spyOn(WidgetsAction, 'getWidgetsSuccess');
    const result = {
      status: 'success',
    };
    getWidgetsGenerator.next({});
    getWidgetsGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getWidgets', () => {
    const spy = jest.spyOn(WidgetsAction, 'getWidgetsError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getWidgetsGenerator.next({});
    getWidgetsGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for getWidgets', () => {
    const spy = jest.spyOn(WidgetsAction, 'getWidgetsError');
    getWidgetsGenerator.next({});
    getWidgetsGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(WidgetsAction, 'getWidgetsError');
    const response = new Error('Some error');
    getWidgetsGenerator.next({});
    getWidgetsGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('addWidget Saga', () => {
  let addWidgetGenerator;

  beforeEach(() => {
    addWidgetGenerator = loadAddWidget();
  });

  it('should call the api to addWidget', () => {
    localStorage.setItem('access_token', 'my_token');
    addWidgetGenerator.next();
    const callDescriptor = addWidgetGenerator.next({
      widgetName: 'name',
      widgetRaw: 'raw',
      widgetType: 'neuron',
    }).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/widgets`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          name: 'name',
          raw: 'raw',
          type: 'neuron',
        },
      }),
    );
  });

  it('should call api success for addWidget', () => {
    const spy = jest.spyOn(WidgetsAction, 'addWidgetSuccess');
    const result = {
      status: 'success',
    };
    addWidgetGenerator.next();
    addWidgetGenerator.next({});
    addWidgetGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for addWidget', () => {
    const spy = jest.spyOn(WidgetsAction, 'addWidgetError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    addWidgetGenerator.next();
    addWidgetGenerator.next({});
    addWidgetGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for addWidget', () => {
    const spy = jest.spyOn(WidgetsAction, 'addWidgetError');
    addWidgetGenerator.next();
    addWidgetGenerator.next({});
    addWidgetGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(WidgetsAction, 'addWidgetError');
    const response = new Error('Some error');
    addWidgetGenerator.next();
    addWidgetGenerator.next({});
    addWidgetGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('deleteWidget Saga', () => {
  let deleteWidgetGenerator;

  beforeEach(() => {
    deleteWidgetGenerator = loadDeleteWidget();
  });

  it('should call the api to deleteWidget', () => {
    localStorage.setItem('access_token', 'my_token');
    deleteWidgetGenerator.next();
    const callDescriptor = deleteWidgetGenerator.next({ widgetId: 1 }).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'PUT',
        url: `/api/widgets`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          id: 1,
        },
      }),
    );
  });

  it('should call api success for deleteWidget', () => {
    const spy = jest.spyOn(WidgetsAction, 'deleteWidgetSuccess');
    const result = {
      status: 'success',
    };
    deleteWidgetGenerator.next();
    deleteWidgetGenerator.next({});
    deleteWidgetGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for deleteWidget', () => {
    const spy = jest.spyOn(WidgetsAction, 'deleteWidgetError');
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    deleteWidgetGenerator.next();
    deleteWidgetGenerator.next({});
    deleteWidgetGenerator.next(result);

    expect(spy).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for deleteWidget', () => {
    const spy = jest.spyOn(WidgetsAction, 'deleteWidgetError');
    deleteWidgetGenerator.next();
    deleteWidgetGenerator.next({});
    deleteWidgetGenerator.next();

    expect(spy).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spy = jest.spyOn(WidgetsAction, 'deleteWidgetError');
    const response = new Error('Some error');
    deleteWidgetGenerator.next();
    deleteWidgetGenerator.next({});
    deleteWidgetGenerator.throw(response);

    expect(spy).toHaveBeenCalledWith('Error: Some error');
  });
});

describe('widgetsSaga Saga', () => {
  const widgetsSagaFunc = widgetsSaga();

  it('should start task to watch for GET_WIDGETS_STORE action', () => {
    const takeLatestDescriptor = widgetsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_WIDGETS_STORE, loadGetWidgetsStore),
    );
  });

  it('should start task to watch for GET_WIDGETS action', () => {
    const takeLatestDescriptor = widgetsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_WIDGETS, loadGetWidgets),
    );
  });

  it('should start task to watch for ADD_WIDGET action', () => {
    const takeLatestDescriptor = widgetsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(ADD_WIDGET, loadAddWidget));
  });

  it('should start task to watch for DELETE_WIDGET action', () => {
    const takeLatestDescriptor = widgetsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(DELETE_WIDGET, loadDeleteWidget),
    );
  });
});
