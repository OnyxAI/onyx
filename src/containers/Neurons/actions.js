/*
 *
 * Neurons actions
 *
 */
import Toast from '@onyx/global/actions';
import {
  GET_NEURONS_SUCCESS,
  GET_NEURONS_ERROR,
  GET_NEURONS,
  GET_NEURONS_STORE,
  GET_NEURONS_STORE_ERROR,
  GET_NEURONS_STORE_SUCCESS,
  INSTALL_NEURON,
  INSTALL_NEURON_ERROR,
  INSTALL_NEURON_SUCCESS,
  REMOVE_NEURON,
  REMOVE_NEURON_ERROR,
  REMOVE_NEURON_SUCCESS,
} from './constants';

import { getMessage } from '../../i18n';

export function installNeuron(name, url) {
  return {
    type: INSTALL_NEURON,
    name,
    url,
  };
}

export function installNeuronSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: INSTALL_NEURON_SUCCESS });
    dispatch(
      Toast.success({
        text: getMessage(locale, 'onyx.neurons.install_success'),
      }),
    );
  };
}

export function installNeuronError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: INSTALL_NEURON_ERROR });
    dispatch(
      Toast.error({
        text: getMessage(locale, error),
      }),
    );
  };
}

export function removeNeuron(name) {
  return {
    type: REMOVE_NEURON,
    name,
  };
}

export function removeNeuronSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: REMOVE_NEURON_SUCCESS });
    dispatch(
      Toast.success({
        text: getMessage(locale, 'onyx.neurons.remove_success'),
      }),
    );
  };
}

export function removeNeuronError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: REMOVE_NEURON_ERROR });
    dispatch(
      Toast.error({
        text: getMessage(locale, error),
      }),
    );
  };
}

export function getNeuronsStore() {
  return {
    type: GET_NEURONS_STORE,
  };
}

export function getNeuronsStoreSuccess(neurons) {
  return {
    type: GET_NEURONS_STORE_SUCCESS,
    neurons,
  };
}

export function getNeuronsStoreError(error) {
  return {
    type: GET_NEURONS_STORE_ERROR,
    error,
  };
}

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
