import produce from 'immer';
import screenReducer from '../reducer';
import {
  GET_SCREEN,
  GET_SCREEN_SUCCESS,
  GET_SCREEN_ERROR,
  GET_SCREEN_STORE,
  GET_SCREEN_STORE_SUCCESS,
  GET_SCREEN_STORE_ERROR,
  ADD_SCREEN_ERROR,
  ADD_SCREEN_SUCCESS,
  DELETE_SCREEN,
  DELETE_SCREEN_ERROR,
  DELETE_SCREEN_SUCCESS,
  CHANGE_SCREEN,
} from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('screenReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      errorText: '',
      loadingScreen: false,
      screen: [],
      loadingScreenStore: false,
      screenStore: [],
      screenName: '',
      screenId: '',
      screenRaw: '',
      screenType: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(screenReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeScreen action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.screenName = 'name';
      draft.screenRaw = 'raw';
      draft.screenType = 'neuron';
    });

    const action = {
      type: CHANGE_SCREEN,
      name: 'name',
      raw: 'raw',
      screenType: 'neuron',
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getScreenStore action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingScreenStore = true;
    });

    const action = {
      type: GET_SCREEN_STORE,
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getScreenStoreSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingScreenStore = false;
      draft.screenStore = [];
    });

    const action = {
      type: GET_SCREEN_STORE_SUCCESS,
      screenStore: [],
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getScreenStoreError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loadingScreenStore = false;
    });

    const action = {
      type: GET_SCREEN_STORE_ERROR,
      error: 'An error has occured',
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getScreen action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingScreen = true;
    });

    const action = {
      type: GET_SCREEN,
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getScreenSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loadingScreen = false;
      draft.screen = [{}];
    });

    const action = {
      type: GET_SCREEN_SUCCESS,
      screen: [{}],
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the getScreenError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.loadingScreen = false;
    });

    const action = {
      type: GET_SCREEN_ERROR,
      error: 'An error has occured',
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteScreen action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.screenId = 1;
    });

    const action = {
      type: DELETE_SCREEN,
      id: 1,
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteScreenSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.screenId = '';
    });

    const action = {
      type: DELETE_SCREEN_SUCCESS,
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the deleteScreenError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.screenId = '';
    });

    const action = {
      type: DELETE_SCREEN_ERROR,
      error: 'An error has occured',
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the addScreenSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.screenName = '';
      draft.screenRaw = '';
      draft.screenType = '';
    });

    const action = {
      type: ADD_SCREEN_SUCCESS,
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });

  it('should handle the addScreenError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.errorText = 'An error has occured';
      draft.screenName = '';
      draft.screenRaw = '';
      draft.screenType = '';
    });

    const action = {
      type: ADD_SCREEN_ERROR,
      error: 'An error has occured',
    };

    expect(screenReducer(state, action)).toEqual(expectedResult);
  });
});
