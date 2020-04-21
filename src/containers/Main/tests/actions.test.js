import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getWidgets,
  getWidgetsSuccess,
  getWidgetsError,
  onChangeWidget,
  getWidgetsStore,
  getWidgetsStoreSuccess,
  getWidgetsStoreError,
  addWidget,
  addWidgetSuccess,
  addWidgetError,
  deleteWidget,
  deleteWidgetSuccess,
  deleteWidgetError,
} from '../actions';

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
} from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  errorText: '',
  loadingWidgets: false,
  widgets: [],
  loadingWidgetsStore: false,
  widgetsStore: [],
  widgetName: '',
  widgetId: '',
  widgetRaw: '',
  widgetType: '',
  language: 'en',
});

describe('Widgets Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('onChangeWidget', () => {
    it('should return the correct type onChangeWidget', () => {
      const expectedResult = {
        type: CHANGE_WIDGET,
        name: 'name',
        raw: 'raw',
        widgetType: 'neuron',
      };

      expect(onChangeWidget('name', 'raw', 'neuron')).toEqual(expectedResult);
    });
  });

  describe(' getWidgetsStore', () => {
    it('should return the correct type getWidgetsStore', () => {
      const expectedResult = {
        type: GET_WIDGETS_STORE,
      };

      expect(getWidgetsStore()).toEqual(expectedResult);
    });
  });

  describe('getWidgetsStoreSuccess', () => {
    it('should return the correct type and the passed getWidgetsStoreSuccess', () => {
      const expectedResult = {
        type: GET_WIDGETS_STORE_SUCCESS,
        widgetsStore: [],
      };

      store.dispatch(getWidgetsStoreSuccess([]));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('getWidgetsStoreError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: GET_WIDGETS_STORE_ERROR,
        error,
      };

      store.dispatch(getWidgetsStoreError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe(' getWidgets', () => {
    it('should return the correct type getWidgets', () => {
      const expectedResult = {
        type: GET_WIDGETS,
      };

      expect(getWidgets()).toEqual(expectedResult);
    });
  });

  describe('getWidgetsSuccess', () => {
    it('should return the correct type and the passed getWidgetsSuccess', () => {
      const expectedResult = {
        type: GET_WIDGETS_SUCCESS,
        widgets: [],
      };

      store.dispatch(getWidgetsSuccess([]));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('getWidgetsError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: GET_WIDGETS_ERROR,
        error,
      };

      store.dispatch(getWidgetsError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe(' addWidget', () => {
    it('should return the correct type addWidget', () => {
      const expectedResult = {
        type: ADD_WIDGET,
      };

      expect(addWidget()).toEqual(expectedResult);
    });
  });

  describe('addTokenSuccess', () => {
    it('should return the correct type and the passed addWidgetSuccess', () => {
      const expectedResult = {
        type: ADD_WIDGET_SUCCESS,
      };

      store.dispatch(addWidgetSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1]).toEqual({ type: GET_WIDGETS });
    });
  });

  describe('addWidgetError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: ADD_WIDGET_ERROR,
        error,
      };

      store.dispatch(addWidgetError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe(' deleteWidget', () => {
    it('should return the correct type deleteWidget', () => {
      const expectedResult = {
        type: DELETE_WIDGET,
        id: 1,
      };

      expect(deleteWidget(1)).toEqual(expectedResult);
    });
  });

  describe('deleteWidgetSuccess', () => {
    it('should return the correct type and the passed deleteTokenSuccess', () => {
      const expectedResult = {
        type: DELETE_WIDGET_SUCCESS,
      };

      store.dispatch(deleteWidgetSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1]).toEqual({ type: GET_WIDGETS });
    });
  });

  describe('deleteWidgetError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: DELETE_WIDGET_ERROR,
        error,
      };

      store.dispatch(deleteWidgetError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });
});
