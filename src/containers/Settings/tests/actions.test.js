import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getOnyxData,
  getOnyxDataSuccess,
  getOnyxDataError,
  changeTokenName,
  changeSelected,
  getTokens,
  getTokensSuccess,
  getTokensError,
  addToken,
  addTokenSuccess,
  addTokenError,
  deleteToken,
  deleteTokenSuccess,
  deleteTokenError,
} from '../actions';

import {
  GET_ONYX_DATA_SUCCESS,
  GET_ONYX_DATA_ERROR,
  GET_ONYX_DATA,
  ADD_TOKEN,
  ADD_TOKEN_ERROR,
  ADD_TOKEN_SUCCESS,
  GET_TOKENS,
  GET_TOKENS_SUCCESS,
  GET_TOKENS_ERROR,
  DELETE_TOKEN,
  DELETE_TOKEN_ERROR,
  DELETE_TOKEN_SUCCESS,
  CHANGE_TOKEN_NAME,
  CHANGE_SELECTED,
} from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  errorText: '',
  loadingData: false,
  language: 'en',
});

describe('Settings Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('changeTokenName', () => {
    it('should return the correct type changeTokenName', () => {
      const expectedResult = {
        type: CHANGE_TOKEN_NAME,
        name: 'name',
      };

      expect(changeTokenName('name')).toEqual(expectedResult);
    });
  });

  describe('changeSelected', () => {
    it('should return the correct type changeSelected', () => {
      const expectedResult = {
        type: CHANGE_SELECTED,
        selected: 1,
      };

      expect(changeSelected(1)).toEqual(expectedResult);
    });
  });

  describe(' getOnyxData', () => {
    it('should return the correct type getOnyxData', () => {
      const expectedResult = {
        type: GET_ONYX_DATA,
      };

      expect(getOnyxData()).toEqual(expectedResult);
    });
  });

  describe('getOnyxDataSuccess', () => {
    it('should return the correct type and the passed getOnyxDataSuccess', () => {
      const expectedResult = {
        type: GET_ONYX_DATA_SUCCESS,
      };

      store.dispatch(getOnyxDataSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('getOnyxDataError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: GET_ONYX_DATA_ERROR,
        error,
      };

      store.dispatch(getOnyxDataError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe(' getTokens', () => {
    it('should return the correct type getTokens', () => {
      const expectedResult = {
        type: GET_TOKENS,
      };

      expect(getTokens()).toEqual(expectedResult);
    });
  });

  describe('getTokensSuccess', () => {
    it('should return the correct type and the passed getTokensSuccess', () => {
      const expectedResult = {
        type: GET_TOKENS_SUCCESS,
      };

      store.dispatch(getTokensSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe('getTokensError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: GET_TOKENS_ERROR,
        error,
      };

      store.dispatch(getTokensError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe(' addToken', () => {
    it('should return the correct type addToken', () => {
      const expectedResult = {
        type: ADD_TOKEN,
      };

      expect(addToken()).toEqual(expectedResult);
    });
  });

  describe('addTokenSuccess', () => {
    it('should return the correct type and the passed addTokenSuccess', () => {
      const expectedResult = {
        type: ADD_TOKEN_SUCCESS,
      };

      store.dispatch(addTokenSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1]).toEqual({ type: GET_TOKENS });
    });
  });

  describe('addTokenError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: ADD_TOKEN_ERROR,
        error,
      };

      store.dispatch(addTokenError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });

  describe(' deleteToken', () => {
    it('should return the correct type deleteToken', () => {
      const expectedResult = {
        type: DELETE_TOKEN,
        id: 1,
      };

      expect(deleteToken(1)).toEqual(expectedResult);
    });
  });

  describe('deleteTokenSuccess', () => {
    it('should return the correct type and the passed deleteTokenSuccess', () => {
      const expectedResult = {
        type: DELETE_TOKEN_SUCCESS,
      };

      store.dispatch(deleteTokenSuccess());

      expect(store.getActions()[0]).toEqual(expectedResult);
      expect(store.getActions()[1]).toEqual({ type: GET_TOKENS });
    });
  });

  describe('deleteTokenError', () => {
    it('should return the correct type and the passed error', () => {
      const error = 'An error has occured';
      const expectedResult = {
        type: DELETE_TOKEN_ERROR,
        error,
      };

      store.dispatch(deleteTokenError(error));

      expect(store.getActions()[0]).toEqual(expectedResult);
    });
  });
});
