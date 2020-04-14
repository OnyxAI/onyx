import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  GET_NEURONS,
  GET_NEURONS_ERROR,
  GET_NEURONS_SUCCESS,
  INSTALL_NEURON,
  INSTALL_NEURON_ERROR,
  INSTALL_NEURON_SUCCESS,
  REMOVE_NEURON,
  REMOVE_NEURON_ERROR,
  REMOVE_NEURON_SUCCESS,
  GET_NEURONS_STORE,
  GET_NEURONS_STORE_ERROR,
  GET_NEURONS_STORE_SUCCESS,
} from '../constants';

import {
  getNeurons,
  getNeuronsError,
  getNeuronsSuccess,
  getNeuronsStore,
  getNeuronsStoreError,
  getNeuronsStoreSuccess,
  installNeuron,
  installNeuronError,
  installNeuronSuccess,
  removeNeuron,
  removeNeuronError,
  removeNeuronSuccess,
} from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  errorText: '',
  loadingNeurons: true,
  loadingNeuronsStore: false,
  loading: false,
  usingNeuron: '',
  neuronUrl: '',
  neuronsStoreList: [],
  neurons: [],
  language: 'en',
});

describe('Neurons Actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  describe('getNeurons', () => {
    it('should return the correct type and the passed getNeurons', () => {
      const expectedResult = {
        type: GET_NEURONS,
      };

      expect(getNeurons()).toEqual(expectedResult);
    });

    it('should return the correct type and the passed getNeuronsSuccess', () => {
      const fixture = [];
      const expectedResult = {
        type: GET_NEURONS_SUCCESS,
        neurons: fixture,
      };

      expect(getNeuronsSuccess(fixture)).toEqual(expectedResult);
    });

    it('should return the correct type and the passed getNeuronsError', () => {
      const fixture = 'error';
      const expectedResult = {
        type: GET_NEURONS_ERROR,
        error: fixture,
      };

      expect(getNeuronsError(fixture)).toEqual(expectedResult);
    });
  });

  describe('getNeuronsStore', () => {
    it('should return the correct type and the passed getNeurons', () => {
      const expectedResult = {
        type: GET_NEURONS_STORE,
      };

      expect(getNeuronsStore()).toEqual(expectedResult);
    });

    it('should return the correct type and the passed getNeuronsSuccess', () => {
      const fixture = [];
      const expectedResult = {
        type: GET_NEURONS_STORE_SUCCESS,
        neurons: fixture,
      };

      expect(getNeuronsStoreSuccess(fixture)).toEqual(expectedResult);
    });

    it('should return the correct type and the passed getNeuronsError', () => {
      const fixture = 'error';
      const expectedResult = {
        type: GET_NEURONS_STORE_ERROR,
        error: fixture,
      };

      expect(getNeuronsStoreError(fixture)).toEqual(expectedResult);
    });
  });

  describe('installNeurons', () => {
    it('should return the correct type and the passed installNeuron', () => {
      const expectedResult = {
        type: INSTALL_NEURON,
        name: 'name',
        url: 'url',
      };

      expect(installNeuron('name', 'url')).toEqual(expectedResult);
    });

    it('should return the correct type and the passed installNeuronSuccess', () => {
      const expectedResult = {
        type: INSTALL_NEURON_SUCCESS,
      };

      store.dispatch(installNeuronSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('app/Neurons/GET_NEURONS');
      expect(store.getActions()[2].type).toEqual('onyx/global/ADD_TOAST');
    });

    it('should return the correct type and the passed installNeuronError', () => {
      const expectedResult = {
        type: INSTALL_NEURON_ERROR,
      };

      store.dispatch(installNeuronError());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('onyx/global/ADD_TOAST');
    });
  });

  describe('removeNeurons', () => {
    it('should return the correct type and the passed removeNeuron', () => {
      const expectedResult = {
        type: REMOVE_NEURON,
        name: 'name',
      };

      expect(removeNeuron('name')).toEqual(expectedResult);
    });

    it('should return the correct type and the passed removeNeuronSuccess', () => {
      const expectedResult = {
        type: REMOVE_NEURON_SUCCESS,
      };

      store.dispatch(removeNeuronSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('app/Neurons/GET_NEURONS');
      expect(store.getActions()[2].type).toEqual('onyx/global/ADD_TOAST');
    });

    it('should return the correct type and the passed removeNeuronError', () => {
      const expectedResult = {
        type: REMOVE_NEURON_ERROR,
      };

      store.dispatch(removeNeuronError());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1].type).toEqual('onyx/global/ADD_TOAST');
    });
  });
});
