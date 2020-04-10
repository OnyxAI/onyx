/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest, call } from 'redux-saga/effects';
import request from '@onyx/utils/request';

import {
  GET_NEURONS,
  GET_NEURONS_STORE,
  INSTALL_NEURON,
  REMOVE_NEURON,
} from '../constants';

import * as NeuronsAction from '../actions';

import neuronsSaga, {
  loadGetNeurons,
  loadGetNeuronsStore,
  loadInstallNeuron,
  loadRemoveNeuron,
} from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('getNeurons Saga', () => {
  let getNeuronsGenerator;

  beforeEach(() => {
    getNeuronsGenerator = loadGetNeurons();
  });

  it('should call the api to getNeurons', () => {
    const callDescriptor = getNeuronsGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/neurons/get_all`,
      }),
    );
  });

  it('should call api success for getNeurons', () => {
    const spy = jest.spyOn(NeuronsAction, 'getNeuronsSuccess');
    const result = {
      status: 'success',
    };
    getNeuronsGenerator.next({});
    getNeuronsGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getNeurons', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getNeuronsGenerator.next({});
    const putDescriptor = getNeuronsGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(NeuronsAction.getNeuronsError('An error has occured')),
    );
  });

  it('should dispatch an error if it requests doesnt work for getNeurons', () => {
    getNeuronsGenerator.next({});
    const putDescriptor = getNeuronsGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(NeuronsAction.getNeuronsError('onyx.global.error')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    getNeuronsGenerator.next({});
    const putDescriptor = getNeuronsGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(NeuronsAction.getNeuronsError('Error: Some error')),
    );
  });
});

describe('getNeurons Saga', () => {
  let getNeuronsStoreGenerator;

  beforeEach(() => {
    getNeuronsStoreGenerator = loadGetNeuronsStore();
  });

  it('should call the api to getNeuronsStore', () => {
    localStorage.setItem('access_token', 'my_token');
    const callDescriptor = getNeuronsStoreGenerator.next().value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'GET',
        url: `/api/neurons/get_store_list`,
        headers: { Authorization: `Bearer my_token` },
      }),
    );
  });

  it('should call api success for getNeuronsStore', () => {
    const spy = jest.spyOn(NeuronsAction, 'getNeuronsStoreSuccess');
    const result = {
      status: 'success',
    };
    getNeuronsStoreGenerator.next({});
    getNeuronsStoreGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for getNeuronsStore', () => {
    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    getNeuronsStoreGenerator.next({});
    const putDescriptor = getNeuronsStoreGenerator.next(result).value;

    expect(putDescriptor).toEqual(
      put(NeuronsAction.getNeuronsStoreError('An error has occured')),
    );
  });

  it('should dispatch an error if it requests doesnt work for getNeuronsStore', () => {
    getNeuronsStoreGenerator.next({});
    const putDescriptor = getNeuronsStoreGenerator.next().value;

    expect(putDescriptor).toEqual(
      put(NeuronsAction.getNeuronsStoreError('onyx.global.error')),
    );
  });

  it('should dispatch and error if an error is raised', () => {
    const response = new Error('Some error');
    getNeuronsStoreGenerator.next({});
    const putDescriptor = getNeuronsStoreGenerator.throw(response).value;

    expect(putDescriptor).toEqual(
      put(NeuronsAction.getNeuronsStoreError('Error: Some error')),
    );
  });
});

describe('installNeuron Saga', () => {
  let installNeuronGenerator;

  beforeEach(() => {
    installNeuronGenerator = loadInstallNeuron();
  });

  it('should call the api to installNeuron', () => {
    localStorage.setItem('access_token', 'my_token');
    installNeuronGenerator.next();
    const callDescriptor = installNeuronGenerator.next({
      usingNeuron: 'name',
      neuronUrl: 'url',
    }).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/neurons/install`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          name: 'name',
          url: 'url',
        },
      }),
    );
  });

  it('should call api success for installNeuron', () => {
    const spy = jest.spyOn(NeuronsAction, 'installNeuronSuccess');
    const result = {
      status: 'success',
    };
    installNeuronGenerator.next();
    installNeuronGenerator.next({});
    installNeuronGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for installNeuron', () => {
    const spyInstall = jest.spyOn(NeuronsAction, 'installNeuronError');

    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    installNeuronGenerator.next();
    installNeuronGenerator.next({});
    installNeuronGenerator.next(result);

    expect(spyInstall).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for installNeuron', () => {
    const spyInstall = jest.spyOn(NeuronsAction, 'installNeuronError');

    installNeuronGenerator.next();
    installNeuronGenerator.next({});
    installNeuronGenerator.next();

    expect(spyInstall).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spyInstall = jest.spyOn(NeuronsAction, 'installNeuronError');

    const response = new Error('Some error');
    installNeuronGenerator.next();
    installNeuronGenerator.next({});
    installNeuronGenerator.throw(response);

    expect(spyInstall).toHaveBeenCalledWith('Error: Some error');
  });
});

describe('removeNeuron Saga', () => {
  let removeNeuronGenerator;

  beforeEach(() => {
    removeNeuronGenerator = loadRemoveNeuron();
  });

  it('should call the api to removeNeuron', () => {
    localStorage.setItem('access_token', 'my_token');
    removeNeuronGenerator.next();
    const callDescriptor = removeNeuronGenerator.next({
      usingNeuron: 'name',
    }).value;

    expect(callDescriptor).toEqual(
      call(request, {
        method: 'POST',
        url: `/api/neurons/remove`,
        headers: { Authorization: `Bearer my_token` },
        data: {
          name: 'name',
        },
      }),
    );
  });

  it('should call api success for removeNeuron', () => {
    const spy = jest.spyOn(NeuronsAction, 'removeNeuronSuccess');
    const result = {
      status: 'success',
    };
    removeNeuronGenerator.next();
    removeNeuronGenerator.next({});
    removeNeuronGenerator.next(result);

    expect(spy).toHaveBeenCalled();
  });

  it('should call api with error for removeNeuron', () => {
    const spyRemove = jest.spyOn(NeuronsAction, 'removeNeuronError');

    const result = {
      status: 'error',
      message: 'An error has occured',
    };
    removeNeuronGenerator.next();
    removeNeuronGenerator.next({});
    removeNeuronGenerator.next(result);

    expect(spyRemove).toHaveBeenCalledWith('An error has occured');
  });

  it('should dispatch an error if it requests doesnt work for removeNeuron', () => {
    const spyRemove = jest.spyOn(NeuronsAction, 'removeNeuronError');

    removeNeuronGenerator.next();
    removeNeuronGenerator.next({});
    removeNeuronGenerator.next();

    expect(spyRemove).toHaveBeenCalledWith('onyx.global.error');
  });

  it('should dispatch and error if an error is raised', () => {
    const spyRemove = jest.spyOn(NeuronsAction, 'removeNeuronError');

    const response = new Error('Some error');
    removeNeuronGenerator.next();
    removeNeuronGenerator.next({});
    removeNeuronGenerator.throw(response);

    expect(spyRemove).toHaveBeenCalledWith('Error: Some error');
  });
});

describe('neuronsSaga Saga', () => {
  const neuronsSagaFunc = neuronsSaga();

  it('should start task to watch for GET_NEURONS action', () => {
    const takeLatestDescriptor = neuronsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_NEURONS, loadGetNeurons),
    );
  });

  it('should start task to watch for GET_NEURONS_STORE action', () => {
    const takeLatestDescriptor = neuronsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_NEURONS_STORE, loadGetNeuronsStore),
    );
  });

  it('should start task to watch for INSTALL_NEURON action', () => {
    const takeLatestDescriptor = neuronsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(INSTALL_NEURON, loadInstallNeuron),
    );
  });

  it('should start task to watch for REMOVE_NEURON action', () => {
    const takeLatestDescriptor = neuronsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(REMOVE_NEURON, loadRemoveNeuron),
    );
  });
});
