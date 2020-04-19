/*
 *
 * Widgets reducer
 *
 */
import produce from 'immer';
import {
  GET_WIDGETS,
  GET_WIDGETS_SUCCESS,
  GET_WIDGETS_ERROR,
  GET_WIDGETS_STORE,
  GET_WIDGETS_STORE_SUCCESS,
  GET_WIDGETS_STORE_ERROR,
  ADD_WIDGET_ERROR,
  ADD_WIDGET_SUCCESS,
  DELETE_WIDGET,
  DELETE_WIDGET_ERROR,
  DELETE_WIDGET_SUCCESS,
  CHANGE_WIDGET,
} from './constants';

export const initialState = {
  errorText: '',
  loadingWidgets: false,
  widgets: [],
  loadingWidgetsStore: false,
  widgetsStore: [],
  widgetName: '',
  widgetId: '',
  widgetRaw: '',
  widgetType: '',
};

/* eslint-disable default-case, no-param-reassign */
const widgetsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_WIDGET:
        draft.widgetName = action.name;
        draft.widgetRaw = action.raw;
        draft.widgetType = action.widgetType;
        break;
      case GET_WIDGETS:
        draft.loadingWidgets = true;
        break;
      case GET_WIDGETS_SUCCESS:
        draft.loadingWidgets = false;
        draft.widgets = action.widgets;
        break;
      case GET_WIDGETS_ERROR:
        draft.loadingWidgets = false;
        draft.errorText = action.error;
        break;
      case GET_WIDGETS_STORE:
        draft.loadingWidgetsStore = true;
        break;
      case GET_WIDGETS_STORE_SUCCESS:
        draft.loadingWidgetsStore = false;
        draft.widgetsStore = action.widgetsStore;
        break;
      case GET_WIDGETS_STORE_ERROR:
        draft.loadingWidgetsStore = false;
        draft.errorText = action.error;
        break;
      case ADD_WIDGET_SUCCESS:
        draft.widgetName = '';
        draft.widgetRaw = '';
        draft.widgetType = '';
        break;
      case ADD_WIDGET_ERROR:
        draft.widgetName = '';
        draft.widgetRaw = '';
        draft.widgetType = '';
        draft.errorText = action.error;
        break;
      case DELETE_WIDGET:
        draft.widgetId = action.id;
        break;
      case DELETE_WIDGET_SUCCESS:
        draft.widgetId = '';
        break;
      case DELETE_WIDGET_ERROR:
        draft.widgetId = '';
        draft.errorText = action.error;
        break;
    }
  });

export default widgetsReducer;
