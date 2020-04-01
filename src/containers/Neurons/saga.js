import { call, put, takeLatest } from 'redux-saga/effects';
import { API_URL } from 'global/constants';
import request from 'utils/request';
import { GET_NEURONS } from './constants';

import { getNeuronsSuccess, getNeuronsError } from './actions';

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

// Individual exports for testing
export default function* neuronsSaga() {
  yield takeLatest(GET_NEURONS, loadGetNeurons);
}
