/*
 *
 * Neurons reducer
 *
 */
import produce from 'immer';
import {
  GET_NEURONS_ERROR,
  GET_NEURONS_SUCCESS,
  GET_NEURONS,
  GET_NEURONS_STORE_SUCCESS,
  GET_NEURONS_STORE_ERROR,
  GET_NEURONS_STORE,
  INSTALL_NEURON,
  INSTALL_NEURON_SUCCESS,
  INSTALL_NEURON_ERROR,
  REMOVE_NEURON,
  REMOVE_NEURON_SUCCESS,
  REMOVE_NEURON_ERROR,
} from './constants';

export const initialState = {
  errorText: '',
  loadingNeurons: true,
  loadingNeuronsStore: false,
  loading: false,
  usingNeuron: '',
  neuronUrl: '',
  neuronsStoreList: [],
  neurons: [],
};

/* eslint-disable default-case, no-param-reassign */
const neuronsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_NEURONS:
        draft.loadingNeurons = true;
        break;
      case GET_NEURONS_SUCCESS:
        draft.loadingNeurons = false;
        draft.neurons = action.neurons;
        break;
      case GET_NEURONS_ERROR:
        draft.loadingNeurons = false;
        draft.errorText = action.error;
        break;
      case GET_NEURONS_STORE:
        draft.loadingNeuronsStore = true;
        break;
      case GET_NEURONS_STORE_SUCCESS:
        draft.loadingNeuronsStore = false;
        draft.neuronsStoreList = action.neurons;
        break;
      case GET_NEURONS_STORE_ERROR:
        draft.loadingNeuronsStore = false;
        draft.errorText = action.error;
        break;
      case INSTALL_NEURON:
        draft.usingNeuron = action.name;
        draft.loading = true;
        draft.neuronUrl = action.url;
        break;
      case INSTALL_NEURON_SUCCESS:
        draft.usingNeuron = '';
        draft.loading = false;
        draft.neuronUrl = '';
        break;
      case INSTALL_NEURON_ERROR:
        draft.errorText = action.error;
        draft.usingNeuron = '';
        draft.loading = false;
        draft.neuronUrl = '';
        break;
      case REMOVE_NEURON:
        draft.usingNeuron = action.name;
        draft.loading = true;
        break;
      case REMOVE_NEURON_SUCCESS:
        draft.usingNeuron = '';
        draft.loading = false;
        break;
      case REMOVE_NEURON_ERROR:
        draft.errorText = action.error;
        draft.usingNeuron = '';
        draft.loading = false;
        break;
    }
  });

export default neuronsReducer;
