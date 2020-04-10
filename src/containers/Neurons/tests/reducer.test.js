import produce from 'immer';
import neuronsReducer from '../reducer';
import {
  getNeurons,
  getNeuronsError,
  getNeuronsSuccess,
  getNeuronsStore,
  getNeuronsStoreSuccess,
  getNeuronsStoreError,
  installNeuron,
  removeNeuron,
} from '../actions';

import {
  INSTALL_NEURON_SUCCESS,
  INSTALL_NEURON_ERROR,
  REMOVE_NEURON_SUCCESS,
  REMOVE_NEURON_ERROR,
} from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('neuronsReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      errorText: '',
      loadingNeurons: true,
      loadingNeuronsStore: false,
      loading: false,
      usingNeuron: '',
      neuronUrl: '',
      neuronsStoreList: [],
      neurons: [],
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(neuronsReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the getNeurons action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingNeurons = true;
    });

    expect(neuronsReducer(state, getNeurons())).toEqual(expectedResult);
  });

  it('should handle the getNeuronsSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingNeurons = false;
      draft.neurons = [];
    });

    expect(neuronsReducer(state, getNeuronsSuccess([]))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getNeuronsError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loadingNeurons = false;
    });

    expect(
      neuronsReducer(state, getNeuronsError('An error has occured')),
    ).toEqual(expectedResult);
  });

  it('should handle the getNeuronsStore action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingNeuronsStore = true;
    });

    expect(neuronsReducer(state, getNeuronsStore())).toEqual(expectedResult);
  });

  it('should handle the getNeuronsStoreSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingNeuronsStore = false;
      draft.neuronsStoreList = [];
    });

    expect(neuronsReducer(state, getNeuronsStoreSuccess([]))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getNeuronsStoreError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loadingNeuronsStore = false;
    });

    expect(
      neuronsReducer(state, getNeuronsStoreError('An error has occured')),
    ).toEqual(expectedResult);
  });

  it('should handle the installNeuron action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.usingNeuron = 'name';
      draft.loading = true;
      draft.neuronUrl = 'url';
    });

    expect(neuronsReducer(state, installNeuron('name', 'url'))).toEqual(
      expectedResult,
    );
  });

  it('should handle the installNeuronSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.usingNeuron = '';
      draft.loading = false;
      draft.neuronUrl = '';
    });

    const action = {
      type: INSTALL_NEURON_SUCCESS,
    };

    expect(neuronsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the installNeuronError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.usingNeuron = '';
      draft.loading = false;
      draft.neuronUrl = '';
      draft.errorText = 'error';
    });

    const action = {
      type: INSTALL_NEURON_ERROR,
      error: 'error',
    };

    expect(neuronsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the removeNeuron action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.usingNeuron = 'name';
      draft.loading = true;
    });

    expect(neuronsReducer(state, removeNeuron('name'))).toEqual(expectedResult);
  });

  it('should handle the removeNeuronSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.usingNeuron = '';
      draft.loading = false;
    });

    const action = {
      type: REMOVE_NEURON_SUCCESS,
    };

    expect(neuronsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the removeNeuronError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.usingNeuron = '';
      draft.errorText = 'error';
      draft.loading = false;
    });

    const action = {
      type: REMOVE_NEURON_ERROR,
      error: 'error',
    };

    expect(neuronsReducer(state, action)).toEqual(expectedResult);
  });
});
