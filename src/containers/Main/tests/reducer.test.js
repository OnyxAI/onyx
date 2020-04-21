import produce from 'immer';
import widgetsReducer from '../reducer';
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
} from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('widgetsReducer', () => {
  let state;
  beforeEach(() => {
    state = {
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
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(widgetsReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeWidget action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.widgetName = 'name';
      draft.widgetRaw = 'raw';
      draft.widgetType = 'neuron';
    });

    const action = {
      type: CHANGE_WIDGET,
      name: 'name',
      raw: 'raw',
      widgetType: 'neuron',
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getWidgetsStore action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingWidgetsStore = true;
    });

    const action = {
      type: GET_WIDGETS_STORE,
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getWidgetsStoreSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingWidgetsStore = false;
      draft.widgetsStore = [];
    });

    const action = {
      type: GET_WIDGETS_STORE_SUCCESS,
      widgetsStore: [],
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getWidgetsStoreError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loadingWidgetsStore = false;
    });

    const action = {
      type: GET_WIDGETS_STORE_ERROR,
      error: 'An error has occured',
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getWidgets action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingWidgets = true;
    });

    const action = {
      type: GET_WIDGETS,
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getWidgetsSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingWidgets = false;
      draft.widgets = [{}];
    });

    const action = {
      type: GET_WIDGETS_SUCCESS,
      widgets: [{}],
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getWidgetsError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loadingWidgets = false;
    });

    const action = {
      type: GET_WIDGETS_ERROR,
      error: 'An error has occured',
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteWidget action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.widgetId = 1;
    });

    const action = {
      type: DELETE_WIDGET,
      id: 1,
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteWidgetSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.widgetId = '';
    });

    const action = {
      type: DELETE_WIDGET_SUCCESS,
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteWidgetError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.widgetId = '';
    });

    const action = {
      type: DELETE_WIDGET_ERROR,
      error: 'An error has occured',
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the addWidgetSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.widgetName = '';
      draft.widgetRaw = '';
      draft.widgetType = '';
    });

    const action = {
      type: ADD_WIDGET_SUCCESS,
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the addWidgetError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.widgetName = '';
      draft.widgetRaw = '';
      draft.widgetType = '';
    });

    const action = {
      type: ADD_WIDGET_ERROR,
      error: 'An error has occured',
    };

    expect(widgetsReducer(state, action)).toEqual(expectedResult);
  });
});
