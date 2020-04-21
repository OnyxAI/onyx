import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getScreen,
  getScreenSuccess,
  getScreenError,
  onChangeScreen,
  getScreenStore,
  getScreenStoreSuccess,
  getScreenStoreError,
  addScreen,
  addScreenSuccess,
  addScreenError,
  deleteScreen,
  deleteScreenSuccess,
  deleteScreenError,
} from '../actions';

import {
  GET_SCREEN_SUCCESS,
  GET_SCREEN_ERROR,
  GET_SCREEN,
  GET_SCREEN_STORE,
  GET_SCREEN_STORE_ERROR,
  GET_SCREEN_STORE_SUCCESS,
  ADD_SCREEN,
  ADD_SCREEN_ERROR,
  ADD_SCREEN_SUCCESS,
  DELETE_SCREEN,
  DELETE_SCREEN_ERROR,
  DELETE_SCREEN_SUCCESS,
  CHANGE_SCREEN,
} from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  errorText: '',
  loadingScreen: false,
  screen: [],
  loadingScreenStore: false,
  screenStore: [],
  screenName: '',
  screenId: '',
  screenRaw: '',
  screenType: '',
  language: 'en',
});

describe('Screen Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('onChangeScreen', () => {
    it('should return the correct type onChangeScreen', () => {
      const expectedResult = {
        type: CHANGE_SCREEN,
        name: 'name',
        raw: 'raw',
        screenType: 'neuron',
      };

      expect(onChangeScreen('name', 'raw', 'neuron')).toEqual(expectedResult);
    });
  });

  describe(' getScreenStore', () => {
    it('should return the correct type getScreenStore', () => {
      const expectedResult = {
        type: GET_SCREEN_STORE,
      };

      expect(getScreenStore()).toEqual(expectedResult);
    });
  });

  describe('getScreenStoreSuccess', () => {
    it('should return the correct type and the passed getScreenStoreSuccess', () => {
      const expectedResult = {
        type: GET_SCREEN_STORE_SUCCESS,
        screenStore: [],
      };

      store.dispatch(getScreenStoreSuccess([]));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('getScreenStoreError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: GET_SCREEN_STORE_ERROR,
        error,
      };

      store.dispatch(getScreenStoreError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe(' getScreen', () => {
    it('should return the correct type getScreen', () => {
      const expectedResult = {
        type: GET_SCREEN,
      };

      expect(getScreen()).toEqual(expectedResult);
    });
  });

  describe('getScreenSuccess', () => {
    it('should return the correct type and the passed getScreenSuccess', () => {
      const expectedResult = {
        type: GET_SCREEN_SUCCESS,
        screen: [],
      };

      store.dispatch(getScreenSuccess([]));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('getScreenError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: GET_SCREEN_ERROR,
        error,
      };

      store.dispatch(getScreenError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe(' addScreen', () => {
    it('should return the correct type addScreen', () => {
      const expectedResult = {
        type: ADD_SCREEN,
      };

      expect(addScreen()).toEqual(expectedResult);
    });
  });

  describe('addTokenSuccess', () => {
    it('should return the correct type and the passed addScreenSuccess', () => {
      const expectedResult = {
        type: ADD_SCREEN_SUCCESS,
      };

      store.dispatch(addScreenSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1]).toEqual({ type: GET_SCREEN });
    });
  });

  describe('addScreenError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: ADD_SCREEN_ERROR,
        error,
      };

      store.dispatch(addScreenError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe(' deleteScreen', () => {
    it('should return the correct type deleteScreen', () => {
      const expectedResult = {
        type: DELETE_SCREEN,
        id: 1,
      };

      expect(deleteScreen(1)).toEqual(expectedResult);
    });
  });

  describe('deleteScreenSuccess', () => {
    it('should return the correct type and the passed deleteTokenSuccess', () => {
      const expectedResult = {
        type: DELETE_SCREEN_SUCCESS,
      };

      store.dispatch(deleteScreenSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1]).toEqual({ type: GET_SCREEN });
    });
  });

  describe('deleteScreenError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: DELETE_SCREEN_ERROR,
        error,
      };

      store.dispatch(deleteScreenError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });
});
