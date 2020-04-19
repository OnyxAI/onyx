import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '@onyx/utils/request';
import {
  GET_WIDGETS,
  GET_WIDGETS_STORE,
  ADD_WIDGET,
  DELETE_WIDGET,
} from './constants';

import {
  getWidgetsError,
  getWidgetsSuccess,
  getWidgetsStoreSuccess,
  getWidgetsStoreError,
  addWidgetSuccess,
  addWidgetError,
  deleteWidgetError,
  deleteWidgetSuccess,
} from './actions';

import { makeSelectWidgets } from './selectors';

// Get Widgets
export function* loadGetWidgets() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/widgets`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getWidgetsSuccess(result.widgets));
    } else if (result && result.status === 'error') {
      yield put(getWidgetsError(result.message));
    } else {
      yield put(getWidgetsError('onyx.global.error'));
    }
  } catch (error) {
    yield put(getWidgetsError(error.toString()));
  }
}

// Get Widgets Store
export function* loadGetWidgetsStore() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/widgets/store`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getWidgetsStoreSuccess(result.widgets));
    } else if (result && result.status === 'error') {
      yield put(getWidgetsStoreError(result.message));
    } else {
      yield put(getWidgetsStoreError('onyx.global.error'));
    }
  } catch (error) {
    yield put(getWidgetsStoreError(error.toString()));
  }
}

// Add Widget
export function* loadAddWidget() {
  const token = localStorage.getItem('access_token');
  const widgets = yield select(makeSelectWidgets());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/widgets`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        raw: widgets.widgetRaw,
        name: widgets.widgetName,
        type: widgets.widgetType,
      },
    });
    if (result && result.status === 'success') {
      yield put(addWidgetSuccess());
    } else if (result && result.status === 'error') {
      yield put(addWidgetError(result.message));
    } else {
      yield put(addWidgetError('onyx.global.error'));
    }
  } catch (error) {
    yield put(addWidgetError(error.toString()));
  }
}

// Delete Widget
export function* loadDeleteWidget() {
  const token = localStorage.getItem('access_token');
  const widgets = yield select(makeSelectWidgets());

  try {
    const result = yield call(request, {
      method: 'PUT',
      url: `/api/widgets`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        id: widgets.widgetId,
      },
    });
    if (result && result.status === 'success') {
      yield put(deleteWidgetSuccess());
    } else if (result && result.status === 'error') {
      yield put(deleteWidgetError(result.message));
    } else {
      yield put(deleteWidgetError('onyx.global.error'));
    }
  } catch (error) {
    yield put(deleteWidgetError(error.toString()));
  }
}

// Individual exports for testing
export default function* widgetsSaga() {
  yield takeLatest(GET_WIDGETS_STORE, loadGetWidgetsStore);
  yield takeLatest(GET_WIDGETS, loadGetWidgets);
  yield takeLatest(ADD_WIDGET, loadAddWidget);
  yield takeLatest(DELETE_WIDGET, loadDeleteWidget);
}
