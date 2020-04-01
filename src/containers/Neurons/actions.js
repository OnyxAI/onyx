/*
 *
 * Neurons actions
 *
 */
import {
  GET_NEURONS_SUCCESS,
  GET_NEURONS_ERROR,
  GET_NEURONS,
} from './constants';

export function getNeurons() {
  return {
    type: GET_NEURONS,
  };
}

export function getNeuronsSuccess(neurons) {
  return {
    type: GET_NEURONS_SUCCESS,
    neurons,
  };
}

export function getNeuronsError(error) {
  return {
    type: GET_NEURONS_ERROR,
    error,
  };
}
