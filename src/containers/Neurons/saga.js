import { call, put, takeLatest, select } from 'redux-saga/effects';
import { API_URL } from '@onyx/global/constants';
import request from '@onyx/utils/request';
import { makeSelectNeurons } from './selectors';
import {
  GET_NEURONS,
  GET_NEURONS_STORE,
  INSTALL_NEURON,
  REMOVE_NEURON,
} from './constants';

import {
  getNeuronsSuccess,
  getNeuronsError,
  getNeuronsStoreSuccess,
  getNeuronsStoreError,
  installNeuronSuccess,
  installNeuronError,
  removeNeuronSuccess,
  removeNeuronError,
} from './actions';

// Get Neurons
export function* loadGetNeurons() {
  try {
    const result = yield call(request, {
      method: 'GET',
      url: `${API_URL}/neurons/get_all`,
    });
    if (result && result.status === 'success') {
      yield put(getNeuronsSuccess(result.neurons));
    } else if (result && result.status === 'error') {
      yield put(getNeuronsError(result.message));
    } else {
      yield put(getNeuronsError('onyx.global.error'));
    }
  } catch (error) {
    yield put(getNeuronsError(error.toString()));
  }
}

// Get Neurons Store List
export function* loadGetNeuronsStore() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `${API_URL}/neurons/get_store_list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getNeuronsStoreSuccess(result.neurons));
    } else if (result && result.status === 'error') {
      yield put(getNeuronsStoreError(result.message));
    } else {
      yield put(getNeuronsStoreError('onyx.global.error'));
    }
  } catch (error) {
    yield put(getNeuronsStoreError(error.toString()));
  }
}

// Install Neuron
export function* loadInstallNeuron() {
  const token = localStorage.getItem('access_token');
  const neurons = yield select(makeSelectNeurons());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `${API_URL}/neurons/install`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: neurons.usingNeuron,
        url: neurons.neuronUrl,
      },
    });
    if (result && result.status === 'success') {
      yield put(installNeuronSuccess());
    } else if (result && result.status === 'error') {
      yield put(installNeuronError(result.message));
    } else {
      yield put(installNeuronError('onyx.global.error'));
    }
  } catch (error) {
    yield put(installNeuronError(error.toString()));
  }
}

// Remove Neuron
export function* loadRemoveNeuron() {
  const token = localStorage.getItem('access_token');
  const neurons = yield select(makeSelectNeurons());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `${API_URL}/neurons/remove`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: neurons.usingNeuron,
      },
    });
    if (result && result.status === 'success') {
      yield put(removeNeuronSuccess());
    } else if (result && result.status === 'error') {
      yield put(removeNeuronError(result.message));
    } else {
      yield put(removeNeuronError('onyx.global.error'));
    }
  } catch (error) {
    yield put(removeNeuronError(error.toString()));
  }
}

// Individual exports for testing
export default function* neuronsSaga() {
  yield takeLatest(GET_NEURONS, loadGetNeurons);
  yield takeLatest(GET_NEURONS_STORE, loadGetNeuronsStore);
  yield takeLatest(INSTALL_NEURON, loadInstallNeuron);
  yield takeLatest(REMOVE_NEURON, loadRemoveNeuron);
}
