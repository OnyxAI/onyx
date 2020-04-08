/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest, call } from 'redux-saga/effects';
import request from '@onyx/utils/request';

import { GET_NEURONS } from '../constants';
import * as NeuronsAction from '../actions';

import neuronsSaga, { loadGetNeurons } from '../saga';

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

describe('neuronsSaga Saga', () => {
  const neuronsSagaFunc = neuronsSaga();

  it('should start task to watch for GET_NEURONS action', () => {
    const takeLatestDescriptor = neuronsSagaFunc.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_NEURONS, loadGetNeurons),
    );
  });
});
