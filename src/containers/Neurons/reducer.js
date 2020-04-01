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
} from './constants';

export const initialState = {
  errorText: '',
  loadingNeurons: true,
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
    }
  });

export default neuronsReducer;
