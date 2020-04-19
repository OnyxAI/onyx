/*
 *
 * Widgets actions
 *
 */
import Toast from '@onyx/global/actions';
import {
  GET_WIDGETS_SUCCESS,
  GET_WIDGETS_ERROR,
  GET_WIDGETS,
  GET_WIDGETS_STORE,
  GET_WIDGETS_STORE_ERROR,
  GET_WIDGETS_STORE_SUCCESS,
  ADD_WIDGET,
  ADD_WIDGET_ERROR,
  ADD_WIDGET_SUCCESS,
  DELETE_WIDGET,
  DELETE_WIDGET_ERROR,
  DELETE_WIDGET_SUCCESS,
  CHANGE_WIDGET,
} from './constants';

import { getMessage } from '../../i18n';

export function onChangeWidget(name, raw, type) {
  return {
    type: CHANGE_WIDGET,
    name,
    raw,
    widgetType: type,
  };
}

export function getWidgets() {
  return {
    type: GET_WIDGETS,
  };
}

export function getWidgetsSuccess(widgets) {
  return dispatch => {
    dispatch({
      type: GET_WIDGETS_SUCCESS,
      widgets,
    });
  };
}

export function getWidgetsError(error) {
  return dispatch => {
    dispatch({ type: GET_WIDGETS_ERROR, error });
  };
}

export function getWidgetsStore() {
  return {
    type: GET_WIDGETS_STORE,
  };
}

export function getWidgetsStoreSuccess(widgetsStore) {
  return dispatch => {
    dispatch({
      type: GET_WIDGETS_STORE_SUCCESS,
      widgetsStore,
    });
  };
}

export function getWidgetsStoreError(error) {
  return dispatch => {
    dispatch({ type: GET_WIDGETS_STORE_ERROR, error });
  };
}

export function addWidget() {
  return {
    type: ADD_WIDGET,
  };
}

export function addWidgetSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: ADD_WIDGET_SUCCESS });
    dispatch(getWidgets());
    dispatch(
      Toast.success({
        text: getMessage(locale, 'app.containers.Main.add_widget_success'),
      }),
    );
  };
}

export function addWidgetError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: ADD_WIDGET_ERROR, error });
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}

export function deleteWidget(id) {
  return {
    type: DELETE_WIDGET,
    id,
  };
}

export function deleteWidgetSuccess() {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: DELETE_WIDGET_SUCCESS });
    dispatch(getWidgets());
    dispatch(
      Toast.success({
        text: getMessage(locale, 'app.containers.Main.delete_widget_success'),
      }),
    );
  };
}

export function deleteWidgetError(error) {
  return (dispatch, getState) => {
    const { locale } = getState().language;

    dispatch({ type: DELETE_WIDGET_ERROR, error });
    dispatch(Toast.error({ text: getMessage(locale, error) }));
  };
}
